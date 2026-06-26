"use server";

import { headers } from "next/headers";
import { revalidateTag } from "next/cache";
import { containsProfanity } from "@/lib/profanity";
import { checkRateLimit } from "@/lib/rate-limit";
import { getClientIp, hashIp } from "@/lib/security";
import { createListing, LISTINGS_TAG } from "@/lib/listings";
import type { FormState } from "@/lib/form-types";

/**
 * Pano üzerindeki boş not kâğıdına yazılan serbest metni yayınlar.
 * Hiçbir alan sorulmaz; metin olduğu gibi nottur. Sessiz korumalar:
 * honeypot + IP rate-limit + küfür filtresi.
 */
export async function createNoteAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (String(formData.get("website") ?? "").trim()) {
    return { ok: false, formError: "İstek reddedildi." };
  }

  const text = String(formData.get("text") ?? "").replace(/\r\n/g, "\n").trim();
  const values = { text };

  if (text.length < 20) {
    return { ok: false, values, formError: "Biraz daha detay yaz (en az 20 karakter)." };
  }
  if (text.length > 600) {
    return { ok: false, values, formError: "Not en fazla 600 karakter olabilir." };
  }
  if (containsProfanity(text)) {
    return { ok: false, values, formError: "Notun uygunsuz ifadeler içeriyor görünüyor." };
  }

  const reqHeaders = await headers();
  const ipHash = hashIp(getClientIp(reqHeaders));
  if (!(await checkRateLimit(ipHash)).allowed) {
    return {
      ok: false,
      values,
      formError: "Kısa sürede çok fazla ilan oluşturdunuz. Lütfen bir süre sonra tekrar deneyin.",
    };
  }

  const id = await createListing({
    // başlık yalnızca arama/detay için türetilir; panoda metnin kendisi görünür
    title: text.replace(/\s+/g, " ").slice(0, 80),
    description: text,
    ip_hash: ipHash,
  });

  revalidateTag(LISTINGS_TAG);
  return { ok: true, id };
}
