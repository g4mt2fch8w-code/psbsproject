import { createFileRoute } from "@tanstack/react-router";
import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Camera, Heart, BookOpen, Compass, Eye, Shield } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { Reveal } from "@/components/effects/Reveal";

import tigerImg from "@/assets/tiger.jpg";
import hornbillImg from "@/assets/hornbill.jpg";
import deerImg from "@/assets/deer.jpg";
import leopardImg from "@/assets/leopard.jpg";
import heroImg from "@/assets/hero-forest.jpg";

export const Route = createFileRoute("/wildlife")({
  head: () => ({
    meta: [{ title: "Wildlife — Species of Vidarbha · PSBS" }],
  }),
  component: WildlifePage,
});

const species = [
  {
    img: tigerImg,
    status: "Endangered",
    count: "38",
    latin: "Panthera tigris tigris",
    name: "Bengal Tiger",
    body: "The Bengal Tiger is the apex guardian of the Vidarbha forest system. Each individual maintains a territory of 20-80 km², silently regulating prey populations, shaping vegetation through the ecology of fear, and marking the health of the entire ecosystem. Our camera-trap network has documented 38 individuals across Navegaon-Nagzira and Tadoba corridors, including the famous tigress N-7 and her three cubs born in the 2024 monsoon.",
  },
  {
    img: hornbillImg,
    status: "Vulnerable",
    count: "210+",
    latin: "Buceros bicornis",
    name: "Indian Hornbill",
    body: "The Great Indian Hornbill is perhaps the forest's most spectacular resident. Known as the 'farmer of the forest' for its seed-dispersal role, a single pair of hornbills can regenerate an entire patch of canopy. Our 2024-25 census documented 210+ individuals in Koka Sanctuary alone, with 34 active nesting cavities — a 14% increase over the previous year. Hornbill presence is our proxy for forest health.",
  },
  {
    img: deerImg,
    status: "Least Concern",
    count: "4,200+",
    latin: "Axis axis",
    name: "Spotted Deer",
    body: "The most visible resident of our forests, Chital form the foundation of the predator-prey web that keeps tigers and leopards in Vidarbha. Our annual ungulate census across 4 reserves estimates 4,200+ individuals. Their alarm calls at dawn are the forest's own early-warning system — a sound that every field team learns to read like a language.",
  },
  {
    img: leopardImg,
    status: "Vulnerable",
    count: "22",
    latin: "Panthera pardus fusca",
    name: "Leopard",
    body: "Often overshadowed by tigers, the Indian Leopard is Vidarbha's most adaptable large carnivore — and its most misunderstood. Our camera data shows 22 individuals occupying forest fringes, agricultural edges, and deep reserve interiors simultaneously, managing mesopredator populations and reducing human-wildlife conflict when given space. They are the shadow that balances the system.",
  },
];

const otherSpecies = [
  { name: "Sloth Bear", latin: "Melursus ursinus", status: "Vulnerable" },
  { name: "Dhole / Wild Dog", latin: "Cuon alpinus", status: "Endangered" },
  { name: "Indian Gaur", latin: "Bos gaurus", status: "Vulnerable" },
  {
    name: "Four-horned Antelope",
    latin: "Tetracerus quadricornis",
    status: "Vulnerable",
  },
  {
    name: "Smooth-coated Otter",
    latin: "Lutrogale perspicillata",
    status: "Vulnerable",
  },
  {
    name: "Mugger Crocodile",
    latin: "Crocodylus palustris",
    status: "Vulnerable",
  },
  { name: "Indian Python", latin: "Python molurus", status: "Near Threatened" },
  {
    name: "Grey-headed Fish Eagle",
    latin: "Haliaeetus ichthyaetus",
    status: "Near Threatened",
  },
  {
    name: "Crested Serpent Eagle",
    latin: "Spilornis cheela",
    status: "Least Concern",
  },
  {
    name: "Indian Roller",
    latin: "Coracias benghalensis",
    status: "Least Concern",
  },
];

