import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ron_portfolio_liquid_glass_intensity";
const DEFAULT_INTENSITY = 70;

export function useLiquidGlass() {
  const [intensity, setIntensityState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const num = Number(saved);
        if (!isNaN(num) && num >= 0 && num <= 100) {
          return num;
        }
      }
    } catch (e) {
      // ignore
    }
    return DEFAULT_INTENSITY;
  });

  const applyGlassIntensity = useCallback((val) => {
    const root = document.documentElement;
    const norm = Math.max(0, Math.min(100, val));
    const factor = norm / 100;

    // Blur from 0px up to 36px
    const blurPx = Math.round(norm * 0.36);
    // Saturation from 100% to 220%
    const saturatePct = Math.round(100 + norm * 1.2);
    // Specular highlight opacity from 0.05 to 0.85
    const specularOpacity = (0.05 + factor * 0.8).toFixed(2);
    // Border opacity from 0.05 to 0.35
    const borderOpacity = (0.05 + factor * 0.3).toFixed(2);
    // Background gradient alphas
    const bgAlpha1 = (0.02 + factor * 0.20).toFixed(3);
    const bgAlpha2 = (0.005 + factor * 0.07).toFixed(3);
    // Card background alphas (solid dark -> translucent glass)
    const cardAlpha1 = (0.92 - factor * 0.32).toFixed(2);
    const cardAlpha2 = (0.98 - factor * 0.22).toFixed(2);
    // Specular glow radius
    const glowRadius = Math.round(norm * 0.3);

    root.style.setProperty("--liquid-blur", `blur(${blurPx}px) saturate(${saturatePct}%)`);
    root.style.setProperty(
      "--liquid-glass-bg",
      `linear-gradient(180deg, rgba(255, 255, 255, ${bgAlpha1}) 0%, rgba(255, 255, 255, ${bgAlpha2}) 100%)`
    );
    root.style.setProperty(
      "--liquid-glass-bg-hover",
      `linear-gradient(180deg, rgba(255, 255, 255, ${(Number(bgAlpha1) + 0.1).toFixed(3)}) 0%, rgba(255, 255, 255, ${(Number(bgAlpha2) + 0.04).toFixed(3)}) 100%)`
    );
    root.style.setProperty(
      "--liquid-glass-specular",
      `inset 0 1.5px 1px 0 rgba(255, 255, 255, ${specularOpacity}), inset 0 -1.5px 2px 0 rgba(0, 0, 0, ${(factor * 0.5).toFixed(2)}), 0 10px 30px -4px rgba(0, 0, 0, 0.6)`
    );
    root.style.setProperty(
      "--liquid-glass-specular-amber",
      `inset 0 1.5px 1.5px 0 rgba(255, 255, 255, ${Math.min(1, Number(specularOpacity) * 1.15).toFixed(2)}), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.3), 0 0 ${glowRadius}px rgba(255, 140, 33, ${(factor * 0.5).toFixed(2)})`
    );
    root.style.setProperty(
      "--liquid-glass-specular-cyan",
      `inset 0 1.5px 1.5px 0 rgba(255, 255, 255, ${Math.min(1, Number(specularOpacity) * 1.15).toFixed(2)}), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.3), 0 0 ${glowRadius}px rgba(56, 189, 248, ${(factor * 0.45).toFixed(2)})`
    );
    root.style.setProperty("--liquid-border", `1px solid rgba(255, 255, 255, ${borderOpacity})`);
    root.style.setProperty("--liquid-border-subtle", `1px solid rgba(255, 255, 255, ${(Number(borderOpacity) * 0.5).toFixed(2)})`);
    root.style.setProperty(
      "--glass-card-bg",
      `linear-gradient(180deg, rgba(24, 38, 58, ${cardAlpha1}) 0%, rgba(12, 19, 30, ${cardAlpha2}) 100%)`
    );
    root.style.setProperty("--glass-intensity-norm", String(factor));
  }, []);

  useEffect(() => {
    applyGlassIntensity(intensity);
  }, [intensity, applyGlassIntensity]);

  const setIntensity = (val) => {
    const num = Math.max(0, Math.min(100, Number(val)));
    setIntensityState(num);
    try {
      localStorage.setItem(STORAGE_KEY, String(num));
    } catch (e) {
      // ignore
    }
  };

  const resetIntensity = () => {
    setIntensity(DEFAULT_INTENSITY);
  };

  return {
    intensity,
    setIntensity,
    resetIntensity,
    defaultIntensity: DEFAULT_INTENSITY
  };
}
