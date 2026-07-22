# Life Journal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete `/life` editorial journal with Sneakers, Basketball, and EDM archives, local MDX notes, and a checked-in curated external reading feed.

**Architecture:** The App Router renders static Life routes from two normalized sources: trusted local MDX files and a generated external-article JSON snapshot. A manual allowlisted sync command extracts only publisher metadata; production builds never fetch publisher sites. Existing root Header and Footer become route-aware so the current portfolio stays unchanged outside `/life`.

**Tech Stack:** Next.js 14.2.35 App Router, React 18, TypeScript, local Geist fonts, Framer Motion 12, CSS tokens, `next-mdx-remote/rsc`, Cheerio, Vitest, Node 20+ built-in `fetch`.

**Design spec:** `docs/superpowers/specs/2026-07-22-life-journal-design.md`

## Global Constraints

- Valid topics are exactly `sneakers`, `basketball`, and `edm`.
- Interface copy is English; external titles and descriptions retain source language.
- Do not invent first-person copy, original-post titles, opinions, metrics, summaries, testimonials, or publisher content.
- External entries store link-preview metadata only; never store or render article bodies.
- A production build must not make publisher network requests.
- Existing portfolio layout, section scrolling, Header, Footer, Cobalt theme, and dark-mode behavior remain intact outside `/life`.
- Hallmark direction is Editorial · Ecosystem Index · Almanac · N6 masthead · Ft4 colophon.
- Preserve Geist and Geist Mono; all colors and font declarations use named tokens.
- Motion is limited to focus, underline, press, and image-state feedback; no scroll reveal, parallax, carousel, or infinite decoration.
- Support light/dark mode, `prefers-reduced-motion`, keyboard navigation, and 44×44 px touch targets.
- Verify widths 320, 375, 414, 768, and 1440 CSS px; no horizontal scroll or wrapped clickable labels.
- Keep `.superpowers/` out of Git; do not delete the existing visual-companion workspace.

## File Structure

### Create

- `vitest.config.ts` — Vitest alias and Node test environment.
- `lib/life/types.ts` — shared topic and entry contracts.
- `lib/life/topics.ts` — canonical topic registry.
- `lib/life/navigation.ts` — pure route predicates used by Header, Footer, and tests.
- `lib/life/content.ts` — MDX and external snapshot loading, validation, sorting, selectors.
- `content/life/README.md` — exact authoring contract for future original posts.
- `content/life/external-sources.json` — explicit curated URL manifest.
- `content/life/external-articles.json` — checked-in generated snapshot.
- `scripts/life/metadata.mjs` — pure metadata extraction and normalization.
- `scripts/life/snapshot.mjs` — deterministic snapshot merge and validation.
- `scripts/life/sync-life-content.mjs` — network orchestration and atomic writer.
- `components/life/life-masthead.tsx` — N6 route masthead.
- `components/life/life-intro.tsx` — factual positioning line and optional supplied copy.
- `components/life/topic-index.tsx` — three topic entry surfaces.
- `components/life/article-card.tsx` — internal/external article semantics.
- `components/life/article-rail.tsx` — titled discovery rail.
- `components/life/life-image.tsx` — publisher image with topic-art fallback.
- `components/life/life-colophon.tsx` — Ft4 source disclosure.
- `app/life/life.css` — Hallmark-stamped Life route styles.
- `app/life/layout.tsx` — Life CSS import and scoped page wrapper.
- `app/life/page.tsx` — landing page.
- `app/life/[topic]/page.tsx` — topic archive.
- `app/life/[topic]/[slug]/page.tsx` — original MDX note page.
- `tests/life/contracts.test.ts` — topic and route contract tests.
- `tests/life/metadata.test.ts` — metadata extractor tests.
- `tests/life/snapshot.test.ts` — sync merge/failure tests.
- `tests/life/content.test.ts` — MDX/snapshot loader tests.
- `tests/life/components.test.tsx` — semantic rendering tests.
- `tests/fixtures/life/article.html` — complete Open Graph fixture.
- `tests/fixtures/life/article-minimal.html` — missing optional metadata fixture.
- `tests/fixtures/life/sneakers/sample-note.mdx` — test-only original note.
- `tests/fixtures/life/edm/draft.mdx` — test-only unpublished note.

### Modify

- `.gitignore` — ignore `/.superpowers/`.
- `package.json` and `package-lock.json` — dependencies and Life scripts.
- `tokens.css` — scoped Almanac light/dark tokens.
- `lib/data.ts` — typed section/route navigation entry for Life.
- `components/header.tsx` — route-aware Life masthead and route-safe navigation.
- `components/footer.tsx` — route-aware Life colophon.
- `app/sitemap.ts` — homepage, Life archives, and original-post URLs.

### No deletions

This plan deletes no production, documentation, or tooling file.

## Pre-execution Gate

Before Task 1 changes production files, the executor must re-read the Hallmark skill, confirm the create/modify/no-deletion lists above against the working tree, and publish this preview in commentary:

- Macrostructure: Ecosystem Index.
- Theme: Almanac editorial.
- Enrichment: source thumbnails only where publisher metadata provides them; topic fallback art otherwise.
- Sections: Life masthead, personal index, topic gateways, featured/latest/topic rails, note detail, and colophon.
- Motion: underline, focus, press, and image-error feedback only.
- Responsive: native details masthead below 60rem; single-column topic cards and stacked row metadata below 40rem.
- Slop test: pending until the complete page exists; run all 58 gates in Task 9 before claiming a score.
- Diversification: N6 newspaper masthead and Ft4 dense typographic footer replace the portfolio chrome only on `/life` routes.

If the current repository conflicts with this map, stop and revise the plan before editing production code.

---

### Task 1: Install the test/content toolchain and lock Life contracts

**Files:**
- Modify: `.gitignore`
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `lib/life/types.ts`
- Create: `lib/life/topics.ts`
- Create: `lib/life/navigation.ts`
- Create: `tests/life/contracts.test.ts`

**Interfaces:**
- Produces: `LifeTopic`, `LifeEntry`, `LifeNoteSummary`, `LifeExternalEntry`, `LIFE_TOPICS`, `isLifeTopic(value)`, and `isLifePath(pathname)`.
- Consumed by: every later content, component, route, and navigation task.

