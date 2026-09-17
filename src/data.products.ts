import braceletNacre from "@/assets/produit1Atlass.png";
import braceletBleu from "@/assets/produit2.png";
import braceletViolet from "@/assets/produit3.png";
import braceletPastel from "@/assets/produit4.png";
import trioOffer from "@/assets/promotion3bracleta399dh.png";
import type { Localized } from "@/lib/i18n";

/**
 * Catalogue TIZIRI (textes en français et en arabe).
 * Pour ajouter un bracelet : importer sa photo réelle, puis ajouter une entrée ci-dessous.
 * - kind "creation" : pièce présentée en récit éditorial.
 * - kind "coffret"  : ensemble de plusieurs pièces, présenté à part.
 * - element : l'élément d'Ourika dont la pièce est issue (sert au récit et au filtrage).
 */
export type Element = "pierre" | "eau" | "terre" | "lumiere";
export type Product = {
  id: string;
  kind: "creation" | "coffret";
  name: Localized;
  slug: string;
  element: Element;
  description: Localized;
  story: Localized;
  materials: Localized;
  inspiration: Localized;
  price: number;
  images: string[];
  featured: boolean;
  /** Coffret : ids des créations réunies (sert à afficher la valeur séparée). */
  includes?: string[];
};

export const elementLabels: Record<Element, Localized> = {
  pierre: { fr: "La pierre", ar: "الحجر" },
  eau: { fr: "L’eau", ar: "الماء" },
  terre: { fr: "La terre", ar: "الأرض" },
  lumiere: { fr: "La lumière", ar: "النور" },
};

