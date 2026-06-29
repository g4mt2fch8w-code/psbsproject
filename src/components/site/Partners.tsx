"use client";

import { useRef } from "react";
import { Reveal } from "@/components/effects/Reveal";

const partners = [
  "Maharashtra Forest Department",
  "Wildlife Institute of India",
  "Bombay Natural History Society",
  "WWF India",
  "Wildlife Trust of India",
  "National Tiger Conservation Authority",
  "UNDP GEF Small Grants",
  "Tata Trusts",
  "Vidarbha Nature Conservation Society",
  "Nagpur University",
];

export function Partners() {
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = "paused";
    }
  };

  const handleMouseLeave = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <section className="relative overflow-hidden py-24 border-y border-white/[0.06] bg-[color:var(--canopy)]/10">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">Support Network</span>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] text-fog">
            Allies in the <em className="text-gold-gradient not-italic">canopy</em>.
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mt-6 max-w-xl text-[color:var(--fog)]/55 leading-relaxed">
            Conservation at scale requires many hands. These organizations walk alongside us — in policy, science, funding, and fieldwork.
          </p>
        </Reveal>

        {/* Marquee Wrapper */}
        <div
          className="relative mt-16 overflow-hidden w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            maskImage:
              "linear-gradient(to right, transparent, white 15%, white 85%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, white 15%, white 85%, transparent)",
          }}
        >
          <div
            ref={trackRef}
            className="marquee-track"
            style={{
              display: "flex",
              gap: "1.5rem",
              width: "fit-content",
              animationPlayState: "running",
            }}
          >
            {/* Render partners twice for seamless loop */}
            {[...partners, ...partners].map((partner, i) => (
              <span
                key={`${partner}-${i}`}
                className="border border-[color:var(--gold)]/20 bg-[color:var(--canopy)]/40 backdrop-blur text-[color:var(--fog)]/70 text-sm tracking-wide px-6 py-3 rounded-full whitespace-nowrap inline-block transition-all duration-300 hover:border-[color:var(--gold)]/50 hover:text-[color:var(--fog)] hover:bg-[color:var(--canopy)]/70 cursor-default"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee keyframes injected via style tag for portability */}
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 32s linear infinite;
        }
      `}</style>
    </section>
  );
}
