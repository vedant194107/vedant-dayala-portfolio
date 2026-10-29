'use client';

import { useState } from 'react';
import { 
  Atom, FileCode2, Layers, Zap, Code, Palette, FileText, 
  Server, TerminalSquare, Network, Box, Sliders, Activity, 
  GitBranch, MonitorSmartphone, LayoutGrid, Cloud, 
  Terminal, Sparkles 
} from 'lucide-react';
import { skillsData } from '@/data/skills';
import { SkillItem, SkillCategory } from '@/types';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { useAudioEffect } from '@/hooks/useAudioEffect';

const ICON_MAP: Record<string, React.ElementType> = {
  Atom,
  FileCode2,
  Layers,
  Zap,
  Code,
  Palette,
  FileText,
  Server,
  TerminalSquare,
  Network,
  Box,
  Sliders,
  Activity,
  GitBranch,
  MonitorSmartphone,
  LayoutGrid,
  Cloud,
};

const CATEGORIES: { id: SkillCategory; label: string }[] = [
  { id: 'frontend', label: 'Frontend Engineering' },
  { id: 'backend', label: 'Backend & Systems' },
  { id: 'creative', label: 'Creative & 3D Web' },
  { id: 'workflow', label: 'Workflow & Tooling' },
];

export default function ToolboxSection() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('frontend');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem>(skillsData[0]);
  const { playClick, playHover } = useAudioEffect();

  const currentSkills = skillsData.filter((s) => s.category === activeCategory);

  const handleCategoryChange = (cat: SkillCategory) => {
    playClick();
    setActiveCategory(cat);
    const firstSkill = skillsData.find((s) => s.category === cat);
    if (firstSkill) setSelectedSkill(firstSkill);
  };

  const handleSkillSelect = (skill: SkillItem) => {
    playClick();
    setSelectedSkill(skill);
  };

  const SelectedIcon = ICON_MAP[selectedSkill.iconName] || Code;

  return (
    <section
      id="toolbox"
      aria-label="Toolbox and Workbench"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-sandstone-500/10 bg-obsidian-900/60"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <Reveal direction="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-sandstone-500/15 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-copper-400">
                <span className="font-semibold text-cyanAccent">04</span>
                <span>/</span>
                <span className="uppercase tracking-widest">Instruments & Craft</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-foreground">
                The Workbench
              </h2>
            </div>
            <p className="font-mono text-xs text-sandstone-400/80 max-w-xs text-left sm:text-right">
              An interactive constellation of instruments honed for tactile performance.
            </p>
          </div>
        </Reveal>

        {/* Category Tabs */}
        <Reveal direction="fade-up" delay={0.1}>
          <div
            className="flex flex-wrap gap-2 border-b border-charcoal-800 pb-4"
            role="tablist"
            aria-label="Skill Workbench Trays"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                onMouseEnter={playHover}
                className={`font-mono text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-copper-700/30 text-cyanAccent border border-copper-400/40 shadow-glowCopper'
                    : 'bg-charcoal-900/60 text-charcoal-400 hover:text-white border border-charcoal-800'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-copper-400" />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Interactive Workbench: Left Constellation Tray, Right Blueprint Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Constellation of Tools Tray */}
          <RevealGroup staggerDelay={0.05} className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {currentSkills.map((skill) => {
              const IconComp = ICON_MAP[skill.iconName] || Code;
              const isSelected = selectedSkill.id === skill.id;

              return (
                <RevealItem key={skill.id}>
                  <button
                    onClick={() => handleSkillSelect(skill)}
                    onMouseEnter={playHover}
                    onFocus={() => setSelectedSkill(skill)}
                    className={`w-full p-4 rounded-xl text-left transition-all border relative group flex flex-col justify-between h-28 ${
                      isSelected
                        ? 'bg-charcoal-800/90 border-cyanAccent shadow-glowCyan'
                        : 'bg-charcoal-900/40 border-charcoal-800 hover:border-sandstone-400/50 hover:bg-charcoal-800/50'
                    }`}
                    aria-label={`View blueprint for ${skill.name}`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div
                        className={`p-2 rounded-lg border transition-colors ${
                          isSelected
                            ? 'bg-copper-600/30 border-cyanAccent text-cyanAccent'
                            : 'bg-obsidian-950/80 border-charcoal-700 text-sandstone-300 group-hover:text-cyanAccent'
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-charcoal-950 text-sandstone-400 border border-charcoal-800">
                        {skill.proficiencyLevel}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-medium text-sm text-foreground group-hover:text-white transition-colors">
                        {skill.name}
                      </h3>
                    </div>

                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyanAccent shadow-sm" />
                    )}
                  </button>
                </RevealItem>
              );
            })}
          </RevealGroup>

          {/* Right: Active Tool Blueprint Inspector */}
          <Reveal direction="fade-left" delay={0.2} className="lg:col-span-5 w-full">
            <div className="chiseled-card rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden border border-sandstone-500/25">
            {/* Top Wireframe Header */}
            <div className="flex items-center justify-between border-b border-charcoal-700/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-copper-900/30 border border-copper-400/40 text-cyanAccent">
                  <SelectedIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-sandstone-400 tracking-wider">
                    BLUEPRINT INSPECTOR
                  </span>
                  <h3 className="text-xl font-display font-semibold text-foreground">
                    {selectedSkill.name}
                  </h3>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-copper-500/20 text-cyanAccent border border-copper-400/30">
                  {selectedSkill.proficiencyLevel}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-charcoal-400 block">
                Technical Capabilities
              </span>
              <p className="text-sm text-sandstone-200 leading-relaxed font-sans">
                {selectedSkill.description}
              </p>
            </div>

            {/* Atelier Use Case */}
            <div className="p-4 rounded-xl bg-obsidian-950/80 border border-charcoal-800 space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-copper-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyanAccent" />
                Atelier Implementation
              </span>
              <p className="text-xs text-charcoal-300 leading-relaxed">
                {selectedSkill.atelierUseCase}
              </p>
            </div>

            {/* Architectural Code Snippet */}
            {selectedSkill.codeSnippet && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-[10px] text-charcoal-400">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-cyanAccent" />
                    ATELIER_PATTERN.ts
                  </span>
                  <span>TypeScript</span>
                </div>
                <div className="p-3 rounded-lg bg-obsidian-950 border border-charcoal-800 overflow-x-auto">
                  <pre className="font-mono text-[11px] text-cyanAccent/90 leading-tight">
                    <code>{selectedSkill.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Blueprint Meta Stamp */}
            <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-charcoal-500 border-t border-charcoal-800">
              <span>STATUS: VERIFIED IN PRODUCTION</span>
              <span>CALIBRATED FOR WCAG AA</span>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
}
