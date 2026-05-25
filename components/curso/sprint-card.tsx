"use client";

import { useCallback, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  id: number;
  titulo: string;
  descricao: string;
  /** Ícone já renderizado como JSX (Server pode passar ReactNode para Client). */
  icone: ReactNode;
  horas: number;
  disponivel: boolean;
};

export function SprintCard({
  id,
  titulo,
  descricao,
  icone,
  horas,
  disponivel,
}: Props) {
  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  const baseClass = cn(
    "spotlight-card group relative block overflow-hidden rounded-2xl border border-border bg-card p-6 transition-transform",
    disponivel
      ? "cursor-pointer hover:-translate-y-1"
      : "opacity-50 cursor-not-allowed",
  );

  const conteudo = (
    <>
      <span aria-hidden className="spotlight-ring pointer-events-none" />
      <span aria-hidden className="spotlight-bg pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 ring-1 ring-violet-400/30 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-violet-300">
              {icone}
            </div>
            <div>
              <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400/80">
                Sprint {String(id).padStart(2, "0")}
              </div>
              <div className="text-xl font-semibold tracking-tight">
                {titulo}
              </div>
            </div>
          </div>

          {!disponivel ? (
            <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Em breve
            </span>
          ) : (
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-violet-300 group-hover:translate-x-1" />
          )}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {descricao}
        </p>

        <div className="mt-5 flex items-center gap-1.5 text-xs text-muted-foreground/80">
          <Clock className="h-3 w-3" />
          {horas}h
        </div>
      </div>
    </>
  );

  if (disponivel) {
    return (
      <Link
        href={`/sprint/${id}`}
        onMouseMove={handleMouseMove}
        className={baseClass}
        style={{ "--spotlight-color": "168, 139, 250" } as React.CSSProperties}
      >
        {conteudo}
      </Link>
    );
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={baseClass}
      style={{ "--spotlight-color": "168, 139, 250" } as React.CSSProperties}
    >
      {conteudo}
    </div>
  );
}
