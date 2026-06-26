import type { Metadata } from "next";
import Link from "next/link";
import { listListings } from "@/lib/listings";
import BoardWall from "@/components/BoardWall";
import { createNoteAction } from "@/app/actions";
import { Sun, Mountains } from "@/components/Scenery";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim();
  if (query) {
    // Arama sonuç sayfaları indekslenmesin; kanonik kök sayfaya
    return {
      title: { absolute: `“${query}” ev arkadaşı ilanları | evecikiyorum` },
      description: `“${query}” için ev arkadaşı ve kiralık oda ilanları. Üyeliksiz, ücretsiz.`,
      robots: { index: false, follow: true },
      alternates: { canonical: "/" },
    };
  }
  return {
    title: {
      absolute: "Ev Arkadaşı ve Kiralık Oda İlanları — Üyeliksiz | evecikiyorum",
    },
    description:
      "Üyelik yok, giriş yok. Güncel ev arkadaşı ve kiralık oda ilanlarına ücretsiz göz at, kendi ilanını saniyeler içinde duvara as. Ev arkadaşını hemen bul.",
    alternates: { canonical: "/" },
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; yeniilan?: string }>;
}) {
  const { q, yeniilan } = await searchParams;
  const query = q?.trim() || "";
  const listings = await listListings(query);
  const publicListings = listings.map((l) => ({
    id: l.id,
    title: l.title,
    description: l.description,
    city: l.city,
    budget: l.budget,
    contact_telegram: l.contact_telegram,
    contact_phone: l.contact_phone,
    contact_instagram: l.contact_instagram,
    contact_email: l.contact_email,
    created_at: l.created_at,
  }));

  const itemListLd =
    !query && publicListings.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Ev arkadaşı ve oda arkadaşı ilanları",
          itemListOrder: "https://schema.org/ItemListOrderDescending",
          numberOfItems: Math.min(publicListings.length, 50),
          itemListElement: publicListings.slice(0, 50).map((l, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/ilan/${l.id}`,
            name: l.title,
          })),
        }
      : null;

  return (
    <>
      <h1 className="sr-only">
        evecikiyorum — Ev arkadaşı ve oda arkadaşı ilanları. Üyeliksiz, ücretsiz ilan panosu.
      </h1>
      {itemListLd ? <JsonLd data={itemListLd} /> : null}

      {/* MANZARA — güneş ve gerçekçi karlı dağlar */}
      <section className="relative overflow-hidden pt-6 sm:pt-8" aria-hidden>
        <Sun className="absolute right-6 top-1 z-0 h-20 w-20 sm:right-24 sm:top-2 sm:h-28 sm:w-28" />
        <Mountains className="relative z-10 block h-28 w-full sm:h-40" />
      </section>

      {/* PANO DUVARI */}
      <section className="container-page pb-16 pt-7 sm:pb-20 sm:pt-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {query ? (
              <>
                “{query}” için <span className="text-ink/55">{listings.length} sonuç</span>
              </>
            ) : (
              "İlan Duvarı"
            )}
          </h2>
          {query ? (
            <Link
              href="/"
              className="shrink-0 text-sm font-semibold text-ink/80 underline decoration-2 underline-offset-4 hover:text-ink"
            >
              Aramayı temizle
            </Link>
          ) : null}
        </div>

        <BoardWall
          listings={publicListings}
          query={query}
          openCreate={yeniilan === "1"}
          action={createNoteAction}
        />
      </section>

      {/* SEO İÇERİĞİ — üyeliksiz/ücretsiz ev arkadaşı bulma */}
      {!query ? <HomeContent /> : null}
    </>
  );
}

function HomeContent() {
  return (
    <section className="border-t-[2.5px] border-ink/15 bg-paper/60">
      <div className="container-page max-w-4xl py-14 sm:py-20">
        <div className="legal">
          <h2>Üyeliksiz ev arkadaşı ve oda arkadaşı ilanları</h2>
          <p>
            <strong>evecikiyorum</strong>, ev arkadaşı veya kiralık oda arayanları buluşturan
            ücretsiz bir ilan panosudur. Kayıt olmana, üye olmana ya da giriş yapmana gerek yok:
            boş bir panoya tıkla, not kâğıdına ilanını yaz ve paylaş. İlanın saniyeler içinde
            duvarda yayınlanır; arayanlar da senin bıraktığın telefon, Instagram veya e-posta gibi
            iletişim bilgisiyle <strong>doğrudan</strong> sana ulaşır.
          </p>

          <h3>Nasıl ilan veririm?</h3>
          <ol>
            <li>Duvardaki boş panolardan birine tıkla.</li>
            <li>Açılan boş not kâğıdına ilan metnini yaz (semt, kira, aradığın ev arkadaşı, iletişim).</li>
            <li>“Paylaş”a bas — ilanın hemen yayında.</li>
          </ol>

          <h3>Kimler kullanıyor?</h3>
          <p>
            Yeni bir şehre taşınan öğrenciler, kira yükünü paylaşmak isteyen çalışanlar, evine ev
            arkadaşı arayanlar ve birlikte ev tutacak arkadaş arayan herkes evecikiyorum’u
            kullanıyor. İster <strong>ev arkadaşı arıyorum</strong> diyen tarafta ol, ister evi olup{" "}
            <strong>ev arkadaşı aranıyor</strong> diyen tarafta — ilanını ücretsiz asabilir,
            mevcut ilanlara göz atabilirsin.
          </p>

          <h3>Neden evecikiyorum?</h3>
          <ul>
            <li><strong>Üyelik yok:</strong> e-posta doğrulama, şifre, profil derdi yok.</li>
            <li><strong>Ücretsiz:</strong> ilan vermek ve ilanlara bakmak tamamen bedava.</li>
            <li><strong>Doğrudan iletişim:</strong> aracı yok; ilan sahibine kendi yazdığı kanaldan ulaşırsın.</li>
            <li><strong>Sade:</strong> her ilan, mantar panoya raptiyelenmiş bir not kâğıdı kadar basit.</li>
          </ul>

          <p>
            İlanlar yayınlandıktan 30 gün sonra otomatik olarak kalkar. Güvenli kullanım için{" "}
            <Link href="/kurallar">kullanım şartlarını</Link> oku. Hazırsan{" "}
            <Link href="/?yeniilan=1">hemen ilan as</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
