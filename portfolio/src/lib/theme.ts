export type Edition = "light" | "dark";

const themeChangeEvent = "rifat-theme-change";

export function getEdition(): Edition {
  const saved = document.documentElement.dataset.theme;
  if (saved === "light" || saved === "dark") return saved;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function setEdition(edition: Edition) {
  document.documentElement.dataset.theme = edition;
  try {
    localStorage.setItem("rifat-edition", edition);
  } catch {
    // Private browsing; the choice simply will not persist.
  }
  window.dispatchEvent(new Event(themeChangeEvent));
}

export function subscribeToEdition(onChange: () => void) {
  window.addEventListener(themeChangeEvent, onChange);
  return () => window.removeEventListener(themeChangeEvent, onChange);
}
