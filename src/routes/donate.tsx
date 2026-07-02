import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout,
  Camera,
  Heart,
  Shield,
  Lock,
  Building2,
  FileText,
  Package,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { Reveal } from "@/components/effects/Reveal";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [{ title: "Donate — Support PSBS Conservation" }],
  }),
  component: DonatePage,
});

const impactTiers = [
  {
    icon: Sprout,
    amount: "₹500",
    desc: "Plants 5 native saplings with 2-year after-care monitoring.",
  },
  {
    icon: Camera,
    amount: "₹2,000",
    desc: "Funds one day of camera trap field deployment across reserve forests.",
  },
  {
    icon: Heart,
    amount: "₹10,000",
    desc: "Sponsors one Wildlife Rescue operation including treatment and release.",
  },
  {
    icon: Shield,
    amount: "₹50,000",
    desc: "Equips a Village Patrol Team for one full conservation season.",
  },
];

const tiers = [
  { label: "Seed", amount: "₹500/mo", value: 500 },
  { label: "Sapling", amount: "₹2,000/mo", value: 2000 },
  { label: "Guardian", amount: "₹10,000/mo", value: 10000 },
];

const otherWays = [
  {
    icon: Building2,
    title: "Bank Transfer",
    desc: "Direct NEFT / IMPS to our registered account.",
    detail: [
      "Account Name: PSBS Conservation Trust",
      "Account No: 0012 3456 7890",
      "IFSC: SBIN0001234",
      "Bank: State Bank of India, Nagpur",
    ],
  },
  {
    icon: FileText,
    title: "Cheque",
    desc: 'Send a crossed cheque payable to "PSBS Conservation Trust".',
    detail: [
      "PSBS Conservation Trust",
      "Plot 12, Forest Gate Colony",
      "Nagpur — 440 013, Maharashtra",
    ],
  },
  {
    icon: Package,
    title: "In-Kind",
    desc: "Donate field equipment, seeds, or educational materials.",
    detail: [
      "Email: inkind@psbs.org.in",
      "We accept: camera traps, binoculars, GPS units, nursery supplies, textbooks.",
    ],
  },
];

const DONUT_CX = 80;
const DONUT_CY = 80;
const DONUT_R = 54;
const DONUT_STROKE = 22;
const CIRCUMFERENCE = 2 * Math.PI * DONUT_R;

