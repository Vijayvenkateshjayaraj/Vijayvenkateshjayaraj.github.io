import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap">
        <SectionHeading index="03" label="Experience" title="Work experience" />
        <ol className="timeline">
          {experience.map((job) => (
            <li key={`${job.company}-${job.dates}`} className="role">
              <div className="role-meta">
                <span className="role-dates">{job.dates}</span>
                {job.location && <span>{job.location}</span>}
              </div>
              <div className="role-body">
                <h3>{job.title}</h3>
                <p className="role-company">{job.company}</p>
                <ul>
                  {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
