import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroIllustration } from "@/components/curso/hero-illustration";
import { SprintCard } from "@/components/curso/sprint-card";
import { SpotlightCard } from "@/components/curso/spotlight-card";
import { Reveal } from "@/components/curso/reveal";
import {
  ArrowRight,
  Sparkles,
  Shield,
  FileText,
  Network,
  Brain,
  Hammer,
  Eye,
  ScrollText,
} from "lucide-react";

const SPRINTS = [
  {
    id: 1,
    titulo: "Alicerce",
    descricao:
      "Hooks de segurança, governança do agente e o Motor de Decisão. Sua primeira camada de controle.",
    icone: <Shield />,
    horas: 10,
    disponivel: true,
  },
  {
    id: 2,
    titulo: "Contrato",
    descricao:
      "Spec-Driven Development. O diário do agente em log imutável que nunca apaga.",
    icone: <FileText />,
    horas: 10,
    disponivel: true,
  },
  {
    id: 3,
    titulo: "Fluxo",
    descricao:
      "Orquestração concorrente. Múltiplos agentes em paralelo + recebimento de mensagens.",
    icone: <Network />,
    horas: 10,
    disponivel: true,
  },
  {
    id: 4,
    titulo: "Inteligência",
    descricao:
      "Observabilidade, memória avançada e o portão de intervenção humana.",
    icone: <Brain />,
    horas: 10,
    disponivel: true,
  },
];

const PRINCIPIOS = [
  {
    icone: <Hammer className="h-5 w-5 text-violet-300" />,
    titulo: "Você é o Arquiteto",
    descricao:
      "Você lê o conceito, especifica o pedido, inspeciona a entrega. Nunca digita TypeScript.",
  },
  {
    icone: <Sparkles className="h-5 w-5 text-violet-300" />,
    titulo: "Seu agente é o Pedreiro",
    descricao:
      "Claude ou Gemini recebe o pedido bem formado e escreve o código. Sob comando.",
  },
  {
    icone: <Eye className="h-5 w-5 text-violet-300" />,
    titulo: "O harness é o Fiscal",
    descricao:
      "Hooks, testes e o Learning Gate validam mecanicamente se o trabalho passa. Determinístico.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* ================================================================
            HERO
            ============================================================= */}
        <section className="relative overflow-hidden">
          {/* Orb decorativo violeta — esquerda */}
          <div
            className="pointer-events-none absolute -left-32 top-32 -z-10 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl animate-orb-drift"
            aria-hidden
          />
          {/* Orb decorativo rosa — direita */}
          <div
            className="pointer-events-none absolute -right-32 top-64 -z-10 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl animate-orb-drift"
            style={{ animationDelay: "10s" }}
            aria-hidden
          />

          <div className="mx-auto grid max-w-[1600px] gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:py-32">
            <Reveal>
              <div className="space-y-7">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
                  </span>
                  <span className="text-muted-foreground">
                    Curso por{" "}
                    <span className="font-semibold text-foreground">Tiago Yaakov</span>
                    {" "}· AgentOps · Spec-Driven · Harness Engineering
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                  Domine a{" "}
                  <span className="gradient-text glow-text">
                    Engenharia de Harness
                  </span>{" "}
                  para agentes de IA.
                </h1>

                {/* Subtítulo */}
                <p className="max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Você usa Claude ou Gemini todo dia. Falta um degrau: deixar
                  de <em>pedir</em> e começar a <strong className="text-foreground">orquestrar</strong>.
                  Em <strong className="text-foreground">40h</strong>, sem precisar programar.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/sprint/1"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg gradient-bg px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/50 hover:-translate-y-0.5"
                  >
                    <span className="relative z-10">Começar Sprint 1</span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    {/* Shimmer overlay */}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </Link>

                  <Link
                    href="/sobre"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-md transition-all hover:border-violet-400/40 hover:bg-card"
                  >
                    Como funciona
                  </Link>
                </div>

                {/* Prova social */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <ScrollText className="h-3.5 w-3.5 text-violet-400" />
                    <span>4 Sprints · 40 horas</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-violet-400" />
                    <span>Rubrica A–D com Learning Gate</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Brain className="h-3.5 w-3.5 text-violet-400" />
                    <span>LLM-as-a-Judge</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Ilustração */}
            <Reveal delay={0.2}>
              <div className="flex items-center justify-center lg:justify-end">
                <HeroIllustration />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================================================================
            PRINCÍPIOS (3 papéis)
            ============================================================= */}
        <section className="border-t border-border/50 py-20 sm:py-28">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                  O modelo de 3 papéis
                </div>
                <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  O curso ensina a orquestrar agentes{" "}
                  <span className="gradient-text">praticando isso</span> em si
                  mesmo.
                </h2>
                <p className="mt-5 text-balance text-base text-muted-foreground sm:text-lg">
                  Meta-aula: você aprende a virar orquestrador encomendando ao
                  seu próprio agente — e o harness do curso fiscaliza a entrega.
                </p>
              </div>
            </Reveal>

            <div className="mt-16 grid gap-5 sm:grid-cols-3">
              {PRINCIPIOS.map((p, i) => {
                const variant = (["violet", "fuchsia", "rose"] as const)[i % 3];
                return (
                  <Reveal key={p.titulo} delay={0.1 * i}>
                    <SpotlightCard
                      variant={variant}
                      className="h-full p-6 transition-transform hover:-translate-y-1"
                    >
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 ring-1 ring-violet-400/30">
                        {p.icone}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">{p.titulo}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {p.descricao}
                      </p>
                    </SpotlightCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================================
            SPRINTS
            ============================================================= */}
        <section className="border-t border-border/50 py-20 sm:py-28">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
                  4 Sprints Arquiteturais
                </div>
                <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Você sai do <span className="text-muted-foreground line-through">vibe coding</span>{" "}
                  e entra na <span className="gradient-text">arquitetura de produção</span>.
                </h2>
                <p className="mt-5 text-balance text-base text-muted-foreground sm:text-lg">
                  Cada Sprint constrói uma camada permanente no seu harness.
                  Efeito Catraca: o que entrou, não sai.
                </p>
              </div>
            </Reveal>

            <div className="mt-16 grid gap-5 md:grid-cols-2">
              {SPRINTS.map((s, i) => (
                <Reveal key={s.id} delay={0.05 * i}>
                  <SprintCard {...s} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            CTA FINAL
            ============================================================= */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden
          >
            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-rose-500/20 blur-3xl" />
          </div>

          <Reveal>
            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">
                Comece o <span className="gradient-text">Sprint 1</span> agora.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
                10 horas. Sem cartão. Sem instalação além de Node 20 e o seu
                Claude/Gemini. Você nunca digita uma linha de TypeScript.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/sprint/1"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg gradient-bg px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/40 transition-all hover:shadow-xl hover:shadow-violet-500/60 hover:-translate-y-0.5 animate-pulse-glow"
                >
                  <span className="relative z-10">Entrar no Sprint 1</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
