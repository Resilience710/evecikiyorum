// Basit Türkçe/İngilizce uygunsuz içerik filtresi (sunucu tarafı, anahtarsız).
// Amaç kaba bir ön filtre; nihai denetim /admin moderasyonuyla yapılır.
//
// Not: Türkçe'de "ı" ve "i" farklı harflerdir. Bunları birleştirmiyoruz; aksi halde
// "sıkıntı, sıkışık, sık" gibi masum kelimeler "sik" köküne takılırdı.

// Kelime BAŞINDA eşleşen kökler (ekler eklenebilir: siktir, sikecek, orospusu...).
const PREFIX_ROOTS = [
  "sik",
  "orospu",
  "amcık",
  "amına",
  "yarrak",
  "yarak",
  "pezevenk",
  "yavşak",
  "kahpe",
  "kaltak",
  "gavat",
  "ibne",
  "ipne",
  "piç",
  "fuck",
  "shit",
  "bitch",
  "asshole",
  "porn",
];

// Yalnızca TAM kelime olarak eşleşen kısa/riskli ifadeler.
const EXACT_WORDS = new Set([
  "oç",
  "göt",
  "amk",
  "aq",
  "amq",
  "mq",
  "awk",
  "awq",
  "oc",
]);

// Yanlış pozitifleri önlemek için güvenli kelimeler.
const WHITELIST = new Set(["sikke", "siklon", "sikloid", "siklet"]);

function normalize(text: string): string {
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/@/g, "a")
    .replace(/\$/g, "s")
    .replace(/0/g, "o")
    .replace(/[^a-zçğıöşü\s]/g, " ")
    .replace(/(.)\1{2,}/g, "$1$1") // "siiiik" -> "siik"
    .replace(/\s+/g, " ")
    .trim();
}

export function containsProfanity(...texts: (string | null | undefined)[]): boolean {
  const normalized = normalize(texts.filter(Boolean).join(" "));
  if (!normalized) return false;

  for (const token of normalized.split(" ")) {
    if (!token || WHITELIST.has(token)) continue;
    if (EXACT_WORDS.has(token)) return true;
    for (const root of PREFIX_ROOTS) {
      if (root.length >= 2 && token.startsWith(root)) return true;
    }
  }
  return false;
}
