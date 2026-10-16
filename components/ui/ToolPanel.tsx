import React from "react";

export interface ToolPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "subtle";
}

export function ToolPanel({
  className = "",
  children,
  variant = "primary",
  ...props
}: ToolPanelProps) {
  const variantStyles = {
    primary:
      "bg-surface border border-border/80 shadow-tool rounded-3xl",
    secondary:
      "bg-surface border border-border/80 shadow-card rounded-2xl",
    subtle:
      "bg-surface dark:bg-[#141416] border border-border/70 shadow-whisper rounded-2xl",
  };

  return (
    <div
      className={`overflow-hidden transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function ToolPanelHeader({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`px-6 py-4.5 bg-surface dark:bg-[#141417] border-b border-border/60 flex items-center justify-between gap-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function ToolPanelBody({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-6 sm:p-7 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function ToolPanelFooter({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`px-6 py-4 bg-surface dark:bg-[#121215] border-t border-border/60 flex flex-wrap items-center justify-between gap-4 text-xs text-muted ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
