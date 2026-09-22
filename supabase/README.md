# supabase/

There is no migration framework wired up in this repo (no Supabase CLI project,
no `supabase db push`). Files under `migrations/` are kept here purely as a
history/reference of schema changes applied directly against the project
(via the Supabase dashboard, CLI, or an MCP tool) — they are not auto-applied
by any build or deploy step.
