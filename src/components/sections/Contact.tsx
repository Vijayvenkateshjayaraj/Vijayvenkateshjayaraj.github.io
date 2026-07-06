import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/ButtonLink";
export function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-card">
        <div>
          <p className="eyebrow">Let’s connect</p>
          <h2>Have a data, automation, or AI workflow problem to solve?</h2>
          <p>
            I’m open to roles and opportunities where I can turn business needs into reliable analytics, automation, and AI-powered solutions.
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