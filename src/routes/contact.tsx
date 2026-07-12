import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageRenderer } from "@/components/site/PageRenderer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [{ title: "PSBS — Contact Us" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="bg-ink min-h-screen text-fog flex flex-col font-sans selection:bg-gold/30 selection:text-gold-light overflow-x-hidden">
      <SmoothScroll />
      <CursorGlow />
      <Nav />
      <main className="flex-1">
        <PageRenderer pageId="contact" />
      </main>
      <Footer />
    </div>
  );
}
