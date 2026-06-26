-- Fix RLS: esegui in SQL Editor se il form dà errore "violates row-level security"

grant usage on schema public to anon, authenticated;
grant insert on table public.contact_requests to anon, authenticated;
grant select on table public.contact_requests to authenticated;

drop policy if exists "public_can_insert_contact_requests" on public.contact_requests;
drop policy if exists "admin_can_read_contact_requests" on public.contact_requests;

create policy "public_can_insert_contact_requests"
on public.contact_requests
for insert
with check (true);

create policy "admin_can_read_contact_requests"
on public.contact_requests
for select
to authenticated
using (
  (auth.jwt() ->> 'email') = 'effe2social@gmail.com'
);
