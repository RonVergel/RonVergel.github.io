import React, { useState } from "react";
import {
  Mic,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Zap,
  Smile,
  ShieldAlert,
  Radio
} from "lucide-react";
import confetti from "canvas-confetti";

export function InterviewWizard({ persona, onUpdateIdentity, onAddMemory, onFinish }) {
  const [currentStep, setCurrentStep] = useState(0);

  const [answers, setAnswers] = useState({
    preferredName: persona.identity.preferredName || "Ron",
    tagline: persona.identity.tagline || "",
    currentObsession: "Web Audio synthesis, real-time interactive apps & Genshin Impact draft mechanics",
    speakingStyleSample: "Hey! What's up? Check out what I'm working on right now.",
    codingMotto: "Build software that feels alive, snappy, and fun to interact with.",
    favoriteGamesOrMusic: "Genshin Impact, Pokémon, electronic & synth music composition.",
    boundaries: "Keep personal passwords, private financial data, and sensitive info confidential."
  });

  const steps = [
    {
      title: "STAGE 01 // PILOT CALLSIGN & IDENTITY",
      icon: <Sparkles size={20} color="var(--pat-amber-vest)" />,
      description: "Define the pilot's name, tactical callsign, and primary role.",
      fields: [
        {
          id: "preferredName",
          label: "Pilot Callsign / Preferred Name",
          hint: "e.g. Ron, Ron Vergel",
          type: "text"
        },
        {
          id: "tagline",
          label: "1-Line Engineering Tagline / Role",
          hint: "e.g. Full-Stack Developer & Creative Web Creator",
          type: "text"
        }
      ]
    },
    {
      title: "STAGE 02 // LABORS & CURRENT OBSESSIONS",
      icon: <Zap size={20} color="var(--pat-amber-vest)" />,
      description: "What creative coding domains or game strategies are you passionate about?",
      fields: [
        {
          id: "currentObsession",
          label: "Current Technical Passions & Creative Focus",
          hint: "e.g. Web Audio synthesizers, Electron apps, Genshin tactics, Render deployments...",
          type: "textarea"
        },
        {
          id: "favoriteGamesOrMusic",
          label: "Gaming, Music & Creative Outlets",
          hint: "e.g. Genshin Impact draft battles, synth music sequencing...",
          type: "text"
        }
      ]
    },
    {
      title: "STAGE 03 // PILOT MANNERISMS & VOICE SYNCHRONIZATION",
      icon: <Smile size={20} color="var(--pat-radar-green)" />,
      description: "Teach your AI how you speak in live comms.",
      fields: [
        {
          id: "speakingStyleSample",
          label: "A sample sentence or greeting in your authentic voice:",
          hint: "e.g. 'Hey! What's up? Check out this cool sequencer I just built!'",
          type: "textarea"
        },
        {
          id: "codingMotto",
          label: "Core Engineering Philosophy / Motto:",
          hint: "e.g. 'Always build things that feel interactive, tactile, and snappy.'",
          type: "text"
        }
      ]
    },
    {
      title: "STAGE 04 // PROTOCOLS & SECURITY BOUNDARIES",
      icon: <ShieldAlert size={20} color="var(--pat-warning-rose)" />,
      description: "Set safety rules on confidential data the AI must refuse to disclose.",
      fields: [
        {
          id: "boundaries",
          label: "Classified Topics & Security Guardrails:",
          hint: "e.g. Passwords, private keys, financial data, sensitive personal info.",
          type: "textarea"
        }
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleCompleteInterview();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleCompleteInterview = () => {
    onUpdateIdentity({
      preferredName: answers.preferredName,
      tagline: answers.tagline
    });

    if (answers.currentObsession) {
      onAddMemory({
        category: "Passions & Labors",
        title: "Current Tech Passions & Creative Focus",
        content: answers.currentObsession
      });
    }

    if (answers.codingMotto) {
      onAddMemory({
        category: "Engineering Philosophy",
        title: "Core Development Motto",
        content: answers.codingMotto
      });
    }

    if (answers.favoriteGamesOrMusic) {
      onAddMemory({
        category: "Gaming & Music",
        title: "Gaming & Music Favorites",
        content: answers.favoriteGamesOrMusic
      });
    }

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    if (onFinish) onFinish();
  };

  const activeStep = steps[currentStep];

  return (
    <div className="panel-view-container">
      <div className="view-header">
        <div>
          <h2>SV-2 PILOT SYNCHRONIZATION // DIAGNOSTIC</h2>
          <p>
            // COMPLETE STAGE CALIBRATION TO ALIGN THE AI TWIN'S NEURAL REASONING MATRIX
          </p>
        </div>
      </div>

      <div className="interview-stepper-box">
        {/* Step Indicator */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          {steps.map((step, idx) => {
            const isDone = idx < currentStep;
            const isActive = idx === currentStep;
            return (
              <div
                key={idx}
                className={`step-dot ${isActive ? "active" : isDone ? "completed" : ""}`}
                title={step.title}
              >
                {isDone ? <CheckCircle size={18} /> : `0${idx + 1}`}
              </div>
            );
          })}
        </div>

        {/* Step Header */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            {activeStep.icon}
            <h3 style={{ fontFamily: "var(--font-mecha)", fontSize: "1.25rem", fontWeight: 700, color: "var(--pat-police-white)" }}>
              {activeStep.title}
            </h3>
          </div>
          <p style={{ color: "var(--pat-police-muted)", fontSize: "0.88rem", fontFamily: "var(--font-mono)" }}>
            {activeStep.description}
          </p>
        </div>

        {/* Form Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {activeStep.fields.map((f) => (
            <div key={f.id} className="form-group">
              <label className="form-label">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={answers[f.id] || ""}
                  placeholder={f.hint}
                  onChange={(e) => setAnswers({ ...answers, [f.id]: e.target.value })}
                />
              ) : (
                <input
                  type="text"
                  className="form-input"
                  value={answers[f.id] || ""}
                  placeholder={f.hint}
                  onChange={(e) => setAnswers({ ...answers, [f.id]: e.target.value })}
                />
              )}
              {f.hint && <span className="form-hint">{f.hint}</span>}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "36px", paddingTop: "22px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <button
            className="liquid-btn"
            onClick={handlePrev}
            disabled={currentStep === 0}
            style={{ opacity: currentStep === 0 ? 0.3 : 1, cursor: currentStep === 0 ? "not-allowed" : "pointer" }}
          >
            <ArrowLeft size={16} />
            Previous Stage
          </button>

          <button className="liquid-btn liquid-btn-amber" onClick={handleNext}>
            <span>{currentStep === steps.length - 1 ? "Complete Calibration & Launch" : "Next Stage"}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
