import { createFileRoute } from "@tanstack/react-router";
import { ProductStories, CoffretFeature, SurMesureFeature, Reveal, Eyebrow } from "@/components/Editorial";
import { Motif } from "@/components/Motif";
import trio from "@/assets/bracelets-trio.webp.asset.json";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/creations/")({
  head: () => ({
    meta: [
      { title: "Les Créations — Bracelets artisanaux TIZIRI" },
      {
        name: "description",
        content: "Bracelets en pierres naturelles et nacre, façonnés à la main à Ourika. Chaque création raconte un élément de la vallée.",
      },
      { property: "og:title", content: "Les Créations — TIZIRI" },
      { property: "og:description", content: "Chaque matière raconte quelque chose." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/creations" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <>
      <section className="grid min-h-[72svh] items-end gap-10 px-6 pb-16 pt-36 md:grid-cols-[.8fr_1.2fr] md:px-14">
        <Reveal>
          <Eyebrow className="text-clay">{t("Collection", "المجموعة")}</Eyebrow>
          <h1 className="display-title mt-6 text-6xl md:text-9xl">
            {t("Les", "الإبداعات")}
            <br />
            {t("Créations", "")}
          </h1>
          <p className="mt-8 max-w-md leading-8">
            {t(
              "Des matières choisies dans l’esprit de la nature. Des créations imaginées à Ourika, chacune née d’un élément de la vallée : la pierre, l’eau, la terre ou la lumière.",
              "موادّ مختارة بروح الطبيعة. إبداعات تخيّلناها في أوريكا، وُلد كلٌّ منها من عنصر من عناصر الوادي: الحجر، أو الماء، أو الأرض، أو النور.",
            )}
          </p>
        </Reveal>
        <img src={trio.url} alt={t("Créations artisanales Tiziri", "إبداعات تيزيري الحرفية")} className="aspect-[4/3] w-full object-cover" />
      </section>
      <section className="border-t border-border px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center">
            <h2 className="font-serif text-4xl italic md:text-6xl">{t("Chaque matière raconte quelque chose.", "كل مادة تحكي شيئًا.")}</h2>
            <Motif className="mt-10 text-clay" />
          </Reveal>
          <ProductStories />
        </div>
      </section>
      <CoffretFeature />
      <SurMesureFeature />
    </>
  );
}
