import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { ogImage } from "@/lib/site-images";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingRegistration } from "@/components/layout/FloatingRegistration";
import { Toaster } from "sonner";
import { WelcomeOverlay } from "@/components/layout/WelcomeOverlay";

function NotFoundComponent() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          404
        </p>

        <h1 className="mt-3 font-display text-4xl font-semibold text-foreground">
          Page not found
        </h1>

        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-full gradient-saffron px-5 py-2.5 text-sm font-semibold text-white"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}

function ErrorComponent({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold text-foreground">
          Something went wrong
        </h1>

        <p className="mt-3 text-muted-foreground">
          Please try again.
        </p>

        <button
          type="button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 inline-flex rounded-full gradient-saffron px-5 py-2 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title:
          "Sri Sathya Sai Seva Samithi, Premsadan — MVP Colony, Visakhapatnam",
      },
      {
        name: "description",
        content:
          "A spiritual service community inspired by Bhagawan Sri Sathya Sai Baba, serving Visakhapatnam through education, healthcare and welfare seva.",
      },
      {
        name: "author",
        content: "Sri Sathya Sai Seva Samithi, Premsadan",
      },
      {
        property: "og:site_name",
        content: "Sri Sathya Sai Seva Samithi, Premsadan",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        property: "og:title",
        content:
          "Sri Sathya Sai Seva Samithi, Premsadan — MVP Colony, Visakhapatnam",
      },
      {
        name: "twitter:title",
        content:
          "Sri Sathya Sai Seva Samithi, Premsadan — MVP Colony, Visakhapatnam",
      },
      {
        property: "og:description",
        content:
          "A spiritual service community inspired by Bhagawan Sri Sathya Sai Baba, serving Visakhapatnam through education, healthcare and welfare seva.",
      },
      {
        name: "twitter:description",
        content:
          "A spiritual service community inspired by Bhagawan Sri Sathya Sai Baba, serving Visakhapatnam through education, healthcare and welfare seva.",
      },
      {
        property: "og:image",
        content: ogImage,
      },
      {
        name: "twitter:image",
        content: ogImage,
      },
    ],

    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: `${import.meta.env.BASE_URL}logo.png`,
        type: "image/png",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <HeadContent />
      {children}
      <Scripts />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
       <WelcomeOverlay />
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <Outlet />
        </main>

        <Footer />

        <FloatingRegistration />

        <Toaster
          position="top-right"
          richColors
          closeButton
        />
      </div>
    </QueryClientProvider>
  );
}