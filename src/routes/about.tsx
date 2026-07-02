import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Eye, Target, Heart, BarChart2, Sprout, Shield } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { Reveal } from "@/components/effects/Reveal";
import plantingImg from "@/assets/planting.jpg";
import canopyImg from "@/assets/canopy.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "About PSBS — Our Story, Mission & Team" }],
  }),
  component: AboutPage,
});

const stats = [
  { num: "184K+", label: "Trees Restored" },
  { num: "5,780 ha", label: "Forest Protected" },
  { num: "132", label: "Villages Engaged" },
  { num: "218+", label: "Species Cataloged" },
];

const values = [
  {
    icon: Heart,
    title: "Reverence",
    desc: "We approach every forest, every creature, and every community with deep respect — recognizing them as kin rather than resources to be managed.",
  },
  {
    icon: BarChart2,
    title: "Rigor",
    desc: "Our conservation decisions are grounded in scientific data: camera traps, vegetation indices, species surveys, and community-validated knowledge.",
  },
  {
    icon: Sprout,
    title: "Rootedness",
    desc: "We work where we live. PSBS is a Bhandara organization. Our team knows these forests, waterbodies, and communities by name and by season.",
  },
  {
    icon: Shield,
    title: "Resilience",
    desc: "Forests take centuries to grow. We think in generations, not financial quarters. Our commitment to Vidarbha is permanent.",
  },
];

const team = [
  {
    name: "Suhas Bandurkar",
    role: "Founder & President",
    bio: "Passionate forest conservationist with 20+ years of active field conservation in Vidarbha. Led landmark community conservation agreements in Bhandara and Gondia.",
  },
  {
    name: "Dr. Nikhil Kulkarni",
    role: "Secretary & Field Director",
    bio: "Wildlife biologist and camera-trap specialist. Has documented carnivore corridors and wildlife corridors across the central Indian landscape.",
  },
  {
    name: "Shalini Meshram",
    role: "Community Liaison",
    bio: "Speaks five regional dialects and bridges the gap between PSBS and 132 forest-edge villages. Trusted by gram sabhas for joint forest management programs.",
  },
  {
    name: "Amit Dongre",
    role: "Research Coordinator",
    bio: "Ornithologist and data scientist. Lead researcher on the Great Indian Hornbill Nesting Project and curator of the Vidarbha Biodiversity Database.",
  },
];

function AboutPage() {
  return (
    <>
      <Nav />
      <main className="relative min-h-screen bg-ink text-foreground page-enter">
      <SmoothScroll />
      <CursorGlow />

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-6 text-center max-w-4xl mx-auto">
        <Reveal>
          <h1 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[1.05] text-fog">
            Born from the forest,
            <br />
            built for its{" "}
            <em className="text-gold-gradient not-italic">future</em>.
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 text-lg md:text-xl text-fog/70 leading-relaxed max-w-2xl mx-auto">
            Paryavaran Bahu Uddeshiya Sanstha (PSBS) is a registered Wildlife,
            Forest, and Environment NGO operating from Bhandara, Maharashtra —
            the green heart of Vidarbha.
          </p>
        </Reveal>
      </section>

      {/* ── Story ── */}
      <section className="py-24 max-w-[1500px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-16 items-center">
        <Reveal className="lg:col-span-5" y={60}>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06]">
            <img
              src={plantingImg}
              alt="Volunteers planting saplings"
              className="h-[550px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
          </div>
        </Reveal>

        <div className="lg:col-span-7 space-y-6">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                Our Story
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl text-fog leading-[1.1]">
              A story written in roots and rain.
            </h2>
          </Reveal>
          <Reveal
            delay={0.2}
            className="space-y-6 text-base text-fog/65 leading-relaxed"
          >
            <p>
              PSBS was born not in a boardroom, but in a forest. In the winter
              of 2010, a small group of naturalists, students, and forest lovers
              gathered near the edge of Navegaon-Nagzira Tiger Reserve and made
              a quiet promise: to give back what was being taken.
            </p>
            <p>
              From our first plantation drive — 1,200 saplings in three degraded
              patches — to becoming a regional coordination hub for six forest
              divisions across Vidarbha, the growth of PSBS mirrors the growth
              of the very canopy we tend. Every tree tells a story of
              partnership: with the forest, with communities, with science.
            </p>
            <p>
              We operate at the intersection of ecology and empathy. Our field
              teams walk before dawn. Our community outreach reaches classrooms
              and village councils. Our data — camera traps, species surveys,
              phenology records — feeds real conservation policy at the state
              level.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="py-24 bg-canopy/20 border-y border-white/[0.04]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8">
          <Reveal>
            <div className="glass-card rounded-3xl p-10 h-full flex flex-col justify-between">
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 border border-gold/20 text-gold mb-6">
                  <Eye className="h-6 w-6" />
                </span>
                <h3 className="font-display text-3xl text-fog mb-4">
                  Our Vision
                </h3>
                <p className="text-fog/70 leading-relaxed">
                  A Vidarbha where tigers walk freely, rivers run clean, forests
                  breathe fully, and communities thrive in harmony with the wild
                  — a living landscape that inspires the world.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-card rounded-3xl p-10 h-full flex flex-col justify-between">
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald/10 border border-emerald/20 text-emerald mb-6">
                  <Target className="h-6 w-6" />
                </span>
                <h3 className="font-display text-3xl text-fog mb-4">
                  Our Mission
                </h3>
                <p className="text-fog/70 leading-relaxed">
                  To protect, restore and celebrate the biodiversity of central
                  India through science-driven conservation, inclusive community
                  action, and the cultivation of a deep, lasting reverence for
                  the natural world.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-24 max-w-[1500px] mx-auto px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              Our Anchors
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-fog mb-16">
            Values that guide our stride.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="glass-card rounded-3xl p-8 hover:-translate-y-1 transition duration-300">
                <v.icon className="h-8 w-8 text-gold mb-6" />
                <h3 className="font-display text-2xl text-fog mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-fog/60 leading-relaxed">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-24 bg-canopy/20 border-t border-white/[0.04]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                Guardians
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-fog mb-16">
              The people of the canopy.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className="glass-card rounded-3xl p-8 text-center flex flex-col items-center h-full">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald to-gold flex items-center justify-center font-display text-2xl text-ink font-bold mb-6">
                    {t.name[0]}
                  </div>
                  <h3 className="font-display text-xl text-fog">{t.name}</h3>
                  <div className="text-xs uppercase tracking-widest text-gold/80 mt-1">
                    {t.role}
                  </div>
                  <p className="text-sm text-fog/60 mt-4 leading-relaxed">
                    {t.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="py-16 border-y border-white/[0.06] bg-ink">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="font-display text-4xl md:text-5xl text-gold">
                {s.num}
              </div>
              <div className="text-xs uppercase tracking-widest text-fog/50 mt-2">
                {s.label}
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
