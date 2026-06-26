import { createClient, type Client } from "@libsql/client";
import fs from "node:fs";
import path from "node:path";

// Keep a single client + migration promise across hot-reloads / lambda reuse.
declare global {
  // eslint-disable-next-line no-var
  var __EVARKADASI_DB__: Client | undefined;
  // eslint-disable-next-line no-var
  var __EVARKADASI_DB_READY__: Promise<void> | undefined;
}

function createDb(): Client {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  // Production / Vercel: remote Turso (libsql://...) over HTTP.
  if (url) {
    return createClient({ url, authToken });
  }

  // Local development fallback: an embedded SQLite file (no account needed).
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  return createClient({ url: "file:" + path.join(dataDir, "evarkadasi.db") });
}

const db: Client = globalThis.__EVARKADASI_DB__ ?? createDb();
globalThis.__EVARKADASI_DB__ = db;

async function migrate(): Promise<void> {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS listings (
      id                TEXT PRIMARY KEY,
      title             TEXT NOT NULL,
      description       TEXT NOT NULL,
      city              TEXT,
      budget            TEXT,
      contact_telegram  TEXT,
      contact_phone     TEXT,
      contact_instagram TEXT,
      contact_email     TEXT,
      created_at        INTEGER NOT NULL,
      expires_at        INTEGER NOT NULL,
      ip_hash           TEXT
    );
  `);
  await db.execute("CREATE INDEX IF NOT EXISTS idx_listings_expires ON listings(expires_at);");
  await db.execute("CREATE INDEX IF NOT EXISTS idx_listings_created ON listings(created_at);");
  // Aktif ilan listesi sorgusu için bileşik indeks (expires_at filtresi + created_at sıralaması)
  await db.execute(
    "CREATE INDEX IF NOT EXISTS idx_listings_active ON listings(expires_at, created_at DESC);",
  );
}

/** Lazily run migrations once; await before any query. */
export function ready(): Promise<void> {
  if (!globalThis.__EVARKADASI_DB_READY__) {
    globalThis.__EVARKADASI_DB_READY__ = migrate();
  }
  return globalThis.__EVARKADASI_DB_READY__;
}

export default db;
