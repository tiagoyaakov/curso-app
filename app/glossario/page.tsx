import { AppShell } from "@/components/layout/app-shell";
import { todosOrdenados } from "@/lib/glossario";
import { BookMarked } from "lucide-react";

export const metadata = {
  title: "Glossário · Engenharia de Harness",
};

export default function GlossarioPage() {
  const termos = todosOrdenados();

  return (
    <AppShell>
      <div className="space-y-8">
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <BookMarked className="h-3 w-3" />
            Material de apoio
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Glossário</h1>
          <p className="max-w-2xl text-muted-foreground">
            Termos usados em todo o curso. Bateu numa palavra que não conhece?
            Aqui você encontra. Em qualquer Spec Manual, os termos aparecem
            sublinhados com tooltip — clique para vir direto à definição completa.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2">
          {termos.map((t) => (
            <article
              key={t.slug}
              id={t.slug}
              className="scroll-mt-24 rounded-lg border border-border bg-card p-4 transition-colors target:border-accent"
            >
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <h2 className="text-base font-semibold text-accent">
                  {t.termo}
                </h2>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
                  Sprint {t.sprint_introduzido}
                </span>
              </div>
              <p className="text-sm font-medium leading-relaxed text-foreground/90">
                {t.definicao_curta}
              </p>
              {t.definicao_longa && t.definicao_longa !== t.definicao_curta && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t.definicao_longa}
                </p>
              )}
              {t.aliases.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground/70">
                  <span className="uppercase tracking-wider">também:</span>
                  {t.aliases.map((a) => (
                    <span
                      key={a}
                      className="rounded bg-muted px-1.5 py-0.5 font-mono"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
