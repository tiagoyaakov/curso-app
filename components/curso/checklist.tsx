"use client";

import { useEffect, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardList, Sparkles, Info, ChevronDown } from "lucide-react";
import {
  lerChecklist,
  gravarChecklist,
  modoPersistencia,
} from "@/lib/persistencia";
import { cn } from "@/lib/utils";

type Item = {
  id: string;
  texto: React.ReactNode;
  /** Explicação didática expansível abaixo do item. Opcional. */
  explicacao?: React.ReactNode;
};

type Props = {
  sprint: number;
  lab: string;
  titulo?: string;
  itens: Item[];
};

export function Checklist({
  sprint,
  lab,
  titulo = "Checklist de Inspeção",
  itens,
}: Props) {
  const [estado, setEstado] = useState<Record<string, boolean>>({});
  const [carregado, setCarregado] = useState(false);
  const [expandido, setExpandido] = useState<Record<string, boolean>>({});
  const [, startTransition] = useTransition();

  useEffect(() => {
    let cancelado = false;
    async function carregar() {
      const novo: Record<string, boolean> = {};
      for (const item of itens) {
        novo[item.id] = await lerChecklist({ sprint, lab, itemId: item.id });
      }
      if (!cancelado) {
        setEstado(novo);
        setCarregado(true);
      }
    }
    carregar();
    return () => {
      cancelado = true;
    };
  }, [sprint, lab, itens]);

  function alternar(id: string, valor: boolean) {
    setEstado((prev) => ({ ...prev, [id]: valor }));
    startTransition(() => {
      gravarChecklist({ sprint, lab, itemId: id }, valor);
    });
  }

  function alternarExpansao(id: string) {
    setExpandido((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const total = itens.length;
  const completos = Object.values(estado).filter(Boolean).length;
  const porcentagem = total === 0 ? 0 : Math.round((completos / total) * 100);
  const completou = carregado && completos === total;
  const modo = modoPersistencia();

  return (
    <div className="my-7 overflow-hidden rounded-xl border border-border bg-card">
      {/* Header com glow */}
      <div className="relative border-b border-border/60 bg-gradient-to-r from-violet-500/5 via-transparent to-transparent px-5 py-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 ring-1 ring-violet-400/30">
              <ClipboardList className="h-3.5 w-3.5 text-violet-300" />
            </div>
            <h4 className="text-sm font-semibold">{titulo}</h4>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className={cn("tabular-nums", completou && "text-violet-300 font-medium")}>
              {completos}/{total}
              {completou && (
                <Sparkles className="ml-1 inline h-3 w-3" />
              )}
            </span>
            <span className="hidden text-[10px] uppercase tracking-wider sm:inline">
              {modo === "supabase" ? "na conta" : "no navegador"}
            </span>
          </div>
        </div>

        {/* Progress bar com glow */}
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 shadow-[0_0_8px_rgba(167,139,250,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${porcentagem}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Items */}
      <ul className="space-y-1 p-3">
        {itens.map((item) => {
          const marcado = estado[item.id] ?? false;
          const aberto = expandido[item.id] ?? false;
          const temExplicacao = !!item.explicacao;

          return (
            <li key={item.id}>
              <div
                className={cn(
                  "flex items-start gap-3 rounded-lg px-3 py-2.5 transition-all",
                  "hover:bg-violet-500/5",
                  marcado && "opacity-60",
                )}
              >
                <Checkbox
                  checked={marcado}
                  onCheckedChange={(v) => alternar(item.id, !!v)}
                  disabled={!carregado}
                  className={cn(
                    "mt-0.5 border-border transition-all",
                    "data-[state=checked]:border-violet-400 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-violet-500 data-[state=checked]:to-fuchsia-500 data-[state=checked]:text-white",
                  )}
                />
                <div className="flex-1 space-y-0.5">
                  <label
                    onClick={(e) => {
                      // permitir click no texto pra marcar/desmarcar
                      // (mas não no botão de expandir)
                      if ((e.target as HTMLElement).closest("[data-toggle-explicacao]")) return;
                      alternar(item.id, !marcado);
                    }}
                    className={cn(
                      "cursor-pointer block text-sm leading-relaxed transition-all",
                      marcado && "text-muted-foreground line-through",
                    )}
                  >
                    {item.texto}
                    {temExplicacao && (
                      <button
                        type="button"
                        data-toggle-explicacao
                        onClick={(e) => {
                          e.stopPropagation();
                          alternarExpansao(item.id);
                        }}
                        aria-expanded={aberto}
                        className={cn(
                          "ml-1.5 inline-flex h-5 items-center gap-0.5 rounded px-1 text-[10px] font-mono uppercase tracking-wider transition-all",
                          aberto
                            ? "bg-violet-500/15 text-violet-300"
                            : "bg-muted text-muted-foreground hover:bg-violet-500/10 hover:text-violet-300",
                        )}
                      >
                        <Info className="h-2.5 w-2.5" />
                        ajuda
                        <ChevronDown
                          className={cn(
                            "h-2.5 w-2.5 transition-transform",
                            aberto && "rotate-180",
                          )}
                        />
                      </button>
                    )}
                  </label>

                  <AnimatePresence>
                    {aberto && item.explicacao && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 rounded-md border border-violet-400/20 bg-gradient-to-br from-violet-500/5 to-transparent p-3 text-xs leading-relaxed text-muted-foreground">
                          {item.explicacao}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Celebração ao completar */}
      <AnimatePresence>
        {completou && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border-t border-violet-400/20 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/5 to-transparent px-5 py-3 text-xs text-violet-300"
          >
            <Sparkles className="mr-1.5 inline h-3 w-3" />
            Checklist completa. Rode o Fiscal agora.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
