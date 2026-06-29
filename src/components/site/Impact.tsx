import { Reveal } from "@/components/effects/Reveal";
import { useEffect, useRef, useState, Suspense } from "react";
import { useInView, motion, useSpring, useMotionValue } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { View, Float, Preload } from "@react-three/drei";
import { ClientOnly } from "../effects/ClientOnly";
import * as THREE from "three";

const stats = [
  { value: 0, suffix: "+", label: "Trees Restored" },
  { value: 5780, suffix: " ha", label: "Hectares Protected" },
  { value: 24, suffix: "", label: "Wildlife Initiatives" },
  { value: 132, suffix: "", label: "Villages Engaged" },
  { value: 96, suffix: "", label: "Camera Traps" },
  { value: 218, suffix: "", label: "Species Documented" },
];

function FloatingIcon({ index }: { index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.5 + index) * 0.2;
    meshRef.current.rotation.y = Math.cos(t * 0.3 + index) * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.5, 0.15, 64, 8, 2, 3]} />
        <meshStandardMaterial
          color="#C9A13B"
          metalness={0.9}
          roughness={0.1}
          emissive="#C9A13B"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
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

export function Impact() {
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
              Measured in Heartbeats
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] text-fog">
            Conservation, in{" "}
            <em className="text-gold-gradient not-italic">numbers</em> that
            breathe.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => {
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
                  <div ref={viewRef} className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-40">
                    <View track={viewRef as any}>
                      <Suspense fallback={null}>
                        <FloatingIcon index={i} />
                        <pointLight position={[5, 5, 5]} intensity={2} color="#C9A13B" />
                      </Suspense>
                    </View>
                  </div>

                  <motion.div
                    className="relative z-10"
                    style={{
                      x: springX,
                      y: springY,
                    }}
                  >
                    <span className="block font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-fog text-glow">
                      <Counter value={s.value} suffix={s.suffix} />
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

      <ClientOnly>
        <Canvas
          eventSource={containerRef as any}
          className="pointer-events-none fixed inset-0 z-0"
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        >
          <ambientLight intensity={0.5} />
          <View.Port />
          <Preload all />
        </Canvas>
      </ClientOnly>
    </section>
  );
}
