"use client";

import { ChatBot } from "@/components/ChatBot";
import { Header } from "@/components/Header";
import { Section } from "@/components/Section";
import { useActiveSection } from "@/hooks/useActiveSection";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const ENABLE_SNAP = false;

const projects = [
  {
    id: "victorian",
    title: "Casa victoriana de ladrillo y precast",
    description:
      "Restauración precisa con ladrillo artesanal y piezas de precast que afinan molduras y proporciones.",
    image: "/ai/victorian.png"
  },
  {
    id: "bauhaus",
    title: "Casa bauhaus con un pilar de piedra natural",
    description:
      "Volúmenes geométricos, un pilar monolítico de piedra y huecos calibrados para luz constante.",
    image: "/ai/bauhaus.png"
  },
  {
    id: "cyclopean",
    title: "Chalet ciclópeo de piedra cobblestone",
    description:
      "Envolvente de piedra ciclópea tallada a mano, aleros largos y luminarias empotradas invisibles.",
    image: "/ai/cyclopean-chalet.png"
  },
  {
    id: "wave-wall",
    title: "Muro comercial con olas de ladrillo prefabricado",
    description:
      "Fachada serpenteante de módulos prefabricados que generan textura y sombra dinámica.",
    image: "/ai/wave-wall.png"
  },
  {
    id: "french-townhouses",
    title: "Townhouses franceses con paneles precast",
    description:
      "Serie de adosadas con ritmo parisino, paneles art nouveau y herrería a medida.",
    image: "/ai/french-townhouses.png"
  }
];

const proceso = [
  {
    title: "Brief de precisión",
    text: "Definimos usos, atmósferas y materialidad con maquetas de luz y recorridos VR para eliminar dudas tempranas."
  },
  {
    title: "Ingeniería integrada",
    text: "Estructura, envolvente, HVAC y domótica coordinadas en un solo modelo. Menos reprocesos, más control."
  },
  {
    title: "Obra supervisada",
    text: "Site managers residentes, materiales trazables y reportes semanales con fotos, métricas y avance financiero."
  }
];

