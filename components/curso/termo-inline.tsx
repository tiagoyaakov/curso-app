"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";
import { buscarTermo } from "@/lib/glossario";
import { cn } from "@/lib/utils";

type Props = {
  /** Slug ou nome do termo (case-insensitive). Ex: "harness", "MCP". */
  k: string;
  /** Texto a exibir (se diferente do termo). */
  children?: React.ReactNode;
};

/**
 * Termo do glossário com expansão INLINE — clique abre a definição embaixo
 * do termo, no contexto. Não tira o aluno da leitura.
 *
 * Uso em MDX: <TermoInline k="harness">harness</TermoInline>
 */
export function TermoInline({ k, children }: Props) {
  const [aberto, setAberto] = useState(false);
  const termo = buscarTermo(k);

  if (!termo) {
    return <span className="underline decoration-dotted">{children ?? k}</span>;
  }

  return (
    <span className="inline-block">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        className={cn(
          "group/termo inline-flex items-center gap-0.5 align-baseline",
          "decoration-violet-400/60 underline decoration-dotted decoration-2 underline-offset-[3px]",
          "transition-all hover:decoration-violet-400 hover:text-violet-300",
          aberto && "text-violet-300",
        )}
      >
        {children ?? termo.termo}
        <ChevronDown
          className={cn(
            "h-3 w-3 text-violet-400/60 transition-transform",
            aberto && "rotate-180 text-violet-300",
          )}
        />
      </button>

      <AnimatePresence>
        {aberto && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="block overflow-hidden"
          >
            <span className="my-2 block rounded-lg border border-violet-400/30 bg-gradient-to-br from-violet-500/5 via-card to-fuchsia-500/5 p-3 text-sm leading-relaxed text-foreground/95 not-italic">
              <span className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
                <BookOpen className="h-3 w-3" />
                {termo.termo}
              </span>
              <span className="block font-medium text-foreground">
                {termo.definicao_curta}
              </span>
              {termo.definicao_longa &&
                termo.definicao_longa !== termo.definicao_curta && (
                  <span className="mt-1.5 block text-xs text-muted-foreground">
                    {termo.definicao_longa}
                  </span>
                )}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
