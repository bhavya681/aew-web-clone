import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className = "",
}: Props) {
  return (
    <div
      className={`${align === "center" ? "text-center" : "text-left"} ${className}`}
    >
      {eyebrow ? (
        <p className="eyebrow flex items-center gap-3 text-gold">
          {align === "center" ? null : <span className="h-px w-8 bg-gold" />}
          {eyebrow}
        </p>
      ) : null}
      <h2 className="display mt-3 text-4xl text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-2xl text-sm leading-relaxed text-cream/55 sm:text-base ${align === "center" ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
