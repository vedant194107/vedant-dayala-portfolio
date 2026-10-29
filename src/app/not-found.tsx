import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-obsidian-950 text-foreground flex items-center justify-center p-6 relative overflow-hidden atelier-grid">
      <div className="absolute inset-0 bg-atelier-radial pointer-events-none" />
      
      <div className="max-w-md w-full chiseled-card p-8 md:p-10 text-center relative z-10 border border-sandstone-500/20">
        <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-copper-500/40 bg-copper-900/20 flex items-center justify-center text-cyanAccent">
          <Compass className="w-7 h-7 animate-spin" style={{ animationDuration: '12s' }} />
        </div>
        
        <p className="font-mono text-xs uppercase tracking-widest text-sandstone-400 mb-2">
          Coordinates Uncharted · 404
        </p>
        
        <h1 className="text-3xl font-display font-medium text-foreground mb-4">
          Lost in the Atelier
        </h1>
        
        <p className="text-sm text-charcoal-400 leading-relaxed mb-8">
          The quadrant or blueprint you are seeking does not exist or has been shifted in the digital workshop.
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-copper-700/30 hover:bg-copper-600/40 border border-copper-400/40 text-cyanAccent hover:text-white transition-all text-sm font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Workshop Floor</span>
        </Link>
      </div>
    </main>
  );
}
