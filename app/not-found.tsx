import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center flex flex-col items-center p-8 rounded-3xl bg-surface border border-border/80 shadow-tool">
        <div className="w-11 h-11 rounded-2xl bg-[#84CC16]/12 dark:bg-[#BEF264]/14 border border-[#84CC16]/25 text-[#3F6212] dark:text-[#BEF264] flex items-center justify-center font-mono font-bold text-sm mb-5 shadow-whisper">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-foreground">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed font-normal">
          The requested tool or educational guide route does not exist or has been moved. Use the
          button below to return to the active tool directory.
        </p>
        <div className="mt-7 flex items-center gap-3">
          <Link href="/">
            <Button variant="primary" size="md">
              Return to Toolkit Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