- [ ] **Step 1: Install only the required dependencies**

Run:

```bash
npm install cheerio next-mdx-remote
npm install --save-dev vitest
```

Expected: `package.json` and `package-lock.json` update; npm exits 0.

- [ ] **Step 2: Add scripts, Vitest config, and local-tool ignore**

Add these scripts without changing existing scripts:

```json
{
  "test:life": "vitest run tests/life",
  "life:sync": "node scripts/life/sync-life-content.mjs"
}
```

Create `vitest.config.ts`:

```ts
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["tests/life/**/*.test.{ts,tsx}"],
  },
});
```

Append to `.gitignore`:

```gitignore
/.superpowers/
```

- [ ] **Step 3: Write the failing contract tests**

Create `tests/life/contracts.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { isLifePath } from "@/lib/life/navigation";
import { LIFE_TOPICS, isLifeTopic } from "@/lib/life/topics";

describe("Life contracts", () => {
  it("accepts exactly the three supported topics", () => {
    expect(LIFE_TOPICS.map((topic) => topic.slug)).toEqual([
      "sneakers",
      "basketball",
      "edm",
    ]);
    expect(isLifeTopic("sneakers")).toBe(true);
    expect(isLifeTopic("music")).toBe(false);
  });

  it("recognizes Life routes without matching unrelated paths", () => {
    expect(isLifePath("/life")).toBe(true);
    expect(isLifePath("/life/edm/article")).toBe(true);
    expect(isLifePath("/lifestyle")).toBe(false);
    expect(isLifePath("/")).toBe(false);
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run:

```bash
npm run test:life
```

Expected: FAIL because `@/lib/life/navigation` and `@/lib/life/topics` do not exist.

- [ ] **Step 5: Implement the contracts**

Create `lib/life/types.ts`:

```ts
export type LifeTopic = "sneakers" | "basketball" | "edm";
export type LifeLanguage = "en" | "vi";

export interface LifeBaseEntry {
  id: string;
  kind: "note" | "external";
  topic: LifeTopic;
  title: string;
  publishedAt: string;
  imageUrl?: string;
  imageAlt?: string;
  featured?: boolean;
}

export interface LifeNoteSummary extends LifeBaseEntry {
  kind: "note";
  slug: string;
  excerpt?: string;
  language: LifeLanguage;
}

export interface LifeExternalEntry extends LifeBaseEntry {
  kind: "external";
  source: string;
  canonicalUrl: string;
  sourceDescription?: string;
  language: LifeLanguage;
  fetchedAt: string;
}

export type LifeEntry = LifeNoteSummary | LifeExternalEntry;

export interface LifeNoteFrontmatter {
  title: string;
  topic: LifeTopic;
  publishedAt: string;
  language: LifeLanguage;
  excerpt?: string;
  imageUrl?: string;
  imageAlt?: string;
  featured?: boolean;
  published?: boolean;
}
```

Create `lib/life/topics.ts`:

```ts
import type { LifeTopic } from "./types";

export const LIFE_TOPICS = [
  { slug: "sneakers", label: "Sneakers" },
  { slug: "basketball", label: "Basketball" },
  { slug: "edm", label: "EDM Music" },
] as const satisfies ReadonlyArray<{ slug: LifeTopic; label: string }>;

export function isLifeTopic(value: string): value is LifeTopic {
  return LIFE_TOPICS.some((topic) => topic.slug === value);
}

export function getLifeTopic(value: LifeTopic) {
  return LIFE_TOPICS.find((topic) => topic.slug === value)!;
}
```

Create `lib/life/navigation.ts`:

```ts
export function isLifePath(pathname: string): boolean {
  return pathname === "/life" || pathname.startsWith("/life/");
}
```

- [ ] **Step 6: Run tests and commit**

Run:

```bash
npm run test:life
```

Expected: 2 tests PASS.

Commit:

```bash
git add .gitignore package.json package-lock.json vitest.config.ts lib/life tests/life/contracts.test.ts
git commit -m "test: add Life content contracts"
```

---

### Task 2: Build and test the external metadata extractor

**Files:**
- Create: `scripts/life/metadata.mjs`
- Create: `tests/fixtures/life/article.html`
- Create: `tests/fixtures/life/article-minimal.html`
- Create: `tests/life/metadata.test.ts`

**Interfaces:**
- Consumes: manifest rows shaped as `{ url, topic, language, enabled }`.
- Produces: `extractArticleMetadata(html, request)` returning a normalized external entry candidate.
- Consumed by: Task 3 sync runner.

- [ ] **Step 1: Create the complete metadata fixtures**

Create `tests/fixtures/life/article.html`:

```html
<!doctype html>
<html lang="vi">
  <head>
    <title>Fallback title</title>
    <link rel="canonical" href="https://publisher.example/story" />
    <meta property="og:title" content="  A real sneaker story  " />
    <meta property="og:description" content="A source-provided description." />
    <meta property="og:image" content="https://publisher.example/image.jpg" />
    <meta property="og:site_name" content="Publisher" />
    <meta property="article:published_time" content="2026-07-20T09:00:00+07:00" />
  </head>
</html>
```

Create `tests/fixtures/life/article-minimal.html`:

```html
<!doctype html>
<html>
  <head>
    <title>Minimal article</title>
    <meta name="description" content="Description without social tags." />
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "datePublished": "2026-07-19T10:30:00+07:00"
      }
    </script>
  </head>
</html>
```

- [ ] **Step 2: Write failing extractor tests**

Create `tests/life/metadata.test.ts`:

```ts
import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { extractArticleMetadata } from "../../scripts/life/metadata.mjs";

const fixture = (name: string) =>
  readFile(path.join(process.cwd(), "tests/fixtures/life", name), "utf8");

