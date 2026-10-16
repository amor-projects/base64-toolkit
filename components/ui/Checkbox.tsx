"use client";

import React, { useId } from "react";
import { CheckIcon } from "@/components/ui/Icons";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: string;
}

export function Checkbox({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  className = "",
  id: customId,
  ...props
}: CheckboxProps) {
  const autoId = useId();
  const id = customId || autoId;

  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center gap-2.5 select-none transition-opacity duration-150 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer group"
      } ${className}`}
    >
      <div className="relative flex items-center justify-center shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="peer sr-only"
          {...props}
        />
        {/* Custom Visual Box */}
        <div
          className={`w-4.5 h-4.5 rounded-[7px] border transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center ${
            checked
              ? "bg-[#84CC16] border-[#65A30D] shadow-[0_1px_2px_rgba(132,204,22,0.3),inset_0_1px_0_rgba(255,255,255,0.4)]"
              : "bg-surface border-border/90 group-hover:border-[#84CC16]/60 group-hover:bg-[#FBFBFA] dark:group-hover:bg-zinc-800/60"
          } peer-focus-visible:ring-2 peer-focus-visible:ring-[#84CC16]/50 peer-focus-visible:ring-offset-2`}
        >
          {checked && (
            <CheckIcon
              size={12}
              className="text-[#0F172A] stroke-[3] animate-in zoom-in-75 duration-100"
            />
          )}
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-xs font-medium text-foreground group-hover:text-foreground/90 transition-colors">
              {label}
            </span>
          )}
          {description && (
            <span className="text-[11px] text-muted leading-tight font-normal">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
