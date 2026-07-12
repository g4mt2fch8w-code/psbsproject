import { Reveal } from "@/components/effects/Reveal";
import { useEffect, useRef, useState, Suspense } from "react";
import { useInView, motion, useSpring, useMotionValue } from "framer-motion";
import { ClientOnly } from "../effects/ClientOnly";

export interface StatData {
  label: string;
  stringValue?: string;
  value?: number;
  suffix?: string;
}

export interface ImpactProps {
  eyebrow?: string;
  headingPart1?: string;
  headingHighlight?: string;
  headingPart2?: string;
  statsData?: StatData[];
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 2200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Impact({
  eyebrow = "Measured in Heartbeats",
  headingPart1 = "Conservation, in ",
  headingHighlight = "numbers",
  headingPart2 = " that breathe.",
  statsData = [
    { stringValue: "Banyan, Neem, Pipal...", label: "Native Trees Restored" },
    { stringValue: "A lot of :)", label: "Hectares Protected" },
    { value: 150, suffix: "+", label: "Wildlife Initiatives" },
    { value: 250, suffix: "+", label: "Villages Engaged" },
    { value: 160, suffix: "+", label: "Camera Traps" },
    { stringValue: "~200", label: "Species Documented" },
  ]
}: ImpactProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="impact" ref={containerRef} className="relative overflow-hidden py-32 md:py-44">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(15,59,29,0.25), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              {eyebrow}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] text-fog whitespace-pre-wrap">
            {headingPart1}
            <em className="text-gold-gradient not-italic">{headingHighlight}</em>
            {headingPart2}
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3">
          {statsData.map((s, i) => {
            const viewRef = useRef<HTMLDivElement>(null);
            const x = useMotionValue(0);
            const y = useMotionValue(0);
            const springX = useSpring(x, { stiffness: 100, damping: 30 });
            const springY = useSpring(y, { stiffness: 100, damping: 30 });

            function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
              const rect = event.currentTarget.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              x.set((event.clientX - centerX) / (rect.width / 2));
              y.set((event.clientY - centerY) / (rect.height / 2));
            }

            function handleMouseLeave() {
              x.set(0);
              y.set(0);
            }

            return (
              <Reveal key={s.label} delay={i * 0.07}>
                <motion.div
                  className="group relative h-full bg-ink/80 p-10 transition duration-500 hover:bg-canopy/60"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    rotateX: useSpring(useMotionValue(0), { stiffness: 100, damping: 30 }), // Placeholder for actual logic if needed
                    transformStyle: "preserve-3d"
                  }}
                >

                  <motion.div
                    className="relative z-10"
                    style={{
                      x: springX,
                      y: springY,
                    }}
                  >
                    <span className={`block font-display leading-none text-fog text-glow ${s.stringValue ? 'text-[clamp(1.8rem,3vw,3rem)]' : 'text-[clamp(2.5rem,5vw,4.5rem)]'}`}>
                      {s.stringValue ? s.stringValue : <Counter value={s.value || 0} suffix={s.suffix || ""} />}
                    </span>
                    <span className="mt-4 block text-xs uppercase tracking-[0.3em] text-fog/55">
                      {s.label}
                    </span>
                  </motion.div>
                  <span className="absolute inset-x-10 bottom-6 h-px scale-x-0 bg-gradient-to-r from-gold/60 to-transparent transition duration-700 group-hover:scale-x-100 origin-left" />
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>

    </section>
  );
}
