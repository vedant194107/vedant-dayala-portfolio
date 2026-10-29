'use client';

export default function NoiseOverlay() {
  return (
    <>
      {/* Handcrafted subtle noise grain overlay */}
      <div className="noise-bg" aria-hidden="true" />
      
      {/* Ambient atelier corner lights */}
      <div
        className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-copper-500/[0.04] rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-sandstone-500/[0.03] rounded-full blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />
    </>
  );
}