function DonutSlice({
  pct,
  offset,
  color,
  delay,
}: {
  pct: number;
  offset: number;
  color: string;
  delay: number;
}) {
  const dash = (pct / 100) * CIRCUMFERENCE;
  return (
    <motion.circle
      cx={DONUT_CX}
      cy={DONUT_CY}
      r={DONUT_R}
      fill="none"
      stroke={color}
      strokeWidth={DONUT_STROKE}
      strokeDasharray={`${dash} ${CIRCUMFERENCE}`}
      strokeDashoffset={-offset * CIRCUMFERENCE * 0.01}
      strokeLinecap="butt"
      transform={`rotate(-90 ${DONUT_CX} ${DONUT_CY})`}
      initial={{ strokeDasharray: `0 ${CIRCUMFERENCE}` }}
      whileInView={{ strokeDasharray: `${dash} ${CIRCUMFERENCE}` }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut", delay }}
    />
  );
}

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-ink/40 px-4 py-3 text-sm text-fog placeholder:text-fog/40 focus:border-gold/40 focus:outline-none";

function DonatePage() {
  const [selectedTier, setSelectedTier] = useState<number>(1); // default Sapling
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pan: "",
    frequency: "Monthly",
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

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
              Support Conservation
            </span>
            <div className="h-px w-10 bg-gold/60" />
          </div>
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] text-fog leading-none mb-6">
            Every rupee becomes{" "}
            <em className="text-gold-gradient not-italic">roots.</em>
          </h1>
          <p className="max-w-2xl mx-auto text-fog/60 text-lg leading-relaxed">
            Your donation funds tree planting, wildlife monitoring, rescue
            operations, and education for forest communities. 100% of public
            donations go to field programs.
          </p>
        </Reveal>
      </section>

      {/* ── Impact Tiers ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                Your Impact
              </span>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactTiers.map((t, i) => (
              <Reveal key={t.amount} delay={i * 0.08}>
                <div className="glass-card rounded-3xl p-8 h-full flex flex-col gap-4">
                  <t.icon className="w-8 h-8 text-gold" strokeWidth={1.5} />
                  <div className="font-display text-3xl text-gold">
                    {t.amount}
                  </div>
                  <p className="text-sm text-fog/60 leading-relaxed flex-1">
                    {t.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Donation Form ── */}
      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto">
          <Reveal>
            <div className="glass-card rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10 bg-gold/60" />
                <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                  Donate
                </span>
              </div>
              <h2 className="font-display text-3xl text-fog mb-8">
                Make a donation.
              </h2>

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="font-display text-2xl text-fog mb-2">
                      Thank you.
                    </h3>
                    <p className="text-sm text-fog/60">
                      We will reach out with payment details within 24 hours. An
                      80G receipt will follow once the transaction is confirmed.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    {/* Tier selection */}
                    <div className="flex gap-3 flex-wrap">
                      {tiers.map((t, i) => (
                        <button
                          type="button"
                          key={t.label}
                          onClick={() => setSelectedTier(i)}
                          className={`flex-1 rounded-xl px-4 py-3 text-sm transition-all border ${
                            selectedTier === i
                              ? "border-gold/60 bg-gold/10 text-gold"
                              : "border-white/[0.08] text-fog/60 hover:border-gold/30"
                          }`}
                        >
                          <div className="font-semibold">{t.label}</div>
                          <div className="text-xs opacity-70">{t.amount}</div>
                          {i === 1 && (
                            <div className="text-[9px] uppercase tracking-widest text-gold mt-1">
                              Recommended
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Custom amount */}
                    <input
                      className={inputCls}
                      type="number"
                      placeholder="Or enter custom amount (₹)"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedTier(-1);
                      }}
                      min={100}
                    />

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
                      placeholder="PAN (optional, for 80G)"
                      value={form.pan}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, pan: e.target.value }))
                      }
                    />
                    <select
                      className={inputCls}
                      value={form.frequency}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, frequency: e.target.value }))
                      }
                    >
                      <option>One-time</option>
                      <option>Monthly</option>
                    </select>

                    <p className="text-xs text-fog/40 leading-relaxed">
                      80G tax exemption receipt emailed within 24 hours of
                      confirmed payment.
                    </p>

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-gold to-amber-400 px-6 py-3 text-sm font-semibold text-ink hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      Proceed to Payment
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Other Ways to Give ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                Other Ways
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-fog mb-10">
              Other ways to give.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {otherWays.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="glass-card rounded-3xl p-8 h-full">
                  <w.icon
                    className="w-7 h-7 text-gold mb-4"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-display text-xl text-fog mb-2">
                    {w.title}
                  </h3>
                  <p className="text-sm text-fog/60 mb-4 leading-relaxed">
                    {w.desc}
                  </p>
                  <ul className="flex flex-col gap-1">
                    {w.detail.map((d, j) => (
                      <li
                        key={j}
                        className="text-xs text-fog/50 leading-relaxed"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transparency ── */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-10 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
                Transparency
              </span>
              <div className="h-px w-10 bg-gold/60" />
            </div>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-fog mb-6">
              Our commitment to transparency.
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 mb-16">
              {[
                "100% to field programs",
                "Annual financial reports published",
                "80G tax exemption",
              ].map((s) => (
                <div
                  key={s}
                  className="glass-card rounded-2xl px-6 py-5 text-sm text-fog/70"
                >
                  {s}
                </div>
              ))}
            </div>

            {/* Donut chart */}
            <div className="flex flex-col items-center gap-8">
              <svg
                width="160"
                height="160"
                viewBox="0 0 160 160"
                className="overflow-visible"
              >
                {/* Background ring */}
                <circle
                  cx={DONUT_CX}
                  cy={DONUT_CY}
                  r={DONUT_R}
                  fill="none"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth={DONUT_STROKE}
                />
                {/* Field Programs 85% — emerald */}
                <DonutSlice pct={85} offset={0} color="#34d399" delay={0.2} />
                {/* Research 10% — gold */}
                <DonutSlice pct={10} offset={85} color="#d4a853" delay={0.5} />
                {/* Administration 5% — fog/30 */}
                <DonutSlice
                  pct={5}
                  offset={95}
                  color="rgba(204,204,187,0.3)"
                  delay={0.7}
                />
                {/* Centre text */}
                <text
                  x={DONUT_CX}
                  y={DONUT_CY - 6}
                  textAnchor="middle"
                  className="fill-fog font-display"
                  fontSize="18"
                  fontFamily="inherit"
                >
                  85%
                </text>
                <text
                  x={DONUT_CX}
                  y={DONUT_CY + 12}
                  textAnchor="middle"
                  fill="rgba(204,204,187,0.5)"
                  fontSize="9"
                  fontFamily="inherit"
                >
                  FIELD
                </text>
              </svg>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-6 text-xs text-fog/60">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                  Field Programs — 85%
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gold inline-block" />
                  Research — 10%
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full inline-block"
                    style={{ background: "rgba(204,204,187,0.3)" }}
                  />
                  Administration — 5%
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
    </>
  );
}
