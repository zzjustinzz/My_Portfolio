# CV Download CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let recruiters download Thanh's supplied CV from the hero and a persistent Navi resource row using one stable static asset.

**Architecture:** Keep the existing single-page structure and native browser download behavior. Both client components use semantic same-origin anchors pointing to `/Resume.pdf`; the hero owns the primary CTA hierarchy, while the chatbot owns a compact always-visible resource row. A source-level Node test protects the exact PDF hash, link semantics, placement, copy, and responsive CSS without adding a test framework.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Node's built-in test runner, CSS custom properties, `react-icons`.

## Global Constraints

- Primary audience: recruiters and hiring managers.
- Tone: technical, direct, and restrained.
- Preserve the existing Feature Stack macrostructure, Hallmark Cobalt theme, Geist fonts, OKLCH tokens, light/dark modes, 4-point spacing scale, and reduced-motion behavior.
- Keep the hero to two primary actions: `Download CV`, then `View product work`.
- Use `/Resume.pdf` for both links and `Thanh_Tran_Senior_Product_Owner_Product_Manager_CV.pdf` as the download filename.
- Add no route, modal, API request, toast, analytics event, or dependency.
- Keep visible clickable labels on one line with no horizontal overflow at 320, 375, 414, and 768 px.
- Do not fabricate browser download loading, success, or error states.
- Do not delete production files or restructure unrelated components.

## File Structure

- Create `tests/cv-download.test.mjs`: protects the exact supplied asset and both UI entry points with Node's built-in test runner.
- Modify `public/Resume.pdf`: stable public asset replaced by the supplied two-page CV.
- Modify `components/hero.tsx`: primary CV CTA, secondary project CTA, compact email contact link.
- Modify `components/chatbot.tsx`: persistent CV resource row between the header and messages.
- Modify `app/globals.css`: chatbot resource-row interaction and responsive rules, using existing tokens only.
- Create `.hallmark/preflight.json`: ignored local Hallmark cache recording the already-observed system; it is not committed.

---

### Task 1: Protect and replace the canonical CV asset

**Files:**
- Create: `tests/cv-download.test.mjs`
- Modify: `public/Resume.pdf`
- Create locally, ignored: `.hallmark/preflight.json`

**Interfaces:**
- Consumes: the user-supplied PDF at `/Users/dangnguyen/Documents/Tài liệu (no working)/Thanh_Tran_Senior_Product_Owner_Product_Manager_CV.pdf`.
- Produces: `/Resume.pdf`, whose SHA-256 is `38c2da503836d8f0c11d6bd49f184f7ac60a2e2654572cc6aed4fabab713efac`.

- [ ] **Step 1: Record the Hallmark pre-flight cache**

Create `.hallmark/preflight.json` with:

```json
{
  "date": "2026-07-29",
  "framework": "Next.js 14 App Router",
  "fonts": ["Geist", "Geist Mono"],
  "palette": "Hallmark Cobalt, OKLCH tokens",
  "motion": "framer-motion 12 installed; reduced motion configured",
  "spacing": "4-point semantic CSS token scale",
  "preserve": ["font stack", "palette", "spacing scale", "Feature Stack macrostructure"]
}
```

Confirm `.hallmark/` remains ignored:

```bash
git check-ignore .hallmark/preflight.json
```

Expected: `.hallmark/preflight.json`.

- [ ] **Step 2: Write the failing asset test**

Create `tests/cv-download.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const expectedCvHash = "38c2da503836d8f0c11d6bd49f184f7ac60a2e2654572cc6aed4fabab713efac";
const downloadName = "Thanh_Tran_Senior_Product_Owner_Product_Manager_CV.pdf";

test("public Resume.pdf is the supplied two-page CV", async () => {
  const pdf = await readFile(path.join(root, "public", "Resume.pdf"));
  assert.equal(pdf.subarray(0, 5).toString("ascii"), "%PDF-");
  assert.equal(createHash("sha256").update(pdf).digest("hex"), expectedCvHash);
});
```

- [ ] **Step 3: Run the focused test and verify RED**

Run:

```bash
node --test tests/cv-download.test.mjs
```

Expected: FAIL because the current public PDF hash is `de60b0e7e70726abae62b2bf94b3289d20d99585ed5f205c98a3ee28083eaa16`, not the supplied CV hash.

- [ ] **Step 4: Replace the stale public PDF**

Run:

