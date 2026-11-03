"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Download, LoaderCircle, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { ButtonLink } from "@/components/ui/ButtonLink";

type SessionScript = {
  chip: string;
  prompt: string;
  tools: { call: string; result: string }[];
  answer: string;
};

const agentCount = projects.filter((project) => project.kind === "agent").length;

const scripts: SessionScript[] = [
  {
    chip: "What do you build?",
    prompt: "What does Vijay build?",
    tools: [
      { call: "search_projects(kind=\"agent\")", result: `${agentCount} agents` },
      { call: "get_stack(focus=\"ai\")", result: "Claude · Azure · Graph" }
    ],
    answer:
      "AI agents for enterprise work: tool-calling Claude assistants over Microsoft Graph, OCR + computer-vision review pipelines, and regulatory monitors with SQL version tracking."
  },
  {
    chip: "How do you ship?",
    prompt: "How does he take agents to production?",
    tools: [{ call: "get_practices()", result: "auth · telemetry · retries" }],
    answer:
      "Scoped tools, Entra ID authentication and access control, retry and error handling, and Application Insights telemetry, so every run is secure and traceable."
  },
  {
    chip: "Open to roles?",
    prompt: "Is he open to new roles?",
    tools: [{ call: "get_availability()", result: "status: open" }],
    answer: `Yes. ${profile.availability} Based in Princeton, NJ. Reach him at ${profile.email}.`
  }
];

// The session replay is driven by a single tick counter so every frame is derived, not stored.
const TICK_MS = 28;
const PAUSE_TICKS = 14;
const TOOL_TICKS = 26;
const HOLD_TICKS = 200;
const ANSWER_CHARS_PER_TICK = 2;

function timeline(script: SessionScript) {
  const toolsStart = script.prompt.length + PAUSE_TICKS;
  const answerStart = toolsStart + script.tools.length * TOOL_TICKS + 6;
  const answerEnd = answerStart + Math.ceil(script.answer.length / ANSWER_CHARS_PER_TICK);
  return { toolsStart, answerStart, answerEnd, end: answerEnd + HOLD_TICKS };
}

const stats = [
  { value: String(projects.length).padStart(2, "0"), label: "Shipped builds" },
  { value: String(agentCount).padStart(2, "0"), label: "AI agents" },
  { value: String(experience.length).padStart(2, "0"), label: "Enterprise roles" },
  { value: "2022", label: "Shipping in enterprise since" }
];

export function Hero() {
  const [session, setSession] = useState({ active: 0, tick: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const autoPlay = useRef(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || !isVisible) return;
    const interval = window.setInterval(() => {
      setSession((current) => {
        if (current.tick < timeline(scripts[current.active]).end) return { ...current, tick: current.tick + 1 };
        if (autoPlay.current) return { active: (current.active + 1) % scripts.length, tick: 0 };
        return current;
      });
    }, TICK_MS);
    return () => window.clearInterval(interval);
  }, [reducedMotion, isVisible]);

  const script = scripts[session.active];
  const t = timeline(script);
  // With reduced motion the session is shown fully resolved instead of replayed.
  const tick = reducedMotion ? t.answerEnd : session.tick;
  const prompt = script.prompt.slice(0, tick);
  const isTypingPrompt = tick < script.prompt.length;
  const isThinking = tick >= script.prompt.length && tick < t.toolsStart;
  const answer = script.answer.slice(0, Math.max(0, (tick - t.answerStart) * ANSWER_CHARS_PER_TICK));
  const isStreaming = tick >= t.answerStart && tick < t.answerEnd;

  const ask = (index: number) => {
    autoPlay.current = false;
    setSession({ active: index, tick: 0 });
  };

  return (
    <section id="top" className="hero">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="wrap hero-layout">
        <div className="hero-copy">
          <div className="hero-id">
            <Image
              className="hero-avatar"
              src="/vijay-jayaraj-profile.jpg"
              width={44}
              height={44}
              alt={`Photo of ${profile.name}`}
              priority
              unoptimized
            />
            <div>
              <h1 className="hero-name">{profile.name}</h1>
              <p className="hero-meta">
                <span className="status-dot" aria-hidden="true" /> Available
                <span aria-hidden="true">·</span>
                <MapPin size={13} aria-hidden="true" /> Princeton, NJ
              </p>
            </div>
          </div>
          <p className="kicker"><span>~/</span>{profile.role}</p>
          <p className="hero-headline">
            I build AI agents that do <em>real work.</em>
          </p>
          <p className="hero-lede">{profile.summary}</p>
          <div className="hero-actions">
            <ButtonLink href="#projects">
              See the agents <ArrowRight size={17} />
            </ButtonLink>
            <ButtonLink href={profile.resume} variant="secondary" download>
              <Download size={16} /> Résumé
            </ButtonLink>
          </div>
        </div>

        <div className="session" ref={cardRef}>
          <div className="session-bar">
            <span className="session-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="session-title">agent.session</span>
            <span className="session-tag">replay</span>
          </div>

          <p className="sr-only">{`Example question: ${script.prompt} Answer: ${script.answer}`}</p>

          <div className="session-body" aria-hidden="true">
            <div className="turn turn-user">
              <span className="turn-role">you</span>
              <p>
                {prompt}
                {isTypingPrompt && <span className="caret" />}
              </p>
            </div>

            {isThinking && <p className="session-thinking">planning<span>…</span></p>}

            {script.tools.map((tool, index) => {
              const start = t.toolsStart + index * TOOL_TICKS;
              if (tick < start) return null;
              const done = tick >= start + TOOL_TICKS - 6;
              return (
                <div className={`tool${done ? " is-done" : ""}`} key={tool.call}>
                  <span className="tool-state">
                    {done ? <Check size={12} strokeWidth={3} /> : <LoaderCircle size={12} className="spin" />}
                  </span>
                  <code>{tool.call}</code>
                  <span className="tool-result">{done ? tool.result : "running"}</span>
                </div>
              );
            })}

            {tick >= t.answerStart && (
              <div className="turn turn-agent">
                <span className="turn-role">agent</span>
                <p>
                  {answer}
                  {isStreaming && <span className="caret" />}
                </p>
              </div>
            )}
          </div>

          <div className="session-foot">
            <span>Ask</span>
            {scripts.map((item, index) => (
              <button
                key={item.chip}
                type="button"
                className={index === session.active ? "is-active" : undefined}
                aria-pressed={index === session.active}
                onClick={() => ask(index)}
              >
                {item.chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap">
        <dl className="hero-stats">
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
