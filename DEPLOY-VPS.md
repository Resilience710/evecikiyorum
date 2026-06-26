# evecikiyorum — VPS'te Canlıya Alma (Ubuntu)

Veritabanı **Turso (bulut)** olduğundan VPS yalnızca Next.js uygulamasını çalıştırır;
kalıcı disk/SQLite derdi yok. Aşağıdaki adımlar Ubuntu 22.04/24.04 içindir.

Gereken ortam değişkenleri (hepsi `.env.local` ya da `.env.production` içinde):

| Değişken | Değer |
|---|---|
| `TURSO_DATABASE_URL` | `libsql://...turso.io` (mevcut) |
| `TURSO_AUTH_TOKEN` | Turso token (mevcut) |
| `ADMIN_KEY` | `/admin` paneli şifresi |
| `APP_SECRET` | uzun rastgele (IP hash + captcha) |
| `NEXT_PUBLIC_SITE_URL` | `https://evecikiyorum.com` (kendi alan adın) |
| `LISTING_TTL_DAYS` | `30` (opsiyonel) |
| `CRON_SECRET` | temizlik cron'u için (opsiyonel) |

> Not: `NEXT_PUBLIC_SITE_URL` **build sırasında** gömülür; bu yüzden `.env.local`'ı
> `npm run build`'ten ÖNCE oluştur.

---

## 0) DNS
Alan adının **A kaydını** VPS'in IP adresine yönlendir:
`evecikiyorum.com  A  <VPS_IP>` ve `www  A  <VPS_IP>`. (Yayılması birkaç dk–saat.)

## 1) Sunucuya bağlan + güncelle
```bash
ssh root@<VPS_IP>
apt update && apt -y upgrade
```

## 2) Node.js 20 kur
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git
node -v   # v20.x görmelisin
```

## 3) Kodu sunucuya getir
**A) Git ile (önerilen)** — projeyi (özel) bir GitHub deposuna yükledikten sonra:
```bash
cd /var/www && git clone https://github.com/<kullanici>/<repo>.git evecikiyorum
cd /var/www/evecikiyorum
```
**B) rsync ile** (yerel makineden, `node_modules` ve `.next` hariç):
```bash
rsync -av --exclude node_modules --exclude .next --exclude .vercel \
  ./ root@<VPS_IP>:/var/www/evecikiyorum/
```

## 4) Ortam değişkenleri
```bash
cd /var/www/evecikiyorum
nano .env.local
```
Yukarıdaki tabloyu doldur (özellikle `NEXT_PUBLIC_SITE_URL=https://evecikiyorum.com`). Kaydet.

## 5) Bağımlılıklar + build
```bash
npm ci
npm run build
```

## 6) PM2 ile sürekli çalıştır
```bash
npm install -g pm2
pm2 start npm --name evecikiyorum -- start      # next start -> http://localhost:3000
pm2 save
pm2 startup systemd     # çıktıdaki komutu kopyalayıp çalıştır (yeniden başlatmada otomatik açılır)
```
Test: `curl -I http://localhost:3000` → `200` görmelisin.

## 7) Reverse proxy + otomatik HTTPS — Caddy (en kolay)
```bash
apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt install -y caddy
nano /etc/caddy/Caddyfile
```
`Caddyfile` içeriği:
```
evecikiyorum.com, www.evecikiyorum.com {
    reverse_proxy localhost:3000
    encode zstd gzip
}
```
```bash
systemctl reload caddy
```
Caddy, Let's Encrypt SSL sertifikasını **otomatik** alır. Birkaç saniye sonra
`https://evecikiyorum.com` açılır. ✅

> Alternatif (Nginx + Certbot): `apt install -y nginx certbot python3-certbot-nginx`,
> `/etc/nginx/sites-available/evecikiyorum`'a `proxy_pass http://localhost:3000;` içeren
> server bloğu, sonra `certbot --nginx -d evecikiyorum.com -d www.evecikiyorum.com`.

## 8) Güvenlik duvarı
```bash
ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw --force enable
```

## 9) Süre dolmuş ilanları temizleme (opsiyonel)
Vercel cron yok; günlük bir sistem cron'u ekle:
```bash
crontab -e
# satır ekle (CRON_SECRET tanımlıysa Authorization başlığıyla):
0 3 * * * curl -s -H "Authorization: Bearer <CRON_SECRET>" https://evecikiyorum.com/api/cron/cleanup >/dev/null
```
(Süre dolmuş ilanlar zaten sorgularda gizlenir; bu sadece veritabanı temizliği.)

---

## Güncelleme (yeni sürüm yayınlama)
```bash
cd /var/www/evecikiyorum
git pull            # veya rsync ile tekrar yükle
npm ci
npm run build
pm2 reload evecikiyorum
```

## Faydalı komutlar
```bash
pm2 logs evecikiyorum      # logları izle
pm2 restart evecikiyorum   # yeniden başlat
pm2 status                 # durum
```

## Notlar
- Uygulama Turso'ya bağlanır; aynı veritabanını Vercel ve VPS aynı anda kullanabilir
  (ilanlar ortak görünür). Tek bir canlı ortam istiyorsan birini kapat.
- Türkçe OG görseli fontları `src/app/og-fonts/` içinde repoda; `next start` proje
  klasöründen çalıştığı için sorunsuz okunur (ekstra ayar gerekmez).
- En az 1 GB RAM önerilir (build sırasında). 512 MB ise build için geçici swap aç.
