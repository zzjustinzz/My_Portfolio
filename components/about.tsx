"use client";

import { RiCodeSSlashLine, RiGovernmentLine, RiRoadMapLine, RiTeamLine } from "react-icons/ri";

const highlights = [
  { icon: RiRoadMapLine, title: "Product Ownership", desc: "Guiding products from discovery and user research through delivery and continuous improvement." },
  { icon: RiTeamLine, title: "Cross-functional Leadership", desc: "Aligning stakeholders, engineers, researchers, partners, and business teams around outcomes." },
  { icon: RiGovernmentLine, title: "Smart City Products", desc: "Delivering digital services for urban transportation and public-sector operations in Ho Chi Minh City." },
  { icon: RiCodeSSlashLine, title: "Engineering Foundation", desc: "Bringing hands-on full-stack and integration experience to practical product decisions." },
];

export default function About() {
  return (
    <section id="about" className="section section--roomy">
      <div className="about-layout page-shell">
        <header className="sticky-intro">
          <div className="accent-line" aria-hidden="true" />
          <h2 className="section-title">Complex systems, made useful.</h2>
          <p className="section-lede">Product direction grounded in delivery reality, public-sector context, and engineering constraints.</p>
        </header>

        <div className="about-copy">
          <div className="prose">
            <p>I&apos;m a <strong>Product Owner and Project Manager at FPT IS</strong> with a background spanning quality assurance, full-stack engineering, and product leadership.</p>
            <p>I lead cross-functional teams to build user-centered digital products for <strong>urban mobility, smart city services, digital payments, and enterprise clients</strong>. My work includes TTGT, GoBus, HCMC Metro, and enterprise platforms for AJINOMOTO.</p>
            <p>Because I started my career in testing and software engineering, I connect product direction with technical reality and work comfortably from discovery through delivery.</p>
            <p><strong>Building products with lasting impact.</strong> I&apos;m passionate about simplifying complex ecosystems and creating digital experiences that scale for users, organizations, and cities.</p>
          </div>

          <div className="discipline-list">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <article className="discipline-row" key={title}>
                <Icon size={24} aria-hidden="true" />
                <div><h3>{title}</h3><p>{desc}</p></div>
              </article>
            ))}
          </div>

          <div className="tag-list" aria-label="Core working knowledge">
            {["Product Management", "Scrum", "Smart City", "Digital Payments", "Node.js", "ReactJS"].map((item) => <span className="tag" key={item}>{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
