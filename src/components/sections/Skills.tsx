import { skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MatrixTypingText } from "@/components/ui/MatrixTypingText";
export function Skills(){return <section id="skills" className="section"><div className="container"><SectionHeading eyebrow="Capabilities" title="A practical analytics toolkit"/><MatrixTypingText sectionId="skills" text="Business context, technical depth, and the tools to move from raw data to decisions."/><div className="skill-grid">{skillGroups.map(g=><article className="skill-card" key={g.title}><h3>{g.title}</h3><div className="badges">{g.items.map(x=><span key={x}>{x}</span>)}</div></article>)}</div></div></section>}
