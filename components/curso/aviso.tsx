import { Info, AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type Variante = "info" | "atencao" | "sucesso" | "dica";

type Props = {
  variante?: Variante;
  titulo?: string;
  children: React.ReactNode;
};

const config: Record<
  Variante,
  {
    icone: typeof Info;
    cor: string;
    bg: string;
    borda: string;
    glow: string;
  }
> = {
  info: {
    icone: Info,
    cor: "text-violet-300",
    bg: "bg-gradient-to-br from-violet-500/8 via-transparent to-fuchsia-500/4",
    borda: "border-violet-400/25",
    glow: "ring-violet-400/30",
  },
  atencao: {
    icone: AlertTriangle,
    cor: "text-warning",
    bg: "bg-gradient-to-br from-warning/8 via-transparent to-warning/4",
    borda: "border-warning/30",
    glow: "ring-warning/30",
  },
  sucesso: {
    icone: CheckCircle2,
    cor: "text-success",
    bg: "bg-gradient-to-br from-success/8 via-transparent to-success/4",
    borda: "border-success/30",
    glow: "ring-success/30",
  },
  dica: {
    icone: Lightbulb,
    cor: "text-violet-300",
    bg: "bg-card",
    borda: "border-border",
    glow: "ring-violet-400/20",
  },
};

export function Aviso({ variante = "info", titulo, children }: Props) {
  const { icone: Icone, cor, bg, borda } = config[variante];

  return (
    <div
      className={cn(
        "my-5 flex gap-3 rounded-xl border p-4 backdrop-blur-sm",
        bg,
        borda,
      )}
    >
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-card/60 ring-1",
          config[variante].glow,
        )}
      >
        <Icone className={cn("h-3.5 w-3.5", cor)} />
      </div>
      <div className="flex-1 space-y-1.5">
        {titulo && <div className={cn("font-semibold text-sm", cor)}>{titulo}</div>}
        <div className="text-sm leading-relaxed text-foreground/90 [&_p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
