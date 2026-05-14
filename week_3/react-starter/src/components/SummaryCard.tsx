interface SummaryCardProps {
  label: string;
  value: string;
  note: string;
}

export default function SummaryCard({ label, value, note }: SummaryCardProps) {
  return (
    <article className="summary-card">
      <p>{label}</p>
      <h2>{value}</h2>
      <span>{note}</span>
    </article>
  );
}
