import { BriefcaseBusiness, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
export function Experience() {
  return (
    <section id="experience" className="section alt">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Building analytics, automation, and AI solutions for real business workflows"
          intro="Experience across business analytics, enterprise reporting, data validation, cloud workflows, and AI-powered automation."
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