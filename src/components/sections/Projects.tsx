"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Bot, BriefcaseBusiness, Database, FileText, ShieldCheck, X } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Project = (typeof projects)[number];

const featuredProjectNames = [
  "Product Label Comparison & Review Agent",
  "M365 Governance Intelligence Platform",
  "Regulatory Intelligence & AI Governance Agent",
  "E-commerce / Business Analytics Agent"
] as const;

function trimPreview(text: string, limit = 108) {
  return text.length > limit ? `${text.slice(0, limit).trim()}...` : text;
}

const visualIcons = [Bot, ShieldCheck, FileText, BarChart3, Database, BriefcaseBusiness];

const visualCopy: Record<string, { command: string; metrics: string[]; bars: number[] }> = {
  "Product Label Comparison & Review Agent": {
    command: "Artwork → OCR → AI Review → PDF",
    metrics: ["Nutrition changes", "Badge checks", "Report evidence"],
    bars: [72, 58, 86, 64]
  },
  "M365 Governance Intelligence Platform": {
    command: "Graph → Risk model → Governance dashboards",
    metrics: ["External access", "Critical sites", "Admin actions"],
    bars: [84, 62, 70, 48]
  },
  "Regulatory Intelligence & AI Governance Agent": {
    command: "Monitor → Version diff → Audit trail",
    metrics: ["URL tracking", "Change log", "Purview telemetry"],
    bars: [56, 78, 46, 68]
  },
  "E-commerce / Business Analytics Agent": {
    command: "Sales data → KPI answers → Decisions",
    metrics: ["Revenue trend", "Conversion", "Product demand"],
    bars: [66, 52, 74, 60]
  }
};

function getProjectVisual(project: Project, index: number) {
  const Icon = visualIcons[index % visualIcons.length];
  const visual = visualCopy[project.name] ?? {
    command: project.category.split("/")[0].trim(),
    metrics: project.tools.slice(0, 3),
    bars: [54 + index * 6, 74 - index * 4, 44 + index * 5, 66 - index * 3]
  };

  return (
    <div className="project-visual" aria-label={`${project.name} visualization`}>
      <div className="mock-window">
        <span />
        <span />
        <span />
      </div>
      <div className="mock-screen">
        <div className="mock-command">
          <Icon />
          <span>{visual.command}</span>
        </div>
        <div className="mock-bars">
          {visual.bars.map((height, barIndex) => <i key={barIndex} style={{ height: `${height}%` }} />)}
        </div>
        <div className="mock-metrics">
          {visual.metrics.map((metric) => (
            <b key={metric} style={{ height: "auto", color: "#0b2540", padding: "5px 8px", fontSize: ".66rem" }}>
              {metric}
            </b>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [caseStudy, setCaseStudy] = useState<Project | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef({ x: 0, scrollLeft: 0, moved: false });
  const featuredProjects = featuredProjectNames
    .map((name) => projects.find((project) => project.name === name))
    .filter((project): project is Project => Boolean(project));
  const moreProjects = projects.filter((project) => !featuredProjectNames.includes(project.name as typeof featuredProjectNames[number]));
  const railProjects = [...featuredProjects, ...moreProjects];

  function scrollRail(direction: number) {
    railRef.current?.scrollBy({ left: direction * 420, behavior: "smooth" });
  }

  return (
    <section id="projects" className="section alt">
      <div className="container">
        <SectionHeading
          eyebrow="Work"
          title="Selected projects"
          intro="A collection of AI, analytics, governance, and business-intelligence work. Open any project for its problem, solution, tools, and impact."
        />

        <div className="project-rail-controls" aria-label="Project carousel controls">
          <p>Drag, swipe, or scroll to explore</p>
          <div>
            <button type="button" onClick={() => scrollRail(-1)} aria-label="Scroll projects left"><ArrowLeft /></button>
            <button type="button" onClick={() => scrollRail(1)} aria-label="Scroll projects right"><ArrowRight /></button>
          </div>
        </div>

        <div
          className="project-rail"
          ref={railRef}
          onWheel={(event) => {
            if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
              event.currentTarget.scrollLeft += event.deltaY;
            }
          }}
          onPointerDown={(event) => {
            pointerStart.current = { x: event.clientX, scrollLeft: event.currentTarget.scrollLeft, moved: false };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
            const distance = event.clientX - pointerStart.current.x;
            if (Math.abs(distance) > 6) pointerStart.current.moved = true;
            event.currentTarget.scrollLeft = pointerStart.current.scrollLeft - distance;
          }}
          onPointerUp={(event) => event.currentTarget.releasePointerCapture(event.pointerId)}
        >
          {railProjects.map((project, index) => (
            <article
              className="featured-project-card project-rail-card"
              key={project.name}
              tabIndex={0}
              role="button"
              aria-label={`Open project details for ${project.name}`}
              onClick={() => !pointerStart.current.moved && setCaseStudy(project)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setCaseStudy(project);
                }
              }}
            >
              {getProjectVisual(project, index)}
              <div className="featured-project-copy">
                <p className="project-category">{project.category}</p>
                <h3>{project.name}</h3>
                <p>{trimPreview(project.impact, 132)}</p>
                <div className="featured-project-footer">
                  <div className="badges">
                    {project.tools.slice(0, 3).map((tool) => <span key={tool}>{tool}</span>)}
                  </div>
                  <span className="project-case-button">View details <ArrowUpRight /></span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {caseStudy && (
        <div
          className="case-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          onClick={() => setCaseStudy(null)}
        >
          <div className="case-modal-panel" onClick={(event) => event.stopPropagation()}>
            <button className="case-close" type="button" onClick={() => setCaseStudy(null)} aria-label="Close case study">
              <X />
            </button>
            <p className="project-category">{caseStudy.category}</p>
            <h3 id="case-study-title">{caseStudy.name}</h3>
            {caseStudy.dates && <p className="muted">{caseStudy.dates}</p>}
            <p className="case-description">{caseStudy.description}</p>
            <div className="case-columns">
              <div>
                <h4>What was built</h4>
                <ul>
                  {caseStudy.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
              <div>
                <h4>Tools used</h4>
                <div className="badges">
                  {caseStudy.tools.map((tool) => <span key={tool}>{tool}</span>)}
                </div>
                <div className="case-impact">
                  <strong>Business impact</strong>
                  <p>{caseStudy.impact}</p>
                </div>
                <div className="case-impact">
                  <strong>Business problem</strong>
                  <p>{caseStudy.description}</p>
                </div>
                <div className="case-impact">
                  <strong>Solution built</strong>
                  <p>{caseStudy.points[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
