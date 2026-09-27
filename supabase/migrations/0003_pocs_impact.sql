-- Third beat of each project's write-up on /products: Problem (pain_point),
-- Solution (story), Impact (this). Empty until authored in the admin; the
-- storefront only renders it when set.
alter table public.pocs add column if not exists impact text not null default '';
