import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import backhero from "@/assets/backhero.png";
import backheroMobile from "@/assets/backhero-mobile.jpg";
import ourika from "@/assets/ourika-landscape.jpg";
import atelier from "@/assets/atelier-hands.jpg";
import portrait from "@/assets/ahmed-portrait.jpg";
import { ProductStories, CoffretFeature, SurMesureFeature, Reveal, Eyebrow } from "@/components/Editorial";
import { Motif } from "@/components/Motif";
import { BrandMark } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/brand";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TIZIRI — Bracelets artisanaux façonnés à la main à Ourika" },
      {
        name: "description",
        content:
          "Maison de création marocaine. Bracelets en pierres et nacre, façonnés à la main par Ahmed Tiziri, inspirés par la vallée d’Ourika et l’Atlas.",
      },
      { property: "og:title", content: "TIZIRI — Créations d’Ahmed Tiziri" },
      { property: "og:description", content: "Porter la nature. Porter une histoire." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 110]);
  const { t, L } = useI18n();

  const gestures = [
    [
      "01",
      t("Observer", "الملاحظة"),
      t("Une couleur sur la roche, un reflet dans l’oued. Tout commence par un regard.", "لون على صخرة، انعكاس في الوادي. كل شيء يبدأ بنظرة."),
    ],
    [
      "02",
      t("Choisir", "الاختيار"),
      t(
        "Chaque perle est regardée à la lumière, comparée aux autres. Seules certaines restent.",
        "تُتأمَّل كل حبة في الضوء وتُقارَن بغيرها. ولا يبقى إلا بعضها.",
      ),
    ],
    [
      "03",
      t("Assembler", "التجميع"),
      t("Perle après perle, le bracelet trouve son rythme et son équilibre.", "حبةً بعد حبة، يجد السوار إيقاعه وتوازنه."),
    ],
  ];

  return (
    <>
      {/* 1. NATURE — l'immersion */}
      <section className="relative min-h-[100svh] overflow-hidden bg-ink text-hero-foreground">
        {/* Cadrage portrait sur mobile, paysage à partir de la tablette. */}
        <picture>
          <source media="(max-width: 767px)" srcSet={backheroMobile} />
          <motion.img
            style={{ y }}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
            src={backhero}
            alt={t("Bracelet Tiziri posé sur une pierre, dans la vallée d’Ourika au coucher du soleil", "سوار تيزيري على حجر في وادي أوريكا عند الغروب")}
            className="absolute inset-0 h-[112%] w-full object-cover"
          />
        </picture>
        {/* Portrait : voile vertical, le texte passe sur le ciel et la roche claire.
            Paysage : voile latéral, la pièce reste dégagée à droite. */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/45 to-ink/65 md:bg-gradient-to-r md:from-ink/75 md:via-ink/25 md:to-transparent md:rtl:bg-gradient-to-l" />
        {/* Portrait : le texte se pose sur le ciel et laisse la pièce visible en bas. */}
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] items-start px-6 pt-28 md:items-center md:pt-24 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="max-w-3xl"
          >
            <Eyebrow className="text-sand">{t("Maison de création — Ourika, Maroc", "دار إبداع — أوريكا، المغرب")}</Eyebrow>
            <h1 className="mt-6 font-serif text-[clamp(3rem,6vw,6.8rem)] leading-[.9]">
              {t("La nature a créé", "الطبيعة صنعت")}
              <br />
              {t("la matière.", "المادة.")}
              <br />
              <em>
                {t("Ahmed Tiziri lui a donné", "وأحمد تيزيري")}
                <br />
                {t("une histoire.", "منحها حكاية.")}
              </em>
            </h1>
            <p className="mt-8 max-w-md leading-7 opacity-90">
              {t(
                "Des bracelets en pierres et nacre, façonnés à la main au pied de l’Atlas. Chaque pièce porte une lumière de la vallée.",
                "أساور من الأحجار والصدف، مصنوعة يدويًا عند سفح الأطلس. كل قطعة تحمل نورًا من الوادي.",
              )}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Button asChild variant="ivory" size="lg">
                <Link to="/creations">
                  {t("Découvrir les créations", "اكتشف الإبداعات")} <ArrowRight />
                </Link>
              </Button>
              <Link to="/histoire" className="text-link">
                {t("Vivre l’histoire", "عِش الحكاية")} <ArrowRight />
              </Link>
              <Link to="/ahmed-tiziri" className="text-link">
                {t("Rencontrer le créateur", "تعرّف على المبدع")} <ArrowRight />
              </Link>
            </div>
          </motion.div>
          <p className="absolute bottom-24 end-8 hidden border-s border-hero-foreground/50 ps-5 font-serif text-2xl italic lg:block">
            {L(brand.slogan[0])}
            <br />
            {L(brand.slogan[1])}
          </p>
          <div className="absolute bottom-8 start-6 flex items-center gap-3 text-[.6rem] uppercase tracking-[.18em] lg:start-16 rtl:text-xs">
            <ArrowDown className="size-4 animate-bounce" />
            {t("Défiler pour explorer", "مرّر للاستكشاف")}
          </div>
        </div>
      </section>

      {/* 2. CURIOSITÉ — le manifeste */}
      <section className="px-6 py-28 md:py-40">
        <Reveal className="mx-auto max-w-4xl text-center">
          <BrandMark className="mx-auto h-14 w-14 text-clay" />
          <p className="mt-8 eyebrow">{t("Tiziri", "تيزيري")}</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight md:text-6xl">
            <em>{L(brand.meaning)}</em>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-muted-foreground">
            {t(
              "Cette lumière douce qui révèle les reliefs sans les brûler. C’est ce que nous cherchons dans chaque matière : une couleur qui ne crie pas, une texture qui raconte, un éclat qui accompagne.",
              "ذلك النور الهادئ الذي يكشف التضاريس دون أن يحرقها. هذا ما نبحث عنه في كل مادة: لون لا يصرخ، وملمس يحكي، وبريق يرافق.",
            )}
          </p>
          <Motif className="mt-14 text-clay" />
        </Reveal>
        <div className="mx-auto mt-20 grid max-w-6xl gap-px bg-border md:grid-cols-3">
          {brand.values.map((v, i) => (
            <Reveal key={v.title.fr} className="bg-background p-8 md:p-10">
              <p className="section-number">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 font-serif text-3xl">{L(v.title)}</h3>
              <p className="mt-4 leading-7 text-muted-foreground">{L(v.text)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3. HISTOIRE — les créations */}
      <section className="border-t border-border px-6 py-24 md:py-36">
        <Reveal className="mx-auto max-w-5xl text-center">
          <Eyebrow className="text-clay">{t("Les créations", "الإبداعات")}</Eyebrow>
          <h2 className="display-title mt-6 text-5xl md:text-8xl">
            {t("Une histoire derrière", "خلف كل إبداع")}
            <br />
            {t("chaque création", "حكاية")}
          </h2>
          <p className="mx-auto mt-8 max-w-xl leading-8 text-muted-foreground">
            {t(
              "Chaque bracelet est une rencontre entre une matière, une inspiration et la main du créateur.",
              "كل سوار هو لقاء بين مادة، وإلهام، ويد المبدع.",
            )}
          </p>
        </Reveal>
        <div className="mx-auto mt-12 max-w-7xl">
          <ProductStories />
        </div>
      </section>

      {/* 4. CRÉATION — le geste */}
      <section className="bg-ink text-hero-foreground">
        <div className="mx-auto grid max-w-[1500px] md:grid-cols-2">
          <div className="relative min-h-[60svh] overflow-hidden">
            <img
              src={atelier}
              alt={t("Mains d’artisan choisissant des pierres sur l’établi", "يدا حرفي تختاران الأحجار على طاولة العمل")}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center px-6 py-20 md:px-16">
            <Reveal>
              <Eyebrow className="text-sand">{t("L’atelier", "الورشة")}</Eyebrow>
              <h2 className="display-title mt-5 text-5xl md:text-7xl">{t("Le temps du geste", "زمن اللمسة")}</h2>
              <p className="mt-6 max-w-md font-serif text-2xl italic leading-9 opacity-90">
                {t(
                  "Ici, rien n’est produit en série. Un bracelet se compose comme on écrit une phrase : lentement.",
                  "هنا، لا شيء يُنتَج بالجملة. يُصاغ السوار كما تُكتب الجملة: على مهل.",
                )}
              </p>
              <ol className="mt-10 grid gap-7">
                {gestures.map(([n, title, text]) => (
                  <li key={n} className="grid grid-cols-[3rem_1fr] border-t border-hero-foreground/20 pt-6">
                    <span className="font-serif text-xl italic text-sand">{n}</span>
                    <div>
                      <h3 className="eyebrow">{title}</h3>
                      <p className="mt-2 text-sm leading-7 opacity-80">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link to="/atelier" className="text-link mt-10">
                {t("Entrer dans l’atelier", "ادخل إلى الورشة")} <ArrowRight />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. ÉMOTION — la source */}
      <section className="relative min-h-[80svh] overflow-hidden text-hero-foreground">
        <img
          src={ourika}
          alt={t("Vallée d’Ourika au soleil couchant", "وادي أوريكا عند غروب الشمس")}
          loading="lazy"
          width="1600"
          height="1008"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/40" />
        <Reveal className="relative z-10 mx-auto flex min-h-[80svh] max-w-7xl flex-col items-center justify-center px-6 text-center">
          <Eyebrow>{t("La source", "المنبع")}</Eyebrow>
          <h2 className="display-title mt-5 text-6xl md:text-9xl">{t("Ourika", "أوريكا")}</h2>
          <p className="mt-5 max-w-xl font-serif text-3xl italic">
            {t(
              "La pierre, l’eau, la terre, la lumière. Tout ce que nous portons vient d’ici.",
              "الحجر، الماء، الأرض، النور. كل ما نرتديه يأتي من هنا.",
            )}
          </p>
          <Link to="/ourika" className="text-link mt-10">
            {t("Entrer dans la vallée", "ادخل إلى الوادي")} <ArrowRight />
          </Link>
        </Reveal>
      </section>

      {/* 6. DÉSIR — le coffret */}
      <CoffretFeature />
      <SurMesureFeature />

      {/* 7. ACHAT — la confiance : le créateur */}
      <section className="px-6 py-24 md:py-36">
        <Reveal className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-20">
          <img
            src={portrait}
            alt={t("Ahmed Tiziri à l’établi", "أحمد تيزيري على طاولة العمل")}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover object-[center_30%]"
          />
          <div>
            <Eyebrow className="text-clay">{t("Le créateur", "المبدع")}</Eyebrow>
            <blockquote className="mt-6 font-serif text-4xl leading-tight md:text-5xl">
              <em>{t("« Et si l’on pouvait porter un morceau de nature ? »", "«ماذا لو استطعنا أن نرتدي قطعة من الطبيعة؟»")}</em>
            </blockquote>
            <p className="mt-6 eyebrow">— {t("Ahmed Tiziri", "أحمد تيزيري")}</p>
            <p className="mt-8 max-w-lg leading-8 text-muted-foreground">
              {t(
                "Là où certains voient un simple élément de la nature, Ahmed voit une possibilité. Il imagine, assemble et transforme des matières particulières pour leur donner une nouvelle vie.",
                "حيث يرى البعض مجرد عنصر من الطبيعة، يرى أحمد إمكانية. يتخيّل، ويجمع، ويحوّل موادّ مميزة ليمنحها حياة جديدة.",
              )}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button asChild variant="luxury">
                <Link to="/ahmed-tiziri">
                  {t("Son histoire", "حكايته")} <ArrowRight />
                </Link>
              </Button>
              <Link to="/contact" className="text-link">
                {t("Lui écrire", "راسله")} <ArrowRight />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
