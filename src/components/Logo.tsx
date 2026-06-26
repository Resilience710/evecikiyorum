/**
 * evecikiyorum logosu — yeşil ev (çatı + baca + pencere) + yuvarlak yazı tipi.
 * tone="light" koyu zeminlerde (footer) "cikiyorum" metnini açık renkte gösterir.
 */

export function HouseMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" className={className} aria-hidden fill="none">
      {/* çatı (sağ eğim) */}
      <path
        d="M50 9 L90 44"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* çatı (sol eğim) + baca */}
      <path
        d="M50 9 L37 20 M30.5 25.5 L10 44"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* baca */}
      <path
        d="M30.5 26 L30.5 14 L37.5 14 L37.5 20"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* pencere — 2x2 */}
      <rect x="42" y="33" width="7" height="7" rx="1.6" fill="currentColor" />
      <rect x="52" y="33" width="7" height="7" rx="1.6" fill="currentColor" />
      <rect x="42" y="43" width="7" height="7" rx="1.6" fill="currentColor" />
      <rect x="52" y="43" width="7" height="7" rx="1.6" fill="currentColor" />
    </svg>
  );
}

export default function Logo({
  tone = "dark",
  className = "",
  iconClassName = "h-7 w-7",
  textClassName = "text-xl",
}: {
  tone?: "dark" | "light";
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <HouseMark className={`${iconClassName} text-brand-green`} />
      <span className={`font-logo font-extrabold leading-none tracking-tight ${textClassName}`}>
        <span className="text-brand-green">eve</span>
        <span className={tone === "light" ? "text-paper" : "text-ink"}>cikiyorum</span>
        <span className={`align-baseline text-[0.6em] ${tone === "light" ? "text-paper/55" : "text-ink/45"}`}>
          .com
        </span>
      </span>
    </span>
  );
}