describe("extractArticleMetadata", () => {
  it("prefers canonical Open Graph metadata", async () => {
    const result = extractArticleMetadata(await fixture("article.html"), {
      url: "https://publisher.example/requested",
      topic: "sneakers",
      language: "vi",
      fetchedAt: "2026-07-22T00:00:00.000Z",
    });

    expect(result).toMatchObject({
      kind: "external",
      topic: "sneakers",
      title: "A real sneaker story",
      source: "Publisher",
      canonicalUrl: "https://publisher.example/story",
      sourceDescription: "A source-provided description.",
      imageUrl: "https://publisher.example/image.jpg",
      publishedAt: "2026-07-20",
      language: "vi",
    });
  });

  it("falls back to title, request URL, hostname, and meta description", async () => {
    const result = extractArticleMetadata(await fixture("article-minimal.html"), {
      url: "https://minimal.example/story",
      topic: "edm",
      language: "en",
      fetchedAt: "2026-07-22T00:00:00.000Z",
    });

    expect(result.source).toBe("minimal.example");
    expect(result.canonicalUrl).toBe("https://minimal.example/story");
    expect(result.publishedAt).toBe("2026-07-19");
    expect(result.sourceDescription).toBe("Description without social tags.");
    expect(result.imageUrl).toBeUndefined();
  });

  it("rejects unsupported protocols and missing dates", () => {
    expect(() =>
      extractArticleMetadata("<title>Bad</title>", {
        url: "file:///tmp/story",
        topic: "edm",
        language: "en",
        fetchedAt: "2026-07-22T00:00:00.000Z",
      }),
    ).toThrow();
  });
});
```

- [ ] **Step 3: Run the extractor test to verify it fails**

Run:

```bash
npx vitest run tests/life/metadata.test.ts
```

Expected: FAIL because `scripts/life/metadata.mjs` does not exist.

- [ ] **Step 4: Implement metadata extraction**

Create `scripts/life/metadata.mjs` with these exported functions and rules:

```js
import { createHash } from "node:crypto";
import { load } from "cheerio";

const DESCRIPTION_LIMIT = 180;

function clean(value) {
  return value?.replace(/\s+/g, " ").trim() || undefined;
}

function httpUrl(value, base) {
  if (!value) return undefined;
  const url = new URL(value, base);
  if (!/^https?:$/.test(url.protocol)) throw new Error(`Unsupported URL: ${url}`);
  url.hash = "";
  return url.toString();
}

function isoDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) throw new Error(`Invalid date: ${value}`);
  return date.toISOString().slice(0, 10);
}

function jsonLdPublishedAt($) {
  let publishedAt;
  $('script[type="application/ld+json"]').each((_, element) => {
    if (publishedAt) return;
    try {
      const parsed = JSON.parse($(element).text());
      const queue = Array.isArray(parsed) ? [...parsed] : [parsed];
      while (queue.length > 0 && !publishedAt) {
        const node = queue.shift();
        if (!node || typeof node !== "object") continue;
        if (typeof node.datePublished === "string") publishedAt = node.datePublished;
        if (Array.isArray(node["@graph"])) queue.push(...node["@graph"]);
      }
    } catch {
      // Malformed publisher JSON-LD is ignored in favor of other date sources.
    }
  });
  return publishedAt;
}

export function extractArticleMetadata(html, request) {
  const requestUrl = httpUrl(request.url);
  const $ = load(html);
  const meta = (selector) => clean($(selector).attr("content"));
  const title = clean(
    meta('meta[property="og:title"]') ||
      meta('meta[name="twitter:title"]') ||
      $("title").text(),
  );
  const canonicalUrl = httpUrl(
    clean($('link[rel="canonical"]').attr("href")) ||
      meta('meta[property="og:url"]') ||
      requestUrl,
    requestUrl,
  );
  const publishedAt = isoDate(
    meta('meta[property="article:published_time"]') ||
      jsonLdPublishedAt($) ||
      request.publishedAt,
  );
  if (!title || !canonicalUrl || !publishedAt) {
    throw new Error(`Missing required metadata for ${request.url}`);
  }
  const sourceDescription = clean(
    meta('meta[property="og:description"]') ||
      meta('meta[name="description"]') ||
      meta('meta[name="twitter:description"]'),
  )?.slice(0, DESCRIPTION_LIMIT);
  const source =
    meta('meta[property="og:site_name"]') || new URL(canonicalUrl).hostname;
  const imageUrl = httpUrl(
    meta('meta[property="og:image"]') || meta('meta[name="twitter:image"]'),
    canonicalUrl,
  );
  const id = `external:${createHash("sha256")
    .update(canonicalUrl)
    .digest("hex")
    .slice(0, 12)}`;

  return {
    id,
    kind: "external",
    topic: request.topic,
    title,
    publishedAt,
    ...(imageUrl ? { imageUrl, imageAlt: title } : {}),
    source,
    canonicalUrl,
    ...(sourceDescription ? { sourceDescription } : {}),
    language: request.language,
    fetchedAt: request.fetchedAt,
  };
}
```

- [ ] **Step 5: Run tests and commit**

Run:

```bash
npx vitest run tests/life/metadata.test.ts
```

Expected: 3 tests PASS.

Commit:

```bash
git add scripts/life/metadata.mjs tests/fixtures/life tests/life/metadata.test.ts
git commit -m "feat: add Life metadata extractor"
```

---

### Task 3: Add deterministic snapshot generation and the manual sync command

**Files:**
- Create: `scripts/life/snapshot.mjs`
- Create: `scripts/life/sync-life-content.mjs`
- Create: `content/life/external-sources.json`
- Create: `content/life/external-articles.json`
- Create: `tests/life/snapshot.test.ts`

**Interfaces:**
- Consumes: `extractArticleMetadata()` from Task 2 and manifest JSON.
- Produces: `buildSnapshot()`, atomic snapshot writes, and `npm run life:sync`.
- Consumed by: Task 4 content loader and Task 8 live seeding.

- [ ] **Step 1: Write failing snapshot tests**

Create `tests/life/snapshot.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildSnapshot } from "../../scripts/life/snapshot.mjs";

const previous = [{
  id: "external:old",
  kind: "external",
  topic: "edm",
  title: "Previous",
  publishedAt: "2026-07-18",
  source: "Publisher",
  canonicalUrl: "https://publisher.example/old",
  language: "en",
  fetchedAt: "2026-07-20T00:00:00.000Z",
}];

