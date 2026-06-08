type LogoMarkProps = {
  className?: string;
};

export default function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#43283C" strokeWidth="3.5" strokeLinejoin="round">
        <path
          d="M18 58h64v28a6 6 0 01-6 6H24a6 6 0 01-6-6V58z"
          fill="#9EE6C4"
        />
        <path d="M14 48h72v14H14z" fill="#8FD7F4" />
        <path
          d="M50 48c-8-18-28-18-28 2h56c0-20-20-20-28-2z"
          fill="#FFD96B"
        />
        <circle cx="50" cy="34" r="8" fill="#FFD96B" />
        <path
          d="M42 30c0-6 4-10 8-10s8 4 8 10"
          fill="none"
          strokeLinecap="round"
        />
        <text
          x="28"
          y="72"
          fill="#FF7BAC"
          stroke="none"
          fontSize="14"
          fontWeight="800"
          fontFamily="var(--font-display), cursive"
        >
          ?
        </text>
        <text
          x="58"
          y="72"
          fill="#FFD96B"
          stroke="none"
          fontSize="12"
          fontWeight="800"
          fontFamily="var(--font-display), cursive"
        >
          ★
        </text>
        <ellipse cx="50" cy="26" rx="18" ry="16" fill="#FFB6D4" />
        <ellipse cx="50" cy="22" rx="7" ry="4" fill="#fff" opacity=".75" />
        <circle cx="43" cy="26" r="2.5" fill="#43283C" stroke="none" />
        <circle cx="57" cy="26" r="2.5" fill="#43283C" stroke="none" />
        <circle cx="38" cy="31" r="3.5" fill="#FF7BAC" stroke="none" opacity=".7" />
        <circle cx="62" cy="31" r="3.5" fill="#FF7BAC" stroke="none" opacity=".7" />
        <path
          d="M44 32q6 5 12 0"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
