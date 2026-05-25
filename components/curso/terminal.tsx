"use client";

import { TerminalIcon } from "lucide-react";

type Props = {
  comando?: string;
  children: string;
  titulo?: string;
};

export function Terminal({ comando, children, titulo }: Props) {
  return (
    <div className="my-7 overflow-hidden rounded-xl border border-border bg-code-bg shadow-xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-border/60 bg-gradient-to-r from-violet-500/5 via-transparent to-fuchsia-500/5 px-3.5 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          </div>
          <span className="ml-2 flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <TerminalIcon className="h-3 w-3" />
            {titulo ?? "PowerShell"}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">
        {comando && (
          <div className="mb-2 flex gap-2 text-violet-300">
            <span className="select-none text-muted-foreground">$</span>
            <span>{comando}</span>
          </div>
        )}
        <pre className="whitespace-pre text-foreground/90">{children.trim()}</pre>
      </div>
    </div>
  );
}
