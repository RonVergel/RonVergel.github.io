import React, { useState } from "react";
import { SiteNav } from "./components/SiteNav";
import { HeroSection } from "./components/HeroSection";
import { SkillsSection } from "./components/SkillsSection";
import { CertificationsSection } from "./components/CertificationsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { SpotifyPlayer } from "./components/SpotifyPlayer";
import { SiteFooter } from "./components/SiteFooter";
import { useLiquidGlass } from "./hooks/useLiquidGlass";

export function Portfolio() {
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false);
  const [isGlassOpen, setIsGlassOpen] = useState(false);
  const { intensity, setIntensity, resetIntensity } = useLiquidGlass();

  return (
    <div className="portfolio-root">
      {/* Fixed sticky navbar */}
      <SiteNav
        isSpotifyOpen={isSpotifyOpen}
        onToggleSpotify={() => setIsSpotifyOpen((p) => !p)}
        isGlassOpen={isGlassOpen}
        onToggleGlass={() => setIsGlassOpen((p) => !p)}
        glassIntensity={intensity}
        onGlassIntensityChange={setIntensity}
        onResetGlass={resetIntensity}
      />

      {/* Scrollable main content */}
      <main className="portfolio-main">
        <HeroSection />
        <SkillsSection />
        <CertificationsSection />
        <ProjectsSection />
        <ContactSection />
        <SiteFooter />
      </main>

      {/* Floating Spotify player */}
      <SpotifyPlayer
        isOpen={isSpotifyOpen}
        onToggle={() => setIsSpotifyOpen((p) => !p)}
      />
    </div>
  );
}
