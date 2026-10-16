import React from "react";
import { InfoIcon, CheckCircleIcon, WarningIcon, ErrorIcon } from "@/components/ui/Icons";

export interface StatusMessageProps {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function StatusMessage({
  variant = "info",
  title,
  children,
  className = "",
}: StatusMessageProps) {
  const isAlert = variant === "error" || variant === "warning";

  const variantStyles = {
    info:
      "bg-[#84CC16]/10 dark:bg-[#BEF264]/10 text-[#3F6212] dark:text-[#BEF264] border-[#84CC16]/25 dark:border-[#BEF264]/20",
    success:
      "bg-[#F0FDF4] dark:bg-[#132219] text-[#166534] dark:text-[#BBF7D0] border-[#DCFCE7] dark:border-[#166534]/40",
    warning:
      "bg-[#FFFBEB] dark:bg-[#261E10] text-[#92400E] dark:text-[#FDE68A] border-[#FEF3C7] dark:border-[#92400E]/40",
    error:
      "bg-[#FEF2F2] dark:bg-[#291415] text-[#991B1B] dark:text-[#FECACA] border-[#FEE2E2] dark:border-[#991B1B]/40",
  };

  const renderIcon = () => {
    switch (variant) {
      case "info":
        return <InfoIcon size={16} className="text-[#65A30D] dark:text-[#A3E635] shrink-0 mt-0.5" />;
      case "success":
        return <CheckCircleIcon size={16} className="text-[#16A34A] dark:text-[#4ADE80] shrink-0 mt-0.5" />;
      case "warning":
        return <WarningIcon size={16} className="text-[#D97706] dark:text-[#FBBF24] shrink-0 mt-0.5" />;
      case "error":
        return <ErrorIcon size={16} className="text-[#DC2626] dark:text-[#F87171] shrink-0 mt-0.5" />;
    }
  };

  return (
    <div
      role={isAlert ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={`border rounded-2xl p-4 text-xs sm:text-sm flex gap-3 leading-relaxed shadow-whisper ${variantStyles[variant]} ${className}`}
    >
      {renderIcon()}
      <div className="flex-1">
        {title && <div className="font-semibold mb-0.5 tracking-tight">{title}</div>}
        <div className="text-current opacity-90 font-normal">{children}</div>
      </div>
    </div>
  );
}

