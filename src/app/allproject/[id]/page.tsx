import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, ExternalLink, ArrowUpRight, 
  CheckCircle2, Server, Layers, Cpu, Database, 
  Code2, Sparkles, Terminal 
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { getStoredProjects, getStoredProjectById } from '@/lib/serverStore';
import ProjectDetailsClient from './ProjectDetailsClient';
import ImageGalleryLightbox from '@/components/ui/ImageGalleryLightbox';

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const allProjects = getStoredProjects();
  return allProjects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getStoredProjectById(params.id);

  if (!project) {
    return {
      title: 'Project Not Found | Vedant Dayala',
    };
  }

  return {
    title: `${project.name} | Vedant Dayala Full-Stack Case Study`,
    description: project.impact || project.description,
    openGraph: {
      title: `${project.name} — Full-Stack Case Study`,
      description: project.impact,
      type: 'article',
    },
  };
}

export default function ProjectDetailsPage({ params }: Props) {
  const allProjects = getStoredProjects().filter((p) => p.status !== 'deleted');
  const currentIndex = allProjects.findIndex((p) => p.id === params.id);
  const project = allProjects[currentIndex];

  if (!project || project.status === 'deleted') {
    notFound();
  }

  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-obsidian-950 text-foreground pt-28 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div 
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: project.accentColor }}
      />
      <div className="absolute inset-0 jali-grid opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-14 relative z-10">
        {/* Top Breadcrumb Nav */}
        <div className="flex items-center justify-between border-b border-sandstone-500/15 pb-4">
          <Link
            href="/allproject"
            className="inline-flex items-center gap-2 font-mono text-xs text-copper-400 hover:text-cyanAccent transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>All Projects</span>
          </Link>

          <div className="flex items-center gap-2 font-mono text-xs text-sandstone-400">
            <span>PROJECT</span>
            <span className="text-cyanAccent font-semibold">{project.number}</span>
            <span>OF</span>
            <span>{allProjects.length.toString().padStart(2, '0')}</span>
          </div>
        </div>

        {/* Project Hero Header */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-copper-500/15 text-cyanAccent border border-copper-400/30">
              {project.category}
            </span>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-charcoal-900 text-sandstone-300 border border-charcoal-800">
              Year {project.year}
            </span>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-obsidian-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Production Deployed
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground tracking-tight">
            {project.name}
          </h1>

          <p className="text-lg sm:text-xl text-sandstone-200/90 leading-relaxed font-sans max-w-3xl">
            {project.impact}
          </p>

          {/* Action Links & Interactive Client Buttons */}
          <ProjectDetailsClient project={project} />
        </div>

        {/* Executive Meta Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-charcoal-900/60 border border-sandstone-500/20">
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase text-charcoal-400 block tracking-wider">
              Engineering Role
            </span>
            <span className="font-display text-sm font-semibold text-foreground block">
              {project.role}
            </span>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase text-charcoal-400 block tracking-wider">
              Domain / Context
            </span>
            <span className="font-display text-sm font-semibold text-sandstone-200 block truncate">
              {project.clientOrContext}
            </span>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase text-charcoal-400 block tracking-wider">
              Timeline / Release
            </span>
            <span className="font-mono text-sm font-semibold text-cyanAccent block">
              {project.year} Production
            </span>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[10px] uppercase text-charcoal-400 block tracking-wider">
              Primary Architecture
            </span>
            <span className="font-mono text-sm font-semibold text-sandstone-200 block">
              Full-Stack Next.js
            </span>
          </div>
        </div>

        {/* Tech Stack Pills List */}
        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-charcoal-400 block">
            Technologies & Tools Leveraged:
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-3 py-1 rounded-lg bg-charcoal-800/80 border border-charcoal-700/80 text-sandstone-200 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Project Gallery & Visual Showcase with Click Lightbox */}
        {project.images && project.images.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-charcoal-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-copper-400">
                <span className="font-bold text-cyanAccent">GALLERY</span>
                <span>/</span>
                <span className="uppercase tracking-widest">
                  Interface & Architecture Previews ({project.images.length})
                </span>
              </div>
              <span className="font-mono text-[11px] text-charcoal-400">
                Click any photo to open full gallery
              </span>
            </div>

            <ImageGalleryLightbox
              images={project.images}
              projectName={project.name}
            />
          </section>
        )}

        {/* Deep Dive Case Study Content */}
        <div className="space-y-12 pt-6 border-t border-charcoal-800">
          {/* Section 01: Challenge */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-copper-400">
              <span className="font-bold text-cyanAccent">01</span>
              <span>/</span>
              <span className="uppercase tracking-widest">Operational Challenge</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-foreground">
              The Problem & Business Context
            </h2>
            <div className="p-6 sm:p-8 rounded-2xl bg-charcoal-900/40 border border-sandstone-500/15 leading-relaxed text-sandstone-200 font-sans text-base sm:text-lg">
              {project.caseStudy.challenge}
            </div>
          </section>

          {/* Section 02: Architecture & Solution */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-copper-400">
              <span className="font-bold text-cyanAccent">02</span>
              <span>/</span>
              <span className="uppercase tracking-widest">Engineering Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-foreground">
              Solution & System Architecture
            </h2>
            <div className="p-6 sm:p-8 rounded-2xl bg-charcoal-900/40 border border-sandstone-500/15 space-y-4 leading-relaxed text-sandstone-200 font-sans text-base sm:text-lg">
              <p>{project.caseStudy.solution}</p>
              <div className="pt-3 border-t border-charcoal-800/80 flex items-start gap-2.5 font-mono text-xs text-charcoal-300">
                <Terminal className="w-4 h-4 text-cyanAccent flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Architectural Focus:</strong> {project.architectureNotes}
                </span>
              </div>
            </div>
          </section>

          {/* Section 03: Technical Highlights */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-copper-400">
              <span className="font-bold text-cyanAccent">03</span>
              <span>/</span>
              <span className="uppercase tracking-widest">Technical Highlights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-foreground">
              Key Capabilities & Engineering Deliverables
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.caseStudy.technicalHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-charcoal-900/40 border border-sandstone-500/15 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-cyanAccent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-sandstone-200 leading-relaxed font-sans">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 04: Outcomes & Impact */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-copper-400">
              <span className="font-bold text-cyanAccent">04</span>
              <span>/</span>
              <span className="uppercase tracking-widest">Production Impact</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-foreground">
              Outcomes & Production Results
            </h2>
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-copper-900/20 via-charcoal-900/60 to-obsidian-950 border border-copper-400/30 text-sandstone-100 font-sans text-base sm:text-lg leading-relaxed">
              {project.caseStudy.outcomes}
            </div>
          </section>
        </div>

        {/* Project Pagination Controls (Previous / Next) */}
        <div className="pt-10 border-t border-charcoal-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              href={`/allproject/${prevProject.id}`}
              className="p-4 sm:p-5 rounded-xl bg-charcoal-900/40 border border-charcoal-800 hover:border-sandstone-400/40 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center gap-1.5 font-mono text-xs text-charcoal-400 group-hover:text-cyanAccent transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>PREVIOUS PROJECT</span>
              </div>
              <span className="font-display text-base font-medium text-foreground group-hover:text-sandstone-200 mt-2">
                {prevProject.name}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextProject ? (
            <Link
              href={`/allproject/${nextProject.id}`}
              className="p-4 sm:p-5 rounded-xl bg-charcoal-900/40 border border-charcoal-800 hover:border-sandstone-400/40 transition-all flex flex-col justify-between items-end text-right group sm:col-start-2"
            >
              <div className="flex items-center gap-1.5 font-mono text-xs text-charcoal-400 group-hover:text-cyanAccent transition-colors">
                <span>NEXT PROJECT</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="font-display text-base font-medium text-foreground group-hover:text-sandstone-200 mt-2">
                {nextProject.name}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>

        {/* Bottom Hub CTA */}
        <div className="pt-6 text-center space-y-4">
          <Link
            href="/allproject"
            className="inline-flex items-center gap-2 font-mono text-xs px-5 py-2.5 rounded-xl bg-charcoal-900 border border-charcoal-700 text-sandstone-300 hover:text-white hover:border-sandstone-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse All {allProjects.length} Projects</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
