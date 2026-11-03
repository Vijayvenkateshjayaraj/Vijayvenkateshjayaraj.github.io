import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";

const principles = [
  {
    title: "Ground",
    text: "Agents work on real business data in SharePoint, SQL Server, PostgreSQL, and Microsoft Graph, not toy prompts."
  },
  {
    title: "Tool",
    text: "Each capability is a scoped tool call, such as lookup, compare, or summarize, so model behavior stays predictable."
  },
  {
    title: "Guard",
    text: "Entra ID auth, access control, and validation checks run before anything reaches a stakeholder."
  },
  {
    title: "Observe",
    text: "Application Insights telemetry, retries, and readable errors make every run traceable."
  }
] as const;

export function About() {
  return (
    <section id="about" className="section">
      <div className="wrap about">
        <div className="about-copy">
          <SectionHeading index="01" label="About" title="An AI developer who starts from the business problem" />
          <p>{profile.about}</p>
          <p>{profile.aboutMore}</p>
        </div>

        <div className="principles">
          <p className="principles-label">How I ship agents</p>
          <ol>
            {principles.map((principle, index) => (
              <li key={principle.title}>
                <span className="principle-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
