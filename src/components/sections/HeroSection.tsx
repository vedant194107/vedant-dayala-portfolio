'use client';

import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import ScrollCue from '@/components/ui/ScrollCue';
import HeroCodeTerminal from '@/components/ui/HeroCodeTerminal';
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
      className="relative min-h-[96svh] w-full flex flex-col justify-between pt-28 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden atelier-grid"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-atelier-radial pointer-events-none" />

      {/* Main Content Area: Split Grid on Desktop */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-grow py-6 relative z-10">
        {/* Left Column: Editorial Headline & Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-charcoal-900/90 border border-sandstone-500/25 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyanAccent animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-cyanAccent font-semibold">
              {profileData.role}
            </span>
            <span className="text-charcoal-500">·</span>
            <span className="font-mono text-xs text-sandstone-300">
              Ahmedabad, India
            </span>
          </div>

          {/* Prominent Name & Title Statement */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-medium text-foreground tracking-tight leading-[1.08]">
              {profileData.name}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-display font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyanAccent via-copper-300 to-sandstone-300">
              Full Stack Developer building fast, expressive web platforms.
            </p>
          </div>

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

        {/* Right Column: Interactive Code Terminal & Blueprint */}
        <div className="lg:col-span-5 w-full flex items-center justify-center relative">
          <HeroCodeTerminal />
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="w-full flex justify-center pt-2 relative z-10">
        <ScrollCue targetId="about" label="Explore Selected Works & Atelier" />
      </div>
    </section>
  );
}
