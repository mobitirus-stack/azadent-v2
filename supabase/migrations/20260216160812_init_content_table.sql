-- Content table for CMS
create table if not exists public.content (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  type text not null default 'text',
  value jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.content enable row level security;

-- Public read access
create policy "Public Content Access" on public.content
  for select using (true);

-- Authenticated users can do everything
create policy "Admin Content Access" on public.content
  for all using (auth.role() = 'authenticated');

-- Storage bucket for assets
insert into storage.buckets (id, name, public)
values ('website-assets', 'website-assets', true)
on conflict (id) do nothing;
