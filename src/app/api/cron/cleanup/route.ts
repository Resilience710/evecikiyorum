import { NextResponse } from "next/server";
import { cleanupExpired } from "@/lib/listings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Vercel Cron günlük çağırır; CRON_SECRET tanımlıysa Authorization başlığı doğrulanır.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }
  await cleanupExpired();
  return NextResponse.json({ ok: true });
}
