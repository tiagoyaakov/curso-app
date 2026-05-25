# curso-app

> Apostila web do curso **Engenharia e Arquitetura de Harness para Sistemas Driven AI**.
>
> Next.js 16 (App Router) + Tailwind v4 + shadcn/ui + MDX + Supabase (auth + persistência).

---

## Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Tipos:** TypeScript estrito
- **Estilo:** Tailwind CSS v4 (CSS-first)
- **Componentes:** shadcn/ui
- **Conteúdo:** MDX com componentes React custom
- **Diagramas:** Mermaid (client-side)
- **Animações:** Framer Motion
- **Backend:** Supabase (auth + Postgres + RLS)
- **Tema:** Dark mode default (paleta violet/fuchsia/rose premium)

---

## Setup local

```bash
git clone https://github.com/tiagoyaakov/curso-app.git
cd curso-app
npm install
cp .env.example .env.local
# Preencha as variáveis em .env.local
npm run dev
```

Abra http://localhost:3000

---

## Variáveis de ambiente

Veja `.env.example`. Você precisa de:

- `NEXT_PUBLIC_LEARNING_HARNESS_URL` — URL do repositório `learning-harness` que o aluno clona.
- `NEXT_PUBLIC_SUPABASE_URL` — URL do seu projeto Supabase (opcional; sem isso o app cai em modo localStorage anônimo).
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — chave pública anônima do Supabase.

---

## Setup Supabase (opcional, mas recomendado)

1. Crie projeto grátis em [supabase.com](https://supabase.com).
2. Em **Settings → API**, copie `Project URL` e `anon public key` para `.env.local`.
3. No **SQL Editor** do Supabase, cole e rode o conteúdo de [`supabase/schema.sql`](supabase/schema.sql).
4. Pronto.

Sem Supabase, o app funciona em modo "anônimo localStorage" (sem login, progresso só no navegador).

---

## Deploy

Pensado para Vercel. Veja o [DEPLOY.md](../DEPLOY.md) para passo-a-passo completo.

---

## Estrutura

```
curso-app/
├── app/                    ← rotas Next.js
│   ├── page.tsx            ← home
│   ├── sprint/[id]/        ← sprints (MDX dinâmico)
│   ├── comecar/            ← setup do aluno
│   ├── glossario/          ← termos com tooltip
│   └── sobre/              ← sobre o curso
├── components/
│   ├── layout/             ← header, footer, sidebar
│   ├── curso/              ← componentes-âncora (PedidoAoAgente, Checklist, etc)
│   └── ui/                 ← shadcn/ui
├── content/
│   ├── sprints/01.mdx ... 04.mdx
│   └── glossario.json      ← 75 termos
├── lib/
│   ├── config.ts           ← env vars + helpers
│   ├── glossario.ts
│   ├── persistencia.ts     ← Supabase + localStorage fallback
│   └── supabase/
├── supabase/
│   └── schema.sql          ← cola no SQL Editor do Supabase
└── scripts/
    └── screenshot.mjs      ← utilitário para capturas em dev
```

---

## Scripts

| Comando | Função |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Build de produção |
| `npm start` | Roda o build localmente |
| `node scripts/screenshot.mjs` | Captura PNGs das páginas (dev) |

---

## Componentes-âncora (uso em MDX)

Em qualquer arquivo MDX você pode usar:

```mdx
<Aviso variante="info" titulo="Atenção">...</Aviso>
<PedidoAoAgente titulo="Lab A">{`texto do pedido`}</PedidoAoAgente>
<Checklist sprint={1} lab="A" itens={[...]} />
<Reflexao sprint={1} lab="A" pergunta="..." />
<PTP numero={1} titulo="..." questoes={[...]} />
<Terminal comando="...">{`saida`}</Terminal>
<Diagrama legenda="...">{`mermaid code`}</Diagrama>
<Termo k="harness">harness</Termo>
```

---

## Licença

MIT.
