import { Reveal } from "@/components/effects/Reveal";
import canopy from "@/assets/canopy.jpg";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { ClientOnly } from "../effects/ClientOnly";

const reserves = [
  { name: "Navegaon-Nagzira Tiger Reserve", area: "653.67 km²", x: 22, y: 38 },
  { name: "Koka WLS", area: "92.34 km²", x: 38, y: 28 },
  { name: "Umred-Karhandla", area: "195.68 km²", x: 56, y: 55 },
  { name: "Bhandara Territorial Forests", area: "1,343 km²", x: 46, y: 72 },
  { name: "Bramhapuri Forest Division", area: "1200 km²", x: 70, y: 42 },
  {
    name: "Gosikhurd Wetlands",
    area: "189 km² (SURROUNDING AREA)",
    x: 82,
    y: 65,
  },
  { name: "Tadoba-Andhari Tiger Reserve", area: "~ 1700 km²", x: 80, y: 30 },
  { name: "Mogarkasa Conservation Reserve", area: "103.92 km²", x: 30, y: 40 },
  { name: "Sillari & Chorbahuli", area: "250 + 65 km²", x: 40, y: 35 },
  { name: "Total", area: "5688.69 km²", x: 35, y: 30 },
];

function MapPoint({ r }: { r: (typeof reserves)[0] }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Mesh>(null);

  // Convert percentages to 3D coordinates (centered)
  const pos = [(r.x - 50) / 10, -(r.y - 37.5) / 10, 0.1] as [
    number,
    number,
    number,
  ];

  return (
    <group position={pos}>
      <mesh
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[hovered ? 0.12 : 0.08, 16, 16]} />
        <meshStandardMaterial
          color="#C9A13B"
          emissive="#C9A13B"
          emissiveIntensity={hovered ? 2 : 0.5}
        />
      </mesh>
      {hovered && (
        <Html distanceFactor={10}>
          <div className="whitespace-nowrap rounded-full border border-gold/20 bg-ink/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-fog/80 backdrop-blur">
            {r.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function InteractiveMap() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      Math.sin(t * 0.2) * 0.1 + 0.2,
      0.1,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      Math.cos(t * 0.2) * 0.1,
      0.1,
    );
  });

  return (
    <group ref={groupRef}>
      {/* Map Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[12, 9]} />
        <meshStandardMaterial
          color="#0F3B1D"
          transparent
          opacity={0.3}
          roughness={1}
        />
      </mesh>

      {/* Grid/Topographic lines effect */}
      <gridHelper
        args={[12, 20, "#2E7D32", "#1a4d23"]}
        position={[0, -0.49, 0]}
      />

      {/* Connection Lines */}
      <group position={[0, 0, 0]}>
        {reserves.slice(0, 5).map((r, i) =>
          reserves.slice(i + 1, i + 3).map((r2, j) => (
            <line key={`${i}-${j}`}>
              <bufferGeometry attach="geometry">
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={
                    new Float32Array([
                      (r.x - 50) / 10,
                      -(r.y - 37.5) / 10,
                      0.05,
                      (r2.x - 50) / 10,
                      -(r2.y - 37.5) / 10,
                      0.05,
                    ])
                  }
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial
                attach="material"
                color="#C9A13B"
                opacity={0.15}
                transparent
              />
            </line>
          )),
        )}
      </group>

      {reserves.map((r) => (
        <MapPoint key={r.name} r={r} />
      ))}
    </group>
  );
}

export function Forests() {
  return (
    <section id="forests" className="relative overflow-hidden py-32 md:py-44">
      <div className="absolute inset-0 opacity-20">
        <img
          src={canopy}
          alt=""
          aria-hidden
          loading="lazy"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/80" />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gold/60" />
            <span className="text-[11px] uppercase tracking-[0.4em] text-gold/80">
              Living Geography
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] text-fog">
            The forests we{" "}
            <em className="text-gold-gradient not-italic">walk</em>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-fog/55">
            Six landscapes across Vidarbha — each one a story, a refuge, a
            future.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          {/* Map */}
          <Reveal delay={0.2} className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/[0.06] bg-canopy/40 backdrop-blur">
              <ClientOnly>
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight
                    position={[10, 10, 10]}
                    intensity={1}
                    color="#F0D87A"
                  />
                  <InteractiveMap />
                </Canvas>
              </ClientOnly>
              <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.3em] text-fog/40">
                Vidarbha · Maharashtra (Interactive 3D)
              </span>
            </div>
          </Reveal>

          {/* List */}
          <div className="lg:col-span-5">
            <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {reserves.map((r, i) => (
                <Reveal key={r.name} delay={i * 0.06}>
                  <li className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 py-6 transition hover:pl-3">
                    <span className="font-display text-2xl text-fog md:text-3xl">
                      {r.name}
                    </span>
                    <span className="text-sm tracking-wide text-gold/80 sm:whitespace-nowrap">
                      {r.area}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
