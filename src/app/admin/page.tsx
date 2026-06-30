import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { listAllForAdmin } from "@/lib/listings";
import { formatDate, daysLeft } from "@/lib/format";
import { buildContacts } from "@/lib/contacts";
import { isValidSession, ADMIN_COOKIE } from "@/lib/admin-auth";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Yönetim",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>;
}) {
  const { e } = await searchParams;
  const cookieStore = await cookies();
  const authorized = isValidSession(cookieStore.get(ADMIN_COOKIE)?.value);

  if (!authorized) {
    return (
      <div className="container-page max-w-md py-20">
        <h1 className="font-display text-3xl font-semibold">Yönetim Girişi</h1>
        <p className="mt-2 text-ink/65">Kullanıcı adı ve şifre ile giriş yap.</p>
        <form action="/admin/login" method="post" className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="field-label">Kullanıcı adı</label>
            <input
              id="username"
              name="username"
              type="text"
              className="field-input"
              autoComplete="username"
              autoCapitalize="none"
            />
          </div>
          <div>
            <label htmlFor="password" className="field-label">Şifre</label>
            <input
              id="password"
              name="password"
              type="password"
              className="field-input"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn-primary w-full">Giriş</button>
        </form>
        {e ? (
          <p className="mt-4 font-semibold text-brick-dark">Kullanıcı adı veya şifre hatalı.</p>
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
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/" className="btn-ghost text-sm">Siteye dön</Link>
          <form action="/admin/logout" method="post">
            <button type="submit" className="btn-ghost text-sm">Çıkış</button>
          </form>
        </div>
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
                <form action="/admin/delete" method="post" className="shrink-0">
                  <input type="hidden" name="id" value={l.id} />
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
