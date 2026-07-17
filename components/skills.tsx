"use client";

import { skillsData } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="section section--roomy">
      <div className="skills-layout page-shell">
        <header className="sticky-intro">
          <div className="accent-line" aria-hidden="true" />
          <h2 className="section-title">Product thinking with technical depth.</h2>
          <p className="section-lede">A working toolkit built across product ownership, engineering, quality, and cross-functional delivery.</p>
        </header>

        <div className="skills-list">
          {skillsData.map((group) => (
            <article className="skill-row" key={group.category}>
              <h3>{group.category}</h3>
              <div className="tag-list">{group.skills.map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
