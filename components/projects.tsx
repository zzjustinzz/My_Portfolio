"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { projectsData } from "@/lib/data";
import ProjectCard from "./project-card";

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-500/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-12"
        >
          {/* Section heading */}
          <div className="flex flex-col gap-3 max-w-2xl">
            <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">Projects</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Shipped AI systems with{" "}
              <span className="gradient-text">real metrics</span>
            </h2>
            <p className="text-foreground/55 text-base leading-relaxed">
              Not demos — production-grade applications with retrieval accuracy, latency, and observability baked in.
            </p>
          </div>

          {/* Project grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center"
          >
            <a
              id="projects-github-all"
              href="https://github.com/krishcode11"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 glass rounded-xl border border-brand-500/30 text-foreground/60 hover:text-brand-300 hover:border-brand-500/60 transition-all duration-200 text-sm font-medium"
            >
              View all repositories on GitHub →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
