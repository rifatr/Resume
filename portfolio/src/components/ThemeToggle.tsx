"use client";

import { useEffect, useState } from "react";

type Edition = "light" | "dark";

/**
 * Day / night edition switch. The document may already carry a data-theme from
 * the blocking script in layout.tsx, so read from the DOM rather than assuming.
 */
export default function ThemeToggle() {
  const [edition, setEdition] = useState<Edition | null>(null);

  useEffect(() => {
    const attr = document.documentElement.dataset.theme as Edition | undefined;
    setEdition(
      attr ??
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"),
    );
  }, []);

  function toggle() {
    const next: Edition = edition === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("rifat-edition", next);
    } catch {
      // Private browsing; the choice simply will not persist.
    }
    setEdition(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="smallcaps text-ink-faded hover:text-oxblood transition-colors text-[0.78rem] cursor-pointer no-print"
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
