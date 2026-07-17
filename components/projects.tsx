"use client";

import { RiArrowRightUpLine } from "react-icons/ri";
import { projectsData } from "@/lib/data";
import ProjectCard from "./project-card";

export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="project-stack page-shell">
        <header className="project-stack-intro">
          <div className="accent-line" aria-hidden="true" />
          <h2 className="section-title">Product work in operating context.</h2>
          <p className="section-lede">Urban mobility, integrated payments, public services, and enterprise operations—shown as systems, stakeholders, and delivery outcomes.</p>
          <a className="project-link" id="projects-linkedin" href="https://www.linkedin.com/in/thanh-tr%E1%BA%A7n-5815a0112/" target="_blank" rel="noopener noreferrer">
            Full profile <RiArrowRightUpLine aria-hidden="true" />
          </a>
        </header>

        <div className="project-stack-scroll">
          {projectsData.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
        </div>
      </div>
    </section>
  );
}
