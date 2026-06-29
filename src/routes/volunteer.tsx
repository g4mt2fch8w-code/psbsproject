import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Leaf,
  Users,
  Camera,
  BookOpen,
  Award,
  TreePine,
  Eye,
  Waves,
  Shield,
  ChevronDown,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { Reveal } from "@/components/effects/Reveal";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [{ title: "Volunteer — Join the Mission · PSBS" }],
  }),
  component: VolunteerPage,
});

const benefits = [
  {
    icon: Compass,
    title: "Field Skills",
    desc: "Camera trapping, pugmark casting, bird census, vegetation transects — real conservation fieldcraft.",
  },
  {
    icon: Leaf,
    title: "Real Impact",
    desc: "Your work directly protects corridors used by tigers, leopards and over 218 species in Vidarbha.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Work alongside village guardians who have protected these forests for generations.",
  },
  {
    icon: Camera,
    title: "Science",
    desc: "Help collect data that informs state-level conservation policy and published research.",
  },
  {
    icon: BookOpen,
    title: "Growth",
    desc: "Time in old-growth forest recalibrates everything. People come back different.",
  },
  {
    icon: Award,
    title: "Recognition",
    desc: "Field certificates, PSBS alumni network, letters of recommendation for students.",
  },
];

const activities = [
  {
    icon: TreePine,
    title: "Tree Plantation",
    desc: "Propagation, planting and after-care of native species across degraded patches.",
    freq: "Monthly",
  },
  {
    icon: Eye,
    title: "Wildlife Surveys",
    desc: "Dawn transects for ungulate, bird and predator sign surveys across reserve forests.",
    freq: "Seasonal",
  },
  {
    icon: Camera,
    title: "Camera Traps",
    desc: "Deployment, retrieval and maintenance across 96 camera sites in 4 reserves.",
    freq: "Quarterly",
  },
  {
    icon: BookOpen,
    title: "School Outreach",
    desc: "Environmental education in 40+ partner schools, interactive forest walks.",
    freq: "Weekly",
  },
  {
    icon: Waves,
    title: "Wetland Clean-up",
    desc: "Seasonal clean-up of Gosikhurd wetland buffer zones and river banks.",
    freq: "Seasonal",
  },
  {
    icon: Shield,
    title: "Community Patrol",
    desc: "Night patrol training and coordination with forest department in partner villages.",
    freq: "Monthly",
  },
];

const steps = [
  {
    n: 1,
    title: "Apply",
    desc: "Fill the form below with your details and motivation.",
  },
  {
    n: 2,
    title: "Orientation",
    desc: "Join a virtual call with our field director to learn the ropes.",
  },
  {
    n: 3,
    title: "Field Induction",
    desc: "Attend a half-day forest walk with the PSBS field team.",
  },
  {
    n: 4,
    title: "Active Volunteer",
    desc: "You are in — join our programs and protect Vidarbha.",
  },
];

const faqs = [
  {
    q: "Do I need prior experience?",
    a: "No prior conservation experience is required. We train all volunteers from the ground up during the induction. Curiosity and commitment are the only prerequisites.",
  },
  {
    q: "Is there any fee?",
    a: "There is no fee to volunteer. For field programs that involve accommodation and travel into reserve areas, a modest cost-sharing contribution may apply, which we communicate clearly in advance.",
  },
  {
    q: "What is the minimum commitment?",
    a: "We ask for a minimum of one full day per month for local volunteers and at least three consecutive days for those joining field expeditions. Long-term volunteers are always welcome.",
  },
  {
    q: "Can students get certificates?",
    a: "Yes. Students completing 30+ hours of field or outreach work receive a PSBS Field Certificate and, where applicable, a letter of recommendation signed by our field director.",
  },
  {
    q: "Is accommodation provided for field trips?",
    a: "Basic accommodation in forest rest houses or partner village homestays is arranged for multi-day programs. Details and any associated costs are shared well in advance.",
  },
];

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-ink/40 px-4 py-3 text-sm text-fog placeholder:text-fog/40 focus:border-gold/40 focus:outline-none";

function VolunteerPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    age: "",
    occupation: "",
    availability: "",
    motivation: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-ink text-foreground page-enter">
      <SmoothScroll />
      <CursorGlow />
      <Nav />

      {/* ── Hero ── */}
      <section className="pt-28 pb-20 px-6 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              Join the Mission
            </span>
            <div className="h-px w-10 bg-gold/60" />
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] text-fog leading-none mb-6">
            Walk before dawn.{" "}
            <em className="text-gold-gradient not-italic">Change the world.</em>
          </h1>
          <p className="max-w-2xl mx-auto text-fog/60 text-lg leading-relaxed">
            Volunteering with PSBS is not sitting in an office. It is waking at
            4am to the sound of a tiger. Planting a sapling that will outlive
            you. Education that walks back into the forest.
          </p>
        </Reveal>
      </section>

      {/* ── Benefits Grid ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                Benefits
              </span>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.07}>
                <div className="glass-card rounded-3xl p-8 h-full">
                  <b.icon
                    className="w-8 h-8 text-gold mb-4"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-display text-xl text-fog mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-fog/60 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Activities ── */}
      <section className="py-24 px-6 bg-canopy/20">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                Activities
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-fog mb-12">
              What you will do.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.07}>
                <div className="glass-card rounded-3xl p-6 h-full flex flex-col">
                  <a.icon
                    className="w-7 h-7 text-gold mb-4"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-display text-2xl text-fog mb-2">
                    {a.title}
                  </h3>
                  <p className="text-sm text-fog/60 leading-relaxed flex-1">
                    {a.desc}
                  </p>
                  <span className="text-[10px] uppercase text-gold/70 border border-gold/20 rounded-full px-3 py-1 mt-4 inline-block w-fit">
                    {a.freq}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Steps ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                Process
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-fog mb-12">
              How to join.
            </h2>
          </Reveal>
          <div className="flex flex-col md:flex-row gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1} className="flex-1">
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center font-display text-xl text-gold">
                    {s.n}
                  </div>
                  <h3 className="font-display text-xl text-fog">{s.title}</h3>
                  <p className="text-sm text-fog/60 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form ── */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <div className="glass-card rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-gold/60" />
                <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                  Sign up
                </span>
              </div>
              <h2 className="font-display text-3xl text-fog mb-8">
                Register as a volunteer
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl text-fog mb-2">
                    Welcome to the mission.
                  </h3>
                  <p className="text-sm text-fog/60">
                    We'll be in touch within 48 hours. Check your email for next
                    steps.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <input
                    className={inputCls}
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                  />
                  <input
                    className={inputCls}
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    required
                  />
                  <input
                    className={inputCls}
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                  />
                  <input
                    className={inputCls}
                    placeholder="City / Town"
                    value={form.city}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, city: e.target.value }))
                    }
                  />
                  <select
                    className={inputCls}
                    value={form.age}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, age: e.target.value }))
                    }
                  >
                    <option value="" disabled>
                      Age Group
                    </option>
                    <option>18–25</option>
                    <option>26–35</option>
                    <option>36–50</option>
                    <option>50+</option>
                  </select>
                  <input
                    className={inputCls}
                    placeholder="Occupation"
                    value={form.occupation}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, occupation: e.target.value }))
                    }
                  />
                  <select
                    className={`${inputCls} sm:col-span-2`}
                    value={form.availability}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, availability: e.target.value }))
                    }
                  >
                    <option value="" disabled>
                      Availability
                    </option>
                    <option>Weekends Only</option>
                    <option>Full Weeks</option>
                    <option>Specific Events</option>
                    <option>Long-term</option>
                  </select>
                  <textarea
                    className={`${inputCls} sm:col-span-2`}
                    rows={4}
                    placeholder="Why do you want to volunteer with PSBS?"
                    value={form.motivation}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, motivation: e.target.value }))
                    }
                  />
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-gold to-amber-400 px-6 py-3 text-sm font-semibold text-ink hover:opacity-90 transition-opacity"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                FAQ
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-fog mb-10">
              Common questions.
            </h2>
          </Reveal>
          <div className="flex flex-col divide-y divide-white/[0.06]">
            {faqs.map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  className="flex items-center justify-between w-full text-left group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-display text-lg text-fog group-hover:text-gold transition-colors">
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-4 shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gold/60" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-sm text-fog/60 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
