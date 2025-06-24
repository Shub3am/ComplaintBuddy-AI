import { createClient } from "@supabase/supabase-js";

export const db = createClient(
  process.env.supabase_url!,
  process.env.supabase_key!
);
