"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Project = (typeof projects)[number];
type Kind = Project["kind"];

const kindLabels: Record<Kind, string> = {
  agent: "AI agent",
  platform: "Platform",
  data: "Data & ML"
};

const filters: { id: Kind | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "agent", label: "AI agents" },
  { id: "platform", label: "Platforms" },
  { id: "data", label: "Data & ML" }
];

const MAX_CARD_TOOLS = 4;

function Pipeline({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="pipeline" aria-label="Pipeline">
      {steps.map((step, index) => (
        <li key={step} style={{ "--step": index } as React.CSSProperties}>{step}</li>
      ))}
    </ol>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Kind | "all">("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visibleProjects = filter === "all" ? projects : projects.filter((project) => project.kind === filter);

  const openProject = (project: Project) => {
    setSelected(project);
    dialogRef.current?.showModal();
  };

  const closeProject = () => dialogRef.current?.close();

  return (
    <section id="projects" className="section section-alt">
      <div className="wrap">
        <div className="projects-head">
          <SectionHeading
            index="02"
            label="Projects"
            title="Projects"
            intro="Select a project to see what I built and the tools I used."
          />
          <div className="filters glass" role="group" aria-label="Filter projects">
            {filters.map((item) => {
              const count = item.id === "all" ? projects.length : projects.filter((project) => project.kind === item.id).length;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={filter === item.id ? "is-active" : undefined}
                  aria-pressed={filter === item.id}
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <ul className="project-grid">
          {visibleProjects.map((project) => (
            <li key={project.name} className={`project-card glass spot kind-${project.kind}`}>
              <p className="project-meta">
                <span>{kindLabels[project.kind]}</span>
                <span>{project.dates}</span>
              </p>
              <h3>{project.name}</h3>
              <p className="project-desc">{project.description}</p>
              <Pipeline steps={project.pipeline} />
              <ul className="chips chips-sm" aria-label="Stack">
                {project.tools.slice(0, MAX_CARD_TOOLS).map((tool) => <li key={tool}>{tool}</li>)}
                {project.tools.length > MAX_CARD_TOOLS && <li className="chip-more">+{project.tools.length - MAX_CARD_TOOLS}</li>}
              </ul>
              <button type="button" className="project-open" onClick={() => openProject(project)}>
                Details <ArrowUpRight size={15} />
                <span className="sr-only">: {project.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onClick={(event) => {
          // Clicks on the backdrop land on the dialog element itself.
          if (event.target === event.currentTarget) closeProject();
        }}
      >
        {selected && (
          <article className="dialog-inner">
            <header className="dialog-head">
              <p className="project-meta">
                <span>{selected.category}</span>
                <span>{selected.dates}</span>
              </p>
              <button type="button" className="icon-btn" onClick={closeProject} aria-label="Close project details">
                <X size={18} />
              </button>
            </header>
            <h3 id="project-dialog-title">{selected.name}</h3>
            <p className="dialog-desc">{selected.description}</p>

            <h4>Pipeline</h4>
            <Pipeline steps={selected.pipeline} />

            <h4>What I built</h4>
            <ul className="dialog-points">
              {selected.points.map((point) => <li key={point}>{point}</li>)}
            </ul>

            <div className="dialog-impact">
              <h4>Result</h4>
              <p>{selected.impact}</p>
            </div>

            <h4>Tools</h4>
            <ul className="chips">
              {selected.tools.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
          </article>
        )}
      </dialog>
    </section>
  );
}
