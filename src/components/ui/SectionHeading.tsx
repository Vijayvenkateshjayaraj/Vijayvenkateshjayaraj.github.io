export function SectionHeading({ index, label, title, intro }: { index: string; label: string; title: string; intro?: string }) {
  return (
    <header className="section-head">
      <p className="kicker"><span>{index}</span>{label}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </header>
  );
}
