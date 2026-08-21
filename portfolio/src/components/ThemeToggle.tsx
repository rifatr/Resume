"use client";

import { useSyncExternalStore } from "react";
import { getEdition, setEdition, subscribeToEdition } from "@/lib/theme";

/**
 * Day / night edition switch. The document may already carry a data-theme from
 * the blocking script in layout.tsx, so read from the DOM rather than assuming.
 */
export default function ThemeToggle() {
  const edition = useSyncExternalStore(subscribeToEdition, getEdition, () => null);

  function toggle() {
    const next = edition === "dark" ? "light" : "dark";
    setEdition(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="smallcaps text-ink-faded hover:text-oxblood transition-colors text-[0.78rem] sm:text-[0.78rem] cursor-pointer no-print min-h-[44px] min-w-[44px] flex items-center justify-center"
      // Before hydration settles we do not know the edition, so stay generic.
      aria-label={
        edition ? `Switch to ${edition === "dark" ? "day" : "night"} edition` : "Switch edition"
      }
      title={edition === "dark" ? "Day edition" : "Night edition"}
    >
      {edition === "dark" ? "Day" : "Night"}
    </button>
  );
}
