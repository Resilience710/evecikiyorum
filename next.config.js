/** @type {import('next').NextConfig} */
const nextConfig = {
  // libSQL ships an optional native addon for local file mode; keep these external
  // so Next traces them correctly (works on Vercel with remote Turso too).
  serverExternalPackages: ["@libsql/client", "libsql"],

  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  // OG görseli üreten rotalarda Türkçe TTF fontlarının bundle'a dahil edilmesini garanti et
  outputFileTracingIncludes: {
    "/opengraph-image": ["./src/app/og-fonts/**"],
    "/ilan/[id]/opengraph-image": ["./src/app/og-fonts/**"],
  },

  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ];
    return [
      { source: "/:path*", headers: securityHeaders },
      // Statik favicon/og uzun süre cache'lensin
      {
        source: "/icon.svg",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

module.exports = nextConfig;
