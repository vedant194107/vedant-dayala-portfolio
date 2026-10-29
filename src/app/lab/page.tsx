'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useAudioEffect } from '@/hooks/useAudioEffect';

export default function LabPage() {
  const [glitchIntensity, setGlitchIntensity] = useState(30);
  const [activePreset, setActivePreset] = useState<'patina' | 'sandstone' | 'cyan'>('patina');
  const [wireframeMeshCount, setWireframeMeshCount] = useState(12);
  const { playClick, playHover } = useAudioEffect();

  return (
    <main className="min-h-screen bg-obsidian-950 text-foreground py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden atelier-grid">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-atelier-radial pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between border-b border-sandstone-500/15 pb-4">
          <Link
            href="/"
            onClick={playClick}
            className="inline-flex items-center gap-2 font-mono text-xs text-sandstone-400 hover:text-cyanAccent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Atelier Main Floor</span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-[10px] text-copper-400 px-2.5 py-0.5 rounded bg-copper-900/30 border border-copper-400/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent animate-ping" />
            <span>ATELIER EXPERIMENTAL LAB · V1.2</span>
          </div>
        </div>

        {/* Lab Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-cyanAccent font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-copper-400" />
            <span>The Sandbox & R&D Laboratory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-foreground">
            Experimental Prototyping
          </h1>
          <p className="text-sm sm:text-base text-charcoal-400 max-w-2xl leading-relaxed">
            A sandbox for testing generative math, parametric geometries, procedural shaders, and tactile micro-interactions before integrating them into production architectures.
          </p>
        </div>

        {/* Experiment 1: Procedural Parametric Vector Generator */}
        <div className="chiseled-card rounded-2xl p-6 sm:p-8 space-y-6 border border-sandstone-500/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-800 pb-4">
            <div>
              <span className="font-mono text-xs text-cyanAccent">EXP_01</span>
              <h2 className="text-xl font-display text-foreground font-semibold">
                Parametric Harmonograph & Stepwell Lissajous Curves
              </h2>
              <p className="text-xs text-charcoal-400">
                Mathematical waveform generator mimicking Ahmedabad stepwell spatial acoustics.
              </p>
            </div>

            {/* Presets */}
            <div className="flex items-center gap-2">
              {(['patina', 'sandstone', 'cyan'] as const).map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    playClick();
                    setActivePreset(preset);
                  }}
                  onMouseEnter={playHover}
                  className={`font-mono text-xs px-2.5 py-1 rounded transition-colors ${
                    activePreset === preset
                      ? 'bg-copper-700/40 text-cyanAccent border border-copper-400/50'
                      : 'bg-charcoal-900 text-charcoal-400 border border-charcoal-800'
                  }`}
                >
                  {preset.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Visual Canvas Area */}
          <div className="h-64 sm:h-80 w-full rounded-xl bg-obsidian-950 border border-charcoal-800 flex items-center justify-center p-4 relative overflow-hidden">
            <svg
              viewBox="0 0 600 300"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {Array.from({ length: wireframeMeshCount }).map((_, i) => {
                const phase = (i / wireframeMeshCount) * Math.PI * 2;
                const strokeColor =
                  activePreset === 'patina'
                    ? '#368b7d'
                    : activePreset === 'sandstone'
                    ? '#c49d7f'
                    : '#38f0d0';

                // Parametric sine-wave path
                const points = Array.from({ length: 40 }).map((_, pt) => {
                  const x = (pt / 39) * 560 + 20;
                  const amp = (glitchIntensity / 100) * 80;
                  const y =
                    150 +
                    Math.sin(pt * 0.2 + phase) * amp +
                    Math.cos(pt * 0.1 - phase) * (amp * 0.4);
                  return `${x.toFixed(1)},${y.toFixed(1)}`;
                }).join(' L ');

                return (
                  <path
                    key={i}
                    d={`M ${points}`}
                    stroke={strokeColor}
                    strokeWidth="1.2"
                    strokeOpacity={0.15 + (i / wireframeMeshCount) * 0.7}
                    fill="none"
                  />
                );
              })}
            </svg>

            {/* Coordinates Badge */}
            <div className="absolute bottom-3 right-3 font-mono text-[9px] text-charcoal-500 bg-charcoal-900/60 px-2 py-0.5 rounded border border-charcoal-800">
              SAMPLES: {wireframeMeshCount * 40} · INTENSITY: {glitchIntensity}%
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs text-sandstone-300">
                <span>Curve Amplitude Modulation</span>
                <span className="text-cyanAccent">{glitchIntensity}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={glitchIntensity}
                onChange={(e) => setGlitchIntensity(Number(e.target.value))}
                className="w-full accent-cyanAccent cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs text-sandstone-300">
                <span>Harmonic Strata Density</span>
                <span className="text-copper-400">{wireframeMeshCount} strata</span>
              </div>
              <input
                type="range"
                min="4"
                max="24"
                value={wireframeMeshCount}
                onChange={(e) => setWireframeMeshCount(Number(e.target.value))}
                className="w-full accent-copper-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Experiment 2: Haptic Tactile Feedback Playground */}
        <div className="chiseled-card rounded-2xl p-6 sm:p-8 space-y-6 border border-sandstone-500/20">
          <div>
            <span className="font-mono text-xs text-cyanAccent">EXP_02</span>
            <h2 className="text-xl font-display text-foreground font-semibold">
              Procedural Web Audio Haptics
            </h2>
            <p className="text-xs text-charcoal-400">
              Zero-asset analog sound synthesis using dynamic Web Audio API oscillators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant="primary"
              size="md"
              className="w-full"
            >
              Copper Relay Strike
            </Button>
            <Button
              variant="sandstone"
              size="md"
              className="w-full"
            >
              Sandstone Chisel Pulse
            </Button>
            <Button
              variant="secondary"
              size="md"
              className="w-full"
            >
              Cyan Frequency Hum
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
