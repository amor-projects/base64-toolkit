"use client";

import React from "react";

export interface SegmentOption<T extends string = string> {
  id: T;
  label: string;
  badge?: string;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value: T;
  onChange?: (value: T) => void;
  className?: string;
  size?: "sm" | "md";
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  className = "",
  size = "md",
}: SegmentedControlProps<T>) {
  const sizeStyles = {
    sm: "p-0.5 text-xs rounded-xl",
    md: "p-1 text-[13px] rounded-xl",
  };

  const itemSizeStyles = {
    sm: "px-2.5 py-1 rounded-lg gap-1.5",
    md: "px-3.5 py-1.5 rounded-lg gap-2",
  };

  return (
    <div
      role="tablist"
      className={`inline-flex items-center bg-[#EFEFED] dark:bg-[#1E1E22] border border-black/[0.03] dark:border-white/[0.04] ${sizeStyles[size]} ${className}`}
    >
      {options.map((option) => {
        const isSelected = option.id === value;

        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            disabled={option.disabled}
            onClick={() => !option.disabled && onChange?.(option.id)}
            className={`inline-flex items-center justify-center font-medium select-none transition-all duration-180 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              itemSizeStyles[size]
            } ${
              isSelected
                ? "bg-surface text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.07),0_1px_1px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)] cursor-default"
                : "text-muted hover:text-foreground cursor-pointer"
            } ${
              option.disabled
                ? "opacity-40 cursor-not-allowed hover:text-muted"
                : "active:scale-[0.98]"
            }`}
          >
            <span>{option.label}</span>
            {option.badge && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium ${
                  isSelected
                    ? "bg-[#84CC16]/15 text-[#3F6212] dark:bg-[#BEF264]/18 dark:text-[#BEF264]"
                    : "bg-black/[0.05] dark:bg-white/[0.06] text-muted"
                }`}
              >
                {option.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
