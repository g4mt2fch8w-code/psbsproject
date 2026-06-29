import { useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("psbs-theme") as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  // Default to dark
  return "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(t);
  };

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("psbs-theme", next);
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggle, isDark: theme === "dark" };
}
