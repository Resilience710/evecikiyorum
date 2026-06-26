/** Tek kaynak: site URL'i ve marka sabitleri (metadata, sitemap, robots, JSON-LD). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://evecikiyorum.com"
).replace(/\/$/, "");

export const SITE_NAME = "evecikiyorum";
export const SITE_TAGLINE = "Ev arkadaşı ve oda arkadaşı ilanları";
export const SITE_DESCRIPTION =
  "Üyeliksiz ev arkadaşı ve oda arkadaşı ilan panosu. Boş bir panoya tıkla, notunu yaz, ilanını ücretsiz paylaş; ilanlara göz at, ev arkadaşını doğrudan bul.";

/** Absolute URL üretici. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
