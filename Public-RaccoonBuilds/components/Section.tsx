import clsx from "clsx";
import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  theme?: "light" | "dark";
  className?: string;
  enableSnap?: boolean;
  children: ReactNode;
};

export function Section({
  id,
  theme = "dark",
  className,
  enableSnap = false,
  children
}: SectionProps) {
  return (
    <section
      id={id}
      data-section
      data-theme={theme}
      aria-labelledby={`${id}-title`}
      className={clsx(
        "section-shell relative w-full",
        enableSnap && "snap-start min-h-screen flex items-center",
        className
      )}
    >
      {children}
    </section>
  );
}
