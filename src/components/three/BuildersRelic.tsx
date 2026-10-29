'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Inner 3D Sculpture Component
function RelicObject({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const midRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Procedural Materials
  const materials = useMemo(() => {
    // 1. Brushed Dark Metal & Oxidized Copper
    const copperPatina = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2d6a5f'),
      metalness: 0.85,
      roughness: 0.28,
      wireframe: false,
    });

    // 2. Warm Sandstone Surface
    const warmSandstone = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c49d7f'),
      metalness: 0.15,
      roughness: 0.75,
    });

    // 3. Central Chiseled Polyhedron
    const coreCrystal = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0b1419'),
      metalness: 0.9,
      roughness: 0.15,
      transmission: 0.35,
      thickness: 1.2,
      reflectivity: 0.9,
      clearcoat: 0.6,
      clearcoatRoughness: 0.1,
    });

    // 4. Electric Cyan Wireframe Grid
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#38f0d0'),
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    return { copperPatina, warmSandstone, coreCrystal, wireframeMat };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle pointer reaction with spring damping
    if (groupRef.current) {
      const targetRotationX = mousePos.current.y * 0.35;
      const targetRotationY = mousePos.current.x * 0.45;

      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotationX,
        3.5,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotationY,
        3.5,
        delta
      );
    }

    // Concentric counter-rotations
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.15;
      outerRingRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
    }

    if (midRingRef.current) {
      midRingRef.current.rotation.y = -t * 0.22;
      midRingRef.current.rotation.z = Math.cos(t * 0.12) * 0.18;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.3;
      coreRef.current.rotation.x = t * 0.18;
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -t * 0.12;
      wireframeRef.current.rotation.z = t * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Outer Torus Ring - Oxidized Copper Patina */}
      <mesh ref={outerRingRef} material={materials.copperPatina}>
        <torusGeometry args={[2.2, 0.045, 16, 64]} />
      </mesh>

      {/* 2. Secondary Inclined Ring - Warm Sandstone */}
      <mesh ref={midRingRef} material={materials.warmSandstone} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.7, 0.035, 16, 48]} />
      </mesh>

      {/* 3. Wireframe Octahedral Cage - Electric Cyan */}
      <mesh ref={wireframeRef} material={materials.wireframeMat}>
        <octahedronGeometry args={[1.35, 1]} />
      </mesh>

      {/* 4. Central Solid Crystalline Core */}
      <mesh ref={coreRef} material={materials.coreCrystal}>
        <octahedronGeometry args={[0.9, 0]} />
      </mesh>

      {/* 5. Orbiting Architectural Coordinates / Satellite Nodes */}
      <group rotation={[0.4, 0.2, 0]}>
        <mesh position={[2.5, 0.2, 0]} material={materials.warmSandstone}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
        </mesh>
        <mesh position={[-2.3, -0.4, 0.5]} material={materials.copperPatina}>
          <boxGeometry args={[0.07, 0.07, 0.07]} />
        </mesh>
        <mesh position={[0, 2.3, -0.3]} material={materials.wireframeMat}>
          <octahedronGeometry args={[0.09, 0]} />
        </mesh>
      </group>
    </group>
  );
}

// Scene Root with Lighting and Canvas wrapper
export default function BuildersRelic() {
  const mousePos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Track cursor position normalized to [-1, 1]
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mousePos.current = {
        x: (e.clientX / innerWidth) * 2 - 1,
        y: -(e.clientY / innerHeight) * 2 + 1,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const { innerWidth, innerHeight } = window;
        mousePos.current = {
          x: (touch.clientX / innerWidth) * 2 - 1,
          y: -(touch.clientY / innerHeight) * 2 + 1,
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Pause rendering when canvas is off-screen using IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 42 }}
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        frameloop={isVisible ? 'always' : 'never'}
      >
        {/* Soft Warm Key Light */}
        <directionalLight position={[4, 6, 4]} intensity={2.2} color="#fceddc" />
        {/* Subtle Patina Fill Light */}
        <directionalLight position={[-4, -3, -2]} intensity={1.5} color="#2d7a6e" />
        {/* Cyan Accent Rim Light */}
        <pointLight position={[0, -4, 3]} intensity={1.8} color="#38f0d0" distance={10} />
        {/* Ambient atelier light */}
        <ambientLight intensity={0.65} color="#0d141e" />

        {/* Floating Night Workshop Atmospheric Dust Particles */}
        <Sparkles count={30} scale={6} size={1.8} speed={0.3} opacity={0.35} color="#c49d7f" />
        <Sparkles count={20} scale={5} size={2.0} speed={0.4} opacity={0.45} color="#38f0d0" />

        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.4}>
          <RelicObject mousePos={mousePos} />
        </Float>
      </Canvas>

      {/* Architectural Compass / Coordinate Stamp Overlay */}
      <div className="absolute top-4 right-4 pointer-events-none hidden sm:flex items-center gap-2 font-mono text-[10px] text-sandstone-400/60 bg-charcoal-900/40 px-2.5 py-1 rounded border border-sandstone-500/15">
        <span>SCENE · 3D_RELIC</span>
        <span className="w-1 h-1 rounded-full bg-cyanAccent animate-ping" />
      </div>
    </div>
  );
}
