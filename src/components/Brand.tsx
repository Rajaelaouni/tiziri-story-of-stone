import { Link } from "@tanstack/react-router";
import { brand } from "@/lib/brand";
import { useI18n } from "@/lib/i18n";

/** Emblème TIZIRI : le clair de lune (tiziri) au-dessus des crêtes de l’Atlas et de l’eau d’Ourika. */
export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 50" className={className} fill="none" aria-hidden="true">
      <path d="M30 5A9.5 9.5 0 0 0 30 24A11.5 11.5 0 0 1 30 5Z" fill="currentColor" />
      <path
        d="M3 41L17 22L25 32L31 25.5L45 41"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M8 46.5c3-1.6 6-1.6 9 0s6 1.6 9 0 6-1.6 9 0 3 1.2 5 .6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
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
