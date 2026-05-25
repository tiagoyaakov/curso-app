"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, Check, X, Eye, EyeOff, Zap, Lightbulb, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Opcao = {
  id: string;
  texto: React.ReactNode;
  correta?: boolean;
};

type Questao = {
  pergunta: React.ReactNode;
  opcoes?: Opcao[];
  resposta?: React.ReactNode;
  /** Dica didática opcional (expansível "Como pensar nesta questão"). */
  comoPensar?: React.ReactNode;
};

type Props = {
  numero: number;
  titulo: string;
  tempoEstimado?: string;
  questoes: Questao[];
};

export function PTP({ numero, titulo, tempoEstimado, questoes }: Props) {
  return (
    <div className="my-10 overflow-hidden rounded-xl border border-border bg-card">
      {/* Header com glow lateral */}
      <div className="relative border-b border-border/60 bg-gradient-to-r from-violet-500/8 via-transparent to-fuchsia-500/8 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 items-center gap-1.5 rounded-md bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 px-2.5 font-mono text-[11px] font-bold uppercase tracking-wider text-violet-300 ring-1 ring-violet-400/30">
              <Zap className="h-3 w-3" />
              PTP {numero}
            </span>
            <h4 className="text-sm font-semibold">{titulo}</h4>
          </div>
          {tempoEstimado && (
            <span className="rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              {tempoEstimado}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-7 p-5">
        {questoes.map((q, idx) => (
          <QuestaoBlock
            key={idx}
            questao={q}
            index={idx}
            totalQuestoes={questoes.length}
          />
        ))}
      </div>
    </div>
  );
}

function QuestaoBlock({
  questao,
  index,
  totalQuestoes,
}: {
  questao: Questao;
  index: number;
  totalQuestoes: number;
}) {
  const [escolhida, setEscolhida] = useState<string | null>(null);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [mostrarComoPensar, setMostrarComoPensar] = useState(false);

  return (
    <div className="space-y-3">
      {totalQuestoes > 1 && (
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80">
          Questão {index + 1} / {totalQuestoes}
        </div>
      )}

      <div className="text-sm leading-relaxed">{questao.pergunta}</div>

      {/* Dica "Como pensar nesta questão" — antes das opções */}
      {questao.comoPensar && (
        <div>
          <button
            type="button"
            onClick={() => setMostrarComoPensar((v) => !v)}
            aria-expanded={mostrarComoPensar}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-medium transition-all",
              mostrarComoPensar
                ? "border-violet-400/40 bg-violet-500/10 text-violet-300"
                : "border-border bg-card text-muted-foreground hover:border-violet-400/30 hover:text-violet-300",
            )}
          >
            <Lightbulb className="h-3 w-3" />
            Como pensar nesta questão
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform",
                mostrarComoPensar && "rotate-180",
              )}
            />
          </button>

          <AnimatePresence>
            {mostrarComoPensar && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-2 rounded-md border border-violet-400/25 bg-gradient-to-br from-violet-500/5 to-transparent p-3 text-xs leading-relaxed text-muted-foreground">
                  {questao.comoPensar}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {questao.opcoes && (
        <div className="space-y-2 pt-1">
          {questao.opcoes.map((op) => {
            const selecionada = escolhida === op.id;
            const acertou = selecionada && op.correta;
            const errou = selecionada && !op.correta;

            return (
              <motion.button
                key={op.id}
                onClick={() => setEscolhida(op.id)}
                disabled={escolhida !== null && !selecionada}
                whileTap={{ scale: 0.99 }}
                className={cn(
                  "group flex w-full items-start gap-3 rounded-lg border px-3.5 py-3 text-left text-sm transition-all",
                  !escolhida && "border-border hover:border-violet-400/40 hover:bg-violet-500/5",
                  selecionada && acertou && "border-success/50 bg-success/10",
                  selecionada && errou && "border-danger/50 bg-danger/10",
                  escolhida && !selecionada && "opacity-30",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold uppercase transition-all",
                    !selecionada && "border-border text-muted-foreground group-hover:border-violet-400/50 group-hover:text-violet-300",
                    acertou && "border-success bg-success text-white",
                    errou && "border-danger bg-danger text-white",
                  )}
                >
                  {acertou ? (
                    <Check className="h-3 w-3" />
                  ) : errou ? (
                    <X className="h-3 w-3" />
                  ) : (
                    op.id
                  )}
                </span>
                <span className="flex-1">{op.texto}</span>
              </motion.button>
            );
          })}
        </div>
      )}

      {questao.resposta && (
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMostrarResposta((v) => !v)}
            className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:bg-violet-500/10 hover:text-violet-300"
          >
            {mostrarResposta ? (
              <>
                <EyeOff className="h-3.5 w-3.5" /> Esconder resposta
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5" /> Ver resposta
              </>
            )}
          </Button>

          <AnimatePresence>
            {mostrarResposta && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-2 rounded-lg border border-violet-400/30 bg-gradient-to-br from-violet-500/8 via-fuchsia-500/4 to-transparent p-4 text-sm leading-relaxed">
                  <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300">
                    <Brain className="h-3 w-3" /> Resposta
                  </div>
                  {questao.resposta}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
