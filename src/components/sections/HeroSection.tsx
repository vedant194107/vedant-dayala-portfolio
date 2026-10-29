'use client';

import { ArrowRight } from 'lucide-react';
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
      className="relative min-h-[92svh] w-full flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden atelier-grid"
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
          <span className="text-[10px] px-2.5 py-0.5 rounded bg-copper-500/15 text-cyanAccent border border-copper-400/30">
            {profileData.availability.label.split('·')[1]?.trim() || 'Available for Work'}
          </span>
        </div>
      </div>

      {/* Main Content Area: Expansive Editorial Hero */}
      <div className="max-w-5xl w-full mx-auto flex flex-col justify-center space-y-8 py-10 relative z-10">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2.5 self-start px-4 py-1.5 rounded-full bg-charcoal-900/90 border border-sandstone-500/25 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-cyanAccent animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-wider text-cyanAccent font-semibold">
            {profileData.role}
          </span>
          <span className="text-charcoal-500">·</span>
          <span className="font-mono text-xs text-sandstone-300">
            Ahmedabad, India
          </span>
        </div>

        {/* Monumental Name & Title */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-medium text-foreground tracking-tight leading-[1.04]">
            {profileData.name}
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyanAccent via-copper-300 to-sandstone-300 max-w-3xl leading-snug">
            Full Stack Developer building fast, expressive web platforms.
          </p>
        </div>

        {/* Narrative Description */}
        <p className="text-base sm:text-lg md:text-xl text-charcoal-300 max-w-2xl leading-relaxed font-sans">
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
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-charcoal-800/80 max-w-4xl">
          {profileData.specifications.map((spec) => (
            <div key={spec.label} className="flex flex-col space-y-0.5">
              <span className="font-mono text-[10px] uppercase text-charcoal-500 tracking-wider">
                {spec.label}
              </span>
              <span className="font-mono text-sm font-semibold text-sandstone-300">
                {spec.value}
              </span>
              <span className="font-mono text-[11px] text-charcoal-400 truncate">
                {spec.detail}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="w-full flex justify-center pt-4 relative z-10">
        <ScrollCue targetId="about" label="Explore Selected Works & Atelier" />
      </div>
    </section>
  );
}
