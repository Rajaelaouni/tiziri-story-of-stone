import type { Lang, Localized } from "@/lib/i18n";

/**
 * Bracelet sur mesure — options, couleurs et prix (textes FR / AR).
 * Tout se modifie ici : ajouter une couleur, une matière ou changer un prix
 * met automatiquement à jour le configurateur, l'aperçu, le panier et le checkout.
 * ⚠ Prix et matières à valider par Ahmed avant mise en ligne.
 */

export type ColorOption = { id: string; name: Localized; hex: string; light: string };
export type PerleOption = {
  id: string;
  name: Localized;
  description: Localized;
  shape: "ronde" | "tonneau" | "fragment";
  price: number;
  colors: string[];
};

export const colors: ColorOption[] = [
  // L'eau
  { id: "bleu-source", name: { fr: "Bleu Source", ar: "أزرق النبع" }, hex: "#4f78b8", light: "#a9c2e8" },
  { id: "turquoise-oued", name: { fr: "Turquoise Oued", ar: "فيروزي الوادي" }, hex: "#3a9ea5", light: "#9fdde0" },
  { id: "vert-eau", name: { fr: "Vert d’eau", ar: "أخضر مائي" }, hex: "#7fa89c", light: "#c7e0d7" },
  // La lumière
  { id: "violet-crepuscule", name: { fr: "Violet Crépuscule", ar: "بنفسجي الغروب" }, hex: "#a13a9a", light: "#dd8ed6" },
  { id: "lavande-lune", name: { fr: "Lavande de Lune", ar: "خزامى القمر" }, hex: "#9a8cc4", light: "#d6cdef" },
  { id: "rose-atlas", name: { fr: "Rose Atlas", ar: "وردي الأطلس" }, hex: "#d98aa5", light: "#f6cddb" },
  { id: "corail-kasbah", name: { fr: "Corail Kasbah", ar: "مرجاني القصبة" }, hex: "#e0735f", light: "#f7bfb2" },
  { id: "cristal-neige", name: { fr: "Cristal de neige", ar: "بلّور الثلج" }, hex: "#d7e2e6", light: "#ffffff" },
  // La terre
  { id: "rouge-argile", name: { fr: "Rouge Argile", ar: "أحمر الطين" }, hex: "#a8452f", light: "#e39a82" },
  { id: "ocre-safran", name: { fr: "Ocre Safran", ar: "مُغرة الزعفران" }, hex: "#d19a2a", light: "#f3d589" },
  { id: "ambre-terre", name: { fr: "Ambre Terre", ar: "كهرمان الأرض" }, hex: "#c48a52", light: "#ecc9a0" },
  // La pierre
  { id: "vert-cedre", name: { fr: "Vert Cèdre", ar: "أخضر الأرز" }, hex: "#4f7a4a", light: "#a8c99f" },
  { id: "gris-pierre", name: { fr: "Gris Pierre", ar: "رمادي الحجر" }, hex: "#8b8680", light: "#cfcac3" },
  { id: "nuit-atlas", name: { fr: "Nuit de l’Atlas", ar: "ليل الأطلس" }, hex: "#2e2b2f", light: "#77727a" },
  // La nacre
  { id: "nacre-claire", name: { fr: "Nacre claire", ar: "صدف فاتح" }, hex: "#e9e1d2", light: "#fffaf0" },
  { id: "nacre-rosee", name: { fr: "Nacre rosée", ar: "صدف وردي" }, hex: "#e6c9c0", light: "#fbeee9" },
  { id: "nacre-sable", name: { fr: "Nacre sable", ar: "صدف رملي" }, hex: "#c9b08e", light: "#efe1cb" },
];

/** Nombre maximum de couleurs combinées sur un bracelet (posées en alternance). */
export const maxColors = 4;

export const perles: PerleOption[] = [
  {
    id: "ronde",
    name: { fr: "Pierres rondes", ar: "أحجار مستديرة" },
    description: {
      fr: "Perles minérales polies, veinées. Une présence franche et lumineuse.",
      ar: "حبات معدنية مصقولة ومعرّقة. حضور صريح ومضيء.",
    },
    shape: "ronde",
    price: 179,
    colors: [
      "bleu-source",
      "turquoise-oued",
      "vert-eau",
      "violet-crepuscule",
      "lavande-lune",
      "rose-atlas",
      "corail-kasbah",
      "rouge-argile",
      "ocre-safran",
      "vert-cedre",
      "gris-pierre",
      "nuit-atlas",
    ],
  },
  {
    id: "tonneau",
    name: { fr: "Pierres tonneau", ar: "أحجار أسطوانية" },
    description: {
      fr: "Perles douces aux tons pastel, rythmées d’intercalaires dorés.",
      ar: "حبات ناعمة بألوان هادئة، تتخللها فواصل ذهبية.",
    },
    shape: "tonneau",
    price: 189,
    colors: ["bleu-source", "turquoise-oued", "vert-eau", "lavande-lune", "rose-atlas", "corail-kasbah", "cristal-neige", "ocre-safran", "ambre-terre"],
  },
  {
    id: "fragment",
    name: { fr: "Fragments de nacre", ar: "شظايا الصدف" },
    description: {
      fr: "Éclats organiques, jamais identiques, comme des pierres polies par l’eau.",
      ar: "شظايا طبيعية لا تتشابه أبدًا، كحجارة صقلها الماء.",
    },
    shape: "fragment",
    price: 179,
    colors: ["nacre-claire", "nacre-rosee", "nacre-sable", "gris-pierre"],
  },
];

