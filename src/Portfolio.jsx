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
import { useLiquidGL } from "./hooks/useLiquidGL";

export function Portfolio() {
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false);
  const [isGlassOpen, setIsGlassOpen] = useState(false);
  const { intensity, setIntensity, resetIntensity } = useLiquidGlass();

  // Attach WebGPU/WebGL liquidGL shaders to navigation bar
  useLiquidGL({
    target: ".liquid-gl-nav",
    intensity,
    zIndex: 50,
    tilt: true,
    interaction: "fluid",
    deps: [isGlassOpen],
  });

  // Attach WebGPU/WebGL liquidGL shaders to portfolio feature cards
  useLiquidGL({
    target: ".liquid-gl-card",
    intensity,
    zIndex: 5,
    tilt: true,
    interaction: "fluid",
    deps: [],
  });

  // Attach WebGPU/WebGL liquidGL shaders to tuner popover modal when open
  useLiquidGL({
    target: ".liquid-gl-modal",
    intensity,
    zIndex: 100,
    tilt: false,
    interaction: "fluid",
    enabled: isGlassOpen,
    deps: [isGlassOpen],
  });

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
