import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-forest.jpg";
import { Fireflies } from "@/components/effects/Fireflies";
import { ForestScene } from "@/components/effects/ForestScene";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "140%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] min-h-[720px] w-full overflow-hidden"
    >
      {/* Layer 1: Galaxy / deep gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, #0a1a10 0%, #050505 60%), #050505",
        }}
      />

      {/* Layer 2: Forest photo with parallax */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Misty forest at sunrise in Vidarbha"
          width={1920}
          height={1280}
          className="h-[120%] w-full object-cover opacity-[0.55]"
          style={{ filter: "saturate(0.9) contrast(1.05)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.2) 35%, rgba(5,5,5,0.6) 80%, #050505 100%)",
          }}
        />
      </motion.div>

      {/* Layer 3: gold light shafts */}
      <motion.div
        style={{ y: y2 }}
        className="absolute inset-0 mix-blend-screen opacity-60"
      >
        <div
          className="absolute left-[40%] top-0 h-full w-[30%] -rotate-6"
          style={{
            background:
              "linear-gradient(180deg, rgba(240,216,122,0.18), transparent 70%)",
          }}
        />
        <div
          className="absolute left-[60%] top-0 h-full w-[18%] rotate-3"
          style={{
            background:
              "linear-gradient(180deg, rgba(201,161,59,0.15), transparent 60%)",
          }}
        />
      </motion.div>

      {/* Layer 4: 3D particle field */}
      <div className="absolute inset-0 opacity-80">
        <ForestScene />
      </div>

      {/* Layer 5: Fireflies */}
      <Fireflies density={70} />

      {/* Layer 6: tree silhouette */}
      <svg
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-[28%] w-full text-ink"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0,300 L0,140 C40,120 70,160 110,140 C150,90 180,170 220,150 C260,80 300,180 340,150 C380,100 420,170 460,140 C500,90 540,180 580,150 C620,100 660,170 700,140 C740,90 780,180 820,150 C860,100 900,170 940,140 C980,90 1020,180 1060,150 C1100,100 1140,170 1180,140 C1220,90 1260,180 1300,150 C1340,100 1380,170 1440,140 L1440,300 Z"
        />
      </svg>

      {/* Noise */}
      <div className="noise-overlay absolute inset-0" />

      {/* Content */}
      <motion.div
        style={{ y: yText, opacity, rotateX, scale, perspective: 1000 }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 md:px-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-12 bg-gold/60" />
          <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
            Paryavaran Bahu Uddeshiya Sanstha
          </span>
        </motion.div>

        <h1 className="mt-8 max-w-[15ch] font-display text-[clamp(3.5rem,9vw,9.5rem)] leading-[0.95] tracking-tight text-fog">
          {["Protecting", "Forests.", "Preserving", "Futures."].map((w, i) => (
            <motion.span
              key={w + i}
              initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.2,
                delay: 0.4 + i * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={
                "block " +
                (i === 1 || i === 3 ? "text-gold-gradient italic" : "")
              }
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-10 max-w-xl text-base leading-relaxed text-fog/70 md:text-lg"
        >
          A movement born in the wild heart of Bhandara — restoring forests,
          protecting wildlife, and walking alongside the communities who call
          these lands home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#mission"
            className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-medium text-ink transition hover:translate-y-[-2px]"
            style={{
              background: "var(--gradient-gold)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            Begin the Journey
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
          <a
            href="#impact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm text-fog/90 backdrop-blur transition hover:border-gold/40 hover:bg-white/[0.06]"
          >
            See our Impact
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <span className="block text-[10px] uppercase tracking-[0.4em] text-fog/50">
          Enter the forest
        </span>
        <ChevronDown className="mx-auto mt-2 h-4 w-4 animate-bounce text-gold/70" />
      </motion.div>
    </section>
  );
}
