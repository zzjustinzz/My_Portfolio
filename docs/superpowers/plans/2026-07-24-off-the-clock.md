# Off the Clock Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an accessible, responsive “Off the Clock” portfolio section that presents basketball, sneaker, and EDM interests through manual tabs and an image lightbox.

**Architecture:** Keep content in `lib/data.ts`, render it through one client component, and mount that component between Experience and Contact. The component owns only local tab/lightbox state; all appearance stays in the existing token-driven global stylesheet and preserves the portfolio’s Cobalt/graphite system.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, `next/image`, Remix Icons via `react-icons`, CSS custom-property tokens, Node’s built-in test runner.

## Global Constraints

- Preserve all pre-existing dirty work, especially the case-gallery changes in `components/project-card.tsx`, `components/case-gallery.tsx`, `lib/data.ts`, `app/globals.css`, and `tokens.css`.
- Place `<OffTheClock />` after `<Experience />` and before `<Contact />`; section id is `off-the-clock`; do not add a nav link.
- Use exactly three hobbies and exactly three local images per hobby from `public/hobbies/`.
- Captions must identify the photography as illustrative and must not claim the photos are Thanh’s own.
- Default active hobby is basketball; tabs are manual and never auto-rotate.
- Arrow Left/Right moves and focuses the active tab without scrolling the page.
- Tab content changes with opacity only in no more than 220 ms; reduced motion remains at or below 150 ms.
- Thumbnails open a keyboard-operable modal lightbox with Escape, Previous, and Next controls.
- Every touch target is at least 44 × 44 CSS px and every control has a visible `:focus-visible` ring.
- Use only named tokens for colours, fonts, spacing, duration, easing, radius, and z-index.
- Verify no horizontal overflow at 320, 375, 414, and 768 CSS px.
- `node --test tests/off-the-clock.test.mjs` and `npm run build` must pass.

---

### Task 1: Hobby content contract

**Files:**
- Create: `tests/off-the-clock.test.mjs`
- Modify: `lib/data.ts`

**Interfaces:**
- Produces: `HobbyImage`, `Hobby`, and `hobbiesData: Hobby[]`.
- `Hobby` shape: `{ key: "basketball" | "sneakers" | "edm"; label: string; blurb: string; hero: HobbyImage; shots: [HobbyImage, HobbyImage] }`.
- `HobbyImage` shape: `{ src: string; caption: string; width: number; height: number }`.

