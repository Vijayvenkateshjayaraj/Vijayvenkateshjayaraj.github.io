import { BriefcaseBusiness, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MatrixTypingText } from "@/components/ui/MatrixTypingText";
export function Experience() {
  return (
    <section id="experience" className="section alt">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Enterprise experience with a builder’s mindset"
        />
        <MatrixTypingText
          sectionId="experience"
          text="Across consulting and analytics roles, I have moved between the business question, the data layer, and the production workflow."
        />

        <div className="timeline">
          {experience.map((job, i) => (
            <article className="timeline-card" key={job.title}>
              <div className="timeline-marker">
                <BriefcaseBusiness />
              </div>

              <div className="job-head">
                <div>
                  <p className="job-index">0{i + 1}</p>
                  <h3>{job.title}</h3>
                  <strong>{job.company}</strong>
                </div>

                <div className="job-meta">
                  <span>{job.dates}</span>
                  <span>
                    <MapPin /> {job.location}
                  </span>
                </div>
              </div>

              <ul>
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
