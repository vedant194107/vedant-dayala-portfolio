'use client';

import { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Cpu } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { ProjectData } from '@/types';
import Button from './Button';
import { useAudioEffect } from '@/hooks/useAudioEffect';

interface CaseStudyModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const { playClick } = useAudioEffect();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleClose = () => {
    playClick();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-obsidian-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={handleClose} aria-hidden="true" />

      {/* Modal Content Box */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto chiseled-card rounded-2xl border border-sandstone-500/30 p-6 sm:p-8 lg:p-10 z-10 shadow-2xl space-y-8 bg-charcoal-900/95">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-charcoal-700 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-cyanAccent px-2.5 py-0.5 rounded bg-copper-500/20 border border-copper-400/30">
                {project.number} · {project.category}
              </span>
              <span className="font-mono text-xs text-sandstone-400">{project.year}</span>
            </div>
            <h3 id="case-study-title" className="text-2xl sm:text-3xl font-display font-medium text-foreground">
              {project.name}
            </h3>
            <p className="text-sm text-sandstone-300">{project.impact}</p>
          </div>

          <button
            onClick={handleClose}
            aria-label="Close Case Study"
            className="p-2 rounded-lg border border-charcoal-700 bg-charcoal-800 text-charcoal-400 hover:text-white hover:border-sandstone-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Preview in Case Study Modal */}
        {project.images && project.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {project.images.map((img, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden aspect-video border border-charcoal-700 bg-obsidian-950 shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}

        {/* Challenge & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-obsidian-950/60 border border-charcoal-800 space-y-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-sandstone-400 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-sandstone-500" />
              The Architectural Challenge
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-300 leading-relaxed">
              {project.caseStudy.challenge}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-copper-950/20 border border-copper-500/30 space-y-2">
            <h4 className="font-mono text-xs uppercase tracking-wider text-cyanAccent flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-copper-400" />
              The Atelier Solution
            </h4>
            <p className="text-xs sm:text-sm text-sandstone-200 leading-relaxed">
              {project.caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs uppercase tracking-wider text-sandstone-400">
            Key Technical Implementations
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.caseStudy.technicalHighlights.map((highlight, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-lg bg-charcoal-800/40 border border-charcoal-700/60 text-xs text-sandstone-200"
              >
                <CheckCircle2 className="w-4 h-4 text-cyanAccent flex-shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Notes & Outcomes */}
        <div className="p-4 rounded-xl bg-charcoal-800/30 border border-sandstone-500/15 space-y-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-sandstone-400 block">
            Impact & Measured Outcomes
          </span>
          <p className="text-xs sm:text-sm text-sandstone-300 leading-relaxed">
            {project.caseStudy.outcomes}
          </p>
        </div>

        {/* Technology Stack Tags */}
        <div className="space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-charcoal-400 block">
            Integrated Technologies
          </span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2.5 py-1 rounded bg-charcoal-800 border border-charcoal-700 text-sandstone-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-charcoal-700">
          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <Button
                variant="primary"
                size="sm"
                href={project.demoUrl}
                isExternal
                rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                Live Preview
              </Button>
            )}
            {project.githubUrl && (
              <Button
                variant="secondary"
                size="sm"
                href={project.githubUrl}
                isExternal
                leftIcon={<GithubIcon size={14} />}
              >
                Source Blueprint
              </Button>
            )}
          </div>

          <Button variant="ghost" size="sm" onClick={handleClose}>
            Close Blueprint
          </Button>
        </div>
      </div>
    </div>
  );
}
