import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase para Client Components.
 *
 * Se as variáveis de ambiente não estiverem definidas, devolve `null` —
 * o app cai em modo "localStorage anônimo" (sem login, progresso só no navegador).
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createBrowserClient(url, key);
}

export function supabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
