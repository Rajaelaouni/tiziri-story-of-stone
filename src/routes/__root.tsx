import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/context/CartContext";
import { Header, Footer } from "@/components/SiteChrome";
import { Button } from "@/components/ui/button";
import { I18nProvider, useI18n } from "@/lib/i18n";

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 pt-24">
      <div className="max-w-lg text-center">
        <p className="eyebrow text-clay">{t("Erreur 404", "خطأ 404")}</p>
        <h1 className="display-title mt-5 text-6xl md:text-7xl">{t("Chemin perdu", "طريق ضائع")}</h1>
        <p className="mt-6 font-serif text-2xl italic">
          {t("Même dans la vallée, certains sentiers ne mènent nulle part.", "حتى في الوادي، بعض الدروب لا تؤدي إلى أي مكان.")}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild variant="luxury">
            <Link to="/">{t("Retour à l’accueil", "العودة إلى الرئيسية")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/creations">{t("Les créations", "الإبداعات")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-lg text-center">
        <h1 className="display-title text-5xl">Un instant</h1>
        <p className="mt-5 font-serif text-2xl italic">
          Cette page n’a pas pu s’afficher. Réessayez, ou revenez à l’accueil.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            variant="luxury"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Réessayer
          </Button>
          <Button asChild variant="outline">
            <a href="/">Retour à l’accueil</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "TIZIRI" },
      { name: "theme-color", content: "#2B241D" },
      { property: "og:site_name", content: "TIZIRI — Créations d’Ahmed Tiziri" },
      { property: "og:locale", content: "fr_MA" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Manrope:wght@300;400;500;600&family=Amiri:wght@400;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&display=swap" },
      { rel: "icon", href: "/tiziri-mark.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}><I18nProvider><CartProvider><Header/><main><Outlet /></main><Footer/></CartProvider></I18nProvider></QueryClientProvider>
  );
}
