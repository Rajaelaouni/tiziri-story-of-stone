import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import backhero from "@/assets/backhero.png";
import backheroMobile from "@/assets/backhero-mobile.jpg";
import ourikaImage from "@/assets/ourika-landscape.jpg";
import matiereImage from "@/assets/produit1Atlass.png";
import mainsImage from "@/assets/atelier-hands.jpg";
import portraitImage from "@/assets/ahmed-portrait.jpg";
import { BrandMark } from "@/components/Brand";
import { Motif } from "@/components/Motif";
import { Button } from "@/components/ui/button";
import { creations } from "@/data.products";
import { brand } from "@/lib/brand";
import { findColor } from "@/lib/sur-mesure";
import { formatPrice, useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/histoire")({
  head: () => ({
    meta: [
      { title: "L’histoire d’un bracelet — TIZIRI" },
      {
        name: "description",
        content:
          "Cinq chapitres, de la vallée d’Ourika jusqu’au poignet : la terre, la matière, les mains qui créent, le créateur, le bracelet.",
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
  const [step, setStep] = useState(0);
  const piece = creations[0];

  const chapters: Chapter[] = [
    {
      n: "01",
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
      n: "02",
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
      n: "03",
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
      n: "04",
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
      n: "05",
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
    (next: number) => setStep(Math.min(Math.max(next, 0), total)),
    [total],
  );

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
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-hero-foreground">
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
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        ) : null,
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/35" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col px-6 pb-10 pt-26 lg:px-14 lg:pt-30">
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
            <span key={c.n} className={`h-px flex-1 transition-colors duration-700 ${i < step ? "bg-hero-foreground" : "bg-hero-foreground/25"}`} />
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {step === 0
            ? t("Début du récit", "بداية الحكاية")
            : t(`Chapitre ${chapter?.n} sur ${total} : ${chapter?.title}`, `الفصل ${chapter?.n} من ${total}: ${chapter?.title}`)}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-1 flex-col"
          >
            {step === 0 && (
              <div className="flex flex-1 flex-col items-center justify-center py-14 text-center">
                <BrandMark className="h-12 w-12 text-sand" />
                <p className="eyebrow mt-6 text-sand">{L(brand.place)}</p>
                <h1 className="display-title mt-6 text-[clamp(3rem,9vw,7rem)]">
                  {t("Une histoire", "حكاية")}
                  <br />
                  {t("à porter", "تُرتدى")}
                </h1>
                <p className="mt-8 max-w-md font-serif text-2xl italic leading-9">
                  {t(
                    "Découvrez l’histoire d’un bracelet, de la vallée d’Ourika jusqu’à votre poignet.",
                    "اكتشف حكاية سوار، من وادي أوريكا إلى معصمك.",
                  )}
                </p>
                <p className="mt-6 text-[.6rem] uppercase tracking-[.18em] opacity-60 rtl:text-xs">
                  {t("Cinq chapitres, à votre rythme", "خمسة فصول، على مهلك")}
                </p>
              </div>
            )}

            {chapter && !isFinal && (
              <div className="grid flex-1 content-end gap-12 py-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-20">
                <div>
                  <p className="eyebrow text-sand">
                    {t("Chapitre", "الفصل")} {chapter.n}
                  </p>
                  <h1 className="display-title mt-4 text-[clamp(2.6rem,6vw,5rem)]">{chapter.title}</h1>
                  <p className="mt-7 max-w-lg font-serif text-2xl italic leading-9">{chapter.lede}</p>
                  {chapter.body && <p className="mt-5 max-w-lg leading-8 opacity-85">{chapter.body}</p>}
                </div>
                {chapter.aside && <div className="w-full lg:max-w-sm lg:justify-self-end">{chapter.aside}</div>}
              </div>
            )}

            {chapter && isFinal && piece && (
              <div className="grid flex-1 content-center gap-12 py-12 lg:grid-cols-2 lg:items-center lg:gap-20">
                <div className="bg-background/95 p-6 md:p-10">
                  <img
                    src={piece.images[0]}
                    alt={L(piece.name)}
                    width="900"
                    height="900"
                    className="mx-auto aspect-square w-full max-w-sm object-cover"
                  />
                </div>
                <div>
                  <p className="eyebrow text-sand">
                    {t("Chapitre", "الفصل")} {chapter.n} · {chapter.title}
                  </p>
                  <h1 className="display-title mt-4 text-[clamp(2.4rem,5vw,4.5rem)]">{L(piece.name)}</h1>
                  <p className="mt-6 max-w-md font-serif text-2xl italic leading-9">{chapter.lede}</p>
                  <p className="mt-5 max-w-md leading-8 opacity-85">{L(piece.description)}</p>
                  <p className="mt-7 font-serif text-3xl">{formatPrice(piece.price, lang)}</p>
                  <div className="mt-9 flex flex-wrap items-center gap-6">
                    <Button asChild variant="ivory" size="lg">
                      <Link to="/creations/$slug" params={{ slug: piece.slug }}>
                        {t("Porter cette histoire", "ارتدِ هذه الحكاية")} <ArrowRight />
                      </Link>
                    </Button>
                    <Link to="/creations/sur-mesure" className="text-link">
                      {t("Composer la vôtre", "صمّم حكايتك")} <ArrowRight />
                    </Link>
                  </div>
                  <Motif className="mt-12 justify-start text-sand" />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-hero-foreground/20 pt-6">
          <div className="flex flex-wrap items-center gap-6">
            {step > 0 && (
              <button type="button" onClick={() => go(step - 1)} className="text-link opacity-70 transition-opacity hover:opacity-100">
                <ArrowLeft className="rtl:-scale-x-100" /> {t("Retour", "رجوع")}
              </button>
            )}
            {isFinal && (
              <button type="button" onClick={() => go(0)} className="text-link opacity-70 transition-opacity hover:opacity-100">
                <RotateCcw /> {t("Revoir l’histoire", "أعد الحكاية")}
              </button>
            )}
          </div>
          {step < total ? (
            <Button variant="ivory" size="lg" onClick={() => go(step + 1)}>
              {step === 0 ? t("Commencer l’histoire", "ابدأ الحكاية") : t("Découvrir la suite", "تابع القراءة")} <ArrowRight />
            </Button>
          ) : (
            <Link to="/creations" className="text-link">
              {t("Découvrir la collection", "اكتشف المجموعة")} <ArrowRight />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
