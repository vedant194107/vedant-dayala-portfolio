'use client';

import React, { useState, useRef } from 'react';
import { ExternalLink, ArrowUpRight, BookOpen, Activity, Terminal, Box, Compass } from 'lucide-react';
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

  // Bespoke Architectural Graphic for each project
  const renderGraphic = () => {
    switch (project.id) {
      case 'seemore-erp':
        return (
          <div className="w-full h-full flex flex-col justify-between py-1">
            <div className="flex items-center justify-between font-mono text-[9px] text-cyanAccent">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyanAccent animate-ping" />
                ERP DISPATCH PIPELINE
              </span>
              <span>PRISMA · MYSQL</span>
            </div>
            <div className="font-mono text-[9px] text-sandstone-300/90 bg-obsidian-950 p-1.5 rounded border border-charcoal-800 flex items-center justify-between">
              <code>ORDERS -> INVOICE -> DISPATCH -> ANDROID SYNC</code>
              <span className="text-cyanAccent font-bold">READY</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[8px] text-charcoal-500">
              <span>CATALOG: THREE.JS 3D</span>
              <span>PROCESSING: -74% TIME</span>
            </div>
          </div>
        );

      case 'urvi-estate':
        return (
          <div className="w-full h-full flex flex-col justify-between py-1">
            <div className="flex items-center justify-between font-mono text-[9px] text-sandstone-300">
              <span className="flex items-center gap-1">
                <Box className="w-3 h-3 text-copper-400" />
                ESTATE MAINTENANCE
              </span>
              <span>MULTI-PHASE SAAS</span>
            </div>
            <svg viewBox="0 0 240 28" className="w-full h-7" fill="none">
              <rect x="10" y="4" width="45" height="20" rx="3" stroke="#c49d7f" strokeWidth="1.2" fill="rgba(196, 157, 127, 0.1)" />
              <rect x="65" y="4" width="45" height="20" rx="3" stroke="#368b7d" strokeWidth="1.2" fill="rgba(54, 139, 125, 0.1)" />
              <rect x="120" y="4" width="50" height="20" rx="3" stroke="#38f0d0" strokeWidth="1.2" fill="rgba(56, 240, 208, 0.1)" />
              <line x1="180" y1="14" x2="230" y2="14" stroke="#c49d7f" strokeWidth="1.5" strokeDasharray="3 3" />
            </svg>
            <div className="flex items-center justify-between font-mono text-[8px] text-charcoal-500">
              <span>REPORTS: PDF SUMMARY</span>
              <span>ACCURACY: 100% AUDIT</span>
            </div>
          </div>
        );

      case 'tripflow-ai':
        return (
          <div className="w-full h-full flex flex-col justify-between py-1">
            <div className="flex items-center justify-between font-mono text-[9px] text-copper-300">
              <span className="flex items-center gap-1">
                <Compass className="w-3 h-3 text-cyanAccent" />
                AI ITINERARY ARCHITECT
              </span>
              <span className="text-cyanAccent">FRAMER MOTION</span>
            </div>
            <svg viewBox="0 0 240 28" className="w-full h-7" fill="none">
              <path
                d="M10 20 C50 2, 80 26, 120 8 S 180 24, 230 10"
                stroke={project.accentColor}
                strokeWidth="1.6"
              />
              <circle cx="10" cy="20" r="2.5" fill="#38f0d0" />
              <circle cx="70" cy="12" r="2.5" fill="#c49d7f" />
              <circle cx="120" cy="8" r="2.5" fill="#38f0d0" />
              <circle cx="170" cy="18" r="2.5" fill="#c49d7f" />
              <circle cx="230" cy="10" r="2.5" fill="#ffffff" />
            </svg>
            <div className="flex items-center justify-between font-mono text-[8px] text-charcoal-500">
              <span>WAYPOINTS: SYNCHRONIZED</span>
              <span>RENDER: ZERO_CLS</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full flex flex-col justify-between py-1">
            <div className="flex items-center justify-between font-mono text-[9px] text-sandstone-400">
              <span className="flex items-center gap-1">
                <Terminal className="w-3 h-3 text-copper-400" />
                CASH ENTRIES TELEMETRY
              </span>
              <span>DUAL-ENTRY</span>
            </div>
            <div className="font-mono text-[9px] text-cyanAccent/90 bg-obsidian-950 p-1.5 rounded border border-charcoal-800 flex items-center justify-between">
              <code>ATOMIC_TRANSACTION: DEBIT == CREDIT</code>
              <span className="text-copper-400">&lt;15ms</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[8px] text-charcoal-500">
              <span>VERIFICATION: ATOMIC</span>
              <span>EXPORT: CSV/PDF</span>
            </div>
          </div>
        );
    }
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

        <div>
          <h3 className="text-xl sm:text-2xl font-display font-medium text-foreground group-hover:text-sandstone-200 transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-sandstone-300/90 mt-1 leading-relaxed font-sans">
            {project.impact}
          </p>
        </div>

        {/* Abstract Architectural Wireframe Preview Widget */}
        <div className="h-28 sm:h-32 w-full rounded-xl bg-obsidian-950/85 border border-charcoal-800/80 p-3.5 flex flex-col justify-between relative overflow-hidden group-hover:border-sandstone-500/30 transition-colors">
          {renderGraphic()}
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
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
