import Link from "next/link";
import { TTL_DAYS_LABEL } from "@/lib/listings";
import Logo from "./Logo";
import { Waves } from "./Scenery";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative text-paper">
      {/* mavi dalgalar — yeşil zeminden suya geçiş */}
      <Waves className="-mt-px block h-20 w-full sm:h-28" />
      <div className="bg-water-deep">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo tone="light" iconClassName="h-8 w-8" textClassName="text-2xl" />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/70">
            Üyelik yok, giriş yok. İlanını duvara as, ev arkadaşını bul. İlanlar {TTL_DAYS_LABEL} gün
            sonra otomatik kalkar.
          </p>
        </div>

        <nav className="text-sm">
          <h2 className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-paper/50">
            Keşfet
          </h2>
          <ul className="space-y-2">
            <li><Link href="/" className="text-paper/80 hover:text-wood-light">İlan Duvarı</Link></li>
            <li><Link href="/?yeniilan=1" className="text-paper/80 hover:text-wood-light">İlan As</Link></li>
          </ul>
        </nav>

        <nav className="text-sm">
          <h2 className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-paper/50">
            Yasal
          </h2>
          <ul className="space-y-2">
            <li><Link href="/kurallar" className="text-paper/80 hover:text-wood-light">Kullanım Şartları</Link></li>
            <li><Link href="/gizlilik" className="text-paper/80 hover:text-wood-light">Gizlilik & KVKK</Link></li>
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="mb-3 font-display text-xs font-semibold uppercase tracking-widest text-paper/50">
            Uyarı
          </h2>
          <p className="text-paper/70 leading-relaxed">
            Bu site yalnızca bir ilan panosudur. İlan içeriklerinden ve ilan sonrası yaşananlardan
            sorumlu değildir. Buluşmadan önce dikkatli olun.
          </p>
        </div>
      </div>

        <div className="border-t border-paper/15">
          <div className="container-page flex items-center justify-center gap-2 py-5 text-xs text-paper/55">
            <span>© {year} evecikiyorum</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
