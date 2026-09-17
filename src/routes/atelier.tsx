import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import atelier from "@/assets/atelier-creation.png";
import croquis from "@/assets/atelier-croquis.png";
import { Reveal, Eyebrow } from "@/components/Editorial";
import { Motif } from "@/components/Motif";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/atelier")({
  head: () => ({
    meta: [
      { title: "L’Atelier — TIZIRI" },
      { name: "description", content: "Du regard au geste, découvrez le processus de création artisanal de TIZIRI." },
      { property: "og:title", content: "L’Atelier — TIZIRI" },
      { property: "og:description", content: "Là où la matière devient création." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/atelier" }],
  }),
  component: Page,
});

function Page() {
  const { t, lang } = useI18n();
  const process = [
    t("Nature", "الطبيعة"),
    t("Inspiration", "الإلهام"),
    t("Matière", "المادة"),
    t("Imagination", "الخيال"),
    t("Assemblage", "التجميع"),
    t("Création", "الإبداع"),
    t("Tiziri", "تيزيري"),
  ];
  const steps = [
    [t("Observer", "الملاحظة"), t("Tout commence par un regard.", "كل شيء يبدأ بنظرة.")],
    [t("Choisir", "الاختيار"), t("Une matière particulière attire l’attention.", "مادة مميزة تلفت الانتباه.")],
    [t("Imaginer", "التخيّل"), t("Une couleur devient une idée.", "لون يصبح فكرة.")],
    [t("Assembler", "التجميع"), t("Les matières trouvent leur équilibre.", "تجد المواد توازنها.")],
    [t("Créer", "الإبداع"), t("La pièce prend forme entre les mains d’Ahmed.", "تتشكّل القطعة بين يدي أحمد.")],
  ];

  return (
    <>
      <section className="page-hero">
        <img
          src={atelier}
          alt={t(
            "Mains assemblant un bracelet sur cordon tressé, perles et breloques sur l’établi de l’atelier Tiziri",
            "يدان تجمعان سوارًا على حبل مضفور، مع حبات ودلّايات على طاولة ورشة تيزيري",
          )}
          className="absolute inset-0 h-full w-full object-cover object-[65%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/35 to-ink/10" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20">
          <h1 className="display-title text-7xl md:text-9xl">{t("L’Atelier", "الورشة")}</h1>
          <p className="font-serif text-3xl italic">{t("Là où la matière devient création.", "حيث تصبح المادة إبداعًا.")}</p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-between gap-5 border-y border-border py-9">
            {process.map((s, i) => (
              <span key={s} className="eyebrow">
                {s}
                {i < process.length - 1 ? (lang === "ar" ? " ←" : " →") : ""}
              </span>
            ))}
          </div>

          <Reveal className="mt-24 grid items-center gap-12 md:grid-cols-[1.3fr_.7fr] md:gap-16">
            <figure className="overflow-hidden">
              <img
                src={croquis}
                alt={t(
                  "Artisan penché sur l’établi, sous une lampe, travaillant une pièce à côté de son croquis",
                  "حرفي منحنٍ على طاولة العمل تحت مصباح، يشتغل على قطعة بجانب رسمه",
                )}
                loading="lazy"
                width="1280"
                height="720"
                className="aspect-video w-full object-cover"
              />
            </figure>
            <div>
              <Eyebrow className="text-clay">{t("Du croquis au geste", "من الرسم إلى اللمسة")}</Eyebrow>
              <h2 className="display-title mt-5 text-4xl md:text-6xl">{t("Dessiner avant d’assembler", "نرسم قبل أن نجمع")}</h2>
              <p className="mt-6 font-serif text-2xl italic leading-9">
                {t("Une branche, quelques feuilles, des touches de bleu.", "غصن، بضع أوراق، ولمسات من الأزرق.")}
              </p>
              <p className="mt-5 leading-8 text-muted-foreground">
                {t(
                  "Avant de toucher la matière, l’idée se pose sur le papier. Puis, sous la lampe de l’établi, la main reprend le dessin avec précision, détail après détail.",
                  "قبل لمس المادة، تُرسم الفكرة على الورق. ثم، تحت مصباح طاولة العمل، تعيد اليد رسمها بدقة، تفصيلًا بعد تفصيل.",
                )}
              </p>
            </div>
          </Reveal>

          <div className="mt-24">
            {steps.map(([a, b], i) => (
              <Reveal key={a} className="grid gap-5 border-t border-border py-12 md:grid-cols-[8rem_1fr_1fr]">
                <span className="font-serif text-3xl">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="display-title text-5xl">{a}</h2>
                <p className="self-center text-muted-foreground">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand/35 px-6 py-28 text-center">
        <Reveal className="mx-auto max-w-3xl">
          <Motif className="text-clay" />
          <p className="mt-10 font-serif text-4xl italic leading-tight md:text-5xl">
            {t(
              "Ici, rien n’est produit en série. Chaque bracelet prend le temps qu’il lui faut.",
              "هنا، لا شيء يُنتَج بالجملة. كل سوار يأخذ الوقت الذي يحتاجه.",
            )}
          </p>
          <Button asChild variant="luxury" className="mt-12">
            <Link to="/creations">
              {t("Découvrir les créations", "اكتشف الإبداعات")} <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
