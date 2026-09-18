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

/** Récit détaillé affiché sur la page d'une pièce. S'en tenir à ce que montre la photo. */
export type Narrative = {
  quote: Localized;
  /** Ouverture du récit : une scène dans la vallée, au présent. */
  prologue: Localized;
  /** Pourquoi ce nom. */
  naming: Localized;
  /** Paysage, matière, geste, puis le temps (la pièce portée au fil des mois). */
  chapters: { title: Localized; text: Localized }[];
  /** Ce qu'on remarque en regardant la pièce de près. */
  details: Localized[];
  wear: Localized;
};

const paysage: Localized = { fr: "Le paysage", ar: "المكان" };
const matiere: Localized = { fr: "La matière", ar: "المادة" };
const geste: Localized = { fr: "Le geste", ar: "الصنعة" };
const temps: Localized = { fr: "Le temps", ar: "الزمن" };

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
  narrative: Narrative;
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
    narrative: {
      quote: {
        fr: "Le jour ne s’éteint pas d’un coup. Il se retire dans la couleur.",
        ar: "النهار لا ينطفئ دفعة واحدة، بل ينسحب إلى اللون.",
      },
      prologue: {
        fr: "Fin d’après-midi dans la vallée. Le bruit de l’oued semble monter, comme chaque fois que la lumière baisse. Sur la route, on se retourne vers les sommets : ils sont encore éclairés, alors que tout le reste est déjà dans l’ombre. Le rose dure quelques minutes, puis vire au violet. Personne ne parle. Ce bracelet est né de ce silence-là : l’envie de garder sur soi une couleur qui, dans la montagne, ne tient jamais plus de quelques instants.",
        ar: "آخر العصر في الوادي. يبدو خرير الوادي وكأنه يعلو، كما يحدث كلّما خفت الضوء. وعلى الطريق، نلتفت نحو القمم: ما زالت مضاءة، بينما غرق كل ما عداها في الظل. يدوم الوردي بضع دقائق، ثم يميل إلى البنفسجي. لا أحد يتكلّم. من هذا الصمت وُلد هذا السوار: الرغبة في أن نحمل معنا لونًا لا يدوم في الجبل أكثر من لحظات.",
      },
      naming: {
        fr: "Le crépuscule, c’est l’entre-deux : plus tout à fait le jour, pas encore la nuit. Le nom dit exactement ce que montrent les perles, un violet ni clair ni sombre, mais les deux à la fois selon l’endroit où l’on regarde.",
        ar: "الغروب هو ما بين الحالين: لم يعد نهارًا تمامًا، ولم يصر ليلًا بعد. والاسم يقول بالضبط ما تُظهره الحبات: بنفسجي ليس فاتحًا ولا داكنًا، بل هو الاثنان معًا بحسب الموضع الذي تنظر إليه.",
      },
      chapters: [
        {
          title: paysage,
          text: {
            fr: "Dans la vallée, le soir arrive par les sommets. L’ombre gagne d’abord le lit de l’oued, puis les villages de terre, tandis que les crêtes de l’Atlas restent éclairées quelques minutes encore. Pendant ce court moment, la montagne passe du rose au violet. C’est l’heure où les couleurs ne sont plus posées sur les choses, mais sur l’air lui-même.",
            ar: "في الوادي، يأتي المساء من القمم. يغمر الظلّ مجرى الوادي أولًا، ثم القرى الترابية، بينما تبقى قمم الأطلس مضاءة لدقائق أخرى. وخلال تلك اللحظة القصيرة، يتحوّل الجبل من الوردي إلى البنفسجي. إنها الساعة التي لا تعود فيها الألوان مستقرّة على الأشياء، بل على الهواء نفسه.",
          },
        },
        {
          title: matiere,
          text: {
            fr: "Des perles rondes d’un violet franc, parcourues de fines veinures plus sombres, comme un réseau de chemins vu de haut. Aucune n’a exactement le même dessin : certaines sont presque claires, d’autres tachetées de nuit. Regardées de près, les veinures dessinent des cartes minuscules, des lignes qui se croisent, s’interrompent, reprennent. C’est ce désordre-là qui donne à chaque perle son visage.",
            ar: "حبات مستديرة ببنفسجي صريح، تسري فيها عروق دقيقة أدكن، كشبكة دروب تُرى من الأعلى. لا تتشابه حبتان في رسمهما: بعضها يكاد يكون فاتحًا، وبعضها مرقّط بلون الليل. وإذا نظرت إليها عن قرب، ترسم العروق خرائط دقيقة: خطوط تتقاطع، وتنقطع، ثم تعود. وهذا الاضطراب بعينه هو ما يمنح كل حبة ملامحها.",
          },
        },
        {
          title: geste,
          text: {
            fr: "Les perles sont enfilées une à une sur un cordon noir tressé, puis le bracelet est fermé par un nœud coulissant. Deux perles terminent les extrémités du cordon : il suffit de les tirer pour l’ajuster, sans fermoir. Le noir n’est pas un choix neutre : il fait ressortir le violet comme la nuit fait ressortir les dernières lueurs sur les crêtes.",
            ar: "تُنظم الحبات واحدة تلو الأخرى في حبل أسود مضفور، ثم يُغلق السوار بعقدة منزلقة. وتُنهي حبتان طرفي الحبل: يكفي شدّهما لضبط المقاس، دون مشبك. واختيار الأسود ليس محايدًا: فهو يُبرز البنفسجي كما يُبرز الليلُ آخرَ الأضواء على القمم.",
          },
        },
        {
          title: temps,
          text: {
            fr: "Avec les mois, le cordon tressé s’assouplit et prend la forme de votre poignet. Le nœud se règle et se règle encore, selon la saison et la chaleur. C’est le cordon qui garde la trace du temps passé ensemble ; les perles, elles, restent ce qu’elles sont : un soir d’Ourika arrêté.",
            ar: "مع مرور الأشهر، يلين الحبل المضفور ويتّخذ شكل معصمك. وتُضبط العقدة مرةً بعد مرة، بحسب الفصل والحرارة. الحبل هو الذي يحفظ أثر الزمن الذي تقضيانه معًا؛ أما الحبات فتبقى كما هي: مساءٌ من أوريكا توقّف.",
          },
        },
      ],
      details: [
        { fr: "Les veinures : tournez le poignet, elles changent avec la lumière.", ar: "العروق: أدِر معصمك، فتتغيّر مع الضوء." },
        { fr: "Le cordon noir, comme l’ombre des crêtes au soir.", ar: "الحبل الأسود، كظلّ القمم عند المساء." },
        { fr: "Les deux perles d’extrémité, de la même matière que le bracelet.", ar: "حبتا الطرفين، من المادة نفسها التي صُنع منها السوار." },
      ],
      wear: {
        fr: "Une couleur affirmée qui se suffit à elle-même. Portez-la seule sur un vêtement neutre, ou avec La Source Sacrée pour réunir le soir et l’eau.",
        ar: "لون واثق يكفي وحده. ارتديه منفردًا مع ملابس محايدة، أو مع «النبع المقدّس» لتجمع بين المساء والماء.",
      },
    },
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
    narrative: {
      quote: { fr: "Ce que l’eau a poli, la main l’a rassemblé.", ar: "ما صقله الماء، جمعته اليد." },
      prologue: {
        fr: "Tôt le matin, au bord de l’oued. L’eau est encore froide de la nuit, et la rive est couverte de galets clairs, tous différents, tous arrondis. On en ramasse un sans y penser. Il est lisse, tiède déjà d’un côté, frais de l’autre. On le garde un moment dans la main avant de le reposer. Le Souffle de l’Atlas prolonge ce geste : garder contre la peau quelque chose que l’eau a mis des années à adoucir.",
        ar: "في الصباح الباكر، على ضفة الوادي. الماء ما زال باردًا من برد الليل، والضفة مغطاة بحصى فاتحة، كلّها مختلفة، وكلّها مستديرة. نلتقط واحدة دون تفكير. إنها ملساء، دافئة من جهة، وباردة من الأخرى. نحتفظ بها في اليد لحظة قبل أن نعيدها. «نَفَس الأطلس» يُطيل هذه الحركة: أن تحمل على بشرتك شيئًا قضى الماء سنوات في تليينه.",
      },
      naming: {
        fr: "Le souffle, c’est ce qui passe sans se voir : l’air qui descend des sommets au petit matin, l’eau qui use la pierre sans bruit. Un nom pour une pièce légère, presque sans poids, qui porte pourtant en elle le temps long de la montagne.",
        ar: "النَّفَس هو ما يمرّ دون أن يُرى: الهواء النازل من القمم عند الفجر، والماء الذي يبري الحجر بلا صوت. اسمٌ لقطعة خفيفة، تكاد تكون بلا وزن، لكنها تحمل في داخلها زمن الجبل الطويل.",
      },
      chapters: [
        {
          title: paysage,
          text: {
            fr: "Au bord de l’oued Ourika, les galets clairs forment des rives entières. L’eau les a roulés si longtemps qu’ils n’ont plus d’arêtes. Le matin, quand le soleil passe au-dessus des montagnes, ils prennent un éclat presque blanc. Ici, la pierre ne se brise pas : elle s’use. Une différence qui se sent sous les doigts.",
            ar: "على ضفاف وادي أوريكا، تكوّن الحصى الفاتحة ضفافًا بأكملها. دحرجها الماء زمنًا طويلًا حتى فقدت حوافها. وفي الصباح، حين تعلو الشمس فوق الجبال، تكتسي لمعانًا يكاد يكون أبيض. هنا، لا ينكسر الحجر، بل يبلى. فرقٌ تحسّه الأصابع.",
          },
        },
        {
          title: matiere,
          text: {
            fr: "Des fragments de nacre naturelle, irréguliers, du blanc laiteux au beige doré. Chacun garde sa forme propre : aucun n’a été taillé pour ressembler à son voisin. Un seul éclat sombre ponctue la ligne, comme une pierre mouillée parmi les autres. La nacre se forme couche après couche, avec une lenteur qui répond à celle de l’eau sur les galets.",
            ar: "شظايا من الصدف الطبيعي، غير منتظمة، من الأبيض الحليبي إلى البيج الذهبي. لكلٍّ منها شكله الخاص: لم تُقطع أيّ منها لتشبه جارتها. وشظية داكنة واحدة تتخلّل الصف، كحجر مبلّل بين الحجارة. ويتكوّن الصدف طبقةً فوق طبقة، ببطءٍ يشبه بطء الماء على الحصى.",
          },
        },
        {
          title: geste,
          text: {
            fr: "Assembler des formes irrégulières demande de l’attention : chaque fragment est placé en fonction du précédent, pour que la ligne reste souple et régulière. Le bracelet se ferme par une chaîne en métal argenté, ornée d’une breloque gravée de motifs d’inspiration amazighe. Elle est là comme une signature, un rappel discret de la géométrie amazighe au plus près de la main.",
            ar: "جمع أشكال غير منتظمة يتطلّب انتباهًا: توضع كل شظية بحسب سابقتها، ليبقى الصف ليّنًا ومتناسقًا. ويُغلق السوار بسلسلة من معدن فضي، تزيّنها دلّاية منقوشة بزخارف مستلهمة من الفن الأمازيغي. وهي حاضرة كتوقيع: تذكير خفيّ بالهندسة الأمازيغية، على مقربة من اليد.",
          },
        },
        {
          title: temps,
          text: {
            fr: "La nacre vit avec vous. Tenue à l’écart des parfums et de l’eau, elle garde son éclat ; portée souvent, elle prend au contact de la peau une douceur particulière. Avec les années, la chaîne peut se voiler légèrement : un chiffon doux et sec suffit à lui rendre sa clarté.",
            ar: "الصدف يعيش معك. إذا أُبعد عن العطور والماء حافظ على لمعانه؛ وإذا لُبس كثيرًا اكتسب من ملامسة البشرة نعومةً خاصة. ومع السنوات، قد يخفت بريق السلسلة قليلًا: تكفي قطعة قماش ناعمة وجافة لتعيد إليها صفاءها.",
          },
        },
      ],
      details: [
        { fr: "Les reflets de la nacre, du blanc au doré selon l’angle.", ar: "انعكاسات الصدف، من الأبيض إلى الذهبي بحسب الزاوية." },
        { fr: "L’unique fragment sombre, repère discret dans la ligne claire.", ar: "الشظية الداكنة الوحيدة، علامة خفيّة في الصف الفاتح." },
        { fr: "La breloque gravée, suspendue à la chaîne.", ar: "الدلّاية المنقوشة، المعلّقة بالسلسلة." },
      ],
      wear: {
        fr: "Sa teinte claire accompagne tout, du lin d’été aux tons sombres de l’hiver. La chaîne permet d’ajuster la longueur au poignet.",
        ar: "لونه الفاتح يرافق كل شيء، من كتّان الصيف إلى الألوان الداكنة في الشتاء. وتتيح السلسلة ضبط الطول على المعصم.",
      },
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
    narrative: {
      quote: { fr: "Une eau claire ne se montre pas : elle laisse voir.", ar: "الماء الصافي لا يُظهر نفسه، بل يُري ما فيه." },
      prologue: {
        fr: "En été, quand l’oued ralentit, on peut s’asseoir sur une pierre et regarder l’eau passer. Elle est si claire qu’on voit le fond : les galets, le sable, l’ombre d’une branche qui bouge. Puis un nuage passe, et tout devient bleu. On ne sait plus si l’on regarde l’eau, ou le ciel dans l’eau. La Source Sacrée tient dans cette hésitation : un bleu qu’on ne peut pas fixer, parce qu’il change dès qu’on le regarde.",
        ar: "في الصيف، حين يهدأ الوادي، يمكنك أن تجلس على حجر وتتأمّل الماء وهو يمرّ. إنه صافٍ إلى حدّ أنك ترى القاع: الحصى، والرمل، وظلّ غصن يتحرّك. ثم تمرّ غيمة، فيصير كل شيء أزرق. لا تعود تدري أتنظر إلى الماء، أم إلى السماء في الماء. «النبع المقدّس» يسكن هذا التردّد: زرقةٌ لا يمكن تثبيتها، لأنها تتغيّر ما إن تنظر إليها.",
      },
      naming: {
        fr: "Dans la montagne, l’eau n’est jamais acquise : c’est elle qui fait vivre les vergers, les cultures en terrasses, les villages. La dire « sacrée », c’est simplement lui rendre sa place, celle de l’origine.",
        ar: "في الجبل، الماء ليس أمرًا مضمونًا أبدًا: هو الذي يُحيي البساتين، والمدرّجات الزراعية، والقرى. أن نصفه بـ«المقدّس» ليس إلا ردًّا لمكانته: مكانة الأصل.",
      },
      chapters: [
        {
          title: paysage,
          text: {
            fr: "L’eau d’Ourika descend des hauteurs de l’Atlas. Au printemps, grossie par la fonte des neiges, elle est rapide et froide ; en été, elle ralentit et laisse voir le fond de son lit. Entre les pierres, elle prend des bleus changeants. Le long du lit, une partie de l’eau est détournée en petits canaux qui irriguent les terrasses. Partout où elle passe, le vert apparaît.",
            ar: "تنزل مياه أوريكا من أعالي الأطلس. في الربيع، حين تغذّيها الثلوج الذائبة، تكون سريعة وباردة؛ وفي الصيف، تهدأ فيظهر قاع مجراها. وبين الحجارة، تكتسي زرقة متبدّلة. وعلى طول المجرى، تُحوَّل بعض المياه إلى سواقٍ صغيرة تسقي المدرّجات. وحيثما مرّت، ظهرت الخضرة.",
          },
        },
        {
          title: matiere,
          text: {
            fr: "Des perles rondes d’un bleu profond, traversées de veinures plus foncées qui rappellent les reflets de l’eau en mouvement. Leur légère transparence laisse passer la lumière. Tenez une perle devant une fenêtre : son cœur s’éclaire, ses bords restent profonds. C’est ce que fait l’eau d’un bassin sous le soleil.",
            ar: "حبات مستديرة بزرقة عميقة، تعبرها عروق أدكن تذكّر بانعكاسات الماء الجاري. وشفافيتها الخفيفة تسمح بمرور الضوء. أمسك حبة أمام نافذة: يضيء قلبها، وتبقى حوافها عميقة. هذا تمامًا ما يفعله ماء الحوض تحت الشمس.",
          },
        },
        {
          title: geste,
          text: {
            fr: "Une seule matière, une seule couleur, une ligne continue : le dessin est volontairement simple. Ce dépouillement est une exigence : quand il n’y a qu’une couleur, chaque perle compte, et chacune est choisie pour que la ligne reste juste. Les perles sont enfilées sur un cordon noir tressé et fermées par un nœud coulissant, pour s’ajuster à chaque poignet.",
            ar: "مادة واحدة، لون واحد، وخط متّصل: التصميم بسيط عن قصد. وهذا التجرّد يتطلّب صرامة: حين لا يكون هناك إلا لون واحد، تُحسب كل حبة، وتُختار كلٌّ منها ليبقى الخط متوازنًا. تُنظم الحبات في حبل أسود مضفور وتُغلق بعقدة منزلقة، لتناسب كل معصم.",
          },
        },
        {
          title: temps,
          text: {
            fr: "C’est une pièce faite pour être portée souvent. Le cordon s’assouplit, le nœud prend l’habitude de votre poignet. Pensez seulement à la retirer avant de vous baigner : la seule eau qu’elle doit rappeler, c’est celle d’Ourika.",
            ar: "إنها قطعة صُنعت لتُلبس كثيرًا. يلين الحبل، وتألف العقدة معصمك. فقط تذكّر أن تنزعها قبل السباحة: فالماء الوحيد الذي عليها أن تستحضره هو ماء أوريكا.",
          },
        },
      ],
      details: [
        { fr: "La transparence des perles à la lumière du jour.", ar: "شفافية الحبات في ضوء النهار." },
        { fr: "Les veinures bleu nuit, jamais au même endroit.", ar: "العروق الزرقاء الداكنة، التي لا تتكرّر في الموضع نفسه." },
        { fr: "Le nœud coulissant, fait à la main.", ar: "العقدة المنزلقة، المصنوعة يدويًا." },
      ],
      wear: {
        fr: "Une pièce calme, pour tous les jours. Elle se porte seule, ou avec Le Souffle de l’Atlas : l’eau et la pierre qu’elle polit.",
        ar: "قطعة هادئة لكل يوم. تُلبس وحدها، أو مع «نَفَس الأطلس»: الماء والحجر الذي يصقله.",
      },
    },
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
    narrative: {
      quote: { fr: "La nuit, la montagne ne disparaît pas. Elle change de lumière.", ar: "في الليل، لا يختفي الجبل، بل يتغيّر نوره." },
      prologue: {
        fr: "Une nuit de pleine lune, dans un village accroché à la pente. Les lampes sont éteintes, mais on y voit presque comme en plein jour. Les murs de terre ont pris une teinte rose, les arbres un vert très pâle, et les sommets enneigés brillent d’une lumière sans chaleur. Rien n’a disparu : tout a simplement baissé d’un ton. L’Atlas en Lune rassemble ces couleurs adoucies, celles que la montagne ne montre que la nuit.",
        ar: "ليلة بدر، في قرية معلّقة على المنحدر. الأضواء مطفأة، لكن الرؤية تكاد تكون كما في وضح النهار. اكتست الجدران الترابية لونًا ورديًا، والأشجار خضرة شاحبة جدًا، والقمم المكسوّة بالثلج تلمع بنور بلا حرارة. لم يختفِ شيء: كل ما في الأمر أن كل شيء خفت درجة. «الأطلس في ضوء القمر» يجمع هذه الألوان الهادئة، تلك التي لا يُظهرها الجبل إلا ليلًا.",
      },
      naming: {
        fr: "Tiziri, c’est le clair de lune. De toutes les créations, celle-ci est la plus proche du nom de la maison : elle ne raconte pas la montagne en plein jour, mais la montagne telle que la lune la révèle, douce, sans éblouir.",
        ar: "تيزيري هو ضوء القمر. ومن بين كل الإبداعات، هذا هو الأقرب إلى اسم الدار: لا يحكي الجبل في وضح النهار، بل الجبل كما يكشفه القمر، ناعمًا، دون أن يبهر.",
      },
      chapters: [
        {
          title: paysage,
          text: {
            fr: "Les nuits de pleine lune, les pentes de l’Atlas restent visibles. Les couleurs du jour ne s’effacent pas tout à fait : elles pâlissent. Le rouge de la terre devient rose, le vert des arbres devient vert d’eau, et la neige des sommets renvoie une clarté presque transparente. C’est l’heure la plus secrète de la vallée, celle que l’on voit rarement, parce qu’on dort.",
            ar: "في ليالي البدر، تبقى منحدرات الأطلس مرئية. ألوان النهار لا تمّحي تمامًا، بل تشحب. يصير احمرار التراب ورديًا، وخضرة الأشجار خضرةً مائية، وتعكس ثلوج القمم صفاءً يكاد يكون شفافًا. إنها أكثر ساعات الوادي سرّيةً، تلك التي قلّما نراها، لأننا نكون نائمين.",
          },
        },
        {
          title: matiere,
          text: {
            fr: "Des perles en tonneau aux tons pastel — rose pâle, vert d’eau, ambre clair, corail doux — alternent avec des perles facettées transparentes. De petites perles dorées les séparent et donnent son rythme à la ligne. Les perles facettées jouent le rôle de la lune : sans couleur propre, elles renvoient celle de leurs voisines et s’allument dès que la lumière les touche.",
            ar: "حبات أسطوانية بألوان هادئة — وردي شاحب، أخضر مائي، كهرماني فاتح، مرجاني ناعم — تتناوب مع حبات شفافة مصقولة الأوجه. وتفصل بينها حبات ذهبية صغيرة تمنح الصف إيقاعه. والحبات المصقولة الأوجه تؤدّي دور القمر: بلا لون خاص بها، تعكس ألوان جاراتها، وتتّقد ما إن يلمسها الضوء.",
          },
        },
        {
          title: geste,
          text: {
            fr: "C’est la pièce la plus composée de la collection. Chaque couleur est placée pour qu’aucune ne domine, et les perles facettées sont regroupées pour créer des passages de lumière. Une telle composition se cherche : les couleurs sont d’abord disposées à plat, déplacées, comparées, avant d’être enfilées. L’équilibre final doit paraître naturel, comme s’il n’avait demandé aucun effort. Le bracelet se ferme par un fermoir.",
            ar: "هذه أكثر قطع المجموعة تركيبًا. يوضع كل لون بحيث لا يطغى أحدها على الآخر، وتُجمع الحبات المصقولة الأوجه لتصنع ممرّات من الضوء. وتركيبة كهذه لا تأتي دفعة واحدة: تُصفّ الألوان أولًا على سطح مستوٍ، وتُحرّك، وتُقارن، قبل أن تُنظم. ويجب أن يبدو التوازن النهائي طبيعيًا، كأنه لم يتطلّب أي جهد. ويُغلق السوار بمشبك.",
          },
        },
        {
          title: temps,
          text: {
            fr: "Son fermoir la rend facile à mettre et à retirer : c’est une pièce que l’on sort pour les moments choisis, puis que l’on range avec soin. À plat, à l’abri de la lumière directe, elle garde ses nuances pastel d’une saison à l’autre, prête pour la prochaine occasion.",
            ar: "مشبكها يجعل ارتداءها ونزعها سهلًا: إنها قطعة تُخرج للّحظات المختارة، ثم تُحفظ بعناية. مسطّحةً، بعيدًا عن الضوء المباشر، تحتفظ بدرجاتها الهادئة من فصل إلى آخر، مستعدّةً للمناسبة التالية.",
          },
        },
      ],
      details: [
        { fr: "Les facettes, qui attrapent la lumière au moindre mouvement.", ar: "الأوجه المصقولة، التي تلتقط الضوء مع أدنى حركة." },
        { fr: "Les intercalaires dorés entre chaque perle.", ar: "الفواصل الذهبية بين الحبات." },
        { fr: "Les nuances pastel, différentes d’une perle à l’autre.", ar: "الدرجات الهادئة، المختلفة من حبة إلى أخرى." },
      ],
      wear: {
        fr: "Une pièce délicate pour les moments qui appellent une lumière douce : un dîner, une fête, un cadeau. Portez-la seule, pour laisser respirer ses couleurs.",
        ar: "قطعة رقيقة للّحظات التي تحتاج نورًا ناعمًا: عشاء، مناسبة، أو هدية. ارتديها وحدها، لتتنفّس ألوانها.",
      },
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
    narrative: {
      quote: { fr: "Une journée dans la vallée, du premier reflet au dernier.", ar: "يوم في الوادي، من أول انعكاس إلى آخره." },
      prologue: {
        fr: "Une journée entière dans la vallée tient en trois couleurs. Le blanc des galets au lever du soleil. Le bleu de l’eau quand il fait grand jour. Le violet des crêtes quand le soir arrive. Le Trio réunit ces trois moments dans un même coffret : non pas trois bracelets choisis au hasard, mais une journée que l’on peut porter d’un seul geste, ou partager.",
        ar: "يومٌ كامل في الوادي يتّسع لثلاثة ألوان. بياض الحصى عند شروق الشمس. زرقة الماء في وضح النهار. بنفسجي القمم حين يحلّ المساء. تجمع «ثلاثية أوريكا» هذه اللحظات الثلاث في علبة واحدة: ليست ثلاثة أساور اختيرت صدفةً، بل يومٌ يمكن ارتداؤه بحركة واحدة، أو تقاسمه.",
      },
      naming: {
        fr: "« Trio », parce que chaque pièce garde son nom et son récit. « D’Ourika », parce qu’ensemble elles ne racontent plus un seul élément, mais la vallée tout entière.",
        ar: "«ثلاثية»، لأن كل قطعة تحتفظ باسمها وحكايتها. و«أوريكا»، لأنها معًا لا تحكي عنصرًا واحدًا، بل الوادي بأكمله.",
      },
      chapters: [
        {
          title: { fr: "Le matin", ar: "الصباح" },
          text: {
            fr: "La nacre du Souffle de l’Atlas : la clarté des galets quand le soleil touche la rive. Une lumière encore blanche, qui n’a pas choisi sa couleur.",
            ar: "صدف «نَفَس الأطلس»: صفاء الحصى حين تلامس الشمس الضفة. نورٌ ما زال أبيض، لم يختر لونه بعد.",
          },
        },
        {
          title: { fr: "Le jour", ar: "النهار" },
          text: {
            fr: "Le bleu de La Source Sacrée : l’eau vive qui descend de la montagne. La couleur la plus franche du coffret, celle qui tient toute la journée.",
            ar: "زرقة «النبع المقدّس»: الماء الجاري النازل من الجبل. أصرح ألوان العلبة، اللون الذي يصمد طوال اليوم.",
          },
        },
        {
          title: { fr: "Le soir", ar: "المساء" },
          text: {
            fr: "Le violet du Crépuscule d’Ourika : l’heure où les crêtes changent de couleur. La plus profonde des trois, celle qui ferme la journée.",
            ar: "بنفسجي «غروب أوريكا»: الساعة التي تتغيّر فيها ألوان القمم. أعمق الثلاثة، اللون الذي يختم اليوم.",
          },
        },
        {
          title: { fr: "Ensemble", ar: "معًا" },
          text: {
            fr: "Réunies, les trois pièces se répondent : la nacre éclaire le bleu, le violet approfondit l’ensemble, les cordons noirs relient le tout. Au même poignet, elles tracent une ligne d’horizon ; séparées, chacune retrouve son heure.",
            ar: "مجتمعةً، تتجاوب القطع الثلاث: الصدف يضيء الأزرق، والبنفسجي يعمّق المجموعة، والحبلان الأسودان يربطان الكل. على المعصم نفسه، ترسم خطّ أفق؛ ومنفصلةً، تستعيد كلّ واحدة ساعتها.",
          },
        },
      ],
      details: [
        {
          fr: "Les perles bleues et violettes, de même format : elles se superposent sans se heurter.",
          ar: "الحبات الزرقاء والبنفسجية بالحجم نفسه: تتراكب دون أن تتصادم.",
        },
        { fr: "La nacre irrégulière, qui rompt la régularité des perles.", ar: "الصدف غير المنتظم، الذي يكسر انتظام الحبات." },
        {
          fr: "La chaîne et la breloque gravée du Souffle de l’Atlas, seuls détails métalliques de l’ensemble.",
          ar: "السلسلة والدلّاية المنقوشة في «نَفَس الأطلس»، التفصيلان المعدنيان الوحيدان في المجموعة.",
        },
      ],
      wear: {
        fr: "Portez les trois ensemble au même poignet, ou séparez-les selon le moment. Le coffret se partage aussi : une pièce pour vous, deux à offrir.",
        ar: "ارتدِ الثلاثة معًا على المعصم نفسه، أو افصل بينها حسب اللحظة. ويمكن أيضًا تقاسم العلبة: قطعة لك، واثنتان للإهداء.",
      },
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
