-- =============================================================================
-- Schema do curso Engenharia de Harness
-- =============================================================================
-- Como aplicar:
--   1. No seu projeto Supabase, vá em SQL Editor.
--   2. Cole tudo abaixo e clique "Run".
--   3. Pronto.
--
-- O que cria:
--   - tabela 'progresso_aluno' (item de checklist + completude por sprint)
--   - tabela 'reflexoes' (texto livre que o aluno escreve nos Labs)
--   - políticas RLS para cada usuário ver/editar SÓ os próprios dados
-- =============================================================================

-- Progresso por item de checklist + lab/sprint
create table if not exists public.progresso_aluno (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  sprint smallint not null,
  lab text not null,                   -- "A", "B", "C", "D" ou "PTP-1" etc.
  item_id text not null,               -- slug do item de checklist
  marcado boolean not null default false,
  atualizado_em timestamptz not null default now(),
  unique (user_id, sprint, lab, item_id)
);

-- Reflexões do aluno (campo de texto longo)
create table if not exists public.reflexoes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  sprint smallint not null,
  lab text not null,                   -- "A", "B", "C", "D"
  texto text not null default '',
  atualizado_em timestamptz not null default now(),
  unique (user_id, sprint, lab)
);

-- Notas finais por sprint (Gate determinístico + Juiz qualitativo)
create table if not exists public.notas_sprint (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  sprint smallint not null,
  nota_gate text check (nota_gate in ('A','B','C','D')),
  nota_juiz text check (nota_juiz in ('A','B','C','D')),
  nota_final text generated always as (
    case
      when nota_gate is null or nota_juiz is null then null
      when nota_gate = 'D' or nota_juiz = 'D' then 'D'
      when nota_gate = 'C' or nota_juiz = 'C' then 'C'
      when nota_gate = 'B' or nota_juiz = 'B' then 'B'
      else 'A'
    end
  ) stored,
  feedback_juiz jsonb,
  atualizado_em timestamptz not null default now(),
  unique (user_id, sprint)
);

-- =============================================================================
-- RLS — cada aluno só vê os próprios dados
-- =============================================================================

alter table public.progresso_aluno enable row level security;
alter table public.reflexoes enable row level security;
alter table public.notas_sprint enable row level security;

create policy "progresso: aluno lê próprio"
  on public.progresso_aluno for select
  using (auth.uid() = user_id);

create policy "progresso: aluno insere próprio"
  on public.progresso_aluno for insert
  with check (auth.uid() = user_id);

create policy "progresso: aluno atualiza próprio"
  on public.progresso_aluno for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "reflexoes: aluno lê próprio"
  on public.reflexoes for select
  using (auth.uid() = user_id);

create policy "reflexoes: aluno insere próprio"
  on public.reflexoes for insert
  with check (auth.uid() = user_id);

create policy "reflexoes: aluno atualiza próprio"
  on public.reflexoes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "notas: aluno lê próprio"
  on public.notas_sprint for select
  using (auth.uid() = user_id);

create policy "notas: aluno insere próprio"
  on public.notas_sprint for insert
  with check (auth.uid() = user_id);

create policy "notas: aluno atualiza próprio"
  on public.notas_sprint for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Trigger para atualizar 'atualizado_em' automaticamente
create or replace function public.tick_atualizado_em()
returns trigger language plpgsql as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

create trigger tick_progresso before update on public.progresso_aluno
  for each row execute function public.tick_atualizado_em();

create trigger tick_reflexoes before update on public.reflexoes
  for each row execute function public.tick_atualizado_em();

create trigger tick_notas before update on public.notas_sprint
  for each row execute function public.tick_atualizado_em();
