import React from "react";
import { ChevronDownIcon } from "@/components/ui/Icons";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: SelectOption[];
  isMono?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", options, children, isMono = false, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <select
          ref={ref}
          className={`appearance-none cursor-pointer pl-3.5 pr-8 py-1.5 sm:py-2 text-xs sm:text-sm bg-surface text-foreground border border-border/80 rounded-xl shadow-whisper hover:border-border focus:border-[#65A30D] dark:focus:border-[#BEF264] focus:outline-none focus:ring-2 focus:ring-[#84CC16]/25 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMono ? "font-mono" : "font-sans"
          } ${className}`}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  className="bg-surface text-foreground py-1"
                >
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <span
          className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted"
          aria-hidden="true"
        >
          <ChevronDownIcon size={14} className="opacity-70" />
        </span>
      </div>
    );
  }
);

Select.displayName = "Select";
