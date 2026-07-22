# Life Journal Design

Date: 2026-07-22
Status: Approved in conversation; awaiting written-spec review
Project: Thanh Trần portfolio

## 1. Objective

Add a new `Life` area to the portfolio that helps recruiters and people with shared interests understand Thanh beyond product work. The page presents three stated interests—Sneakers, Basketball, and EDM Music—as a personal editorial index with two content types:

- `My Note`: original posts authored by Thanh and hosted on the portfolio.
- `Culture Wire`: curated external articles represented by source metadata and linked to the original publisher.

The initial release must provide the complete route and authoring system even when no original post has been supplied yet. It must seed the Culture Wire with a small Vietnamese and international reading set without republishing article bodies.

## 2. Audience, job, and tone

- Primary audiences: recruiters or hiring managers, plus communities that share the three interests.
- Primary job: reveal more of Thanh's personality and taste.
- Secondary job: provide an enjoyable path through selected reading and future original notes.
- Tone: editorial, personal, restrained, and specific.
- Interface language: English, matching the existing portfolio.
- Source content language: retained as published; Vietnamese and English items can coexist.

The implementation must not invent personal opinions, ownership claims, life stories, article summaries, or original-post titles. Until Thanh supplies first-person copy, the landing page may use only the factual positioning sentence: “A personal index of sneakers, basketball, and electronic music.” Optional personal fields remain absent from the UI rather than rendering placeholders.

## 3. Scope

### Included in v1

- A `Life` entry in the existing portfolio navigation.
- A Life landing page and three topic archive pages.
- Original-post detail routes backed by local MDX.
- A curated external-article feed backed by checked-in JSON.
- A manual metadata synchronization command for allowlisted article URLs.
- Route metadata and sitemap entries for the Life landing, topics, and original posts.
- Light and dark modes using the existing theme preference.
- Responsive and accessible behavior at Hallmark's required widths.

### Excluded from v1

- CMS or admin interface.
- Comments, reactions, accounts, bookmarks, or social feed behavior.
- Newsletter signup.
- Scheduled background crawling.
- Site-wide or full-text Life search.
- Local copies of publisher article bodies or publisher images.
- Internal detail pages for external articles.

## 4. Hallmark design direction

### Pre-flight system to preserve

- Next.js 14 App Router and TypeScript.
- Geist for body and display; Geist Mono for source metadata.
- Existing OKLCH token discipline, 4-point spacing scale, dark mode, and reduced-motion handling.
- Existing portfolio experience outside `/life`.

### Selected design system

- Genre: Editorial.
- Macrostructure: Ecosystem Index.
- Theme: Almanac treatment—warm neutral paper, tinted dark ink, and a restrained cobalt editorial marker.
- Navigation: N6 Newspaper Masthead, reduced to a compact masthead and one topic row.
- Footer: Ft4 Dense Typographic colophon.
- Enrichment: no hero enrichment; publisher thumbnails or neutral topic artwork appear only in content rails.
- Motion: nearly static. Focus, underline, press, and image-state feedback are allowed; there are no scroll reveals, parallax effects, carousels, or infinite decoration.

Diversification from the prior Hallmark build:

- Macrostructure changes from Feature Stack to Ecosystem Index.
- Navigation changes from N13 Inline Command Pill to N6 Newspaper Masthead.
- Footer changes from Ft5 Statement to Ft4 Dense Typographic.
- The page changes from a technical Cobalt product surface to an editorial Almanac reading surface while retaining the portfolio's type families.

The Life palette is scoped to the Life route. Existing portfolio tokens and visuals remain unchanged.

## 5. Information architecture

### Routes

```text
/life
/life/sneakers
/life/basketball
/life/edm
/life/[topic]/[slug]
```

Only the three topic slugs `sneakers`, `basketball`, and `edm` are valid. Unknown topics and unknown original-post slugs return Next.js `notFound()`.

### `/life`

The landing page renders, in order:

1. Compact Life issue line and masthead.
2. Topic navigation and return-to-portfolio link.
3. Factual positioning line.
4. Three topic entry surfaces with neutral artwork or available source imagery.
5. One featured item chosen explicitly in content data, if present.
6. Latest mixed rail containing both content kinds.
7. One rail per topic.
8. Source and update colophon.

Rails with no content are omitted. The page never renders fake cards, lorem ipsum, empty metric slots, or “coming soon” content purely to fill layout.

### Topic archives

Each archive renders:

