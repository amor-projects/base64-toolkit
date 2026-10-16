import React from "react";

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
      "bg-[#F5F4FE] dark:bg-[#19182C] text-[#3730A3] dark:text-[#C7D2FE] border-[#E0E7FF] dark:border-[#3730A3]/40",
    success:
      "bg-[#F0FDF4] dark:bg-[#132219] text-[#166534] dark:text-[#BBF7D0] border-[#DCFCE7] dark:border-[#166534]/40",
    warning:
      "bg-[#FFFBEB] dark:bg-[#261E10] text-[#92400E] dark:text-[#FDE68A] border-[#FEF3C7] dark:border-[#92400E]/40",
    error:
      "bg-[#FEF2F2] dark:bg-[#291415] text-[#991B1B] dark:text-[#FECACA] border-[#FEE2E2] dark:border-[#991B1B]/40",
  };

  const dotStyles = {
    info: "bg-[#6259E8]",
    success: "bg-[#16A34A]",
    warning: "bg-[#D97706]",
    error: "bg-[#DC2626]",
  };

  return (
    <div
      role={isAlert ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={`border rounded-2xl p-4 text-xs sm:text-sm flex gap-3.5 leading-relaxed shadow-whisper ${variantStyles[variant]} ${className}`}
    >
      <span
        className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotStyles[variant]}`}
        aria-hidden="true"
      />
      <div className="flex-1">
        {title && <div className="font-semibold mb-0.5 tracking-tight">{title}</div>}
        <div className="text-current opacity-90 font-normal">{children}</div>
      </div>
    </div>
  );
}
