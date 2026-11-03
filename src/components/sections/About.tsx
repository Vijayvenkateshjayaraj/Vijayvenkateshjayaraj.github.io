import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

const practices = [
  {
    title: "Benchmark against ground truth",
    text: "A self-built 50-case benchmark took label change detection from 68% to 88% accuracy."
  },
  {
    title: "Flag uncertain outputs",
    text: "Confidence thresholds send unclear reads to human-in-the-loop review instead of guessing."
  },
  {
    title: "Govern prompts and data",
    text: "Prompts and responses audited in Microsoft Purview, with Entra ID access control."
  },
  {
    title: "Monitor every run",
    text: "Per-turn telemetry in Azure Application Insights, queried with KQL."
  }
] as const;

export function About() {
  return (
    <section id="about" className="section">
      <div className="wrap about">
        <div className="about-copy">
          <SectionHeading index="01" label="About" title="About me" />
          <p>{profile.about}</p>
          <p>{profile.aboutMore}</p>
        </div>

        <div className="practices glass hud spot">
          <p className="practices-label">How I build agents</p>
          <ol>
            {practices.map((practice, index) => (
              <li key={practice.title}>
                <span className="practice-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{practice.title}</h3>
                  <p>{practice.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
