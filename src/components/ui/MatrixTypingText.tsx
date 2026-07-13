"use client";

import { useEffect, useState } from "react";

const matrixGlyphs = "01<>[]{}#/\\";

export function MatrixTypingText({ text, sectionId, className = "section-intro", threshold = .2 }: {
  text: string;
  sectionId: string;
  className?: string;
  threshold?: number;
}) {
  const [typingRun, setTypingRun] = useState(-1);
  const [revealedCharacters, setRevealedCharacters] = useState(0);
  const [matrixGlyph, setMatrixGlyph] = useState("0");

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    let wasVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !wasVisible) setTypingRun((run) => run + 1);
      wasVisible = entry.isIntersecting;
    }, { threshold });

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionId, threshold]);

  useEffect(() => {
    if (typingRun < 0) return;
    setRevealedCharacters(0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealedCharacters(text.length);
      return;
    }

    let character = 0;
    const interval = window.setInterval(() => {
      character += 1;
      setRevealedCharacters(character);
      setMatrixGlyph(matrixGlyphs[character % matrixGlyphs.length]);
      if (character >= text.length) window.clearInterval(interval);
    }, 24);

    return () => window.clearInterval(interval);
  }, [text, typingRun]);

  const isComplete = revealedCharacters >= text.length;

  return (
    <p className={`${className} matrix-copy`} aria-label={text}>
      <span className="matrix-copy-measure" aria-hidden="true">{text}</span>
      <span className="matrix-copy-output" aria-hidden="true">
        {text.slice(0, revealedCharacters)}
        {!isComplete && typingRun >= 0 && <span className="matrix-cursor">{matrixGlyph}</span>}
        {isComplete && <span className="matrix-cursor matrix-cursor-idle">_</span>}
      </span>
    </p>
  );
}
