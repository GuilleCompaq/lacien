-- Catálogo de radios: lectura pública, escritura solo desde el dashboard/service role.
create table if not exists public.radios (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  genre text not null check (genre in ('rock', 'pop', 'folklore', 'tango', 'clasica', 'deportiva', 'general')),
  frequency text not null,
  listeners integer not null default 0,
  stream_url text not null,
  cover_emoji text,
  cover_image text,
  is_live boolean not null default true,
  current_track jsonb, -- { "artist": "...", "title": "..." } o null
  created_at timestamptz not null default now()
);

alter table public.radios enable row level security;

create policy "Radios: lectura pública"
  on public.radios for select
  using (true);

-- Favoritos: cada usuario autenticado gestiona únicamente sus propias filas.
create table if not exists public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  radio_id uuid not null references public.radios (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, radio_id)
);

alter table public.favorites enable row level security;

create policy "Favoritos: el usuario ve los propios"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "Favoritos: el usuario agrega los propios"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "Favoritos: el usuario borra los propios"
  on public.favorites for delete
  using (auth.uid() = user_id);

create index if not exists favorites_user_id_idx on public.favorites (user_id);
