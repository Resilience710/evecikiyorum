import { NextRequest, NextResponse } from "next/server";
import { checkLogin, makeSessionToken, ADMIN_COOKIE } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const user = String(form.get("username") ?? "");
  const pass = String(form.get("password") ?? "");

  // Göreli Location: ters proxy arkasında bile doğru host'a döner.
  if (!checkLogin(user, pass)) {
    return new NextResponse(null, { status: 303, headers: { Location: "/admin?e=1" } });
  }

  const res = new NextResponse(null, { status: 303, headers: { Location: "/admin" } });
  res.cookies.set(ADMIN_COOKIE, makeSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 14 gün
  });
  return res;
}
