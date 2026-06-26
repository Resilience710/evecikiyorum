import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { listForSitemap } from "@/lib/listings";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "hourly", priority: 1 },
    { url: `${SITE_URL}/kurallar`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/gizlilik`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  let listingRoutes: MetadataRoute.Sitemap = [];
  try {
    const listings = await listForSitemap();
    listingRoutes = listings.map((l) => ({
      url: `${SITE_URL}/ilan/${l.id}`,
      lastModified: new Date(l.updated),
      changeFrequency: "daily",
      priority: 0.8,
    }));
  } catch {
    // veritabanı erişilemezse sadece statik rotaları döndür
  }

  return [...staticRoutes, ...listingRoutes];
}
