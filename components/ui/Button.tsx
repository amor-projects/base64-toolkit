import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent-tint";
  size?: "xs" | "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium select-none cursor-pointer " +
      "transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84CC16]/50 focus-visible:ring-offset-2 " +
      "active:scale-[0.985] " +
      "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100";

    const variantStyles = {
      primary:
        "bg-[#84CC16] text-[#0F172A] font-semibold hover:bg-[#74B816] active:bg-[#65A30D] " +
        "shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.35)] " +
        "border border-[#65A30D]/35",
      secondary:
        "bg-surface text-foreground border border-border/80 hover:border-border " +
        "hover:bg-[#F9F9F7] dark:hover:bg-zinc-800/60 active:bg-zinc-100 dark:active:bg-zinc-800 " +
        "shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
      outline:
        "bg-transparent border border-border text-foreground " +
        "hover:bg-black/[0.03] dark:hover:bg-white/[0.04] active:bg-black/[0.06]",
      ghost:
        "bg-transparent text-muted hover:text-foreground " +
        "hover:bg-black/[0.04] dark:hover:bg-white/[0.05] active:bg-black/[0.08]",
      "accent-tint":
        "bg-[#84CC16]/12 text-[#3F6212] dark:bg-[#BEF264]/14 dark:text-[#BEF264] " +
        "hover:bg-[#84CC16]/18 active:bg-[#84CC16]/25 border border-[#84CC16]/25 font-semibold",
    };

    const sizeStyles = {
      xs: "text-[11px] px-2.5 py-1 rounded-lg gap-1.5",
      sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5 font-medium",
      md: "text-[13px] px-3.5 py-2 rounded-xl gap-2 font-medium",
      lg: "text-sm px-5 py-2.5 rounded-xl gap-2.5 font-medium",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
