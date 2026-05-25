"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Layers, Shield, FileText, Network, Brain } from "lucide-react";

const SPRINTS = [
  {
    id: 1,
    titulo: "Alicerce",
    descricao: "Hooks + Proposal Engine",
    icone: Shield,
    disponivel: true,
  },
  {
    id: 2,
    titulo: "Contrato",
    descricao: "Spec-Driven + Event Sourcing",
    icone: FileText,
    disponivel: true,
  },
  {
    id: 3,
    titulo: "Fluxo",
    descricao: "Webhook + Queue + Debouncer",
    icone: Network,
    disponivel: true,
  },
  {
    id: 4,
    titulo: "Inteligência",
    descricao: "Loop detector + Approval + RAG eval",
    icone: Brain,
    disponivel: true,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        <Layers className="h-3 w-3" />
        Sprints
      </div>

      {SPRINTS.map((s) => {
        const href = `/sprint/${s.id}`;
        const ativo = pathname === href;
        const Icone = s.icone;

        return (
          <Link
            key={s.id}
            href={s.disponivel ? href : "#"}
            aria-disabled={!s.disponivel}
            className={cn(
              "group relative flex items-start gap-3 rounded-lg border px-3 py-2.5 text-sm transition-all",
              ativo
                ? "border-violet-400/30 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/5 text-foreground"
                : s.disponivel
                  ? "border-transparent text-muted-foreground hover:border-border hover:bg-muted/40 hover:text-foreground"
                  : "cursor-not-allowed border-transparent text-muted-foreground/40",
            )}
          >
            {/* Indicador ativo (barra violeta lateral) */}
            {ativo && (
              <span
                aria-hidden
                className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-violet-400 to-fuchsia-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]"
              />
            )}

            <span
              className={cn(
                "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border transition-colors",
                ativo
                  ? "border-violet-400/30 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 text-violet-300"
                  : "border-border",
              )}
            >
              <Icone className="h-3.5 w-3.5" />
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="font-medium">
                <span className="font-mono text-[10px] tracking-wider text-muted-foreground/80">
                  S{s.id}
                </span>{" "}
                {s.titulo}
              </span>
              <span className="text-xs text-muted-foreground/70">
                {s.descricao}
                {!s.disponivel && " · em breve"}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
