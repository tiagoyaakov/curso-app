import { Clock, Target, CheckCircle2, Award, Info } from "lucide-react";

type Item = {
  label: string;
  valor: React.ReactNode;
  icone?: "duracao" | "prereq" | "entregavel" | "aprovacao";
};

type Props = {
  itens: Item[];
  titulo?: string;
};

const ICONES = {
  duracao: Clock,
  prereq: Target,
  entregavel: CheckCircle2,
  aprovacao: Award,
} as const;

/**
 * Card "Informações deste Sprint" — itens em linhas separadas, bem espaçados,
 * com ícone por categoria.
 *
 * Uso em MDX:
 *   <InfoSprint itens={[
 *     { icone: "duracao",    label: "Duração estimada",  valor: "10 horas" },
 *     { icone: "prereq",     label: "Pré-requisito",     valor: "Sprint 1 com nota B+" },
 *     { icone: "entregavel", label: "Entregável",        valor: "..." },
 *     { icone: "aprovacao",  label: "Aprovação",         valor: <>Grade A–D. Mínimo <strong>B</strong>.</> },
 *   ]} />
 */
export function InfoSprint({ itens, titulo = "Informações deste Sprint" }: Props) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-violet-400/25 bg-gradient-to-br from-violet-500/8 via-transparent to-fuchsia-500/4 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-violet-400/20 bg-violet-500/5 px-5 py-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-card/60 ring-1 ring-violet-400/30">
          <Info className="h-3.5 w-3.5 text-violet-300" />
        </div>
        <h4 className="text-sm font-semibold text-violet-300">{titulo}</h4>
      </div>

      {/* Lista */}
      <ul className="divide-y divide-border/40">
        {itens.map((item) => {
          const Icone = item.icone ? ICONES[item.icone] : null;
          return (
            <li
              key={item.label}
              className="flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-violet-500/5"
            >
              {Icone && (
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-card border border-border">
                  <Icone className="h-3 w-3 text-violet-300" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                  {item.label}
                </div>
                <div className="mt-0.5 text-sm leading-relaxed text-foreground">
                  {item.valor}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
