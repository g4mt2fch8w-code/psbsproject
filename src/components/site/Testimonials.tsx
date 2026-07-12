"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/effects/Reveal";

const testimonials = [
  {
    quote:
      "Coexistence is survival. We cannot protect the future of humanity without protecting the heartbeat of the wild. Every species has a role, every habitat holds a balance, and every action counts. Let’s protect the wild together—before it’s too late.",
    name: "Azhar Hussein",
    role: "NGO Founder",
  },
  {
    quote:
      "We don't inherit the earth just to conquer it; we share it to survive. The true measure of our progress isn't how much land we develop, but how much wild space we leave untouched. When we shield wildlife, we shield ourselves. Let's choose harmony over footprint, and build a world where nature doesn't just endure, but thrives alongside us.",
    name: "Mangesh Mhaske",
    role: "NGO Co-Founder",
  },
  {
    quote:
      "Being a member of this NGO proved to me that you can protect the wild from anywhere. Based in Mumbai, I serve as a tiger identifier, analyzing remote data to track and safeguard these incredible animals. It gives me immense pleasure and a deep sense of purpose to know that my work directly impacts their survival, even from a bustling city. This organization makes remote conservation seamless, transparent, and deeply rewarding.",
    name: "Harshil Jathan",
    role: "NGO Member, Mumbai",
  },
  {
    quote:
      "Through the lens, the wild speaks. My work is dedicated to capturing the raw, unfiltered beauty of the natural world—not just to document it, but to foster a deep connection between us and the species we share this planet with. Every image tells a story of survival, resilience, and the fragile balance of our ecosystems.",
    name: "Nihal Ganvir",
    role: "NGO Secretary",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              Voices from the Forest
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] text-fog">
            What the forest{" "}
            <em className="text-gold-gradient not-italic">means</em> to them.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: "easeOut" }}
              className="glass-card rounded-3xl p-10 relative overflow-hidden group hover:border-[color:var(--gold)]/35"
              whileHover={{
                y: -6,
                boxShadow: "var(--shadow-glow)",
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              {/* Subtle top-edge glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[color:var(--gold)]/5 via-transparent to-transparent" />

              {/* Decorative open-quote */}
              <span
                aria-hidden="true"
                className="font-display text-8xl leading-none text-[color:var(--gold)]/20 absolute top-4 left-6 select-none pointer-events-none"
                style={{ lineHeight: 1 }}
              >
                &ldquo;
              </span>

              {/* Quote */}
              <p className="text-lg text-[color:var(--fog)]/80 leading-relaxed relative z-10 mt-10">
                {t.quote}
              </p>

              {/* Divider */}
              <div className="mt-6 mb-4 h-px bg-gradient-to-r from-[color:var(--gold)]/30 via-[color:var(--gold)]/10 to-transparent" />

              {/* Attribution */}
              <div className="relative z-10">
                <p className="font-display text-xl text-[color:var(--gold)]">
                  {t.name}
                </p>
                <p className="text-xs uppercase tracking-widest text-[color:var(--fog)]/50 mt-1">
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
