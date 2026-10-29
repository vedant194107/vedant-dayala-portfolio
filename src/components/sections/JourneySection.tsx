'use client';

import { useState, useEffect } from 'react';
import { 
  GraduationCap, Briefcase, Rocket, GitPullRequest, 
  Sparkles, CheckCircle2, MapPin 
} from 'lucide-react';
import { journeyData as defaultJourney } from '@/data/journey';
import { JourneyMilestone } from '@/types';
import Reveal from '@/components/ui/Reveal';

const TYPE_ICONS: Record<string, React.ElementType> = {
  education: GraduationCap,
  experience: Briefcase,
  product: Rocket,
  'open-source': GitPullRequest,
  milestone: Sparkles,
};

export default function JourneySection() {
  const [milestones, setMilestones] = useState<JourneyMilestone[]>(defaultJourney);

  useEffect(() => {
    fetch('/api/admin/journey')
      .then((res) => res.json())
      .then((data) => {
        if (data.journey && Array.isArray(data.journey)) {
          setMilestones(data.journey);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="journey"
      aria-label="Journey and Milestones"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-sandstone-500/10 bg-obsidian-950"
    >
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section Header */}
        <Reveal direction="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-sandstone-500/15 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-copper-400">
                <span className="font-semibold text-cyanAccent">05</span>
                <span>/</span>
                <span className="uppercase tracking-widest">Chronicle & Growth</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-foreground">
                The Journey
              </h2>
            </div>
            <p className="font-mono text-xs text-sandstone-400/80 max-w-xs text-left sm:text-right">
              An honest evolutionary timeline from foundational code to creative engineering.
            </p>
          </div>
        </Reveal>

        {/* Vertical Visual Timeline with Thin Illuminated Path */}
        <div className="relative pl-6 sm:pl-10 space-y-12 sm:space-y-16">
          {/* Vertical Illuminated Line */}
          <div
            className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyanAccent via-copper-500 to-sandstone-500/20"
            aria-hidden="true"
          />

          {milestones.map((milestone, idx) => {
            const Icon = TYPE_ICONS[milestone.type] || Sparkles;

            return (
              <Reveal
                key={milestone.id}
                direction="fade-left"
                delay={idx * 0.08}
                offset={28}
                className="relative flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 group"
              >
                {/* Node Pivot on Illuminated Path */}
                <div
                  className="absolute -left-[23px] sm:-left-[31px] top-1.5 w-6 h-6 rounded-full bg-obsidian-950 border-2 border-copper-400 group-hover:border-cyanAccent flex items-center justify-center transition-colors z-10 shadow-sm"
                  aria-hidden="true"
                >
                  <div className="w-2 h-2 rounded-full bg-cyanAccent group-hover:scale-125 transition-transform" />
                </div>

                {/* Milestone Content Panel */}
                <div className="w-full chiseled-card rounded-2xl p-6 sm:p-8 space-y-4 border border-sandstone-500/15 group-hover:border-copper-400/40 transition-colors">
                  {/* Top Meta Line: Year, Period, Category Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-charcoal-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs sm:text-sm font-bold text-cyanAccent">
                        {milestone.period}
                      </span>
                      <span className="font-mono text-xs text-charcoal-500">·</span>
                      <span className="font-mono text-xs text-sandstone-300 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-copper-400" />
                        {milestone.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-copper-500/15 text-copper-300 border border-copper-400/25">
                      <Icon className="w-3 h-3 text-cyanAccent" />
                      <span>{milestone.type}</span>
                    </div>
                  </div>

                  {/* Title & Role */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-medium text-foreground group-hover:text-sandstone-200 transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="font-mono text-xs text-copper-400 mt-1">
                      {milestone.roleOrDegree} · <span className="text-sandstone-300">{milestone.organization}</span>
                    </p>
                  </div>

                  {/* Narrative Description */}
                  <p className="text-xs sm:text-sm text-charcoal-300 leading-relaxed font-sans">
                    {milestone.description}
                  </p>

                  {/* Key Achievements Bullet Points */}
                  <div className="space-y-2 pt-2 border-t border-charcoal-800/60">
                    {milestone.keyAchievements.map((achievement, aIdx) => (
                      <div
                        key={aIdx}
                        className="flex items-start gap-2 text-xs text-sandstone-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyanAccent flex-shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {milestone.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-charcoal-900 border border-charcoal-800 text-charcoal-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
