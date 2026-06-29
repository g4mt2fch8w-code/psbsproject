import { Reveal } from "@/components/effects/Reveal";
import { motion } from "framer-motion";

const items = [
  "184,217 Trees Restored",
  "5,780 Hectares Protected",
  "38 Tigers in Reserves",
  "132 Villages Engaged",
  "218 Species Documented",
  "96 Camera Traps Active",
  "24 Wildlife Initiatives",
  "14 Years of Field Work",
];

export function StatsMarquee() {
  const doubled = [...items, ...items];

  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-canopy/40 py-5">
      <div className="flex overflow-hidden">
        <div className="marquee-track flex shrink-0 gap-12 whitespace-nowrap">
          {doubled.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-12 text-[11px] uppercase tracking-[0.35em] text-fog/50"
            >
              <motion.span
                className="text-gold/70"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: (i % items.length) * 0.3,
                }}
              >
                ✦
              </motion.span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeSpotlight() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              Conservation at a Glance
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] text-fog">
            Numbers that tell a story of{" "}
            <em className="text-gold-gradient not-italic">hope</em>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog/60 md:text-lg">
            Every figure below represents years of patient work — saplings
            nurtured through drought, camera traps checked at dawn, villages
            welcomed into the conservation fold. These are not abstract
            statistics; they are living proof that Vidarbha&apos;s forests are
            returning.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: "184K+", label: "Trees Restored", sub: "Since 2011" },
            { value: "38", label: "Tigers Tracked", sub: "Across reserves" },
            {
              value: "5,780",
              label: "Hectares Protected",
              sub: "Forest & wetland",
            },
            {
              value: "132",
              label: "Villages Engaged",
              sub: "Community partners",
            },
          ].map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card group rounded-2xl p-6 transition duration-500"
              >
                <div className="font-display text-4xl text-gold text-glow md:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 text-sm font-medium text-fog">
                  {s.label}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-fog/45">
                  {s.sub}
                </div>
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-gold/60 to-transparent transition-all duration-700 group-hover:w-full" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
