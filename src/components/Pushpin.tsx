/**
 * Renkli raptiye — panoyu duvara tutturur. Dekoratiftir.
 * color: raptiye başı rengi (varsayılan kırmızı).
 */
export default function Pushpin({
  color = "#2E6FD6",
  className = "",
  size = 22,
}: {
  color?: string;
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      className={className}
      aria-hidden
    >
      {/* alt gölge — duvarın üzerine düşen */}
      <ellipse cx="16" cy="22" rx="6" ry="1.6" fill="rgba(0,0,0,0.22)" />
      {/* raptiye başı (yarım küre) */}
      <defs>
        <radialGradient id={`p-${color.replace('#','')}`} cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="35%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
        </radialGradient>
      </defs>
      <circle cx="14" cy="13" r="8.5" fill={`url(#p-${color.replace('#','')})`} />
      <circle cx="14" cy="13" r="8.5" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
      {/* parlama */}
      <ellipse cx="11" cy="10" rx="2.5" ry="1.6" fill="rgba(255,255,255,0.7)" />
    </svg>
  );
}