describe("buildSnapshot", () => {
  it("deduplicates canonical URLs and sorts newest first", () => {
    const snapshot = buildSnapshot({
      successes: [
        { ...previous[0], id: "external:new", title: "Updated" },
        { ...previous[0], canonicalUrl: "https://publisher.example/new", publishedAt: "2026-07-21" },
      ],
      failedUrls: [],
      previous,
    });
    expect(snapshot.map((item) => item.canonicalUrl)).toEqual([
      "https://publisher.example/new",
      "https://publisher.example/old",
    ]);
  });

  it("preserves a previous item when its canonical manifest URL fails", () => {
    const snapshot = buildSnapshot({
      successes: [],
      failedUrls: ["https://publisher.example/old"],
      previous,
    });
    expect(snapshot).toEqual(previous);
  });

  it("refuses to replace a snapshot with zero valid entries", () => {
    expect(() => buildSnapshot({ successes: [], failedUrls: [], previous: [] }))
      .toThrow("zero valid entries");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npx vitest run tests/life/snapshot.test.ts
```

Expected: FAIL because `scripts/life/snapshot.mjs` does not exist.

- [ ] **Step 3: Implement deterministic snapshot merging**

Create `scripts/life/snapshot.mjs`:

```js
const TOPICS = new Set(["sneakers", "basketball", "edm"]);
const LANGUAGES = new Set(["en", "vi"]);

function valid(entry) {
  return entry?.kind === "external" &&
    TOPICS.has(entry.topic) &&
    LANGUAGES.has(entry.language) &&
    typeof entry.title === "string" &&
    /^https?:\/\//.test(entry.canonicalUrl) &&
    /^\d{4}-\d{2}-\d{2}$/.test(entry.publishedAt);
}

export function buildSnapshot({ successes, failedUrls, previous }) {
  const retained = previous.filter(
    (entry) => failedUrls.includes(entry.canonicalUrl) && valid(entry),
  );
  const byCanonical = new Map();
  for (const entry of [...retained, ...successes]) {
    if (!valid(entry)) continue;
    byCanonical.set(entry.canonicalUrl, entry);
  }
  const snapshot = [...byCanonical.values()].sort(
    (a, b) => b.publishedAt.localeCompare(a.publishedAt) ||
      a.canonicalUrl.localeCompare(b.canonicalUrl),
  );
  if (snapshot.length === 0) throw new Error("Refusing snapshot with zero valid entries");
  return snapshot;
}
```

- [ ] **Step 4: Add the manifest and empty initial snapshot**

Create `content/life/external-sources.json` with at least two explicit candidate URLs per topic. Use this exact schema for every row:

```json
[
  {
    "url": "https://www.elleman.vn/phong-cach/thoi-trang/8-doi-sneakers-ban-nen-so-huu-trong-2026/",
    "topic": "sneakers",
    "language": "vi",
    "enabled": true
  },
  {
    "url": "https://sneakernews.com/2026/07/19/sneaker-releases-july-19-july-25-2026/",
    "topic": "sneakers",
    "language": "en",
    "enabled": true
  },
  {
    "url": "https://webthethao.vn/vba/vba-2026-chinh-thuc-trinh-lang-rut-gon-con-6-doi-uu-tien-noi-binh-va-su-tro-lai-cua-rookie-draft-BdemEMzRg-amp.htm",
    "topic": "basketball",
    "language": "vi",
    "enabled": true
  },
  {
    "url": "https://www.nba.com/news/commissioner-adam-silver-addresses-media-2026-nba-summer-league",
    "topic": "basketball",
    "language": "en",
    "enabled": true
  },
  {
    "url": "https://edmland.vn/",
    "topic": "edm",
    "language": "vi",
    "enabled": false,
    "publishedAt": "2026-07-01"
  },
  {
    "url": "https://edm.com/news/edma-nominations-2026/",
    "topic": "edm",
    "language": "en",
    "enabled": true
  }
]
```

The disabled EDMLand homepage is a source-family marker, not an article. Before Task 8, replace it with an accessible specific EDMLand article URL and enable it. `publishedAt` is an allowed manifest fallback only when a publisher omits machine-readable dates.

Create `content/life/external-articles.json`:

```json
[]
```

- [ ] **Step 5: Implement the network runner and atomic write**

Create `scripts/life/sync-life-content.mjs`:

```js
import { readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { extractArticleMetadata } from "./metadata.mjs";
import { buildSnapshot } from "./snapshot.mjs";

const root = process.cwd();
const manifestPath = path.join(root, "content/life/external-sources.json");
const outputPath = path.join(root, "content/life/external-articles.json");
const tempPath = `${outputPath}.tmp`;
const fetchedAt = new Date().toISOString();
const headers = { "user-agent": "Thanh-Life-Journal/1.0 (+portfolio metadata sync)" };

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const previous = JSON.parse(await readFile(outputPath, "utf8"));
const successes = [];
const failedUrls = [];

for (const source of manifest.filter((item) => item.enabled)) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(source.url, { headers, signal: controller.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    successes.push(extractArticleMetadata(await response.text(), {
      ...source,
      fetchedAt,
    }));
  } catch (error) {
    failedUrls.push(source.url);
    console.error(`[life:sync] ${source.url}: ${error.message}`);
  } finally {
    clearTimeout(timeout);
  }
}

const snapshot = buildSnapshot({ successes, failedUrls, previous });
await writeFile(tempPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
await rename(tempPath, outputPath);
console.log(`[life:sync] wrote ${snapshot.length} entries`);
```

- [ ] **Step 6: Run unit tests and commit without running the live sync yet**

Run:

```bash
npx vitest run tests/life/metadata.test.ts tests/life/snapshot.test.ts
```

Expected: 6 tests PASS.

Commit:

```bash
git add scripts/life content/life/external-sources.json content/life/external-articles.json tests/life/snapshot.test.ts
git commit -m "feat: add Life feed sync"
```

---

### Task 4: Add trusted local MDX loading and combined selectors

**Files:**
- Create: `lib/life/content.ts`
- Create: `content/life/README.md`
- Create: `tests/fixtures/life/sneakers/sample-note.mdx`
- Create: `tests/fixtures/life/edm/draft.mdx`
- Create: `tests/life/content.test.ts`

**Interfaces:**
- Consumes: Task 1 types and Task 3 external snapshot.
- Produces: `getLifeNoteSummaries()`, `getLifeNote()`, `getExternalEntries()`, `getLifeEntries()`, `getTopicEntries()`, and `getFeaturedEntry()`.
- Consumed by: Tasks 5–7 routes and components.

- [ ] **Step 1: Create a test-only MDX fixture and failing tests**

Create `tests/fixtures/life/sneakers/sample-note.mdx`:

```mdx
---
title: A test note
topic: sneakers
publishedAt: "2026-07-21"
language: en
excerpt: Test-only fixture copy.
published: true
---

This body exists only in the test fixture.
```

Create `tests/fixtures/life/edm/draft.mdx`:

```mdx
---
title: A hidden draft
topic: edm
publishedAt: "2026-07-22"
language: en
published: false
---

This draft must never appear in selectors or generated routes.
```

Create `tests/life/content.test.ts`:

```ts
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  getLifeEntries,
  getLifeNote,
  getLifeNoteSummaries,
  getTopicEntries,
} from "@/lib/life/content";

const fixtureRoot = path.join(process.cwd(), "tests/fixtures/life");

describe("Life content", () => {
  it("loads published MDX frontmatter and excludes drafts", async () => {
    const notes = await getLifeNoteSummaries(fixtureRoot);
    expect(notes).toHaveLength(1);
    expect(notes[0]).toMatchObject({
      id: "note:sneakers:sample-note",
      kind: "note",
      slug: "sample-note",
      topic: "sneakers",
    });
  });

  it("compiles a matching local note and rejects a missing slug", async () => {
    expect(await getLifeNote("sneakers", "sample-note", fixtureRoot)).not.toBeNull();
    expect(await getLifeNote("sneakers", "missing", fixtureRoot)).toBeNull();
  });

  it("combines and sorts notes with external entries", async () => {
    const external = [{
      id: "external:1",
      kind: "external" as const,
      topic: "basketball" as const,
      title: "External",
      publishedAt: "2026-07-22",
      source: "Publisher",
      canonicalUrl: "https://publisher.example/story",
      language: "en" as const,
      fetchedAt: "2026-07-22T00:00:00.000Z",
    }];
    const entries = await getLifeEntries({ notesRoot: fixtureRoot, external });
    expect(entries.map((item) => item.kind)).toEqual(["external", "note"]);
    expect(getTopicEntries(entries, "sneakers")).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npx vitest run tests/life/content.test.ts
```

Expected: FAIL because `lib/life/content.ts` does not exist.

- [ ] **Step 3: Implement the content loader**

Create `lib/life/content.ts` with this public API and validation flow:

```ts
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import externalSnapshot from "@/content/life/external-articles.json";
import { isLifeTopic, LIFE_TOPICS } from "./topics";
import type {
  LifeEntry,
  LifeExternalEntry,
  LifeNoteFrontmatter,
  LifeNoteSummary,
  LifeTopic,
} from "./types";

const NOTES_ROOT = path.join(process.cwd(), "content/life");

function validFrontmatter(value: LifeNoteFrontmatter): boolean {
  return Boolean(
    value.title && isLifeTopic(value.topic) &&
    /^\d{4}-\d{2}-\d{2}$/.test(value.publishedAt) &&
    (value.language === "en" || value.language === "vi"),
  );
}

function validExternalEntry(value: unknown): value is LifeExternalEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<LifeExternalEntry>;
  return entry.kind === "external" &&
    typeof entry.id === "string" &&
    typeof entry.title === "string" &&
    typeof entry.source === "string" &&
    typeof entry.canonicalUrl === "string" &&
    /^https?:\/\//.test(entry.canonicalUrl) &&
    typeof entry.publishedAt === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(entry.publishedAt) &&
    typeof entry.topic === "string" && isLifeTopic(entry.topic) &&
    (entry.language === "en" || entry.language === "vi") &&
    typeof entry.fetchedAt === "string";
}

async function noteFiles(root: string): Promise<string[]> {
  const groups = await Promise.all(LIFE_TOPICS.map(async ({ slug }) => {
    const topicRoot = path.join(root, slug);
    try {
      const entries = await readdir(topicRoot, { withFileTypes: true });
      return entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
        .map((entry) => path.join(topicRoot, entry.name));
    } catch {
      return [];
    }
  }));
  return groups.flat();
}

function isSafeSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

async function compile(file: string) {
  const source = await readFile(file, "utf8");
  return compileMDX<LifeNoteFrontmatter>({
    source,
    options: { parseFrontmatter: true },
  });
}

export async function getLifeNoteSummaries(root = NOTES_ROOT): Promise<LifeNoteSummary[]> {
  let files: string[] = [];
  try { files = await noteFiles(root); } catch { return []; }
  const notes = await Promise.all(files.map(async (file) => {
    const { frontmatter } = await compile(file);
    const directoryTopic = path.basename(path.dirname(file));
    if (!validFrontmatter(frontmatter) ||
        frontmatter.topic !== directoryTopic ||
        frontmatter.published === false) return null;
    const slug = path.basename(file, ".mdx");
    return {
      id: `note:${frontmatter.topic}:${slug}`,
      kind: "note" as const,
      slug,
      topic: frontmatter.topic,
      title: frontmatter.title,
      publishedAt: frontmatter.publishedAt,
      language: frontmatter.language,
      ...(frontmatter.excerpt ? { excerpt: frontmatter.excerpt } : {}),
      ...(frontmatter.imageUrl ? { imageUrl: frontmatter.imageUrl } : {}),
      ...(frontmatter.imageAlt ? { imageAlt: frontmatter.imageAlt } : {}),
      ...(frontmatter.featured ? { featured: true } : {}),
    } satisfies LifeNoteSummary;
  }));
  return notes.filter((note): note is LifeNoteSummary => note !== null);
}

export async function getLifeNote(topic: LifeTopic, slug: string, root = NOTES_ROOT) {
  if (!isSafeSlug(slug)) return null;
  const file = path.join(root, topic, `${slug}.mdx`);
  try {
    const compiled = await compile(file);
    if (!validFrontmatter(compiled.frontmatter) ||
        compiled.frontmatter.topic !== topic ||
        compiled.frontmatter.published === false) return null;
    return compiled;
  } catch {
    return null;
  }
}

export function getExternalEntries(): LifeExternalEntry[] {
  return (externalSnapshot as unknown[]).filter(validExternalEntry);
}

export async function getLifeEntries(options?: {
  notesRoot?: string;
  external?: LifeExternalEntry[];
}): Promise<LifeEntry[]> {
  const notes = await getLifeNoteSummaries(options?.notesRoot);
  const external = options?.external ?? getExternalEntries();
  return [...notes, ...external].sort(
    (a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id),
  );
}

export function getTopicEntries(entries: LifeEntry[], topic: LifeTopic) {
  return entries.filter((entry) => entry.topic === topic);
}

export function getFeaturedEntry(entries: LifeEntry[]) {
  return entries.find((entry) => entry.featured) ?? entries[0];
}
```

Production notes use `content/life/<topic>/<slug>.mdx`. The parent directory and frontmatter topic must match, and slugs use lowercase letters, digits, and single hyphens only. Empty topic directories are not required in Git.

- [ ] **Step 4: Document the exact authoring contract**

Create `content/life/README.md` with:

````md
# Life notes

Store original notes at `content/life/<topic>/<slug>.mdx`, where `<topic>` is
`sneakers`, `basketball`, or `edm`, and `<slug>` uses lowercase letters, digits,
and single hyphens.

```yaml
---
title: "Supplied title"
topic: sneakers
publishedAt: "2026-07-22"
language: en
excerpt: "Optional supplied excerpt"
imageUrl: "https://example.com/optional-owned-image.jpg"
imageAlt: "Required when imageUrl is present"
featured: false
published: false
---
```

Set `published: false` to keep a note out of summaries, routes, and the sitemap.
The directory topic and frontmatter topic must match. Only trusted local MDX is
compiled. No sample production note is included because Thanh has not supplied
first-person content yet.
````

- [ ] **Step 5: Run tests and commit**

Run:

```bash
npx vitest run tests/life/content.test.ts
```

Expected: 3 tests PASS.

Commit:

```bash
git add lib/life/content.ts content/life/README.md tests/fixtures/life tests/life/content.test.ts
git commit -m "feat: add Life MDX content loader"
```

---

### Task 5: Build the Life editorial components and Almanac styling

**Files:**
- Create: `components/life/life-masthead.tsx`
- Create: `components/life/life-intro.tsx`
- Create: `components/life/topic-index.tsx`
- Create: `components/life/article-card.tsx`
- Create: `components/life/article-rail.tsx`
- Create: `components/life/life-image.tsx`
- Create: `components/life/life-colophon.tsx`
- Create: `app/life/life.css`
- Modify: `tokens.css`
- Create: `tests/life/components.test.tsx`

**Interfaces:**
- Consumes: normalized Task 1 entry types and topic registry.
- Produces: presentation-only components used by Task 6 routes and Task 7 root chrome.

- [ ] **Step 1: Write failing semantic component tests**

Create `tests/life/components.test.tsx` using `renderToStaticMarkup`:

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ArticleCard from "@/components/life/article-card";
import TopicIndex from "@/components/life/topic-index";

describe("Life components", () => {
  it("renders external entries with source attribution and safe target", () => {
    const html = renderToStaticMarkup(<ArticleCard entry={{
      id: "external:1",
      kind: "external",
      topic: "edm",
      title: "Publisher title",
      publishedAt: "2026-07-20",
      source: "EDM.com",
      canonicalUrl: "https://edm.com/story",
      language: "en",
      fetchedAt: "2026-07-22T00:00:00.000Z",
    }} />);
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("EDM.com");
    expect(html).toContain("↗");
  });

  it("renders exactly three deep-linkable topic entries", () => {
    const html = renderToStaticMarkup(<TopicIndex entries={[]} />);
    expect(html.match(/href="\/life\//g)).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npx vitest run tests/life/components.test.tsx
```

Expected: FAIL because Life components do not exist.

- [ ] **Step 3: Implement component semantics**

Implement these exact rules:

```tsx
// components/life/article-card.tsx — branching contract
const href = entry.kind === "note"
  ? `/life/${entry.topic}/${entry.slug}`
  : entry.canonicalUrl;

const meta = entry.kind === "note" ? "My Note" : entry.source;
```

- `ArticleCard` uses `Link` for notes and `<a target="_blank" rel="noopener noreferrer">` for external entries.
- `ArticleCard` renders `→` for notes and `↗` for external entries, plus `<time dateTime={entry.publishedAt}>`.
- `ArticleRail` returns `null` for an empty entry array.
- `TopicIndex` always renders the three topic links and only uses existing entry thumbnails when present.
- `LifeIntro` renders exactly “A personal index of sneakers, basketball, and electronic music.” unless a supplied `personalNote` prop exists.
- `LifeMasthead` accepts `pathname: string`; it renders `THANH / LIFE`, `/life` and topic links, `/` return link, active `aria-current`, and `ThemeSwitch`.
- `LifeMasthead` renders a full category row at or above 60rem and a native `<details><summary>Topics</summary>…</details>` navigation below 60rem; CSS controls visibility, and both versions use identical real route links.
- `LifeColophon` accepts `fetchedAt?: string`; it names metadata-only external links and displays the last sync date only when one exists.
- `LifeImage` is the only client component in this folder; on `img` error it removes the image and shows a topic-labelled decorative fallback. It sets `width={800}`, `height={450}`, `loading="lazy"`, and `referrerPolicy="no-referrer"`.
- External card anchors include an accessible label in the form `${entry.title} — opens on ${entry.source} in a new tab`.

- [ ] **Step 4: Add scoped tokens**

Append named Life tokens to `tokens.css`; component CSS must not contain raw color values:

```css
:root {
  --life-paper: oklch(97% 0.008 90);
  --life-paper-2: oklch(94% 0.01 90);
  --life-ink: oklch(22% 0.012 110);
  --life-muted: oklch(45% 0.012 110);
  --life-rule: oklch(80% 0.012 100);
  --life-rule-strong: oklch(57% 0.015 105);
  --life-accent: oklch(43% 0.12 258);
  --life-accent-strong: oklch(34% 0.13 258);
  --life-focus: oklch(38% 0.14 258);
}

.dark {
  --life-paper: oklch(16% 0.012 100);
  --life-paper-2: oklch(20% 0.014 100);
  --life-ink: oklch(93% 0.008 90);
  --life-muted: oklch(72% 0.01 95);
  --life-rule: oklch(31% 0.014 100);
  --life-rule-strong: oklch(52% 0.016 100);
  --life-accent: oklch(72% 0.12 250);
  --life-accent-strong: oklch(80% 0.1 248);
  --life-focus: oklch(88% 0.08 250);
}
```

- [ ] **Step 5: Implement the complete Life stylesheet**

The first line of `app/life/life.css` must be:

```css
/* Hallmark · genre: editorial · macrostructure: Ecosystem Index · theme: Almanac · enrichment: none · nav: N6 · footer: Ft4 */
```

Implement the approved v2 structure with these exact constraints:

```css
.life-root { min-height: 100%; background: var(--life-paper); color: var(--life-ink); }
.life-shell { width: min(100%, var(--container)); margin-inline: auto; padding-inline: var(--page-gutter); }
.life-masthead { background: var(--life-paper); color: var(--life-ink); border-bottom: var(--rule-hair) solid var(--life-rule-strong); }
.life-topic-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) repeat(2, minmax(0, .9fr)); }
.life-article-row { display: grid; grid-template-columns: minmax(0, 5rem) minmax(0, 1fr) auto auto; }
.life-link, .life-topic-link, .life-return-link { white-space: nowrap; }
```

At `40rem`, keep metadata inline; below `40rem`, move metadata beneath titles and collapse topic cards to one column. At `60rem`, expose the full category row; below it, render a native `<details>` menu so labels never wrap. Apply focus-visible instantly with `--life-focus`; only transition color, opacity, and transform. Include a `prefers-reduced-motion` block capped at 150 ms.

- [ ] **Step 6: Run tests and commit**

Run:

```bash
npx vitest run tests/life/components.test.tsx
```

Expected: 2 tests PASS.

Commit:

```bash
git add components/life app/life/life.css tokens.css tests/life/components.test.tsx
git commit -m "feat: add Life journal components"
```

---

### Task 6: Compose the Life routes, metadata, and sitemap

**Files:**
- Create: `app/life/layout.tsx`
- Create: `app/life/page.tsx`
- Create: `app/life/[topic]/page.tsx`
- Create: `app/life/[topic]/[slug]/page.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: Task 4 content selectors and Task 5 components.
- Produces: all Life pages, static params, route metadata, and sitemap URLs.

- [ ] **Step 1: Add the Life route wrapper**

Create `app/life/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./life.css";

export const metadata: Metadata = {
  title: { default: "Life | Thanh Trần", template: "%s | Thanh Trần" },
  description: "A personal index of sneakers, basketball, and electronic music.",
  alternates: { canonical: "/life" },
};

export default function LifeLayout({ children }: { children: React.ReactNode }) {
  return <div className="life-root">{children}</div>;
}
```

- [ ] **Step 2: Compose the landing page**

`app/life/page.tsx` must:

```tsx
const entries = await getLifeEntries();
const featured = getFeaturedEntry(entries);
const latest = entries.slice(0, 6);
```

Render `LifeIntro`, `TopicIndex`, an optional featured `ArticleRail`, Latest, and one non-empty rail per topic. Do not render any placeholder post.

- [ ] **Step 3: Compose topic archives with strict params**

`app/life/[topic]/page.tsx` must export:

```ts
export function generateStaticParams() {
  return LIFE_TOPICS.map(({ slug }) => ({ topic: slug }));
}
```

Use `isLifeTopic(params.topic)` followed by `notFound()`. Generate metadata from the canonical topic label and render the topic's note/external rails.

- [ ] **Step 4: Compose original-post routes only**

`app/life/[topic]/[slug]/page.tsx` must generate params from `getLifeNoteSummaries()`, call `getLifeNote(topic, slug)`, reject invalid topics/slugs with `notFound()`, and render only trusted compiled MDX content. It must not query external entries.

- [ ] **Step 5: Replace the empty sitemap**

Make `app/sitemap.ts` async. Include `/`, `/life`, all three topic archives, and each published original note. Build absolute URLs from `NEXT_PUBLIC_SITE_URL`, then `VERCEL_URL`, then `http://localhost:3000`. Do not add external canonical URLs as local sitemap entries.

- [ ] **Step 6: Run route verification and commit**

Run:

```bash
npm run test:life
npm run build
```

Expected: all Life tests PASS and Next reports `/life`, three topic routes, and the dynamic note route without TypeScript errors.

Commit:

```bash
git add app/life app/sitemap.ts
git commit -m "feat: add Life journal routes"
```

---

### Task 7: Integrate Life with the existing Header and Footer without regressions

**Files:**
- Modify: `lib/data.ts:1-8`
- Modify: `components/header.tsx:3-310`
- Modify: `components/footer.tsx:1-20`
- Modify: `tests/life/contracts.test.ts`

**Interfaces:**
- Consumes: `isLifePath()`, `LifeMasthead`, `LifeColophon`, and the existing Header/Footer contracts.
- Produces: homepage-to-Life navigation and Life-specific root chrome.

- [ ] **Step 1: Extend the failing navigation tests**

Add to `tests/life/contracts.test.ts`:

```ts
import { navLinks } from "@/lib/data";

it("defines Life as a route and keeps portfolio anchors as sections", () => {
  expect(navLinks.find((link) => link.label === "Life")).toEqual({
    label: "Life",
    href: "/life",
    kind: "route",
  });
  const sectionLinks = navLinks.filter((link) => link.kind === "section");
  expect(sectionLinks.every((link) => link.href.startsWith("#"))).toBe(true);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npx vitest run tests/life/contracts.test.ts
```

Expected: FAIL because nav entries do not have `kind` and Life is absent.

- [ ] **Step 3: Type navigation data and add Life**

Replace the top of `lib/data.ts` with:

```ts
export type NavLink =
  | { label: string; href: `#${string}`; kind: "section" }
  | { label: string; href: `/${string}`; kind: "route" };

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home", kind: "section" },
  { label: "About", href: "#about", kind: "section" },
  { label: "Products", href: "#projects", kind: "section" },
  { label: "Skills", href: "#skills", kind: "section" },
  { label: "Experience", href: "#experience", kind: "section" },
  { label: "Life", href: "/life", kind: "route" },
  { label: "Contact", href: "#contact", kind: "section" },
];
```

- [ ] **Step 4: Make Header route-aware and route-safe**

In `components/header.tsx`:

- Import `usePathname`, `useRouter`, `LifeMasthead`, `isLifePath`, and `NavLink`.
- Rename the current hook-heavy component to `PortfolioHeader` without changing its hook order.
- Add a small exported wrapper `Header` that calls only `usePathname()` and returns `<LifeMasthead pathname={pathname} />` for Life paths or `<PortfolioHeader />` otherwise. This separation prevents hook-order changes when navigating between route families.
- Filter `navLinks` to `kind === "section"` before creating observers or indexing page text.
- Change navigation results to carry the original `NavLink`.
- For `kind === "route"`, close overlays and call `router.push(link.href)`.
- For `kind === "section"`, preserve the current `scrollIntoView({ behavior: "smooth" })` path.
- Use real `href` values on every anchor so navigation still works without JavaScript.
- Do not alter search highlighting, command-key behavior, or current animations outside the necessary branch.

The route helper must have this shape:

```ts
const goTo = (link: NavLink) => {
  if (link.kind === "route") router.push(link.href);
  else document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
  setMobileOpen(false);
  setCommandOpen(false);
  setQuery("");
};
```

- [ ] **Step 5: Make Footer route-aware**

In `components/footer.tsx`, add `"use client"`, call `usePathname()`, and return `<LifeColophon />` for Life paths. Leave the existing portfolio footer JSX byte-for-byte equivalent in the non-Life branch.

- [ ] **Step 6: Run regression checks and commit**

Run:

```bash
npm run test:life
npm run build
```

Expected: tests PASS; homepage and Life routes build; no selector exception for `/life`.

Commit:

```bash
git add lib/data.ts components/header.tsx components/footer.tsx tests/life/contracts.test.ts
git commit -m "feat: link Life journal from portfolio"
```

---

### Task 8: Curate and generate the initial Culture Wire snapshot

**Files:**
- Modify: `content/life/external-sources.json`
- Modify: `content/life/external-articles.json`

**Interfaces:**
- Consumes: the allowlisted sync command from Task 3.
- Produces: at least six validated external entries, at least two per topic, with Vietnamese and international publishers across the full set.

- [ ] **Step 1: Replace the disabled EDM source marker with a specific accessible article**

Browse EDMLand or another reputable Vietnamese electronic-music publisher, select one specific public article, and add its exact URL, topic `edm`, language `vi`, and `enabled: true`. Do not use a category page, homepage, social post, video-only page, paywall, or robots-blocked URL.

- [ ] **Step 2: Run the live metadata sync**

Run:

```bash
npm run life:sync
```

Expected: exits 0 and logs `wrote 6 entries` or more. If one candidate fails, replace only that manifest URL with another specific article from the same approved source family and rerun; do not bypass the publisher's controls.

- [ ] **Step 3: Validate topic counts and copyright boundary**

Run:

```bash
npm run test:life
node -e "const x=require('./content/life/external-articles.json'); const c=x.reduce((a,i)=>(a[i.topic]=(a[i.topic]||0)+1,a),{}); console.log(c); if(['sneakers','basketball','edm'].some(k=>(c[k]||0)<2)) process.exit(1)"
```

Expected: tests PASS; every topic array contains at least two entries. Inspect JSON and confirm there is no article body, only fields from `LifeExternalEntry`.

- [ ] **Step 4: Commit the curated snapshot**

```bash
git add content/life/external-sources.json content/life/external-articles.json
git commit -m "content: seed Life culture wire"
```

---

### Task 9: Run Hallmark, responsive, accessibility, and final regression gates

**Files:**
- Modify only files that fail a named gate.
- Modify: `.hallmark/log.json` is intentionally ignored and remains local project memory.

**Interfaces:**
- Consumes: the completed feature.
- Produces: verified release-ready implementation and Hallmark preview/handoff summary.

- [ ] **Step 1: Run automated verification**

Run:

```bash
npm run test:life
npm run build
git diff --check
```

Expected: all commands exit 0.

- [ ] **Step 2: Start the production-equivalent page and capture required widths**

Run the project and inspect `/`, `/life`, `/life/sneakers`, `/life/basketball`, and `/life/edm`. Capture or inspect 320, 375, 414, 768, and 1440 px widths. Confirm:

- no horizontal scrolling;
- no clickable label wraps;
- topic grid and article metadata collapse correctly;
- mobile masthead remains usable with 44 px targets;
- external arrow/source and `My Note` remain textual;
- portfolio Header/Footer remain visually unchanged.

- [ ] **Step 3: Verify interaction and accessibility states**

Keyboard-test every link, native details menu, theme switch, and return link. Verify instant visible focus, correct `aria-current`, light/dark contrast, failed-image fallback, empty My Note rail omission, and reduced-motion behavior.

- [ ] **Step 4: Load and run the Hallmark slop test only now**

Read `.agents/skills/hallmark/references/slop-test.md` in full. Score all 58 gates, fix every failing gate, then re-run Tasks 9.1–9.3. Do not claim `58 / 58` before this pass.

- [ ] **Step 5: Append local Hallmark memory**

Prepend this run to ignored `.hallmark/log.json`, keeping at most 20 entries:

```json
{
  "date": "2026-07-22",
  "macrostructure": "Ecosystem Index",
  "theme": "Almanac",
  "enrichment": "none; source thumbnails below fold",
  "nav": "N6 Newspaper masthead",
  "footer": "Ft4 Dense typographic",
  "brief": "Life journal for sneakers, basketball, and EDM"
}
```

- [ ] **Step 6: Commit any QA fixes**

If QA changed production files:

```bash
git add <only-the-files-changed-by-QA>
git commit -m "fix: finalize Life journal quality gates"
```

If QA required no changes, do not create an empty commit.

- [ ] **Step 7: Final handoff**

Report routes, sync command, test/build results, responsive widths, Hallmark score, remaining content limitation (no first-person My Note supplied), and the exact files changed. Keep `.superpowers/` and `.hallmark/` out of the commit.
