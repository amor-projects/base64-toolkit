import type { ReactNode } from "react";
import { CopyCodeButton } from "./CopyCodeButton";

type CodeLanguage = "bash" | "javascript" | "json";

const KEYWORDS = new Set([
  "async",
  "await",
  "const",
  "curl",
  "fetch",
  "let",
  "return",
  "var",
]);

const LITERALS = new Set(["false", "null", "true"]);

function tokenClass(token: string, language: CodeLanguage, followingText: string): string {
  if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'")) || (token.startsWith("`") && token.endsWith("`"))) {
    if (language === "json" && /^\s*:/.test(followingText)) {
      return "text-[#93C5FD]";
    }
    return "text-[#A7F3D0]";
  }

  if (token.startsWith("//") || token.startsWith("#")) return "text-[#71717A]";
  if (KEYWORDS.has(token)) return "text-[#C4B5FD]";
  if (LITERALS.has(token) || /^\d/.test(token)) return "text-[#93C5FD]";
  if (/^[{}[\]():,.;=+?&-]+$/.test(token)) return "text-[#A1A1AA]";

  return "text-[#F4F4F5]";
}

function highlightCode(code: string, language: CodeLanguage): ReactNode[] {
  const tokens: ReactNode[] = [];
  const pattern = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\/\/[^\n]*|#[^\n]*|\b(?:async|await|const|curl|fetch|let|return|var|false|null|true)\b|\b\d+(?:\.\d+)?\b|[{}[\]():,.;=+?&-]+)/gm;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(code)) !== null) {
    const token = match[0];
    const start = match.index;
    const followingText = code.slice(start + token.length);

    if (start > lastIndex) {
      tokens.push(code.slice(lastIndex, start));
    }

    tokens.push(
      <span key={`token-${index}`} className={tokenClass(token, language, followingText)}>
        {token}
      </span>
    );
    lastIndex = start + token.length;
    index += 1;
  }

  if (lastIndex < code.length) {
    tokens.push(code.slice(lastIndex));
  }

  return tokens;
}

export function CodeBlock({
  code,
  language,
  title,
}: {
  code: string;
  language: CodeLanguage;
  title: string;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-[#2F3036] bg-[#141417] shadow-[0_10px_30px_-18px_rgba(0,0,0,0.7)]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-[#2F3036] bg-[#1A1A1E] px-4 py-2.5">
        <span className="text-xs font-medium text-[#D4D4D8]">{title}</span>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-white/[0.06] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[#A1A1AA]">
            {language}
          </span>
          <CopyCodeButton code={code} />
        </div>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-7 text-[#F4F4F5] sm:p-5 sm:text-[13px]" tabIndex={0}>
        <code>{highlightCode(code, language)}</code>
      </pre>
    </figure>
  );
}
