import crypto from "node:crypto";

const SECRET = process.env.APP_SECRET || "dev-insecure-secret-change-me";

/** Generic HMAC-SHA256 helper (hex). */
export function hmac(value: string): string {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

/**
 * Hash an IP address before storing it (KVKK / privacy):
 * we never persist raw IPs, only an unrecoverable keyed hash used for rate limiting.
 */
export function hashIp(ip: string): string {
  return hmac("ip:" + ip).slice(0, 32);
}

/** Best-effort client IP extraction from request headers. */
export function getClientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return headers.get("x-real-ip") || "unknown";
}

/** URL-safe, hard-to-enumerate listing id. */
export function generateId(): string {
  return crypto.randomBytes(9).toString("base64url");
}

/** Constant-time string comparison (for admin key / signatures). */
export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}
