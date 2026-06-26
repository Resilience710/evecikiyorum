import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og";
import { getListing } from "@/lib/listings";

export const runtime = "nodejs";
export const alt = "evecikiyorum ev arkadaşı ilanı";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListing(id).catch(() => null);

  const rawTitle = listing?.title ?? "İlan bulunamadı";
  const title = rawTitle.length > 110 ? rawTitle.slice(0, 107) + "…" : rawTitle;
  const titleSize = title.length > 70 ? 56 : title.length > 40 ? 68 : 80;
  const city = listing?.city ?? "";
  const budget = listing?.budget ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#A8D63A",
          backgroundImage:
            "radial-gradient(1200px 520px at 50% -10%, rgba(255,255,255,0.45), transparent 70%)",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: 1020,
            minHeight: 440,
            background: "#FBF6C9",
            border: "5px solid #221a10",
            borderRadius: 16,
            padding: "64px 76px",
            boxShadow: "18px 20px 0 rgba(34,26,16,0.28)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -26,
              left: 480,
              width: 52,
              height: 52,
              borderRadius: 26,
              background: "#2E6FD6",
              border: "3px solid #1b3f7a",
              display: "flex",
            }}
          />

          <div
            style={{
              display: "flex",
              fontFamily: "Clash Display",
              fontSize: titleSize,
              fontWeight: 700,
              color: "#221a10",
              lineHeight: 1.08,
            }}
          >
            {title}
          </div>

          <div style={{ display: "flex", gap: 14, marginTop: 30, flexWrap: "wrap" }}>
            {city ? (
              <div
                style={{
                  display: "flex",
                  fontFamily: "Satoshi",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#FBFAF5",
                  background: "#221a10",
                  borderRadius: 999,
                  padding: "8px 22px",
                }}
              >
                {city}
              </div>
            ) : null}
            {budget ? (
              <div
                style={{
                  display: "flex",
                  fontFamily: "Satoshi",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#FBFAF5",
                  background: "#4E7C45",
                  borderRadius: 999,
                  padding: "8px 22px",
                }}
              >
                {budget}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "auto",
              paddingTop: 36,
              fontFamily: "Satoshi",
              fontSize: 34,
              fontWeight: 700,
              color: "#221a10",
            }}
          >
            <span style={{ color: "#4E7C45" }}>eve</span>
            <span>cikiyorum</span>
            <span style={{ color: "rgba(34,26,16,0.45)", fontSize: 22, marginLeft: 4 }}>.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts() },
  );
}
