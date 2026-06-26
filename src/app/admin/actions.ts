"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { deleteListing, LISTINGS_TAG } from "@/lib/listings";
import { safeEqual } from "@/lib/security";

export async function adminDeleteAction(formData: FormData): Promise<void> {
  const key = String(formData.get("key") ?? "");
  const admin = process.env.ADMIN_KEY ?? "";
  if (!admin || !safeEqual(key, admin)) return; // yetkisiz: sessizce yoksay
  const id = String(formData.get("id") ?? "");
  if (id) await deleteListing(id);
  revalidateTag(LISTINGS_TAG);
  revalidatePath("/admin");
}
