"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Reveal } from "@/components/effects/Reveal";

const milestones = [
  {
    year: "2010",
    title: "PSBS Founded",
    body: "Born from a single forest walk in Bhandara district by naturalists who refused to watch the forests disappear.",
  },
  {
    year: "2011",
    title: "First Plantation Drive",
    body: "1,200 native saplings planted across three degraded patches near Navegaon. The beginning of something larger.",
  },
  {
    year: "2013",
    title: "Wildlife Rescue Unit",
    body: "A rapid-response team formed after a leopard cub was found injured near Tumsar. We never stopped rescuing since.",
  },
  {
    year: "2015",
    title: "Camera Trap Network",
    body: "24 camera traps deployed across Nagzira, revealing a tiger corridor that had been unmapped for decades.",
  },
  {
    year: "2017",
    title: "Mendha Partnership",
    body: "Collaborative conservation agreement with Mendha-Lekha village: the first community-led tiger patrol in Vidarbha.",
  },
  {
    year: "2019",
    title: "Hornbill Project",
    body: "A dedicated study of Indian Hornbill nesting sites in Koka Sanctuary, published in partnership with BNHS.",
  },
  {
    year: "2021",
    title: "One Lakh Trees",
    body: "The milestone. 100,000 saplings. The forest was answering back.",
  },
  {
    year: "2023",
    title: "Gosikhurd Wetland Protection",
    body: "Successfully lobbied for protected status of 189 km² of wetlands surrounding Gosikhurd dam.",
  },
  {
    year: "2025",
    title: "Regional Conservation Hub",
    body: "PSBS becomes a coordination hub for 6 forest divisions across Vidarbha, linking 132 villages.",
  },
];

function AnimatedLine() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <svg
      ref={ref}
      className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 z-0 overflow-visible"
      height="100%"
    >
      <motion.line
        x1="2"
        y1="0"
        x2="2"
        y2="100%"
        stroke="var(--color-gold)"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0.1 }}
        animate={inView ? { pathLength: 1, opacity: 0.45 } : {}}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function Timeline() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--canopy)]/20 py-32 md:py-44 border-y border-white/[0.04]">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              Our Journey
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] text-fog">
            A decade of roots{" "}
            <em className="text-gold-gradient not-italic">and growth</em>.
          </h2>
        </Reveal>

        <div className="relative mt-24">
          {/* Centered Line */}
          <AnimatedLine />

          {/* Timeline Nodes */}
          <div className="relative z-10 space-y-16">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                  className="flex items-start w-full"
                >
                  {/* Left column — year on even, body on odd */}
                  <div className="w-1/2 pr-8 text-right flex flex-col justify-start">
                    {isLeft ? (
                      <span className="font-display text-2xl text-[color:var(--gold)] leading-none pt-1">
                        {m.year}
                      </span>
                    ) : (
                      <div className="pt-1">
                        <p className="font-display text-xl text-[color:var(--fog)] leading-snug mb-1">
                          {m.title}
                        </p>
                        <p className="text-sm text-[color:var(--fog)]/60 leading-relaxed">
                          {m.body}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center Dot */}
                  <div className="relative w-8 flex justify-center pt-2">
                    <motion.span
                      className="block h-3.5 w-3.5 rounded-full bg-[color:var(--gold)] shadow-[0_0_16px_2px_rgba(201,161,59,0.5)] border-2 border-[color:var(--ink)]"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.08 + 0.3,
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                      }}
                    />
                  </div>

                  {/* Right column — body on even, year on odd */}
                  <div className="w-1/2 pl-8 flex flex-col justify-start">
                    {!isLeft ? (
                      <span className="font-display text-2xl text-[color:var(--gold)] leading-none pt-1">
                        {m.year}
                      </span>
                    ) : (
                      <div className="pt-1">
                        <p className="font-display text-xl text-[color:var(--fog)] leading-snug mb-1">
                          {m.title}
                        </p>
                        <p className="text-sm text-[color:var(--fog)]/60 leading-relaxed">
                          {m.body}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
