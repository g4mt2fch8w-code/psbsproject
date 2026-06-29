import { motion } from "framer-motion";

const orbs = [
  { size: 280, x: "10%", y: "20%", delay: 0, color: "var(--emerald)" },
  { size: 200, x: "75%", y: "15%", delay: 1.2, color: "var(--gold)" },
  { size: 160, x: "60%", y: "70%", delay: 0.6, color: "var(--emerald-deep)" },
  { size: 120, x: "20%", y: "75%", delay: 1.8, color: "var(--gold-soft)" },
];

export function FloatingOrbs() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-[0.12]"
          style={{
            width: o.size,
            height: o.size,
            left: o.x,
            top: o.y,
            background: `radial-gradient(circle, color-mix(in oklab, ${o.color} 60%, transparent), transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: o.delay,
          }}
        />
      ))}
    </div>
  );
}
