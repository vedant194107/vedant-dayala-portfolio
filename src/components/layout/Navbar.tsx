'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useAudioEffect } from '@/hooks/useAudioEffect';
import TimeDisplay from '@/components/ui/TimeDisplay';

interface NavLinkItem {
  label: string;
  href: string;
  isBadge?: boolean;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: 'Work', href: '/#projects' },
  { label: 'All Projects', href: '/allproject' },
  { label: 'About', href: '/#about' },
  { label: 'Toolbox', href: '/#toolbox' },
  { label: 'Journey', href: '/#journey' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { soundEnabled, toggleSound, playClick, playHover } = useAudioEffect();

  // Scroll Progress Tracking for Horizontal Indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = () => {
    playClick();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-obsidian-950/85 backdrop-blur-md border-b border-sandstone-500/15 py-3 shadow-atelier'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Monogram */}
          <Link
            href="/"
            onClick={playClick}
            onMouseEnter={playHover}
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label="Atelier Home"
          >
            <div className="w-8 h-8 rounded border border-sandstone-500/30 group-hover:border-cyanAccent/60 bg-charcoal-900/60 flex items-center justify-center transition-colors">
              <span className="font-mono text-xs font-bold text-cyanAccent group-hover:text-white transition-colors">
                VD
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm tracking-wide text-foreground group-hover:text-sandstone-200 transition-colors">
                Vedant Dayala
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-sandstone-400/80">
                Digital Atelier · AMD
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={playClick}
                onMouseEnter={playHover}
                className="px-3 py-1.5 rounded text-xs font-mono text-charcoal-400 hover:text-cyanAccent hover:bg-charcoal-800/40 transition-all relative group"
              >
                <span>{link.label}</span>
                {link.isBadge && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-copper-500/20 text-cyanAccent text-[9px] border border-copper-400/30">
                    EXP
                  </span>
                )}
                <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-cyanAccent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          {/* Right Action Bar: Time, Sound Toggle, Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block border-r border-charcoal-700 pr-3">
              <TimeDisplay />
            </div>

            {/* Audio Feedback Toggle */}
            <button
              onClick={toggleSound}
              onMouseEnter={playHover}
              aria-label={soundEnabled ? 'Mute ambient sound effects' : 'Enable tactile sound effects'}
              className="p-2 rounded border border-sandstone-500/20 hover:border-cyanAccent/50 bg-charcoal-900/40 text-sandstone-300 hover:text-cyanAccent transition-colors relative group"
              title={soundEnabled ? 'Audio Feedback Active' : 'Enable Audio Feedback'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-cyanAccent animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-charcoal-400" />
              )}
              <span className="sr-only">
                {soundEnabled ? 'Audio Feedback Enabled' : 'Audio Feedback Muted'}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              className="md:hidden p-2 rounded border border-sandstone-500/25 bg-charcoal-900/60 text-sandstone-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Progress Bar along Bottom Border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-sandstone-500/10 overflow-hidden pointer-events-none"
          role="progressbar"
          aria-label="Reading progress"
        >
          <motion.div
            style={{ scaleX }}
            className="h-full bg-gradient-to-r from-copper-500 via-cyanAccent to-sandstone-300 origin-left shadow-[0_0_10px_rgba(45,212,191,0.7)]"
          />
        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-0 z-40 bg-obsidian-950/95 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col justify-between p-6 pt-24 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-sandstone-400/70 border-b border-charcoal-800 pb-2">
            Navigation Quadrants
          </p>
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link, idx) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className="flex items-center justify-between text-xl font-display text-foreground hover:text-cyanAccent p-2 rounded hover:bg-charcoal-800/40 transition-colors border-b border-charcoal-900/60"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-sandstone-500">0{idx + 1}</span>
                  <span>{link.label}</span>
                </span>
                {link.isBadge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-copper-500/20 text-cyanAccent border border-copper-400/30">
                    Experiments
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-charcoal-800/80 pt-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-sandstone-400">Atelier Clock</span>
            <TimeDisplay />
          </div>
          <p className="font-mono text-[11px] text-charcoal-400">
            Ahmedabad, India · 23.0225° N, 72.5714° E
          </p>
        </div>
      </div>
    </>
  );
}
