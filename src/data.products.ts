import trio from "@/assets/bracelets-trio.webp.asset.json";
import shell from "@/assets/souffle-atlas.webp.asset.json";
import blue from "@/assets/source-sacree.webp.asset.json";

export type Product = { id:string; name:string; slug:string; description:string; story:string; materials:string; inspiration:string; price:number; images:string[]; featured:boolean };
export const products: Product[] = [
 {id:"crepuscule",name:"Le Crépuscule d’Ourika",slug:"le-crepuscule-dourika",description:"Une rencontre entre le bleu du soir et la lumière rose des montagnes.",story:"À l’heure où les reliefs d’Ourika retiennent les dernières couleurs du jour, le bleu et le rose se rencontrent dans une création singulière.",materials:"Perles minérales bleues et roses, cordon tressé, détail argenté.",inspiration:"Les crépuscules colorés de la vallée d’Ourika.",price:680,images:[trio.url],featured:true},
 {id:"souffle",name:"Le Souffle de l’Atlas",slug:"le-souffle-de-latlas",description:"Une création organique, douce et lumineuse.",story:"Ses fragments nacrés évoquent les pierres polies par l’eau et les chemins clairs qui traversent la vallée.",materials:"Fragments de nacre naturelle et chaîne en métal argenté.",inspiration:"La pierre claire, la lumière et le mouvement de l’eau.",price:620,images:[shell.url],featured:true},
 {id:"source",name:"La Source Sacrée",slug:"la-source-sacree",description:"Un bleu profond inspiré par la clarté de l’eau d’Ourika.",story:"Une ligne de perles bleues comme autant de gouttes saisies dans la lumière. Une pièce calme, franche et essentielle.",materials:"Perles minérales bleues et cordon noir tressé réglable.",inspiration:"L’eau vive qui descend de l’Atlas.",price:580,images:[blue.url],featured:true},
];
export const formatPrice=(n:number)=>`${n.toLocaleString("fr-FR")} DH`;
