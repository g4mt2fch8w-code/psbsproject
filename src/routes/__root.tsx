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

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-[8rem] leading-none text-gold-gradient">
          404
        </h1>
        <h2 className="mt-4 font-display text-2xl text-fog">
          Lost in the forest
        </h2>
        <p className="mt-2 text-sm text-fog/60">
          This path doesn't exist. Let's guide you back to the canopy.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-ink transition hover:opacity-90"
            style={{ background: "var(--gradient-gold)" }}
          >
            Return Home
          </Link>
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
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl text-fog">This page didn't load</h1>
        <p className="mt-2 text-sm text-fog/60">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-ink"
            style={{ background: "var(--gradient-gold)" }}
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm text-fog"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "PSBS — Paryavaran Sanrakshan Bahuddeshiya Sanstha, Bhandara" },
        {
          name: "description",
          content:
            "A movement born in the wild heart of Bhandara — restoring forests, protecting wildlife, and walking alongside the communities who call these lands home.",
        },
        { name: "author", content: "PSBS Bhandara" },
        { name: "theme-color", content: "#050505" },
        {
          property: "og:title",
          content: "PSBS — Protecting Forests. Preserving Futures.",
        },
        {
          property: "og:description",
          content:
            "Wildlife • Forest • Environment NGO from Bhandara, Vidarbha.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: "@PSBSBhandara" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap",
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
        {/* Apply saved theme before paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('psbs-theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}else{document.documentElement.classList.add('dark');}})();`,
          }}
        />
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
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
