import type { CartLine } from "@/context/CartContext";
import { BraceletPreview } from "./BraceletPreview";

/** Vignette d'une ligne de panier : photo réelle, ou aperçu dessiné pour le sur mesure. */
export function CartLineVisual({ line, className }: { line: CartLine; className: string }) {
  if (line.custom) return <BraceletPreview config={line.custom} className={`${className} bg-sand/40`} />;
  return <img src={line.image} alt={line.name} className={`${className} object-cover`} />;
}
