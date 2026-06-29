import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { Reveal } from "@/components/effects/Reveal";

import j1 from "@/assets/journal-1.jpg";
import j2 from "@/assets/journal-2.jpg";
import j3 from "@/assets/journal-3.jpg";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [{ title: "News & Field Journal — PSBS Bhandara" }],
  }),
  component: NewsPage,
});

const articles = [
  {
    img: j2,
    tag: "Community",
    date: "Feb 02, 2025",
    title: "The Children of Mendha Village",
    excerpt:
      "87 school children planted 1,200 native saplings — and adopted them, by name, like family.",
  },
  {
    img: j3,
    tag: "Research",
    date: "Jan 20, 2025",
    title: "Hornbill Census, Koka Sanctuary",
    excerpt:
      "Dawn surveys reveal a 14% rise in nesting pairs — the canopy is healing, branch by branch.",
  },
  {
    img: j1,
    tag: "Policy",
    date: "Dec 05, 2024",
    title: "Gosikhurd Wetlands: A New Protected Zone",
    excerpt:
      "How a decade of lobbying culminated in a landmark declaration of 189 km² of protected wetland.",
  },
  {
    img: j2,
    tag: "Wildlife Rescue",
    date: "Nov 12, 2024",
    title: "Sloth Bear Rescue at Bramhapuri",
    excerpt:
      "An injured female sloth bear was treated and released after 6 weeks of careful rehabilitation.",
  },
  {
    img: j3,
    tag: "Field Report",
    date: "Oct 01, 2024",
    title: "Camera Trap Reveals Hidden Dhole Pack",
    excerpt:
      "First documented Wild Dog pack in Umred-Karhandla since 2018 — a sign the forest is recovering.",
  },
  {
    img: j1,
    tag: "Community",
    date: "Sep 15, 2024",
    title: "Village Patrol Prevents Poaching",
    excerpt:
      "A community-led night patrol stops 3 snaring attempts and reports to forest department within hours.",
  },
];

function NewsPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <main className="relative min-h-screen bg-ink text-foreground page-enter">
      <SmoothScroll />
      <CursorGlow />
      <Nav />

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
        <Reveal>
          <h1 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[1.05] text-fog">
            Dispatches from
            <br />
            <em className="text-gold-gradient not-italic">the wild</em>.
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 text-lg md:text-xl text-fog/70 leading-relaxed max-w-2xl mx-auto">
            Field reports, conservation updates, community stories, and research
            findings from the forests of Vidarbha.
          </p>
        </Reveal>
      </section>

      {/* ── Featured Article ── */}
      <section className="py-12 max-w-[1500px] mx-auto px-6 md:px-12">
        <Reveal>
          <div className="glass-card rounded-3xl overflow-hidden grid lg:grid-cols-12 border border-white/[0.06]">
            <div className="lg:col-span-6 h-[400px] lg:h-full min-h-[350px] relative">
              <img
                src={j1}
                alt="Tracking tigers in the forest"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/30 via-transparent to-transparent" />
            </div>
            <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-center space-y-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ink/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold/90 backdrop-blur">
                  Featured Report
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-fog/50">
                  March 14, 2025
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-fog leading-[1.1]">
                Tracking the Ghost of Nagzira: Tigress N-7 Returns
              </h2>
              <div className="space-y-4 text-sm text-fog/65 leading-relaxed">
                <p>
                  Four nights, twelve cameras, and a single pugmark in the wet
                  clay. That is how it began. Our field team had been tracking
                  tigress N-7 for eight months after she disappeared from her
                  known territory near Navegaon. We feared the worst.
                </p>
                <p>
                  Then camera #7, mounted on a teak tree at the southern edge of
                  the reserve, blinked awake at 3:42am on a February night. The
                  image: N-7, healthy, with three cubs at heel. She had not left
                  the forest. She had simply found a new silence to raise her
                  family in. This is what we monitor: not just presence, but
                  possibility.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Articles Grid ── */}
      <section className="py-16 max-w-[1500px] mx-auto px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              Dispatches
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-fog mb-16">
            From the field journals.
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((art, i) => (
            <Reveal key={art.title} delay={i * 0.08}>
              <a href="#" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/[0.06] bg-canopy/20">
                  <img
                    src={art.img}
                    alt={art.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-[1.4s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent" />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ink/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold/90 backdrop-blur z-10">
                    {art.tag}
                  </div>
                  <div className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-ink/40 text-fog/80 backdrop-blur transition group-hover:border-gold group-hover:text-gold z-10">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-fog/50">
                      {art.date}
                    </div>
                    <h3 className="mt-2 font-display text-2xl text-fog group-hover:text-gold transition duration-350">
                      {art.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fog/65">
                      {art.excerpt}
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Newsletter Section ── */}
      <section className="py-16 max-w-[1500px] mx-auto px-6 md:px-12">
        <Reveal>
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto space-y-6">
            <h3 className="font-display text-3xl md:text-4xl text-fog">
              Join our field journal.
            </h3>
            <p className="text-sm text-fog/60 max-w-md mx-auto">
              Get monthly dispatches, species updates, and volunteering
              opportunities delivered straight to your inbox.
            </p>

            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="fieldguide@example.com"
                    className="flex-1 rounded-xl border border-white/[0.08] bg-ink/40 px-5 py-4 text-sm text-fog placeholder:text-fog/40 focus:border-gold/40 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-3 rounded-xl px-7 py-4 text-sm font-medium text-ink transition hover:translate-y-[-2px] shrink-0"
                    style={{
                      background: "var(--gradient-gold)",
                      boxShadow: "var(--shadow-glow)",
                    }}
                  >
                    Subscribe
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-4 text-emerald font-medium"
                >
                  🎉 Thank you for subscribing! Welcome to the canopy.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
