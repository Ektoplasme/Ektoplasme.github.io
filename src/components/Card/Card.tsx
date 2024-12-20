import "./Card.css"
type CardProps = {
  title: string;
  subtitle: string;
  buttonLabel: string;
};

export default function Card({ title, buttonLabel, subtitle }: CardProps) {
  return (
    <div className="card-container">
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <button>{buttonLabel}</button>
    </div>
  );
}