export const fermetures = [
  {
    id: "cordon-noir",
    name: { fr: "Cordon tressé noir", ar: "حبل مضفور أسود" },
    description: { fr: "Nœud coulissant réglable", ar: "عقدة منزلقة قابلة للتعديل" },
    price: 0,
    tone: "#1f1b1a",
  },
  {
    id: "cordon-naturel",
    name: { fr: "Cordon tressé naturel", ar: "حبل مضفور طبيعي" },
    description: { fr: "Nœud coulissant réglable", ar: "عقدة منزلقة قابلة للتعديل" },
    price: 0,
    tone: "#b79b77",
  },
  {
    id: "chaine",
    name: { fr: "Chaîne argentée", ar: "سلسلة فضية" },
    description: { fr: "Fermoir mousqueton et chaînette", ar: "مشبك وسلسلة صغيرة" },
    price: 15,
    tone: "#b9b6b0",
  },
] as const;

export const tailles = [
  { id: "S", name: "S", description: { fr: "Poignet 14–16 cm", ar: "المعصم 14–16 سم" }, beads: -2 },
  { id: "M", name: "M", description: { fr: "Poignet 16–18 cm", ar: "المعصم 16–18 سم" }, beads: 0 },
  { id: "L", name: "L", description: { fr: "Poignet 18–20 cm", ar: "المعصم 18–20 سم" }, beads: 2 },
] as const;

// couleurSupp : prix de chaque couleur ajoutée au-delà de la première.
export const extras = { couleurSupp: 10, breloque: 15 };

export type FermetureId = (typeof fermetures)[number]["id"];
export type TailleId = (typeof tailles)[number]["id"];
export type BraceletConfig = {
  perle: string;
  colors: string[]; // de 1 à maxColors couleurs, posées en alternance dans l'ordre choisi
  fermeture: FermetureId;
  breloque: boolean;
  taille: TailleId;
  note: string;
};

export const defaultConfig: BraceletConfig = {
  perle: "ronde",
  colors: ["bleu-source", "violet-crepuscule"],
  fermeture: "cordon-noir",
  breloque: true,
  taille: "M",
  note: "",
};

export const findColor = (id: string) => colors.find((c) => c.id === id);
export const findPerle = (id: string) => perles.find((p) => p.id === id);
export const findFermeture = (id: string) => fermetures.find((f) => f.id === id);
export const findTaille = (id: string) => tailles.find((t) => t.id === id);

/** Vérifie qu'une configuration (ex. relue depuis le panier) est toujours valide. */
export function isValidConfig(c: unknown): c is BraceletConfig {
  if (!c || typeof c !== "object") return false;
  const x = c as BraceletConfig;
  const perle = findPerle(x.perle);
  return (
    !!perle &&
    Array.isArray(x.colors) &&
    x.colors.length >= 1 &&
    x.colors.length <= maxColors &&
    x.colors.every((id) => perle.colors.includes(id)) &&
    !!findFermeture(x.fermeture) &&
    !!findTaille(x.taille) &&
    typeof x.breloque === "boolean"
  );
}

export function priceOf(c: BraceletConfig) {
  const perle = findPerle(c.perle)?.price ?? 0;
  const fermeture = findFermeture(c.fermeture)?.price ?? 0;
  return perle + fermeture + (c.colors.length - 1) * extras.couleurSupp + (c.breloque ? extras.breloque : 0);
}

export function describe(c: BraceletConfig, lang: Lang = "fr") {
  return [
    findPerle(c.perle)?.name[lang],
    c.colors.map((id) => findColor(id)?.name[lang]).join(lang === "ar" ? "، " : ", "),
    findFermeture(c.fermeture)?.name[lang],
    c.breloque ? (lang === "ar" ? "الدلّاية المميزة" : "Breloque signature") : null,
    `${lang === "ar" ? "المقاس" : "Taille"} ${c.taille}`,
  ]
    .filter(Boolean)
    .join(" · ");
}
