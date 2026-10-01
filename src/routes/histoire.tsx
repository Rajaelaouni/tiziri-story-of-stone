import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import backhero from "@/assets/backhero.png";
import backheroMobile from "@/assets/backhero-mobile.jpg";
import ourikaImage from "@/assets/ourika-landscape.jpg";
import nomImage from "@/assets/ourika-riviere-atlas.png";
import matiereImage from "@/assets/produit1Atlass.png";
import mainsImage from "@/assets/atelier-hands.jpg";
import portraitImage from "@/assets/ahmed-portrait.jpg";
import { BrandMark } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { coffrets, creations, elementLabels, separateValue } from "@/data.products";
import { brand } from "@/lib/brand";
import { findColor } from "@/lib/sur-mesure";
import { formatPrice, useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/histoire")({
  // ?c=1 ouvre directement un chapitre (depuis l'accueil mobile, le récit commence sans écran d'attente).
  validateSearch: (search: Record<string, unknown>): { c?: number } => {
    const c = Number(search["c"]);
    return Number.isInteger(c) && c >= 1 && c <= 6 ? { c } : {};
  },
  head: () => ({
    meta: [
      { title: "L’histoire d’un bracelet — TIZIRI" },
      {
        name: "description",
        content:
          "Six chapitres, de la vallée d’Ourika jusqu’au poignet : le nom, la terre, la matière, les mains qui créent, le créateur, le bracelet.",
      },
      { property: "og:title", content: "Une histoire à porter — TIZIRI" },
      { property: "og:description", content: "Le récit d’un bracelet façonné à la main à Ourika." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/histoire" }],
  }),
  component: Page,
});

const ease = [0.22, 1, 0.36, 1] as const;

/** Les chapitres glissent dans le sens de la lecture : vers l'avant ou vers l'arrière. */
const slide = {
  enter: (d: number) => ({ opacity: 0, x: d * 44 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -44 }),
};

type Chapter = {
  n: string;
  title: string;
  lede: string;
  body?: string;
  image: string;
  /** Variante portrait, servie sous 768 px quand elle existe. */
  imageMobile?: string;
  alt: string;
  aside?: ReactNode;
};

/** Repères d'un chapitre : libellé en capitales, valeur en serif. */
function Markers({ items }: { items: [string, string][] }) {
  return (
    <dl className="grid gap-px bg-hero-foreground/20">
      {items.map(([label, value]) => (
        <div key={label} className="bg-ink/60 px-5 py-4 backdrop-blur-sm">
          <dt className="eyebrow text-sand">{label}</dt>
          <dd className="mt-1.5 font-serif text-xl italic">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Page() {
  const { t, L, lang } = useI18n();
  const { c } = Route.useSearch();
  const [step, setStep] = useState(c ?? 0);
  // Sens du dernier déplacement (1 : suite, -1 : retour), inversé en arabe.
  const [dir, setDir] = useState(1);
  // Fin du récit : les créations, puis le coffret qui les réunit.
  const pieces = [...creations, ...coffrets];

  const chapters: Chapter[] = [
    {
      n: "01",
      title: t("Le nom", "الاسم"),
      image: nomImage,
      alt: t("La rivière d’Ourika au pied de l’Atlas", "نهر أوريكا عند سفح الأطلس"),
      lede: L(brand.meaning),
      body: t(
        "Cette lumière douce qui révèle les reliefs sans les brûler. C’est ce que nous cherchons dans chaque matière : une couleur qui ne crie pas, une texture qui raconte, un éclat qui accompagne.",
        "ذلك النور الهادئ الذي يكشف التضاريس دون أن يحرقها. هذا ما نبحث عنه في كل مادة: لون لا يصرخ، وملمس يحكي، وبريق يرافق.",
      ),
      aside: (
        <div className="flex items-center gap-5 bg-ink/60 p-5 backdrop-blur-sm">
          <BrandMark className="h-16 w-16 shrink-0 text-sand" />
          <div>
            <p className="eyebrow text-sand">{t("L’emblème", "الشعار")}</p>
            <p className="mt-2 text-sm leading-6 opacity-85">
              {t(
                "Un bracelet de pierres qui dessine un croissant de lune. En son creux, un losange amazigh : la pierre façonnée.",
                "سوار من الأحجار يرسم هلالًا. وفي جوفه معيّن أمازيغي: الحجر المصقول.",
              )}
            </p>
          </div>
        </div>
      ),
    },
    {
      n: "02",
      title: t("La terre", "الأرض"),
      image: ourikaImage,
      alt: t("Les montagnes et la rivière de la vallée d’Ourika", "جبال ونهر وادي أوريكا"),
      lede: t(
        "La vallée d’Ourika monte vers les premiers sommets de l’Atlas. Une eau vive descend des hauteurs, entre des pentes rouges et vertes.",
        "يصعد وادي أوريكا نحو أولى قمم الأطلس. مياه حيّة تنزل من الأعالي، بين منحدرات حمراء وخضراء.",
      ),
      body: t(
        "Les pierres y sont polies par le courant, les couleurs changent avec la lumière. C’est ici que commence chaque bracelet.",
        "هنا يصقل التيارُ الحجارة، وتتبدّل الألوان مع النور. من هنا يبدأ كل سوار.",
      ),
      aside: (
        <Markers
          items={[
            [t("La pierre", "الحجر"), t("La présence et la mémoire", "الحضور والذاكرة")],
            [t("L’eau", "الماء"), t("Le mouvement et la clarté", "الحركة والصفاء")],
            [t("La lumière", "النور"), t("Les nuances qui révèlent", "الدرجات التي تكشف")],
          ]}
        />
      ),
    },
    {
      n: "03",
      title: t("La matière", "المادة"),
      image: matiereImage,
      alt: t("Bracelet TIZIRI en nacre et pierres, posé à la lumière", "سوار تيزيري من الصدف والأحجار في الضوء"),
      lede: t(
        "Perles minérales veinées, fragments de nacre, cordon tressé. Rien de fabriqué en série : chaque perle est regardée à la lumière avant d’être gardée.",
        "حبات معدنية معرّقة، وشظايا صدف، وحبل مضفور. لا شيء يُنتج بالجملة: تُتأمَّل كل حبة في الضوء قبل أن تُعتمد.",
      ),
      body: t(
        "Une matière naturelle n’est jamais identique d’une pièce à l’autre. Ces nuances ne sont pas un défaut : c’est la signature du vrai.",
        "المادة الطبيعية لا تتشابه من قطعة إلى أخرى. وهذه الدرجات ليست عيبًا: إنها بصمة الأصالة.",
      ),
      aside: (
        <div className="bg-ink/60 p-5 backdrop-blur-sm">
          <p className="eyebrow text-sand">{t("Quelques couleurs de la vallée", "بعض ألوان الوادي")}</p>
          <ul className="mt-4 grid gap-3">
            {["violet-crepuscule", "bleu-source", "nacre-claire", "vert-cedre"].map((id) => {
              const color = findColor(id);
              if (!color) return null;
              return (
                <li key={id} className="flex items-center gap-4 border-t border-hero-foreground/15 pt-3 first:border-0 first:pt-0">
                  <span
                    className="size-5 shrink-0 rounded-full"
                    style={{ background: `radial-gradient(circle at 35% 30%, ${color.light}, ${color.hex} 65%)` }}
                  />
                  <span className="text-sm">{L(color.name)}</span>
                </li>
              );
            })}
          </ul>
          <Link to="/creations/sur-mesure" className="text-link mt-5 text-sand">
            {t("Les choisir sur mesure", "اخترها حسب الطلب")} <ArrowRight />
          </Link>
        </div>
      ),
    },
    {
      n: "04",
      title: t("Les mains qui créent", "اليدان اللتان تُبدعان"),
      image: mainsImage,
      alt: t("Mains d’artisan choisissant des pierres sur l’établi", "يدا حرفي تختاران الأحجار على طاولة العمل"),
      lede: t(
        "Ici, rien n’est produit en série. Un bracelet se compose comme on écrit une phrase : lentement.",
        "هنا، لا شيء يُنتَج بالجملة. يُصاغ السوار كما تُكتب الجملة: على مهل.",
      ),
      aside: (
        <ol className="grid gap-px bg-hero-foreground/20">
          {(
            [
              ["01", t("Observer", "الملاحظة"), t("Une couleur sur la roche, un reflet dans l’oued.", "لون على صخرة، انعكاس في الوادي.")],
              ["02", t("Choisir", "الاختيار"), t("Chaque perle est comparée aux autres. Seules certaines restent.", "تُقارَن كل حبة بغيرها. ولا يبقى إلا بعضها.")],
              ["03", t("Assembler", "التجميع"), t("Perle après perle, le bracelet trouve son rythme.", "حبةً بعد حبة، يجد السوار إيقاعه.")],
            ] as [string, string, string][]
          ).map(([n, title, text]) => (
            <li key={n} className="grid grid-cols-[2.5rem_1fr] bg-ink/60 px-5 py-4 backdrop-blur-sm">
              <span className="font-serif text-lg italic text-sand">{n}</span>
              <div>
                <h3 className="eyebrow">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 opacity-80">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      ),
    },
    {
      n: "05",
      title: t("Le créateur", "المبدع"),
      image: portraitImage,
      alt: t("Ahmed Tiziri dans son atelier", "أحمد تيزيري في ورشته"),
      lede: t(
        "« Et si l’on pouvait porter un morceau de nature ? » C’est la question d’Ahmed Tiziri, et c’est ainsi que TIZIRI est née.",
        "«ماذا لو استطعنا أن نرتدي قطعة من الطبيعة؟» هذا سؤال أحمد تيزيري، وهكذا وُلدت تيزيري.",
      ),
      body: t(
        "Chaque bracelet passe entre ses mains du début à la fin : il choisit les perles, les compare, les dispose, puis les assemble une à une sur le cordon.",
        "يمرّ كل سوار بين يديه من البداية إلى النهاية: يختار الحبات، ويقارنها، ويرتّبها، ثم يجمعها واحدةً تلو الأخرى على الحبل.",
      ),
      aside: (
        <div className="grid gap-px bg-hero-foreground/20">
          <Markers
            items={[
              [t("L’atelier", "الورشة"), L(brand.place)],
              [t("L’assemblage", "التجميع"), t("Entièrement à la main", "يدويًا بالكامل")],
            ]}
          />
          <Link to="/ahmed-tiziri" className="bg-ink/60 px-5 py-4 backdrop-blur-sm">
            <span className="text-link text-sand">
              {t("Son histoire", "حكايته")} <ArrowRight />
            </span>
          </Link>
        </div>
      ),
    },
    {
      n: "06",
      title: t("Le bracelet", "السوار"),
      image: backhero,
      imageMobile: backheroMobile,
      alt: t("Bracelet Tiziri posé sur une pierre, dans la vallée d’Ourika", "سوار تيزيري على حجر في وادي أوريكا"),
      lede: t(
        "Au bout du récit, une pièce. Une matière, un paysage et un geste, réunis au poignet.",
        "في نهاية الحكاية، قطعة. مادة ومكان ولمسة يد، مجتمعة على المعصم.",
      ),
    },
  ];

  const total = chapters.length;
  const chapter = step > 0 ? chapters[step - 1] : undefined;
  const isFinal = step === total;

  const go = useCallback(
    (next: number) => {
      const target = Math.min(Math.max(next, 0), total);
      setStep((current) => {
        if (target !== current) setDir((target > current ? 1 : -1) * (lang === "ar" ? -1 : 1));
        return target;
      });
    },
    [total, lang],
  );

  // Téléphone : glisser du doigt tourne la page, comme un livre.
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const point = e.touches[0];
    // Dans un rail de créations, le doigt fait défiler les cartes, pas les chapitres.
    if ((e.target as Element).closest(".rail")) return;
    if (point) touch.current = { x: point.clientX, y: point.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const point = e.changedTouches[0];
    if (!touch.current || !point) return;
    const dx = point.clientX - touch.current.x;
    const dy = point.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const forward = lang === "ar" ? dx > 0 : dx < 0;
    go(step + (forward ? 1 : -1));
  };
  const nextChapter = step < total ? chapters[step] : undefined;

  // Chaque chapitre se lit depuis le haut de l'écran.
  useEffect(() => {
    scrollTo({ top: 0, behavior: "auto" });
  }, [step]);

  // Flèches du clavier : sens inversé en arabe.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const forward = lang === "ar" ? "ArrowLeft" : "ArrowRight";
      const back = lang === "ar" ? "ArrowRight" : "ArrowLeft";
      if (e.key === forward) go(step + 1);
      if (e.key === back) go(step - 1);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [go, step, lang]);

  const media = [
    { src: backhero, mobile: backheroMobile },
    ...chapters.map((c) => ({ src: c.image, mobile: c.imageMobile })),
  ];

  return (
    <section
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative min-h-[100svh] overflow-x-clip bg-ink text-hero-foreground"
    >
      {/* Image du chapitre. Le visuel suivant est monté à l'avance, invisible, pour éviter l'attente. */}
      {media.map((m, i) =>
        i === step || i === step + 1 ? (
          <picture key={i}>
            {m.mobile && <source media="(max-width: 767px)" srcSet={m.mobile} />}
            <motion.img
              src={m.src}
              alt={i === step ? (chapter?.alt ?? t("Bracelet Tiziri posé sur une pierre, dans la vallée d’Ourika", "سوار تيزيري على حجر في وادي أوريكا")) : ""}
              aria-hidden={i !== step}
              initial={{ opacity: 0, scale: 1.07 }}
              // Le dernier chapitre laisse la place à la pièce : le paysage passe en retrait.
              animate={{ opacity: i === step ? (isFinal ? 0.45 : 1) : 0, scale: i === step ? 1 : 1.07 }}
              transition={{ opacity: { duration: 1.2, ease }, scale: { duration: 3.2, ease } }}
              className="fixed inset-0 h-full w-full object-cover lg:absolute"
            />
          </picture>
        ) : null,
      )}
      <div className="fixed inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35 lg:absolute lg:via-ink/70" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-6 pt-20 lg:px-14 lg:pb-10 lg:pt-30">
        {/* Repère de lecture */}
        <div className="flex items-center justify-between text-[.6rem] uppercase tracking-[.18em] rtl:text-xs">
          <span>
            {step === 0
              ? t("Le récit", "الحكاية")
              : `${t("Chapitre", "الفصل")} ${chapter?.n} / ${String(total).padStart(2, "0")}`}
          </span>
          {step < total && (
            <Link to="/creations" className="opacity-70 transition-opacity hover:opacity-100">
              {t("Passer", "تخطّي")}
            </Link>
          )}
        </div>
        <div className="mt-4 flex gap-1.5" aria-hidden="true">
          {chapters.map((c, i) => (
            <span key={c.n} className={`h-0.5 flex-1 lg:h-px transition-colors duration-700 ${i < step ? "bg-hero-foreground" : "bg-hero-foreground/25"}`} />
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {step === 0
            ? t("Début du récit", "بداية الحكاية")
            : t(`Chapitre ${chapter?.n} sur ${total} : ${chapter?.title}`, `الفصل ${chapter?.n} من ${total}: ${chapter?.title}`)}
        </p>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease }}
            className="relative flex flex-1 flex-col"
          >
            {/* Téléphone : le numéro du chapitre, en filigrane. */}
            {chapter && !isFinal && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute end-0 top-2 font-serif text-[8.5rem] italic leading-none text-hero-foreground/10 lg:hidden"
              >
                {chapter.n}
              </span>
            )}
            {step === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center py-14 text-center">
                <BrandMark className="h-12 w-12 text-sand" />
                <p className="eyebrow mt-6 text-sand">{L(brand.place)}</p>
                <h1 className="display-title mt-6 text-[clamp(3rem,9vw,7rem)]">
                  {t("Une histoire", "حكاية")}
                  <br />
                  {t("à porter", "تُرتدى")}
                </h1>
                <p className="mt-8 max-w-md font-serif text-xl italic leading-8 md:text-2xl md:leading-9">
                  {t(
                    "Découvrez l’histoire d’un bracelet, de la vallée d’Ourika jusqu’à votre poignet.",
                    "اكتشف حكاية سوار، من وادي أوريكا إلى معصمك.",
                  )}
                </p>
                <p className="mt-6 text-[.6rem] uppercase tracking-[.18em] opacity-60 rtl:text-xs">
                  {t("Six chapitres, à votre rythme", "ستة فصول، على مهلك")}
                </p>
              </div>
            )}

            {chapter && !isFinal && (
              <div className="grid flex-1 content-end gap-8 pb-8 pt-40 lg:grid-cols-[1.1fr_.9fr] lg:gap-12 lg:py-12 lg:items-end lg:gap-20">
                <div>
                  <p className="eyebrow text-sand">
                    {t("Chapitre", "الفصل")} {chapter.n}
                  </p>
                  <h1 className="display-title mt-4 text-[clamp(2.6rem,6vw,5rem)]">{chapter.title}</h1>
                  <p className="mt-5 max-w-lg font-serif text-xl italic leading-8 md:mt-7 md:text-2xl md:leading-9">{chapter.lede}</p>
                  {chapter.body && <p className="mt-5 max-w-lg leading-8 opacity-85">{chapter.body}</p>}
                </div>
                {chapter.aside && <div className="w-full lg:max-w-sm lg:justify-self-end">{chapter.aside}</div>}
              </div>
            )}

            {chapter && isFinal && (
              <div className="flex flex-1 flex-col justify-center py-8 lg:py-12">
                <div className="max-w-2xl">
                  <p className="eyebrow text-sand">
                    {t("Chapitre", "الفصل")} {chapter.n}
                  </p>
                  <h1 className="display-title mt-4 text-[clamp(2.6rem,6vw,5rem)]">{chapter.title}</h1>
                  <p className="mt-5 max-w-lg font-serif text-xl italic leading-8 md:text-2xl md:leading-9">{chapter.lede}</p>
                  <p className="mt-5 text-[.6rem] uppercase tracking-[.18em] opacity-60 lg:hidden rtl:text-xs">
                    {t("Glissez pour découvrir les créations", "اسحب لاكتشاف الإبداعات")}
                  </p>
                </div>
                {/* Téléphone : les créations se feuillettent ; grand écran : côte à côte. */}
                <div className="rail -mx-6 mt-8 scroll-px-6 gap-4 px-6 lg:mx-0 lg:mt-12 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:px-0">
                  {pieces.map((p) => {
                    const coffret = p.kind === "coffret";
                    const value = separateValue(p);
                    return (
                      <Link
                        key={p.id}
                        to="/creations/$slug"
                        params={{ slug: p.slug }}
                        className="group flex w-[76vw] max-w-sm flex-col lg:w-auto"
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={p.images[0]}
                            alt={L(p.name)}
                            loading="lazy"
                            className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                          />
                          <span
                            className={`absolute start-3 top-3 px-3 py-1.5 text-[.58rem] font-semibold uppercase tracking-[.18em] rtl:text-xs ${coffret ? "bg-clay text-hero-foreground" : "bg-background/85 text-foreground backdrop-blur-sm"}`}
                          >
                            {coffret ? t("Le coffret", "العلبة") : L(elementLabels[p.element])}
                          </span>
                        </div>
                        <h2 className="mt-4 font-serif text-2xl leading-tight">{L(p.name)}</h2>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 opacity-80">{L(p.description)}</p>
                        <div className="mt-auto flex items-end justify-between gap-3 border-t border-hero-foreground/20 pt-4">
                          <span>
                            <span className="block font-serif text-2xl">{formatPrice(p.price, lang)}</span>
                            {value > p.price && (
                              <span className="mt-1 block text-xs opacity-70">
                                {t("au lieu de", "بدلًا من")} <s>{formatPrice(value, lang)}</s>
                              </span>
                            )}
                          </span>
                          <span className="text-link pb-1 text-sand">
                            {t("Voir", "شاهد")} <ArrowRight />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <Link to="/creations/sur-mesure" className="text-link mt-8 lg:mt-10">
                  {t("Ou composer la vôtre, sur mesure", "أو صمّم حكايتك حسب الطلب")} <ArrowRight />
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation. Téléphone : collée en bas, sous le pouce ; grand écran : en pied de page. */}
        <div className="sticky bottom-0 z-20 -mx-6 bg-gradient-to-t from-ink via-ink via-75% to-transparent px-6 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-10 lg:static lg:mx-0 lg:border-t lg:border-hero-foreground/20 lg:bg-none lg:px-0 lg:pb-0 lg:pt-6">
          {nextChapter && step > 0 && (
            <p className="mb-3 text-[.6rem] uppercase tracking-[.18em] opacity-70 lg:hidden rtl:text-xs">
              {t("Ensuite", "التالي")} — <span className="text-sand">{nextChapter.n}</span> {nextChapter.title}
            </p>
          )}
          {step === 0 && (
            <p className="mb-3 text-center text-[.6rem] uppercase tracking-[.18em] opacity-60 lg:hidden rtl:text-xs">
              {t("Touchez ou glissez pour avancer", "المس أو اسحب للمتابعة")}
            </p>
          )}
          <div className="flex items-center justify-between gap-3 lg:flex-wrap lg:gap-6">
            {(step > 0 || isFinal) && (
              <div className="flex items-center gap-3 lg:flex-wrap lg:gap-6">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => go(step - 1)}
                    aria-label={t("Retour", "رجوع")}
                    className="grid size-14 shrink-0 cursor-pointer place-items-center border border-hero-foreground/30 opacity-80 transition-opacity hover:opacity-100 lg:flex lg:size-auto lg:border-0 lg:text-link"
                  >
                    <ArrowLeft className="size-4 rtl:-scale-x-100" /> <span className="hidden lg:inline">{t("Retour", "رجوع")}</span>
                  </button>
                )}
                {isFinal && (
                  <button
                    type="button"
                    onClick={() => go(0)}
                    aria-label={t("Revoir l’histoire", "أعد الحكاية")}
                    className="grid size-14 shrink-0 cursor-pointer place-items-center border border-hero-foreground/30 opacity-80 transition-opacity hover:opacity-100 lg:flex lg:size-auto lg:border-0 lg:text-link"
                  >
                    <RotateCcw className="size-4" /> <span className="hidden lg:inline">{t("Revoir l’histoire", "أعد الحكاية")}</span>
                  </button>
                )}
              </div>
            )}
            {step < total ? (
              <Button variant="ivory" size="lg" onClick={() => go(step + 1)} className="flex-1 px-4 lg:flex-none lg:px-9">
                {step === 0 ? t("Commencer l’histoire", "ابدأ الحكاية") : t("Découvrir la suite", "تابع القراءة")} <ArrowRight />
              </Button>
            ) : (
              <>
                {/* Fin du récit : chaque carte mène à sa fiche ; le bouton, à la collection. */}
                <Button asChild variant="ivory" size="lg" className="flex-1 px-4 lg:hidden">
                  <Link to="/creations">
                    {t("Toute la collection", "كل المجموعة")} <ArrowRight />
                  </Link>
                </Button>
                <Link to="/creations" className="text-link hidden lg:inline-flex">
                  {t("Découvrir la collection", "اكتشف المجموعة")} <ArrowRight />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
