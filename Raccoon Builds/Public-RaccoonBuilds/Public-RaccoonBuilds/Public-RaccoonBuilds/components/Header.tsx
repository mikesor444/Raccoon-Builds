"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MenuOverlay } from "./MenuOverlay";

type HeaderProps = {
  activeId: string;
  activeTheme: "light" | "dark";
};

const navItems = [
  { id: "hero", label: "Inicio" },
  { id: "catalogo", label: "Catálogo" },
  { id: "proceso", label: "Proceso" },
  { id: "sobre", label: "Sobre" },
  { id: "contacto", label: "Contacto" }
];

export function Header({ activeId, activeTheme }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const glassy = scrolled || isMenuOpen;
  const textColor =
    activeTheme === "light" && !isMenuOpen
      ? "text-slate-900"
      : "text-slate-100";

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
          glassy
            ? "backdrop-blur-2xl bg-white/5 border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        )}
        data-theme={activeTheme}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="glass-panel flex h-11 w-11 items-center justify-center rounded-full border border-white/20">
              <span className="text-lg font-semibold">RB</span>
            </div>
            <div className="leading-tight">
              <p className={clsx("text-sm uppercase tracking-[0.2em]", textColor)}>
                Raccoon Builds
              </p>
              <p className="text-xs text-slate-300">Arquitectura precisa</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={clsx(
                  "relative text-sm font-medium transition-colors",
                  textColor,
                  activeId === item.id ? "opacity-100" : "opacity-60 hover:opacity-90"
                )}
              >
                {item.label}
                <AnimatePresence>
                  {activeId === item.id && (
                    <motion.span
                      layoutId="header-pill"
                      className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-sky-300"
                    />
                  )}
                </AnimatePresence>
              </a>
            ))}
          </nav>
          <button
            className="glass-button border border-white/25 px-4 py-2 text-sm md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="menu-overlay"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? "Cerrar" : "Menú"}
          </button>
        </div>
      </header>
      <MenuOverlay
        id="menu-overlay"
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        items={navItems}
        activeId={activeId}
      />
    </>
  );
}
