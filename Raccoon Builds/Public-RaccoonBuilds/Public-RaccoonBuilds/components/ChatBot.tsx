"use client";

import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const presetMessages = [
  { from: "bot", text: "Hola, soy el mapache de obra. ¿Qué quieres construir?" },
  { from: "user", text: "Busco una casa de líneas limpias y materiales nobles." },
  { from: "bot", text: "Perfecto. Podemos empezar con una visita técnica esta semana." }
];

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [draft, setDraft] = useState("");
  const prefersReducedMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        bubbleRef.current &&
        !bubbleRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-30">
      <button
        ref={bubbleRef}
        onClick={() => setOpen((state) => !state)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="glass-panel group relative flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-left shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
        aria-expanded={open}
        aria-label="Abrir asistente de chat"
      >
        <Mascot waving={hovered} />
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-[0.18em] text-slate-200/80">
            Asistente
          </span>
          <span className="text-sm font-semibold text-white">Mapache en obra</span>
          <span className="text-[11px] text-slate-200/70">
            {hovered ? "¿En qué te ayudo?" : "Responde en segundos"}
          </span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: "easeOut" }}
            className="glass-panel mt-3 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-200/80">
                  Chat
                </p>
                <h3 className="text-lg font-semibold leading-tight">Raccoon Builds</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/25 px-2 py-1 text-xs text-slate-100 transition hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                Esc
              </button>
            </div>
            <div className="mt-3 space-y-2">
              {presetMessages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2, delay: index * 0.03 }}
                  className={message.from === "bot" ? "text-slate-100" : "text-slate-200/90"}
                >
                  <div
                    className={clsx(
                      "inline-block rounded-2xl px-3 py-2 text-sm",
                      message.from === "bot"
                        ? "bg-white/10 border border-white/15"
                        : "bg-sky-300/20 border border-sky-200/40 text-sky-50"
                    )}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                setDraft("");
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Escribe tu idea..."
                className="glass-panel w-full rounded-full border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              />
              <button
                type="submit"
                className="glass-button flex items-center gap-1 border border-white/20 px-3 py-2 text-sm"
              >
                Enviar
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Mascot({ waving }: { waving: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.svg
      width="64"
      height="64"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-12 drop-shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
      initial={{ scale: 0.96, rotate: -2 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
    >
      <rect x="20" y="40" width="88" height="64" rx="28" fill="#1E293B" />
      <rect x="30" y="48" width="68" height="50" rx="20" fill="#0F172A" />
      <rect x="24" y="32" width="80" height="20" rx="6" fill="#38BDF8" />
      <rect x="28" y="28" width="72" height="10" rx="5" fill="#0EA5E9" />
      <path
        d="M64 70c-16 0-24-10-24-10s4-14 24-14 24 14 24 14-8 10-24 10Z"
        fill="#CBD5F5"
      />
      <path
        d="M64 62c-10 0-18-6-18-6s5-8 18-8 18 8 18 8-8 6-18 6Z"
        fill="#0B1224"
      />
      <circle cx="52" cy="56" r="6" fill="white" />
      <circle cx="76" cy="56" r="6" fill="white" />
      <circle cx="52" cy="56" r="3" fill="#0B1224" />
      <circle cx="76" cy="56" r="3" fill="#0B1224" />
      <rect x="54" y="74" width="20" height="8" rx="4" fill="#38BDF8" />
      <rect x="60" y="82" width="8" height="6" rx="3" fill="#0EA5E9" />
      <motion.g
        animate={
          waving && !prefersReducedMotion
            ? { rotate: [0, 16, -8, 12, 0], transformOrigin: "110px 68px" }
            : { rotate: 0 }
        }
        transition={{ duration: prefersReducedMotion ? 0 : 0.9, repeat: waving ? Infinity : 0 }}
      >
        <rect
          x="92"
          y="62"
          width="16"
          height="28"
          rx="8"
          fill="#FACC15"
          stroke="#0F172A"
          strokeWidth="3"
        />
        <circle cx="100" cy="60" r="8" fill="#FACC15" stroke="#0F172A" strokeWidth="3" />
      </motion.g>
      <rect x="34" y="88" width="60" height="18" rx="6" fill="#020617" />
      <rect x="40" y="94" width="12" height="12" rx="3" fill="#38BDF8" />
      <rect x="56" y="94" width="32" height="12" rx="4" fill="#0F172A" />
      <rect x="72" y="90" width="18" height="4" rx="2" fill="#22D3EE" />
      <rect x="80" y="22" width="14" height="8" rx="3" fill="#FBBF24" />
      <rect x="70" y="18" width="20" height="10" rx="3" fill="#F59E0B" />
      <path d="M74 18c0-6-6-10-12-10s-12 4-12 10h24Z" fill="#0EA5E9" />
    </motion.svg>
  );
}