- Topic name and return links.
- Optional first-person topic note, only when supplied by Thanh.
- Original notes, if any.
- Culture Wire items for the topic.

Category selection uses real links, not JavaScript-only tabs. Every archive is deep-linkable, indexable, and usable without client-side state.

### Original post detail

An original post displays frontmatter, reading body, published date, topic, and back links. It never claims authorship for Culture Wire material. External articles do not receive local slug pages.

## 6. Content model

### Shared fields

```ts
type LifeTopic = "sneakers" | "basketball" | "edm";

interface LifeBaseEntry {
  id: string;
  kind: "note" | "external";
  topic: LifeTopic;
  title: string;
  publishedAt: string;
  imageUrl?: string;
  imageAlt?: string;
  featured?: boolean;
}
```

### Original note

```ts
interface LifeNote extends LifeBaseEntry {
  kind: "note";
  slug: string;
  excerpt?: string;
  language: "en" | "vi";
}
```

Original posts live under:

```text
content/life/<topic>/<slug>.mdx
```

Frontmatter supplies the metadata above. MDX compilation uses `next-mdx-remote/rsc` with local, trusted repository files only. External or user-submitted MDX is out of scope.

### External entry

```ts
interface LifeExternalEntry extends LifeBaseEntry {
  kind: "external";
  source: string;
  canonicalUrl: string;
  sourceDescription?: string;
  language: "en" | "vi";
  fetchedAt: string;
}
```

`sourceDescription` is publisher-supplied metadata, normalized to plain text and capped at 180 characters for display. The application does not generate a replacement summary or download article body content.

## 7. External metadata synchronization

### Source manifest

The repository stores an explicit manifest of curated article URLs. Each row declares URL, topic, language, and enabled state. The synchronization command does not discover links by crawling category pages.

Initial source families:

- Sneakers: ELLE Man Việt Nam and Sneaker News.
- Basketball: Webthethao and NBA.com.
- EDM: EDMLand and EDM.com.

The initial manifest contains at least two accessible article URLs per topic and represents both Vietnamese and international publishers across the full set. Sources that block ordinary access, including any source disallowed by its robots policy, are not bypassed or included in the automated sync.

### Sync command

`npm run life:sync` performs this deterministic flow:

1. Read the explicit source manifest.
2. Fetch enabled URLs with a named user agent, an 8-second timeout, and no anti-bot bypass.
3. Parse canonical Open Graph, standard metadata, and JSON-LD publication fields with Cheerio.
4. Normalize text, language, dates, and canonical URLs.
5. Reject entries without a usable title or canonical URL.
6. Deduplicate by normalized canonical URL.
7. Validate the full normalized result.
8. Write the new snapshot atomically only when validation succeeds.

The checked-in snapshot is the production input. `next build` never calls publishers and therefore remains reproducible offline.

### Rights and attribution boundaries

- Store only metadata intended for link previews.
- Do not store or render article bodies.
- Do not cache publisher images locally.
- Render publisher name, publication date, original language, and external-link symbol.
- Open external links in a new tab with `noopener noreferrer` and an accessible label naming the publisher.
- When an image is unavailable or fails, show topic artwork instead of a broken image.

## 8. Component and module boundaries

### Route and content modules

- `app/life/layout.tsx`: route wrapper, scoped class, and shared Life metadata defaults.
- `app/life/page.tsx`: Life landing composition.
- `app/life/[topic]/page.tsx`: topic archive and static params.
- `app/life/[topic]/[slug]/page.tsx`: original-note detail, metadata, and not-found handling.
- `lib/life/content.ts`: reads and normalizes original MDX plus external JSON.
- `lib/life/types.ts`: topic and entry contracts.
- `lib/life/topics.ts`: canonical topic registry and optional supplied personal copy.

### Presentation modules

- `components/life/life-masthead.tsx`: route-aware Life navigation.
- `components/life/life-intro.tsx`: factual positioning and optional supplied personal copy.
- `components/life/topic-index.tsx`: three topic entry surfaces.
- `components/life/article-rail.tsx`: titled discovery rail.
- `components/life/article-card.tsx`: internal-versus-external card semantics.
- `components/life/life-image.tsx`: source image with a deterministic topic-art fallback.
- `components/life/life-colophon.tsx`: source disclosure and last snapshot timestamp.

Each component receives normalized data and does not fetch, parse, or infer content.

### Existing navigation integration

The existing `Header` and `Footer` already render in the root layout, so they become route-aware with `usePathname()`:

