import React, { useState } from "react";
import { Award, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";

const CERTS = [
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    issuer: "Certiport — IT Specialist",
    date: "March 13, 2026",
    code: "yuyC-uT27",
    color: "var(--pat-warning-rose)",
    glow: "rgba(244, 63, 94, 0.35)",
    icon: "🛡️",
    image: "/certificates/Cybersecurity.png",
    verifyUrl: "https://verify.certiport.com",
  },
  {
    id: "databases",
    title: "Databases",
    issuer: "Certiport — IT Specialist",
    date: "2024",
    color: "var(--pat-hud-cyan)",
    glow: "rgba(56, 189, 248, 0.35)",
    icon: "🗄️",
    image: "/certificates/Databases.png",
    verifyUrl: "https://verify.certiport.com",
  },
  {
    id: "htmlcss",
    title: "HTML & CSS",
    issuer: "Certiport — IT Specialist",
    date: "2024",
    color: "#f97316",
    glow: "rgba(249, 115, 22, 0.35)",
    icon: "🌐",
    image: "/certificates/HTMLCSS.png",
    verifyUrl: "https://verify.certiport.com",
  },
  {
    id: "java",
    title: "Java",
    issuer: "Certiport — IT Specialist",
    date: "2023",
    color: "#c084fc",
    glow: "rgba(192, 132, 252, 0.35)",
    icon: "☕",
    image: "/certificates/Java.png",
    verifyUrl: "https://verify.certiport.com",
  },
  {
    id: "networksecurity",
    title: "Network Security",
    issuer: "Certiport — IT Specialist",
    date: "2025",
    color: "var(--pat-radar-green)",
    glow: "rgba(52, 211, 153, 0.35)",
    icon: "🔒",
    image: "/certificates/NetworkSecurity.png",
    verifyUrl: "https://verify.certiport.com",
  },
  {
    id: "networking",
    title: "Networking",
    issuer: "Certiport — IT Specialist",
    date: "2025",
    color: "var(--pat-amber-vest)",
    glow: "rgba(255, 140, 33, 0.35)",
    icon: "🌐",
    image: "/certificates/Networking.png",
    verifyUrl: "https://verify.certiport.com",
  },
];

export function CertificationsSection() {
  const [lightbox, setLightbox] = useState(null); // index into CERTS

  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevCert = () => setLightbox((i) => (i - 1 + CERTS.length) % CERTS.length);
  const nextCert = () => setLightbox((i) => (i + 1) % CERTS.length);

  // Close on backdrop click
  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeLightbox();
  };

  // Keyboard nav
  React.useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft") prevCert();
      else if (e.key === "ArrowRight") nextCert();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <section className="section-block" id="certifications">
      <div className="section-header">
        <Award size={20} color="var(--pat-radar-green)" />
        <h2>
          CERTIFICATIONS{" "}
          <span style={{ color: "var(--pat-police-dim)", fontWeight: 400 }}>
            // IT SPECIALIST
          </span>
        </h2>
        <span
          className="patlabor-callsign-badge"
          style={{
            marginLeft: "auto",
            background: "rgba(52,211,153,0.12)",
            color: "var(--pat-radar-green)",
            borderColor: "rgba(52,211,153,0.35)",
          }}
        >
          Certiport × Pearson VUE
        </span>
      </div>

      {/* Sub-label */}
      <div
        style={{
          marginBottom: "24px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          color: "var(--pat-police-dim)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          className="status-mecha-blinker"
          style={{ position: "static", display: "inline-block" }}
        />
        Verified IT Specialist certifications — click any card to view the full certificate
      </div>

      {/* Cards Grid */}
      <div className="certs-grid">
        {CERTS.map((cert, idx) => (
          <button
            key={cert.id}
            id={`cert-card-${cert.id}`}
            className="cert-card"
            onClick={() => openLightbox(idx)}
            style={{ "--cert-color": cert.color, "--cert-glow": cert.glow }}
          >
            {/* Accent line uses cert color */}
            <div className="cert-card-accent" />

            {/* Thumbnail */}
            <div className="cert-thumb-wrap">
              <img
                src={cert.image}
                alt={`${cert.title} Certificate`}
                className="cert-thumb"
                loading="lazy"
              />
              <div className="cert-thumb-overlay">
                <ExternalLink size={18} />
                <span>View Certificate</span>
              </div>
            </div>

            {/* Info */}
            <div className="cert-info">
              <div className="cert-icon-badge">
                <span style={{ fontSize: "1.3rem" }}>{cert.icon}</span>
              </div>
              <div className="cert-text">
                <h4 className="cert-title">{cert.title}</h4>
                <p className="cert-issuer">{cert.issuer}</p>
                {cert.date && (
                  <p className="cert-date">{cert.date}</p>
                )}
              </div>
            </div>

            {/* Verified badge */}
            <div className="cert-verified-badge">
              ✓ Verified
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="cert-lightbox-backdrop" onClick={onBackdropClick}>
          <div className="cert-lightbox-card">
            {/* Header */}
            <div className="cert-lightbox-header">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "1.4rem" }}>{CERTS[lightbox].icon}</span>
                <div>
                  <h3 className="cert-lightbox-title">{CERTS[lightbox].title}</h3>
                  <p className="cert-lightbox-sub">{CERTS[lightbox].issuer}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a
                  href={CERTS[lightbox].verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="liquid-btn liquid-btn-cyan"
                  style={{ padding: "6px 14px", fontSize: "0.78rem" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={13} />
                  Verify
                </a>
                <button
                  className="liquid-btn"
                  style={{ padding: "6px 12px" }}
                  onClick={closeLightbox}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="cert-lightbox-image-wrap">
              <img
                src={CERTS[lightbox].image}
                alt={`${CERTS[lightbox].title} Certificate`}
                className="cert-lightbox-image"
              />
            </div>

            {/* Nav arrows */}
            <button
              className="cert-lightbox-nav cert-lightbox-nav-prev"
              onClick={prevCert}
              aria-label="Previous certificate"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="cert-lightbox-nav cert-lightbox-nav-next"
              onClick={nextCert}
              aria-label="Next certificate"
            >
              <ChevronRight size={22} />
            </button>

            {/* Dots */}
            <div className="cert-lightbox-dots">
              {CERTS.map((_, i) => (
                <button
                  key={i}
                  className={`cert-dot ${i === lightbox ? "cert-dot-active" : ""}`}
                  onClick={() => setLightbox(i)}
                  aria-label={`Go to certificate ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
