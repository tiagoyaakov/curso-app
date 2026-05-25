"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Key,
  ExternalLink,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { lerReflexao } from "@/lib/persistencia";
import { cn } from "@/lib/utils";

type Lab = { lab: string; pergunta: string };

type Props = {
  sprint: number;
  /** Lista dos Labs deste sprint para puxar as reflexões salvas. */
  labs: Lab[];
};

type ResultadoPorReflexao = {
  lab: string;
  veredito: "compreende" | "parcial" | "nao_compreende";
  comentario: string;
};

type ResultadoAvaliacao = {
  nota_final: "A" | "B" | "C" | "D";
  resumo_geral: string;
  por_reflexao: ResultadoPorReflexao[];
  pontos_fortes: string[];
  pontos_a_melhorar: string[];
  sugestao_proximo_passo: string;
};

const KEY_STORAGE = "curso-harness::gemini-api-key";
const MODELO_STORAGE = "curso-harness::modelo-usado";

export function AvaliadorIA({ sprint, labs }: Props) {
  const [aberto, setAberto] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [modeloUsado, setModeloUsado] = useState("Claude");
  const [reflexoes, setReflexoes] = useState<Record<string, string>>({});
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [resultado, setResultado] = useState<ResultadoAvaliacao | null>(null);

  // Carrega key + modelo do localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    setApiKey(localStorage.getItem(KEY_STORAGE) ?? "");
    setModeloUsado(localStorage.getItem(MODELO_STORAGE) ?? "Claude");
  }, []);

  // Carrega reflexões salvas quando abre o painel
  useEffect(() => {
    if (!aberto) return;
    async function carregar() {
      const novo: Record<string, string> = {};
      for (const l of labs) {
        novo[l.lab] = await lerReflexao({ sprint, lab: l.lab });
      }
      setReflexoes(novo);
    }
    carregar();
  }, [aberto, sprint, labs]);

  function salvarKey(v: string) {
    setApiKey(v);
    if (typeof window !== "undefined") localStorage.setItem(KEY_STORAGE, v);
  }

  function salvarModelo(v: string) {
    setModeloUsado(v);
    if (typeof window !== "undefined") localStorage.setItem(MODELO_STORAGE, v);
  }

  async function avaliar() {
    setErro(null);
    setResultado(null);
    setCarregando(true);

    try {
      const payload = {
        sprint,
        modeloUsado,
        reflexoes: labs.map((l) => ({
          lab: l.lab,
          pergunta: l.pergunta,
          resposta: reflexoes[l.lab] ?? "",
        })),
      };

      const resp = await fetch("/api/avaliar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-gemini-api-key": apiKey.trim(),
        },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setErro(data?.erro ?? "Erro desconhecido");
        if (data?.dica) setErro((e) => `${e}\n\nDica: ${data.dica}`);
        return;
      }

      setResultado(data.resultado as ResultadoAvaliacao);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Falha de rede";
      setErro(msg);
    } finally {
      setCarregando(false);
    }
  }

  const totalPalavras = Object.values(reflexoes).reduce(
    (sum, r) => sum + r.trim().split(/\s+/).filter(Boolean).length,
    0,
  );
  const podeAvaliar = apiKey.trim().length > 10 && totalPalavras >= 50;

  return (
    <div className="my-10 overflow-hidden rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-500/10 via-card to-fuchsia-500/5">
      <div className="border-b border-violet-400/20 bg-gradient-to-r from-violet-500/10 via-transparent to-fuchsia-500/5 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 ring-1 ring-violet-400/40">
            <Sparkles className="h-4 w-4 text-violet-300" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Avaliador IA</h3>
            <p className="text-xs text-muted-foreground">
              Avalia suas Reflexões automaticamente usando Gemini Flash (grátis).
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6">
        {!aberto ? (
          <Button
            onClick={() => setAberto(true)}
            className="gap-2 gradient-bg text-white shadow-md shadow-violet-500/30 hover:shadow-lg hover:shadow-violet-500/50"
          >
            <Sparkles className="h-4 w-4" />
            Avaliar minhas Reflexões deste Sprint
          </Button>
        ) : (
          <>
            {/* Setup: API key + modelo */}
            <div className="space-y-3 rounded-lg border border-border bg-card/60 p-4">
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <Key className="h-3 w-3" />
                  Sua API key do Gemini (grátis)
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => salvarKey(e.target.value)}
                  placeholder="AIza..."
                  className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-violet-400/50 focus:outline-none focus:ring-1 focus:ring-violet-400/30"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Não tem uma?{" "}
                  <a
                    href="https://aistudio.google.com/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-violet-300 hover:underline"
                  >
                    Pegue grátis em 30s aqui
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                  . Salvamos só no seu navegador (localStorage), nunca enviamos para nosso servidor.
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Qual agente você usou para encomendar o código?
                </label>
                <div className="flex gap-2">
                  {["Claude", "ChatGPT", "Outro"].map((m) => (
                    <button
                      key={m}
                      onClick={() => salvarModelo(m)}
                      className={cn(
                        "rounded-md border px-3 py-1.5 text-xs font-medium transition-all",
                        modeloUsado === m
                          ? "border-violet-400/50 bg-violet-500/10 text-violet-300"
                          : "border-border bg-card text-muted-foreground hover:border-violet-400/30",
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Importante: o Avaliador usa Gemini, que é{" "}
                  <strong className="text-foreground">diferente</strong> do agente que escreveu o código. Isso evita viés de auto-aprovação.
                </p>
              </div>
            </div>

            {/* Preview do que será enviado */}
            <details className="rounded-lg border border-border bg-card/40 p-3 text-xs">
              <summary className="cursor-pointer font-medium text-muted-foreground hover:text-foreground">
                O que vai ser enviado? ({totalPalavras} palavras totais)
              </summary>
              <ul className="mt-2 space-y-1.5 text-muted-foreground">
                {labs.map((l) => {
                  const r = reflexoes[l.lab] ?? "";
                  const palavras = r.trim().split(/\s+/).filter(Boolean).length;
                  return (
                    <li key={l.lab} className="flex justify-between">
                      <span>Reflexão Lab {l.lab}</span>
                      <span
                        className={cn(
                          "tabular-nums",
                          palavras === 0 ? "text-warning" : "text-success",
                        )}
                      >
                        {palavras} palavras{palavras === 0 && " (vazia)"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </details>

            {/* Avaliar button */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={avaliar}
                disabled={!podeAvaliar || carregando}
                className="gap-2 gradient-bg text-white shadow-md shadow-violet-500/30 disabled:opacity-50"
              >
                {carregando ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Avaliando...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Avaliar agora
                  </>
                )}
              </Button>

              {!podeAvaliar && !carregando && (
                <span className="text-xs text-muted-foreground">
                  {apiKey.trim().length <= 10
                    ? "Cole sua API key primeiro"
                    : "Escreva mais reflexões antes (mínimo 50 palavras)"}
                </span>
              )}
            </div>

            {/* Erro */}
            {erro && (
              <div className="flex items-start gap-2 rounded-lg border border-danger/30 bg-danger/5 p-3 text-sm">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                <pre className="whitespace-pre-wrap text-xs text-foreground/90">
                  {erro}
                </pre>
              </div>
            )}

            {/* Resultado */}
            <AnimatePresence>
              {resultado && <BlocoResultado resultado={resultado} />}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}

function BlocoResultado({ resultado }: { resultado: ResultadoAvaliacao }) {
  const corNota = {
    A: "text-success border-success/40 bg-success/10",
    B: "text-violet-300 border-violet-400/40 bg-violet-500/10",
    C: "text-warning border-warning/40 bg-warning/10",
    D: "text-danger border-danger/40 bg-danger/10",
  }[resultado.nota_final];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 rounded-xl border border-violet-400/30 bg-card/80 p-5"
    >
      {/* Nota grande */}
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-xl border-2 font-bold text-3xl",
            corNota,
          )}
        >
          {resultado.nota_final}
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Sua nota
          </div>
          <p className="mt-1 text-sm leading-relaxed text-foreground">
            {resultado.resumo_geral}
          </p>
        </div>
      </div>

      {/* Por reflexão */}
      <div className="space-y-2">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Análise por reflexão
        </div>
        {resultado.por_reflexao.map((r) => {
          const ic =
            r.veredito === "compreende"
              ? CheckCircle2
              : r.veredito === "parcial"
                ? AlertCircle
                : XCircle;
          const Cor =
            r.veredito === "compreende"
              ? "text-success"
              : r.veredito === "parcial"
                ? "text-warning"
                : "text-danger";
          const Icone = ic;

          return (
            <div
              key={r.lab}
              className="flex items-start gap-3 rounded-md border border-border bg-card/40 p-3"
            >
              <Icone className={cn("mt-0.5 h-4 w-4 shrink-0", Cor)} />
              <div className="flex-1">
                <div className="text-xs font-semibold">Lab {r.lab}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {r.comentario}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fortes / Melhorar */}
      <div className="grid gap-3 sm:grid-cols-2">
        {resultado.pontos_fortes.length > 0 && (
          <div className="rounded-md border border-success/30 bg-success/5 p-3">
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-success">
              Pontos fortes
            </div>
            <ul className="space-y-1 text-xs leading-relaxed">
              {resultado.pontos_fortes.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </div>
        )}
        {resultado.pontos_a_melhorar.length > 0 && (
          <div className="rounded-md border border-warning/30 bg-warning/5 p-3">
            <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-warning">
              Pontos a melhorar
            </div>
            <ul className="space-y-1 text-xs leading-relaxed">
              {resultado.pontos_a_melhorar.map((p, i) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Próximo passo */}
      <div className="rounded-md border border-violet-400/25 bg-violet-500/5 p-3">
        <div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-violet-300">
          <ArrowRight className="h-3 w-3" />
          Próximo passo sugerido
        </div>
        <p className="text-xs leading-relaxed text-foreground/90">
          {resultado.sugestao_proximo_passo}
        </p>
      </div>
    </motion.div>
  );
}
