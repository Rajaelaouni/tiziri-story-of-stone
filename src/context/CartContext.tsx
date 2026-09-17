import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products } from "@/data.products";
import { describe, isValidConfig, priceOf, type BraceletConfig } from "@/lib/sur-mesure";
import { useI18n, type Lang } from "@/lib/i18n";

type Item = { id: string; quantity: number; custom?: BraceletConfig };
/** Ligne de panier résolue : produit du catalogue ou bracelet sur mesure. */
export type CartLine = Item & { name: string; price: number; image?: string; details?: string };
type CartValue = {
  items: Item[];
  lines: CartLine[];
  count: number;
  total: number;
  add: (id: string, q?: number) => void;
  addCustom: (config: BraceletConfig, q?: number) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, q: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartValue | undefined>(undefined);

function resolve(item: Item, lang: Lang): CartLine | null {
  if (item.custom) {
    if (!isValidConfig(item.custom)) return null;
    const name = lang === "ar" ? "سوار حسب الطلب" : "Bracelet sur mesure";
    return { ...item, name, price: priceOf(item.custom), details: describe(item.custom, lang) };
  }
  const p = products.find((x) => x.id === item.id);
  if (!p) return null;
  const line = { ...item, name: p.name[lang], price: p.price };
  return p.images[0] ? { ...line, image: p.images[0] } : line;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { lang } = useI18n();
  const [items, setItems] = useState<Item[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tiziri-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem("tiziri-cart", JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const value = useMemo<CartValue>(() => {
    const lines = items.map((i) => resolve(i, lang)).filter((l): l is CartLine => l !== null);
    return {
      items,
      lines,
      count: lines.reduce((s, i) => s + i.quantity, 0),
      total: lines.reduce((s, i) => s + i.price * i.quantity, 0),
      add: (id, q = 1) =>
        setItems((a) => (a.some((i) => i.id === id) ? a.map((i) => (i.id === id ? { ...i, quantity: i.quantity + q } : i)) : [...a, { id, quantity: q }])),
      // Chaque bracelet sur mesure est une ligne distincte (intention personnelle incluse).
      addCustom: (config, q = 1) => setItems((a) => [...a, { id: `sur-mesure-${Date.now().toString(36)}`, quantity: q, custom: config }]),
      remove: (id) => setItems((a) => a.filter((i) => i.id !== id)),
      setQuantity: (id, q) => setItems((a) => (q < 1 ? a.filter((i) => i.id !== id) : a.map((i) => (i.id === id ? { ...i, quantity: q } : i)))),
      clear: () => setItems([]),
    };
  }, [items, lang]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("CartProvider missing");
  return c;
}
