import { skillGroups } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MatrixTypingText } from "@/components/ui/MatrixTypingText";
export function Skills(){return <section id="skills" className="section"><div className="container"><SectionHeading eyebrow="Capabilities" title="The stack behind the outcomes"/><MatrixTypingText sectionId="skills" text="A practical toolkit spanning business analysis, data engineering, cloud platforms, AI agents, governance, and delivery."/><div className="skill-grid">{skillGroups.map((g,index)=><article className="skill-card" key={g.title}><span className="skill-index">0{index + 1}</span><h3>{g.title}</h3><div className="badges">{g.items.map(x=><span key={x}>{x}</span>)}</div></article>)}</div></div></section>}
