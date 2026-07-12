import { Reveal } from "@/components/effects/Reveal";
import { motion } from "framer-motion";
import { ClientOnly } from "@/components/effects/ClientOnly";
import { Suspense } from "react";

export interface WildlifeData {
  label: string;
  value: number;
  max: number;
  color: string;
}

export interface DataVizProps {
  eyebrow?: string;
  headingPart1?: string;
  headingHighlight?: string;
  headingPart2?: string;
  treesRestoredTitle?: string;
  treesRestoredValue?: string;
  treesRestoredBadge?: string;
  treesGrowthData?: number[];
  wildlifeCensusTitle?: string;
  wildlifeCensusSubtitle?: string;
  wildlifeData?: WildlifeData[];
}

const defaultGrowth = [12, 18, 22, 30, 36, 45, 58, 72, 88, 102, 124, 148, 168, 184];
const defaultWildlife = [
  { label: "Tigers", value: 38, max: 50, color: "#C9A13B" },
  { label: "Leopards", value: 22, max: 50, color: "#F0D87A" },
  { label: "Hornbills", value: 210, max: 250, color: "#2E7D32" },
  { label: "Spotted Deer", value: 4200, max: 5000, color: "#0F3B1D" },
];

function AreaChart({ growth = defaultGrowth }: { growth?: number[] }) {
  const w = 600;
  const h = 240;
  const max = Math.max(...growth);
  const points = growth.map((v, i) => [
    (i / (growth.length - 1)) * w,
    h - (v / max) * (h - 30) - 10,
  ]);
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`)
    .join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id="area-g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#C9A13B" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2E7D32" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="line-g" x1="0" x2="1">
          <stop offset="0" stopColor="#F0D87A" />
          <stop offset="1" stopColor="#2E7D32" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((p) => (
        <line
          key={p}
          x1="0"
          x2={w}
          y1={p * h}
          y2={p * h}
          stroke="rgba(255,255,255,0.05)"
        />
      ))}
      <motion.path
        d={area}
        fill="url(#area-g)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="url(#line-g)"
        strokeWidth="2.5"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p[0]}
          cy={p[1]}
          r="3"
          fill="#F0D87A"
          opacity="0.9"
          style={{ filter: "drop-shadow(0 0 6px #C9A13B)" }}
        />
      ))}
    </svg>
  );
}

export function DataViz({
  eyebrow = "Conservation Dashboard",
  headingPart1 = "A canopy ",
  headingHighlight = "measured",
  headingPart2 = ",\nseason by season.",
  treesRestoredTitle = "Trees Restored",
  treesRestoredValue = "184,217",
  treesRestoredBadge = "+38% YoY",
  treesGrowthData = defaultGrowth,
  wildlifeCensusTitle = "Wildlife Census",
  wildlifeCensusSubtitle = "Population snapshot",
  wildlifeData = defaultWildlife
}: DataVizProps) {
  return (
    <section id="dataviz" className="relative overflow-hidden border-y border-white/[0.06] bg-canopy/30 py-32 md:py-44">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-ink/90 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              {eyebrow}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.02] text-fog whitespace-pre-wrap">
            {headingPart1}<em className="text-gold-gradient not-italic">{headingHighlight}</em>
            {headingPart2}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {/* Growth chart */}
          <Reveal className="lg:col-span-2">
            <div className="glass-card relative h-full overflow-hidden rounded-3xl p-5 md:p-8">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-fog/50">
                    {treesRestoredTitle}
                  </div>
                  <div className="mt-2 font-display text-5xl text-fog text-glow">
                    {treesRestoredValue}
                  </div>
                </div>
                <div className="rounded-full border border-emerald/30 bg-emerald/10 px-3 py-1 text-xs text-emerald">
                  {treesRestoredBadge}
                </div>
              </div>
              <div className="mt-8 h-48 md:h-64">
                <AreaChart growth={treesGrowthData} />
              </div>
              <div className="mt-4 flex justify-between text-[10px] uppercase tracking-[0.3em] text-fog/40">
                <span>2022</span>
                <span>2023</span>
                <span>2024</span>
                <span>2025</span>
                <span>2026</span>
              </div>
            </div>
          </Reveal>

          {/* Wildlife bars */}
          <Reveal delay={0.1}>
            <div className="glass-card h-full rounded-3xl p-5 md:p-8">
              <div className="text-[10px] uppercase tracking-[0.3em] text-fog/50">
                {wildlifeCensusTitle}
              </div>
              <div className="mt-2 font-display text-3xl text-fog">
                {wildlifeCensusSubtitle}
              </div>
              <ul className="mt-8 space-y-6">
                {wildlifeData.map((w, i) => (
                  <li key={w.label}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-fog/80">{w.label}</span>
                      <span className="font-display text-lg text-gold">
                        {w.value.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(w.value / w.max) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.4,
                          delay: 0.2 + i * 0.1,
                          ease: "easeOut",
                        }}
                        className="block h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${w.color}, #F0D87A)`,
                          boxShadow: `0 0 12px ${w.color}`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
