export default function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="page-title">
      {eyebrow && <div className="eyebrow" style={{ marginBottom: 8 }}>{eyebrow}</div>}
      <h1>{title}</h1>
    </div>
  );
}
