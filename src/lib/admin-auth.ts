import { hmac, safeEqual } from "@/lib/security";

/** Yönetim oturum çerezinin adı. */
export const ADMIN_COOKIE = "ev_admin";

/** Kimlik bilgileri ortam değişkenlerinden okunur — koda gömülü DEĞİL
 *  (depo herkese açık). Şifre tanımlı değilse giriş tamamen kapalıdır. */
const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

/** Oturum çerezi değeri: APP_SECRET ile imzalı sabit token; APP_SECRET
 *  bilinmeden üretilemez, bu yüzden çerez taklit edilemez. */
export function makeSessionToken(): string {
  return hmac("ev-admin-session:v1");
}

/** Çerezdeki token geçerli mi? (sabit-zamanlı karşılaştırma) */
export function isValidSession(token: string | undefined | null): boolean {
  if (!token) return false;
  return safeEqual(token, makeSessionToken());
}

/** Kullanıcı adı + şifre doğru mu? */
export function checkLogin(user: string, pass: string): boolean {
  if (!ADMIN_PASSWORD) return false;
  return safeEqual(user, ADMIN_USER) && safeEqual(pass, ADMIN_PASSWORD);
}
