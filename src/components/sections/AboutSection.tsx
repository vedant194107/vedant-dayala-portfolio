'use client';

import { CheckCircle2 } from 'lucide-react';
import { profileData } from '@/data/profile';

const HIGHLIGHTS = [
  'Enterprise ERP & manufacturing platform architecture',
  'Next.js 14 App Router, React & TypeScript engineering',
  'Relational database modeling with Prisma ORM & MySQL',
  'Automated billing, PDF invoice engines & financial ledgers',
  'REST API design, rate-limiting & atomic transactions',
  'Accessible, high-performance UI implementation with Tailwind CSS',
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Vedant Dayala"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-sandstone-500/10 bg-obsidian-900/60"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-sandstone-500/15 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-copper-400">
              <span className="font-semibold text-cyanAccent">02</span>
              <span>/</span>
              <span className="uppercase tracking-widest">Profile & Background</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-foreground">
              About Vedant Dayala
            </h2>
          </div>
          <p className="font-mono text-xs text-sandstone-400/80 max-w-xs text-left sm:text-right">
            Full Stack Developer based in Ahmedabad, Gujarat, India.
          </p>
        </div>

        {/* Split Layout: Visual Profile Card & Narrative Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Developer Profile Card & Strengths */}
          <div className="lg:col-span-5 space-y-6">
            <div className="chiseled-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group border border-sandstone-500/20">
              {/* Subtle background motif */}
              <div className="absolute inset-0 jali-grid opacity-15 pointer-events-none" />

              {/* Profile Card Header */}
              <div className="relative z-10 flex flex-col items-center text-center space-y-5">
                {/* Monogram Badge */}
                <div className="relative w-24 h-24 rounded-2xl border-2 border-sandstone-500/30 bg-charcoal-900/80 p-2 flex items-center justify-center shadow-glowSandstone">
                  <div className="w-full h-full rounded-xl border border-copper-400/40 bg-obsidian-950 flex flex-col items-center justify-center p-2 relative overflow-hidden">
                    <span className="font-display text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyanAccent to-sandstone-300">
                      VD
                    </span>
                    <span className="font-mono text-[8px] tracking-widest text-copper-300 uppercase mt-0.5">
                      Full-Stack
                    </span>
                    <div className="absolute -bottom-2 w-12 h-1 rounded-full bg-cyanAccent/50 blur-[2px]" />
                  </div>
                </div>

                {/* Identity Summary */}
                <div className="space-y-1">
                  <h3 className="text-2xl font-display text-foreground font-semibold">
                    {profileData.name}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-cyanAccent font-medium">
                    {profileData.role}
                  </p>
                  <p className="font-mono text-xs text-charcoal-400">
                    {profileData.location}
                  </p>
                </div>

                {/* Core Stack Specs Grid */}
                <div className="w-full grid grid-cols-2 gap-2 text-left pt-2">
                  <div className="p-3 rounded-lg bg-obsidian-950/80 border border-charcoal-800">
                    <span className="font-mono text-[10px] text-charcoal-400 block uppercase">Primary Focus</span>
                    <span className="font-mono text-xs font-semibold text-sandstone-200">Full-Stack Web</span>
                    <span className="font-mono text-[9px] text-copper-400 block">Next.js · React · Node</span>
                  </div>
                  <div className="p-3 rounded-lg bg-obsidian-950/80 border border-charcoal-800">
                    <span className="font-mono text-[10px] text-charcoal-400 block uppercase">Databases</span>
                    <span className="font-mono text-xs font-semibold text-cyanAccent">Prisma & MySQL</span>
                    <span className="font-mono text-[9px] text-sandstone-400 block">Relational Schemas</span>
                  </div>
                </div>

                {/* Practical Engineering Highlights List */}
                <div className="w-full p-4 rounded-xl bg-charcoal-900/60 border border-sandstone-500/15 text-left space-y-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-sandstone-400 block">
                    Core Technical Competencies
                  </span>
                  <div className="space-y-2">
                    {HIGHLIGHTS.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-sandstone-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyanAccent flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Real Focus Areas */}
          <div className="lg:col-span-7 space-y-10">
            {/* Story Paragraphs */}
            <div className="space-y-5 text-base sm:text-lg text-charcoal-300 leading-relaxed font-sans">
              {profileData.bioStory.map((paragraph, index) => (
                <p key={index} className="text-sandstone-100/90 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Engineering Focus Areas */}
            <div className="space-y-4 pt-4 border-t border-charcoal-800">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase tracking-widest text-sandstone-400">
                  Primary Areas of Expertise
                </h3>
                <span className="font-mono text-[10px] text-copper-400">
                  Production-Ready Stacks
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profileData.exploring.map((item) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-xl bg-charcoal-900/50 border border-sandstone-500/15 hover:border-copper-400/50 transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground group-hover:text-cyanAccent transition-colors">
                        {item.title}
                      </h4>
                      <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-copper-500/15 text-copper-300 border border-copper-400/25">
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
