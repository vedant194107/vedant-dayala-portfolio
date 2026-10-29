'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Maximize2, 
  ExternalLink, ZoomIn, Image as ImageIcon 
} from 'lucide-react';
import { useAudioEffect } from '@/hooks/useAudioEffect';

interface ImageGalleryLightboxProps {
  images: string[];
  projectName?: string;
  className?: string;
  initialIndex?: number;
}

export default function ImageGalleryLightbox({
  images,
  projectName = 'Project',
  className = '',
  initialIndex,
}: ImageGalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    initialIndex !== undefined ? initialIndex : null
  );
  const { playClick, playHover } = useAudioEffect();

  const isOpen = selectedIndex !== null;
  const currentIndex = selectedIndex ?? 0;

  const handleNext = useCallback(() => {
    if (images.length === 0) return;
    playClick();
    setSelectedIndex((prev) => ((prev ?? 0) + 1) % images.length);
  }, [images.length, playClick]);

  const handlePrev = useCallback(() => {
    if (images.length === 0) return;
    playClick();
    setSelectedIndex((prev) => ((prev ?? 0) - 1 + images.length) % images.length);
  }, [images.length, playClick]);

  const handleClose = useCallback(() => {
    playClick();
    setSelectedIndex(null);
  }, [playClick]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose, handleNext, handlePrev]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!images || images.length === 0) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Thumbnail Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              playClick();
              setSelectedIndex(idx);
            }}
            onMouseEnter={playHover}
            className="group relative rounded-2xl overflow-hidden border border-sandstone-500/20 bg-charcoal-900/60 aspect-video shadow-lg focus:outline-none focus:ring-2 focus:ring-cyanAccent text-left cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img}
              alt={`${projectName} - photo ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Corner Badge */}
            <span className="absolute top-2.5 left-2.5 font-mono text-[10px] px-2 py-0.5 rounded-md bg-obsidian-950/85 text-sandstone-300 border border-charcoal-700/80 backdrop-blur-sm">
              {idx === 0 ? 'COVER' : `#${idx + 1}`}
            </span>

            {/* Hover Expand Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950/90 via-obsidian-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3.5">
              <div className="flex justify-end">
                <span className="p-1.5 rounded-lg bg-obsidian-950/80 text-cyanAccent border border-charcoal-700 shadow-sm">
                  <ZoomIn className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="font-mono text-[11px] text-cyanAccent block font-medium truncate">
                  {idx === 0 ? 'Primary System View' : `System Preview #${idx + 1}`}
                </span>
                <span className="font-mono text-[10px] text-charcoal-300 block">
                  Click to expand full resolution
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-obsidian-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar: Title, Counter & Action Buttons */}
          <div className="flex items-center justify-between border-b border-charcoal-800 pb-3 z-20">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 font-mono text-xs text-copper-400">
                <ImageIcon className="w-4 h-4 text-cyanAccent" />
                <span className="uppercase tracking-wider font-semibold text-foreground">
                  {projectName}
                </span>
              </div>
              <span className="text-charcoal-600 font-mono">/</span>
              <span className="font-mono text-xs text-cyanAccent">
                Image {(currentIndex + 1).toString().padStart(2, '0')} of{' '}
                {images.length.toString().padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={images[currentIndex]}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-charcoal-900 border border-charcoal-700 text-charcoal-300 hover:text-cyanAccent hover:border-copper-400/50 transition-colors"
                title="Open original image in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-xl bg-charcoal-900 border border-charcoal-700 text-charcoal-300 hover:text-white hover:border-sandstone-400 transition-colors"
                title="Close Lightbox (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Image Display Area */}
          <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
            {/* Previous Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-charcoal-900/80 border border-charcoal-700 text-sandstone-200 hover:text-cyanAccent hover:bg-charcoal-800 transition-all shadow-xl"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Centered Image without cropping */}
            <div className="max-w-6xl max-h-[75vh] w-full h-full flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[currentIndex]}
                alt={`${projectName} - slide ${currentIndex + 1}`}
                className="max-h-[75vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl border border-charcoal-800"
              />
            </div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-charcoal-900/80 border border-charcoal-700 text-sandstone-200 hover:text-cyanAccent hover:bg-charcoal-800 transition-all shadow-xl"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 pt-3 border-t border-charcoal-800 overflow-x-auto max-w-3xl mx-auto w-full z-20 scrollbar-thin">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    playClick();
                    setSelectedIndex(i);
                  }}
                  className={`relative w-16 sm:w-20 aspect-video rounded-lg overflow-hidden border transition-all flex-shrink-0 ${
                    i === currentIndex
                      ? 'border-cyanAccent scale-105 shadow-glowCyan'
                      : 'border-charcoal-800 opacity-50 hover:opacity-100 hover:border-charcoal-600'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-obsidian-950/80 text-[8px] font-mono text-center text-sandstone-300">
                    {i === 0 ? 'COVER' : `#${i + 1}`}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
