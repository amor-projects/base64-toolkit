import React from "react";
import Link from "next/link";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Parses inline markdown elements:
 * - **bold**
 * - `code`
 * - [link text](url)
 */
function renderInline(text: string): React.ReactNode[] {
  const regex = /(\*\*.*?\*\*)|(`.*?`)|(\[.*?\]\(.*?\))/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const matchedStr = match[0];

    if (matchedStr.startsWith("**") && matchedStr.endsWith("**")) {
      const boldText = matchedStr.slice(2, -2);
      parts.push(
        <strong key={`b-${match.index}`} className="font-semibold text-foreground">
          {boldText}
        </strong>
      );
    } else if (matchedStr.startsWith("`") && matchedStr.endsWith("`")) {
      const codeText = matchedStr.slice(1, -1);
      parts.push(
        <code
          key={`c-${match.index}`}
          className="px-1.5 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.08] border border-border/70 text-[12.5px] font-mono text-foreground font-medium"
        >
          {codeText}
        </code>
      );
    } else if (matchedStr.startsWith("[")) {
      const closingBracket = matchedStr.indexOf("]");
      const linkText = matchedStr.slice(1, closingBracket);
      const url = matchedStr.slice(closingBracket + 2, -1);
      const isExternal = url.startsWith("http://") || url.startsWith("https://");

      if (isExternal) {
        parts.push(
          <a
            key={`l-${match.index}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#27440D] dark:text-[#BEF264] underline underline-offset-2 hover:opacity-80 font-medium transition-opacity"
          >
            {linkText}
          </a>
        );
      } else {
        parts.push(
          <Link
            key={`l-${match.index}`}
            href={url}
            className="text-[#27440D] dark:text-[#BEF264] underline underline-offset-2 hover:opacity-80 font-medium transition-opacity"
          >
            {linkText}
          </Link>
        );
      }
    }

    lastIndex = match.index + matchedStr.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  // Split into paragraphs / blocks by double newlines
  const rawBlocks = content.split(/\n\n+/);

  return (
    <div className={`min-w-0 max-w-full space-y-4 break-words text-sm sm:text-base text-muted font-normal leading-relaxed ${className}`}>
      {rawBlocks.map((block, blockIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // 1. Table check: contains multiple lines with pipes
        if (trimmed.startsWith("|") && trimmed.includes("\n|")) {
          const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
          if (lines.length >= 2) {
            const headerLine = lines[0];
            const bodyLines = lines.slice(2);

            const headers = headerLine
              .split("|")
              .map((c) => c.trim())
              .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

            return (
              <div
                key={blockIdx}
                className="my-5 max-w-full min-w-0 overflow-x-auto rounded-2xl bg-surface border border-border/80 shadow-whisper"
              >
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border/80 bg-black/[0.02] dark:bg-white/[0.03]">
                      {headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          className="px-4 py-3 font-semibold text-foreground tracking-tight"
                        >
                          {renderInline(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {bodyLines.map((rowLine, rIdx) => {
                      const cells = rowLine
                        .split("|")
                        .map((c) => c.trim())
                        .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);

                      return (
                        <tr
                          key={rIdx}
                          className="hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors"
                        >
                          {cells.map((cell, cIdx) => (
                            <td key={cIdx} className="px-4 py-3 text-muted">
                              {renderInline(cell)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // 2. Heading Level 3 (### Heading)
        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={blockIdx}
              className="text-base sm:text-lg font-semibold text-foreground pt-2 text-balance"
            >
              {renderInline(trimmed.replace(/^###\s+/, ""))}
            </h3>
          );
        }

        // 3. Ordered List (1. ...)
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split(/\n(?=\d+\.\s)/);
          return (
            <ol key={blockIdx} className="space-y-2 pl-5 list-decimal text-muted">
              {items.map((item, itemIdx) => {
                const itemText = item.replace(/^\d+\.\s+/, "");
                return (
                  <li key={itemIdx} className="leading-relaxed">
                    {renderInline(itemText)}
                  </li>
                );
              })}
            </ol>
          );
        }

        // 4. Unordered List (- ... or * ...)
        if (/^[-*]\s/.test(trimmed)) {
          const items = trimmed.split(/\n(?=[-*]\s)/);
          return (
            <ul key={blockIdx} className="space-y-2 pl-1">
              {items.map((item, itemIdx) => {
                const itemText = item.replace(/^[-*]\s+/, "");
                return (
                  <li key={itemIdx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-[#65A30D] dark:text-[#A3E635] font-bold select-none mt-0.5">•</span>
                    <span>{renderInline(itemText)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // 5. Regular paragraph
        return (
          <p key={blockIdx} className="break-words leading-relaxed font-normal">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
