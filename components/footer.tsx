"use client";

import { RiLinkedinBoxFill, RiMailLine } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <p className="footer-statement">Good product direction makes complexity operable.</p>
        <div className="footer-meta">
          <p><span className="wordmark">THANH<span className="wordmark-mark">/PM</span></span> · Product Owner at FPT IS</p>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/thanh-tr%E1%BA%A7n-5815a0112/" target="_blank" rel="noopener noreferrer" aria-label="Thanh Trần on LinkedIn"><RiLinkedinBoxFill aria-hidden="true" /></a>
            <a href="mailto:thanhtdfu@gmail.com" aria-label="Email Thanh Trần"><RiMailLine aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
