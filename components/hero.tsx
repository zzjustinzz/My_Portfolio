"use client";

import { RiArrowRightLine, RiLinkedinBoxFill, RiMailLine } from "react-icons/ri";

export default function Hero() {
  const scrollToProjects = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero section">
      <div className="hero-grid page-shell">
        <div className="hero-copy">
          <p className="hero-status">
            Product Owner · FPT IS · Ho Chi Minh City
          </p>
          <h1>
            Products that move <span>cities forward.</span>
          </h1>
          <p className="hero-lede">
            I&apos;m Thanh Trần, a Product Owner with an engineering foundation. I lead cross-functional teams across urban mobility, digital payments, and enterprise platforms—from discovery through delivery.
          </p>
          <div className="hero-actions">
            <a id="cta-view-projects" className="btn btn--primary" href="#projects" onClick={scrollToProjects}>
              View product work <RiArrowRightLine aria-hidden="true" />
            </a>
            <a id="cta-contact" className="btn btn--secondary" href="mailto:thanhtdfu@gmail.com">
              <RiMailLine aria-hidden="true" /> Contact Thanh
            </a>
          </div>
          <div className="hero-note">
            <span>Engineering-to-product career</span>
            <a href="https://www.linkedin.com/in/thanh-tr%E1%BA%A7n-5815a0112/" target="_blank" rel="noopener noreferrer">
              <RiLinkedinBoxFill aria-hidden="true" /> LinkedIn profile
            </a>
          </div>
        </div>

        <figure
          className="system-map"
          aria-labelledby="system-map-title"
        >
          <figcaption className="system-map-head meta">
            <span id="system-map-title">Product operating map</span><span>System online</span>
          </figcaption>
          <svg viewBox="0 0 560 360" role="img" aria-label="Thanh connects city users, public stakeholders, product teams, payment partners, and enterprise platforms">
            <path className="map-line map-line--accent" d="M280 180 C210 145 165 104 95 86" />
            <path className="map-line" d="M280 180 C350 140 395 102 470 82" />
            <path className="map-line" d="M280 180 C205 220 160 262 90 280" />
            <path className="map-line map-line--accent" d="M280 180 C348 220 400 258 475 282" />

            <rect className="map-node map-node--core" x="220" y="142" width="120" height="76" rx="8" />
            <text className="map-label" x="280" y="176" textAnchor="middle">PRODUCT</text>
            <text className="map-sub" x="280" y="195" textAnchor="middle">DISCOVERY → DELIVERY</text>

            <rect className="map-node" x="28" y="50" width="134" height="66" rx="8" />
            <text className="map-label" x="95" y="80" textAnchor="middle">CITY USERS</text>
            <text className="map-sub" x="95" y="97" textAnchor="middle">TTGT · GOBUS · METRO</text>

            <rect className="map-node" x="398" y="48" width="144" height="68" rx="8" />
            <text className="map-label" x="470" y="79" textAnchor="middle">STAKEHOLDERS</text>
            <text className="map-sub" x="470" y="97" textAnchor="middle">PUBLIC · BUSINESS</text>

            <rect className="map-node" x="20" y="248" width="140" height="66" rx="8" />
            <text className="map-label" x="90" y="278" textAnchor="middle">PAYMENTS</text>
            <text className="map-sub" x="90" y="296" textAnchor="middle">7 MAJOR PARTNERS</text>

            <rect className="map-node" x="398" y="248" width="154" height="66" rx="8" />
            <text className="map-label" x="475" y="278" textAnchor="middle">DELIVERY TEAMS</text>
            <text className="map-sub" x="475" y="296" textAnchor="middle">PRODUCT · DESIGN · ENG</text>
          </svg>
          <div className="system-map-foot">
            <div><strong>Mobility</strong><span>Public platforms</span></div>
            <div><strong>Payments</strong><span>Partner network</span></div>
            <div><strong>Enterprise</strong><span>B2B operations</span></div>
          </div>
        </figure>
      </div>
    </section>
  );
}
