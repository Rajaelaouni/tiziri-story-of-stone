/**
 * Plateforme de marque TIZIRI — source unique pour les textes fondateurs (FR / AR).
 * Voir BRAND.md pour la stratégie complète.
 */
export const brand = {
  name: "TIZIRI",
  byline: { fr: "Créations d’Ahmed Tiziri", ar: "إبداعات أحمد تيزيري" },
  place: { fr: "Ourika — Maroc", ar: "أوريكا — المغرب" },
  signature: [
    { fr: "La nature a créé la matière.", ar: "الطبيعة صنعت المادة." },
    { fr: "Ahmed Tiziri lui a donné une histoire.", ar: "وأحمد تيزيري منحها حكاية." },
  ],
  slogan: [
    { fr: "Porter la nature.", ar: "ارتدِ الطبيعة." },
    { fr: "Porter une histoire.", ar: "ارتدِ حكاية." },
  ],
  // Sens du mot en tamazight, à faire valider par Ahmed avant publication.
  meaning: { fr: "Tiziri, en tamazight, désigne le clair de lune.", ar: "تيزيري، بالأمازيغية، تعني ضوء القمر." },
  values: [
    {
      title: { fr: "La matière", ar: "المادة" },
      text: {
        fr: "Chaque perle, chaque fragment est choisi à la main pour sa couleur, sa texture, sa lumière.",
        ar: "كل حبة وكل شظية تُختار يدويًا للونها وملمسها ونورها.",
      },
    },
    {
      title: { fr: "Le geste", ar: "اللمسة" },
      text: {
        fr: "Pas de chaîne de production : chaque bracelet est assemblé un à un, à Ourika.",
        ar: "لا إنتاج بالجملة: كل سوار يُجمَّع قطعةً قطعة، في أوريكا.",
      },
    },
    {
      title: { fr: "Les nuances", ar: "الدرجات" },
      text: {
        fr: "Une matière naturelle n’est jamais identique. Votre bracelet porte ses propres nuances.",
        ar: "المادة الطبيعية لا تتكرر أبدًا. سوارك يحمل درجاته الخاصة.",
      },
    },
  ],
  // Renseigner les URLs réelles : les icônes n’apparaissent que si un lien existe.
  social: {
    instagram: "",
    facebook: "",
  },
} as const;

export const navLinks = [
  ["/", { fr: "Accueil", ar: "الرئيسية" }],
  ["/creations", { fr: "Les créations", ar: "الإبداعات" }],
  ["/ourika", { fr: "Ourika", ar: "أوريكا" }],
  ["/atelier", { fr: "L’atelier", ar: "الورشة" }],
  ["/ahmed-tiziri", { fr: "Ahmed Tiziri", ar: "أحمد تيزيري" }],
  ["/contact", { fr: "Contact", ar: "اتصل بنا" }],
] as const;
