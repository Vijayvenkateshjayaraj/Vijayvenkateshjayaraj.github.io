"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Download, LoaderCircle, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Run = {
  chip: string;
  command: string;
  steps: readonly string[];
  output: string;
  tools: readonly string[];
};

const demos = [
  { name: "Product Label Comparison & Review Agent", command: "label-review", chip: "Label review" },
  { name: "Insurance Intake Agent", command: "insurance-intake", chip: "Insurance intake" },
  { name: "Local LLM Inference Bridge", command: "local-llm-bridge", chip: "Local LLM" }
] as const;

// The console replays real projects: each step is the project's pipeline and the output is its recorded impact.
const toRun = (project: (typeof projects)[number], chip: string, command: string): Run => ({
  chip,
  command: `agent run ${command}`,
  steps: project.pipeline,
  output: project.impact,
  tools: project.tools.slice(0, 4)
});

const pickedRuns = demos.flatMap((demo) => {
  const project = projects.find((item) => item.name === demo.name);
  return project ? [toRun(project, demo.chip, demo.command)] : [];
});

// Fall back to the first projects if a demo name drifts, so the console never renders without a run.
const runs: Run[] = pickedRuns.length
  ? pickedRuns
  : projects.slice(0, 3).map((project, index) => toRun(project, `Project ${index + 1}`, `project-${index + 1}`));

// The replay is driven by a single tick counter so every frame is derived, not stored.
// A 50ms tick keeps the replay smooth while re-rendering the console only 20 times a second.
const TICK_MS = 50;
const PAUSE_TICKS = 7;
const STEP_TICKS = 11;
const HOLD_TICKS = 120;
const OUTPUT_CHARS_PER_TICK = 3;

function timeline(run: Run) {
  const stepsStart = run.command.length + PAUSE_TICKS;
  const outputStart = stepsStart + run.steps.length * STEP_TICKS + 4;
  const outputEnd = outputStart + Math.ceil(run.output.length / OUTPUT_CHARS_PER_TICK);
  return { stepsStart, outputStart, outputEnd, end: outputEnd + HOLD_TICKS };
}

// Headline results taken from the résumé.
const stats = [
  { value: "4.5", label: "Years experience" },
  { value: "88%", label: "Label-diff accuracy" },
  { value: "1,250", label: "Risky links removed" },
  { value: "50+", label: "Chatbots deployed" }
];

export function Hero() {
  const [session, setSession] = useState({ active: 0, tick: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const autoPlay = useRef(true);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = consoleRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !isVisible) return;
    const interval = window.setInterval(() => {
      setSession((current) => {
        if (current.tick < timeline(runs[current.active]).end) return { ...current, tick: current.tick + 1 };
        if (autoPlay.current) return { active: (current.active + 1) % runs.length, tick: 0 };
        return current;
      });
    }, TICK_MS);
    return () => window.clearInterval(interval);
  }, [reducedMotion, isVisible]);

  const run = runs[session.active];
  const t = timeline(run);
  // With reduced motion the run is shown fully resolved instead of replayed.
  const tick = reducedMotion ? t.outputEnd : session.tick;
  const command = run.command.slice(0, tick);
  const isTyping = tick < run.command.length;
  const output = run.output.slice(0, Math.max(0, (tick - t.outputStart) * OUTPUT_CHARS_PER_TICK));
  const isStreaming = tick >= t.outputStart && tick < t.outputEnd;
  const isComplete = tick >= t.outputEnd;
  const progress = Math.min(1, tick / t.outputEnd);

  const replay = (index: number) => {
    autoPlay.current = false;
    setSession({ active: index, tick: 0 });
  };

  return (
    <section id="top" className="hero">
      <div className="hero-floor" aria-hidden="true" />
      <div className="wrap hero-layout">
        <div className="hero-copy">
          <div className="hero-id">
            <Image
              className="hero-avatar"
              src="/vijay-jayaraj-profile.jpg"
              width={46}
              height={46}
              alt={`Photo of ${profile.name}`}
              priority
              unoptimized
            />
            <div>
              <h1 className="hero-name">{profile.name}</h1>
              <p className="hero-meta">
                <span className="status-dot" aria-hidden="true" /> Open to work
                <span aria-hidden="true">·</span>
                <MapPin size={13} aria-hidden="true" /> Princeton, NJ
              </p>
            </div>
          </div>
          <p className="kicker"><span>&gt;_</span>{profile.title}</p>
          <p className="hero-headline">
            I build AI agents for <em>business workflows.</em>
          </p>
          <p className="hero-lede">{profile.summary}</p>
          <div className="hero-actions">
            <ButtonLink href="#projects">
              View projects <ArrowRight size={17} />
            </ButtonLink>
            <ButtonLink href={profile.resume} variant="secondary" download>
              <Download size={16} /> Résumé
            </ButtonLink>
          </div>
        </div>

        <div className="console" ref={consoleRef}>
          <div className="console-bar">
            <span className="console-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="console-title">agent-runtime</span>
            <span className={`console-status${isComplete ? " is-complete" : ""}`}>
              <i aria-hidden="true" />{isComplete ? "complete" : "running"}
            </span>
          </div>
          <div className="console-progress" aria-hidden="true">
            <i style={{ transform: `scaleX(${progress})` }} />
          </div>

          <p className="sr-only">{`Demo run of the ${run.chip}: ${run.steps.join(", ")}. Result: ${run.output}`}</p>

          <div className="console-screen" aria-hidden="true">
            <span className="console-scan" />
            <p className="console-cmd">
              <span className="console-prompt">❯</span>
              <code>{command}</code>
              {isTyping && <span className="caret" />}
            </p>

            {run.steps.map((step, index) => {
              const start = t.stepsStart + index * STEP_TICKS;
              if (tick < start) return null;
              const done = tick >= start + STEP_TICKS - 4;
              return (
                <div className={`step${done ? " is-done" : ""}`} key={step}>
                  <span className="step-state">
                    {done ? <Check size={11} strokeWidth={3} /> : <LoaderCircle size={11} className="spin" />}
                  </span>
                  <span className="step-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="step-name">{step}</span>
                  <span className="step-status">{done ? "ok" : "running"}</span>
                </div>
              );
            })}

            {tick >= t.outputStart && (
              <div className="console-output">
                <span>result</span>
                <p>
                  {output}
                  {isStreaming && <span className="caret" />}
                </p>
                {isComplete && <p className="console-tools">{run.tools.join(" · ")}</p>}
              </div>
            )}
          </div>

          <div className="console-foot">
            <span>Run</span>
            {runs.map((item, index) => (
              <button
                key={item.chip}
                type="button"
                className={index === session.active ? "is-active" : undefined}
                aria-pressed={index === session.active}
                onClick={() => replay(index)}
              >
                {item.chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap">
        <dl className="hero-stats glass">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
