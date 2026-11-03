"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <div className="contact-card glass hud">
          <p className="kicker"><span>[06]</span>Contact</p>
          <h2>Get in <em>touch.</em></h2>
          <p className="contact-lede">
            {profile.availability} Email is the fastest way to reach me.
          </p>
          <div className="contact-actions">
            <ButtonLink href={`mailto:${profile.email}`}>
              <Mail size={16} /> Email me
            </ButtonLink>
            <button type="button" className="btn btn-secondary copy-email" onClick={copyEmail}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? "Copied" : profile.email}</span>
            </button>
          </div>
          <ul className="contact-links">
            <li><a href={profile.links.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} /></a></li>
            <li><a href={profile.links.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={14} /></a></li>
            <li><span><MapPin size={16} /> {profile.location}</span></li>
            {profile.showPhone && profile.phone && <li><span>{profile.phone}</span></li>}
          </ul>
          <span className="sr-only" aria-live="polite">{copied ? "Email address copied" : ""}</span>
        </div>
      </div>
    </section>
  );
}