```bash
cp "/Users/dangnguyen/Documents/Tài liệu (no working)/Thanh_Tran_Senior_Product_Owner_Product_Manager_CV.pdf" public/Resume.pdf
```

Then verify the source and destination:

```bash
shasum -a 256 \
  "/Users/dangnguyen/Documents/Tài liệu (no working)/Thanh_Tran_Senior_Product_Owner_Product_Manager_CV.pdf" \
  public/Resume.pdf
file public/Resume.pdf
```

Expected: both hashes equal `38c2da503836d8f0c11d6bd49f184f7ac60a2e2654572cc6aed4fabab713efac`; `file` reports a two-page PDF.

- [ ] **Step 5: Run the focused test and verify GREEN**

Run:

```bash
node --test tests/cv-download.test.mjs
```

Expected: 1 test passes, 0 fail.

- [ ] **Step 6: Commit the asset contract**

```bash
git add tests/cv-download.test.mjs public/Resume.pdf
git commit -m "feat: update portfolio CV asset"
```

### Task 2: Promote CV download in the hero

**Files:**
- Modify: `tests/cv-download.test.mjs`
- Modify: `components/hero.tsx:3-37`

**Interfaces:**
- Consumes: the stable `/Resume.pdf` asset from Task 1 and the existing `.btn` variants.
- Produces: `#cta-download-cv` as the primary download anchor; retains `#cta-view-projects` as the secondary smooth-scroll anchor.

- [ ] **Step 1: Append the failing hero behavior test**

Append to `tests/cv-download.test.mjs`:

```js
test("hero promotes the CV download and keeps contact paths compact", async () => {
  const hero = await readFile(path.join(root, "components", "hero.tsx"), "utf8");

  const downloadLink = hero.match(/<a\s+id="cta-download-cv"[\s\S]*?<\/a>/)?.[0];
  assert.ok(downloadLink, "hero CV link should be present");
  assert.match(downloadLink, /className="btn btn--primary"/);
  assert.match(downloadLink, /href="\/Resume\.pdf"/);
  assert.match(downloadLink, new RegExp(`download="${downloadName.replaceAll(".", "\\.")}"`));
  assert.match(downloadLink, /RiDownloadLine/);
  assert.match(downloadLink, /Download CV/);

  const projectsLink = hero.match(/<a id="cta-view-projects"[\s\S]*?<\/a>/)?.[0];
  assert.ok(projectsLink, "project CTA should remain present");
  assert.match(projectsLink, /className="btn btn--secondary"/);
  assert.match(projectsLink, /onClick=\{scrollToProjects\}/);

  const heroNote = hero.match(/<div className="hero-note">[\s\S]*?<\/div>/)?.[0];
  assert.ok(heroNote, "hero note should remain present");
  assert.match(heroNote, /mailto:thanhtdfu@gmail\.com/);
  assert.match(heroNote, /LinkedIn profile/);
  assert.doesNotMatch(hero, /id="cta-contact"/);
});
```

- [ ] **Step 2: Run the hero test and verify RED**

Run:

```bash
node --test --test-name-pattern="hero promotes" tests/cv-download.test.mjs
```

Expected: FAIL with `hero CV link should be present`.

- [ ] **Step 3: Implement the minimal hero hierarchy**

In `components/hero.tsx`, add `RiDownloadLine` to the existing `react-icons/ri` import.

Replace the hero action and note markup with:

```tsx
<div className="hero-actions">
  <a
    id="cta-download-cv"
    className="btn btn--primary"
    href="/Resume.pdf"
    download="Thanh_Tran_Senior_Product_Owner_Product_Manager_CV.pdf"
  >
    <RiDownloadLine aria-hidden="true" /> Download CV
  </a>
  <a id="cta-view-projects" className="btn btn--secondary" href="#projects" onClick={scrollToProjects}>
    View product work <RiArrowRightLine aria-hidden="true" />
  </a>
</div>
<div className="hero-note">
  <span>Engineering-to-product career</span>
  <a href="mailto:thanhtdfu@gmail.com">
    <RiMailLine aria-hidden="true" /> Email Thanh
  </a>
  <a href="https://www.linkedin.com/in/thanh-tr%E1%BA%A7n-5815a0112/" target="_blank" rel="noopener noreferrer">
    <RiLinkedinBoxFill aria-hidden="true" /> LinkedIn profile
  </a>
</div>
```

Do not change `scrollToProjects`, the hero copy, system map, or other sections.

