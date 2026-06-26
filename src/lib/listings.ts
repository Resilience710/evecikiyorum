import { unstable_cache } from "next/cache";
import db, { ready } from "./db";
import { generateId } from "./security";

/** İlan verisi cache etiketi — yazımda revalidateTag("listings") ile tazelenir. */
export const LISTINGS_TAG = "listings";

export interface Listing {
  id: string;
  title: string;
  description: string;
  city: string | null;
  budget: string | null;
  contact_telegram: string | null;
  contact_phone: string | null;
  contact_instagram: string | null;
  contact_email: string | null;
  created_at: number;
  expires_at: number;
  ip_hash: string | null;
}

/** İstemciye gönderilebilir ilan (ip_hash / expires_at hariç). */
export type PublicListing = Omit<Listing, "ip_hash" | "expires_at">;

export interface NewListing {
  title: string;
  description: string;
  city?: string;
  budget?: string;
  contact_telegram?: string;
  contact_phone?: string;
  contact_instagram?: string;
  contact_email?: string;
  ip_hash?: string;
}

const TTL_DAYS = Number(process.env.LISTING_TTL_DAYS) || 30;
export const TTL_MS = TTL_DAYS * 24 * 60 * 60 * 1000;
export const TTL_DAYS_LABEL = TTL_DAYS;

type Row = Record<string, unknown>;

function rowToListing(r: Row): Listing {
  const s = (v: unknown) => (v == null ? null : String(v));
  return {
    id: String(r.id),
    title: String(r.title),
    description: String(r.description),
    city: s(r.city),
    budget: s(r.budget),
    contact_telegram: s(r.contact_telegram),
    contact_phone: s(r.contact_phone),
    contact_instagram: s(r.contact_instagram),
    contact_email: s(r.contact_email),
    created_at: Number(r.created_at),
    expires_at: Number(r.expires_at),
    ip_hash: s(r.ip_hash),
  };
}

/**
 * Türkçe arama için ASCII-katlama: "İzmir" ve "izmir" eşleşsin diye
 * (SQLite LIKE Türkçe büyük/küçük harfi doğru karşılaştıramaz).
 */
function foldTr(s: string): string {
  return s
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");
}

/** Süresi dolan ilanları siler (tembel temizlik). */
export async function cleanupExpired(): Promise<void> {
  await ready();
  await db.execute({ sql: "DELETE FROM listings WHERE expires_at <= ?", args: [Date.now()] });
}

export async function createListing(input: NewListing): Promise<string> {
  await ready();
  const id = generateId();
  const now = Date.now();
  await db.execute({
    sql: `INSERT INTO listings
      (id, title, description, city, budget,
       contact_telegram, contact_phone, contact_instagram, contact_email,
       created_at, expires_at, ip_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      input.title,
      input.description,
      input.city ?? null,
      input.budget ?? null,
      input.contact_telegram ?? null,
      input.contact_phone ?? null,
      input.contact_instagram ?? null,
      input.contact_email ?? null,
      now,
      now + TTL_MS,
      input.ip_hash ?? null,
    ],
  });
  return id;
}

/**
 * Aktif ilanların cache'lenmiş listesi. Her istekte Turso'ya gitmek yerine
 * sonucu "listings" etiketiyle önbelleğe alır; ilan eklenince/silinince
 * revalidateTag("listings") ile tazelenir. Süre dolumu WHERE ile filtrelenir.
 */
const fetchActiveCached = unstable_cache(
  async (): Promise<Listing[]> => {
    await ready();
    const res = await db.execute({
      sql: "SELECT * FROM listings WHERE expires_at > ? ORDER BY created_at DESC LIMIT 200",
      args: [Date.now()],
    });
    return res.rows.map((r) => rowToListing(r as Row));
  },
  ["active-listings-v1"],
  { revalidate: 120, tags: [LISTINGS_TAG] },
);

export async function listListings(query?: string): Promise<Listing[]> {
  const rows = await fetchActiveCached();
  const q = query?.trim();
  if (!q) return rows;
  const nq = foldTr(q);
  return rows.filter((r) =>
    foldTr(`${r.title} ${r.city ?? ""} ${r.description}`).includes(nq),
  );
}

export async function getListing(id: string): Promise<Listing | null> {
  const cached = (await fetchActiveCached()).find((r) => r.id === id);
  if (cached) return cached;
  // Cache dışı (200+ ilan): doğrudan sorgu
  await ready();
  const res = await db.execute({
    sql: "SELECT * FROM listings WHERE id = ? AND expires_at > ?",
    args: [id, Date.now()],
  });
  return res.rows.length ? rowToListing(res.rows[0] as Row) : null;
}

export async function countActive(): Promise<number> {
  return (await fetchActiveCached()).length;
}

export async function deleteListing(id: string): Promise<boolean> {
  await ready();
  const res = await db.execute({ sql: "DELETE FROM listings WHERE id = ?", args: [id] });
  return res.rowsAffected > 0;
}

export async function listAllForAdmin(): Promise<Listing[]> {
  await ready();
  const res = await db.execute("SELECT * FROM listings ORDER BY created_at DESC LIMIT 500");
  return res.rows.map((r) => rowToListing(r as Row));
}

/** Sitemap için aktif ilanların id + son güncelleme (created_at) bilgisi. */
export async function listForSitemap(): Promise<{ id: string; updated: number }[]> {
  await ready();
  const res = await db.execute({
    sql: "SELECT id, created_at FROM listings WHERE expires_at > ? ORDER BY created_at DESC LIMIT 5000",
    args: [Date.now()],
  });
  return res.rows.map((r) => ({
    id: String((r as Row).id),
    updated: Number((r as Row).created_at),
  }));
}
