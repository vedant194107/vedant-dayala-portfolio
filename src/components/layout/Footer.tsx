'use client';

import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons';
import { profileData } from '@/data/profile';
import { useAudioEffect } from '@/hooks/useAudioEffect';

export default function Footer() {
  const { playClick, playHover } = useAudioEffect();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-obsidian-950 border-t border-sandstone-500/15 py-12 px-4 sm:px-6 lg:px-8 relative z-10 text-charcoal-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Location */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="flex items-center gap-2 text-foreground font-display text-sm tracking-wide">
            <span className="w-2 h-2 rounded-full bg-copper-400" />
            <span>Vedant Dayala · Digital Atelier</span>
          </div>
          <p className="font-mono text-xs text-sandstone-400/80">
            Crafted in Ahmedabad, India · {profileData.coordinates}
          </p>
          <p className="font-mono text-[11px] text-charcoal-400 mt-1">
            © {new Date().getFullYear()} All rights reserved. Handcrafted with Next.js, Three.js & Tailwind.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-3">
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            onMouseEnter={playHover}
            className="p-2 rounded-md border border-charcoal-700 bg-charcoal-900/50 hover:border-cyanAccent/50 hover:text-cyanAccent text-sandstone-300 transition-colors"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            onMouseEnter={playHover}
            className="p-2 rounded-md border border-charcoal-700 bg-charcoal-900/50 hover:border-cyanAccent/50 hover:text-cyanAccent text-sandstone-300 transition-colors"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={`mailto:${profileData.email}`}
            aria-label="Send Email"
            onMouseEnter={playHover}
            className="p-2 rounded-md border border-charcoal-700 bg-charcoal-900/50 hover:border-cyanAccent/50 hover:text-cyanAccent text-sandstone-300 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Back to Top & Availability Indicator */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex items-center gap-2 font-mono text-xs text-copper-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyanAccent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-copper-400"></span>
            </span>
            <span>Available for new commissions</span>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={playHover}
            className="group inline-flex items-center gap-1.5 font-mono text-xs text-sandstone-400 hover:text-cyanAccent transition-colors focus:outline-none"
            aria-label="Ascend to Top of Atelier"
          >
            <span>Ascend to Top</span>
            <div className="w-5 h-5 rounded border border-charcoal-700 group-hover:border-cyanAccent/50 flex items-center justify-center transition-colors">
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
