import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { ClientOnly } from "./ClientOnly";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors, count } = useMemo(() => {
    const count = 2500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const goldColor = new THREE.Color("#F0D87A");
    const emeraldColor = new THREE.Color("#2D5A27");

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const mixed = goldColor.clone().lerp(emeraldColor, Math.random());
      col[i * 3 + 0] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return { positions: pos, colors: col, count };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.015;
      ref.current.rotation.x = Math.sin(t * 0.08) * 0.04;

      const { x, y } = state.pointer;
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, x * 0.5, 0.05);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, y * 0.3, 0.05);
    }
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraDrift() {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.camera.position.x = Math.sin(t * 0.15) * 0.6;
    state.camera.position.y = Math.cos(t * 0.1) * 0.3;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function ForestScene() {
  return (
    <ClientOnly>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        className="!absolute inset-0"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 4, 4]} intensity={2} color="#C9A13B" />
        <ParticleField />
        <CameraDrift />
        <fog attach="fog" args={["#050505", 6, 18]} />
      </Canvas>
    </ClientOnly>
  );
}
