import React from "react";
import { PORTFOLIO_CONFIG } from "../portfolioConfig";
import { Cpu } from "lucide-react";

export function SkillsSection() {
  return (
    <section className="section-block" id="skills">
      <div className="section-header">
        <Cpu size={20} color="var(--pat-hud-cyan)" />
        <h2>TECH ARSENAL <span style={{ color: "var(--pat-police-dim)", fontWeight: 400 }}>// SKILLS</span></h2>
      </div>

      <div className="skills-grid">
        {PORTFOLIO_CONFIG.skills.map((group) => (
          <div key={group.category} className="skill-card">
            <h4 className="skill-category-label">{group.category}</h4>
            <div className="skill-tags">
              {group.items.map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