- [ ] **Step 1: Write the failing data-contract test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("hobby data declares three complete, local, illustrative image sets", async () => {
  const source = await readFile(path.join(root, "lib/data.ts"), "utf8");
  assert.match(source, /export interface HobbyImage/);
  assert.match(source, /export interface Hobby/);
  assert.match(source, /export const hobbiesData: Hobby\[\]/);
  for (const key of ["basketball", "sneakers", "edm"]) {
    assert.match(source, new RegExp(`key: "${key}"`));
  }
  const imagePaths = [...source.matchAll(/src: "(\/hobbies\/[^"]+)"/g)].map((match) => match[1]);
  assert.equal(imagePaths.length, 9);
  assert.equal(new Set(imagePaths).size, 9);
  for (const imagePath of imagePaths) {
    await access(path.join(root, "public", imagePath));
  }
  assert.equal((source.match(/Illustrative photograph/g) ?? []).length, 9);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test tests/off-the-clock.test.mjs`

Expected: FAIL because `HobbyImage`, `Hobby`, and `hobbiesData` do not exist.

- [ ] **Step 3: Add the minimal typed data**

Add the exact interfaces above and three records to `lib/data.ts`. Use these hero assets: basketball `/hobbies/bball-1.jpg` (1400 × 1050), sneakers `/hobbies/sneaker-2.jpg` (1400 × 933), EDM `/hobbies/edm-2.jpg` (1400 × 933). Use the remaining two images in each named group as `shots`, with their measured dimensions. Prefix every image caption with `Illustrative photograph —`.

Use these blurbs verbatim:

```ts
"Weekend pickup games — where I reset and compete."
"Chasing grails and fresh drops; the collection keeps growing."
"Lineups and light shows across the EDM circuit."
```

- [ ] **Step 4: Run the test and verify GREEN**

Run: `node --test tests/off-the-clock.test.mjs`

Expected: 1 test passes, 0 fails.

### Task 2: Hallmark section, interaction, and integration

**Files:**
- Create: `components/off-the-clock.tsx`
- Modify: `tests/off-the-clock.test.mjs`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify only if a required named token is absent: `tokens.css`
- Modify: `.hallmark/log.json`

**Interfaces:**
- Consumes: `hobbiesData: Hobby[]` from `@/lib/data`.
- Produces: default export `OffTheClock(): JSX.Element`.

- [ ] **Step 1: Extend the acceptance test and verify RED**

Add a test that reads `components/off-the-clock.tsx` and `app/page.tsx`, then asserts:

```js
assert.match(component, /role="tablist"/);
assert.match(component, /role="tab"/);
assert.match(component, /aria-selected=/);
assert.match(component, /aria-controls=/);
assert.match(component, /ArrowRight/);
assert.match(component, /ArrowLeft/);
assert.match(component, /showModal\(\)/);
assert.match(component, /<dialog/);
assert.match(component, /aria-modal="true"/);
assert.match(component, /Escape/);
assert.match(page, /import OffTheClock from "@\/components\/off-the-clock"/);
assert.match(page, /<Experience \/>[\s\S]*<OffTheClock \/>[\s\S]*<Contact \/>/);
```

Run: `node --test tests/off-the-clock.test.mjs`

Expected: the integration test FAILS because the component does not exist.

- [ ] **Step 2: Implement the section**

Create a client component that:

- renders a stacked section header and a `role="tablist"` containing three one-line tab buttons;
- uses Remix icons, not emoji decoration, for basketball, sneakers, and music;
- uses roving `tabIndex`, `aria-selected`, `aria-controls`, and `focus({ preventScroll: true })`;
- sets basketball active initially and changes active content on click or Left/Right arrow;
- renders one large `next/image` hero and two supporting thumbnail buttons;
- supplies width/height and responsive `sizes` through the data contract;
- opens a native `<dialog>` lightbox with `showModal()`, closes on Escape/backdrop/close button, and navigates with Left/Right keys;
- returns focus to the thumbnail that opened the dialog;
- locks body scroll only while the modal is open and restores the previous value;
- uses no autoplay, no carousel timer, and no external motion package.

- [ ] **Step 3: Integrate and style with Hallmark discipline**

Import and render `<OffTheClock />` in `app/page.tsx` between Experience and Contact. Append section styles to `app/globals.css`; preserve all existing rules and directives. Requirements:

- graphite band declares both dark background and light text;
- base/mobile layout is one column; at `min-width: 60rem`, use an asymmetric `minmax(0, 1.45fr) minmax(14rem, 0.55fr)` stage;
- tab row may wrap as a container, but every tab label remains `white-space: nowrap`;
- all image grid tracks use `minmax(0, 1fr)`;
- hero uses a stable `aspect-ratio`, `object-fit: cover`, and no lazy-LCP exception because the section is below the fold;
- content transition animates opacity only with `var(--dur-short)` / `var(--ease-out)`;
- hover rules live under `@media (hover: hover) and (pointer: fine)`;
- active press uses at most `translateY(1px)`;
- focus rings are immediate and use `var(--color-graphite-accent)`;
- reduced motion disables spatial hover and keeps opacity changes at 150 ms;
- no raw colour or font values appear in the new section rules.

Prepend these two comments immediately above the new CSS block:

```css
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
/* Hallmark · component: off-the-clock section · genre: playful · theme: Cobalt
 * states: tabs + lightbox · motion: opacity crossfade · contrast: pass
 */
```

- [ ] **Step 4: Update Hallmark memory**

Prepend this entry to `.hallmark/log.json` while preserving all existing entries:

```json
{
  "date": "2026-07-24",
  "macrostructure": "Feature Stack — embedded section",
  "theme": "Cobalt",
  "enrichment": "verified local hobby photography",
  "nav": "unchanged N13",
  "footer": "unchanged Ft5",
  "brief": "Off the Clock interactive hobbies section"
}
```

- [ ] **Step 5: Verify automated acceptance**

Run: `node --test tests/off-the-clock.test.mjs`

Expected: 2 tests pass, 0 fail.

Run: `npm run build`

Expected: Next.js production build exits 0 with lint and type checking successful.

- [ ] **Step 6: Verify in a real browser**

Start the app with `npm run dev`, then inspect 320, 375, 414, 768, and 1440 px widths. Confirm:

- no horizontal overflow;
- tabs remain one-line and activate by click and Left/Right;
- hero/caption/thumbnails update for all three hobbies;
- lightbox opens, closes, restores focus, and navigates;
- dark and light site themes retain readable contrast;
- reduced-motion mode removes spatial movement.
