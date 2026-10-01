import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Gem, House, Menu, ShoppingBag, Sparkles, X, Instagram, Facebook } from "lucide-react";
import { useEffect, useState } from "react";
import { Brand } from "./Brand";
import { Motif } from "./Motif";
import { useCart } from "@/context/CartContext";
import { brand, navLinks } from "@/lib/brand";
import { useI18n } from "@/lib/i18n";

const heroPages = ["/", "/histoire", "/ourika", "/atelier", "/ahmed-tiziri"];

/** Bascule français / arabe. Affiche la langue vers laquelle on passe. */
function LanguageSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();
  const next = lang === "ar" ? "fr" : "ar";
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      lang={next}
      aria-label={next === "ar" ? "Afficher le site en arabe" : "عرض الموقع بالفرنسية"}
      className={`nav-link cursor-pointer py-2 opacity-90 hover:opacity-100 ${className}`}
    >
      {next === "ar" ? <span className="font-[Amiri,serif] text-base normal-case">العربية</span> : "Français"}
    </button>
  );
}

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();
  const { t, L } = useI18n();
  useEffect(() => {
    const f = () => setScrolled(scrollY > 40);
    f();
    addEventListener("scroll", f);
    return () => removeEventListener("scroll", f);
  }, []);
  useEffect(() => setOpen(false), [path]);
  // Menu ouvert : la page derrière ne défile plus.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const light = heroPages.includes(path) && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${scrolled ? "border-b border-border/60 bg-background/90 backdrop-blur-md" : "bg-transparent"} ${light ? "text-hero-foreground" : "text-foreground"}`}
      >
        <div className="mx-auto grid h-16 max-w-[1500px] grid-cols-[auto_1fr_auto] items-center gap-8 px-5 lg:h-22 lg:px-12">
          <Brand light={light} />
          <nav className="hidden justify-center gap-7 lg:flex" aria-label={t("Navigation principale", "التنقل الرئيسي")}>
            {navLinks.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                activeOptions={{ exact: to === "/" }}
                className="nav-link"
                activeProps={{ className: "nav-link is-active" }}
              >
                {L(label)}
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-1">
            <LanguageSwitch className="hidden px-2 sm:block" />
            <Link
              to="/panier"
              className="icon-button relative"
              aria-label={t(`Votre sélection, ${count} article${count > 1 ? "s" : ""}`, `اختياراتك، ${count} قطعة`)}
            >
              <ShoppingBag />
              {count > 0 && <span className="cart-count">{count}</span>}
            </Link>
            <button className="icon-button lg:hidden" onClick={() => setOpen(true)} aria-label={t("Ouvrir le menu", "فتح القائمة")}>
              <Menu />
            </button>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-[60] bg-ink text-hero-foreground transition-transform duration-700 ${open ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Brand light />
          <button className="icon-button" onClick={() => setOpen(false)} aria-label={t("Fermer le menu", "إغلاق القائمة")}>
            <X />
          </button>
        </div>
        <div className="flex h-[calc(100%-4rem)] flex-col overflow-y-auto px-6 pb-8">
          <nav className="mt-4 border-t border-hero-foreground/15" aria-label={t("Menu", "القائمة")}>
            {navLinks.map(([to, label], i) => (
              <Link
                key={to}
                to={to}
                tabIndex={open ? 0 : -1}
                activeOptions={{ exact: to === "/" }}
                activeProps={{ className: "text-sand" }}
                style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                className={`flex items-baseline gap-5 border-b border-hero-foreground/15 py-4 transition-all duration-700 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
              >
                <span className="w-6 font-serif text-sm italic text-sand">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-serif text-[1.7rem] leading-none">{L(label)}</span>
                <ArrowRight className="size-4 self-center opacity-50" />
              </Link>
            ))}
          </nav>
          <Link
            to="/creations/sur-mesure"
            tabIndex={open ? 0 : -1}
            className="mt-7 flex h-13 shrink-0 items-center justify-center gap-3 bg-background text-[.66rem] font-semibold uppercase tracking-[.18em] text-foreground rtl:text-sm"
          >
            <Sparkles className="size-4" /> {t("Composer mon bracelet", "صمّم سوارك")}
          </Link>
          <div className="mt-auto flex items-end justify-between gap-4 pt-8">
            <p className="font-serif text-lg italic leading-6 opacity-70">
              {L(brand.slogan[0])}
              <br />
              {L(brand.slogan[1])}
            </p>
            <LanguageSwitch className="border border-hero-foreground/30 px-4" />
          </div>
        </div>
      </div>
    </>
  );
}

/** Pages qui ont leur propre barre en bas d'écran (achat, récit) : la barre d'onglets s'efface. */
const hidesTabs = (path: string) =>
  path.startsWith("/creations/") || path.startsWith("/checkout") || path.startsWith("/histoire");

/** Navigation du pouce, sur téléphone : les cinq gestes essentiels, toujours à portée. */
export function MobileTabBar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useCart();
  const { t } = useI18n();
  if (hidesTabs(path)) return null;
  const tabs = [
    { to: "/", label: t("Accueil", "الرئيسية"), Icon: House },
    { to: "/histoire", label: t("Histoire", "الحكاية"), Icon: BookOpen },
    { to: "/creations", label: t("Créations", "الإبداعات"), Icon: Gem },
    { to: "/creations/sur-mesure", label: t("Sur mesure", "حسب الطلب"), Icon: Sparkles },
    { to: "/panier", label: t("Sélection", "اختياراتي"), Icon: ShoppingBag },
  ] as const;
  return (
    <nav
      aria-label={t("Navigation rapide", "التنقل السريع")}
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      {tabs.map(({ to, label, Icon }) => (
        <Link
          key={to}
          to={to}
          activeOptions={{ exact: true }}
          className="relative flex h-16 flex-col items-center justify-center gap-1.5 text-muted-foreground transition-colors duration-300"
          activeProps={{ className: "text-foreground before:absolute before:inset-x-5 before:top-0 before:h-0.5 before:bg-clay" }}
        >
          <span className="relative">
            <Icon className="size-5" strokeWidth={1.4} />
            {to === "/panier" && count > 0 && (
              <span className="absolute -end-2.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-foreground px-1 text-[.55rem] font-semibold text-background">
                {count}
              </span>
            )}
          </span>
          <span className="text-[.56rem] font-semibold uppercase tracking-[.1em] rtl:text-[.7rem]">{label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function Footer() {
  const { t, L } = useI18n();
  const socials = [
    { href: brand.social.instagram, label: "Instagram", Icon: Instagram },
    { href: brand.social.facebook, label: "Facebook", Icon: Facebook },
  ].filter((s) => s.href);

  return (
    <footer className="bg-ink px-6 pb-28 pt-16 text-hero-foreground md:pt-20 lg:pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-serif text-3xl italic md:text-5xl">
            {L(brand.slogan[0])}
            <br />
            {L(brand.slogan[1])}
          </p>
          <Motif className="mt-10 text-sand" />
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-hero-foreground/15 pt-10 md:mt-16 md:grid-cols-[1.2fr_1fr_1fr] md:gap-12 md:pt-12">
          <div className="col-span-2 md:col-span-1">
            <Brand light />
            <p className="mt-6 max-w-xs text-sm leading-7 opacity-70">
              {t(
                "Bracelets façonnés à la main à Ourika, au pied de l’Atlas. Chaque pièce naît d’une matière, d’un paysage et d’un geste.",
                "أساور مصنوعة يدويًا في أوريكا، عند سفح الأطلس. كل قطعة تولد من مادة، ومن منظر طبيعي، ومن لمسة يد.",
              )}
            </p>
          </div>
          <nav className="grid content-start gap-4 text-[.68rem] uppercase tracking-[.14em] md:text-xs md:tracking-[.16em] rtl:text-sm" aria-label={t("Pied de page", "تذييل الصفحة")}>
            {navLinks.slice(1).map(([to, l]) => (
              <Link key={to} to={to} className="opacity-80 transition-opacity hover:opacity-100">
                {L(l)}
              </Link>
            ))}
            <Link to="/creations/sur-mesure" className="text-sand opacity-90 transition-opacity hover:opacity-100">
              {t("Bracelet sur mesure", "سوار حسب الطلب")}
            </Link>
          </nav>
          <div className="grid content-start gap-4 text-[.68rem] uppercase tracking-[.14em] md:text-xs md:tracking-[.16em] rtl:text-sm">
            <Link to="/mentions-legales" className="opacity-80 hover:opacity-100">{t("Mentions légales", "الإشعارات القانونية")}</Link>
            <Link to="/confidentialite" className="opacity-80 hover:opacity-100">{t("Confidentialité", "سياسة الخصوصية")}</Link>
            <Link to="/conditions" className="opacity-80 hover:opacity-100">{t("Conditions générales", "الشروط العامة")}</Link>
            <LanguageSwitch className="w-fit text-start" />
            {socials.length > 0 && (
              <div className="flex gap-4 pt-2">
                {socials.map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-3 border-t border-hero-foreground/15 pt-5 text-[.62rem] uppercase tracking-[.14em] opacity-60 rtl:text-xs">
          <span>© {new Date().getFullYear()} {t("Tiziri", "تيزيري")} · {L(brand.place)}</span>
          <span>{t("Fait main, pièce par pièce", "صُنع يدويًا، قطعةً قطعة")}</span>
        </div>
      </div>
    </footer>
  );
}
