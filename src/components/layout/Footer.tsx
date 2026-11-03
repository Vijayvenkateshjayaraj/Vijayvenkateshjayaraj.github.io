import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p className="footer-id">
          <strong>{profile.name}</strong>
          <span>{profile.role}</span>
        </p>
        <div className="footer-social">
          <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={17} /></a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
        </div>
        <p className="footer-meta">© {new Date().getFullYear()} {profile.shortName} · Built with Next.js</p>
      </div>
    </footer>
  );
}
