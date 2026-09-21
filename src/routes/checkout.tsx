import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { z } from "zod";
import { useCart } from "@/context/CartContext";
import { CartLineVisual } from "@/components/CartLineVisual";
import { Button } from "@/components/ui/button";
import { Motif } from "@/components/Motif";
import { formatPrice, useI18n } from "@/lib/i18n";
import {
  defaultLivraison,
  deliveryWindow,
  findLivraison,
  livraisons,
  orderReference,
  priceOfLivraison,
  type LivraisonOption,
} from "@/lib/livraison";

const schema = z.object({
  nom: z.string().trim().min(2).max(100),
  prenom: z.string().trim().min(2).max(100),
  email: z.string().email().max(255),
  telephone: z.string().trim().min(8).max(20),
  adresse: z.string().trim().min(5).max(250),
  ville: z.string().trim().min(2).max(100),
  pays: z.string().trim().min(2).max(100),
});

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finaliser la commande — TIZIRI" },
      { name: "description", content: "Finalisez votre commande TIZIRI." },
      { property: "og:title", content: "Finaliser la commande — TIZIRI" },
      { property: "og:description", content: "Votre création est presque à vous." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: Page,
});

/** Commande confirmée, figée au moment de l'envoi : le panier est vidé juste après. */
type Order = { reference: string; livraison: LivraisonOption; total: number };

const optionClass = (active: boolean) =>
  `block w-full cursor-pointer border p-5 text-start transition-colors duration-300 ${active ? "border-foreground bg-card" : "border-border hover:border-foreground/40"}`;

