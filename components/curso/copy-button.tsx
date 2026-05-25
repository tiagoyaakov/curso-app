"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  texto: string;
  label?: string;
  className?: string;
};

/** Botão "Copiar" reutilizável com feedback visual. */
export function CopyButton({ texto, label = "Copiar", className }: Props) {
  const [copiado, setCopiado] = useState(false);

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
    <Button
      variant="ghost"
      size="sm"
      onClick={copiar}
      className={cn(
        "h-7 gap-1.5 text-xs hover:bg-violet-500/10 hover:text-violet-300",
        className,
      )}
    >
      {copiado ? (
        <>
          <Check className="h-3.5 w-3.5 text-success" />
          Copiado
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" />
          {label}
        </>
      )}
    </Button>
  );
}
