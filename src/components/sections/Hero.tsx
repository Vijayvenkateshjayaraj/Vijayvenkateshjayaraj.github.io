"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Download,
  Orbit,
} from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/ButtonLink";

const matrixGlyphs = "01<>[]{}#/\\";
const matrixSummary = profile.summary.replace(/\.$/, "");
const orchestrationNodes = [
  { label: "OCR", tooltip: "Extracts text from documents and images", x: 50, y: 9 },
  { label: "Computer Vision", tooltip: "Understands visual content and layout", x: 79, y: 21 },
  { label: "Embeddings", tooltip: "Transforms meaning into searchable vectors", x: 91, y: 50 },
  { label: "RAG", tooltip: "Grounds responses in enterprise knowledge", x: 79, y: 79 },
  { label: "LLM Inference", tooltip: "Generates context-aware intelligence", x: 50, y: 91 },
  { label: "AI Agents", tooltip: "Plans and executes multi-step workflows", x: 21, y: 79 },
  { label: "Validation", tooltip: "Checks quality, accuracy, and policy", x: 9, y: 50 },
  { label: "API Integration", tooltip: "Connects models to business systems", x: 21, y: 21 },
] as const;

export function Hero() {
  const [animationRun, setAnimationRun] = useState(0);
  const [revealedCharacters, setRevealedCharacters] = useState(0);
  const [matrixGlyph, setMatrixGlyph] = useState("0");

  const replaySummary = useCallback(() => {
    setAnimationRun((run) => run + 1);
  }, []);

  useEffect(() => {
    window.addEventListener("hero-replay", replaySummary);
    return () => window.removeEventListener("hero-replay", replaySummary);
  }, [replaySummary]);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    let hasLeftHome = false;
    const handleScroll = () => {
      const bounds = hero.getBoundingClientRect();
      const hasLeftViewport = bounds.bottom <= 0 || bounds.top >= window.innerHeight;
      const hasReturnedHome = bounds.top < window.innerHeight * 0.65 && bounds.bottom > window.innerHeight * 0.25;

      if (hasLeftViewport) hasLeftHome = true;
      if (hasLeftHome && hasReturnedHome) {
        replaySummary();
        hasLeftHome = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [replaySummary]);

  useEffect(() => {
    setRevealedCharacters(0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealedCharacters(matrixSummary.length);
      return;
    }

    let character = 0;
    const interval = window.setInterval(() => {
      // Reveal a small group at a time so the typewriter effect does not
      // schedule a React render for every individual character.
      character = Math.min(character + 3, matrixSummary.length);
      setRevealedCharacters(character);
      setMatrixGlyph(matrixGlyphs[character % matrixGlyphs.length]);

      if (character >= matrixSummary.length) {
        window.clearInterval(interval);
      }
    }, 42);

    return () => window.clearInterval(interval);
  }, [animationRun]);

  const isComplete = revealedCharacters >= matrixSummary.length;

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-content">
          <div className="hero-intro">
            <Image
              className="hero-profile-photo"
              src="/vijay-jayaraj-profile.jpg"
              width={104}
              height={104}
              alt="Vijayvenkatesh Jayaraj"
              priority
              unoptimized
            />
            <div>
              <div className="hero-kicker">
                <span className="availability"><i /> Available for new opportunities</span>
                <span className="hero-coordinates">40.3573° N · 74.6004° W</span>
              </div>
              <p className="eyebrow">{profile.name} · Decision Intelligence</p>
            </div>
          </div>
          <h1>
            AI systems with <span>business clarity.</span>
          </h1>
          <h2>{profile.headline}</h2>
          <p className="hero-copy matrix-copy" aria-label={matrixSummary}>
            <span className="matrix-copy-measure" aria-hidden="true">{matrixSummary}</span>
            <span className="matrix-copy-output" aria-hidden="true">
              {matrixSummary.slice(0, revealedCharacters)}
              {!isComplete && <span className="matrix-cursor">{matrixGlyph}</span>}
              {isComplete && <span className="matrix-cursor matrix-cursor-idle">_</span>}
            </span>
          </p>
          <div className="hero-actions">
            <ButtonLink href="#projects">
              Explore selected work <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Let&apos;s build something <ArrowUpRight size={17} />
            </ButtonLink>
          </div>
          <div className="hero-meta-row">
            <a className="resume-link" href={profile.resume} download>
              <Download size={16} /> Download resume
            </a>
            <span><CheckCircle2 size={16} /> Analytics · Automation · AI Agents</span>
          </div>
        </div>

        <aside className="signal-console orchestration-console" aria-label="AI orchestration engine visualization">
          <div className="console-glow console-glow-a" />
          <div className="console-glow console-glow-b" />
          <header className="console-header">
            <span><Orbit /> Intelligence architecture</span>
            <strong><i /> Active</strong>
          </header>
          <div className="orchestration-visual">
            <div className="orbit-ring orbit-ring-a" />
            <div className="orbit-ring orbit-ring-b" />
            <div className="orbit-particles" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</div>
            <div className="orchestration-orbit">
              <svg className="orchestration-links" viewBox="0 0 100 100" aria-hidden="true">
                {orchestrationNodes.map((node, index) => (
                  <g key={node.label}>
                    <line x1="50" y1="50" x2={node.x} y2={node.y} />
                    <circle className="signal-pulse" r="0.85">
                      <animateMotion dur={`${5.4 + index * .35}s`} repeatCount="indefinite" path={`M 50 50 L ${node.x} ${node.y}`} begin={`${index * -.7}s`} />
                    </circle>
                  </g>
                ))}
              </svg>
              {orchestrationNodes.map((node, index) => (
                <div className={`orbit-node-position node-${index}`} key={node.label}>
                  <div className="orbit-node-motion">
                    <button type="button" className="orchestration-node" aria-label={`${node.label}: ${node.tooltip}`}>
                      <span>{node.label}</span>
                      <small role="tooltip">{node.tooltip}</small>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="orchestration-core">
              <BrainCircuit />
              <span>AI Orchestration</span>
              <strong>Engine</strong>
              <i />
            </div>
          </div>
          <div className="orchestration-status"><span><i /> 8 capabilities synchronized</span><b>Signal flow nominal</b></div>
        </aside>
      </div>
    </section>
  );
}
