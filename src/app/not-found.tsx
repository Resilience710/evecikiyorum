import type { Metadata } from "next";
import Link from "next/link";
import { IconArrow } from "@/components/icons";
import Pushpin from "@/components/Pushpin";

// Next.js 404 için noindex'i otomatik ekler; tekrar robots tanımlamıyoruz.
export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
};

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="relative w-64">
        <div className="cork rounded-md border border-cork-deep/40 p-3 shadow-[0_12px_26px_-10px_rgba(34,26,16,0.55)] ring-1 ring-inset ring-white/10">
          <div className="note relative flex h-36 items-center justify-center">
            <Pushpin color="#2E6FD6" size={30} className="absolute -top-3.5 left-1/2 -translate-x-1/2 drop-shadow-[2px_3px_2px_rgba(34,26,16,0.3)]" />
            <span className="font-display text-6xl font-semibold text-note-ink">404</span>
          </div>
        </div>
      </div>

      <h1 className="mt-10 font-display text-3xl font-semibold text-ink">Bu pano boş</h1>
      <p className="mt-2 max-w-sm text-ink/75">
        Aradığın ilan bulunamadı ya da süresi dolmuş olabilir. İlanlar otomatik olarak belirli bir
        süre sonra duvardan kalkar.
      </p>
      <Link href="/" className="btn-primary mt-7">
        Duvara dön <IconArrow className="h-4 w-4" />
      </Link>
    </div>
  );
}
