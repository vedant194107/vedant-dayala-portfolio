'use client';

import { ArrowRight } from 'lucide-react';
import SceneContainer from '@/components/three/SceneContainer';
import Button from '@/components/ui/Button';
import ScrollCue from '@/components/ui/ScrollCue';
import TimeDisplay from '@/components/ui/TimeDisplay';
import { profileData } from '@/data/profile';

export default function HeroSection() {
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      aria-label="Digital Atelier Hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-between pt-28 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden atelier-grid"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-atelier-radial pointer-events-none" />

      {/* Top Coordinate Stamp Strip */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between font-mono text-[11px] text-charcoal-400 border-b border-sandstone-500/10 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent" />
          <span className="text-sandstone-300">AHMEDABAD NIGHT WORKSHOP</span>
          <span className="hidden sm:inline text-charcoal-500">·</span>
          <span className="hidden sm:inline text-charcoal-400">{profileData.coordinates}</span>
        </div>
        <div className="flex items-center gap-3">
          <TimeDisplay showSeconds={false} className="hidden xs:inline-flex" />
          <span className="text-[10px] px-2 py-0.5 rounded bg-copper-500/15 text-cyanAccent border border-copper-400/30">
            {profileData.availability.label.split('·')[1]?.trim() || 'Available for Work'}
          </span>
        </div>
      </div>

      {/* Main Content Area: Split Grid on Desktop */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-grow py-6 relative z-10">
        {/* Left Column: Editorial Headline & Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-charcoal-900/80 border border-sandstone-500/25 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-copper-400 animate-pulse" />
            <span className="font-mono text-xs text-sandstone-200">
              {profileData.role}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground tracking-tight leading-[1.12]">
            I build digital experiences with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanAccent via-copper-300 to-sandstone-300">
              code
            </span>
            ,{' '}
            <span className="italic font-serif text-sandstone-200">motion</span>
            , and{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sandstone-300 to-cyanAccent">
              curiosity
            </span>
            .
          </h1>

          {/* Concise Introduction */}
          <p className="text-base sm:text-lg text-charcoal-400 max-w-xl leading-relaxed">
            {profileData.bioConcise}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={scrollToProjects}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore My Work
            </Button>
            <Button
              variant="sandstone"
              size="lg"
              onClick={scrollToContact}
            >
              Let’s Build Something
            </Button>
          </div>

          {/* Micro Specs Strip */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-charcoal-800/80">
            {profileData.specifications.map((spec) => (
              <div key={spec.label} className="flex flex-col">
                <span className="font-mono text-[10px] uppercase text-charcoal-500">
                  {spec.label}
                </span>
                <span className="font-mono text-xs font-semibold text-sandstone-300">
                  {spec.value}
                </span>
                <span className="font-mono text-[9px] text-charcoal-400 truncate">
                  {spec.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 3D Scene / The Builder's Relic */}
        <div className="lg:col-span-5 h-[340px] sm:h-[420px] lg:h-[500px] w-full flex items-center justify-center relative">
          <div className="w-full h-full relative rounded-2xl border border-sandstone-500/15 bg-charcoal-900/30 backdrop-blur-sm overflow-hidden shadow-2xl">
            {/* Visual Corner Brackets */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyanAccent/50 pointer-events-none z-10" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyanAccent/50 pointer-events-none z-10" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyanAccent/50 pointer-events-none z-10" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyanAccent/50 pointer-events-none z-10" />

            {/* The 3D Relic Scene */}
            <SceneContainer />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="w-full flex justify-center pt-2 relative z-10">
        <ScrollCue targetId="about" label="Enter The Workshop" />
      </div>
    </section>
  );
}
