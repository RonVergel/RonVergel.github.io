import { useEffect, useRef } from "react";
import liquidGL from "liquid-gl";

export function useLiquidGL({
  target,
  intensity = 70,
  zIndex = 50,
  tilt = true,
  interaction = "fluid",
  tint = "rgba(10, 18, 30, 0.45)",
  enabled = true,
}) {
  const instancesRef = useRef([]);
  const lastIntensityRef = useRef(intensity);
  const intensityRef = useRef(intensity);
  intensityRef.current = intensity;

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let timeoutId;
    const rafId = requestAnimationFrame(() => {
      timeoutId = setTimeout(() => {
        try {
          const elements = document.querySelectorAll(target);
          if (!elements || elements.length === 0) return;

          const currentVal = intensityRef.current;
          const factor = Math.max(0, Math.min(100, currentVal)) / 100;
          const refraction = Number((factor * 0.032).toFixed(4));
          const aberration = Number((factor * 0.022).toFixed(4));
          const bevelDepth = Number((0.025 + factor * 0.09).toFixed(4));
          const frost = Number((factor * 2.2).toFixed(2));

          const res = liquidGL({
            target,
            snapshot: "body",
            resolution: 1.5,
            zIndex,
            content: false,
            refraction,
            aberration,
            bevelDepth,
            bevelWidth: 0.16,
            frost,
            shadow: true,
            specular: factor > 0.15,
            reveal: "fade",
            tilt: tilt && factor > 0.1,
            tiltFactor: 3.5,
            tiltEase: 400,
            interaction: factor > 0.1 ? interaction : "none",
            interactionStrength: 0.45,
            interactionRadius: 0.35,
            interactionViscosity: 0.65,
            tint,
            engine: "auto",
          });

          if (res) {
            instancesRef.current = Array.isArray(res) ? res : [res];
          }
        } catch (_err) {
          // Handled gracefully in fallback
        }
      }, 60);
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      if (instancesRef.current.length > 0) {
        instancesRef.current.forEach((lens) => {
          try {
            lens?.destroy?.();
          } catch (_e) {
            // ignore
          }
        });
        instancesRef.current = [];
      }
    };
  }, [target, zIndex, tilt, interaction, tint, enabled]);

  // Smooth live parameter update when only intensity changes
  useEffect(() => {
    if (instancesRef.current.length === 0) return;
    if (lastIntensityRef.current === intensity) return;
    lastIntensityRef.current = intensity;

    const factor = Math.max(0, Math.min(100, intensity)) / 100;
    const refraction = Number((factor * 0.032).toFixed(4));
    const aberration = Number((factor * 0.022).toFixed(4));
    const bevelDepth = Number((0.025 + factor * 0.09).toFixed(4));
    const frost = Number((factor * 2.2).toFixed(2));

    instancesRef.current.forEach((lens) => {
      if (lens && !lens._destroyed && lens.options) {
        lens.options.refraction = refraction;
        lens.options.aberration = aberration;
        lens.options.bevelDepth = bevelDepth;
        lens.options.frost = frost;
        lens.options.specular = factor > 0.15;
        if (typeof lens.setTint === "function") {
          lens.setTint(tint);
        }
        if (typeof lens.updateMetrics === "function") {
          lens.updateMetrics();
        }
      }
    });

    if (window.__liquidGLRenderer__?.render) {
      window.__liquidGLRenderer__.render();
    }
  }, [intensity, tint]);

  return instancesRef;
}
