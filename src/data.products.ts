import bracelet1 from "@/assets/produit1Atlass.png";
import bracelet2 from "@/assets/produit2.png";
import bracelet3 from "@/assets/produit3.png";
import bracelet4 from "@/assets/produit4.png";
import trioOffer from "@/assets/promotion3bracleta399dh.png";

export type Product = { id:string; name:string; slug:string; description:string; story:string; materials:string; inspiration:string; price:number; images:string[]; featured:boolean };
export const products: Product[] = [
 {id:"offre-3-bracelets",name:"Offre 3 bracelets",slug:"offre-3-bracelets",description:"Un trio de bracelets pour créer une palette complète inspirée par la vallée d’Ourika.",story:"L’offre spéciale 3 bracelets associe trois palettes de couleurs pour une présence plus forte, plus lumineuse et plus singulière. Une sélection pensée pour accompagner chaque tenue et chaque moment de la journée.",materials:"3 bracelets assortis, cordons tressés, détails en métal.",inspiration:"Les jeux de lumière et les tons naturels de la vallée d’Ourika.",price:399,images:[trioOffer],featured:true},
 {id:"crepuscule",name:"Le Crépuscule d’Ourika",slug:"le-crepuscule-dourika",description:"Une rencontre entre le bleu du soir et la lumière rose des montagnes.",story:"À l’heure où les reliefs d’Ourika retiennent les dernières couleurs du jour, le bleu et le rose se rencontrent dans une création singulière.",materials:"Perles minérales bleues et roses, cordon tressé, détail argenté.",inspiration:"Les crépuscules colorés de la vallée d’Ourika.",price:680,images:[bracelet1],featured:true},
 {id:"souffle",name:"Le Souffle de l’Atlas",slug:"le-souffle-de-latlas",description:"Une création organique, douce et lumineuse.",story:"Ses fragments nacrés évoquent les pierres polies par l’eau et les chemins clairs qui traversent la vallée.",materials:"Fragments de nacre naturelle et chaîne en métal argenté.",inspiration:"La pierre claire, la lumière et le mouvement de l’eau.",price:620,images:[bracelet2],featured:true},
 {id:"source",name:"La Source Sacrée",slug:"la-source-sacree",description:"Un bleu profond inspiré par la clarté de l’eau d’Ourika.",story:"Une ligne de perles bleues comme autant de gouttes saisies dans la lumière. Une pièce calme, franche et essentielle.",materials:"Perles minérales bleues et cordon noir tressé réglable.",inspiration:"L’eau vive qui descend de l’Atlas.",price:580,images:[bracelet3],featured:true},
 {id:"atlas-lune",name:"L’Atlas en Lune",slug:"latlas-en-lune",description:"Une composition douce et lumineuse aux tons naturels et minéraux.",story:"Des compositions de pierres aux reflets délicats, pensées pour une présence discrète mais marquante.",materials:"Perles naturelles, cordon noir, détails argentés.",inspiration:"La lumière douce des pierres et des ombres de la vallée.",price:540,images:[bracelet4],featured:false},
];
export const formatPrice=(n:number)=>`${n.toLocaleString("fr-FR")} DH`;
