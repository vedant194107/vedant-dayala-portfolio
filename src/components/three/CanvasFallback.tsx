'use client';

interface CanvasFallbackProps {
  reason?: 'reduced-motion' | 'no-webgl' | 'loading' | 'static';
}

export default function CanvasFallback({ reason }: CanvasFallbackProps) {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden select-none"
      aria-label="The Builder's Relic (Architectural Generative Projection)"
      role="img"
    >
      {/* Radial backlight */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-copper-600/20 via-sandstone-500/10 to-transparent blur-3xl" />

      {/* Layered Architectural SVG Sculpture */}
      <svg
        viewBox="0 0 500 500"
        className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] h-auto drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sandstoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ddb392" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#c49d7f" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7a5a40" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="copperGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38f0d0" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#368b7d" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1a3b36" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38f0d0" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#368b7d" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#07090c" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Coordinate Ring */}
        <circle
          cx="250"
          cy="250"
          r="220"
          stroke="#c49d7f"
          strokeOpacity="0.15"
          strokeWidth="1"
          strokeDasharray="4 8"
        />

        {/* Secondary Concentric Ring */}
        <circle
          cx="250"
          cy="250"
          r="180"
          stroke="#368b7d"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          strokeDasharray="2 4"
        />

        {/* Architectural Crosshair / Calibration Guides */}
        <line x1="250" y1="20" x2="250" y2="480" stroke="#c49d7f" strokeOpacity="0.1" strokeWidth="1" />
        <line x1="20" y1="250" x2="480" y2="250" stroke="#c49d7f" strokeOpacity="0.1" strokeWidth="1" />
        <line x1="90" y1="90" x2="410" y2="410" stroke="#368b7d" strokeOpacity="0.08" strokeWidth="1" />
        <line x1="410" y1="90" x2="90" y2="410" stroke="#368b7d" strokeOpacity="0.08" strokeWidth="1" />

        {/* Central Core Ambient Glow */}
        <circle cx="250" cy="250" r="140" fill="url(#coreGlow)" />

        {/* Layer 1: Outer Rotating Hexagon / Octagonal Chiseled Frame */}
        <polygon
          points="250,70 380,145 380,295 250,370 120,295 120,145"
          stroke="url(#sandstoneGrad)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 3"
        />

        {/* Layer 2: Intermediate Oxidized Copper Facets */}
        <polygon
          points="250,110 350,180 320,320 180,320 150,180"
          stroke="url(#copperGrad)"
          strokeWidth="1.5"
          fill="rgba(54, 139, 125, 0.05)"
        />

        {/* Layer 3: Central Polyhedral Diamond Crystal */}
        <polygon
          points="250,140 330,250 250,360 170,250"
          stroke="#38f0d0"
          strokeWidth="2"
          fill="rgba(56, 240, 208, 0.08)"
        />

        {/* Internal Crystalline Facet Lines */}
        <line x1="250" y1="140" x2="250" y2="360" stroke="#ddb392" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="170" y1="250" x2="330" y2="250" stroke="#ddb392" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="250" y1="200" x2="330" y2="250" stroke="#38f0d0" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="250" y1="200" x2="170" y2="250" stroke="#38f0d0" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="250" y1="300" x2="330" y2="250" stroke="#38f0d0" strokeWidth="1" strokeOpacity="0.6" />
        <line x1="250" y1="300" x2="170" y2="250" stroke="#38f0d0" strokeWidth="1" strokeOpacity="0.6" />

        {/* Tiny Atelier Coordinates & Engraved Code Tokens */}
        <text x="260" y="65" fill="#c49d7f" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
          23.0225° N · 72.5714° E
        </text>
        <text x="390" y="253" fill="#38f0d0" fillOpacity="0.7" fontSize="8" fontFamily="monospace">
          AMD_07
        </text>
        <text x="140" y="385" fill="#ddb392" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
          RELIC_V4.8
        </text>
        <text x="100" y="140" fill="#368b7d" fillOpacity="0.7" fontSize="8" fontFamily="monospace">
          R3F / WEBGL
        </text>

        {/* Small Concentric Pivots */}
        <circle cx="250" cy="70" r="3" fill="#38f0d0" />
        <circle cx="380" cy="145" r="3" fill="#c49d7f" />
        <circle cx="380" cy="295" r="3" fill="#38f0d0" />
        <circle cx="250" cy="370" r="3" fill="#c49d7f" />
        <circle cx="120" cy="295" r="3" fill="#38f0d0" />
        <circle cx="120" cy="145" r="3" fill="#c49d7f" />
        <circle cx="250" cy="250" r="4" fill="#ffffff" />
      </svg>

      {/* Status indicator below graphic */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-sandstone-400/80 px-3 py-1 rounded bg-charcoal-900/60 border border-sandstone-500/20 backdrop-blur-sm">
        {reason === 'reduced-motion'
          ? 'Static Relic Projection · Motion Reduced'
          : reason === 'no-webgl'
          ? 'Geometric Relic Projection · WebGL Offline'
          : 'The Builder’s Relic · Precision Geometry'}
      </div>
    </div>
  );
}
