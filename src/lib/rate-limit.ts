import db, { ready } from "./db";

const WINDOW_MS = 60 * 60 * 1000; // 1 saat
const MAX_PER_WINDOW = 3; // aynı kişiden saatte en fazla 3 ilan

/** Aynı IP-hash'ten son 1 saatte oluşturulan ilan sayısına bakar. */
export async function checkRateLimit(ipHash: string): Promise<{ allowed: boolean }> {
  await ready();
  const since = Date.now() - WINDOW_MS;
  const res = await db.execute({
    sql: "SELECT COUNT(*) AS c FROM listings WHERE ip_hash = ? AND created_at > ?",
    args: [ipHash, since],
  });
  return { allowed: Number((res.rows[0] as Record<string, unknown>).c) < MAX_PER_WINDOW };
}
