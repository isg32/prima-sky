import { LotusTab } from "../brand/Lotus";

/** Eyebrow + brochure-style ruled heading: a light line over a bold line. */
export default function Heading({
  eyebrow,
  light,
  bold,
  size = "",
  center = false,
  tab = false,
  as: Tag = "h2",
  className = "",
}: {
  eyebrow?: string;
  light: string;
  bold: string;
  size?: string;
  center?: boolean;
  tab?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      {tab && <LotusTab className="mb-8" />}
      {eyebrow && (
        <p data-fade className={`eyebrow mb-7 ${center ? "justify-center" : ""}`}>
          {eyebrow}
        </p>
      )}
      <div className={`ruled ${center ? "center" : ""}`}>
        <Tag className={`display ${size}`} aria-label={`${light} ${bold}`}>
          <span data-split className="block" aria-hidden="true">
            {light}
          </span>
          <b data-split data-delay="0.12" aria-hidden="true">
            {bold}
          </b>
        </Tag>
      </div>
    </div>
  );
}
