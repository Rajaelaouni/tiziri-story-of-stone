import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/Editorial";
import { BraceletPreview } from "@/components/BraceletPreview";
import { formatPrice, useI18n } from "@/lib/i18n";
import {
  defaultConfig,
  describe,
  extras,
  fermetures,
  findColor,
  findPerle,
  maxColors,
  perles,
  priceOf,
  tailles,
  type BraceletConfig,
} from "@/lib/sur-mesure";

export const Route = createFileRoute("/creations/sur-mesure")({
  head: () => ({
    meta: [
      { title: "Bracelet sur mesure — Composez le vôtre | TIZIRI" },
      {
        name: "description",
        content: "Choisissez la matière, les couleurs, la fermeture et la breloque : composez votre bracelet TIZIRI, façonné à la main à Ourika.",
      },
      { property: "og:title", content: "Bracelet sur mesure — TIZIRI" },
      { property: "og:description", content: "Votre matière. Vos couleurs. Votre histoire." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/creations/sur-mesure" }],
  }),
  component: Page,
});

function Step({ n, title, hint, children }: { n: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-border py-10">
      <legend className="contents">
        <span className="section-number">{n}</span>
        <span className="mt-2 block font-serif text-3xl">{title}</span>
      </legend>
      {hint && <p className="mt-2 text-sm text-muted-foreground">{hint}</p>}
      <div className="mt-6">{children}</div>
    </fieldset>
  );
}

const optionClass = (active: boolean) =>
  `w-full border p-5 text-start transition-colors duration-300 ${active ? "border-foreground bg-card" : "border-border hover:border-foreground/40"}`;

function Page() {
  const [config, setConfig] = useState<BraceletConfig>(defaultConfig);
  const [added, setAdded] = useState(false);
  const { addCustom } = useCart();
  const { t, L, lang } = useI18n();
  const perle = findPerle(config.perle);
  const price = priceOf(config);

  const update = (patch: Partial<BraceletConfig>) => {
    setAdded(false);
    setConfig((c) => ({ ...c, ...patch }));
  };

  const choosePerle = (id: string) => {
    const next = findPerle(id);
    if (!next) return;
    const kept = config.colors.filter((c) => next.colors.includes(c));
    update({ perle: id, colors: kept.length ? kept : next.colors.slice(0, 1) });
  };

  const toggleColor = (id: string) => {
    const has = config.colors.includes(id);
    if (has) {
      if (config.colors.length > 1) update({ colors: config.colors.filter((c) => c !== id) });
      return;
    }
    if (config.colors.length < maxColors) update({ colors: [...config.colors, id] });
  };

  const adopt = () => {
    addCustom({ ...config, note: config.note.trim() });
    setAdded(true);
  };

  const cta = (
    <Button variant="luxury" className="w-full" onClick={adopt}>
      {added ? <Check /> : <ShoppingBag />}
      {added ? t("Ajouté à votre sélection", "أُضيف إلى اختياراتك") : `${t("Adopter ma création", "اقتنِ إبداعي")} · ${formatPrice(price, lang)}`}
    </Button>
  );

  return (
    <>
      <section className="px-6 pb-10 pt-36 md:px-14">
        <div className="mx-auto max-w-7xl">
          <Eyebrow className="text-clay">{t("L’atelier sur mesure", "ورشة الطلب الخاص")}</Eyebrow>
          <h1 className="display-title mt-5 text-5xl md:text-8xl">
            {t("Composez", "صمّم")}
            <br />
            {t("votre bracelet", "سوارك")}
          </h1>
          <p className="mt-6 max-w-xl font-serif text-2xl italic leading-9">
            {t(
              "Votre matière. Vos couleurs. Votre histoire. Ahmed l’assemble ensuite à la main, perle après perle, à Ourika.",
              "مادتك. ألوانك. حكايتك. ثم يجمعه أحمد بيديه، حبةً بعد حبة، في أوريكا.",
            )}
          </p>
        </div>
      </section>

      <section className="px-6 pb-32 md:px-14 lg:pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* Aperçu */}
          <div className="self-start lg:sticky lg:top-28">
            <div className="bg-sand/40 p-6 md:p-10">
              <BraceletPreview config={config} className="mx-auto w-full max-w-md" />
            </div>
            <div className="mt-6">
              <p className="eyebrow">{t("Votre création", "إبداعك")}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground" aria-live="polite">
                {describe(config, lang)}
              </p>
              <p className="mt-4 font-serif text-4xl">{formatPrice(price, lang)}</p>
              <div className="mt-6 hidden lg:block">{cta}</div>
              {added && (
                <Link to="/panier" className="text-link mt-5">
                  {t("Voir votre sélection", "عرض اختياراتك")} <ArrowRight />
                </Link>
              )}
              <p className="mt-5 text-xs leading-5 text-muted-foreground">
                {t(
                  "Aperçu indicatif. Les matières naturelles ont leurs propres nuances : votre bracelet sera unique.",
                  "معاينة تقريبية. للمواد الطبيعية درجاتها الخاصة: سيكون سوارك فريدًا.",
                )}
              </p>
            </div>
          </div>

          {/* Choix */}
          <div>
            <Step n="01" title={t("La matière", "المادة")} hint={t("Le caractère de votre bracelet.", "طابع سوارك.")}>
              <div className="grid gap-3">
                {perles.map((p) => (
                  <button key={p.id} type="button" aria-pressed={config.perle === p.id} onClick={() => choosePerle(p.id)} className={optionClass(config.perle === p.id)}>
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="font-serif text-2xl">{L(p.name)}</span>
                      <span className="text-xs text-muted-foreground">
                        {t("dès", "ابتداءً من")} {formatPrice(p.price, lang)}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{L(p.description)}</span>
                  </button>
                ))}
              </div>
            </Step>

            <Step
              n="02"
              title={t("Les couleurs", "الألوان")}
              hint={t(
                `Jusqu’à ${maxColors} couleurs, posées en alternance dans l’ordre de votre choix. Chaque couleur ajoutée : +${extras.couleurSupp} DH.`,
                `حتى ${maxColors} ألوان، تتناوب بالترتيب الذي تختاره. كل لون إضافي: +${extras.couleurSupp} درهم.`,
              )}
            >
              <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-y border-border py-4">
                <div className="flex items-center gap-3">
                  <span className="eyebrow">{t("Votre palette", "لوحة ألوانك")}</span>
                  <span className="flex -space-x-1.5">
                    {config.colors.map((id) => {
                      const c = findColor(id);
                      return c ? (
                        <span
                          key={id}
                          title={L(c.name)}
                          className="size-6 rounded-full border-2 border-background"
                          style={{ background: `radial-gradient(circle at 35% 30%, ${c.light}, ${c.hex} 65%)` }}
                        />
                      ) : null;
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-5 text-xs text-muted-foreground">
                  <span aria-live="polite">
                    {config.colors.length}/{maxColors} {t("couleurs", "ألوان")}
                  </span>
                  {config.colors.length > 1 && (
                    <button type="button" onClick={() => update({ colors: config.colors.slice(0, 1) })} className="underline underline-offset-4 hover:text-foreground">
                      {t("Garder une seule couleur", "الاحتفاظ بلون واحد")}
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-5">
                {perle?.colors.map((id) => {
                  const color = findColor(id);
                  if (!color) return null;
                  const order = config.colors.indexOf(id);
                  const active = order >= 0;
                  const full = !active && config.colors.length >= maxColors;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={active}
                      disabled={full}
                      title={
                        full
                          ? t(`Maximum ${maxColors} couleurs : retirez-en une pour choisir celle-ci`, `الحد الأقصى ${maxColors} ألوان: أزل لونًا لاختيار هذا`)
                          : undefined
                      }
                      onClick={() => toggleColor(id)}
                      className="group w-20 text-center disabled:cursor-not-allowed disabled:opacity-55"
                    >
                      <span
                        className={`relative mx-auto grid size-14 place-items-center rounded-full ring-offset-4 ring-offset-background transition ${active ? "ring-1 ring-foreground" : "group-hover:ring-1 group-hover:ring-border"}`}
                        style={{ background: `radial-gradient(circle at 35% 30%, ${color.light}, ${color.hex} 65%)` }}
                      >
                        {active && config.colors.length > 1 && (
                          <span className="grid size-5 place-items-center rounded-full bg-background text-[.6rem] font-semibold">{order + 1}</span>
                        )}
                      </span>
                      <span className={`mt-3 block text-[.65rem] leading-4 rtl:text-xs ${active ? "font-semibold" : "text-muted-foreground"}`}>{L(color.name)}</span>
                    </button>
                  );
                })}
              </div>
            </Step>

            <Step n="03" title={t("La fermeture", "الإغلاق")}>
              <div className="grid gap-3 sm:grid-cols-3">
                {fermetures.map((f) => (
                  <button key={f.id} type="button" aria-pressed={config.fermeture === f.id} onClick={() => update({ fermeture: f.id })} className={optionClass(config.fermeture === f.id)}>
                    <span className="mb-3 block h-1.5 w-10" style={{ background: f.tone }} />
                    <span className="block text-sm font-medium">{L(f.name)}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {L(f.description)}
                      {f.price ? ` · +${formatPrice(f.price, lang)}` : ""}
                    </span>
                  </button>
                ))}
              </div>
            </Step>

            <Step
              n="04"
              title={t("La breloque", "الدلّاية")}
              hint={t("Le triangle argenté, signature des créations Tiziri.", "المثلث الفضي، بصمة إبداعات تيزيري.")}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {(
                  [
                    [true, t("Avec breloque signature", "مع الدلّاية المميزة"), `+${formatPrice(extras.breloque, lang)}`],
                    [false, t("Sans breloque", "بدون دلّاية"), t("Une ligne épurée", "خط بسيط وأنيق")],
                  ] as const
                ).map(([value, label, sub]) => (
                  <button key={String(value)} type="button" aria-pressed={config.breloque === value} onClick={() => update({ breloque: value })} className={optionClass(config.breloque === value)}>
                    <span className="block text-sm font-medium">{label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{sub}</span>
                  </button>
                ))}
              </div>
            </Step>

            <Step
              n="05"
              title={t("La taille", "المقاس")}
              hint={t(
                "Mesurez votre tour de poignet avec un mètre ruban. Les cordons restent réglables.",
                "قِس محيط معصمك بشريط قياس. تبقى الحبال قابلة للتعديل.",
              )}
            >
              <div className="grid grid-cols-3 gap-3">
                {tailles.map((s) => (
                  <button key={s.id} type="button" aria-pressed={config.taille === s.id} onClick={() => update({ taille: s.id })} className={`${optionClass(config.taille === s.id)} text-center`}>
                    <span className="block font-serif text-3xl">{s.name}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{L(s.description)}</span>
                  </button>
                ))}
              </div>
            </Step>

            <Step
              n="06"
              title={t("Votre intention", "نيّتك")}
              hint={t(
                "Facultatif. Un prénom, une occasion, un souvenir : quelques mots qui accompagneront votre commande.",
                "اختياري. اسم، مناسبة، ذكرى: كلمات قليلة سترافق طلبك.",
              )}
            >
              <label className="sr-only" htmlFor="note">
                {t("Votre intention", "نيّتك")}
              </label>
              <textarea
                id="note"
                rows={3}
                maxLength={160}
                value={config.note}
                onChange={(e) => update({ note: e.target.value })}
                placeholder={t("Pour ma sœur, en souvenir de notre été à Ourika…", "لأختي، ذكرى صيفنا في أوريكا…")}
                className="font-serif text-xl italic"
              />
              <p className="mt-2 text-end text-xs text-muted-foreground">{config.note.length}/160</p>
            </Step>
          </div>
        </div>
      </section>

      {/* Barre d'achat mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-4 backdrop-blur-md lg:hidden">
        {added ? (
          <Button asChild variant="luxury" className="w-full">
            <Link to="/panier">
              <Check /> {t("Ajouté · Voir votre sélection", "أُضيف · عرض اختياراتك")}
            </Link>
          </Button>
        ) : (
          cta
        )}
      </div>
    </>
  );
}
