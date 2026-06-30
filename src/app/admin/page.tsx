import type { Metadata } from "next";
import Link from "next/link";
import { listAllForAdmin } from "@/lib/listings";
import { safeEqual } from "@/lib/security";
import { formatDate, daysLeft } from "@/lib/format";
import { buildContacts } from "@/lib/contacts";
import { adminDeleteAction } from "./actions";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yönetim",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key = "" } = await searchParams;
  const adminKey = process.env.ADMIN_KEY ?? "";
  const authorized = adminKey.length > 0 && safeEqual(key, adminKey);

  if (!authorized) {
    return (
      <div className="container-page max-w-md py-20">
        <h1 className="font-display text-3xl font-semibold">Yönetim Girişi</h1>
        <p className="mt-2 text-ink/65">Devam etmek için yönetici anahtarını gir.</p>
        <form action="/admin" method="get" className="mt-6 space-y-4">
          <div>
            <label htmlFor="key" className="field-label">Yönetici Anahtarı</label>
            <input id="key" name="key" type="password" className="field-input" autoComplete="off" />
          </div>
          <button type="submit" className="btn-primary w-full">Giriş</button>
        </form>
        {key.length > 0 ? (
          <p className="mt-4 font-semibold text-brick-dark">Anahtar hatalı.</p>
        ) : null}
      </div>
    );
  }

  const listings = await listAllForAdmin();

  return (
    <div className="container-page py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">
            Yönetim · {listings.length} ilan
          </h1>
          <p className="mt-1 text-sm text-ink/55">
            Beğenmediğin ilanı <strong>Sil</strong> ile kaldır. Silme kalıcıdır.
          </p>
        </div>
        <Link href="/" className="btn-ghost text-sm">Siteye dön</Link>
      </div>

      <div className="mt-8 space-y-4">
        {listings.length === 0 ? (
          <p className="text-ink/60">Hiç ilan yok.</p>
        ) : (
          listings.map((l) => {
            const expired = l.expires_at <= Date.now();
            return (
              <div
                key={l.id}
                className={`flex flex-col gap-3 border-[2.5px] border-ink bg-paper p-4 sm:flex-row sm:items-center sm:justify-between ${
                  expired ? "opacity-50" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/ilan/${l.id}`}
                      className="truncate font-display text-lg font-semibold hover:underline"
                    >
                      {l.title}
                    </Link>
                    {expired ? <span className="tag border-brick text-brick-dark">süresi dolmuş</span> : null}
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm text-ink/55">{l.description}</p>
                  <p className="mt-1 text-xs text-ink/45">
                    {l.city ? `${l.city} · ` : ""}
                    {formatDate(l.created_at)} · {daysLeft(l.expires_at)} gün kaldı ·{" "}
                    {buildContacts(l).map((c) => c.label).join(", ") || "iletişim yok"}
                  </p>
                </div>
                <form action={adminDeleteAction} className="shrink-0">
                  <input type="hidden" name="id" value={l.id} />
                  <input type="hidden" name="key" value={key} />
                  <DeleteButton title={l.title} />
                </form>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
