"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buscarTermo } from "@/lib/glossario";
import { cn } from "@/lib/utils";

type Props = {
  k: string;
  children?: React.ReactNode;
};

export function TermoGlossario({ k, children }: Props) {
  const termo = buscarTermo(k);

  if (!termo) {
    return <span className="underline decoration-dotted">{children ?? k}</span>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={`/glossario#${termo.slug}`}
          className={cn(
            "decoration-violet-400/50 underline decoration-dotted underline-offset-[3px]",
            "transition-all hover:decoration-violet-400 hover:text-violet-300",
          )}
        >
          {children ?? termo.termo}
        </Link>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-sm border-violet-400/20 bg-card/95 text-foreground shadow-xl shadow-violet-500/10 backdrop-blur-xl"
      >
        <div className="space-y-1.5">
          <div className="bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text font-semibold text-transparent">
            {termo.termo}
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {termo.definicao_curta}
          </p>
          <div className="border-t border-border/60 pt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-violet-400/80">
            Clique para definição completa
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