export const products: Product[] = [
  {
    id: "crepuscule",
    kind: "creation",
    name: { fr: "Le Crépuscule d’Ourika", ar: "غروب أوريكا" },
    slug: "le-crepuscule-dourika",
    element: "lumiere",
    description: {
      fr: "Le violet du soir et la lumière rose des montagnes, réunis au poignet.",
      ar: "بنفسجيّ المساء ونور الجبال الورديّ، مجتمعان على المعصم.",
    },
    story: {
      fr: "À l’heure où les reliefs d’Ourika retiennent les dernières couleurs du jour, le violet et le rose se mêlent. Chaque perle garde, dans ses veinures, une trace de ce moment.",
      ar: "في الساعة التي تحتفظ فيها جبال أوريكا بآخر ألوان النهار، يمتزج البنفسجي بالوردي. وتحفظ كل حبة في عروقها أثرًا من تلك اللحظة.",
    },
    materials: {
      fr: "Perles minérales violettes veinées, cordon noir tressé réglable.",
      ar: "حبات معدنية بنفسجية معرّقة، وحبل أسود مضفور قابل للتعديل.",
    },
    inspiration: { fr: "Les crépuscules colorés de la vallée d’Ourika.", ar: "غروب الشمس الملوّن في وادي أوريكا." },
    price: 159,
    images: [braceletViolet],
    featured: true,
  },
  {
    id: "souffle",
    kind: "creation",
    name: { fr: "Le Souffle de l’Atlas", ar: "نَفَس الأطلس" },
    slug: "le-souffle-de-latlas",
    element: "pierre",
    description: { fr: "Une création organique, douce et lumineuse.", ar: "إبداع طبيعي، ناعم ومضيء." },
    story: {
      fr: "Ses fragments nacrés évoquent les pierres polies par l’eau et les chemins clairs qui traversent la vallée.",
      ar: "تستحضر شظاياه الصدفية الحجارةَ التي صقلها الماء، والدروبَ الفاتحة التي تعبر الوادي.",
    },
    materials: {
      fr: "Fragments de nacre naturelle et chaîne en métal argenté.",
      ar: "شظايا من الصدف الطبيعي وسلسلة من معدن فضي.",
    },
    inspiration: {
      fr: "La pierre claire, la lumière et le mouvement de l’eau.",
      ar: "الحجر الفاتح، والنور، وحركة الماء.",
    },
    price: 185,
    images: [braceletNacre],
    featured: true,
  },
  {
    id: "source",
    kind: "creation",
    name: { fr: "La Source Sacrée", ar: "النبع المقدّس" },
    slug: "la-source-sacree",
    element: "eau",
    description: {
      fr: "Un bleu profond inspiré par la clarté de l’eau d’Ourika.",
      ar: "أزرق عميق مستلهم من صفاء مياه أوريكا.",
    },
    story: {
      fr: "Une ligne de perles bleues comme autant de gouttes saisies dans la lumière. Une pièce calme, franche et essentielle.",
      ar: "صفّ من الحبات الزرقاء كأنها قطرات التُقطت في الضوء. قطعة هادئة، صريحة وجوهرية.",
    },
    materials: {
      fr: "Perles minérales bleues et cordon noir tressé réglable.",
      ar: "حبات معدنية زرقاء وحبل أسود مضفور قابل للتعديل.",
    },
    inspiration: { fr: "L’eau vive qui descend de l’Atlas.", ar: "المياه الجارية النازلة من الأطلس." },
    price: 165,
    images: [braceletBleu],
    featured: true,
  },
  {
    id: "atlas-lune",
    kind: "creation",
    name: { fr: "L’Atlas en Lune", ar: "الأطلس في ضوء القمر" },
    slug: "latlas-en-lune",
    element: "terre",
    description: {
      fr: "Une composition douce et lumineuse aux tons pastel et minéraux.",
      ar: "تركيبة ناعمة ومضيئة بألوان هادئة ومعدنية.",
    },
    story: {
      fr: "Rose pâle, vert d’eau, ambre clair : des pierres aux reflets délicats, rythmées par des perles facettées qui attrapent la lumière comme un clair de lune.",
      ar: "وردي شاحب، أخضر مائي، كهرماني فاتح: أحجار ذات انعكاسات رقيقة، تتخللها حبات مصقولة الأوجه تلتقط الضوء كما يفعل ضوء القمر.",
    },
    materials: {
      fr: "Perles minérales aux tons pastel, perles facettées transparentes, intercalaires dorés, fermoir.",
      ar: "حبات معدنية بألوان هادئة، حبات شفافة مصقولة الأوجه، فواصل ذهبية، ومشبك.",
    },
    inspiration: {
      fr: "La lumière douce des pierres et des ombres de la vallée.",
      ar: "نور الحجارة الناعم وظلال الوادي.",
    },
    price: 540,
    images: [braceletPastel],
    featured: false,
  },
  {
    id: "offre-3-bracelets",
    kind: "coffret",
    name: { fr: "Le Trio d’Ourika", ar: "ثلاثية أوريكا" },
    slug: "offre-3-bracelets",
    element: "lumiere",
    description: {
      fr: "Trois bracelets réunis pour composer une palette complète inspirée par la vallée.",
      ar: "ثلاثة أساور مجتمعة لتكوين لوحة ألوان كاملة مستلهمة من الوادي.",
    },
    story: {
      fr: "Le bleu de l’eau, le violet du soir et la clarté de la nacre : trois pièces pensées pour se porter ensemble ou séparément, au fil des tenues et des moments de la journée.",
      ar: "زرقة الماء، وبنفسجيّ المساء، وصفاء الصدف: ثلاث قطع صُمّمت لتُلبس معًا أو كلٌّ على حدة، حسب الإطلالة ولحظات اليوم.",
    },
    materials: {
      fr: "3 bracelets assortis, cordons tressés, fragments de nacre, détails en métal.",
      ar: "3 أساور متناسقة، حبال مضفورة، شظايا من الصدف، تفاصيل معدنية.",
    },
    inspiration: {
      fr: "Les jeux de lumière et les tons naturels de la vallée d’Ourika.",
      ar: "تلاعب الضوء والألوان الطبيعية في وادي أوريكا.",
    },
    price: 429,
    includes: ["source", "crepuscule", "souffle"],
    images: [trioOffer],
    featured: true,
  },
];

export const creations = products.filter((p) => p.kind === "creation");
export const coffrets = products.filter((p) => p.kind === "coffret");

/** Prix cumulé des créations d'un coffret, achetées séparément (0 si non renseigné). */
export const separateValue = (p: Product) =>
  (p.includes ?? []).reduce((sum, id) => sum + (products.find((x) => x.id === id)?.price ?? 0), 0);
