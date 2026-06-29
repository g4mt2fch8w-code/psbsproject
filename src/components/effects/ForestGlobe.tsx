import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function ForestGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  const particlesCount = 6000;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    const cols = new Float32Array(particlesCount * 3);

    const colorTropics = new THREE.Color("#1a5d2e"); // Lush Green
    const colorDesert = new THREE.Color("#d4a373");  // Golden/Sand
    const colorCold = new THREE.Color("#e0fbfc");    // Tundra/Ice
    const colorBoreal = new THREE.Color("#2d6a4f");  // Darker Forest

    for (let i = 0; i < particlesCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particlesCount);
      const theta = Math.sqrt(particlesCount * Math.PI) * phi;

      const r = 2.0 + (Math.random() - 0.5) * 0.1;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const lat = y / r; // -1 to 1
      const noise = Math.random() * 0.15;

      let finalColor = colorTropics;

      if (Math.abs(lat) < 0.15 + noise) {
        finalColor = colorTropics;
      } else if (Math.abs(lat) < 0.35 + noise) {
        finalColor = Math.random() > 0.4 ? colorDesert : colorTropics;
      } else if (Math.abs(lat) < 0.75 + noise) {
        finalColor = colorBoreal;
      } else {
        finalColor = colorCold;
      }

      cols[i * 3] = finalColor.r;
      cols[i * 3 + 1] = finalColor.g;
      cols[i * 3 + 2] = finalColor.b;
    }
    return { positions: pos, colors: cols };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.05 + x * 0.1;
      globeRef.current.rotation.x = y * 0.1;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.07 + x * 0.05;
    }
    if (lightRef.current) {
      // Light follows mouse
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, (x * viewport.width) / 2, 0.1);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, (y * viewport.height) / 2, 0.1);
    }
  });

  return (
    <group>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={globeRef}>
          <sphereGeometry args={[1.9, 64, 64]} />
          <MeshDistortMaterial
            color="#020202"
            roughness={0.9}
            distort={0.12}
            speed={2}
            emissive="#0a1a10"
            emissiveIntensity={0.15}
          />
        </mesh>

        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particlesCount}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={particlesCount}
              array={colors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.016}
            vertexColors
            transparent
            opacity={0.9}
            sizeAttenuation={true}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </Float>

      <ambientLight intensity={0.2} />
      <pointLight ref={lightRef} position={[0, 0, 4]} intensity={2.5} color="#F0D87A" distance={15} />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#1a5d2e" />
    </group>
  );
}
