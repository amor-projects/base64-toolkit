import React from "react";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  level?: 2 | 3;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
  align = "left",
  level = 2,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const HeadingTag = level === 2 ? "h2" : "h3";

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6259E8]/8 dark:bg-[#756EF0]/12 text-[#6259E8] dark:text-[#756EF0] border border-[#6259E8]/15 text-[11px] font-semibold tracking-wide uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6259E8] dark:bg-[#756EF0]" />
          <span>{eyebrow}</span>
        </div>
      )}
      <HeadingTag className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.025em] text-foreground leading-[1.2]">
        {title}
      </HeadingTag>
      {description && (
        <p className="mt-3 text-sm sm:text-base text-muted max-w-2xl leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
