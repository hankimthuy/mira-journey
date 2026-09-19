-- post_likes: one row per (post, anonymous visitor). One-way "thả tim" —
-- no unlike/delete path in v1.
create table if not exists public.post_likes (
  id         uuid primary key default gen_random_uuid(),
  post_slug  text not null,
  client_id  uuid not null,
  ip_hash    text not null,
  created_at timestamptz not null default now(),
  constraint post_likes_unique_visitor unique (post_slug, client_id)
);

create index if not exists post_likes_post_slug_idx on public.post_likes (post_slug);
create index if not exists post_likes_ip_hash_created_idx on public.post_likes (ip_hash, created_at);

alter table public.post_likes enable row level security;

-- Public read: enough to compute a per-post count. Never client_id/ip_hash.
create policy post_likes_anon_select on public.post_likes
  for select to anon using (true);

revoke all on public.post_likes from anon;
grant select (post_slug) on public.post_likes to anon;
-- Deliberately NO insert/update/delete grant for anon. All writes happen in
-- app/api/likes/route.ts via the service-role client, after rate-limit checks.
-- (An anon INSERT grant would let anyone bypass rate-limiting entirely by
-- calling Supabase directly with the public anon key.)

-- post_comments: flat, single-level, auto-published. state: visible|hidden.
-- Hide = soft (state flip, recoverable). Delete = hard (row removed).
create table if not exists public.post_comments (
  id          uuid primary key default gen_random_uuid(),
  post_slug   text not null,
  author_name text not null check (char_length(author_name) between 1 and 80),
  content     text not null check (char_length(content) between 1 and 2000),
  state       text not null default 'visible' check (state in ('visible', 'hidden')),
  flagged     boolean not null default false,
  flag_reason text,
  client_id   uuid not null,
  ip_hash     text not null,
  created_at  timestamptz not null default now()
);

create index if not exists post_comments_post_slug_visible_idx
  on public.post_comments (post_slug, created_at) where state = 'visible';
create index if not exists post_comments_ip_hash_created_idx
  on public.post_comments (ip_hash, created_at);
create index if not exists post_comments_state_idx on public.post_comments (state);
create index if not exists post_comments_flagged_idx
  on public.post_comments (flagged) where flagged;

alter table public.post_comments enable row level security;

create policy post_comments_anon_select on public.post_comments
  for select to anon using (state = 'visible');

revoke all on public.post_comments from anon;
grant select (id, post_slug, author_name, content, created_at) on public.post_comments to anon;
-- No insert/update/delete grant for anon. Writes happen in
-- app/api/comments/route.ts; hide/unhide/delete happen in app/admin/actions.ts.
-- Both use the service-role client, which bypasses RLS/grants entirely and
-- can read the moderation-only columns (ip_hash, client_id, flagged, flag_reason).
