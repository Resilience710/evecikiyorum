import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { clashDisplay, satoshi, baloo } from "./fonts";
import JsonLd from "@/components/JsonLd";

const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "tr-TR",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo`,
      contentUrl: `${SITE_URL}/logo`,
      width: 512,
      height: 512,
    },
    description: SITE_DESCRIPTION,
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "evecikiyorum — Ev arkadaşı ve oda arkadaşı ilanları (üyeliksiz)",
    template: "%s · evecikiyorum",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "ev arkadaşı",
    "oda arkadaşı",
    "ev arkadaşı arıyorum",
    "ev arkadaşı aranıyor",
    "ev arkadaşı ilanları",
    "oda arkadaşı ilanı",
    "kiralık oda",
    "öğrenci ev arkadaşı",
    "ücretsiz ilan",
    "evecikiyorum",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "evecikiyorum — Ev arkadaşı ve oda arkadaşı ilanları",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "evecikiyorum — Ev arkadaşı ve oda arkadaşı ilanları",
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#A8D63A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${clashDisplay.variable} ${satoshi.variable} ${baloo.variable}`}>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={siteJsonLd} />
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sketch focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          İçeriğe geç
        </a>
        <Header />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
