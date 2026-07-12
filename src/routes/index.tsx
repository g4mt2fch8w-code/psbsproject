import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageRenderer } from "@/components/site/PageRenderer";

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
    <div className="bg-ink min-h-screen text-fog flex flex-col font-sans selection:bg-gold/30 selection:text-gold-light overflow-x-hidden">
      <SmoothScroll />
      <CursorGlow />
      <Nav />
      <main className="flex-1">
        <PageRenderer pageId="home" />
      </main>
      <Footer />
    </div>
  );
}
