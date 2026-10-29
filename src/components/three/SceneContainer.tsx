'use client';

import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { isWebGLAvailable, isLowPowerDevice } from '@/lib/webgl';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import CanvasFallback from './CanvasFallback';

// Dynamically import Three.js scene with SSR disabled
const DynamicBuildersRelic = dynamic(() => import('./BuildersRelic'), {
  ssr: false,
  loading: () => <LoadingState />,
});

function LoadingState() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-sandstone-500/20 border-t-cyanAccent animate-spin" />
        <div className="w-10 h-10 rounded-full border border-copper-400/30 border-b-sandstone-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }} />
        <div className="w-2 h-2 rounded-full bg-cyanAccent" />
      </div>
      <p className="font-mono text-xs text-sandstone-300 tracking-wider mb-1">
        INITIALIZING DIGITAL ATELIER
      </p>
      <p className="font-mono text-[10px] text-charcoal-400">
        Materializing The Builder’s Relic...
      </p>
    </div>
  );
}

export default function SceneContainer() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLowPower, setIsLowPower] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    setHasWebGL(isWebGLAvailable());
    setIsLowPower(isLowPowerDevice());
  }, []);

  if (!mounted) {
    return <LoadingState />;
  }

  // Graceful degradation 1: User prefers reduced motion
  if (prefersReducedMotion) {
    return <CanvasFallback reason="reduced-motion" />;
  }

  // Graceful degradation 2: WebGL unsupported or disabled
  if (!hasWebGL) {
    return <CanvasFallback reason="no-webgl" />;
  }

  // Optional: On ultra-low-power devices, provide clean SVG fallback for battery conservation
  if (isLowPower) {
    return <CanvasFallback reason="static" />;
  }

  return (
    <div className="w-full h-full relative">
      <Suspense fallback={<LoadingState />}>
        <DynamicBuildersRelic />
      </Suspense>
    </div>
  );
}
