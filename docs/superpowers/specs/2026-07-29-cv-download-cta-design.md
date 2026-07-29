# CV Download CTA Design

Date: 2026-07-29
Status: Approved in conversation; awaiting written-spec review
Project: Thanh Trần portfolio

## 1. Objective

Give recruiters and hiring managers a fast, obvious way to download Thanh's current CV from the two places where they are most likely to act:

- the hero, before they scroll; and
- Navi, the portfolio chatbot, while they are exploring Thanh's work.

The change must preserve the existing portfolio structure and visual system. It does not introduce a new page, modal, API request, notification, analytics event, or dependency.

## 2. Audience, job, and tone

- Primary audience: recruiters and hiring managers.
- Primary job: download the current CV in one action.
- Secondary job: continue into product work or contact Thanh.
- Tone: technical, direct, and restrained.
- Interface language: English, matching the current site.

## 3. Existing system to preserve

- Next.js 14 App Router and TypeScript.
- Existing Feature Stack macrostructure.
- Existing Hallmark Cobalt theme, OKLCH tokens, light and dark modes.
- Geist display/body type and Geist Mono metadata type.
- Existing 4-point spacing scale, control radii, focus treatment, and reduced-motion behavior.
- Existing `react-icons` package for the download glyph.

The CTA is a native, same-origin download link. The curated `pick-ui-library` list has no library that improves this task, so no package is added.

## 4. Interaction design

### Hero

The hero action order becomes:

1. `Download CV` — primary button with a download icon.
2. `View product work` — secondary button, retaining the existing smooth scroll behavior.

`Contact Thanh` leaves the main button group and becomes a compact text link in the existing hero note beside LinkedIn. This keeps the hero to two high-priority buttons and avoids a tall three-button stack on narrow screens.

The CV anchor uses:

```text
href="/Resume.pdf"
download="Thanh_Tran_Senior_Product_Owner_Product_Manager_CV.pdf"
```

### Chatbot

Navi gains a slim resource row immediately below the chatbot header and above the message history:

```text
[download icon] Download Thanh's CV                 PDF · 2 pages
```

The entire row is one download link. It remains visible at mobile widths, unlike the current chatbot footer. Existing LinkedIn, email, close, messages, suggestions, and compose behavior remain unchanged.

Both surfaces point to the same stable public asset, so future CV updates require replacing one file rather than editing links.

## 5. Visual and accessibility behavior

- Reuse the existing `.btn`, Cobalt accent, focus token, spacing tokens, and control radius.
- Add only the chatbot resource-row styles needed for layout and interaction.
- Keep all clickable labels on one line.
- Provide visible default, hover, `:focus-visible`, and active feedback.
- Do not animate the focus ring.
- Restrict movement to the existing one-pixel active/hover transform and remove that movement under `prefers-reduced-motion`.
- Use an accessible text label rather than an icon-only download control.
- Preserve usable layouts with no horizontal overflow at 320, 375, 414, and 768 px.
- Rely on the browser's native file-download behavior; there is no fabricated loading, success, or error UI.

## 6. Asset handling

Replace the existing `public/Resume.pdf` with the user-supplied two-page PDF:

```text
/Users/dangnguyen/Documents/Tài liệu (no working)/
Thanh_Tran_Senior_Product_Owner_Product_Manager_CV.pdf
```

The public URL remains `/Resume.pdf`, while the `download` attribute supplies the descriptive local filename. The source PDF is reference material and is not copied into page content.

## 7. File scope

Production changes:

- Modify `components/hero.tsx`.
- Modify `components/chatbot.tsx`.
- Modify `app/globals.css`.
- Replace `public/Resume.pdf` with the supplied CV.

Verification changes:

- Create `tests/cv-download.test.mjs`.

Hallmark process metadata may create or refresh `.hallmark/preflight.json`. No production file, route, component directory, or dependency is deleted.

## 8. Test design

The automated regression test reads the real source files and asserts:

1. `public/Resume.pdf` exists and begins with a PDF signature.
2. The public PDF hash matches the supplied CV hash.
3. The hero contains one visible `Download CV` link with `/Resume.pdf` and the descriptive `download` filename.
4. The hero keeps `View product work` and exposes email in the hero note.
5. The chatbot contains a visible `Download Thanh's CV` resource link using the same URL and filename.
6. The chatbot resource row appears before the message history.
7. The stylesheet includes the resource-row interaction rules and a narrow-width layout that cannot overflow.

The implementation follows red-green-refactor: add the test, confirm it fails for the missing CTAs and stale PDF, then make the minimum production changes and confirm the focused test and full verification suite pass.

## 9. Error handling

- A missing or stale PDF is caught by the repository test and build-time verification.
- Runtime download delivery is delegated to the browser and static host.
- The links do not depend on JavaScript, the chatbot API, or network state beyond serving the static site.
- No toast claims a download succeeded because the page cannot reliably know whether the user completed the browser download.

## 10. Success criteria

- Recruiters can start the current CV download from the hero in one action.
- Recruiters can start the same download from a clearly labelled Navi resource row on desktop and mobile.
- Both links download the supplied two-page PDF under the descriptive filename.
- Hero hierarchy remains limited to two main buttons.
- Existing portfolio navigation, smooth scrolling, chatbot messaging, contact paths, light/dark themes, and responsive layout remain intact.
- Focused tests, lint/type checks, build, and responsive browser verification complete without regressions.
