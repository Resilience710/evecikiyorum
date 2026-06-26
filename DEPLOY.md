# evarkadaşı — Vercel'e Demo Yayını (Turso + Vercel)

Bu site serverless Vercel üzerinde çalışacak şekilde **Turso (libSQL)** veritabanı
kullanır. Toplam ~5–10 dakika. (Giriş/şifre adımlarını **senin** yapman gerekir.)

---

## 1) Turso veritabanını oluştur (ücretsiz)

Turso CLI kur ve giriş yap:

```bash
# Windows (PowerShell) — Turso CLI
# (Önerilen: https://docs.turso.tech/cli/installation — "Windows" sekmesi)
# veya WSL/Git Bash içinde:
curl -sSfL https://get.tur.so/install.sh | bash

turso auth login          # tarayıcıda GitHub ile giriş açılır
turso db create evarkadasi
```

İki değeri al (bunları Vercel'e gireceksin):

```bash
turso db show evarkadasi --url        # -> TURSO_DATABASE_URL  (libsql://...turso.io)
turso db tokens create evarkadasi     # -> TURSO_AUTH_TOKEN     (uzun bir token)
```

> Tabloyu elle oluşturmana gerek yok; uygulama ilk açılışta otomatik kurar.

---

## 2) Kodu Vercel'e gönder

İki yoldan biri:

**A. GitHub üzerinden (önerilen)**
1. Projeyi bir GitHub deposuna yükle (`git init` zaten yapıldı değilse).
2. https://vercel.com → **Add New → Project** → repoyu seç → **Import**.
3. Framework otomatik **Next.js** algılanır; ayarları değiştirme.

**B. CLI ile**
```bash
npm i -g vercel
vercel            # ilk seferinde giriş + proje bağlama soruları
```

---

## 3) Ortam değişkenlerini Vercel'e gir

Vercel proje panelinde **Settings → Environment Variables** (Production + Preview):

| Anahtar | Değer |
|---|---|
| `TURSO_DATABASE_URL` | `turso db show ... --url` çıktısı |
| `TURSO_AUTH_TOKEN` | `turso db tokens create ...` çıktısı |
| `ADMIN_KEY` | uzun, gizli bir parola (moderasyon paneli) |
| `APP_SECRET` | uzun rastgele değer (`openssl rand -hex 32`) |
| `LISTING_TTL_DAYS` | `30` (isteğe bağlı) |

Sonra **Deployments → Redeploy** (env değişkenleri ilk deploy'dan sonra eklendiyse).

---

## 4) Bitti

- Vercel sana `https://<proje>.vercel.app` adresi verir — demoyu müşteriye bu linkle gönder.
- Moderasyon: `https://<proje>.vercel.app/admin?key=ADMIN_KEY`
- İlanlar Turso'da kalıcıdır; 30 gün sonra otomatik düşer.

### Notlar
- Yerel geliştirmede Turso GEREKMEZ: `.env.local`'da `TURSO_*` boşsa otomatik
  `data/evarkadasi.db` dosyası kullanılır.
- Özel alan adı (evarkadasi.com) için: Vercel → **Settings → Domains → Add**.
