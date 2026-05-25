import { AppShell } from "@/components/layout/app-shell";
import { GraduationCap } from "lucide-react";

export const metadata = {
  title: "Sobre o curso · Engenharia de Harness",
};

export default function SobrePage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <header className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <GraduationCap className="h-3 w-3" />
            Sobre o curso
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Você é o arquiteto.
          </h1>
        </header>

        <div className="prose-curso">
          <p>
            Este curso é para quem usa Claude ou Gemini para "fazer funcionar",
            mas quer subir um degrau: deixar de ser quem <em>pede</em> e virar quem
            <strong> orquestra</strong>.
          </p>

          <h2>O modelo de 3 papéis</h2>
          <p>Em cada Lab você opera em três papéis:</p>
          <ul>
            <li>
              <strong className="text-accent">🏛️ Arquiteto</strong> — você. Lê o
              conceito, escreve um pedido bem feito, inspeciona com checklist,
              decide aceitar ou devolver.
            </li>
            <li>
              <strong className="text-accent">🧱 Pedreiro</strong> — seu agente
              (Claude ou Gemini). Recebe o pedido, escreve o código.
            </li>
            <li>
              <strong className="text-accent">👮 Fiscal</strong> — o harness e
              o Learning Gate. Valida deterministicamente se o trabalho está OK.
            </li>
          </ul>

          <p>
            Você <strong>nunca digita TypeScript</strong>. Mas você precisa
            entender o que está sendo construído — senão não consegue pedir bem
            nem inspecionar.
          </p>

          <h2>4 Sprints, 10h cada</h2>
          <ul>
            <li><strong>Sprint 1 — Alicerce:</strong> hooks, governança, motor de decisão.</li>
            <li><strong>Sprint 2 — Contrato:</strong> spec viva e log imutável.</li>
            <li><strong>Sprint 3 — Fluxo:</strong> múltiplos agentes em paralelo e borda.</li>
            <li><strong>Sprint 4 — Inteligência:</strong> observabilidade, memória, intervenção humana.</li>
          </ul>

          <h2>Pré-requisitos</h2>
          <ul>
            <li><strong>Node.js 20+</strong> (verifique com <code>node --version</code>)</li>
            <li><strong>Docker Desktop</strong> (Sprint 3+)</li>
            <li><strong>Conta no Claude.ai ou Gemini</strong></li>
            <li><strong>Git</strong> básico</li>
            <li><strong>Editor de código</strong> (recomendamos VS Code)</li>
          </ul>

          <p>
            Você <strong>não precisa</strong> saber Docker avançado, SQL,
            mensageria ou Git complexo. O curso te orienta no mínimo necessário
            para encomendar e validar.
          </p>

          <h2>Como começar</h2>
          <ol>
            <li>Clone o repositório <code>learning-harness</code>.</li>
            <li>Rode <code>npm install</code>.</li>
            <li>Abra o <strong>Sprint 1</strong> aqui no app.</li>
            <li>Siga o roteiro.</li>
          </ol>
        </div>
      </div>
    </AppShell>
  );
}
