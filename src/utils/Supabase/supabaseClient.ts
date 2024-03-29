import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE = process.env.NEXT_PUBLIC_SERVICE_ROLE;

const createSupabaseClient = () => {
  if (SUPABASE_URL !== undefined && SERVICE_ROLE !== undefined) {
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    return supabase;
  } else {
    throw new Error("Supabase URL or API key is undefined");
  }
};

export const supabase = createSupabaseClient();
