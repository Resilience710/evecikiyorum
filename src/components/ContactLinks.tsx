import { buildContacts, type ContactKind } from "@/lib/contacts";
import { IconPhone, IconMail, IconTelegram, IconInstagram } from "./icons";

const ICONS: Record<ContactKind, React.ComponentType<{ className?: string }>> = {
  phone: IconPhone,
  email: IconMail,
  telegram: IconTelegram,
  instagram: IconInstagram,
};

export default function ContactLinks({
  listing,
}: {
  listing: Parameters<typeof buildContacts>[0];
}) {
  const items = buildContacts(listing);
  if (items.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = ICONS[item.kind];
        const external = item.kind === "telegram" || item.kind === "instagram";
        return (
          <a
            key={item.kind}
            href={item.href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}
            className="group flex items-center gap-3 rounded-sketch border-[2.5px] border-ink bg-paper px-4 py-3.5 shadow-[4px_4px_0_0_#221a10] transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-green hover:text-paper hover:shadow-[6px_6px_0_0_#221a10]"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sketch border-2 border-ink bg-brand-green text-paper transition-colors group-hover:bg-paper group-hover:text-ink">
              <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-xs font-semibold uppercase tracking-wide text-ink/55 group-hover:text-paper/85">
                {item.label}
              </span>
              <span className="block truncate font-semibold text-ink group-hover:text-paper">{item.display}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
