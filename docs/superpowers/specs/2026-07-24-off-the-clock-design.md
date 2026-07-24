# Off the Clock — interactive hobbies section

**Date:** 2026-07-24
**Status:** Approved (design)

## Purpose

A creative personal section for the portfolio: "If I'm not at my desk, you'll find me…" —
showing three hobbies (basketball, sneakers, EDM festivals) through an interactive toggle.
Adds human personality between the professional Experience section and the Contact CTA.

## Placement

`app/page.tsx`: between `<Experience/>` and `<Contact/>`. Section id `#off-the-clock`.
No nav link added (nav already has 6 items) — optional future add.

## Concept

Interactive "Where to find me" toggle:
- Three pills/tabs: **On the court** 🏀 · **Chasing sneakers** 👟 · **Front row at a festival** 🎧
- Selecting a pill swaps a large hero image + one-line caption for that hobby, plus a small
  cluster of 2 supporting thumbnails (click → existing lightbox pattern from CaseGallery, or a
  local lightbox). Default active = basketball.

## Components & data

- New client component `components/off-the-clock.tsx`.
- Data in `lib/data.ts`: `hobbiesData: Hobby[]` where
  `Hobby = { key, label, icon?, blurb, hero: {src, caption}, shots: {src, caption}[] }`.
- Reuse tokens + gallery visual language already in the project (graphite band, Cobalt accent).

## Layout

- Graphite (dark) band — cinematic, makes images pop; creates rhythm between light Experience
  and Contact. Cobalt accent marks the active pill.
- Section header: heading "If I'm not at my desk, you'll find me…" (English, matches site).
- Pills row (radio-tab pattern) → stage: hero image (with caption overlay) + blurb + 2 thumbs.

## Interaction (Hallmark discipline)

- Radio-tab: click pill → content crossfade, opacity only, ≤220ms, `prefers-reduced-motion` aware.
- Keyboard: pills are buttons; arrow ←/→ move between them; `:focus-visible` ring.
- Hover + active states on pills and thumbnails. No auto-rotate.
- Thumbnails open a lightbox (reuse the pattern already built for case images).

## Images

- 3 images per hobby (1 hero + 2 supporting) = 9 total, free-license (Unsplash/Pexels).
- Downloaded to `/public/hobbies/`, each viewed before use to confirm subject + quality.
- Captions are honest ("illustrative", not claimed as the user's own photos).

## Copy (editable)

- 🏀 "Weekend pickup games — where I reset and compete."
- 👟 "Chasing grails and fresh drops; the collection keeps growing."
- 🎧 "Lineups and light shows across the EDM circuit."

## Out of scope

- No nav link, no routing (single-page section).
- No auto-rotation, no external motion library beyond existing framer-motion (CSS transitions suffice).

## Success criteria

- Renders after Experience, before Contact; toggling pills swaps hero + caption + thumbs.
- Keyboard + reduced-motion accessible; no horizontal overflow at 320/375/414/768px.
- All images real, on-topic, verified; typecheck + lint + build clean.
