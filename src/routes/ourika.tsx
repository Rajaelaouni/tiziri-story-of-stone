import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import landscape from "@/assets/ourika-landscape.jpg";
import riviere from "@/assets/ourika-riviere-atlas.png";
import the from "@/assets/ourika-the-oued.png";
import { Reveal, Eyebrow } from "@/components/Editorial";
import { Motif } from "@/components/Motif";
import { brand } from "@/lib/brand";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/ourika")({
  head: () => ({
    meta: [
      { title: "Ourika, la vallée qui inspire — TIZIRI" },
      { name: "description", content: "Découvrez les paysages, matières et lumières d’Ourika qui inspirent TIZIRI." },
      { property: "og:title", content: "Ourika — TIZIRI" },
      { property: "og:description", content: "La vallée qui inspire chaque création." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/ourika" }],
  }),
  component: Page,
});

function Page() {
  const { t, L } = useI18n();
  const elements = [
    [t("La pierre", "الحجر"), t("La présence et la mémoire.", "الحضور والذاكرة.")],
    [t("L’eau", "الماء"), t("Le mouvement et la clarté.", "الحركة والصفاء.")],
    [t("La terre", "الأرض"), t("La chaleur et l’ancrage.", "الدفء والتجذّر.")],
    [t("La lumière", "النور"), t("Les nuances qui révèlent.", "الدرجات التي تكشف.")],
    [t("La végétation", "النبات"), t("La vie dans chaque détail.", "الحياة في كل تفصيل.")],
    [t("Les couleurs", "الألوان"), t("Le langage de la vallée.", "لغة الوادي.")],
  ];

  return (
    <>
      <section className="page-hero">
        <img src={landscape} alt={t("Montagnes et rivière de la vallée d’Ourika", "جبال ونهر وادي أوريكا")} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20">
          <Eyebrow>{t("La source", "المنبع")}</Eyebrow>
          <h1 className="display-title mt-5 text-7xl md:text-9xl">{t("Ourika", "أوريكا")}</h1>
          <p className="mt-3 font-serif text-3xl italic">{t("La vallée qui inspire.", "الوادي المُلهِم.")}</p>
        </div>
      </section>

      <section className="px-6 py-24 md:py-36">
        <Reveal className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-20">
          {/* Photo en 620 px : affichée à sa taille naturelle maximum pour rester nette. */}
          <figure className="mx-auto w-full max-w-[620px]">
            <img
              src={riviere}
              alt={t("L’oued Ourika entre les rochers, au pied des sommets enneigés de l’Atlas", "وادي أوريكا بين الصخور، عند سفح قمم الأطلس المكسوّة بالثلج")}
              loading="lazy"
              width="620"
              height="451"
              className="w-full object-cover"
            />
            <figcaption className="mt-3 text-xs text-muted-foreground">
              {t("L’oued Ourika, au pied des sommets de l’Atlas.", "وادي أوريكا، عند سفح قمم الأطلس.")}
            </figcaption>
          </figure>
          <div>
            <Eyebrow className="text-clay">{t("Une matière vivante", "مادة حيّة")}</Eyebrow>
            <h2 className="display-title mt-5 text-5xl md:text-7xl">{t("Ici, la nature devient matière.", "هنا، تصبح الطبيعة مادة.")}</h2>
            <p className="mt-8 max-w-lg leading-8 text-muted-foreground">
              {t(
                "Ourika n’est pas seulement un lieu. C’est une source d’inspiration infinie, une terre de contrastes et de couleurs où chaque élément raconte une histoire.",
                "أوريكا ليست مجرد مكان. إنها منبع إلهام لا ينضب، أرض التباينات والألوان، حيث يحكي كل عنصر حكاية.",
              )}
            </p>
            <p className="mt-5 max-w-lg leading-8 text-muted-foreground">
              {t(
                "L’eau vive qui descend des sommets, les pierres polies par le courant, les pentes rouges et vertes : c’est ici que naissent les couleurs de nos bracelets.",
                "المياه الجارية النازلة من القمم، والحجارة التي صقلها التيار، والمنحدرات الحمراء والخضراء: هنا تولد ألوان أساورنا.",
              )}
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-24 grid max-w-7xl grid-cols-2 border-s border-t border-border md:grid-cols-3">
          {elements.map(([a, b]) => (
            <Reveal key={a} className="min-h-48 border-b border-e border-border p-7">
              <span className="font-serif text-4xl italic">{a}</span>
              <p className="mt-5 text-sm text-muted-foreground">{b}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand/35 px-6 py-24 md:py-32">
        <Reveal className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.2fr_.8fr] md:gap-20">
          <div>
            <Eyebrow className="text-clay">{t("La vallée vivante", "الوادي الحيّ")}</Eyebrow>
            <h2 className="display-title mt-5 text-4xl md:text-6xl">{t("Au bord de l’oued", "على ضفة الوادي")}</h2>
            <p className="mt-7 max-w-xl font-serif text-2xl italic leading-9">
              {t(
                "Un thé à la menthe servi au plus près de l’eau, le bruit du courant, les tapis aux couleurs chaudes.",
                "شاي بالنعناع يُقدَّم قرب الماء، وصوت الجريان، وزرابي بألوان دافئة.",
              )}
            </p>
            <p className="mt-6 max-w-xl leading-8 text-muted-foreground">
              {t(
                "Ourika, c’est aussi une manière de vivre : prendre le temps, accueillir, partager. Ce même temps que prend chaque bracelet pour être assemblé.",
                "أوريكا أيضًا أسلوب حياة: أن نأخذ وقتنا، ونستقبل، ونتقاسم. وهو الوقت نفسه الذي يحتاجه كل سوار ليُجمَّع.",
              )}
            </p>
            <Motif className="mt-10 justify-start text-clay" />
          </div>
          {/* Photo très petite (192 px) : présentée comme un tirage souvenir, à sa taille réelle. */}
          <figure className="mx-auto w-fit -rotate-2 bg-background p-3 pb-4 shadow-[0_18px_40px_rgba(43,36,29,0.14)]">
            <img
              src={the}
              alt={t("Thé à la menthe servi au bord de la rivière d’Ourika", "شاي بالنعناع على ضفة نهر أوريكا")}
              loading="lazy"
              width="192"
              height="174"
              className="block h-auto w-48"
            />
            <figcaption className="mt-3 text-center font-serif text-lg italic">{t("Un thé au bord de l’oued", "شاي على ضفة الوادي")}</figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="bg-forest px-6 py-28 text-center text-hero-foreground">
        <p className="font-serif text-5xl italic">
          {L(brand.slogan[0])}
          <br />
          {L(brand.slogan[1])}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-8">
          <Link to="/creations" className="text-link">
            {t("Découvrir les créations", "اكتشف الإبداعات")} <ArrowRight />
          </Link>
          <Link to="/creations/sur-mesure" className="text-link">
            {t("Composer aux couleurs d’Ourika", "صمّم بألوان أوريكا")} <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
