-- Maturity of each project, separate from `status` (whether it's still being
-- worked on). PoC = "can it be built?", MVP = "does anyone need it?",
-- Live = "people are using it". `kind` is not reused — it already separates
-- poc/personal workspace entries in the admin.
alter table public.pocs
  add column if not exists stage text not null default 'poc'
  check (stage in ('poc', 'mvp', 'live'));

-- Initial backfill; edited from the admin afterwards.
update public.pocs set stage = 'live'
  where name in ('Portfolio', 'Cỗ Máy Thời Gian');
update public.pocs set stage = 'mvp'
  where name in ('Aura Self AI', 'FlowStreaks', 'Go POS');
