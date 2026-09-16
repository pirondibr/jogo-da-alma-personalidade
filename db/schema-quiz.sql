-- Questionários Jogo da Alma — Neon/Postgres

create extension if not exists "pgcrypto";

create table if not exists public.quiz_submissions (
  id uuid primary key default gen_random_uuid(),
  quiz_type text not null,
  user_name text not null,
  user_email text not null,
  summary jsonb not null default '{}'::jsonb,
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists quiz_submissions_type_created_idx
  on public.quiz_submissions (quiz_type, created_at desc);

create index if not exists quiz_submissions_email_idx
  on public.quiz_submissions (user_email);

create or replace view public.quiz_submission_overview as
select
  id,
  quiz_type,
  user_name,
  user_email,
  summary,
  created_at,
  case
    when quiz_type = 'personality-pt' then coalesce(summary->'top'->>'name', 'Personalidade')
    when quiz_type = 'felicidade-pt' then concat(coalesce(summary->>'geral', '?'), '% felicidade')
    else quiz_type
  end as headline
from public.quiz_submissions
order by created_at desc;