- [ ] **Step 4: Run the focused and cumulative tests**

Run:

```bash
node --test --test-name-pattern="hero promotes" tests/cv-download.test.mjs
node --test tests/cv-download.test.mjs
```

Expected: focused hero test passes; cumulative file reports 2 passing tests.

- [ ] **Step 5: Commit the hero CTA**

```bash
git add tests/cv-download.test.mjs components/hero.tsx
git commit -m "feat: add CV download to hero"
```

### Task 3: Add the persistent Navi CV resource row

**Files:**
- Modify: `tests/cv-download.test.mjs`
- Modify: `components/chatbot.tsx:5-145`
- Modify: `app/globals.css:261-304,323-351,411-416`

**Interfaces:**
- Consumes: `/Resume.pdf`, the same descriptive download filename, existing Cobalt tokens, and the existing chatbot flex column.
- Produces: `.chat-resource` between `.chat-head` and `.chat-messages`, visible at every required width.

- [ ] **Step 1: Append the failing chatbot and CSS test**

Append to `tests/cv-download.test.mjs`:

```js
test("Navi exposes the same CV as a persistent responsive resource", async () => {
  const chatbot = await readFile(path.join(root, "components", "chatbot.tsx"), "utf8");
  const styles = await readFile(path.join(root, "app", "globals.css"), "utf8");

  const resource = chatbot.match(/<a\s+className="chat-resource"[\s\S]*?<\/a>/)?.[0];
  assert.ok(resource, "chatbot CV resource should be present");
  assert.match(resource, /href="\/Resume\.pdf"/);
  assert.match(resource, new RegExp(`download="${downloadName.replaceAll(".", "\\.")}"`));
  assert.match(resource, /RiDownloadLine/);
  assert.match(resource, /Download Thanh&apos;s CV/);
  assert.match(resource, /PDF · 2 pages/);
  assert.ok(
    chatbot.indexOf('className="chat-resource"') < chatbot.indexOf('className="chat-messages"'),
    "resource row should appear before messages",
  );

  assert.match(styles, /\.chat-resource\s*\{[^}]*display:\s*flex/);
  assert.match(styles, /\.chat-resource\s*\{[^}]*white-space:\s*nowrap/);
  assert.match(styles, /\.chat-resource-label\s*\{[^}]*min-width:\s*0/);
  assert.match(styles, /\.chat-resource-meta\s*\{[^}]*flex:\s*0\s+0\s+auto/);
  assert.match(styles, /\.chat-resource:active\s*\{[^}]*transform:\s*translateY\(1px\)/);
  assert.match(styles, /@media \(hover: hover\)[\s\S]*\.chat-resource:hover/);
  assert.match(styles, /@media \(max-width: 39\.99rem\)[\s\S]*\.chat-resource/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.chat-resource:active\s*\{[^}]*transform:\s*none/);
});
```

- [ ] **Step 2: Run the chatbot test and verify RED**

Run:

```bash
node --test --test-name-pattern="Navi exposes" tests/cv-download.test.mjs
```

Expected: FAIL with `chatbot CV resource should be present`.

- [ ] **Step 3: Add the resource-row markup**

In `components/chatbot.tsx`, add `RiDownloadLine` to the existing `react-icons/ri` import.

Immediately after `</header>` for `.chat-head` and before `.chat-messages`, insert:

```tsx
<a
  className="chat-resource"
  href="/Resume.pdf"
  download="Thanh_Tran_Senior_Product_Owner_Product_Manager_CV.pdf"
>
  <span className="chat-resource-label">
    <RiDownloadLine aria-hidden="true" />
    <span>Download Thanh&apos;s CV</span>
  </span>
  <span className="chat-resource-meta">PDF · 2 pages</span>
</a>
```

Do not change chatbot state, API calls, suggestion behavior, message rendering, or footer links.

- [ ] **Step 4: Add token-only resource styles**

Add beside the existing chatbot styles in `app/globals.css`:

```css
.chat-resource { min-height: 48px; display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); padding: var(--space-sm) var(--space-md); border-bottom: 1px solid var(--color-rule); background: var(--color-paper-2); color: var(--color-ink); white-space: nowrap; transition: background-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out), transform var(--dur-micro) var(--ease-out); }
.chat-resource-label { min-width: 0; display: inline-flex; align-items: center; gap: var(--space-xs); font-weight: 650; }
.chat-resource-label svg { flex: 0 0 auto; color: var(--color-accent); }
.chat-resource-meta { flex: 0 0 auto; color: var(--color-muted); font-family: var(--font-mono); font-size: var(--text-xs); }
.chat-resource:active { transform: translateY(1px); }
```

