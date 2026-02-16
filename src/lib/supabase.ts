import { createClient } from "@supabase/supabase-js";

// Try to get config from environment variables
const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Try to get config from local storage (for no-code setup)
const localUrl = localStorage.getItem('sb_url');
const localKey = localStorage.getItem('sb_key');

const supabaseUrl = envUrl || localUrl;
const supabaseAnonKey = envKey || localKey;

export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const isConfigured = !!supabase;
