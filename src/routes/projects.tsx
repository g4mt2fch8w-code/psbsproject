import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { Reveal } from "@/components/effects/Reveal";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [{ title: "Our Projects — Conservation Work · PSBS" }],
  }),
  component: ProjectsPage,
});

type ProjectStatus = "Active" | "Achieved" | "Planning";

const projects: {
  name: string;
  status: ProjectStatus;
  year: number;
  impact: string;
  unit: string;
  desc: string;
  note?: string;
}[] = [
  {
    name: "Navegaon-Nagzira Corridor",
    status: "Active",
    year: 2018,
    impact: "47,000",
    unit: "trees planted",
    desc: "Restoring the critical wildlife corridor between Navegaon and Nagzira Tiger Reserves through native species propagation, grassland recovery and anti-encroachment patrols.",
  },
  {
    name: "Koka Hornbill Survey",
    status: "Active",
    year: 2019,
    impact: "34",
    unit: "active nests",
    desc: "Long-term population monitoring of the Indian Grey Hornbill inside Koka Sanctuary — the only systematic hornbill census in Vidarbha.",
  },
  {
    name: "Gosikhurd Wetlands",
    status: "Achieved",
    year: 2021,
    impact: "189",
    unit: "km² protected",
    desc: "Advocacy and buffer-zone restoration around the Gosikhurd reservoir — now a Ramsar-recognised wetland supporting over 140 migratory bird species. Milestone reached 2023.",
  },
  {
    name: "Village Patrol Network",
    status: "Active",
    year: 2017,
    impact: "132",
    unit: "villages",
    desc: "Co-management patrols with forest-department personnel, training village eco-guards and installing rapid-response communication networks.",
    note: "Zero poaching incidents recorded in partner villages — 2024.",
  },
  {
    name: "Chota Tadoba Corridor",
    status: "Planning",
    year: 2025,
    impact: "300",
    unit: "km² potential",
    desc: "A proposed landscape-level corridor restoration connecting secondary forests south of Tadoba-Andhari, enabling safe tiger dispersal into Maharashtra's central plateau.",
  },
  {
    name: "School Forest Program",
    status: "Active",
    year: 2020,
    impact: "8,000",
    unit: "students reached",
    desc: "Hands-on forest education embedded in 40+ government schools — each school now maintains its own nursery and green patch as a living classroom.",
  },
];

const statusStyles: Record<ProjectStatus, string> = {
  Active: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  Achieved: "bg-gold/15 text-gold border border-gold/30",
  Planning: "bg-white/[0.06] text-fog/50 border border-white/10",
};

const goals = [
  { label: "Native Trees Planted", value: 184217, total: 250000, pct: 73 },
  { label: "Hectares Restored", value: 892, total: 1200, pct: 74 },
  { label: "Camera Trap Sites", value: 96, total: 120, pct: 80 },
  { label: "Partner Villages", value: 132, total: 150, pct: 88 },
  { label: "Students Reached", value: 8000, total: 10000, pct: 80 },
];

function fmt(n: number) {
  return n.toLocaleString("en-IN");
}

function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="relative min-h-screen bg-ink text-foreground page-enter">
      <SmoothScroll />
      <CursorGlow />

      {/* ── Hero ── */}
      <section className="pt-28 pb-20 px-6 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              Conservation Work
            </span>
            <div className="h-px w-10 bg-gold/60" />
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] text-fog leading-none mb-6">
            Every project is a{" "}
            <em className="text-gold-gradient not-italic">promise.</em>
          </h1>
          <p className="max-w-2xl mx-auto text-fog/60 text-lg leading-relaxed">
            From tiger corridor restoration to wetland advocacy, every PSBS
            program is rooted in community knowledge, scientific rigour and an
            unwavering belief that these landscapes can be healed.
          </p>
        </Reveal>
      </section>

      {/* ── Projects Grid ── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                Projects
              </span>
            </div>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className="glass-card rounded-3xl p-8 h-full flex flex-col gap-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-display text-2xl text-fog">
                      {p.name}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ${statusStyles[p.status]}`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <span className="text-xs text-fog/50">Since {p.year}</span>
                  <div className="font-display text-4xl text-gold">
                    {p.impact}{" "}
                    <span className="text-sm font-sans text-fog/50">
                      {p.unit}
                    </span>
                  </div>
                  <p className="text-sm text-fog/65 leading-relaxed flex-1">
                    {p.desc}
                  </p>
                  {p.note && (
                    <div className="text-xs text-emerald-400/80 border border-emerald-500/20 rounded-lg px-3 py-2">
                      ✦ {p.note}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Progress Bars ── */}
      <section className="py-24 px-6 bg-canopy/20">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                Progress
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-fog mb-12">
              Progress toward our goals.
            </h2>
          </Reveal>
          <div className="flex flex-col gap-8">
            {goals.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.06}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-fog">{g.label}</span>
                    <span className="text-xs text-fog/50">
                      {fmt(g.value)} / {fmt(g.total)}
                    </span>
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-500 to-gold rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${g.pct}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.2,
                        ease: "easeOut",
                        delay: i * 0.06,
                      }}
                    />
                  </div>
                  <div className="text-right text-xs text-gold/70 mt-1">
                    {g.pct}%
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-6">
        <Reveal>
          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                Get Involved
              </span>
              <div className="h-px w-10 bg-gold/60" />
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-fog mb-4">
              Power the next project.
            </h2>
            <p className="text-fog/60 max-w-xl mx-auto mb-10">
              These programs run because people like you choose to act. Fund a
              corridor. Plant a tree. Lend your time. Every contribution lands
              directly in the field.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/donate"
                className="rounded-xl bg-gradient-to-r from-gold to-amber-400 px-8 py-3 text-sm font-semibold text-ink hover:opacity-90 transition-opacity"
              >
                Donate Now
              </Link>
              <Link
                to="/volunteer"
                className="rounded-xl border border-white/20 px-8 py-3 text-sm text-fog hover:border-gold/40 hover:text-gold transition-colors"
              >
                Volunteer
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
    </>
  );
}
