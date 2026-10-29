'use client';

import { ChevronDown } from 'lucide-react';
import { useAudioEffect } from '@/hooks/useAudioEffect';

interface ScrollCueProps {
  targetId?: string;
  label?: string;
}

export default function ScrollCue({ targetId = 'about', label = 'Descend into Atelier' }: ScrollCueProps) {
  const { playClick, playHover } = useAudioEffect();

  const handleScroll = () => {
    playClick();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleScroll}
      onMouseEnter={playHover}
      aria-label={label}
      className="group flex flex-col items-center gap-2 text-charcoal-400 hover:text-cyanAccent transition-colors duration-300 focus:outline-none"
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-sandstone-400/80 group-hover:text-sandstone-200 transition-colors">
        {label}
      </span>
      <div className="w-5 h-8 rounded-full border border-sandstone-500/30 group-hover:border-cyanAccent/50 flex items-start justify-center p-1 transition-colors">
        <span className="w-1 h-2 rounded-full bg-cyanAccent animate-scrolldown" />
      </div>
      <ChevronDown className="w-3.5 h-3.5 text-copper-400 group-hover:translate-y-0.5 transition-transform" />
    </button>
  );
}
