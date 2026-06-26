/** Dekoratif manzara parçaları: güneş, yeşil tepeler (çam ağaçlı), mavi dalgalar. */

export function Sun({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 140 140" className={className} aria-hidden>
      <circle cx="70" cy="70" r="58" fill="#FAD45E" opacity="0.18" />
      <circle cx="70" cy="70" r="46" fill="#FAD45E" opacity="0.22" />
      <g stroke="#F2B12E" strokeWidth="4.5" strokeLinecap="round" opacity="0.85">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = ((i * 30 + 8) * Math.PI) / 180;
          const inner = 38;
          const outer = i % 3 === 0 ? 54 : i % 3 === 1 ? 48 : 51;
          return (
            <line
              key={i}
              x1={70 + Math.cos(a) * inner}
              y1={70 + Math.sin(a) * inner}
              x2={70 + Math.cos(a) * outer}
              y2={70 + Math.sin(a) * outer}
            />
          );
        })}
      </g>
      <circle cx="70" cy="70" r="30" fill="#FAD45E" />
      <circle cx="70" cy="70" r="30" fill="none" stroke="#F2B12E" strokeWidth="3" opacity="0.5" />
      <ellipse cx="61" cy="60" rx="10" ry="7" fill="#FDE9A8" opacity="0.8" />
    </svg>
  );
}

/** Kahverengi, sık ve büyüklü-küçüklü zirveli katmanlı dağ sırası (atmosferik derinlik). */
export function Mountains({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 160" preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="mtFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D4B389" />
          <stop offset="1" stopColor="#C09E70" />
        </linearGradient>
        <linearGradient id="mtMid1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B68E60" />
          <stop offset="1" stopColor="#97704A" />
        </linearGradient>
        <linearGradient id="mtMid2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#956A40" />
          <stop offset="1" stopColor="#73502D" />
        </linearGradient>
        <linearGradient id="mtNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#65442A" />
          <stop offset="1" stopColor="#4A311A" />
        </linearGradient>
        {/* sağdan (güneş) gelen sıcak ışık */}
        <linearGradient id="mtSun" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.5" stopColor="#FFE9C0" stopOpacity="0" />
          <stop offset="1" stopColor="#FFE9C0" stopOpacity="0.3" />
        </linearGradient>
        {/* taban sisi */}
        <linearGradient id="mtHaze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBF4E8" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FBF4E8" stopOpacity="0.45" />
          <stop offset="1" stopColor="#FBF4E8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* en uzak sıra — açık, puslu, küçük zirveler */}
      <path
        d="M0 160 L0 88 C60 80 95 66 150 70 C205 74 240 56 300 60 C360 64 396 50 455 56 C515 62 555 52 620 58 C690 65 730 54 800 58 C875 63 915 52 985 58 C1055 64 1110 68 1200 64 L1200 160 Z"
        fill="url(#mtFar)"
      />
      {/* taban sisi (uzak sıra) */}
      <rect x="0" y="62" width="1200" height="34" fill="url(#mtHaze)" />

      {/* ikinci sıra — orta boy zirveler */}
      <path
        d="M0 160 L0 102 C55 94 90 70 152 74 C218 78 252 52 322 46 C388 52 422 84 492 88 C556 92 592 62 662 56 C732 62 766 86 840 82 C906 78 946 56 1016 52 C1086 58 1140 84 1200 88 L1200 160 Z"
        fill="url(#mtMid1)"
      />

      {/* üçüncü sıra — büyük zirveler (asıl dağlar) */}
      <path
        d="M0 160 L0 120 C70 110 110 80 182 70 C252 60 292 102 366 106 C436 110 470 76 546 66 C616 58 656 102 732 106 C806 110 846 74 922 66 C996 58 1050 100 1122 106 C1156 109 1182 107 1200 106 L1200 160 Z"
        fill="url(#mtMid2)"
      />
      {/* güneş ışığı (sağ zirveler) */}
      <path
        d="M0 160 L0 120 C70 110 110 80 182 70 C252 60 292 102 366 106 C436 110 470 76 546 66 C616 58 656 102 732 106 C806 110 846 74 922 66 C996 58 1050 100 1122 106 C1156 109 1182 107 1200 106 L1200 160 Z"
        fill="url(#mtSun)"
      />

      {/* en yakın sıra — koyu kahverengi ön tepeler */}
      <path
        d="M0 160 L0 136 C100 126 168 138 258 132 C352 126 418 110 514 118 C614 126 680 138 782 130 C884 122 950 108 1052 116 C1126 122 1168 132 1200 128 L1200 160 Z"
        fill="url(#mtNear)"
      />
    </svg>
  );
}

/** Organik, köpük vurgulu mavi dalgalar. */
export function Waves({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 180" preserveAspectRatio="none" className={className} aria-hidden>
      <path
        d="M0 74 C70 58 130 52 200 62 C270 72 320 96 395 96 C470 96 520 64 595 56 C670 48 730 70 800 82 C870 94 930 92 1000 78 C1060 66 1130 58 1200 70 L1200 180 L0 180 Z"
        fill="#56A8DE"
      />
      <path
        d="M0 106 C75 94 140 90 210 100 C280 110 335 128 410 126 C485 124 540 100 615 94 C690 88 750 106 820 116 C890 126 950 122 1020 110 C1085 100 1145 96 1200 104 L1200 180 L0 180 Z"
        fill="#2E7DBE"
      />
      <path
        d="M0 142 C80 132 150 130 225 138 C300 146 360 156 435 154 C510 152 570 138 645 134 C720 130 780 142 850 148 C920 154 985 152 1055 144 C1110 138 1160 138 1200 142 L1200 180 L0 180 Z"
        fill="#1C5E96"
      />
      <g fill="none" stroke="#EAF6FF" strokeLinecap="round">
        <path d="M60 64 C110 54 160 54 215 62" strokeWidth="4" opacity="0.5" />
        <path d="M520 62 C570 55 620 56 670 64" strokeWidth="4" opacity="0.45" />
        <path d="M960 80 C1010 70 1060 64 1110 64" strokeWidth="4" opacity="0.5" />
        <path d="M260 104 C310 100 355 104 405 112" strokeWidth="3.5" opacity="0.35" />
        <path d="M700 96 C750 92 800 100 845 108" strokeWidth="3.5" opacity="0.35" />
      </g>
      <g fill="#EAF6FF">
        <circle cx="232" cy="62" r="2.6" opacity="0.55" />
        <circle cx="688" cy="64" r="2.4" opacity="0.5" />
        <circle cx="1126" cy="65" r="2.6" opacity="0.55" />
        <circle cx="422" cy="113" r="2.2" opacity="0.4" />
        <circle cx="860" cy="109" r="2.2" opacity="0.4" />
      </g>
    </svg>
  );
}