- Outside `/life`, current portfolio behavior and markup remain intact.
- On `/life` and descendants, `Header` renders `LifeMasthead` and `Footer` renders `LifeColophon`.
- The portfolio navigation data gains a route entry for `/life`; section entries keep their existing smooth-scroll behavior.

Navigation data distinguishes `section` entries from `route` entries so `/life` is never passed to `document.querySelector()`.

## 9. Styling and responsive behavior

- Life-specific colors are named scoped tokens; no raw color or font values appear in component rules.
- `tokens.css` retains all existing tokens and adds the Life light/dark token groups.
- Life component styles live in a dedicated Life stylesheet; `app/globals.css` remains append-only and receives only integration rules that truly must be global.
- `html` and `body` retain `overflow-x: clip`.
- Content images use stable aspect-ratio boxes to avoid layout shift.
- Article rails collapse to one column on phones; metadata moves below titles.
- Topic navigation collapses to a disclosure menu before any label wraps.
- Clickable labels remain on one line at every supported width.
- Touch targets are at least 44 by 44 CSS pixels.

Required visual verification widths: 320, 375, 414, 768, and 1440 CSS pixels.

## 10. Accessibility and motion

- Heading order is `h1` then `h2` then `h3`, independent of visual size.
- Topic navigation and external-link intent have explicit accessible labels.
- Focus rings remain instant, visible, and at least 3:1 against adjacent colors.
- Hover styling has matching focus-visible styling.
- State is never communicated by color alone; `My Note`, publisher name, and arrow direction remain textual.
- Reduced-motion mode removes spatial transitions and keeps any opacity feedback at or below 150 ms.
- No auto-rotating content, autoplay audio, custom cursor, parallax, or scroll-linked animation is permitted.

## 11. Failure behavior

### Sync failures

- Network timeout, non-success HTTP status, blocked request, or invalid metadata: log the URL and skip it.
- Partial source failure: keep valid new results and reuse matching entries from the previous snapshot where available.
- Invalid final snapshot or zero valid entries: do not replace the last good snapshot and exit non-zero.
- Duplicate canonical URL: keep one deterministic entry.
- Missing image or description: accept the item.

### Rendering failures

- Missing remote image: render topic artwork in the same reserved box.
- Empty `My Note` collection: omit the rail.
- Empty topic collection: render a concise factual empty state with a link back to all Life entries.
- Invalid topic or slug: return the framework 404.
- Malformed checked-in JSON: fail build with a named validation error rather than silently emitting a broken feed.

## 12. SEO and metadata

- `/life` receives its own title, description, canonical path, and social metadata.
- Topic archives receive topic-specific metadata using only known topic names.
- Original notes generate metadata from trusted frontmatter.
- Sitemap includes `/life`, the three archives, and each published original note.
- Culture Wire canonical URLs remain external and are never added as local sitemap routes.
- External cards use normal crawlable anchors.

## 13. Verification plan

### Automated

- Node's built-in test runner covers metadata extraction fixtures, normalization, canonical URL deduplication, invalid-item rejection, and snapshot-preservation behavior.
- Content tests cover valid topics, MDX frontmatter, published-only filtering, and sort order.
- `npm run build` covers static params, metadata generation, TypeScript, and all routes.
- Tests never depend on live publisher websites.

### Manual

- Navigate from portfolio to Life and back on desktop and mobile.
- Verify all topic links, original-note links, and external links.
- Confirm the header and footer remain unchanged outside `/life`.
- Verify light mode, dark mode, keyboard navigation, visible focus, reduced motion, failed image fallback, and empty rails.
- Inspect 320, 375, 414, 768, and 1440 widths for overflow, clipping, grid collapse, and wrapped clickable text.
- Confirm every Culture Wire card visibly names its source and opens the canonical publisher URL.

## 14. Acceptance criteria

The feature is complete when:

1. `/life` and all three topic archives build and render.
2. The homepage exposes a functional Life route without breaking section scrolling.
3. The original-post MDX system can render a valid local post when one is added.
4. The checked-in Culture Wire contains at least six valid external entries, with at least two per topic and a Vietnamese/international mix across the set.
5. The metadata sync command can regenerate the snapshot and preserve the last good snapshot on total failure.
6. No full publisher article text is stored or rendered.
7. Portfolio pages retain their prior Header, Footer, theme, and section behavior.
8. Production build and the automated Life tests pass.
9. Hallmark responsive, accessibility, token, and slop-test gates pass before handoff.
