import { ReactNode } from "react";
import "./Card.css";
type CardProps = {
  title: string;
  content: ReactNode;
  expanded: boolean;
  bottom?: ReactNode;
};

export default function Card({ title, bottom, expanded, content }: CardProps) {
  return (
    <div className={`card-container ${expanded ? "expanded" : ""}`}>
      <h2>{title}</h2>
      {expanded && <div className="card-bottom">{bottom}</div>}
      <div className="card-content">{content}</div>
      {!expanded && <div className="card-bottom">{bottom}</div>}
    </div>
  );
}
