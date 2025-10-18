// frontend/src/lib/client.ts

import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "@/lib/database.types";

// Create Supabase client with fallback values for development
// This prevents the app from crashing when env vars are not configured yet
const supabaseUrl = env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return env.VITE_SUPABASE_URL &&
         env.VITE_SUPABASE_ANON_KEY &&
         env.VITE_SUPABASE_URL !== "https://placeholder.supabase.co";
};