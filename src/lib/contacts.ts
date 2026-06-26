export type ContactKind = "telegram" | "phone" | "instagram" | "email";

/** Keep a leading +, drop everything except digits. */
export function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  const plus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  return (plus ? "+" : "") + digits;
}

/** Turn "@user", "https://t.me/user", "instagram.com/user/" → "user". */
export function normalizeHandle(raw: string): string {
  let h = raw.trim();
  h = h.replace(/^https?:\/\//i, "");
  h = h.replace(/^(www\.)?(t\.me|telegram\.me|instagram\.com)\//i, "");
  h = h.replace(/^@/, "");
  h = h.split(/[/?#\s]/)[0] ?? "";
  return h;
}

export interface ContactItem {
  kind: ContactKind;
  label: string;
  display: string;
  href: string;
}

/** Build the list of contact methods present on a listing, with safe links. */
export function buildContacts(listing: {
  contact_telegram?: string | null;
  contact_phone?: string | null;
  contact_instagram?: string | null;
  contact_email?: string | null;
}): ContactItem[] {
  const items: ContactItem[] = [];

  if (listing.contact_phone) {
    const v = normalizePhone(listing.contact_phone);
    items.push({ kind: "phone", label: "Telefon", display: listing.contact_phone.trim(), href: `tel:${v}` });
  }
  if (listing.contact_email) {
    const v = listing.contact_email.trim();
    items.push({ kind: "email", label: "E-posta", display: v, href: `mailto:${v}` });
  }
  if (listing.contact_telegram) {
    const v = normalizeHandle(listing.contact_telegram);
    items.push({ kind: "telegram", label: "Telegram", display: `@${v}`, href: `https://t.me/${v}` });
  }
  if (listing.contact_instagram) {
    const v = normalizeHandle(listing.contact_instagram);
    items.push({ kind: "instagram", label: "Instagram", display: `@${v}`, href: `https://instagram.com/${v}` });
  }

  return items;
}
