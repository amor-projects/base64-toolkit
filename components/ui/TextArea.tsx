import React from "react";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isMono?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = "", isMono = true, rows = 6, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full p-4 text-[13px] bg-[#F9F9F7] dark:bg-[#161619] text-foreground border border-border/80 rounded-2xl placeholder:text-muted/50 transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus:bg-surface focus:border-[#84CC16] focus:outline-none focus:ring-2 focus:ring-[#84CC16]/25 disabled:opacity-50 disabled:bg-[#F2F2F0] dark:disabled:bg-[#121215] resize-y ${
          isMono ? "font-mono leading-relaxed tracking-normal" : "font-sans leading-relaxed"
        } ${className}`}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";
