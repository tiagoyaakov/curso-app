"use client";

import { useState } from "react";
import { Check, Copy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  children: string;
  titulo?: string;
};

export function PedidoAoAgente({ children, titulo = "Pedido ao agente" }: Props) {
  const [copiado, setCopiado] = useState(false);
  const texto = typeof children === "string" ? children.trim() : String(children);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // ignora
    }
  }

  return (
    <div className="group relative my-7 overflow-hidden rounded-xl">
      {/* Border gradient sutil */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-rose-500/30 opacity-40 transition-opacity group-hover:opacity-100"
      />

      <div className="relative m-px rounded-[calc(0.75rem-1px)] bg-card">
        <div className="flex items-center justify-between border-b border-border/60 bg-gradient-to-r from-violet-500/5 via-transparent to-fuchsia-500/5 px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 ring-1 ring-violet-400/30">
              <Send className="h-3 w-3 text-violet-300" />
            </div>
            <span>{titulo}</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              · cole no seu Claude / Gemini
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={copiar}
            className="h-7 gap-1.5 text-xs hover:bg-violet-500/10 hover:text-violet-300"
          >
            {copiado ? (
              <>
                <Check className="h-3.5 w-3.5 text-success" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copiar
              </>
            )}
          </Button>
        </div>
        <pre className="overflow-x-auto bg-code-bg p-4 font-mono text-xs leading-relaxed text-foreground/90">
          <code>{texto}</code>
        </pre>
      </div>
    </div>
  );
}
