"use client";

import { RiArrowRightUpLine } from "react-icons/ri";
import type { Project } from "@/lib/data";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card">
      <div className="project-index"><span>CASE {String(index + 1).padStart(2, "0")}</span><span>{project.dateRange}</span></div>
      <div>
        <h3>{project.title}</h3>
        <p className="meta project-role">{project.role}</p>
      </div>
      <p>{project.description}</p>
      <div className="project-facts" aria-label="Project impact">
        {project.metrics.map((metric) => <div className="project-fact" key={metric}>{metric}</div>)}
      </div>
      <div className="project-tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
      {project.liveUrl && (
        <a className="project-link" id={`project-live-${index}`} href={project.liveUrl} target="_blank" rel="noopener noreferrer">
          View product <RiArrowRightUpLine aria-hidden="true" />
        </a>
      )}
    </article>
  );
}
