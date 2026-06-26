import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Ters proxy (OpenLiteSpeed/CyberPanel) bazı isteklerde `Origin` ve/veya
 * `X-Forwarded-Host` başlığını İKİ KEZ gönderiyor; Node bunları
 * "https://site.com, https://site.com" şeklinde virgülle birleştiriyor.
 * Next.js'in Server Action güvenlik (CSRF) kontrolü `new URL(origin)` çağırınca
 * bu birleşik değer "Invalid URL" fırlatıyor ve eylem çöküyor
 * ("An unexpected response was received from the server").
 *
 * Burada çoğaltılmış başlıkları tek (ilk) değere indiriyoruz; tek değerli
 * normal isteklerde hiçbir şey yapmaz (no-op).
 */
function firstValue(v: string): string {
  const comma = v.indexOf(",");
  return comma === -1 ? v : v.slice(0, comma).trim();
}

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin");
  const xfh = req.headers.get("x-forwarded-host");

  const fixOrigin = origin && origin.includes(",");
  const fixXfh = xfh && xfh.includes(",");
  if (!fixOrigin && !fixXfh) return NextResponse.next();

  const headers = new Headers(req.headers);
  if (fixOrigin) headers.set("origin", firstValue(origin!));
  if (fixXfh) headers.set("x-forwarded-host", firstValue(xfh!));
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // statik varlıklar hariç tüm rotalar (Server Action POST'ları dahil)
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
