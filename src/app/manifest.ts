import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "evecikiyorum — Ev arkadaşı ve oda arkadaşı ilanları",
    short_name: "evecikiyorum",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#A8D63A",
    theme_color: "#4E7C45",
    lang: "tr",
    dir: "ltr",
    categories: ["lifestyle", "social", "housing"],
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
