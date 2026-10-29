import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NoiseOverlay from '@/components/layout/NoiseOverlay';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ToolboxSection from '@/components/sections/ToolboxSection';
import JourneySection from '@/components/sections/JourneySection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      {/* Handcrafted Grain Texture & Ambient Lightings */}
      <NoiseOverlay />

      {/* Fixed Atelier Navigation */}
      <Navbar />

      {/* Main Structural Flow */}
      <main id="main-content" className="relative flex flex-col w-full overflow-hidden">
        {/* 1. Hero / The Builder's Relic */}
        <HeroSection />

        {/* 2. Philosophy & Editorial Narrative */}
        <AboutSection />

        {/* 3. Selected Projects Gallery & Case Studies */}
        <ProjectsSection />

        {/* 4. Interactive Constellation of Tools / Workbench */}
        <ToolboxSection />

        {/* 5. Chronological Journey & Milestones */}
        <JourneySection />

        {/* 6. Signal Dispatch / Contact Form */}
        <ContactSection />
      </main>

      {/* Atelier Footer */}
      <Footer />
    </>
  );
}
