-- Create tables for Content Management System

-- 1. Create 'content' table for text/JSON content
create table if not exists content (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  type text not null default 'text', -- 'text', 'image', 'json'
  value jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table content enable row level security;

-- Create policy: Everyone can read content
create policy "Public Content Access"
  on content for select
  using ( true );

-- Create policy: Authenticated users can insert/update/delete
create policy "Admin Content Access"
  on content for all
  using ( auth.role() = 'authenticated' );


-- 2. Create 'gallery' table
create table if not exists gallery (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  category text,
  alt_text text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table gallery enable row level security;

create policy "Public Gallery Access"
  on gallery for select
  using ( true );

create policy "Admin Gallery Access"
  on gallery for all
  using ( auth.role() = 'authenticated' );

-- 3. Storage bucket setup (for images)
-- Note: This usually requires enabling storage in Supabase dashboard first, but we can try to insert if not exists.
insert into storage.buckets (id, name, public)
values ('website-assets', 'website-assets', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Public Storage Access"
  on storage.objects for select
  using ( bucket_id = 'website-assets' );

create policy "Admin Storage Insert"
  on storage.objects for insert
  with check ( bucket_id = 'website-assets' and auth.role() = 'authenticated' );

create policy "Admin Storage Update"
  on storage.objects for update
  using ( bucket_id = 'website-assets' and auth.role() = 'authenticated' );

create policy "Admin Storage Delete"
  on storage.objects for delete
  using ( bucket_id = 'website-assets' and auth.role() = 'authenticated' );
