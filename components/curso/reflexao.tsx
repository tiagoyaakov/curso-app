"use client";

import { useEffect, useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Brain, Check, FileText } from "lucide-react";
import { lerReflexao, gravarReflexao, modoPersistencia } from "@/lib/persistencia";
import { cn } from "@/lib/utils";

type Props = {
  sprint: number;
  lab: string;
  pergunta: string;
  palavrasMin?: number;
  palavrasMax?: number;
};

export function Reflexao({
  sprint,
  lab,
  pergunta,
  palavrasMin = 100,
  palavrasMax = 200,
}: Props) {
  const [texto, setTexto] = useState("");
  const [carregado, setCarregado] = useState(false);
  const [salvando, startSalvar] = useTransition();
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    let cancelado = false;
    async function carregar() {
      const t = await lerReflexao({ sprint, lab });
      if (!cancelado) {
        setTexto(t);
        setCarregado(true);
      }
    }
    carregar();
    return () => {
      cancelado = true;
    };
  }, [sprint, lab]);

  useEffect(() => {
    if (!carregado) return;
    const timer = setTimeout(() => {
      startSalvar(() => {
        gravarReflexao({ sprint, lab }, texto);
      });
    }, 800);
    return () => clearTimeout(timer);
  }, [texto, carregado, sprint, lab]);

  const palavras = texto.trim().split(/\s+/).filter(Boolean).length;
  const dentro = palavras >= palavrasMin && palavras <= palavrasMax;

  async function copiarParaJuiz() {
    const payload = `# Reflexão — Sprint ${sprint}, Lab ${lab}\n\n**Pergunta:** ${pergunta}\n\n**Resposta:**\n${texto.trim()}`;
    try {
      await navigator.clipboard.writeText(payload);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // ignora
    }
  }

  return (
    <div className="my-7 overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border/60 bg-gradient-to-r from-violet-500/5 via-transparent to-transparent px-5 py-3.5">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 ring-1 ring-violet-400/30">
            <Brain className="h-3.5 w-3.5 text-violet-300" />
          </div>
          <div className="flex-1">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-400/80">
              Reflexão · Sprint {sprint} · Lab {lab}
            </div>
            <p className="mt-1 text-sm font-medium leading-relaxed">
              {pergunta}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder={`Escreva entre ${palavrasMin} e ${palavrasMax} palavras...`}
          disabled={!carregado}
          rows={8}
          className="resize-none border-border bg-background/40 text-sm leading-relaxed transition-colors focus-visible:border-violet-400/40 focus-visible:ring-violet-400/20"
        />

        <div className="mt-3 flex items-center justify-between gap-3 text-xs">
          <div
            className={cn(
              "tabular-nums",
              !texto.trim() && "text-muted-foreground/60",
              palavras > 0 && palavras < palavrasMin && "text-warning",
              palavras > palavrasMax * 1.2 && "text-danger",
              dentro && "bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text font-medium text-transparent",
            )}
          >
            {palavras} palavras
            {!dentro && palavras > 0 && (
              <span className="ml-2 text-muted-foreground/70">
                (alvo: {palavrasMin}–{palavrasMax})
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-muted-foreground/70">
            <span>
              {salvando ? "salvando..." : carregado ? "salvo" : "carregando..."}
            </span>
            <span className="text-muted-foreground/40">·</span>
            <span className="text-[10px] uppercase tracking-wider">
              {modoPersistencia() === "supabase" ? "conta" : "navegador"}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={copiarParaJuiz}
            disabled={palavras < 10}
            className={cn(
              "gap-1.5 border-border bg-background/60 transition-all",
              dentro && "border-violet-400/30 hover:border-violet-400/60 hover:bg-violet-500/10 hover:text-violet-300",
            )}
          >
            {copiado ? (
              <>
                <Check className="h-3.5 w-3.5 text-success" />
                Copiado para o Juiz
              </>
            ) : (
              <>
                <FileText className="h-3.5 w-3.5" />
                Copiar para o Juiz
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
