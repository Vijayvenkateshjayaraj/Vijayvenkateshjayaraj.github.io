import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CheckCircle2,
  Download,
  Orbit,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Hero() {
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
          <p className="hero-copy">
            {profile.summary}
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

        <aside className="signal-console" aria-label="Decision intelligence system visualization">
          <div className="console-glow console-glow-a" />
          <div className="console-glow console-glow-b" />
          <header className="console-header">
            <span><Activity /> Decision engine</span>
            <strong><i /> Live</strong>
          </header>
          <div className="console-grid">
            <div className="signal-radar" aria-hidden="true">
              <div className="radar-ring radar-ring-a" />
              <div className="radar-ring radar-ring-b" />
              <div className="radar-ring radar-ring-c" />
              <div className="radar-sweep" />
              <div className="radar-core"><BrainCircuit /></div>
              <span className="radar-dot dot-a" />
              <span className="radar-dot dot-b" />
              <span className="radar-dot dot-c" />
            </div>
            <div className="console-stat stat-confidence">
              <span>Insight confidence</span>
              <strong>98.4<small>%</small></strong>
              <div><i /><i /><i /><i /><i /></div>
            </div>
            <div className="console-stat stat-systems">
              <Orbit />
              <span>Connected systems</span>
              <strong>04</strong>
            </div>
          </div>
          <div className="console-query">
            <Sparkles />
            <div><span>Business question</span><strong>Where should we focus next?</strong></div>
          </div>
          <div className="console-answer">
            <span>Recommended path</span>
            <div><i /> Automate reporting → surface risk → act faster</div>
          </div>
          <div className="floating-signal signal-one"><span>INPUT</span><strong>Enterprise data</strong></div>
          <div className="floating-signal signal-two"><span>OUTPUT</span><strong>Clear action</strong></div>
        </aside>
      </div>
    </section>
  );
}
