create table if not exists public.blog_editors (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.blog_editors enable row level security;
revoke all on public.blog_editors from anon, authenticated;

create or replace function public.is_blog_editor()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.blog_editors
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_blog_editor() from public;
grant execute on function public.is_blog_editor() to authenticated;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  excerpt text not null,
  icon text not null default '</>',
  author_name text not null default 'فريق حلول سوفت',
  author_id uuid not null references auth.users(id) on delete cascade,
  intro text not null,
  sections jsonb not null default '[]'::jsonb
    check (jsonb_typeof(sections) = 'array'),
  reading_minutes integer not null default 3
    check (reading_minutes between 1 and 120),
  is_published boolean not null default false,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_at_idx
  on public.blog_posts (published_at desc)
  where is_published = true;

alter table public.blog_posts enable row level security;

grant select on public.blog_posts to anon, authenticated;
grant insert, update, delete on public.blog_posts to authenticated;

drop policy if exists "Anyone can read published blog posts"
  on public.blog_posts;
create policy "Anyone can read published blog posts"
  on public.blog_posts for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "Editors can read their own blog posts"
  on public.blog_posts;
create policy "Editors can read their own blog posts"
  on public.blog_posts for select
  to authenticated
  using (
    public.is_blog_editor()
    and (select auth.uid()) = author_id
  );

drop policy if exists "Editors can create their own blog posts"
  on public.blog_posts;
create policy "Editors can create their own blog posts"
  on public.blog_posts for insert
  to authenticated
  with check (
    public.is_blog_editor()
    and (select auth.uid()) = author_id
  );

drop policy if exists "Editors can update their own blog posts"
  on public.blog_posts;
create policy "Editors can update their own blog posts"
  on public.blog_posts for update
  to authenticated
  using (
    public.is_blog_editor()
    and (select auth.uid()) = author_id
  )
  with check (
    public.is_blog_editor()
    and (select auth.uid()) = author_id
  );

drop policy if exists "Editors can delete their own blog posts"
  on public.blog_posts;
create policy "Editors can delete their own blog posts"
  on public.blog_posts for delete
  to authenticated
  using (
    public.is_blog_editor()
    and (select auth.uid()) = author_id
  );

create or replace function public.set_blog_post_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_blog_post_updated_at on public.blog_posts;
create trigger set_blog_post_updated_at
  before update on public.blog_posts
  for each row execute function public.set_blog_post_updated_at();
