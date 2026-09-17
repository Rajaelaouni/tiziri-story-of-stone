import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { creations, coffrets, elementLabels, separateValue, type Product } from "@/data.products";
import { Button } from "@/components/ui/button";
import { BraceletPreview } from "@/components/BraceletPreview";
import { defaultConfig, type BraceletConfig } from "@/lib/sur-mesure";
import { formatPrice, useI18n } from "@/lib/i18n";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function ProductStory({ product, index = 0 }: { product: Product; index?: number }) {
  const { t, L, lang } = useI18n();
  const name = L(product.name);
  return (
    <Reveal
      className={`group grid items-center gap-10 py-14 md:grid-cols-2 md:gap-20 ${index % 2 ? "md:[&>a:first-child]:order-2" : ""}`}
    >
      <Link
        to="/creations/$slug"
        params={{ slug: product.slug }}
        className="relative block overflow-hidden bg-sand/40"
        aria-label={t(`Découvrir ${name}`, `اكتشف ${name}`)}
      >
        <motion.img
          src={product.images[0]}
          alt={name}
          width="900"
          height="900"
          loading="lazy"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease }}
          className="aspect-[4/5] w-full object-cover transition-transform duration-[1600ms] group-hover:scale-[1.03]"
        />
        <span className="absolute start-5 top-5 bg-background/85 px-3 py-1.5 text-[.58rem] font-semibold uppercase tracking-[.18em] backdrop-blur-sm rtl:text-xs">
          {L(elementLabels[product.element])}
        </span>
      </Link>
      <div className="max-w-lg">
        <p className="section-number">
          {t("Création", "إبداع")} {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="display-title mt-4 text-4xl md:text-6xl">{name}</h3>
        <p className="mt-6 font-serif text-xl italic leading-8">{L(product.description)}</p>
        <p className="mt-4 leading-8 text-muted-foreground">{L(product.story)}</p>
        <dl className="mt-8 grid gap-5 border-y border-border py-6 text-sm">
          <div className="grid grid-cols-[7rem_1fr] gap-4">
            <dt className="eyebrow pt-0.5">{t("Matières", "المواد")}</dt>
            <dd className="text-muted-foreground">{L(product.materials)}</dd>
          </div>
          <div className="grid grid-cols-[7rem_1fr] gap-4">
            <dt className="eyebrow pt-0.5">{t("Inspiration", "الإلهام")}</dt>
            <dd className="text-muted-foreground">{L(product.inspiration)}</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
          <span className="font-serif text-3xl">{formatPrice(product.price, lang)}</span>
          <Button asChild variant="luxury">
            <Link to="/creations/$slug" params={{ slug: product.slug }}>
              {t("Porter cette histoire", "ارتدِ هذه الحكاية")} <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </Reveal>
  );
}

export function ProductStories() {
  return (
    <>
      {creations.map((p, i) => (
        <ProductStory key={p.id} product={p} index={i} />
      ))}
    </>
  );
}

const sampleConfigs: BraceletConfig[] = [
  { ...defaultConfig },
  { perle: "tonneau", colors: ["rose-atlas", "vert-eau", "ocre-safran", "cristal-neige"], fermeture: "chaine", breloque: true, taille: "M", note: "" },
  { perle: "fragment", colors: ["nacre-claire", "nacre-rosee", "nacre-sable"], fermeture: "cordon-naturel", breloque: false, taille: "M", note: "" },
];

/** Invitation vers le configurateur sur mesure. */
export function SurMesureFeature() {
  const { t } = useI18n();
  const steps = [
    t("Matière", "المادة"),
    t("Couleurs", "الألوان"),
    t("Fermeture", "الإغلاق"),
    t("Breloque", "الدلّاية"),
    t("Taille", "المقاس"),
  ];
  return (
    <section className="bg-forest px-6 py-24 text-hero-foreground md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-[1.1fr_.9fr] md:gap-20">
        <Reveal className="grid grid-cols-3 gap-3 md:gap-5">
          {sampleConfigs.map((c, i) => (
            <div key={c.perle} className={`bg-background/95 p-2 md:p-4 ${i === 1 ? "md:-translate-y-8" : ""}`}>
              <BraceletPreview config={c} className="w-full" />
            </div>
          ))}
        </Reveal>
        <Reveal>
          <Eyebrow className="text-sand">{t("Sur mesure", "حسب الطلب")}</Eyebrow>
          <h2 className="display-title mt-5 text-5xl md:text-7xl">{t("Composez votre histoire", "اصنع حكايتك")}</h2>
          <p className="mt-6 max-w-md font-serif text-2xl italic leading-9">
            {t(
              "Choisissez la matière, vos couleurs, la fermeture et la breloque. Ahmed l’assemble ensuite à la main, pour vous.",
              "اختر المادة، وألوانك، وطريقة الإغلاق، والدلّاية. ثم يجمعه أحمد بيديه، من أجلك.",
            )}
          </p>
          <ol className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[.62rem] font-semibold uppercase tracking-[.16em] opacity-80 rtl:text-sm">
            {steps.map((s, i) => (
              <li key={s}>
                <span className="text-sand">{String(i + 1).padStart(2, "0")}</span> {s}
              </li>
            ))}
          </ol>
          <Button asChild variant="ivory" size="lg" className="mt-10">
            <Link to="/creations/sur-mesure">
              {t("Composer mon bracelet", "صمّم سوارك")} <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

/** Coffret présenté comme une composition, pas comme une promotion. */
export function CoffretFeature() {
  const { t, L, lang } = useI18n();
  const coffret = coffrets[0];
  if (!coffret) return null;
  const value = separateValue(coffret);
  return (
    <section className="bg-sand/35 px-6 py-24 md:py-32">
      <Reveal className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.1fr_.9fr] md:gap-20">
        <img
          src={coffret.images[0]}
          alt={L(coffret.name)}
          width="900"
          height="900"
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
        <div>
          <Eyebrow className="text-clay">{t("Le coffret", "العلبة")}</Eyebrow>
          <h2 className="display-title mt-5 text-5xl md:text-7xl">{L(coffret.name)}</h2>
          <p className="mt-6 font-serif text-2xl italic leading-9">{L(coffret.description)}</p>
          <p className="mt-5 leading-8 text-muted-foreground">{L(coffret.story)}</p>
          <p className="mt-6 text-sm text-muted-foreground">{L(coffret.materials)}</p>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <span className="font-serif text-3xl">{formatPrice(coffret.price, lang)}</span>
            {value > coffret.price && (
              <span className="text-sm text-muted-foreground">
                {t("au lieu de", "بدلًا من")} <s>{formatPrice(value, lang)}</s> {t("séparément", "عند الشراء منفصلة")}
              </span>
            )}
            <Button asChild variant="luxury">
              <Link to="/creations/$slug" params={{ slug: coffret.slug }}>
                {t("Découvrir le coffret", "اكتشف العلبة")} <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
