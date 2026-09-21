import type { Lang, Localized } from "@/lib/i18n";

/**
 * Modes de livraison proposés au moment de la commande (textes FR / AR).
 * Tout se modifie ici : ajouter un mode ou changer un tarif met à jour
 * le récapitulatif du checkout et la date estimée de la confirmation.
 * ⚠ Tarifs et délais à valider par Ahmed avant mise en ligne.
 */
export type LivraisonOption = {
  id: string;
  name: Localized;
  delay: Localized;
  price: number;
  /** Fourchette de jours utilisée pour la fenêtre de livraison estimée. */
  days: [number, number];
};

export const livraisons: LivraisonOption[] = [
  {
    id: "standard",
    name: { fr: "Standard", ar: "عادي" },
    delay: { fr: "5 à 8 jours", ar: "من 5 إلى 8 أيام" },
    price: 40,
    days: [5, 8],
  },
  {
    id: "express",
    name: { fr: "Express", ar: "سريع" },
    delay: { fr: "2 à 3 jours", ar: "من يومين إلى 3 أيام" },
    price: 90,
    days: [2, 3],
  },
];

export const defaultLivraison = "standard";
export const findLivraison = (id: string) => livraisons.find((l) => l.id === id);
export const priceOfLivraison = (id: string) => findLivraison(id)?.price ?? 0;

/** Fenêtre de livraison estimée, comptée à partir d'aujourd'hui. */
export function deliveryWindow(option: LivraisonOption, lang: Lang = "fr", from = new Date()) {
  const at = (days: number) => {
    const d = new Date(from);
    d.setDate(d.getDate() + days);
    return d;
  };
  // Chiffres latins en arabe aussi, comme les prix (voir formatPrice).
  const format = new Intl.DateTimeFormat(lang === "ar" ? "ar-MA-u-nu-latn" : "fr-FR", { day: "numeric", month: "long" });
  const [min, max] = option.days;
  return `${format.format(at(min))} – ${format.format(at(max))}`;
}

/**
 * Référence affichée au client après la commande.
 * ⚠ Provisoire : à remplacer par la référence du système de commande réel.
 */
export const orderReference = (at = new Date()) =>
  `TZ-${at.getFullYear()}${String(at.getMonth() + 1).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
