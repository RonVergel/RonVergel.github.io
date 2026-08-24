import React, { useState } from "react";
import { SiteNav } from "./components/SiteNav";
import { HeroSection } from "./components/HeroSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import { SpotifyPlayer } from "./components/SpotifyPlayer";
import { SiteFooter } from "./components/SiteFooter";

export function Portfolio() {
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false);

  return (
    <div className="portfolio-root">
      {/* Fixed sticky navbar */}
      <SiteNav
        isSpotifyOpen={isSpotifyOpen}
        onToggleSpotify={() => setIsSpotifyOpen((p) => !p)}
      />

      {/* Scrollable main content */}
      <main className="portfolio-main">
        <HeroSection />
        <SkillsSection />
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
