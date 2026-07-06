"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/data";
import { RiGithubFill, RiExternalLinkLine, RiBarChartLine } from "react-icons/ri";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.015 }}
      className="group relative flex flex-col h-full glass rounded-2xl border border-white/10 hover:border-brand-400/60 hover:shadow-brand-lg transition-all duration-400 overflow-hidden"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Hover glow inside card */}
      <div className="absolute inset-0 bg-brand-gradient-subtle opacity-0 group-hover:opacity-100 transition-opacity duration-400 -z-10" />

      <div className="flex flex-col flex-1 p-6 gap-5">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-foreground/90 leading-tight group-hover:text-brand-300 transition-colors duration-200">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground/45">
            <span className="font-medium text-brand-400">{project.role}</span>
            <span>·</span>
            <span>{project.dateRange}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/60 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Metrics */}
        <div>
          <div className="flex items-center gap-1.5 mb-2.5">
            <RiBarChartLine size={14} className="text-brand-400" />
            <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Impact</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.metrics.map((metric) => (
              <span
                key={metric}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-brand-500/15 text-brand-300 border border-brand-500/25"
              >
                {metric}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium rounded-full glass text-foreground/55 border border-white/8 hover:text-foreground/80 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/8">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`project-github-${index}`}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-white/10 text-foreground/55 hover:text-brand-300 hover:border-brand-500/40 transition-all duration-200 group/link"
          >
            <RiGithubFill size={16} className="group-hover/link:scale-110 transition-transform" />
            <span>GitHub</span>
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              id={`project-live-${index}`}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-brand-500/20 border border-brand-500/40 text-brand-300 hover:bg-brand-500/35 hover:border-brand-400/60 hover:text-brand-200 transition-all duration-200 group/link font-medium"
            >
              <RiExternalLinkLine size={15} className="group-hover/link:scale-110 group-hover/link:translate-x-0.5 transition-transform" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