function Page() {
  const c = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [mode, setMode] = useState(defaultLivraison);
  const { t, L, lang } = useI18n();
  const arrow = lang === "ar" ? "←" : "→";
  const shipping = priceOfLivraison(mode);

  // La confirmation remplace le formulaire : on revient en haut de la page.
  useEffect(() => {
    if (order) scrollTo({ top: 0, behavior: "auto" });
  }, [order]);

  const fields = [
    ["nom", t("Nom", "الاسم العائلي")],
    ["prenom", t("Prénom", "الاسم الشخصي")],
    ["email", t("Email", "البريد الإلكتروني")],
    ["telephone", t("Téléphone", "الهاتف")],
    ["adresse", t("Adresse", "العنوان")],
    ["ville", t("Ville", "المدينة")],
    ["pays", t("Pays", "البلد")],
  ];

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget));
    const livraison = findLivraison(mode);
    if (schema.safeParse(d).success && c.lines.length && livraison) {
      setOrder({ reference: orderReference(), livraison, total: c.total + livraison.price });
      c.clear();
    } else e.currentTarget.reportValidity();
  };

  if (order)
    return (
      <section className="grid min-h-[85svh] place-items-center px-6 py-28">
        <div className="w-full max-w-xl text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full border border-border">
            <Check className="size-7" strokeWidth={1.4} />
          </span>
          <p className="eyebrow mt-8 text-clay">{t("Commande confirmée", "تم تأكيد الطلب")}</p>
          <h1 className="display-title mt-5 text-5xl md:text-6xl">
            {t("Votre histoire", "حكايتك")}
            <br />
            {t("commence maintenant.", "تبدأ الآن.")}
          </h1>
          <p className="mt-7 font-serif text-2xl italic leading-9">
            {t(
              "Votre pièce sera préparée à la main, à Ourika. Nous vous contactons pour confirmer les détails de la livraison.",
              "ستُجهَّز قطعتك يدويًا في أوريكا. سنتواصل معك لتأكيد تفاصيل التوصيل.",
            )}
          </p>
          <dl className="mt-12 grid gap-px border-y border-border bg-border sm:grid-cols-3">
            {(
              [
                [t("Commande", "الطلب"), order.reference],
                [t("Livraison estimée", "التوصيل المتوقع"), deliveryWindow(order.livraison, lang)],
                [t("Total", "المجموع"), formatPrice(order.total, lang)],
              ] as [string, string][]
            ).map(([label, value]) => (
              <div key={label} className="bg-background px-5 py-6">
                <dt className="eyebrow text-muted-foreground">{label}</dt>
                <dd className="mt-2 font-serif text-2xl">{value}</dd>
              </div>
            ))}
          </dl>
          <Motif className="mt-12 text-clay" />
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Button asChild variant="luxury">
              <Link to="/histoire">{t("Vivre l’histoire", "عِش الحكاية")} {arrow}</Link>
            </Button>
            <Link to="/creations" className="text-link">
              {t("Découvrir la collection", "اكتشف المجموعة")} {arrow}
            </Link>
          </div>
        </div>
      </section>
    );

  return (
    <section className="px-6 pb-24 pt-36">
      <div className="mx-auto max-w-7xl">
        <h1 className="display-title text-5xl md:text-7xl">{t("Confirmer votre commande", "تأكيد طلبك")}</h1>
        <div className="mt-10 grid grid-cols-3 border-y border-border py-5 text-[.62rem] uppercase tracking-[.12em] rtl:text-sm">
          <span>01 {t("Informations", "المعلومات")}</span>
          <span>02 {t("Livraison", "التوصيل")}</span>
          <span>03 {t("Confirmation", "التأكيد")}</span>
        </div>
        <form onSubmit={submit} className="mt-14 grid gap-14 lg:grid-cols-[1fr_23rem]">
          <div className="grid gap-7 sm:grid-cols-2">
            {fields.map(([n, l]) => (
              <label key={n} className={`field-label ${n === "adresse" ? "sm:col-span-2" : ""}`}>
                {l}
                <input
                  name={n}
                  type={n === "email" ? "email" : n === "telephone" ? "tel" : "text"}
                  dir={n === "email" || n === "telephone" ? "ltr" : undefined}
                  className="text-start"
                  required
                />
              </label>
            ))}

            <fieldset className="border-t border-border pt-8 sm:col-span-2">
              <legend className="field-label">{t("Mode de livraison", "طريقة التوصيل")}</legend>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {livraisons.map((o) => (
                  <label key={o.id} className={optionClass(mode === o.id)}>
                    <input
                      type="radio"
                      name="livraison"
                      value={o.id}
                      checked={mode === o.id}
                      onChange={() => setMode(o.id)}
                      className="sr-only"
                    />
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="font-serif text-2xl">{L(o.name)}</span>
                      <span className="text-sm">{formatPrice(o.price, lang)}</span>
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">{L(o.delay)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <aside className="border-s border-border ps-7">
            <h2 className="eyebrow">{t("Votre création", "إبداعك")}</h2>
            {c.lines.map((l) => (
              <div key={l.id} className="mt-6 flex gap-4">
                <CartLineVisual line={l} className="h-20 w-20 shrink-0" />
                <div>
                  <p className="font-serif text-xl">{l.name}</p>
                  {l.details && <p className="text-xs leading-5 text-muted-foreground">{l.details}</p>}
                  <p className="text-xs">
                    {l.quantity} × {formatPrice(l.price, lang)}
                  </p>
                </div>
              </div>
            ))}
            <dl className="mt-8 grid gap-3 border-t border-border pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{t("Sous-total", "المجموع الفرعي")}</dt>
                <dd>{formatPrice(c.total, lang)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{t("Livraison", "التوصيل")}</dt>
                <dd>{formatPrice(shipping, lang)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-4 text-base">
                <dt>{t("Total", "المجموع")}</dt>
                <dd>
                  <strong className="font-serif text-2xl font-normal">{formatPrice(c.total + shipping, lang)}</strong>
                </dd>
              </div>
            </dl>
            <Button type="submit" variant="luxury" className="mt-8 w-full" disabled={!c.lines.length}>
              {t("Confirmer ma commande", "تأكيد طلبي")} {arrow}
            </Button>
          </aside>
        </form>
      </div>
    </section>
  );
}
