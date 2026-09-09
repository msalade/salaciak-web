export const commandHistoryStorageKey = "salaciak-command-history";

export type StorageLike = Pick<Storage, "getItem" | "setItem">;

export function readCommandHistory(storage: StorageLike | undefined, limit = 50): string[] {
  if (!storage) return [];
  try {
    const parsed: unknown = JSON.parse(storage.getItem(commandHistoryStorageKey) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((entry): entry is string => typeof entry === "string")
      .map((entry) => entry.trim().replace(/\s+/g, " "))
      .filter(Boolean)
      .slice(-Math.max(0, limit));
  } catch {
    return [];
  }
}

export function appendCommandHistory(
  history: readonly string[],
  command: string,
  storage?: StorageLike,
  limit = 50,
): string[] {
  const normalized = command.trim().replace(/\s+/g, " ");
  if (!normalized) return [...history].slice(-Math.max(0, limit));

  const next = [...history, normalized].slice(-Math.max(0, limit));
  try {
    storage?.setItem(commandHistoryStorageKey, JSON.stringify(next));
  } catch {
    // Storage can be unavailable in private browsing or restricted environments.
  }
  return next;
}

export function formatCommand(name: string, args: string): string {
  const normalizedArgs = args.trim().replace(/\s+/g, " ");
  return normalizedArgs ? `${name} ${normalizedArgs}` : name;
}
