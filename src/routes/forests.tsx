import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Waves, Shield } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { Reveal } from "@/components/effects/Reveal";
import { Forests } from "@/components/site/Forests";
import heroImg from "@/assets/hero-forest.jpg";
import canopyImg from "@/assets/canopy.jpg";

export const Route = createFileRoute("/forests")({
  head: () => ({
    meta: [{ title: "The Forests — Living Landscapes of Vidarbha · PSBS" }],
  }),
  component: ForestsPage,
});

const profiles = [
  {
    name: "Navegaon-Nagzira",
    area: "653 km²",
    paras: [
      "Navegaon-Nagzira Tiger Reserve is a mosaic of dry deciduous forest, grassland and seasonal wetlands in Gondia and Bhandara districts. It is one of the most important tiger dispersal zones in central India.",
      "PSBS has been restoring the buffer zone here since 2018 — planting over 47,000 native trees and working with 28 fringe villages to reduce human-wildlife conflict.",
    ],
  },
  {
    name: "Tadoba-Andhari",
    area: "1,700 km²",
    paras: [
      "Maharashtra's largest and oldest tiger reserve, Tadoba-Andhari harbours one of India's densest tiger populations. Its teak-dominated forests give way to bamboo valleys and perennial streams.",
      "PSBS supports the southern corridors of Tadoba — areas outside formal protection — through community patrol networks and habitat monitoring that extends the effective conservation footprint.",
    ],
  },
  {
    name: "Gosikhurd Wetlands",
    area: "189 km²",
    paras: [
      "The Gosikhurd reservoir and its buffer wetlands are a critical wintering ground for migratory waterfowl, including Sarus Cranes and Painted Storks. Recognised as a Ramsar site in 2023.",
      "PSBS conducted the baseline biodiversity surveys that formed the scientific basis for Gosikhurd's international recognition. We continue seasonal clean-up programs and water quality monitoring.",
    ],
  },
  {
    name: "Koka Sanctuary",
    area: "92 km²",
    paras: [
      "Koka is a compact but ecologically rich sanctuary in Amravati district, known as the best site in India to observe nesting Grey Hornbills. Its riparian corridors shelter leopards, sloth bears and wolf packs.",
      "Our hornbill nest census — now in its sixth consecutive year — has documented 34 active nests and established the first longitudinal dataset on hornbill breeding success in Vidarbha.",
    ],
  },
];

const services = [
  {
    icon: Leaf,
    title: "Carbon Sequestration",
    body: "Vidarbha's forests sequester an estimated 4.2 million tonnes of carbon annually. Restoring degraded patches amplifies this and creates measurable climate co-benefits for the region.",
  },
  {
    icon: Waves,
    title: "Water Regulation",
    body: "The watersheds of Vidarbha's forests feed the Wainganga, Wardha and Penganga rivers. Intact canopy cover reduces runoff, recharges aquifers and moderates seasonal flooding.",
  },
  {
    icon: Shield,
    title: "Biodiversity Refuge",
    body: "With 218+ vertebrate species — including five globally threatened large mammals — these forests are among the most species-rich landscapes in peninsular India.",
  },
];

const stats = [
  { value: "5,688 km²", label: "Total Forest Area" },
  { value: "8", label: "Protected Zones" },
  { value: "218+", label: "Species" },
  { value: "12", label: "Tiger Corridors Mapped" },
];

function ForestsPage() {
  return (
    <>
      <Nav />
      <main className="relative min-h-screen bg-ink text-foreground page-enter">
      <SmoothScroll />
      <CursorGlow />

      {/* ── Hero ── */}
      <section className="pt-28 pb-24 px-6 relative overflow-hidden">
        {/* Background image */}
        <img
          src={heroImg}
          alt="Vidarbha forest at dawn"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                Living Landscapes
              </span>
              <div className="h-px w-10 bg-gold/60" />
            </div>
            <h1 className="font-display text-[clamp(3rem,8vw,8rem)] text-fog leading-none mb-6">
              Six landscapes.{" "}
              <em className="text-gold-gradient not-italic">One living</em>{" "}
              canopy.
            </h1>
            <p className="max-w-2xl mx-auto text-fog/70 text-lg leading-relaxed">
              The forests of Vidarbha are among India's most biodiverse — and
              most threatened. PSBS works to understand, protect, and restore
              these landscapes one season at a time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Forests Component (from home page) ── */}
      <Forests />

      {/* ── Forest Profiles ── */}
      <section className="py-32 px-6 bg-canopy/20">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                Profiles
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-fog mb-12">
              Know your forests.
            </h2>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-8">
            {profiles.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className="glass-card rounded-3xl p-8 h-full flex flex-col gap-4">
                  <span className="text-xs text-fog/50 border border-white/10 rounded-full px-3 py-1 w-fit">
                    {p.area}
                  </span>
                  <h3 className="font-display text-3xl text-fog">{p.name}</h3>
                  {p.paras.map((para, j) => (
                    <p key={j} className="text-sm text-fog/65 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ecosystem Services ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                Ecosystem Services
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-fog mb-12">
              Why these forests matter.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="glass-card rounded-3xl p-8 h-full">
                  <s.icon
                    className="w-8 h-8 text-gold mb-4"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-display text-xl text-fog mb-3">
                    {s.title}
                  </h3>
                  <p className="text-sm text-fog/60 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="py-16 px-6 border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div className="text-center">
                <div className="font-display text-3xl text-gold mb-1">
                  {s.value}
                </div>
                <div className="text-xs text-fog/50 uppercase tracking-widest">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
    </>
  );
}
