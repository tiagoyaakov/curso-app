import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { CopyButton } from "@/components/curso/copy-button";
import { CONFIG } from "@/lib/config";
import {
  Rocket,
  Terminal as TerminalIcon,
  ArrowRight,
  Download,
  CheckCircle2,
  Code2,
  Sparkles,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/github";

export const metadata = {
  title: "Começar · Engenharia de Harness",
  description:
    "Instale os pré-requisitos, clone o repositório e comece o Sprint 1.",
};

const PRE_REQUISITOS = [
  {
    nome: "Node.js 20+",
    descricao: "Ambiente para rodar JavaScript no seu computador.",
    comoVerificar: "node --version",
    link: "https://nodejs.org/",
    linkLabel: "Instalar Node.js",
  },
  {
    nome: "Git",
    descricao: "Para clonar o repositório do curso.",
    comoVerificar: "git --version",
    link: "https://git-scm.com/",
    linkLabel: "Instalar Git",
  },
  {
    nome: "VS Code (recomendado)",
    descricao:
      "Editor de código. Você vai usar para abrir e inspecionar o que seu agente entrega.",
    comoVerificar: "code --version",
    link: "https://code.visualstudio.com/",
    linkLabel: "Instalar VS Code",
  },
  {
    nome: "Conta Claude ou Gemini",
    descricao:
      "Seu agente. Você não precisa de chave de API — apenas acesso ao chat.",
    link: "https://claude.ai",
    linkLabel: "Abrir Claude.ai",
  },
];

const SETUP_COMMANDS = CONFIG.setupCommands;

export default function ComecarPage() {
  return (
    <AppShell>
      <div className="space-y-10">
        {/* Header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/5 px-3 py-1 text-xs font-medium text-violet-300">
            <Rocket className="h-3 w-3" />
            Setup em ~10 minutos
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Como <span className="gradient-text">começar</span> o curso
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Você vai instalar 3 ferramentas, clonar 1 repositório, rodar 1
            comando, e entrar no Sprint 1. Não é instalação complexa — é
            ferramenta de qualquer dev.
          </p>
        </header>

        {/* Passo 1 — Pré-requisitos */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg text-sm font-bold text-white shadow-md shadow-violet-500/30">
              1
            </span>
            <h2 className="text-2xl font-bold tracking-tight">
              Instale os pré-requisitos
            </h2>
          </div>

          <p className="text-sm text-muted-foreground">
            Se você já tem algum deles instalado, pode pular — só verifique a
            versão.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {PRE_REQUISITOS.map((pre) => (
              <div
                key={pre.nome}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{pre.nome}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {pre.descricao}
                    </p>
                  </div>
                  <Download className="mt-1 h-4 w-4 shrink-0 text-violet-300" />
                </div>

                {pre.comoVerificar && (
                  <div className="mt-3 flex items-center justify-between rounded-md bg-code-bg px-3 py-1.5 font-mono text-xs">
                    <span>
                      <span className="select-none text-muted-foreground">
                        $
                      </span>{" "}
                      <span className="text-violet-300">
                        {pre.comoVerificar}
                      </span>
                    </span>
                    <CopyButton texto={pre.comoVerificar} label="Copiar" />
                  </div>
                )}

                <a
                  href={pre.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-violet-300 hover:text-violet-200"
                >
                  {pre.linkLabel}
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Passo 2 — Clone */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg text-sm font-bold text-white shadow-md shadow-violet-500/30">
              2
            </span>
            <h2 className="text-2xl font-bold tracking-tight">
              Clone o repositório
            </h2>
          </div>

          <p className="text-sm text-muted-foreground">
            O repositório <code className="rounded bg-code-bg px-1.5 py-0.5 font-mono text-xs text-violet-300">learning-harness</code>{" "}
            é onde você vai construir seu harness. Cada Sprint adiciona uma
            camada nova nele.
          </p>

          <div className="rounded-2xl border border-violet-400/20 bg-card p-1">
            <div className="rounded-xl bg-code-bg p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <TerminalIcon className="h-3 w-3" />
                  PowerShell / Terminal
                </div>
                <CopyButton
                  texto={SETUP_COMMANDS.join("\n")}
                  label="Copiar tudo"
                />
              </div>
              <pre className="overflow-x-auto font-mono text-sm leading-relaxed">
                {SETUP_COMMANDS.map((cmd) => (
                  <div key={cmd} className="flex gap-2">
                    <span className="select-none text-muted-foreground">$</span>
                    <span className="text-violet-300">{cmd}</span>
                  </div>
                ))}
              </pre>
            </div>
          </div>

          <a
            href={CONFIG.learningHarnessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-violet-400/40 hover:bg-violet-500/5"
          >
            <GithubIcon className="h-4 w-4" />
            Ver no GitHub
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </section>

        {/* Passo 3 — Verificar */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg text-sm font-bold text-white shadow-md shadow-violet-500/30">
              3
            </span>
            <h2 className="text-2xl font-bold tracking-tight">
              Verifique que está tudo no lugar
            </h2>
          </div>

          <p className="text-sm text-muted-foreground">
            Rode o <strong className="text-foreground">Fiscal</strong> (Learning
            Gate) na pasta clonada. Ele vai te dizer onde você está:
          </p>

          <div className="rounded-2xl border border-border bg-card p-1">
            <div className="rounded-xl bg-code-bg p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <TerminalIcon className="h-3 w-3" />
                  Dentro de learning-harness/
                </div>
                <CopyButton texto="npm run gate -- --sprint=1" label="Copiar" />
              </div>
              <pre className="overflow-x-auto font-mono text-sm leading-relaxed">
                <div className="flex gap-2">
                  <span className="select-none text-muted-foreground">$</span>
                  <span className="text-violet-300">
                    npm run gate -- --sprint=1
                  </span>
                </div>
              </pre>
            </div>
          </div>

          <div className="rounded-xl border border-violet-400/20 bg-gradient-to-br from-violet-500/8 via-transparent to-fuchsia-500/4 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />
              <div className="text-sm leading-relaxed">
                <p className="font-medium text-foreground">
                  É normal sair "Nota D" agora.
                </p>
                <p className="mt-1 text-muted-foreground">
                  Você ainda não fez nada — o Fiscal está te mostrando o estado
                  inicial (todos os hooks vazios). Conforme você avança no
                  Sprint 1, a nota sobe até A.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Passo 4 — Começar */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg text-sm font-bold text-white shadow-md shadow-violet-500/30">
              4
            </span>
            <h2 className="text-2xl font-bold tracking-tight">
              Entre no Sprint 1
            </h2>
          </div>

          <p className="max-w-2xl text-sm text-muted-foreground">
            Agora você tem o ambiente pronto. Abra o Sprint 1 aqui no curso e
            siga o roteiro. Você vai <strong className="text-foreground">encomendar</strong>{" "}
            o código ao seu Claude/Gemini, <strong className="text-foreground">inspecionar</strong>{" "}
            com a checklist, e rodar o <strong className="text-foreground">Fiscal</strong> para
            validar.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/sprint/1"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg gradient-bg px-6 py-3 text-base font-semibold text-white shadow-lg shadow-violet-500/40 transition-all hover:shadow-xl hover:shadow-violet-500/60 hover:-translate-y-0.5"
            >
              <Sparkles className="h-4 w-4" />
              Entrar no Sprint 1
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/sobre"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-violet-400/40 hover:bg-violet-500/5"
            >
              <Code2 className="h-4 w-4" />
              Como funciona o curso
            </Link>
          </div>
        </section>

        {/* Problemas comuns */}
        <section className="space-y-4 border-t border-border/60 pt-10">
          <h2 className="text-xl font-semibold">Travou? Olhe aqui</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Problema
              titulo="git: command not found"
              solucao="Git não está instalado. Instale em git-scm.com e reabra o terminal."
            />
            <Problema
              titulo="node: command not found"
              solucao="Node.js não instalado ou não está no PATH. Instale em nodejs.org (versão LTS) e reabra o terminal."
            />
            <Problema
              titulo="npm install demora demais"
              solucao="Primeira execução baixa ~300 pacotes. Pode levar 1–3 minutos com internet boa. Se passar de 10min, cancele (Ctrl+C) e tente de novo."
            />
            <Problema
              titulo="npm run gate falha com 'gate' is not recognized"
              solucao="Você não está dentro da pasta learning-harness/. Use 'cd learning-harness' antes."
            />
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Problema({ titulo, solucao }: { titulo: string; solucao: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/60 p-4">
      <div className="font-mono text-xs font-semibold text-warning">
        {titulo}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
        {solucao}
      </p>
    </div>
  );
}
