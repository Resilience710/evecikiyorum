import { createClient } from "@libsql/client";
import crypto from "node:crypto";
import fs from "node:fs";

// .env.local'ı oku
const env = Object.fromEntries(
  fs
    .readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);

const db = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

const id = () => crypto.randomBytes(9).toString("base64url");
const TTL = 30 * 24 * 60 * 60 * 1000;

await db.execute(`CREATE TABLE IF NOT EXISTS listings (
  id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL,
  city TEXT, budget TEXT, contact_telegram TEXT, contact_phone TEXT,
  contact_instagram TEXT, contact_email TEXT, created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL, ip_hash TEXT
);`);
await db.execute("CREATE INDEX IF NOT EXISTS idx_listings_expires ON listings(expires_at);");
await db.execute("CREATE INDEX IF NOT EXISTS idx_listings_created ON listings(created_at);");

const before = await db.execute("SELECT COUNT(*) AS c FROM listings");
const count = Number(before.rows[0].c);
console.log("Bağlantı OK. Mevcut ilan sayısı:", count);

if (count === 0) {
  const now = Date.now();
  const seed = [
    {
      title: "Kadıköy Moda'da 3+1'de ev arkadaşı aranıyor",
      description:
        "Denize 5 dk yürüme mesafesinde, eşyalı, geniş bir odası boşalan dairemize sessiz ve düzenli bir ev arkadaşı arıyoruz. Kira ve aidat üç kişiye bölünüyor. Evde evcil hayvan yok, sigara içilmiyor.",
      city: "İstanbul, Kadıköy",
      budget: "9.000₺ / kişi başı + aidat",
      contact_phone: "05321234567",
      contact_instagram: "modaev_ilan",
    },
    {
      title: "Çankaya'da öğrenci ev arkadaşı (kız)",
      description:
        "ODTÜ ve Bilkent'e servis güzergahında, 2+1 dairede tek kişilik oda. Faturalar ortak, ev eşyalı. Düzenli, ders çalışmaya saygılı bir arkadaş arıyorum.",
      city: "Ankara, Çankaya",
      budget: "6.500₺ + faturalar",
      contact_telegram: "cankaya_oda",
      contact_email: "ornekilan@gmail.com",
    },
    {
      title: "İzmir Alsancak'ta deniz manzaralı oda",
      description:
        "Alsancak'ta tramvay durağına 2 dakika, yenilenmiş 3+1 dairede balkonlu oda. İki ev arkadaşıyla paylaşımlı. Kedi dostu ev. Keyifli, temiz ve iletişimi güçlü biri olursa harika olur.",
      city: "İzmir, Konak",
      budget: "8.000₺ / kişi",
      contact_instagram: "alsancak.oda",
      contact_phone: "+905559876543",
    },
  ];

  for (let i = 0; i < seed.length; i++) {
    const s = seed[i];
    await db.execute({
      sql: `INSERT INTO listings (id,title,description,city,budget,contact_telegram,contact_phone,contact_instagram,contact_email,created_at,expires_at,ip_hash)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      args: [
        id(),
        s.title,
        s.description,
        s.city ?? null,
        s.budget ?? null,
        s.contact_telegram ?? null,
        s.contact_phone ?? null,
        s.contact_instagram ?? null,
        s.contact_email ?? null,
        now - i * 60000,
        now - i * 60000 + TTL,
        null,
      ],
    });
  }
  console.log("3 demo ilan eklendi.");
}

const after = await db.execute("SELECT id, title FROM listings ORDER BY created_at DESC");
console.log("Toplam ilan:", after.rows.length);
for (const r of after.rows) console.log(" -", r.title);
