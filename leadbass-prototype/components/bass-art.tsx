export function BassArt({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 460 340"
      fill="none"
      aria-label="4本の弦を持つベースのイラスト"
      role="img"
    >
      <defs>
        <linearGradient
          id="body"
          x1="120"
          y1="160"
          x2="270"
          y2="330"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#b96040" />
          <stop offset=".5" stopColor="#81422f" />
          <stop offset="1" stopColor="#572e26" />
        </linearGradient>
        <linearGradient id="neck" x1="210" y1="100" x2="240" y2="100">
          <stop stopColor="#d3aa73" />
          <stop offset="1" stopColor="#f3d4a1" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow
            dx="6"
            dy="12"
            stdDeviation="8"
            floodColor="#6c473a"
            floodOpacity=".17"
          />
        </filter>
      </defs>
      <circle cx="258" cy="174" r="133" fill="#efd8c8" />
      <circle
        cx="258"
        cy="174"
        r="104"
        stroke="#e3c5b4"
        strokeDasharray="4 7"
      />
      <path
        d="M65 264c38-28 48-3 81-17M365 65l10 3m-5-8-1 13M393 224l9 3m-4-8-1 13"
        stroke="#ba8b72"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M84 106v26m0-26 17-5v25" stroke="#b97f65" strokeWidth="3" />
      <ellipse cx="78" cy="133" rx="7" ry="5" fill="#b97f65" />
      <ellipse cx="95" cy="128" rx="7" ry="5" fill="#b97f65" />
      <g transform="rotate(35 246 180)" filter="url(#shadow)">
        <path
          d="M209 190c-18-18-39-1-34 22 4 18-16 26-18 49-4 41 29 62 67 62s67-26 60-62c-4-25-26-31-24-52 1-13-2-28-12-31-12-4-15 22-19 23l-20-11Z"
          fill="url(#body)"
          stroke="#703c2d"
          strokeWidth="2"
        />
        <path
          d="M211 199c-17-15-26-5-22 17 4 21-12 31-12 48 0 22 14 38 40 40l20-100-26-5Z"
          fill="#f2e8d5"
        />
        <rect
          x="215"
          y="69"
          width="24"
          height="171"
          rx="2"
          fill="#4c3a30"
          stroke="#c8a16b"
          strokeWidth="4"
        />
        <path
          d="m215 73-5-19 1-35 18-9 20 8-8 44-2 11Z"
          fill="url(#neck)"
          stroke="#c6a06b"
          strokeWidth="2"
        />
        {[25, 39, 53, 65].map((y, i) => (
          <g key={y}>
            <path
              d={`M${i < 2 ? 212 : 241} ${y}h${i < 2 ? -8 : 8}`}
              stroke="#a0a1a0"
              strokeWidth="3"
            />
            <rect
              x={i < 2 ? 199 : 248}
              y={y - 4}
              width="7"
              height="8"
              rx="3"
              fill="#d0d0c8"
            />
          </g>
        ))}
        {[
          83, 99, 114, 128, 141, 153, 164, 174, 183, 191, 199, 206, 213, 219,
          225,
        ].map((y) => (
          <path key={y} d={`M216 ${y}h22`} stroke="#bcb2a0" strokeWidth="1.3" />
        ))}
        {[105, 135, 159, 179, 210].map((y) => (
          <circle key={y} cx="227" cy={y} r="2" fill="#e0d9c7" />
        ))}
        <rect x="207" y="244" width="40" height="12" rx="3" fill="#272a27" />
        <rect x="207" y="263" width="40" height="9" rx="2" fill="#272a27" />
        <rect x="210" y="288" width="34" height="13" rx="2" fill="#b8b6aa" />
        {[219, 224, 230, 235].map((x) => (
          <path key={x} d={`M${x} 40V299`} stroke="#e0d6bd" strokeWidth=".9" />
        ))}
        <circle cx="258" cy="277" r="6" fill="#d0cabe" />
        <circle cx="254" cy="295" r="6" fill="#d0cabe" />
      </g>
      <g transform="rotate(-8 360 275)">
        <rect x="300" y="250" width="119" height="46" rx="12" fill="#fffaf4" />
        <path
          d="M315 272h4m4-7v14m5-19v24m5-17v10m5-7v4"
          stroke="#d77150"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <text
          x="350"
          y="279"
          fill="#6b5042"
          fontSize="13"
          fontFamily="sans-serif"
          fontWeight="600"
        >
          JUST PLAY.
        </text>
      </g>
    </svg>
  );
}
