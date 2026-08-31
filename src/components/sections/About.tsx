import { CheckCircle2, Compass, Network, Rocket } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
export function About() {
  const strengths = [
    "Business analytics & reporting",
    "SQL reconciliation & data validation",
    "AI agents & workflow automation",
    "Cloud analytics & enterprise systems"
  ];
  const approach = [
    {
      icon: Compass,
      step: "01",
      title: "Frame the decision",
      copy: "Translate the business problem into the right questions, users, controls, and measurable outcome."
    },
    {
      icon: Network,
      step: "02",
      title: "Connect the system",
      copy: "Bring data, APIs, enterprise platforms, models, and validation into one dependable workflow."
    },
    {
      icon: Rocket,
      step: "03",
      title: "Operationalize the result",
      copy: "Ship an experience people can use, monitor, trust, and explain to stakeholders."
    }
  ];

  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <SectionHeading
          eyebrow="Operating approach"
          title="Business context first. Technical depth where it counts."
        />

        <div className="about-body">
          <p className="about-copy">{profile.about}</p>

          <div className="check-grid">
            {strengths.map((x) => (
              <span key={x}>
                <CheckCircle2 />
                {x}
              </span>
            ))}
          </div>

          <div className="approach-grid">
            {approach.map(({ icon: Icon, step, title, copy }) => (
              <article key={title}>
                <div><span>{step}</span><Icon /></div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
