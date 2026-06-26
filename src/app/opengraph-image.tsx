import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "evecikiyorum — Ev arkadaşı ve oda arkadaşı ilanları";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
            background: "#FBF6C9",
            border: "5px solid #221a10",
            borderRadius: 16,
            padding: "70px 80px",
            boxShadow: "18px 20px 0 rgba(34,26,16,0.28)",
          }}
        >
          {/* raptiye */}
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
              fontFamily: "Satoshi",
              fontSize: 38,
              fontWeight: 700,
              color: "#221a10",
            }}
          >
            <span style={{ color: "#4E7C45" }}>eve</span>
            <span>cikiyorum</span>
            <span style={{ color: "rgba(34,26,16,0.45)", fontSize: 24, marginLeft: 4 }}>.com</span>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Clash Display",
              fontSize: 92,
              fontWeight: 700,
              color: "#221a10",
              lineHeight: 1.04,
              marginTop: 28,
            }}
          >
            Ev arkadaşını panodan bul.
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Satoshi",
              fontSize: 36,
              color: "rgba(34,26,16,0.72)",
              marginTop: 28,
            }}
          >
            Üyelik yok · Giriş yok · Ücretsiz ilan panosu
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: ogFonts() },
  );
}
