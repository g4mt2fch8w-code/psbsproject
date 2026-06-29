import { Reveal } from "@/components/effects/Reveal";
import tiger from "@/assets/tiger.jpg";
import hornbill from "@/assets/hornbill.jpg";
import deer from "@/assets/deer.jpg";
import leopard from "@/assets/leopard.jpg";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Image } from "@react-three/drei";

const species = [
  {
    img: tiger,
    status: "Endangered",
    count: "38",
    latin: "Panthera tigris tigris",
    name: "Bengal Tiger",
    body: "The soul of Vidarbha. Apex stewards of the forest.",
  },
  {
    img: hornbill,
    status: "Vulnerable",
    count: "210+",
    latin: "Buceros bicornis",
    name: "Indian Hornbill",
    body: "Forest gardeners — sowing tomorrow's canopy.",
  },
  {
    img: deer,
    status: "Least Concern",
    count: "4,200+",
    latin: "Axis axis",
    name: "Spotted Deer",
    body: "The quiet pulse beneath the sal trees.",
  },
  {
    img: leopard,
    status: "Vulnerable",
    count: "22",
    latin: "Panthera pardus fusca",
    name: "Leopard",
    body: "Shadows that keep the ecosystem balanced.",
  },
];

function CardContent({ s, hovered }: { s: typeof species[0]; hovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const { x, y } = state.pointer;
    if (hovered) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        x * 0.2,
        0.1,
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -y * 0.2,
        0.1,
      );
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        0.5,
        0.1,
      );
    } else {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        0,
        0.1,
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        0,
        0.1,
      );
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        0,
        0.1,
      );
    }
  });

  return (
    <group ref={meshRef}>
      <Image
        url={s.img}
        scale={[4, 5.5]}
        grayscale={0}
        transparent
        opacity={0.8}
      />
      {/* Inner glow / depth effect */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4.2, 5.7]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
    </group>
  );
}

function Wildlife3DCard({ s }: { s: typeof species[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group relative h-[520px] overflow-hidden rounded-3xl border border-white/[0.06] bg-ink"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <CardContent s={s} hovered={hovered} />
        </Canvas>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

      <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 rounded-full border border-gold/30 bg-ink/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold/90 backdrop-blur">
        {s.status}
      </div>
      <div className="pointer-events-none absolute right-5 top-5 text-right">
        <div className="font-display text-3xl text-glow text-fog">
          {s.count}
        </div>
        <div className="text-[9px] uppercase tracking-[0.3em] text-fog/50">
          in our reserves
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
        <div className="text-[10px] italic tracking-wide text-gold/70">
          {s.latin}
        </div>
        <h3 className="mt-1 font-display text-3xl text-fog">{s.name}</h3>
        <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-fog/70 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
          {s.body}
        </p>
      </div>
    </article>
  );
}

export function Wildlife() {
  return (
    <section id="wildlife" className="relative overflow-hidden py-32 md:py-44">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              The Inhabitants
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] text-fog">
            Lives we are{" "}
            <em className="text-gold-gradient not-italic">sworn</em> to protect.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-fog/55">
            Hover into each species to learn about who shares these forests with
            us — and why they need us now.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {species.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.08}>
              <Wildlife3DCard s={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
