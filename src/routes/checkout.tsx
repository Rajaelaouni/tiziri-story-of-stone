import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { useCart } from "@/context/CartContext";
import { CartLineVisual } from "@/components/CartLineVisual";
import { Button } from "@/components/ui/button";
import { formatPrice, useI18n } from "@/lib/i18n";

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

function Page() {
  const c = useCart();
  const [done, setDone] = useState(false);
  const { t, lang } = useI18n();
  const arrow = lang === "ar" ? "←" : "→";

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
    if (schema.safeParse(d).success && c.lines.length) {
      setDone(true);
      c.clear();
    } else e.currentTarget.reportValidity();
  };

  if (done)
    return (
      <section className="grid min-h-[75svh] place-items-center px-6 pt-24 text-center">
        <div>
          <p className="eyebrow">{t("Commande confirmée", "تم تأكيد الطلب")}</p>
          <h1 className="display-title mt-5 text-6xl">{t("Merci.", "شكرًا.")}</h1>
          <p className="mt-7 font-serif text-2xl italic">{t("Votre histoire commence ici.", "حكايتك تبدأ هنا.")}</p>
          <Link to="/" className="text-link mt-9">
            {t("Retour à l’accueil", "العودة إلى الرئيسية")} {arrow}
          </Link>
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
          <span>03 {t("Paiement", "الدفع")}</span>
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
            <div className="mt-8 flex justify-between border-t border-border pt-6">
              <span>{t("Total", "المجموع")}</span>
              <strong>{formatPrice(c.total, lang)}</strong>
            </div>
            <Button type="submit" variant="luxury" className="mt-8 w-full" disabled={!c.lines.length}>
              {t("Confirmer ma commande", "تأكيد طلبي")} {arrow}
            </Button>
          </aside>
        </form>
      </div>
    </section>
  );
}
