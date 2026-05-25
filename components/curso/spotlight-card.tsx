"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Se passar `href`, renderiza como Link clicável. */
  href?: string;
  /** Cor do glow (default: violet). */
  variant?: "violet" | "fuchsia" | "rose";
};

/**
 * Card com efeito de "spotlight" — uma borda que ACOMPANHA o cursor.
 *
 * Implementação:
 *  - Captura mousemove no card e atualiza CSS variables `--mx` e `--my`.
 *  - Uma camada `::before` (via classe `.spotlight-glow`) renderiza um
 *    radial-gradient centrado em (--mx, --my), visível só na borda
 *    via mask trick (linear gradient menos linear gradient = só borda).
 *
 * Uso:
 *   <SpotlightCard href="/sprint/1">
 *     <h3>Sprint 1</h3>
 *   </SpotlightCard>
 */
export function SpotlightCard({
  children,
  className,
  href,
  variant = "violet",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  const colorMap = {
    violet: "168, 139, 250",
    fuchsia: "232, 121, 249",
    rose: "251, 113, 133",
  } as const;

  const innerProps = {
    onMouseMove: handleMouseMove,
    className: cn(
      "spotlight-card group relative overflow-hidden rounded-2xl border border-border bg-card",
      className,
    ),
    style: {
      "--spotlight-color": colorMap[variant],
    } as React.CSSProperties,
  };

  // Conteúdo interno é o mesmo, só muda o elemento externo
  const innerContent = (
    <>
      {/* Spotlight ring (borda que segue o cursor) */}
      <span aria-hidden className="spotlight-ring pointer-events-none" />
      {/* Spotlight glow (gradient interno suave) */}
      <span aria-hidden className="spotlight-bg pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </>
  );

  if (href) {
    return (
      <Link href={href} ref={ref} {...innerProps}>
        {innerContent}
      </Link>
    );
  }

  return (
    <div ref={ref} {...innerProps}>
      {innerContent}
    </div>
  );
}
