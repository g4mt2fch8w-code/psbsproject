import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Youtube,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { Reveal } from "@/components/effects/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [{ title: "Contact PSBS — Get in Touch" }],
  }),
  component: ContactPage,
});

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-ink/40 px-4 py-3 text-sm text-fog placeholder:text-fog/40 focus:border-gold/40 focus:outline-none transition duration-300";

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated submission success
    setSubmitted(true);
  };

  return (
    <>
      <Nav />
      <main className="relative min-h-screen bg-ink text-foreground page-enter">
      <SmoothScroll />
      <CursorGlow />

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 px-6 text-center max-w-4xl mx-auto">
        <Reveal>
          <h1 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[1.05] text-fog">
            Walk with us.
            <br />
            <em className="text-gold-gradient not-italic">Write to us.</em>
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 text-lg md:text-xl text-fog/70 leading-relaxed max-w-2xl mx-auto">
            Whether you want to volunteer, collaborate on research, support our
            work, or simply learn more — we would love to hear from you.
          </p>
        </Reveal>
      </section>

      {/* ── Main Grid ── */}
      <section className="py-16 max-w-[1500px] mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12">
        {/* Left Side: Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <Reveal>
            <div className="glass-card rounded-2xl p-8 flex items-start gap-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/10 border border-gold/20 text-gold shrink-0">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-xl text-fog mb-2">
                  Office Location
                </h3>
                <p className="text-sm text-fog/60 leading-relaxed">
                  PSBS Office, Bhandara, Maharashtra — 441904.
                  <br />
                  Located near Navegaon-Nagzira Tiger Reserve corridor,
                  Vidarbha, India.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass-card rounded-2xl p-8 flex items-start gap-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald/10 border border-emerald/20 text-emerald shrink-0">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-xl text-fog mb-2">Emails</h3>
                <p className="text-sm text-fog/60 leading-relaxed">
                  General:{" "}
                  <a
                    href="mailto:info@psbsbhandara.org"
                    className="text-gold/80 hover:text-gold"
                  >
                    info@psbsbhandara.org
                  </a>
                  <br />
                  Field Desk:{" "}
                  <a
                    href="mailto:psbs@forest.in"
                    className="text-gold/80 hover:text-gold"
                  >
                    psbs@forest.in
                  </a>
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="glass-card rounded-2xl p-8 flex items-start gap-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold/10 border border-gold/20 text-gold shrink-0">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-xl text-fog mb-2">
                  Phone Lines
                </h3>
                <p className="text-sm text-fog/60 leading-relaxed">
                  Helpline: +91-7184-252101
                  <br />
                  Field Office: +91-9890XXXXXX (Mon–Sat, 9am–6pm IST)
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="glass-card rounded-2xl p-8 flex items-start gap-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald/10 border border-emerald/20 text-emerald shrink-0">
                <Instagram className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-xl text-fog mb-2">
                  Social Communities
                </h3>
                <p className="text-sm text-fog/60 mb-4">
                  Follow our live updates and conservation journals from the
                  field.
                </p>
                <div className="flex gap-3">
                  {[Instagram, Twitter, Youtube].map((Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-fog/60 hover:border-gold/40 hover:text-gold transition duration-300"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-fog/60">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder="Priya Deshpande"
                          className={inputCls}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-fog/60">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          placeholder="priya@example.com"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-fog/60">
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          placeholder="+91 98765 43210"
                          className={inputCls}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-fog/60">
                          Subject
                        </label>
                        <select
                          value={form.subject}
                          onChange={(e) =>
                            setForm({ ...form, subject: e.target.value })
                          }
                          className={inputCls}
                        >
                          <option>Volunteering</option>
                          <option>Research Collaboration</option>
                          <option>Donation</option>
                          <option>Media Inquiry</option>
                          <option>Schools & Education</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-fog/60">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder="Tell us what you would like to collaborate on..."
                        className={inputCls}
                      />
                    </div>

                    <button
                      type="submit"
                      className="group flex items-center justify-center gap-3 rounded-xl px-7 py-4 text-sm font-medium text-ink transition hover:translate-y-[-2px] w-full"
                      style={{
                        background: "var(--gradient-gold)",
                        boxShadow: "var(--shadow-glow)",
                      }}
                    >
                      Send Message
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center space-y-6"
                  >
                    <div className="mx-auto w-16 h-16 rounded-full bg-emerald/10 border border-emerald/30 flex items-center justify-center text-emerald">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-3xl text-fog">
                        Message Received
                      </h3>
                      <p className="text-sm text-fog/60 max-w-sm mx-auto">
                        Thank you for reaching out to PSBS Bhandara. A team
                        member from the appropriate desk will respond to you
                        within 48 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          subject: "General Inquiry",
                          message: "",
                        });
                      }}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold/80 hover:text-gold"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Map Section ── */}
      <section className="py-16 max-w-[1500px] mx-auto px-6 md:px-12">
        <Reveal>
          <div className="rounded-3xl border border-gold/20 bg-canopy/30 h-80 flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 border border-gold/20 text-gold mb-4 z-10">
              <MapPin className="h-6 w-6" />
            </span>
            <h3 className="font-display text-2xl text-fog mb-2 z-10">
              Bhandara, Maharashtra, India
            </h3>
            <p className="text-sm text-fog/50 max-w-sm z-10">
              Coordinates: 21.1702° N, 79.6495° E<br />
              Ideally situated within reach of Navegaon, Koka, and Nagzira
              forest reserves.
            </p>
            {/* Visual background pattern */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(var(--gold) 1.5px, transparent 1.5px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
    </>
  );
}
