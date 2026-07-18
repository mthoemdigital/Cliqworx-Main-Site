"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLES = 2600;

/** Inverted particle-mesh cone in the brand purple range, per the
 *  jankelley-style WebGL reference. Pure geometry and lighting, no image. */
function ParticleCone({ animate }: { animate: boolean }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLES * 3);
    const colors = new Float32Array(PARTICLES * 3);
    const top = new THREE.Color("#C4A0FF");
    const mid = new THREE.Color("#7B2FFF");
    const bottom = new THREE.Color("#3B0FAF");

    for (let i = 0; i < PARTICLES; i++) {
      // t: 0 at the wide top rim, 1 at the point of the inverted cone
      const t = Math.pow(Math.random(), 0.65);
      const radius = (1 - t) * 2.2 + Math.random() * 0.06;
      const angle = Math.random() * Math.PI * 2;
      const y = 1.4 - t * 2.8;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const c =
        t < 0.5
          ? top.clone().lerp(mid, t * 2)
          : mid.clone().lerp(bottom, (t - 0.5) * 2);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (!ref.current || !animate) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  return (
    <points ref={ref} rotation={[0.28, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroField() {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 4.6], fov: 42 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      style={{ pointerEvents: "none" }}
      frameloop={reduceMotion ? "demand" : "always"}
    >
      <ParticleCone animate={!reduceMotion} />
    </Canvas>
  );
}
