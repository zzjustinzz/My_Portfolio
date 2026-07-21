"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiArrowRightLine, RiCloseLine, RiMenuLine, RiSearchLine } from "react-icons/ri";
import { navLinks } from "@/lib/data";
import ThemeSwitch from "./theme-switch";

type IndexEntry = { sectionLabel: string; href: string; el: HTMLElement; text: string };

type SearchResult =
  | { kind: "section"; label: string; href: string }
  | { kind: "text"; key: string; sectionLabel: string; el: HTMLElement; before: string; match: string; after: string };

const SNIPPET_LEAD = 32;
const SNIPPET_TAIL = 80;
const MAX_TEXT_RESULTS = 8;
const KEYWORD_FLASH_MS = 3000;

function flashKeyword(el: HTMLElement, keyword: string): boolean {
  const HighlightCtor = (window as unknown as { Highlight?: new (...ranges: Range[]) => unknown }).Highlight;
  const registry = (CSS as unknown as { highlights?: Map<string, unknown> }).highlights;
  if (!HighlightCtor || !registry) return false;
  const q = keyword.toLowerCase();
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    const at = node.data.toLowerCase().indexOf(q);
    if (at === -1) continue;
    const range = document.createRange();
    range.setStart(node, at);
    range.setEnd(node, at + q.length);
    el.classList.remove("kw-flash");
    void el.offsetWidth;
    el.classList.add("kw-flash");
    registry.set("search-keyword", new HighlightCtor(range));
    window.setTimeout(() => {
      registry.delete("search-keyword");
      el.classList.remove("kw-flash");
    }, KEYWORD_FLASH_MS);
    return true;
  }
  return false;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [indexEntries, setIndexEntries] = useState<IndexEntry[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    const sections: SearchResult[] = navLinks
      .filter((link) => link.label.toLowerCase().includes(q))
      .map((link) => ({ kind: "section", label: link.label, href: link.href }));
    if (q.length < 2) return sections;

    const texts: SearchResult[] = [];
    for (let i = 0; i < indexEntries.length && texts.length < MAX_TEXT_RESULTS; i++) {
      const entry = indexEntries[i];
      const at = entry.text.toLowerCase().indexOf(q);
      if (at === -1) continue;
      const start = Math.max(0, at - SNIPPET_LEAD);
      const end = at + q.length + SNIPPET_TAIL;
      texts.push({
        kind: "text",
        key: `text-${i}`,
        sectionLabel: entry.sectionLabel,
        el: entry.el,
        before: (start > 0 ? "…" : "") + entry.text.slice(start, at),
        match: entry.text.slice(at, at + q.length),
        after: entry.text.slice(at + q.length, end) + (end < entry.text.length ? "…" : ""),
      });
    }
    return [...sections, ...texts];
  }, [query, indexEntries]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers = navLinks.flatMap((link) => {
      const id = link.href.slice(1);
      const element = document.getElementById(id);
      if (!element) return [];
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActiveSection(id),
        { rootMargin: "-35% 0px -55%", threshold: 0 }
      );
      observer.observe(element);
      return [observer];
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (commandOpen && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    }
    if (!commandOpen && dialog.open) dialog.close();
    document.body.style.overflow = commandOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [commandOpen]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    if (!commandOpen) return;
    const entries: IndexEntry[] = [];
    navLinks.forEach((link) => {
      const section = document.getElementById(link.href.slice(1));
      if (!section) return;
      section.querySelectorAll<HTMLElement>("h1, h2, h3, p, li").forEach((el) => {
        const text = el.innerText?.replace(/\s+/g, " ").trim();
        if (text && text.length > 2) entries.push({ sectionLabel: link.label, href: link.href, el, text });
      });
    });
    setIndexEntries(entries);
  }, [commandOpen]);

  const goTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
    setCommandOpen(false);
    setQuery("");
  };

  const goToResult = (result: SearchResult) => {
    if (result.kind === "section") {
      goTo(result.href);
      return;
    }
    setCommandOpen(false);
    setQuery("");
    result.el.scrollIntoView({ behavior: "smooth", block: "center" });
    if (flashKeyword(result.el, result.match)) return;
    result.el.classList.remove("search-flash");
    void result.el.offsetWidth;
    result.el.classList.add("search-flash");
    window.setTimeout(() => result.el.classList.remove("search-flash"), 1800);
  };

  const onCommandKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    }
    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      goToResult(results[activeIndex]);
    }
  };

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="site-nav page-shell">
          <a
            className="wordmark"
            href="#home"
            onClick={(event) => { event.preventDefault(); goTo("#home"); }}
          >
            THANH<span className="wordmark-mark">/PM</span>
          </a>

          <button className="search-pill" type="button" onClick={() => setCommandOpen(true)} aria-label="Search this page">
            <RiSearchLine aria-hidden="true" />
            <span>Search portfolio</span>
            <kbd>⌘K</kbd>
          </button>

          <div className="nav-actions">
            <nav className="nav-links" aria-label="Primary navigation">
              {navLinks.slice(1).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${activeSection === link.href.slice(1) ? "is-active" : ""}`}
                  onClick={(event) => { event.preventDefault(); goTo(link.href); }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <ThemeSwitch />
            <button
              type="button"
              className="icon-button mobile-toggle"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            >
              {mobileOpen ? <RiCloseLine aria-hidden="true" /> : <RiMenuLine aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(event) => { event.preventDefault(); goTo(link.href); }}>
                  {link.label}<RiArrowRightLine aria-hidden="true" />
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <dialog
        ref={dialogRef}
        className="command-layer"
        onClose={() => setCommandOpen(false)}
        onClick={(event) => event.target === event.currentTarget && setCommandOpen(false)}
        aria-label="Navigate portfolio sections"
      >
        <div className="command-panel">
          <div className="command-field">
            <RiSearchLine aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onCommandKeyDown}
              placeholder="Search sections & content…"
              aria-label="Search page content"
            />
            <kbd>esc</kbd>
          </div>
          <div className="command-results" role="listbox" aria-label="Search results">
            {results.length === 0 && query.trim() && (
              <p className="command-empty">No matches for “{query.trim()}”.</p>
            )}
            {results.map((result, index) => {
              const prev = results[index - 1];
              const showGroup = !prev || prev.kind !== result.kind;
              return (
                <Fragment key={result.kind === "section" ? result.href : result.key}>
                  {showGroup && (
                    <p className="command-group" role="presentation">
                      {result.kind === "section" ? "Sections" : "On this page"}
                    </p>
                  )}
                  <button
                    type="button"
                    role="option"
                    aria-selected={activeIndex === index}
                    className={`command-item ${activeIndex === index ? "is-active" : ""}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => goToResult(result)}
                  >
                    {result.kind === "section" ? (
                      <><span>{result.label}</span><span>{result.href}</span></>
                    ) : (
                      <>
                        <span className="command-snippet">
                          {result.before}<mark>{result.match}</mark>{result.after}
                        </span>
                        <span>{result.sectionLabel}</span>
                      </>
                    )}
                  </button>
                </Fragment>
              );
            })}
          </div>
        </div>
      </dialog>
    </>
  );
}
