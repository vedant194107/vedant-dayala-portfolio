'use client';

import { Compass, Sparkles } from 'lucide-react';
import { profileData } from '@/data/profile';

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About the Atelier"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-sandstone-500/10 bg-obsidian-900/60"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-sandstone-500/15 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-copper-400">
              <span className="font-semibold text-cyanAccent">02</span>
              <span>/</span>
              <span className="uppercase tracking-widest">Philosophy & Identity</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-foreground">
              The Digital Atelier
            </h2>
          </div>
          <p className="font-mono text-xs text-sandstone-400/80 max-w-xs text-left sm:text-right">
            Where Ahmedabad’s architectural legacy informs modern web engineering.
          </p>
        </div>

        {/* Split Layout: Visual & Editorial Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Stylized Generative Portrait & Architecture Visual */}
          <div className="lg:col-span-5 space-y-6">
            <div className="chiseled-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
              {/* Subtle background motif */}
              <div className="absolute inset-0 jali-grid opacity-25 pointer-events-none" />

              {/* Generative Visual Header */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-5">
                {/* Stylized Atelier Emblem */}
                <div className="relative w-28 h-28 rounded-2xl border-2 border-sandstone-500/30 bg-charcoal-900/80 p-2 flex items-center justify-center shadow-glowSandstone">
                  <div className="w-full h-full rounded-xl border border-copper-400/40 bg-obsidian-950 flex flex-col items-center justify-center p-2 relative overflow-hidden">
                    <span className="font-display text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyanAccent to-sandstone-300">
                      VD
                    </span>
                    <span className="font-mono text-[8px] tracking-widest text-copper-300 uppercase mt-0.5">
                      Ahmedabad
                    </span>
                    <div className="absolute -bottom-2 w-12 h-1 rounded-full bg-cyanAccent/50 blur-[2px]" />
                  </div>
                </div>

                {/* Identity Summary */}
                <div className="space-y-1">
                  <h3 className="text-xl font-display text-foreground font-semibold">
                    {profileData.name}
                  </h3>
                  <p className="font-mono text-xs text-copper-400">
                    {profileData.role}
                  </p>
                  <p className="font-mono text-[11px] text-charcoal-400">
                    {profileData.location}
                  </p>
                </div>

                {/* Craftsmanship Manifesto Quote */}
                <div className="w-full p-4 rounded-xl bg-charcoal-900/50 border border-sandstone-500/15 text-left space-y-2">
                  <div className="flex items-center gap-2 text-sandstone-300 font-mono text-[10px] uppercase tracking-wider">
                    <Compass className="w-3.5 h-3.5 text-cyanAccent" />
                    <span>The Atelier Ethos</span>
                  </div>
                  <p className="text-xs text-sandstone-300/90 leading-relaxed italic font-serif">
                    “Code is not just logic executed by a compiler; it is an architectural medium where structural rigor and human tactility meet.”
                  </p>
                </div>

                {/* Micro Stats Grid */}
                <div className="w-full grid grid-cols-2 gap-2 text-left pt-2">
                  <div className="p-3 rounded-lg bg-obsidian-950/70 border border-charcoal-700/60">
                    <span className="font-mono text-[10px] text-charcoal-400 block">Experience</span>
                    <span className="font-mono text-sm font-semibold text-sandstone-200">3+ Years</span>
                    <span className="font-mono text-[9px] text-copper-400 block">Full-Stack & 3D</span>
                  </div>
                  <div className="p-3 rounded-lg bg-obsidian-950/70 border border-charcoal-700/60">
                    <span className="font-mono text-[10px] text-charcoal-400 block">Discipline</span>
                    <span className="font-mono text-sm font-semibold text-cyanAccent">Creative Eng</span>
                    <span className="font-mono text-[9px] text-sandstone-400 block">React · Three · Node</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Exploring Panel */}
          <div className="lg:col-span-7 space-y-10">
            {/* Story Paragraphs */}
            <div className="space-y-6 text-base sm:text-lg text-charcoal-300 leading-relaxed font-sans">
              {profileData.bioStory.map((paragraph, index) => (
                <p key={index} className="text-sandstone-100/90">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* "Currently Exploring" Panel */}
            <div className="space-y-4 pt-4 border-t border-charcoal-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyanAccent" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-sandstone-400">
                  Currently Exploring at the Workbench
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profileData.exploring.map((item) => (
                  <div
                    key={item.title}
                    className="p-4 rounded-xl bg-charcoal-900/40 border border-sandstone-500/15 hover:border-copper-400/50 transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground group-hover:text-cyanAccent transition-colors">
                        {item.title}
                      </h4>
                      <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-copper-500/15 text-copper-300 border border-copper-400/20">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
