"use client";

import { useSyncExternalStore, useCallback } from "react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";

function getThemeSnapshot(): Theme {
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribeToTheme(callback: () => void) {
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  mql.addEventListener("change", callback);
  window.addEventListener("storage", callback);
  return () => {
    mql.removeEventListener("change", callback);
    window.removeEventListener("storage", callback);
  };
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  window.setTimeout(() => root.classList.remove("theme-transition"), 350);
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", next);
    applyTheme(next);
    window.dispatchEvent(new StorageEvent("storage", { key: "theme" }));
  }, [theme]);

  return (
    <button
      type="button"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      onClick={toggle}
      style={{
        background: "transparent",
        border: "1px solid var(--line)",
        borderRadius: 6,
        padding: 7,
        width: 34,
        height: 34,
        cursor: "pointer",
        color: "var(--ink-soft)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "border-color 0.15s, color 0.15s",
      }}
    >
      {theme === "light" ? (
        <Moon size={16} aria-hidden="true" />
      ) : (
        <Sun size={16} aria-hidden="true" />
      )}
    </button>
  );
}
