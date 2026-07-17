"use client";

import { experienceData } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section section--roomy">
      <div className="experience-layout page-shell">
        <header className="sticky-intro">
          <div className="accent-line" aria-hidden="true" />
          <h2 className="section-title">From engineering detail to product direction.</h2>
          <p className="section-lede">A career path through software quality, full-stack engineering, and product ownership.</p>
        </header>

        <ol className="timeline">
          {experienceData.map((item) => (
            <li className="timeline-item" key={`${item.title}-${item.period}`}>
              <p className="timeline-period">{item.period}</p>
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <p className="mono">{item.subtitle}</p>
                <p>{item.description}</p>
                {item.highlights && <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}
                {item.techStack && <div className="tag-list">{item.techStack.map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
