import { skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  return (
    <section id="stack" className="section section-alt">
      <div className="wrap">
        <SectionHeading
          index="04"
          label="Stack"
          title="The tools behind the agents"
          intro="LLMs and agent frameworks first, backed by the cloud, data, and delivery tooling that gets them into production."
        />
        <div className="stack-grid">
          {skillGroups.map((group, index) => (
            <div className="stack-group" key={group.title}>
              <h3><span>{String(index + 1).padStart(2, "0")}</span>{group.title}</h3>
              <ul className="chips">
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
