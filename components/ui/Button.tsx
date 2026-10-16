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
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6259E8]/35 focus-visible:ring-offset-2 " +
      "active:scale-[0.985] " +
      "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none disabled:active:scale-100";

    const variantStyles = {
      primary:
        "bg-[#6259E8] text-white hover:bg-[#5348DE] active:bg-[#473DBA] " +
        "shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.22)] " +
        "border border-[#554BD4]/50",
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
        "bg-[#6259E8]/8 text-[#6259E8] dark:bg-[#756EF0]/12 dark:text-[#756EF0] " +
        "hover:bg-[#6259E8]/14 active:bg-[#6259E8]/20 border border-[#6259E8]/15",
    };

    const sizeStyles = {
      xs: "text-[11px] px-2.5 py-1 rounded-lg gap-1.5",
      sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5",
      md: "text-[13px] px-3.5 py-2 rounded-xl gap-2",
      lg: "text-sm px-5 py-2.5 rounded-xl gap-2.5",
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
