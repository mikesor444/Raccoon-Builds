"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type Item = { id: string; label: string };

type MenuOverlayProps = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  items: Item[];
  activeId: string;
};

export function MenuOverlay({
  id,
  isOpen,
  onClose,
  items,
  activeId
}: MenuOverlayProps) {
  const prefersReducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          aria-hidden={!isOpen}
          className="fixed inset-0 z-30 bg-gradient-to-b from-black/60 via-black/40 to-black/70 backdrop-blur-3xl"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
        >
          <motion.div
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: "easeOut" }}
            className="glass-panel relative mx-auto mt-24 flex max-w-4xl flex-col gap-6 rounded-3xl border border-white/15 bg-white/5 p-8 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-slate-200/80">
                  Navegación
                </p>
                <h2 className="text-3xl font-semibold">Raccoon Builds</h2>
              </div>
              <button
                onClick={onClose}
                className="glass-button border border-white/25 px-4 py-2"
              >
                Cerrar
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {items.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={onClose}
                  className={clsx(
                    "group rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors",
                    activeId === item.id
                      ? "border-white/30 text-white"
                      : "text-slate-200 hover:border-white/30"
                  )}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : index * 0.05,
                    duration: prefersReducedMotion ? 0 : 0.25
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">{item.label}</span>
                    <span className="text-xs uppercase tracking-wide text-slate-300/80">
                      {index + 1}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300/80">
                    {item.id === "hero" && "Portada y manifiesto de diseño."}
                    {item.id === "catalogo" && "Selección curada de proyectos insignia."}
                    {item.id === "proceso" && "Metodología, rigor y materiales nobles."}
                    {item.id === "sobre" && "Firma, filosofía y equipo núcleo."}
                    {item.id === "contacto" && "Coordinemos tu próxima obra."}
                  </p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
