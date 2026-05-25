import { NextRequest, NextResponse } from "next/server";

/**
 * Avaliador IA — recebe Reflexões + saída do Fiscal, chama Gemini Flash
 * (modelo grátis), devolve nota A/B/C/D + feedback.
 *
 * A API key do Gemini vem do CLIENTE (localStorage do aluno) via header.
 * Isso evita custos de operação para o curso e dá controle total ao aluno.
 *
 * Por que Gemini Flash:
 *  - Tier grátis generoso (1500 req/dia, sem cartão)
 *  - Aluno se cadastra em https://aistudio.google.com/apikey
 *  - 100% gratuito hoje, sem risco financeiro
 */

type Reflexao = {
  lab: string;
  pergunta: string;
  resposta: string;
};

type RequestBody = {
  sprint: number;
  reflexoes: Reflexao[];
  saidaFiscal?: string;
  modeloUsado?: string; // qual modelo o aluno usou pra encomendar o código
};

const PROMPT_SISTEMA = `Você é o AVALIADOR INDEPENDENTE do curso "Engenharia e Arquitetura de Harness para Sistemas Driven AI".

Avalie um aluno do tipo VIBECODER ARQUITETO: ele NÃO escreveu o código deste Sprint — ele ENCOMENDOU ao seu próprio agente de IA (Claude ou Gemini). O Fiscal (Learning Gate) já validou a corretude mecânica.

Seu papel: julgar se o aluno COMPREENDE arquiteturalmente o que ele acabou de orquestrar. Você avalia as REFLEXÕES dele.

Princípios:
1. SEJA ESPECÍFICO. Aponte qual frase demonstrou (ou não) o conceito.
2. NÃO PENALIZE falta de jargão técnico. O aluno é vibecoder.
3. PENALIZE rationalizações (ex: "agente é confiável, então hooks são opcionais" = D direto).
4. RECONHEÇA quando o aluno traz exemplo concreto próprio. Bonifique para A.
5. NUNCA invente erros. Se a reflexão é curta mas correta, é correta.

Rubrica:
A — Excelente: todas as reflexões com mecanismo correto + analogias próprias OU exemplo não-coberto.
B — Aprovado: 3/4 corretas; 1 pode ter explicação parcial.
C — Reprovado leve: ≥1 reflexão em branco OU ≥2 com mecanismo incorreto. Refazer.
D — Reprovado grave: mal-entendido fundamental do conceito central.

Devolva ESTRITAMENTE este JSON (sem markdown, sem texto adicional):

{
  "nota_final": "A" | "B" | "C" | "D",
  "resumo_geral": "1-2 frases dizendo se o aluno compreendeu",
  "por_reflexao": [
    {
      "lab": "A",
      "veredito": "compreende" | "parcial" | "nao_compreende",
      "comentario": "1-3 frases específicas citando a frase do aluno"
    }
  ],
  "pontos_fortes": ["..."],
  "pontos_a_melhorar": ["..."],
  "sugestao_proximo_passo": "1 frase curta"
}`;

export async function POST(req: NextRequest) {
  // 1. Pega API key do header (cliente envia)
  const apiKey = req.headers.get("x-gemini-api-key");
  if (!apiKey) {
    return NextResponse.json(
      { erro: "Configure sua API key do Gemini primeiro. Obtenha grátis em https://aistudio.google.com/apikey" },
      { status: 400 },
    );
  }

  // 2. Valida payload
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ erro: "Payload JSON inválido" }, { status: 400 });
  }

  if (!body.reflexoes || body.reflexoes.length === 0) {
    return NextResponse.json(
      { erro: "Você precisa preencher pelo menos uma reflexão para ser avaliado." },
      { status: 400 },
    );
  }

  // 3. Monta o prompt do usuário
  const promptUsuario = [
    `## Sprint avaliado\nSprint ${body.sprint}`,
    body.modeloUsado
      ? `\n## Modelo que o aluno USOU para encomendar o código\n${body.modeloUsado}\n(IMPORTANTE: você é um modelo DIFERENTE — Gemini Flash — para evitar viés de auto-avaliação)`
      : "",
    `\n## Reflexões do aluno`,
    ...body.reflexoes.map(
      (r) => `\n### Reflexão Lab ${r.lab}\n**Pergunta:** ${r.pergunta}\n\n**Resposta:**\n${r.resposta || "(em branco)"}`,
    ),
    body.saidaFiscal
      ? `\n\n## Resultado do Fiscal (Learning Gate)\n\`\`\`\n${body.saidaFiscal}\n\`\`\``
      : "",
    `\n\nAvalie e devolva ESTRITAMENTE o JSON conforme o formato definido nas instruções de sistema. Sem markdown ao redor.`,
  ].join("\n");

  // 4. Chama Gemini Flash 2.0
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

  let geminiResp: Response;
  try {
    geminiResp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: PROMPT_SISTEMA }] },
        contents: [{ role: "user", parts: [{ text: promptUsuario }] }],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: "application/json",
        },
      }),
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Falha de rede";
    return NextResponse.json(
      { erro: `Falha ao conectar com Gemini: ${msg}` },
      { status: 502 },
    );
  }

  if (!geminiResp.ok) {
    const errorText = await geminiResp.text();
    let mensagem = `Gemini retornou ${geminiResp.status}`;
    try {
      const j = JSON.parse(errorText);
      mensagem = j?.error?.message ?? mensagem;
    } catch {
      // ignora
    }
    return NextResponse.json(
      {
        erro: mensagem,
        dica:
          geminiResp.status === 400
            ? "Sua API key pode estar inválida ou expirada. Verifique em https://aistudio.google.com/apikey"
            : geminiResp.status === 429
              ? "Limite de uso do tier grátis atingido. Aguarde alguns minutos."
              : undefined,
      },
      { status: geminiResp.status },
    );
  }

  const data = await geminiResp.json();
  const textoBruto = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textoBruto) {
    return NextResponse.json(
      { erro: "Gemini respondeu sem texto. Tente novamente." },
      { status: 502 },
    );
  }

  // 5. Parseia o JSON da resposta
  let resultado: unknown;
  try {
    resultado = JSON.parse(textoBruto);
  } catch {
    return NextResponse.json(
      {
        erro: "Resposta do Gemini não está em JSON válido.",
        textoBruto: textoBruto.slice(0, 500),
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ resultado });
}
