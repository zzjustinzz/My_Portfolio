"use client";

import { RiGithubFill, RiLinkedinBoxFill, RiHeartFill, RiInstagramLine } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground/40">
        <p className="flex items-center gap-1.5">
          Built with <RiHeartFill size={14} className="text-brand-500" /> by{" "}
          <span className="text-foreground/60 font-medium">Kishan Kushwaha</span>
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/krishcode11"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-300 transition-colors"
            aria-label="GitHub"
          >
            <RiGithubFill size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/kishan-kushwaha-b71723413/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-300 transition-colors"
            aria-label="LinkedIn"
          >
            <RiLinkedinBoxFill size={18} />
          </a>
          <a
            href="https://www.instagram.com/kishan.builds/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-300 transition-colors"
            aria-label="Instagram"
          >
            <RiInstagramLine size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
