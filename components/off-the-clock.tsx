"use client";

import Image from "next/image";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiBasketballLine,
  RiCloseLine,
  RiFootprintLine,
  RiMusic2Line,
} from "react-icons/ri";
import {
  type KeyboardEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { hobbiesData } from "@/lib/data";

const hobbyIcons = {
  basketball: RiBasketballLine,
  sneakers: RiFootprintLine,
  edm: RiMusic2Line,
};

export default function OffTheClock(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const previousBodyOverflowRef = useRef<string | null>(null);

  const activeHobby = hobbiesData[activeIndex];
  const activeImages = [activeHobby.hero, ...activeHobby.shots];
  const lightboxImage = activeImages[lightboxIndex ?? 0];

  const restoreBodyScroll = useCallback(() => {
    if (previousBodyOverflowRef.current === null) return;
    document.body.style.overflow = previousBodyOverflowRef.current;
    previousBodyOverflowRef.current = null;
  }, []);

  const closeDialog = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
  }, []);

  const handleDialogClosed = useCallback(() => {
    restoreBodyScroll();
    setLightboxIndex(null);
    const opener = openerRef.current;
    openerRef.current = null;
    requestAnimationFrame(() => opener?.focus({ preventScroll: true }));
  }, [restoreBodyScroll]);

  const openDialog = (imageIndex: number, opener: HTMLButtonElement) => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    setLightboxIndex(imageIndex);
    openerRef.current = opener;
    previousBodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    requestAnimationFrame(() => previousButtonRef.current?.focus({ preventScroll: true }));
  };

  const stepLightbox = useCallback((direction: -1 | 1) => {
    setLightboxIndex((current) => {
      const nextIndex = (current ?? 0) + direction;
      return (nextIndex + activeImages.length) % activeImages.length;
    });
  }, [activeImages.length]);

  const handleTabKeyDown = (index: number, event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + hobbiesData.length) % hobbiesData.length;
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus({ preventScroll: true });
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeDialog();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      stepLightbox(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepLightbox(-1);
    }
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) closeDialog();
  };

  useEffect(() => restoreBodyScroll, [restoreBodyScroll]);

  return (
    <section id="off-the-clock" className="off-clock-section" aria-labelledby="off-clock-heading">
      <div className="off-clock-shell page-shell">
        <header className="off-clock-header">
          <h2 id="off-clock-heading" className="off-clock-title">
            If I&apos;m not at my desk, you&apos;ll find me…
          </h2>
          <p className="off-clock-lede">
            Pickup runs, fresh pairs, and festival nights — three ways I reset between product releases.
          </p>
        </header>

        <div className="off-clock-tabs" role="tablist" aria-label="Choose a hobby">
          {hobbiesData.map((hobby, index) => {
            const Icon = hobbyIcons[hobby.key];
            const isActive = index === activeIndex;

            return (
              <button
                key={hobby.key}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`off-clock-tab-${hobby.key}`}
                className="off-clock-tab"
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`off-clock-panel-${hobby.key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleTabKeyDown(index, event)}
              >
                <Icon aria-hidden="true" />
                <span>{hobby.label}</span>
              </button>
            );
          })}
        </div>

        <div
          id={`off-clock-panel-${activeHobby.key}`}
          className="off-clock-panel"
          role="tabpanel"
          aria-labelledby={`off-clock-tab-${activeHobby.key}`}
          tabIndex={0}
        >
          <div className="off-clock-stage" key={activeHobby.key}>
            <figure className="off-clock-hero">
              <div className="off-clock-hero-media">
                <Image
                  src={activeHobby.hero.src}
                  alt={activeHobby.hero.caption}
                  width={activeHobby.hero.width}
                  height={activeHobby.hero.height}
                  sizes="(min-width: 60rem) 64vw, 100vw"
                />
              </div>
              <figcaption>
                <strong>{activeHobby.label}</strong>
                <span>{activeHobby.blurb}</span>
              </figcaption>
            </figure>

            <div className="off-clock-support" aria-label={`${activeHobby.label} gallery`}>
              {activeHobby.shots.map((image, index) => (
                <button
                  className="off-clock-thumb"
                  type="button"
                  key={image.src}
                  aria-label={`Open ${image.caption} in the lightbox`}
                  onClick={(event) => openDialog(index + 1, event.currentTarget)}
                >
                  <span className="off-clock-thumb-media">
                    <Image
                      src={image.src}
                      alt=""
                      width={image.width}
                      height={image.height}
                      sizes="(min-width: 60rem) 22vw, 50vw"
                    />
                  </span>
                  <span className="off-clock-thumb-caption">{image.caption}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="off-clock-dialog"
        aria-modal="true"
        aria-labelledby="off-clock-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClose={handleDialogClosed}
        onClick={handleBackdropClick}
        onKeyDown={handleDialogKeyDown}
      >
        <div className="off-clock-dialog-inner">
          <div className="off-clock-dialog-bar">
            <p id="off-clock-dialog-title">
              {activeHobby.label}
              <span>
                {String((lightboxIndex ?? 0) + 1).padStart(2, "0")} / {String(activeImages.length).padStart(2, "0")}
              </span>
            </p>
            <button className="off-clock-dialog-button" type="button" onClick={closeDialog} aria-label="Close lightbox">
              <RiCloseLine aria-hidden="true" />
            </button>
          </div>

          <figure className="off-clock-dialog-figure">
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.caption}
              width={lightboxImage.width}
              height={lightboxImage.height}
              sizes="(min-width: 60rem) 72vw, 100vw"
            />
            <figcaption>{lightboxImage.caption}</figcaption>
          </figure>

          <div className="off-clock-dialog-nav" aria-label="Lightbox navigation">
            <button
              ref={previousButtonRef}
              className="off-clock-dialog-button"
              type="button"
              onClick={() => stepLightbox(-1)}
              aria-label="Previous image"
            >
              <RiArrowLeftSLine aria-hidden="true" />
            </button>
            <button
              className="off-clock-dialog-button"
              type="button"
              onClick={() => stepLightbox(1)}
              aria-label="Next image"
            >
              <RiArrowRightSLine aria-hidden="true" />
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
