import { ImageResponse } from "next/og";

export const runtime = "nodejs";

// Organization JSON-LD logosu için raster (PNG) logo — Google logo'nun
// SVG değil raster ve >=112px olmasını ister.
export async function GET() {
  const house = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M16 54 L50 24 L84 54" fill="none" stroke="#FBFAF5" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><rect x="36" y="55" width="11" height="11" rx="2.5" fill="#FBFAF5"/><rect x="53" y="55" width="11" height="11" rx="2.5" fill="#FBFAF5"/><rect x="36" y="70" width="11" height="11" rx="2.5" fill="#FBFAF5"/><rect x="53" y="70" width="11" height="11" rx="2.5" fill="#FBFAF5"/></svg>`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#4E7C45",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width="340"
          height="340"
          src={`data:image/svg+xml;utf8,${encodeURIComponent(house)}`}
          alt="evecikiyorum"
        />
      </div>
    ),
    { width: 512, height: 512 },
  );
}
