import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { deleteListing, LISTINGS_TAG } from "@/lib/listings";
import { isValidSession, ADMIN_COOKIE } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!isValidSession(token)) {
    return new NextResponse(null, { status: 303, headers: { Location: "/admin" } });
  }

  const form = await req.formData();
  const id = String(form.get("id") ?? "");
  if (id) {
    await deleteListing(id);
    revalidateTag(LISTINGS_TAG);
  }
  return new NextResponse(null, { status: 303, headers: { Location: "/admin" } });
}
