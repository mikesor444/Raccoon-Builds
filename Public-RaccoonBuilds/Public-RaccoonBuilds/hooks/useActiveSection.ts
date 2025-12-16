"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useActiveSection() {
  const [activeId, setActiveId] = useState("hero");
  const [activeTheme, setActiveTheme] = useState<Theme>("dark");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const element = visible.target as HTMLElement;
          const id = element.id || activeId;
          const theme = (element.dataset.theme as Theme) || "dark";
          setActiveId(id);
          setActiveTheme(theme);
        }
      },
      {
        threshold: [0.25, 0.55, 0.8]
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return { activeId, activeTheme };
}
