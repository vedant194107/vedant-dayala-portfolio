'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Search, ExternalLink, ArrowUpRight 
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { projectsData as defaultProjects } from '@/data/projects';
import { ProjectData } from '@/types';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { useAudioEffect } from '@/hooks/useAudioEffect';

const DEFAULT_CATEGORIES = [
  'Enterprise Full-Stack System',
  'Full-Stack Management SaaS',
  'AI & Interactive Experience',
  'Financial Telemetry & Audit',
];

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>(defaultProjects);
  const [categoriesList, setCategoriesList] = useState<string[]>(DEFAULT_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  const activeProjects = useMemo(() => {
    return projects.filter((p) => p.status !== 'deleted');
  }, [projects]);

  const allCategories = useMemo(() => {
    return [
      'All',
      ...Array.from(new Set([...categoriesList, ...activeProjects.map((p) => p.category)])).filter(Boolean),
    ];
  }, [categoriesList, activeProjects]);

  const filteredProjects = useMemo(() => {
    return activeProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.name.toLowerCase().includes(q) ||
        project.impact.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some((t) => t.toLowerCase().includes(q)) ||
        project.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeProjects, searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-obsidian-950 text-foreground pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-copper-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-cyanAccent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 jali-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="flex items-center justify-between border-b border-sandstone-500/15 pb-4">
          <Link
            href="/"
            onClick={playClick}
            onMouseEnter={playHover}
            className="inline-flex items-center gap-2 font-mono text-xs text-copper-400 hover:text-cyanAccent transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Portfolio</span>
          </Link>

          <div className="font-mono text-xs text-sandstone-400/80">
            <span>INDEX: 00 — {activeProjects.length.toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Page Title & Mission Statement */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 font-mono text-xs text-copper-400">
            <span className="font-semibold text-cyanAccent">ARCHIVE</span>
            <span>/</span>
            <span className="uppercase tracking-widest">Engineering Catalog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium text-foreground tracking-tight">
            All Projects & Works
          </h1>
          <p className="text-base sm:text-lg text-sandstone-300/90 leading-relaxed font-sans">
            A comprehensive record of enterprise full-stack systems, management platforms, 
            interactive AI applications, and high-velocity financial tools engineered by Vedant Dayala.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 p-4 sm:p-6 rounded-2xl bg-charcoal-900/50 border border-sandstone-500/20 backdrop-blur-sm">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name, tech stack (Next.js, Prisma, MySQL...), or domain..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-950/80 border border-charcoal-700 text-sm text-foreground placeholder-charcoal-500 focus:outline-none focus:border-cyanAccent transition-colors font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[11px] text-charcoal-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2" role="tablist">
            {allCategories.map((cat) => {
              const count = cat === 'All'
                ? activeProjects.length
                : activeProjects.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  onClick={() => {
                    playClick();
                    setSelectedCategory(cat);
                  }}
                  onMouseEnter={playHover}
                  className={`font-mono text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-copper-700/35 text-cyanAccent border border-copper-400/50 shadow-glowCyan'
                      : 'bg-obsidian-950/70 text-charcoal-400 hover:text-sandstone-200 border border-charcoal-800'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[10px] opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between font-mono text-xs text-charcoal-400 border-b border-charcoal-800 pb-3">
          <span>
            Showing <strong className="text-cyanAccent">{filteredProjects.length}</strong> of{' '}
            {activeProjects.length} projects
          </span>
          {searchQuery && (
            <span>
              Keyword: &quot;<span className="text-sandstone-200">{searchQuery}</span>&quot;
            </span>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <RevealGroup staggerDelay={0.07} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <RevealItem key={project.id}>
                <article
                  className="chiseled-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group border border-sandstone-500/15 hover:border-sandstone-500/35 transition-all duration-300 h-full"
                >
                {/* Accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 opacity-40 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
                  }}
                />

                <div className="space-y-4">
                  {/* Metadata Header */}
                  <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-cyanAccent">
                        {project.number}
                      </span>
                      <span className="font-mono text-xs text-charcoal-500">/</span>
                      <span className="font-mono text-xs uppercase tracking-wider text-sandstone-400">
                        {project.category}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-charcoal-400">
                      {project.year}
                    </span>
                  </div>

                  {/* Project Title & Impact */}
                  <div className="space-y-2">
                    <Link
                      href={`/allproject/${project.id}`}
                      onClick={playClick}
                      className="group/title block"
                    >
                      <h2 className="text-2xl font-display font-medium text-foreground group-hover/title:text-cyanAccent transition-colors">
                        {project.name}
                      </h2>
                    </Link>
                    <p className="text-sm text-sandstone-300/90 leading-relaxed font-sans">
                      {project.impact}
                    </p>
                  </div>

                  {/* Context & Role Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] text-charcoal-400">
                    <span className="px-2 py-0.5 rounded bg-obsidian-950 border border-charcoal-800 text-copper-300">
                      {project.role}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-obsidian-950 border border-charcoal-800 text-sandstone-400">
                      {project.clientOrContext}
                    </span>
                  </div>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] px-2 py-0.5 rounded bg-charcoal-800/60 border border-charcoal-700/60 text-sandstone-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions Bottom */}
                <div className="pt-6 mt-6 border-t border-charcoal-800/80 flex items-center justify-between gap-3">
                  <Link
                    href={`/allproject/${project.id}`}
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-cyanAccent hover:text-white transition-colors group/link"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub source for ${project.name}`}
                        className="p-1.5 rounded border border-charcoal-700 text-charcoal-400 hover:text-white hover:border-sandstone-400 transition-colors"
                      >
                        <GithubIcon size={14} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live demo for ${project.name}`}
                        className="p-1.5 rounded border border-charcoal-700 text-charcoal-400 hover:text-cyanAccent hover:border-cyanAccent/50 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-charcoal-900/30 border border-charcoal-800 space-y-3">
            <p className="font-mono text-sm text-sandstone-400">
              No projects found matching &quot;{searchQuery}&quot; in category &quot;{selectedCategory}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="font-mono text-xs px-3 py-1.5 rounded bg-copper-600/30 border border-copper-400/40 text-cyanAccent"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Footer Contact CTA */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-charcoal-900/90 via-obsidian-950 to-charcoal-900/90 border border-sandstone-500/20 text-center space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-copper-400">
            Have a project in mind?
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-medium text-foreground">
            Let&apos;s build production-grade web systems together.
          </h2>
          <p className="text-sm text-sandstone-300 max-w-lg mx-auto font-sans">
            Available for full-time engineering positions and high-impact contract roles.
          </p>
          <div className="pt-2">
            <Link
              href="/#contact"
              onClick={playClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-copper-500/20 border border-copper-400/50 text-cyanAccent font-mono text-xs uppercase tracking-wider hover:bg-copper-500/30 transition-all shadow-glowCyan"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
