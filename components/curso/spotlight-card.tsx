"use client";

import { useCallback, type MouseEvent, type ReactNode } from "react";
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
 *  - Captura mousemove no próprio elemento (via currentTarget) e atualiza
 *    CSS variables `--mx` e `--my`.
 *  - Uma camada `::before` (via classe `.spotlight-ring`) renderiza um
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
  // Usa currentTarget (sempre o próprio elemento) — evita conflito de tipo
  // entre HTMLAnchorElement (Link) e HTMLDivElement (div).
  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  const colorMap = {
    violet: "168, 139, 250",
    fuchsia: "232, 121, 249",
    rose: "251, 113, 133",
  } as const;

  const sharedClassName = cn(
    "spotlight-card group relative overflow-hidden rounded-2xl border border-border bg-card",
    className,
  );

  const sharedStyle = {
    "--spotlight-color": colorMap[variant],
  } as React.CSSProperties;

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
      <Link
        href={href}
        onMouseMove={handleMouseMove}
        className={sharedClassName}
        style={sharedStyle}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={sharedClassName}
      style={sharedStyle}
    >
      {innerContent}
    </div>
  );
}
