import { Link } from "@tanstack/react-router";
import { brand } from "@/lib/brand";
import { useI18n } from "@/lib/i18n";

/** Perles graduées posées sur un cercle : lues ensemble, elles dessinent un croissant de lune. */
const BEADS: [number, number, number][] = [
  [34.93, 10.98, 1.2],
  [28.11, 7.5, 1.91],
  [20.47, 7.37, 2.55],
  [13.53, 10.6, 3.06],
  [8.72, 16.55, 3.39],
  [7, 24, 3.5],
  [8.72, 31.45, 3.39],
  [13.53, 37.4, 3.06],
  [20.47, 40.63, 2.55],
  [28.11, 40.5, 1.91],
  [34.93, 37.02, 1.2],
];

/**
 * Emblème TIZIRI : un bracelet de pierres qui forme le clair de lune (tiziri),
 * et tient en son creux un losange amazigh, la pierre façonnée.
 */
export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      {BEADS.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="currentColor" />
      ))}
      <path
        d="M26 16.5L31 24L26 31.5L21 24Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M26 21.5L28 24L26 26.5L24 24Z" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

export function Brand({ light = false }: { light?: boolean }) {
  const { L, t } = useI18n();
  return (
    <Link
      to="/"
      className={`flex items-center gap-3 leading-none ${light ? "text-hero-foreground" : "text-foreground"}`}
      aria-label={t("Tiziri, accueil", "تيزيري، الرئيسية")}
    >
      <BrandMark className="h-9 w-9 shrink-0" />
      <span className="block">
        <span className="block font-serif text-[1.6rem] tracking-[.26em]">TIZIRI</span>
        <span className="mt-1 block text-[.5rem] uppercase tracking-[.22em] opacity-80 rtl:text-[.7rem]">
          {L(brand.byline)}
        </span>
      </span>
    </Link>
  );
}
