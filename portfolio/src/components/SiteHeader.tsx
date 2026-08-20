"use client";

import { useEffect, useId, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { nav, person } from "@/content/site";

/** Sticky site header with desktop links and a compact mobile menu. */
export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={`sticky top-0 z-50 -mx-5 sm:-mx-8 lg:-mx-12 bg-paper no-print ${
        menuOpen ? "" : "border-b border-rule/60"
      }`}
    >
      <nav
        className="relative z-10 flex items-center justify-between gap-4 px-5 sm:px-8 lg:px-12 pt-4 sm:pt-6 pb-3"
        aria-label="Site"
      >
        <a
          href="#top"
          className="smallcaps text-[0.9rem] sm:text-[0.95rem] text-ink-faded hover:text-oxblood transition-colors py-2"
          onClick={closeMenu}
        >
          {person.domain}
        </a>

        <div className="flex items-center gap-3 sm:gap-6">
          <ul className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="smallcaps text-[0.95rem] text-ink-faded hover:text-oxblood transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <span aria-hidden className="hidden md:block w-px h-4 bg-rule" />

          <ThemeToggle />

          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-11 h-11 -mr-2 text-ink-faded hover:text-oxblood transition-colors cursor-pointer"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              aria-hidden
              className={`block h-px w-5 bg-current origin-center transition-transform duration-200 ${
                menuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden
              className={`block h-px w-5 bg-current transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              aria-hidden
              className={`block h-px w-5 bg-current origin-center transition-transform duration-200 ${
                menuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Full-bleed dim: below the top bar, ends after Contact. */}
      <div
        id={menuId}
        aria-hidden={!menuOpen}
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          menuOpen
            ? "max-h-[28rem] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full bg-ink/[0.06] px-5 sm:px-8 lg:px-12">
          <ul className="pt-2 pb-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block py-3.5 smallcaps text-[1rem] tracking-[0.12em] text-ink hover:text-oxblood transition-colors"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {menuOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="md:hidden absolute left-0 right-0 top-full h-screen z-0 cursor-default"
          onClick={closeMenu}
        />
      ) : null}
    </header>
  );
}
