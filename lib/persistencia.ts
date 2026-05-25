"use client";

/**
 * Camada de persistência híbrida:
 *  - Se Supabase configurado E usuário logado → grava no Supabase.
 *  - Caso contrário → fallback localStorage (modo anônimo, sem login).
 *
 * Cada componente usa as funções daqui sem se preocupar com a fonte.
 */

import { createClient, supabaseConfigured } from "./supabase/client";

type ChecklistKey = { sprint: number; lab: string; itemId: string };
type ReflexaoKey = { sprint: number; lab: string };

const STORAGE_PREFIX = "curso-harness::";

function localKey(parts: string[]): string {
  return STORAGE_PREFIX + parts.join("::");
}

// ============================================================================
//  CHECKLIST
// ============================================================================

export async function lerChecklist(k: ChecklistKey): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const sb = createClient();
  if (sb) {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data } = await sb
        .from("progresso_aluno")
        .select("marcado")
        .eq("user_id", user.id)
        .eq("sprint", k.sprint)
        .eq("lab", k.lab)
        .eq("item_id", k.itemId)
        .maybeSingle();
      return data?.marcado ?? false;
    }
  }

  const raw = localStorage.getItem(
    localKey(["check", String(k.sprint), k.lab, k.itemId]),
  );
  return raw === "1";
}

export async function gravarChecklist(
  k: ChecklistKey,
  marcado: boolean,
): Promise<void> {
  if (typeof window === "undefined") return;

  const sb = createClient();
  if (sb) {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      await sb.from("progresso_aluno").upsert(
        {
          user_id: user.id,
          sprint: k.sprint,
          lab: k.lab,
          item_id: k.itemId,
          marcado,
        },
        { onConflict: "user_id,sprint,lab,item_id" },
      );
      return;
    }
  }

  localStorage.setItem(
    localKey(["check", String(k.sprint), k.lab, k.itemId]),
    marcado ? "1" : "0",
  );
}

// ============================================================================
//  REFLEXÃO
// ============================================================================

export async function lerReflexao(k: ReflexaoKey): Promise<string> {
  if (typeof window === "undefined") return "";

  const sb = createClient();
  if (sb) {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const { data } = await sb
        .from("reflexoes")
        .select("texto")
        .eq("user_id", user.id)
        .eq("sprint", k.sprint)
        .eq("lab", k.lab)
        .maybeSingle();
      return data?.texto ?? "";
    }
  }

  return localStorage.getItem(
    localKey(["reflexao", String(k.sprint), k.lab]),
  ) ?? "";
}

export async function gravarReflexao(
  k: ReflexaoKey,
  texto: string,
): Promise<void> {
  if (typeof window === "undefined") return;

  const sb = createClient();
  if (sb) {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      await sb.from("reflexoes").upsert(
        {
          user_id: user.id,
          sprint: k.sprint,
          lab: k.lab,
          texto,
        },
        { onConflict: "user_id,sprint,lab" },
      );
      return;
    }
  }

  localStorage.setItem(
    localKey(["reflexao", String(k.sprint), k.lab]),
    texto,
  );
}

export function modoPersistencia(): "supabase" | "local" {
  return supabaseConfigured() ? "supabase" : "local";
}