export default function Home() {
  const { activeId, activeTheme } = useActiveSection();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative">
      <Header activeId={activeId} activeTheme={activeTheme} />
      <main
        className={clsx(
          "relative",
          ENABLE_SNAP
            ? "snap-y snap-mandatory h-screen overflow-y-scroll"
            : "pb-24"
        )}
      >
        <div
          className={clsx(
            "mx-auto flex max-w-6xl flex-col gap-32 px-6",
            ENABLE_SNAP ? "py-28" : "pt-28"
          )}
        >
          <Section id="hero" theme="dark" enableSnap={ENABLE_SNAP} className="pt-10">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.25em] text-slate-200/80"
                >
                  Raccoon Builds — obra hecha a medida
                </motion.p>
                <motion.h1
                  id="hero-title"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.65, delay: 0.05 }}
                  className="text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
                >
                  Arquitectura de precisión, materiales nobles y dirección obsesiva.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.65, delay: 0.1 }}
                  className="max-w-xl text-lg text-slate-200/90"
                >
                  Diseñamos y ejecutamos viviendas y espacios comerciales que combinan
                  artesanía, ingeniería y sustentabilidad. Menos ruido, más claridad.
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.15 }}
                >
                  <a href="#catalogo" className="glass-button px-5 py-3">
                    Ver catálogo
                  </a>
                  <a
                    href="#contacto"
                    className="glass-button border border-sky-200/50 bg-white/5 px-5 py-3 text-sky-50"
                  >
                    Agendar llamada
                  </a>
                </motion.div>
                <motion.div
                  className="flex flex-wrap gap-4 text-sm text-slate-300/90"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.2 }}
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Obra residencial y comercial
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-300" />
                    Diseño + construcción integrada
                  </span>
                </motion.div>
              </div>
              <motion.div
                className="relative h-[480px] overflow-hidden"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.1 }}
              >
                <Image
                  src="/ai/hero.png"
                  alt="Render arquitectónico de Raccoon Builds"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 glass-panel rounded-full px-4 py-2 text-xs text-slate-100">
                  Luz natural, materiales táctiles, tecnología oculta.
                </div>
              </motion.div>
            </div>
          </Section>

          <Section
            id="catalogo"
            theme="light"
            enableSnap={ENABLE_SNAP}
            className="rounded-3xl bg-gradient-to-b from-slate-100 to-slate-50 px-6 py-10 text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
          >
            <div className="mb-8 flex flex-col gap-2">
              <p
                id="catalogo-title"
                className="text-sm uppercase tracking-[0.24em] text-slate-500"
              >
                Catálogo
              </p>
              <h2 className="text-3xl font-semibold">Cinco proyectos, cinco obsesiones</h2>
              <p className="max-w-3xl text-lg text-slate-700">
                Curamos materiales, detalles y luz en cada entrega. Las imágenes son renders
                editoriales generados para ilustrar la dirección estética.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project, index) => (
                <motion.article
                  key={project.id}
                  className="group overflow-hidden bg-white"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.4,
                    delay: prefersReducedMotion ? 0 : index * 0.04
                  }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  </div>
                  <div className="space-y-2 p-5">
                    <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
                    <p className="text-slate-700">{project.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </Section>

          <Section
            id="proceso"
            theme="dark"
            enableSnap={ENABLE_SNAP}
            className="rounded-3xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 px-6 py-10 text-slate-100 ring-1 ring-white/10"
          >
            <div className="mb-8 flex flex-col gap-2">
              <p
                id="proceso-title"
                className="text-sm uppercase tracking-[0.22em] text-slate-200/80"
              >
                Proceso
              </p>
              <h2 className="text-3xl font-semibold">Metodología integral</h2>
              <p className="max-w-3xl text-lg text-slate-200/85">
                Cada proyecto se ejecuta con un equipo núcleo: diseño, ingeniería y obra en un solo
                flujo. Menos fricción, más control de costos y calidad.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {proceso.map((step, index) => (
                <motion.div
                  key={step.title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-5"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.35,
                    delay: prefersReducedMotion ? 0 : index * 0.05
                  }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-200/90">
                      {index + 1}
                    </span>
                    <span className="h-1 w-10 rounded-full bg-sky-300/70" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-slate-200/85">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section
            id="sobre"
            theme="dark"
            enableSnap={ENABLE_SNAP}
            className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-slate-950/80 px-6 py-10 text-slate-100"
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <p
                  id="sobre-title"
                  className="text-sm uppercase tracking-[0.22em] text-slate-200/80"
                >
                  Sobre nosotros
                </p>
                <h2 className="text-3xl font-semibold">Firma boutique, obsesión por el detalle</h2>
                <p className="text-lg text-slate-200/85">
                  Raccoon Builds nace de arquitectos y site managers que crecieron en obra. Cada
                  línea responde a materialidad, confort y mantenimiento. Controlamos proveedores,
                  prototipos y ejecución para que la visión inicial llegue intacta al terreno.
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-slate-200/90">
                  <span className="glass-panel rounded-full px-3 py-1">Dirección integral</span>
                  <span className="glass-panel rounded-full px-3 py-1">Ingeniería BIM</span>
                  <span className="glass-panel rounded-full px-3 py-1">Interiores y FF&E</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-xl font-semibold text-white">Valores</h3>
                  <ul className="mt-3 space-y-2 text-slate-200/85">
                    <li>• Transparencia absoluta en costos, contratos y avances.</li>
                    <li>• Materiales honestos: piedra, ladrillo, madera y metal expuesto.</li>
                    <li>• Innovación silenciosa: domótica, energía y aire calibrados.</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-xl font-semibold text-white">Territorio</h3>
                  <p className="mt-2 text-slate-200/85">
                    Operamos en LATAM y Costa Este de EE.UU. con partners locales y cuadrillas
                    especializadas. Supervisamos en español e inglés.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          <Section
            id="contacto"
            theme="light"
            enableSnap={ENABLE_SNAP}
            className="rounded-3xl bg-gradient-to-r from-slate-100 via-white to-slate-50 px-6 py-10 text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-3">
                <p
                  id="contacto-title"
                  className="text-sm uppercase tracking-[0.22em] text-slate-500"
                >
                  Contacto
                </p>
                <h2 className="text-3xl font-semibold">Hablemos de tu proyecto</h2>
                <p className="max-w-2xl text-lg text-slate-700">
                  Agenda una llamada estratégica de 20 minutos. Revisamos sitio, presupuesto y
                  cronograma para activar un pre-anteproyecto en menos de 10 días.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-slate-800">
                  <span className="rounded-full border border-slate-300 bg-white px-3 py-1">
                    Tel: +34 91 555 00 44
                  </span>
                  <span className="rounded-full border border-slate-300 bg-white px-3 py-1">
                    Email: hola@raccoonbuilds.com
                  </span>
                  <span className="rounded-full border border-slate-300 bg-white px-3 py-1">
                    Estudio: Paseo de la Luz 128, Madrid
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-lg">
                <span className="text-sm uppercase tracking-[0.22em] text-slate-500">
                  CTA
                </span>
                <h3 className="text-xl font-semibold">Coordina una visita técnica</h3>
                <p className="text-slate-700">
                  Un arquitecto senior y un site manager visitan tu terreno o local para evaluar
                  viabilidad y costos preliminares.
                </p>
                <a
                  href="mailto:hola@raccoonbuilds.com?subject=Proyecto%20Raccoon%20Builds"
                  className="glass-button border border-slate-200/70 bg-slate-900 text-white"
                >
                  Escribir ahora
                </a>
              </div>
            </div>
          </Section>
        </div>
      </main>
      <ChatBot />
    </div>
  );
}
