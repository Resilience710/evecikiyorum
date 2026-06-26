import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getListing } from "@/lib/listings";
import { formatDate, timeAgo, daysLeft } from "@/lib/format";
import ContactLinks from "@/components/ContactLinks";
import { buildContacts } from "@/lib/contacts";
import Pushpin from "@/components/Pushpin";
import { IconShield } from "@/components/icons";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/site";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ yeni?: string }>;
};

function metaDescription(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > 155 ? clean.slice(0, 152) + "…" : clean;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) {
    return { title: "İlan bulunamadı", robots: { index: false, follow: true } };
  }
  const url = `/ilan/${id}`;
  const desc = metaDescription(listing.description);
  return {
    title: listing.title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: listing.title,
      description: desc,
      siteName: SITE_NAME,
      locale: "tr_TR",
    },
    twitter: { card: "summary_large_image", title: listing.title, description: desc },
  };
}

export default async function ListingDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const listing = await getListing(id);
  if (!listing) notFound();

  const isNew = (await searchParams).yeni === "1";
  const remaining = daysLeft(listing.expires_at);
  const url = `${SITE_URL}/ilan/${id}`;

  const budgetDigits = listing.budget ? listing.budget.replace(/[^\d]/g, "") : "";
  const accommodationLd = {
    "@context": "https://schema.org",
    "@type": ["Accommodation", "SharedResidence"],
    name: listing.title,
    description: listing.description.replace(/\s+/g, " ").trim(),
    url,
    datePosted: new Date(listing.created_at).toISOString(),
    inLanguage: "tr-TR",
    ...(listing.city
      ? { address: { "@type": "PostalAddress", addressLocality: listing.city, addressCountry: "TR" } }
      : {}),
    ...(budgetDigits.length >= 3
      ? {
          offers: {
            "@type": "Offer",
            price: Number(budgetDigits),
            priceCurrency: "TRY",
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: Number(budgetDigits),
              priceCurrency: "TRY",
              unitCode: "MON",
            },
          },
        }
      : {}),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana sayfa", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: listing.title, item: url },
    ],
  };

  return (
    <article className="container-page max-w-3xl py-10 sm:py-14">
      <JsonLd data={[accommodationLd, breadcrumbLd]} />
      <Link href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink/75 hover:text-ink">
        <span aria-hidden>←</span> Duvara dön
      </Link>

      {isNew ? (
        <div role="status" className="mb-8 flex items-center gap-3 rounded-[3px] border-[2.5px] border-ink bg-brand-green px-4 py-3 font-semibold text-paper shadow-[4px_4px_0_0_#221a10]">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-paper bg-paper text-sm text-brand-dark">✓</span>
          İlanın panoya tutturuldu! Bu sayfanın bağlantısını paylaşabilirsin.
        </div>
      ) : null}

      {/* başlık — mantar panoya raptiyelenmiş, açılmış not kâğıdı */}
      <header className="relative">
        <div className="cork rounded-md border border-cork-deep/40 p-3 shadow-[0_14px_30px_-12px_rgba(34,26,16,0.6)] ring-1 ring-inset ring-white/10 sm:p-4">
          <div className="note relative px-6 py-8 sm:px-9 sm:py-9">
            <Pushpin
              color="#2E6FD6"
              size={34}
              className="absolute -top-4 left-1/2 -translate-x-1/2 drop-shadow-[2px_3px_2px_rgba(34,26,16,0.3)]"
            />
            <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-note-ink sm:text-4xl">
              {listing.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-2.5 text-sm">
              {listing.city ? (
                <span className="inline-flex items-center rounded-full border-[1.5px] border-note-ink/40 bg-white/35 px-2.5 py-0.5 text-xs font-semibold text-note-ink">
                  {listing.city}
                </span>
              ) : null}
              {listing.budget ? (
                <span className="inline-flex items-center rounded-full border-[1.5px] border-brand-green/60 bg-brand-green/15 px-2.5 py-0.5 text-xs font-semibold text-brand-dark">
                  {listing.budget}
                </span>
              ) : null}
              <span className="text-note-ink/60">
                {formatDate(listing.created_at)} · {timeAgo(listing.created_at)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* detay — beyaz kağıt zeminde */}
      <section className="mt-8 rounded-[3px] border-[2.5px] border-ink/85 bg-paper p-6 shadow-[5px_8px_0_0_rgba(34,26,16,0.25)] sm:p-7">
        <h2 className="mb-3 font-display text-lg font-semibold text-ink/70">İlan Detayı</h2>
        <p className="whitespace-pre-wrap text-[17px] leading-relaxed text-ink/90">
          {listing.description}
        </p>
      </section>

      {/* iletişim — yalnızca yapılandırılmış iletişim bilgisi olan eski ilanlarda */}
      {buildContacts(listing).length > 0 ? (
        <section className="mt-8 rounded-[3px] border-[2.5px] border-ink/85 bg-paper p-6 shadow-[5px_8px_0_0_rgba(34,26,16,0.25)] sm:p-7">
          <h2 className="font-display text-xl font-semibold">İletişime geç</h2>
          <p className="mt-1 mb-5 text-sm text-ink/60">
            Aşağıdaki bilgiler ilan sahibinindir. evecikiyorum bu bilgileri doğrulamaz.
          </p>
          <ContactLinks listing={listing} />
        </section>
      ) : null}

      {/* sorumluluk reddi */}
      <aside className="mt-8 flex gap-3 rounded-[3px] border-l-4 border-brick bg-paper/95 px-5 py-4 shadow-[3px_4px_0_0_rgba(34,26,16,0.15)]">
        <IconShield className="mt-0.5 h-6 w-6 shrink-0 text-brick-dark" />
        <div className="text-sm leading-relaxed text-ink/80">
          <strong className="text-ink">Dikkat:</strong> evecikiyorum yalnızca bir ilan panosudur;
          ilan sahibini ve içeriği doğrulamaz, ilan sonrası yaşananlardan sorumlu değildir.
          Para/depozito göndermeden önce mutlaka yüz yüze görüş, evi gör ve güvenli bir yerde
          buluş. Ayrıntılar için{" "}
          <Link href="/kurallar" className="font-semibold underline decoration-brick decoration-2 underline-offset-2">
            Kullanım Şartları
          </Link>
          ’nı oku.
        </div>
      </aside>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-ink/70">
        <span>Bu ilan {remaining} gün sonra otomatik kalkacak.</span>
        <Link href="/kurallar#bildir" className="font-semibold text-ink/80 underline decoration-2 underline-offset-2 hover:text-ink">
          Uygunsuz ilanı bildir
        </Link>
      </div>
    </article>
  );
}
