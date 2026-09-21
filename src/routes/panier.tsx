import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { CartLineVisual } from "@/components/CartLineVisual";
import { formatPrice, useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: "Votre sélection — TIZIRI" },
      { name: "description", content: "Votre sélection de créations TIZIRI." },
      { property: "og:title", content: "Votre sélection — TIZIRI" },
      { property: "og:description", content: "Votre histoire commence ici." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/panier" }],
  }),
  component: Page,
});

function Page() {
  const c = useCart();
  const { t, lang } = useI18n();
  return (
    <section className="min-h-[75svh] px-6 pb-24 pt-36">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">{t("Tiziri", "تيزيري")}</p>
        <h1 className="display-title mt-5 text-6xl md:text-8xl">{t("Votre sélection", "اختياراتك")}</h1>
        {c.lines.length === 0 ? (
          <div className="mt-20 border-y border-border py-16 text-center">
            <p className="font-serif text-3xl italic">{t("Votre sélection attend sa première histoire.", "اختياراتك تنتظر حكايتها الأولى.")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-8">
              <Link to="/creations" className="text-link">
                {t("Découvrir les créations", "اكتشف الإبداعات")} <ArrowRight />
              </Link>
              <Link to="/creations/sur-mesure" className="text-link">
                {t("Composer mon bracelet", "صمّم سوارك")} <ArrowRight />
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_20rem]">
            <div>
              {c.lines.map((line) => (
                <article key={line.id} className="grid grid-cols-[7rem_1fr_auto] gap-5 border-t border-border py-7">
                  <CartLineVisual line={line} className="aspect-square w-28" />
                  <div>
                    <h2 className="font-serif text-2xl">{line.name}</h2>
                    {line.details && <p className="mt-1 text-xs leading-5 text-muted-foreground">{line.details}</p>}
                    {line.custom?.note && <p className="mt-1 font-serif text-sm italic">« {line.custom.note} »</p>}
                    <p className="mt-2 text-sm">{formatPrice(line.price, lang)}</p>
                    <div className="mt-5 flex items-center gap-2">
                      <button className="icon-button border border-border" onClick={() => c.setQuantity(line.id, line.quantity - 1)} aria-label={t("Réduire", "إنقاص")}>
                        <Minus />
                      </button>
                      <span className="w-8 text-center">{line.quantity}</span>
                      <button className="icon-button border border-border" onClick={() => c.setQuantity(line.id, line.quantity + 1)} aria-label={t("Augmenter", "زيادة")}>
                        <Plus />
                      </button>
                    </div>
                  </div>
                  <button className="icon-button" onClick={() => c.remove(line.id)} aria-label={t(`Supprimer ${line.name}`, `حذف ${line.name}`)}>
                    <Trash2 />
                  </button>
                </article>
              ))}
            </div>
            <aside className="border-t border-border pt-7">
              <div className="flex justify-between">
                <span className="eyebrow">{t("Sous-total", "المجموع الفرعي")}</span>
                <strong className="font-serif text-3xl font-normal">{formatPrice(c.total, lang)}</strong>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {t("La livraison se choisit à l’étape suivante.", "تُختار طريقة التوصيل في الخطوة التالية.")}
              </p>
              <Button asChild variant="luxury" className="mt-8 w-full">
                <Link to="/checkout">
                  {t("Passer à la commande", "إتمام الطلب")} <ArrowRight />
                </Link>
              </Button>
              <p className="mt-6 text-center font-serif text-xl italic">{t("Votre histoire commence ici.", "حكايتك تبدأ هنا.")}</p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
