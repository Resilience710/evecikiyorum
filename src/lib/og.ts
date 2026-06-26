import fs from "node:fs";
import path from "node:path";

// next/og (Satori) woff2 desteklemez; Türkçe glifler için TTF gömüyoruz.
// Dosyalar next.config outputFileTracingIncludes ile bundle'a dahil edilir.
function read(file: string): Buffer {
  return fs.readFileSync(path.join(process.cwd(), "src", "app", "og-fonts", file));
}

export function ogFonts() {
  return [
    { name: "Clash Display", data: read("ClashDisplay-700.ttf"), weight: 700 as const, style: "normal" as const },
    { name: "Satoshi", data: read("Satoshi-500.ttf"), weight: 500 as const, style: "normal" as const },
    { name: "Satoshi", data: read("Satoshi-700.ttf"), weight: 700 as const, style: "normal" as const },
  ];
}
