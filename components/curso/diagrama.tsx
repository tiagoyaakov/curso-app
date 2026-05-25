"use client";

import { useEffect, useRef, useState, useId } from "react";
import { useTheme } from "next-themes";

type Props = {
  children: string;
  legenda?: string;
};

/**
 * Diagrama Mermaid renderizado no client.
 * Uso em MDX:
 *   <Diagrama legenda="Fluxo Proposal Engine">
 *   {`flowchart LR
 *     A[Agente] --> B[Harness] --> C[Sistema]
 *   `}
 *   </Diagrama>
 */
export function Diagrama({ children, legenda }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === "dark" ? "dark" : "default",
          themeVariables: {
            fontFamily:
              "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
            primaryColor: resolvedTheme === "dark" ? "#a78bfa" : "#8b5cf6",
            primaryTextColor:
              resolvedTheme === "dark" ? "#fafafa" : "#18181b",
            primaryBorderColor:
              resolvedTheme === "dark" ? "#c4b5fd" : "#7c3aed",
            lineColor:
              resolvedTheme === "dark" ? "#a78bfa" : "#8b5cf6",
            secondaryColor:
              resolvedTheme === "dark" ? "#1f1f2e" : "#f4f4f5",
            tertiaryColor:
              resolvedTheme === "dark" ? "#27273a" : "#e4e4e7",
            background: "transparent",
            mainBkg: resolvedTheme === "dark" ? "#1a1a28" : "#f4f4f5",
            nodeBorder:
              resolvedTheme === "dark" ? "#a78bfa" : "#8b5cf6",
          },
          securityLevel: "loose",
        });

        const { svg } = await mermaid.render(`mermaid-${id}`, children.trim());
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Falha ao renderizar diagrama");
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [children, resolvedTheme, id]);

  return (
    <figure className="my-10 w-full overflow-hidden rounded-2xl border border-violet-400/15 bg-gradient-to-br from-card via-card to-violet-500/[0.03] p-8 shadow-lg shadow-violet-500/5 sm:p-10">
      {error ? (
        <pre className="overflow-x-auto text-xs text-danger">{error}</pre>
      ) : (
        <div
          ref={ref}
          className="flex min-h-[280px] items-center justify-center [&_svg]:h-auto [&_svg]:w-full [&_svg]:max-w-4xl"
        />
      )}
      {legenda && (
        <figcaption className="mt-6 text-center text-xs text-muted-foreground">
          {legenda}
        </figcaption>
      )}
    </figure>
  );
}
