import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";

type Params = { id: string };

const SPRINT_IDS_VALIDOS = ["1", "2", "3", "4"];

export async function generateStaticParams(): Promise<Params[]> {
  return SPRINT_IDS_VALIDOS.map((id) => ({ id }));
}

export default async function SprintPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  if (!SPRINT_IDS_VALIDOS.includes(id)) {
    notFound();
  }

  // Dinâmico para que o build não falhe se um MDX ainda não existir
  let Conteudo: React.ComponentType;
  try {
    const mod = await import(`@/content/sprints/${id.padStart(2, "0")}.mdx`);
    Conteudo = mod.default;
  } catch {
    notFound();
  }

  return (
    <AppShell>
      <article className="prose-curso animate-fade-in">
        <Conteudo />
      </article>
    </AppShell>
  );
}
