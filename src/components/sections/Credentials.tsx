import { Award, GraduationCap, Star } from "lucide-react";
import { education } from "@/data/education";
import { certifications } from "@/data/certifications";
import { achievements } from "@/data/achievements";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Credentials() {
  return (
    <section id="credentials" className="section">
      <div className="wrap">
        <SectionHeading index="05" label="Education" title="Education and certifications" />
        <div className="cred-grid">
          <div className="cred-col glass spot">
            <h3><GraduationCap size={17} /> Education</h3>
            <ul>
              {education.map((item) => (
                <li key={item.degree}>
                  <strong>{item.degree}</strong>
                  <span>{item.school} · {item.location}</span>
                  <small>{item.dates} · GPA {item.gpa}</small>
                </li>
              ))}
            </ul>
          </div>
          <div className="cred-col glass spot">
            <h3><Award size={17} /> Certifications</h3>
            <ul>
              {certifications.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}</strong>
                  <span>{item.issuer}</span>
                  {item.date && <small>{item.date}</small>}
                </li>
              ))}
            </ul>
          </div>
          <div className="cred-col glass spot">
            <h3><Star size={17} /> Recognition</h3>
            <ul>
              {achievements.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
