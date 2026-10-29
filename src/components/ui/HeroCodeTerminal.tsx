'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal, FileCode2, Cpu } from 'lucide-react';
import { useAudioEffect } from '@/hooks/useAudioEffect';

const TABS = [
  { id: 'developer', name: 'vedant.ts', icon: FileCode2 },
  { id: 'architecture', name: 'system.json', icon: Cpu },
  { id: 'status', name: 'status.sh', icon: Terminal },
];

export default function HeroCodeTerminal() {
  const [activeTab, setActiveTab] = useState<'developer' | 'architecture' | 'status'>('developer');
  const [copied, setCopied] = useState(false);
  const { playClick, playHover } = useAudioEffect();

  const handleTabChange = (tab: 'developer' | 'architecture' | 'status') => {
    playClick();
    setActiveTab(tab);
  };

  const getCodeContent = () => {
    switch (activeTab) {
      case 'developer':
        return `// The Developer Specification
export const engineer: FullStackDeveloper = {
  name: "Vedant Dayala",
  title: "Full Stack Developer",
  location: "Ahmedabad, Gujarat, India",
  coordinates: "23.0225° N, 72.5714° E",
  status: "Open for high-impact roles",
  coreStack: {
    frontend: ["Next.js 14", "React", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Express", "Prisma ORM", "MySQL", "REST APIs"],
    spatial: ["Three.js", "React Three Fiber", "Framer Motion"]
  },
  flagships: [
    "Enterprise ERP & Manufacturing Suite",
    "Industrial Estate & Maintenance Portal",
    "Tripflow AI Travel Architect",
    "CashEntries Financial Ledger"
  ]
};`;

      case 'architecture':
        return `{
  "system": "Digital Atelier Production V2",
  "performance": {
    "LCP": "0.85s (Fast)",
    "FID": "< 12ms",
    "CLS": 0.00,
    "uptime": "99.98%"
  },
  "database": {
    "engine": "MySQL / PostgreSQL",
    "orm": "Prisma with strict schemas",
    "atomicTransactions": true
  },
  "accessibility": {
    "standard": "WCAG 2.1 AA",
    "keyboardNav": "100%",
    "reducedMotion": "Native Fallback"
  }
}`;

      case 'status':
        return `$ pnpm atelier:diagnostics
✔ Validating Next.js 14 App Router... [OK]
✔ Synchronizing Prisma ORM models... [OK]
✔ Checking API route response times... [<14ms]
✔ Active Region: Asia/Kolkata (IST Edge)
✔ Build Status: 0 Errors · 0 Warnings · Prerendered

[ATELIER_READY] Vedant Dayala is online.`;
    }
  };

  const handleCopy = () => {
    playClick();
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(getCodeContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full rounded-2xl chiseled-card border border-sandstone-500/25 overflow-hidden shadow-2xl relative group bg-obsidian-950/90 backdrop-blur-md">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-charcoal-900/90 border-b border-charcoal-700/80">
        {/* Window Dots in Atelier Colors */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-sandstone-600/70 border border-sandstone-400/40" />
          <span className="w-3 h-3 rounded-full bg-copper-600/70 border border-copper-400/40" />
          <span className="w-3 h-3 rounded-full bg-cyanAccent/70 border border-cyanAccent/50" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-charcoal-400 hidden sm:inline">
            ATELIER WORKBENCH · V2.4
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-obsidian-950/80 p-1 rounded-lg border border-charcoal-800">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as typeof activeTab)}
                onMouseEnter={playHover}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                  isActive
                    ? 'bg-copper-700/40 text-cyanAccent border border-copper-400/50 shadow-sm'
                    : 'text-charcoal-400 hover:text-sandstone-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          onMouseEnter={playHover}
          aria-label="Copy snippet to clipboard"
          className="p-1.5 rounded border border-charcoal-700 hover:border-cyanAccent/50 text-charcoal-400 hover:text-cyanAccent transition-colors relative"
          title="Copy snippet"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-cyanAccent" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 sm:p-5 overflow-x-auto font-mono text-xs leading-relaxed max-h-[380px] scrollbar-thin">
        <pre className="text-sandstone-200">
          <code>
            {getCodeContent()
              .split('\n')
              .map((line, i) => {
                const isComment = line.trim().startsWith('//') || line.trim().startsWith('$');
                const isKey = line.includes(':');
                const isString = line.includes('"') || line.includes("'");
                const isSuccess = line.includes('[OK]') || line.includes('[ATELIER_READY]') || line.includes('✔');

                return (
                  <div key={i} className="table-row">
                    <span className="table-cell pr-4 text-right select-none text-charcoal-600 text-[10px]">
                      {i + 1}
                    </span>
                    <span
                      className={`table-cell whitespace-pre ${
                        isSuccess
                          ? 'text-cyanAccent font-semibold'
                          : isComment
                          ? 'text-copper-400 italic'
                          : isKey && !isString
                          ? 'text-sandstone-300'
                          : isString
                          ? 'text-sandstone-100'
                          : 'text-sandstone-200'
                      }`}
                    >
                      {line}
                    </span>
                  </div>
                );
              })}
          </code>
        </pre>
      </div>

      {/* Bottom Status Bar */}
      <div className="px-4 py-2 bg-charcoal-900/70 border-t border-charcoal-800/80 flex items-center justify-between font-mono text-[10px] text-charcoal-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyanAccent animate-ping" />
          <span className="text-sandstone-300">STATUS: PRODUCTION_READY</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">UTF-8</span>
          <span className="text-copper-400">TypeScript 5.0</span>
        </div>
      </div>
    </div>
  );
}
