"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/ButtonLink";

const contactHeadlines = [
  "Need someone who can connect business, data, and AI?",
  "Have a workflow that should be smarter?",
  "Turning an AI idea into a dependable system?",
  "Need clarity before you add more technology?",
  "Looking for a builder who speaks business?"
];
const contactMessage = "I’m open to AI engineering, business analysis, analytics automation, and decision-intelligence opportunities where the outcome matters as much as the technology.";
const matrixGlyphs = "01<>[]{}#/\\";

export function Contact() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [typingRun, setTypingRun] = useState(-1);
  const [revealedCharacters, setRevealedCharacters] = useState(0);
  const [matrixGlyph, setMatrixGlyph] = useState("0");

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeadlineIndex((current) => (current + 1) % contactHeadlines.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    let wasVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !wasVisible) setTypingRun((run) => run + 1);
      wasVisible = entry.isIntersecting;
    }, { threshold: .35 });

    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typingRun < 0) return;
    setRevealedCharacters(0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealedCharacters(contactMessage.length);
      return;
    }

    let character = 0;
    const interval = window.setInterval(() => {
      character += 1;
      setRevealedCharacters(character);
      setMatrixGlyph(matrixGlyphs[character % matrixGlyphs.length]);
      if (character >= contactMessage.length) window.clearInterval(interval);
    }, 24);

    return () => window.clearInterval(interval);
  }, [typingRun]);

  const isMessageComplete = revealedCharacters >= contactMessage.length;

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-card">
        <div>
          <p className="eyebrow">Let’s connect</p>
          <h2 key={headlineIndex} className="contact-rotating-headline">
            {contactHeadlines[headlineIndex]}
          </h2>
          <p className="matrix-copy" aria-label={contactMessage}>
            <span className="matrix-copy-measure" aria-hidden="true">{contactMessage}</span>
            <span className="matrix-copy-output" aria-hidden="true">
              {contactMessage.slice(0, revealedCharacters)}
              {!isMessageComplete && typingRun >= 0 && <span className="matrix-cursor">{matrixGlyph}</span>}
              {isMessageComplete && <span className="matrix-cursor matrix-cursor-idle">_</span>}
            </span>
          </p>
          <ButtonLink href={`mailto:${profile.email}`}>
            Start a conversation
          </ButtonLink>
        </div>

        <address>
          <a href={`mailto:${profile.email}`}>
            <Mail />
            {profile.email}
          </a>

          <span>
            <MapPin />
            {profile.location}
          </span>

          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
            <Linkedin />
            LinkedIn
          </a>

          <a href={profile.links.github} target="_blank" rel="noreferrer">
            <Github />
            GitHub
          </a>

          {profile.showPhone && profile.phone && <span>{profile.phone}</span>}
        </address>
      </div>
    </section>
  );
}
