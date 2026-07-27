"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RiCloseLine, RiArrowLeftSLine, RiArrowRightSLine, RiImageLine } from "react-icons/ri";
import type { CaseImage } from "@/lib/data";

export default function CaseGallery({
  images,
  title,
}: {
  images: CaseImage[];
  title: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const stripRef = useRef<HTMLUListElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => setMounted(true), []);

  // Track whether the strip can scroll further in each direction.
  const syncScroll = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    syncScroll();
    const el = stripRef.current;
    if (!el) return;
    const onResize = () => syncScroll();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [syncScroll]);

  const scrollStrip = useCallback((dir: number) => {
    const el = stripRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const close = useCallback(() => {
    const returnTo = open;
    setOpen(null);
    if (returnTo != null) triggerRefs.current[returnTo]?.focus();
  }, [open]);

  const step = useCallback(
    (dir: number) => setOpen((i) => (i == null ? i : (i + dir + images.length) % images.length)),
    [images.length]
  );

  // Keyboard control + scroll lock while the lightbox is open.
  useEffect(() => {
    if (open == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, step]);

  if (!images?.length) return null;

  const active = open == null ? null : images[open];

  return (
    <div className="case-gallery">
      <div className="case-gallery-head">
        <RiImageLine aria-hidden="true" />
        <span>Reference shots</span>
        <span className="case-gallery-count">{String(images.length).padStart(2, "0")}</span>
      </div>

      <div className="case-strip-wrap">
        {canLeft && (
          <button type="button" className="case-scroll-btn case-scroll-btn--prev" onClick={() => scrollStrip(-1)} aria-label="Scroll images left">
            <RiArrowLeftSLine aria-hidden="true" />
          </button>
        )}
        <ul className="case-strip" role="list" ref={stripRef} onScroll={syncScroll}>
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                className={`case-thumb case-thumb--${img.kind ?? "shot"}`}
                onClick={() => setOpen(i)}
                aria-label={`Open image ${i + 1} of ${images.length}: ${img.caption}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.caption} loading="lazy" decoding="async" onLoad={syncScroll} />
                <span className="case-thumb-cap">{img.caption}</span>
              </button>
            </li>
          ))}
        </ul>
        {canRight && (
          <button type="button" className="case-scroll-btn case-scroll-btn--next" onClick={() => scrollStrip(1)} aria-label="Scroll images right">
            <RiArrowRightSLine aria-hidden="true" />
          </button>
        )}
      </div>

      {mounted && active &&
        createPortal(
          <div
            className="case-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — reference image ${(open ?? 0) + 1} of ${images.length}`}
            onClick={close}
          >
            <div className="case-lightbox-inner" onClick={(e) => e.stopPropagation()}>
              <div className="case-lightbox-bar">
                <span className="case-lightbox-counter">
                  {String((open ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
                <button ref={closeRef} type="button" className="case-lightbox-btn" onClick={close} aria-label="Close">
                  <RiCloseLine aria-hidden="true" />
                </button>
              </div>

              <figure className="case-lightbox-figure">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.src} alt={active.caption} />
                <figcaption>{active.caption}</figcaption>
              </figure>

              {images.length > 1 && (
                <div className="case-lightbox-nav">
                  <button type="button" className="case-lightbox-btn" onClick={() => step(-1)} aria-label="Previous image">
                    <RiArrowLeftSLine aria-hidden="true" />
                  </button>
                  <button type="button" className="case-lightbox-btn" onClick={() => step(1)} aria-label="Next image">
                    <RiArrowRightSLine aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