Inside the existing fine-pointer hover media query, add:

```css
.chat-resource:hover { background: var(--color-accent-soft); color: var(--color-accent-strong); }
```

Inside the existing `@media (max-width: 39.99rem)` block, add:

```css
.chat-resource { gap: var(--space-sm); }
```

Inside the existing `@media (prefers-reduced-motion: reduce)` block, add:

```css
.chat-resource:active { transform: none; }
```

Do not add raw colors, font families, easing values, durations, spacing values, or radii outside `tokens.css`.

- [ ] **Step 5: Run the focused and cumulative tests**

Run:

```bash
node --test --test-name-pattern="Navi exposes" tests/cv-download.test.mjs
node --test tests/cv-download.test.mjs
node --test tests/*.test.mjs
```

Expected: chatbot test passes; CV file reports 3 passing tests; the full Node suite reports no failures.

- [ ] **Step 6: Commit the Navi resource**

```bash
git add tests/cv-download.test.mjs components/chatbot.tsx app/globals.css
git commit -m "feat: add CV resource to Navi"
```

### Task 4: Run Hallmark and release verification

**Files:**
- Inspect: `components/hero.tsx`
- Inspect: `components/chatbot.tsx`
- Inspect: `app/globals.css`
- Inspect: `public/Resume.pdf`
- Inspect: `tests/cv-download.test.mjs`

**Interfaces:**
- Consumes: the complete feature from Tasks 1-3.
- Produces: fresh evidence for automated correctness, build integrity, responsive behavior, download delivery, and Hallmark handoff.

- [ ] **Step 1: Run static and automated verification**

Run:

```bash
node --test tests/*.test.mjs
npx tsc --noEmit
npm run lint
npm run build
git diff --check
```

Expected: all tests pass; TypeScript exits 0; lint reports no errors; production build exits 0; diff check has no output.

- [ ] **Step 2: Start the production server**

Run:

```bash
npm run start -- --hostname 127.0.0.1 --port 3001
```

Keep the process running for browser checks.

- [ ] **Step 3: Verify static PDF delivery**

Run:

```bash
curl --fail --silent --show-error --head http://127.0.0.1:3001/Resume.pdf
curl --fail --silent http://127.0.0.1:3001/Resume.pdf | shasum -a 256
```

Expected: HTTP 200 with PDF content; downloaded hash equals `38c2da503836d8f0c11d6bd49f184f7ac60a2e2654572cc6aed4fabab713efac`.

- [ ] **Step 4: Verify hero and Navi at Hallmark widths**

For each viewport width `320`, `375`, `414`, and `768` with a height of at least `900`:

1. Open `http://127.0.0.1:3001/`.
2. Assert `document.documentElement.scrollWidth <= window.innerWidth`.
3. Assert `#cta-download-cv` is visible, has `href` ending in `/Resume.pdf`, has the descriptive `download` value, and its text stays on one line.
4. Assert `#cta-view-projects` remains visible and secondary.
5. Open `#chatbot-toggle`.
6. Assert `.chat-resource` is visible before `.chat-messages`, its text stays on one line, and its right edge does not exceed `.chat-window`.
7. Tab to both download links and confirm the visible focus ring appears instantly.
8. Repeat once with the `.dark` class active.

Capture screenshots at all four widths if any assertion fails; fix the implementation and repeat the full width matrix.

- [ ] **Step 5: Run the Hallmark handoff gates**

Load `.agents/skills/hallmark/references/slop-test.md` now, after the build, and run the universal gates relevant to this focused enhancement. Confirm:

- no invented claims or metrics;
- no new raw colors or font declarations;
- no fake loading/success/error download UI;
- no icon-only download control;
- no two-line CTA text;
- no horizontal overflow at the four required widths;
- no animated focus ring;
- no unnecessary motion;
- Philosophy, Hierarchy, Execution, Specificity, Restraint, and Variety each score at least 3/5.

If any gate fails, repair the relevant task and repeat Steps 1-5.

- [ ] **Step 6: Inspect repository state**

Run:

```bash
git status --short
git log -4 --oneline
git show --stat --oneline HEAD
```

Expected: no uncommitted production or test changes; the implementation commits are visible after the design-spec commit.
