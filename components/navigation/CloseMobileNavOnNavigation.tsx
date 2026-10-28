"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Keeps the native details menu closed after a client-side route transition.
 * The menu itself remains server-rendered; this tiny component only watches
 * navigation and resets the persistent layout's open state.
 */
export function CloseMobileNavOnNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    document.querySelectorAll<HTMLDetailsElement>("details.mobile-nav[open]").forEach((menu) => {
      menu.open = false;
    });
  }, [pathname]);

  return null;
}
