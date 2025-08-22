// src/pages/Home.tsx
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="space-y-0">
      {/* HERO — bright in light, dramatic in dark */}
      <Section
        id="hero"
        className="bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-black"
      >
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Hi, I’m Yoav.
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Front‑end developer who loves snappy UX, minimal bundles, and clean React.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <NavLink
              to="/projects"
              className="btn bg-[#cf3a30] text-white border-0 hover:bg-[#e1362b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#cf3a30]/40"
            >
              View Projects
            </NavLink>
            {/* Light: outline for contrast; Dark: ghost to blend */}
            <NavLink to="/contact" className="btn btn-outline dark:btn-ghost">
              Get in touch
            </NavLink>
          </div>

          {/* subtle hero flourish (stronger in dark) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.25 }}
            className="pointer-events-none w-full h-24
                       bg-gradient-to-r from-transparent via-[#cf3a30] to-transparent
                       blur-2xl opacity-15 dark:opacity-30"
          />
        </div>
      </Section>

      {/* ABOUT TEASER — keep on Home even without a dedicated page */}
      <Section id="about" className="bg-white dark:bg-black">
        <SectionTitle
          eyebrow="About"
          title="Crafting interfaces that feel fast"
          subtitle="I focus on clean architecture, minimal dependencies, and accessible motion."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Performance",
              text: "Code-splitting, image discipline, smart caching.",
            },
            {
              title: "Accessibility",
              text: "Keyboard first, reduced motion, color contrast.",
            },
            {
              title: "DX & Quality",
              text: "TypeScript, strict linting, and clear docs.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-box bg-white dark:bg-black
                         border border-gray-200 dark:border-white/10
                         shadow-sm dark:shadow-none p-5"
            >
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FEATURED PROJECTS */}
      <Section id="featured" className="bg-white dark:bg-black">
        <SectionTitle
          eyebrow="Featured"
          title="Selected work"
          subtitle="A quick peek. The full list lives on the Projects page."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((n) => (
            <motion.article
              key={n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-box bg-white dark:bg-black
                         border border-gray-200 dark:border-white/10
                         shadow-sm dark:shadow-none p-5"
            >
              <h3 className="text-lg font-semibold">Project {n}</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                Short description of what this project does and what was challenging.
              </p>
              <div className="mt-4">
                <NavLink
                  to="/projects"
                  className="btn btn-sm bg-[#cf3a30] text-white border-0 hover:bg-[#e1362b]"
                >
                  Details
                </NavLink>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* CTA STRIPE */}
      <Section id="contact" className="relative overflow-hidden bg-[#cf3a30] text-white">
        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">Let’s build something</h2>
          <p className="mt-2 opacity-90">
            Have a project in mind? I’m open to collaborations and freelance work.
          </p>
          <NavLink to="/contact" className="btn mt-6 bg-white text-black border-0 hover:bg-gray-200">
            Get in touch
          </NavLink>
        </div>

        {/* background accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 0.2, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0
                     bg-[radial-gradient(circle_at_50%_0%,white_0%,transparent_60%)]"
        />
      </Section>
    </div>
  );
}