function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const handle = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px)`;
  };
  const reset = () => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(1100px) rotateY(0) rotateX(0) translateY(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={handle}
      onMouseLeave={reset}
      className="transition-transform duration-300 will-change-transform h-full"
    >
      {children}
    </div>
  );
}

function WildlifePage() {
  return (
    <>
      <Nav />
      <main className="relative min-h-screen bg-ink text-foreground page-enter">
      <SmoothScroll />
      <CursorGlow />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-ink">
        <div className="absolute inset-0 opacity-[0.25]">
          <img
            src={heroImg}
            alt="Misty forest background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <Reveal>
            <h1 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[1.05] text-fog">
              The lives we are
              <br />
              <em className="text-gold-gradient not-italic">sworn</em> to
              protect.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-lg md:text-xl text-fog/70 leading-relaxed max-w-2xl mx-auto">
              Vidarbha's forests shelter Bengal Tigers, Indian Hornbills, Wild
              Dogs, Sloth Bears, and over 218 documented species. We know them
              by track, by camera, and by call.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Featured Species Grid ── */}
      <section className="py-24 max-w-[1500px] mx-auto px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              Key Species
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-fog mb-16">
            Ecosystem cornerstones.
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {species.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <Tilt>
                <article className="group relative h-[520px] overflow-hidden rounded-3xl border border-white/[0.06] flex flex-col justify-end">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-[1.4s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent z-10" />
                  <div
                    className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 z-10"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 30%, rgba(201,161,59,0.25), transparent 60%)",
                    }}
                  />

                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-gold/30 bg-ink/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold/90 backdrop-blur z-20">
                    {s.status}
                  </div>
                  <div className="absolute right-5 top-5 text-right z-20">
                    <div className="font-display text-3xl text-fog text-glow">
                      {s.count}
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.3em] text-fog/50">
                      documented
                    </div>
                  </div>

                  <div className="p-6 relative z-20 transition-all duration-300 group-hover:translate-y-[-10px]">
                    <div className="text-[10px] italic tracking-wide text-gold/70">
                      {s.latin}
                    </div>
                    <h3 className="mt-1 font-display text-3xl text-fog">
                      {s.name}
                    </h3>
                    <p className="mt-4 max-h-0 overflow-hidden text-sm leading-relaxed text-fog/70 opacity-0 transition-all duration-500 group-hover:max-h-56 group-hover:opacity-100">
                      {s.body}
                    </p>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── More Species Grid ── */}
      <section className="py-24 bg-canopy/20 border-y border-white/[0.04]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                Fauna Register
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-fog mb-16">
              Co-inhabitants of Vidarbha.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {otherSpecies.map((os, i) => (
              <Reveal key={os.name} delay={i * 0.05}>
                <div className="glass-card rounded-2xl p-6 h-full flex flex-col justify-between hover:border-gold/30 transition duration-300">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 text-fog/50">
                      {os.status}
                    </span>
                    <h3 className="font-display text-xl text-fog mt-4">
                      {os.name}
                    </h3>
                    <p className="text-[11px] italic text-gold/60 mt-1">
                      {os.latin}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Conservation Work ── */}
      <section className="py-24 max-w-[1500px] mx-auto px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              What We Do
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-fog mb-16">
            Active stewardship programs.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          <Reveal>
            <div className="glass-card rounded-3xl p-10 h-full">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 border border-gold/20 text-gold mb-6">
                <Camera className="h-6 w-6" />
              </span>
              <h3 className="font-display text-2xl text-fog mb-4">
                Field Monitoring
              </h3>
              <p className="text-sm text-fog/65 leading-relaxed">
                Deploying and checking camera trap lines across corridors,
                collecting non-invasive biological samples, tracking animal
                movement paths, and building spatial maps of predator-prey
                dynamics.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass-card rounded-3xl p-10 h-full">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald/10 border border-emerald/20 text-emerald mb-6">
                <Heart className="h-6 w-6" />
              </span>
              <h3 className="font-display text-2xl text-fog mb-4">
                Rescue & Rehab
              </h3>
              <p className="text-sm text-fog/65 leading-relaxed">
                Working as a support mechanism for the Forest Department during
                animal displacement, snaring incidents, human-wildlife
                encounters, and transport of injured animals to medical units.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="glass-card rounded-3xl p-10 h-full">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 border border-gold/20 text-gold mb-6">
                <BookOpen className="h-6 w-6" />
              </span>
              <h3 className="font-display text-2xl text-fog mb-4">
                Scientific Publication
              </h3>
              <p className="text-sm text-fog/65 leading-relaxed">
                Compiling species databases, nesting tree indexes, bird
                migration studies, and vegetation surveys. Sharing reports with
                the Wildlife Institute of India and state agencies.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
    </>
  );
}
