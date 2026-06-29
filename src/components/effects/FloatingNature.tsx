import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function Leaves({ count = 40 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport, clock } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      const { factor, speed, xFactor, yFactor, zFactor } = particle;
      const t = (particle.t += speed / 2);
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      dummy.position.set(
        (xFactor + Math.cos(t / 10) * factor) / 10,
        (yFactor + Math.sin(t / factor) * factor) / 10,
        (zFactor + Math.cos(t / 10) * factor) / 10,
      );
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <planeGeometry args={[0.2, 0.2]} />
      <meshStandardMaterial
        color="#2E7D32"
        roughness={0.5}
        metalness={0.2}
        side={THREE.DoubleSide}
        transparent
        opacity={0.4}
      />
    </instancedMesh>
  );
}

export function FloatingNature() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#F0D87A" />
        <Leaves count={30} />
      </Canvas>
    </div>
  );
}
