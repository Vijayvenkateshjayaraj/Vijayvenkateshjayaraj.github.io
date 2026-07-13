import { CheckCircle2 } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
export function About() {
  const strengths = [
    "Business analytics & reporting",
    "SQL reconciliation & data validation",
    "AI agents & workflow automation",
    "Cloud analytics & enterprise systems"
  ];

  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <SectionHeading
          eyebrow="About"
          title="Solving problems with data and AI"
        />

        <div>
          <p className="about-copy">{profile.about}</p>

          <div className="check-grid">
            {strengths.map((x) => (
              <span key={x}>
                <CheckCircle2 />
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
