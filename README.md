# evecikiyorum 🏠

Üyelik gerektirmeyen ev arkadaşı ilan panosu. İlanlar duvara asılı çerçeveler (küçük evler) gibi
görünür; tıklayınca detay sayfasına gider. İlan sahibine telefon / e-posta / Telegram / Instagram
ile **doğrudan** ulaşılır.

- **Stack:** Next.js (App Router, TypeScript) · better-sqlite3 · Tailwind CSS
- **Font:** Clash Display + Satoshi (Fontshare)
- **Üyelik yok.** İlanlar 30 gün sonra otomatik kalkar.
- **Spam koruması:** anahtarsız captcha + honeypot + IP rate-limit + Türkçe küfür filtresi
- **Moderasyon:** `/admin?key=...` ile uygunsuz ilanları silme

## Geliştirme

```bash
npm install
npm run dev
# http://localhost:3000
```

Ortam değişkenleri `.env.local` içinde (örnek için `.env.example`):

| Değişken | Açıklama |
|---|---|
| `ADMIN_KEY` | `/admin` moderasyon paneline giriş anahtarı |
| `APP_SECRET` | IP hashleme + captcha imzalama gizli anahtarı (uzun & rastgele) |
| `LISTING_TTL_DAYS` | İlanların kaç gün sonra silineceği (varsayılan 30) |

> Canlıda `ADMIN_KEY` ve `APP_SECRET` değerlerini mutlaka değiştirin.

SQLite veritabanı `data/evarkadasi.db` dosyasında tutulur (otomatik oluşur, `.gitignore`’da).

## Yayınlama (özet)

SQLite kalıcı bir diske ihtiyaç duyduğundan **Railway / Render / Fly.io / VPS** gibi kalıcı
disk (volume) sunan bir ortam uygundur. `data/` klasörünü kalıcı bir volume’a bağlayın, ortam
değişkenlerini ayarlayın, `npm run build && npm run start` ile çalıştırın. Ardından
evecikiyorum.com alan adını bu sunucuya yönlendirin.

## Yapı

```
src/
  app/        # sayfalar + server actions (App Router)
  components/ # Header, Footer, HouseCard, Wall, ContactLinks, ListingForm, icons
  lib/        # db, listings, validation, captcha, profanity, rate-limit, security, contacts, format
```
