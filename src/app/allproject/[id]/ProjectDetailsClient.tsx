'use client';

import { useState } from 'react';
import { ExternalLink, Check, Copy } from 'lucide-react';
import { GithubIcon } from '@/components/ui/BrandIcons';
import { ProjectData } from '@/types';
import { useAudioEffect } from '@/hooks/useAudioEffect';

interface Props {
  project: ProjectData;
}

export default function ProjectDetailsClient({ project }: Props) {
  const [copied, setCopied] = useState(false);
  const { playClick, playHover } = useAudioEffect();

  const handleCopy = () => {
    playClick();
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          onMouseEnter={playHover}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-copper-500/20 border border-copper-400/40 text-cyanAccent font-mono text-xs uppercase tracking-wider hover:bg-copper-500/30 transition-all shadow-glowCyan"
        >
          <span>Live Demo / Release</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}

      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          onMouseEnter={playHover}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-charcoal-900 border border-charcoal-700 text-sandstone-200 hover:text-white hover:border-sandstone-400 font-mono text-xs uppercase tracking-wider transition-colors"
        >
          <GithubIcon size={14} />
          <span>View Source Code</span>
        </a>
      )}

      <button
        onClick={handleCopy}
        onMouseEnter={playHover}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-obsidian-950 border border-charcoal-800 text-charcoal-400 hover:text-sandstone-300 font-mono text-xs transition-colors"
        aria-label="Copy page link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-cyanAccent" />
            <span className="text-cyanAccent">Link Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Share Project</span>
          </>
        )}
      </button>
    </div>
  );
}
