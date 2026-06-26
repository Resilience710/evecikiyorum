// İlan yönetim aracı (Turso). Komutlar:
//   node scripts/listings.mjs list                 -> tüm ilanları listele
//   node scripts/listings.mjs delete <id> [<id>..] -> belirli ilanları sil
//   node scripts/listings.mjs clear                 -> TÜM ilanları sil (dikkat!)
//
// TURSO_DATABASE_URL / TURSO_AUTH_TOKEN ortam değişkenlerinden ya da
// .env.local dosyasından okunur. Hiçbir gizli bilgi koda gömülü değildir.

import { createClient } from "@libsql/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const env = {};
try {
  const txt = readFileSync(path.join(root, ".env.local"), "utf8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) env[m[1]] = m[2];
  }
} catch {
  /* .env.local yoksa sadece process.env kullanılır */
}

const url = process.env.TURSO_DATABASE_URL || env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN || env.TURSO_AUTH_TOKEN;
if (!url) {
  console.error("HATA: TURSO_DATABASE_URL bulunamadı (.env.local veya ortam değişkeni).");
  process.exit(1);
}

const db = createClient({ url, authToken });
const cmd = process.argv[2] || "list";

if (cmd === "list") {
  const r = await db.execute(
    "SELECT id, title, substr(description,1,70) AS d, created_at FROM listings ORDER BY created_at DESC",
  );
  console.log(`Toplam ${r.rows.length} ilan:\n`);
  for (const row of r.rows) {
    const when = new Date(Number(row.created_at)).toISOString().slice(0, 16).replace("T", " ");
    console.log(`- [${row.id}] ${when}  ${String(row.d ?? "").replace(/\s+/g, " ").trim()}`);
  }
} else if (cmd === "delete") {
  const ids = process.argv.slice(3);
  if (ids.length === 0) {
    console.error("Kullanım: node scripts/listings.mjs delete <id> [<id>..]");
    process.exit(1);
  }
  for (const id of ids) {
    const r = await db.execute({ sql: "DELETE FROM listings WHERE id = ?", args: [id] });
    console.log(`silindi (${r.rowsAffected}):`, id);
  }
} else if (cmd === "clear") {
  const r = await db.execute("DELETE FROM listings");
  console.log(`TÜM ilanlar silindi. Etkilenen satır: ${r.rowsAffected}`);
} else {
  console.error(`Bilinmeyen komut: ${cmd}. (list | delete <id..> | clear)`);
  process.exit(1);
}
