import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import portrait from "@/assets/ahmed-portrait.jpg";
import ahmedEtabli from "@/assets/ahmed-etabli.png";
import gesture from "@/assets/atelier-creation.png";
import { Reveal, Eyebrow } from "@/components/Editorial";
import { Motif } from "@/components/Motif";
import { Button } from "@/components/ui/button";
import { brand } from "@/lib/brand";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/ahmed-tiziri")({
  head: () => ({
    meta: [
      { title: "Ahmed Tiziri — Le créateur" },
      { name: "description", content: "Rencontrez Ahmed Tiziri, artisan créateur inspiré par la nature d’Ourika." },
      { property: "og:title", content: "Ahmed Tiziri — Le créateur" },
      { property: "og:description", content: "Donner une histoire à la matière." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/ahmed-tiziri" }],
  }),
  component: Page,
});

function Page() {
  const { t, L } = useI18n();
  return (
    <>
      <section className="page-hero">
        <img
          src={portrait}
          alt={t("Ahmed Tiziri dans son atelier", "أحمد تيزيري في ورشته")}
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-transparent rtl:bg-gradient-to-l" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-20">
          <h1 className="display-title text-6xl md:text-9xl">{t("Ahmed Tiziri", "أحمد تيزيري")}</h1>
          <p className="font-serif text-3xl italic">{t("Donner une histoire à la matière.", "أن تمنح المادة حكاية.")}</p>
        </div>
      </section>

      <section className="px-6 py-24 md:py-36">
        <Reveal className="mx-auto grid max-w-6xl items-start gap-14 md:grid-cols-[.8fr_1.2fr]">
          <div className="md:sticky md:top-28">
            <Eyebrow>{t("Le créateur", "المبدع")}</Eyebrow>
            <figure className="mt-8 overflow-hidden">
              <img
                src={ahmedEtabli}
                alt={t(
                  "Ahmed Tiziri penché sur son établi, sous la lampe, travaillant une pièce avec précision",
                  "أحمد تيزيري منحنٍ على طاولة عمله تحت المصباح، يشتغل على قطعة بدقة",
                )}
                loading="lazy"
                width="1920"
                height="1281"
                className="aspect-[4/5] w-full object-cover object-[62%_center]"
              />
            </figure>
          </div>
          <div className="space-y-7 font-serif text-2xl leading-9">
            <p>
              {t(
                "On raconte qu’à Ourika, la nature ne se contente pas d’être regardée. Elle laisse des traces.",
                "يُحكى أن الطبيعة في أوريكا لا تكتفي بأن يُنظر إليها. إنها تترك أثرًا.",
              )}
            </p>
            <p>
              {t(
                "Ahmed Tiziri a toujours vu dans la nature plus qu’un paysage. Une couleur. Une texture. Une pierre. Une lumière. Une matière.",
                "لطالما رأى أحمد تيزيري في الطبيعة أكثر من مجرد منظر. لونًا. ملمسًا. حجرًا. نورًا. مادة.",
              )}
            </p>
            <p>
              {t(
                "Là où certains voient un simple élément de la nature, Ahmed voit une possibilité. Il imagine, assemble et transforme des matières particulières pour leur donner une nouvelle vie.",
                "حيث يرى البعض مجرد عنصر من الطبيعة، يرى أحمد إمكانية. يتخيّل، ويجمع، ويحوّل موادّ مميزة ليمنحها حياة جديدة.",
              )}
            </p>
            <p>
              <em>{t("Et si l’on pouvait porter un morceau de nature ?", "ماذا لو استطعنا أن نرتدي قطعة من الطبيعة؟")}</em>
            </p>
            <p>{t("C’est ainsi que TIZIRI est née.", "هكذا وُلدت تيزيري.")}</p>
          </div>
        </Reveal>
      </section>

      <section className="px-6 pb-24 md:pb-36">
        <div className="mx-auto max-w-7xl">
          <Reveal className="overflow-hidden">
            <img
              src={gesture}
              alt={t("Les mains d’Ahmed assemblant un bracelet, perle après perle, sur l’établi", "يدا أحمد تجمعان سوارًا، حبةً بعد حبة، على طاولة العمل")}
              loading="lazy"
              width="1408"
              height="768"
              className="aspect-[4/3] w-full object-cover object-[65%_center] md:aspect-[16/8]"
            />
          </Reveal>
          <Reveal className="mt-12 grid gap-8 md:grid-cols-[.8fr_1.2fr] md:gap-14">
            <div>
              <Eyebrow className="text-clay">{t("Ses mains, son geste", "يداه، لمسته")}</Eyebrow>
              <h2 className="display-title mt-5 text-4xl md:text-6xl">{t("Perle après perle", "حبةً بعد حبة")}</h2>
            </div>
            <div className="space-y-5 leading-8 text-muted-foreground">
              <p>
                {t(
                  "Chaque bracelet passe entre ses mains du début à la fin. Il choisit les perles, les compare, les dispose, puis les assemble une à une sur le cordon.",
                  "يمرّ كل سوار بين يديه من البداية إلى النهاية. يختار الحبات، ويقارنها، ويرتّبها، ثم يجمعها واحدةً تلو الأخرى على الحبل.",
                )}
              </p>
              <p>
                {t(
                  "Un détail argenté, un nœud, une breloque : rien n’est posé au hasard. C’est dans ce temps long que la matière devient une création.",
                  "تفصيل فضي، عقدة، دلّاية: لا شيء يوضع صدفة. وفي هذا الوقت الطويل تتحوّل المادة إلى إبداع.",
                )}
              </p>
              <Link to="/atelier" className="text-link text-foreground">
                {t("Entrer dans l’atelier", "ادخل إلى الورشة")} <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink px-6 py-28 text-center text-hero-foreground md:py-36">
        <Reveal className="mx-auto max-w-4xl">
          <Motif className="text-sand" />
          <blockquote className="mt-12 font-serif text-4xl italic leading-tight md:text-6xl">
            {L(brand.signature[0])}
            <br />
            {L(brand.signature[1])}
          </blockquote>
        </Reveal>
      </section>

      <section className="px-6 py-28 text-center">
        <h2 className="display-title text-[2.6rem] sm:text-6xl md:text-9xl">
          {t("Observer.", "نلاحظ.")}
          <br />
          {t("Imaginer.", "نتخيّل.")}
          <br />
          {t("Transformer.", "نحوّل.")}
        </h2>
        <div className="mt-14 flex flex-wrap justify-center gap-6">
          <Button asChild variant="luxury">
            <Link to="/creations">
              {t("Découvrir ses créations", "اكتشف إبداعاته")} <ArrowRight />
            </Link>
          </Button>
          <Link to="/contact" className="text-link">
            {t("Lui écrire", "راسله")} <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
