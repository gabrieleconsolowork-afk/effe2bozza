-- Esegui questo script in Supabase → SQL Editor

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  nome text not null check (char_length(trim(nome)) >= 2),
  email text not null check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  messaggio text not null check (char_length(trim(messaggio)) >= 10),
  created_at timestamptz not null default now()
);

create index if not exists contact_requests_created_at_idx
  on public.contact_requests (created_at desc);

alter table public.contact_requests enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on table public.contact_requests to anon, authenticated;
grant select on table public.contact_requests to authenticated;

drop policy if exists "public_can_insert_contact_requests" on public.contact_requests;
drop policy if exists "admin_can_read_contact_requests" on public.contact_requests;

-- Form contatti: chiunque può inviare, nessuno può leggere senza login
create policy "public_can_insert_contact_requests"
on public.contact_requests
for insert
with check (true);

-- Solo l'admin autorizzato può leggere le richieste
create policy "admin_can_read_contact_requests"
on public.contact_requests
for select
to authenticated
using (
  (auth.jwt() ->> 'email') = 'effe2social@gmail.com'
);
