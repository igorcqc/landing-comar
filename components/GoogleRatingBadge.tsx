const GOOGLE_MAPS_LINK =
  "https://www.google.com/maps/place/Comar+M%C3%B3veis+Planejados/@-32.0098652,-52.0403119,17z/data=!3m1!4b1!4m6!3m5!1s0x95119d235c6770bb:0xdb716984f62c2203!8m2!3d-32.0098652!4d-52.0403119!16s%2Fg%2F11qqfgs9l9";

interface GoogleRatingBadgeProps {
  variant?: "inline" | "block";
}

export default function GoogleRatingBadge({
  variant = "inline",
}: GoogleRatingBadgeProps) {
  return (
    <a
      href={GOOGLE_MAPS_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`google-badge google-badge-${variant}`}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.85C6.71 7.3 9.14 5.38 12 5.38z"
        />
      </svg>
      <span className="google-badge-text">
        <strong>★★★★★ 5,0</strong>
        <span>117 avaliações · a empresa mais bem avaliada de São José do Norte</span>
      </span>
    </a>
  );
}
