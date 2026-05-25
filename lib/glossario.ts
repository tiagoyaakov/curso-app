import glossarioJson from "@/content/glossario.json";

export type TermoGlossario = {
  slug: string;
  termo: string;
  aliases: string[];
  definicao_curta: string;
  definicao_longa: string;
  sprint_introduzido: number;
};

export const TODOS_TERMOS: TermoGlossario[] = glossarioJson.termos;

/**
 * Busca um termo por slug, nome ou alias (case-insensitive).
 */
export function buscarTermo(query: string): TermoGlossario | undefined {
  const q = query.toLowerCase().trim();
  return TODOS_TERMOS.find((t) => {
    if (t.slug === q) return true;
    if (t.termo.toLowerCase() === q) return true;
    return t.aliases.some((a) => a.toLowerCase() === q);
  });
}

export function termosPorSprint(sprint: number): TermoGlossario[] {
  return TODOS_TERMOS.filter((t) => t.sprint_introduzido === sprint).sort(
    (a, b) => a.termo.localeCompare(b.termo, "pt-BR"),
  );
}

export function todosOrdenados(): TermoGlossario[] {
  return [...TODOS_TERMOS].sort((a, b) =>
    a.termo.localeCompare(b.termo, "pt-BR"),
  );
}
