import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isMono?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", isMono = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-3.5 py-2 text-sm bg-surface dark:bg-[#141417] text-foreground border border-border/80 rounded-xl placeholder:text-muted/60 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:border-[#65A30D] dark:focus:border-[#BEF264] focus:outline-none focus:ring-2 focus:ring-[#84CC16]/20 disabled:opacity-40 disabled:cursor-not-allowed ${
          isMono ? "font-mono text-xs" : "font-sans"
        } ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
