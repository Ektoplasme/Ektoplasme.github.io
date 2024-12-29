import "./Card.css";
type CardProps = {
  title: string;
  subtitle: string;
  description: string;
  buttonLabel?: string;
  onClose?: () => void;
};

export default function Card({
  title,
  buttonLabel,
  description,
  subtitle,
  onClose,
}: CardProps) {
  return (
    <div className="card-container">
      <h2>{title}</h2>
      <h3>{description}</h3>
      <h4>{subtitle}</h4>
      {buttonLabel && (
        <button className="card-button" onClick={onClose}>
          {buttonLabel}
        </button>
      )}
    </div>
  );
}
