import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { products, creations, elementLabels, separateValue } from "@/data.products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Reveal, Eyebrow } from "@/components/Editorial";
import { Motif } from "@/components/Motif";
import { formatPrice, useI18n } from "@/lib/i18n";
import ourika from "@/assets/ourika-landscape.jpg";

export const Route = createFileRoute("/creations/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name.fr ?? "Création"} — TIZIRI` },
      { name: "description", content: loaderData?.description.fr ?? "Création artisanale TIZIRI." },
      { property: "og:title", content: `${loaderData?.name.fr ?? "Création"} — TIZIRI` },
      { property: "og:description", content: loaderData?.story.fr ?? "Porter une histoire." },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `/creations/${loaderData?.slug ?? ""}` }],
  }),
  component: Page,
});

function Page() {
  const p = Route.useLoaderData();
  const [q, setQ] = useState(1);
  const [image, setImage] = useState(0);
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const { t, L, lang } = useI18n();
  const others = creations.filter((c) => c.id !== p.id).slice(0, 3);
  const value = separateValue(p);

  const care = [
    t("Retirez votre bracelet avant la douche, la baignade ou le sport.", "انزع سوارك قبل الاستحمام أو السباحة أو ممارسة الرياضة."),
    t(
      "Appliquez parfum et crème avant de le porter : la nacre et les pierres y sont sensibles.",
      "ضع العطر والكريم قبل ارتدائه: فالصدف والأحجار حساسة لهما.",
    ),
    t(
      "Rangez-le à plat, à l’abri de la lumière directe, séparé de vos autres bijoux.",
      "احفظه مسطّحًا، بعيدًا عن الضوء المباشر، ومنفصلًا عن مجوهراتك الأخرى.",
    ),
    t("Essuyez-le délicatement avec un chiffon doux et sec.", "امسحه برفق بقطعة قماش ناعمة وجافة."),
  ];

  const adopt = () => {
    add(p.id, q);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <>
      <section className="grid min-h-screen gap-10 px-6 pb-20 pt-32 lg:grid-cols-[1.1fr_.9fr] lg:gap-16 lg:px-14">
        <div className={`grid gap-3 ${p.images.length > 1 ? "sm:grid-cols-[5rem_1fr]" : ""}`}>
          {p.images.length > 1 && (
            <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
              {p.images.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setImage(i)}
                  aria-label={t(`Voir la photo ${i + 1}`, `عرض الصورة ${i + 1}`)}
                  className={`border ${i === image ? "border-foreground" : "border-transparent opacity-60"}`}
                >
                  <img src={src} alt="" className="aspect-square w-20 object-cover" />
                </button>
              ))}
            </div>
          )}
          <div className="order-1 bg-sand/40 sm:order-2">
            <img src={p.images[image]} alt={L(p.name)} className="aspect-square w-full object-cover lg:sticky lg:top-28" />
          </div>
        </div>
        <div className="flex items-center">
          <div className="max-w-xl">
            <Eyebrow className="text-clay">
              {p.kind === "coffret" ? t("Le coffret", "العلبة") : `${t("Création", "إبداع")} · ${L(elementLabels[p.element])}`}
            </Eyebrow>
            <h1 className="display-title mt-5 text-5xl lg:text-7xl">{L(p.name)}</h1>
            <p className="mt-5 font-serif text-3xl">
              {formatPrice(p.price, lang)}
              {value > p.price && (
                <span className="ms-4 font-sans text-sm text-muted-foreground">
                  {t("au lieu de", "بدلًا من")} <s>{formatPrice(value, lang)}</s> {t("séparément", "عند الشراء منفصلة")}
                </span>
              )}
            </p>
            <p className="mt-7 font-serif text-2xl italic leading-9">{L(p.description)}</p>

            <div className="mt-9 flex gap-4">
              <div className="grid grid-cols-3 border border-border">
                <button className="icon-button" onClick={() => setQ(Math.max(1, q - 1))} aria-label={t("Réduire la quantité", "إنقاص الكمية")}>
                  <Minus />
                </button>
                <span className="grid place-items-center text-sm" aria-live="polite">
                  {q}
                </span>
                <button className="icon-button" onClick={() => setQ(q + 1)} aria-label={t("Augmenter la quantité", "زيادة الكمية")}>
                  <Plus />
                </button>
              </div>
              <Button variant="luxury" className="flex-1" onClick={adopt}>
                {added ? <Check /> : <ShoppingBag />}
                {added ? t("Ajoutée à votre sélection", "أُضيفت إلى اختياراتك") : t("Adopter cette création", "اقتنِ هذا الإبداع")}
              </Button>
            </div>
            {added && (
              <Link to="/panier" className="text-link mt-5">
                {t("Voir votre sélection", "عرض اختياراتك")} <ArrowRight />
              </Link>
            )}
            <ul className="mt-6 grid gap-2 text-xs text-muted-foreground rtl:text-sm">
              <li>— {t("Façonné à la main à Ourika", "مصنوع يدويًا في أوريكا")}</li>
              <li>— {t("Matières naturelles : chaque pièce a ses propres nuances", "مواد طبيعية: لكل قطعة درجاتها الخاصة")}</li>
            </ul>

            <dl className="mt-10 divide-y divide-border border-y border-border">
              {[
                [t("L’histoire", "الحكاية"), L(p.story)],
                [t("Les matières", "المواد"), L(p.materials)],
                [t("L’inspiration", "الإلهام"), L(p.inspiration)],
                [
                  t("La création", "الصنع"),
                  t(
                    "Composé et assemblé à la main, perle après perle, dans l’atelier d’Ahmed à Ourika.",
                    "صُمّم وجُمّع يدويًا، حبةً بعد حبة، في ورشة أحمد بأوريكا.",
                  ),
                ],
                [
                  t("Des nuances uniques", "درجات فريدة"),
                  t(
                    "Une matière naturelle n’est jamais identique : les teintes et les veinures varient légèrement d’une pièce à l’autre. C’est la signature du vrai.",
                    "المادة الطبيعية لا تتكرر أبدًا: تختلف الألوان والعروق قليلًا من قطعة إلى أخرى. وهذه بصمة الأصالة.",
                  ),
                ],
              ].map(([a, b]) => (
                <div key={a} className="py-5">
                  <dt className="eyebrow">{a}</dt>
                  <dd className="mt-2 text-sm leading-7 text-muted-foreground">{b}</dd>
                </div>
              ))}
            </dl>
            <details className="group border-b border-border py-5">
              <summary className="eyebrow flex cursor-pointer list-none items-center justify-between">
                {t("Prendre soin de votre bracelet", "العناية بسوارك")}
                <Plus className="size-4 transition-transform group-open:rotate-45" />
              </summary>
              <ul className="mt-4 grid gap-2 text-sm leading-7 text-muted-foreground">
                {care.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </section>

      <section className="border-t border-border px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Eyebrow className="text-clay">{t("Le récit", "الحكاية")}</Eyebrow>
            <blockquote className="display-title mt-6 text-4xl italic md:text-6xl">{L(p.narrative.quote)}</blockquote>
            <Motif className="mt-8 text-clay" />
          </Reveal>
          <Reveal className="mx-auto mt-14 max-w-2xl">
            <p className="font-serif text-xl leading-9 md:text-2xl md:leading-10">{L(p.narrative.prologue)}</p>
            <div className="mt-12 border-s-2 border-clay ps-6">
              <Eyebrow>{t("Pourquoi ce nom", "لماذا هذا الاسم")}</Eyebrow>
              <p className="mt-3 leading-8 text-muted-foreground">{L(p.narrative.naming)}</p>
            </div>
          </Reveal>
          <div className="mt-20 grid gap-12 border-t border-border pt-16 md:grid-cols-2 md:gap-x-20 md:gap-y-16">
            {p.narrative.chapters.map((c, i) => (
              <Reveal key={c.title.fr}>
                <p className="section-number">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-serif text-3xl">{L(c.title)}</h3>
                <p className="mt-4 leading-8 text-muted-foreground">{L(c.text)}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-20 grid gap-12 border-t border-border pt-14 md:grid-cols-2 md:gap-20">
            <div>
              <Eyebrow>{t("À regarder de près", "تأمّل عن قرب")}</Eyebrow>
              <ul className="mt-6 grid gap-4">
                {p.narrative.details.map((d) => (
                  <li key={d.fr} className="flex gap-4 leading-7 text-muted-foreground">
                    <span className="text-clay">—</span>
                    {L(d)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>{p.kind === "coffret" ? t("Les porter", "ارتداؤها") : t("La porter", "ارتداؤها")}</Eyebrow>
              <p className="mt-6 font-serif text-2xl italic leading-9">{L(p.narrative.wear)}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative min-h-[75svh] text-hero-foreground">
        <img src={ourika} alt={t("Paysage naturel d’Ourika", "منظر طبيعي من أوريكا")} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/45" />
        <Reveal className="relative z-10 flex min-h-[75svh] flex-col items-center justify-center px-6 text-center">
          <Eyebrow>{t("Tiziri", "تيزيري")}</Eyebrow>
          <h2 className="display-title mt-5 text-6xl md:text-9xl">{t("Porter cette histoire", "ارتدِ هذه الحكاية")}</h2>
          <p className="mt-7 font-serif text-2xl italic">{t("Une matière. Une inspiration. Une création.", "مادة. إلهام. إبداع.")}</p>
        </Reveal>
      </section>

      {others.length > 0 && (
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <Reveal className="text-center">
              <Eyebrow className="text-clay">{t("Poursuivre l’histoire", "تابع الحكاية")}</Eyebrow>
              <h2 className="display-title mt-5 text-4xl md:text-6xl">{t("D’autres lumières de la vallée", "أنوار أخرى من الوادي")}</h2>
              <Motif className="mt-8 text-clay" />
            </Reveal>
            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {others.map((o) => (
                <Reveal key={o.id}>
                  <Link to="/creations/$slug" params={{ slug: o.slug }} className="group block">
                    <div className="overflow-hidden bg-sand/40">
                      <img
                        src={o.images[0]}
                        alt={L(o.name)}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="mt-5 eyebrow text-clay">{L(elementLabels[o.element])}</p>
                    <h3 className="mt-2 font-serif text-2xl">{L(o.name)}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{formatPrice(o.price, lang)}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
