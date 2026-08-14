import React, { useState } from "react";
import {
  Mic,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Award,
  Zap,
  Smile,
  ShieldAlert
} from "lucide-react";
import confetti from "canvas-confetti";

export function InterviewWizard({ persona, onUpdateIdentity, onAddMemory, onFinish }) {
  const [currentStep, setCurrentStep] = useState(0);

  // Form State
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
      title: "Step 1: Identity & Vibe",
      icon: <Sparkles size={20} color="#38bdf8" />,
      description: "How should your AI introduce itself and represent you?",
      fields: [
        {
          id: "preferredName",
          label: "What should the AI call you / introduce itself as?",
          hint: "e.g. Ron, Ron Vergel",
          type: "text"
        },
        {
          id: "tagline",
          label: "Your 1-line developer tagline / role",
          hint: "e.g. Full-Stack Developer & Creative Coder",
          type: "text"
        }
      ]
    },
    {
      title: "Step 2: Passions & Current Obsessions",
      icon: <Zap size={20} color="#fbbf24" />,
      description: "What tech, hobbies, or domains are you currently most passionate about?",
      fields: [
        {
          id: "currentObsession",
          label: "What projects, tech, or games excite you the most right now?",
          hint: "e.g. Web Audio synthesizers, Electron apps, Genshin tactics, full-stack tools on Render...",
          type: "textarea"
        },
        {
          id: "favoriteGamesOrMusic",
          label: "Favorite games, music, or creative outlets?",
          hint: "e.g. Genshin Impact draft battles, Pokémon, music sequencing...",
          type: "text"
        }
      ]
    },
    {
      title: "Step 3: Voice, Slang & Mannerisms",
      icon: <Smile size={20} color="#34d399" />,
      description: "Teach your AI how you naturally speak with people.",
      fields: [
        {
          id: "speakingStyleSample",
          label: "A sample sentence or greeting that sounds just like you:",
          hint: "e.g. 'Hey! What's up? Check out this cool sequencer I just built!'",
          type: "textarea"
        },
        {
          id: "codingMotto",
          label: "Your primary coding philosophy or motto:",
          hint: "e.g. 'Always build things that feel interactive and snappy.'",
          type: "text"
        }
      ]
    },
    {
      title: "Step 4: Boundaries & Guardrails",
      icon: <ShieldAlert size={20} color="#fb7185" />,
      description: "Set rules on topics your AI should decline or keep confidential.",
      fields: [
        {
          id: "boundaries",
          label: "Topics, secrets, or data the AI must decline to answer:",
          hint: "e.g. Passwords, private financial details, non-work confidential matters.",
          type: "textarea"
        }
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Finished all steps
      handleCompleteInterview();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleCompleteInterview = () => {
    // 1. Update basic identity
    onUpdateIdentity({
      preferredName: answers.preferredName,
      tagline: answers.tagline
    });

    // 2. Add memories from interview answers
    if (answers.currentObsession) {
      onAddMemory({
        category: "Obsessions & Passions",
        title: "Current Tech Passions & Creative Focus",
        content: answers.currentObsession
      });
    }

    if (answers.codingMotto) {
      onAddMemory({
        category: "Development Philosophy",
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

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
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
          <h2>AI Persona Interview Studio</h2>
          <p>
            Answer a few quick questions to train and refine {persona.identity.preferredName}'s AI twin voice, mannerisms, and memory.
          </p>
        </div>
      </div>

      <div className="interview-stepper-box">
        {/* Step Indicator */}
        <div className="step-indicator-bar">
          {steps.map((step, idx) => {
            const isDone = idx < currentStep;
            const isActive = idx === currentStep;
            return (
              <div
                key={idx}
                className={`step-dot ${isActive ? "active" : isDone ? "completed" : ""}`}
                title={step.title}
              >
                {isDone ? <CheckCircle size={16} /> : idx + 1}
              </div>
            );
          })}
        </div>

        {/* Current Step Content */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            {activeStep.icon}
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{activeStep.title}</h3>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>{activeStep.description}</p>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
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
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px", paddingTop: "20px", borderTop: "1px solid var(--border-subtle)" }}>
          <button
            className="perspective-toggle"
            onClick={handlePrev}
            disabled={currentStep === 0}
            style={{ opacity: currentStep === 0 ? 0.3 : 1, cursor: currentStep === 0 ? "not-allowed" : "pointer" }}
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          <button className="btn-primary" onClick={handleNext}>
            <span>{currentStep === steps.length - 1 ? "Complete & Save Persona" : "Next Step"}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
