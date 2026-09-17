import type { Localized } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n";

/** Gabarit commun des pages légales (FR / AR). */
export function LegalPage({ title, text }: { title: Localized; text: Localized }) {
  const { t, L } = useI18n();
  return (
    <section className="mx-auto min-h-[70svh] max-w-4xl px-6 pb-24 pt-40">
      <p className="eyebrow">{t("Maison Tiziri", "دار تيزيري")}</p>
      <h1 className="display-title mt-6 text-6xl">{L(title)}</h1>
      <p className="mt-12 max-w-2xl leading-8 text-muted-foreground">{L(text)}</p>
    </section>
  );
}
