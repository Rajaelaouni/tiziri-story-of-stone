import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Traduction du site : français (par défaut) et arabe (droite à gauche).
 * - Textes d'interface : t("Texte français", "النص العربي") directement dans le composant.
 * - Données (produits, couleurs…) : champs Localized { fr, ar }, lus avec L(valeur).
 * Le choix est mémorisé dans le navigateur.
 */
export type Lang = "fr" | "ar";
export type Localized = { fr: string; ar: string };

type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (fr: string, ar: string) => string;
  L: (value: Localized) => string;
};

const STORAGE_KEY = "tiziri-lang";
const I18nContext = createContext<I18nValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "ar") setLang("ar");
    } catch {}
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, [lang]);

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      setLang,
      t: (fr, ar) => (lang === "ar" ? ar : fr),
      L: (v) => v[lang],
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// Hors du fournisseur (ex. page d'erreur racine), on retombe sur le français.
const fallback: I18nValue = { lang: "fr", setLang: () => {}, t: (fr) => fr, L: (v) => v.fr };

export function useI18n() {
  return useContext(I18nContext) ?? fallback;
}

export const formatPrice = (n: number, lang: Lang = "fr") =>
  lang === "ar" ? `${n.toLocaleString("fr-FR")} درهم` : `${n.toLocaleString("fr-FR")} DH`;
