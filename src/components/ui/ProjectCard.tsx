'use client';

import React, { useState, useRef } from 'react';
import { ExternalLink, ArrowUpRight, BookOpen } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { ProjectData } from '@/types';
import { useAudioEffect } from '@/hooks/useAudioEffect';

interface ProjectCardProps {
  project: ProjectData;
  onSelectCaseStudy: (project: ProjectData) => void;
}

export default function ProjectCard({ project, onSelectCaseStudy }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { playHover, playClick } = useAudioEffect();

  // Subtle 3D tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -5;
    const rY = ((x - centerX) / centerX) * 5;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="chiseled-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group border border-sandstone-500/15"
    >
      {/* Top Hairline Illumination Bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 opacity-30 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
        }}
      />

      {/* Background Subtle Geometric Pattern */}
      <div className="absolute inset-0 jali-grid opacity-10 pointer-events-none" />

      {/* Card Content Top: Number, Category, Name */}
      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between border-b border-charcoal-700/60 pb-3">
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

        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-display font-medium text-foreground group-hover:text-sandstone-200 transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-sandstone-300/90 leading-relaxed font-sans">
            {project.impact}
          </p>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] px-2 py-0.5 rounded bg-charcoal-800/60 border border-charcoal-700/60 text-sandstone-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-charcoal-800/40 text-charcoal-400">
              +{project.tags.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Card Actions Bottom */}
      <div className="pt-6 mt-4 border-t border-charcoal-800/70 flex items-center justify-between gap-3 relative z-10">
        <button
          onClick={() => {
            playClick();
            onSelectCaseStudy(project);
          }}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-cyanAccent hover:text-white transition-colors group/btn"
        >
          <BookOpen className="w-3.5 h-3.5 text-copper-400 group-hover/btn:scale-110 transition-transform" />
          <span>View Case Study</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.name}`}
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
    </div>
  );
}
