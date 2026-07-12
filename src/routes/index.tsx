import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CursorGlow } from "@/components/effects/CursorGlow";

import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Mission } from "@/components/site/Mission";
import { Impact } from "@/components/site/Impact";
import { Wildlife } from "@/components/site/Wildlife";
import { Forests } from "@/components/site/Forests";
import { DataViz } from "@/components/site/DataViz";
import { ClientOnly } from "@/components/effects/ClientOnly";

import { Journal } from "@/components/site/Journal";
import { Join } from "@/components/site/Join";
import { Footer } from "@/components/site/Footer";
import { Timeline } from "@/components/site/Timeline";
import { Testimonials } from "@/components/site/Testimonials";
import { Partners } from "@/components/site/Partners";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PSBS — Protecting Forests. Preserving Futures." },
      {
        name: "description",
        content:
          "Paryavaran Sanrakshan Bahuddeshiya Sanstha, Bhandara — a wildlife, forest and environment NGO restoring Vidarbha's living canopy.",
      },
      {
        property: "og:title",
        content: "PSBS — Protecting Forests. Preserving Futures.",
      },
      {
        property: "og:description",
        content:
          "A movement born in the wild heart of Bhandara, restoring forests and protecting wildlife.",
      },
    ],
  }),
  component: Index,
} as any);

function Index() {
  return (
    <>
      <Nav />
      <main className="relative min-h-screen bg-ink text-foreground">
      <SmoothScroll />
      <CursorGlow />

      <Hero />
      <Mission />
      <Timeline />

      <Impact />
      <Wildlife />
      <Forests />
      <DataViz />
      <Testimonials />
      <Journal />
      <Partners />
      <Join />
      <Footer />
    </main>
    </>
  );
}
