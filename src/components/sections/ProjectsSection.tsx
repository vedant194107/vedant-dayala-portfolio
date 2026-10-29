'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LayoutGrid, GalleryHorizontal, ArrowRight } from 'lucide-react';
import { projectsData as defaultProjects } from '@/data/projects';
import { ProjectData } from '@/types';
import ProjectCard from '@/components/ui/ProjectCard';
import CaseStudyModal from '@/components/ui/CaseStudyModal';
import { useAudioEffect } from '@/hooks/useAudioEffect';

const DEFAULT_CATEGORIES = [
  'Enterprise Full-Stack System',
  'Full-Stack Management SaaS',
  'AI & Interactive Experience',
  'Financial Telemetry & Audit',
];

export default function ProjectsSection() {
  const [projects, setProjects] = useState<ProjectData[]>(defaultProjects);
  const [categoriesList, setCategoriesList] = useState<string[]>(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectData | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');
  const { playClick, playHover } = useAudioEffect();

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/projects').then((r) => r.json()).catch(() => ({})),
      fetch('/api/admin/categories').then((r) => r.json()).catch(() => ({})),
    ]).then(([projData, catData]) => {
      if (projData.projects && Array.isArray(projData.projects)) {
        setProjects(projData.projects);
      }
      if (catData.categories && Array.isArray(catData.categories)) {
        setCategoriesList(catData.categories);
      }
    });
  }, []);

  const categories = [
    'All',
    ...Array.from(new Set([...categoriesList, ...projects.map((p) => p.category)])).filter(Boolean),
  ];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const handleCategorySelect = (cat: string) => {
    playClick();
    setSelectedCategory(cat);
  };

  return (
    <section
      id="projects"
      aria-label="Selected Projects Gallery"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-sandstone-500/10 bg-obsidian-950"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-sandstone-500/15 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-copper-400">
              <span className="font-semibold text-cyanAccent">03</span>
              <span>/</span>
              <span className="uppercase tracking-widest">Architectural Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-foreground">
              Selected Works
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View All Projects Direct Link */}
            <Link
              href="/allproject"
              onClick={playClick}
              onMouseEnter={playHover}
              className="font-mono text-xs px-3.5 py-2 rounded-lg bg-copper-500/15 text-cyanAccent border border-copper-400/35 hover:bg-copper-500/25 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-lg bg-charcoal-900 border border-charcoal-700">
              <button
                onClick={() => {
                  playClick();
                  setViewMode('grid');
                }}
                onMouseEnter={playHover}
                className={`p-1.5 rounded text-xs flex items-center gap-1 font-mono transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-copper-700/40 text-cyanAccent border border-copper-400/40'
                    : 'text-charcoal-400 hover:text-white'
                }`}
                aria-label="Grid Layout View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => {
                  playClick();
                  setViewMode('carousel');
                }}
                onMouseEnter={playHover}
                className={`p-1.5 rounded text-xs flex items-center gap-1 font-mono transition-colors ${
                  viewMode === 'carousel'
                    ? 'bg-copper-700/40 text-cyanAccent border border-copper-400/40'
                    : 'text-charcoal-400 hover:text-white'
                }`}
                aria-label="Horizontal Flow View"
              >
                <GalleryHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Flow</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Project Categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => handleCategorySelect(cat)}
              onMouseEnter={playHover}
              className={`font-mono text-xs px-3 py-1.5 rounded-full transition-all ${
                selectedCategory === cat
                  ? 'bg-copper-700/30 text-cyanAccent border border-copper-400/50 shadow-glowCyan'
                  : 'bg-charcoal-900/60 text-charcoal-400 hover:text-sandstone-300 border border-charcoal-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Display: Grid or Horizontal Flow */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelectCaseStudy={setActiveCaseStudy}
              />
            ))}
          </div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-thin">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="min-w-[300px] sm:min-w-[420px] lg:min-w-[500px] snap-center flex-shrink-0"
              >
                <ProjectCard
                  project={project}
                  onSelectCaseStudy={setActiveCaseStudy}
                />
              </div>
            ))}
          </div>
        )}

        {/* Full Archive Navigation Banner */}
        <div className="p-6 rounded-2xl bg-charcoal-900/50 border border-sandstone-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display text-base text-foreground font-medium">
              Looking for full engineering specifications & case studies?
            </h4>
            <p className="font-sans text-xs text-sandstone-300">
              Explore the complete project archive with deep-dive technical challenges, database schemas, and live repository links.
            </p>
          </div>
          <Link
            href="/allproject"
            onClick={playClick}
            onMouseEnter={playHover}
            className="font-mono text-xs px-5 py-2.5 rounded-xl bg-copper-500/20 border border-copper-400/40 text-cyanAccent hover:bg-copper-500/30 flex items-center gap-2 whitespace-nowrap shadow-glowCyan transition-all flex-shrink-0"
          >
            <span>Open All Projects ({projects.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Data Configuration Note for User */}
        <div className="p-4 rounded-xl bg-charcoal-900/30 border border-sandstone-500/15 flex items-center justify-between font-mono text-xs text-charcoal-400">
          <span>* Reusable data-driven project registry configured in src/data/projects.ts</span>
          <span className="text-copper-400">{filteredProjects.length} Projects Shipped</span>
        </div>
      </div>

      {/* Case Study Deep Dive Modal */}
      <CaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
      />
    </section>
  );
}
