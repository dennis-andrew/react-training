import type { FC } from "react";

interface SummaryCardProps {
  label: string;
  value: string;
  note: string;
}

const SummaryCard: FC<SummaryCardProps> = ({ label, value, note }) => {
  return (
    <article className="summary-card">
      <p>{label}</p>
      <h2>{value}</h2>
      <span>{note}</span>
    </article>
  );
};

export default SummaryCard;
