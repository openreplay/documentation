# Mobile sticky "On this page" dropdown — design

**Date:** 2026-07-15
**Status:** Approved (design review with mehdi@openreplay.com)

## Problem

The 2026 redesign hides the right-hand "On this page" TOC at ≤1024px and force-hides
the legacy mobile TOC bar (`redesign.css`: `.fixed-mobile-bar { display: none !important; }`).
Result: on phones **and** tablets there is no way to jump between sections of a page.

## Goal

At ≤1024px, show a section-jump dropdown bar that:

- renders **in-flow at the top of the article** (under the hero) and **pins below the
  header when scrolled past** (`position: sticky`) — no JS show/hide;
- collapsed, reads **"On this page ▸ ‹current section›"** with the current section
  updated live by scroll-spy (doubles as a "you are here" indicator);
- expanded, lists all h2/h3 links (same data as the desktop TOC), highlights the active
  one, closes on link tap and on outside tap.

## Approach (chosen: A — revive the existing component)

The hidden `<details>`-based mobile mode of `TableOfContents.tsx` already implements the
whole interaction (label + live section, close-on-select, close-on-outside-tap,
translated labels, RTL, native disclosure semantics). We un-hide it, restyle it to the
redesign language, fix its scroll-spy for the phone scroll regime, and align breakpoints.

Rejected alternatives:
- **B — new purpose-built island**: duplicates working scroll-spy/dropdown/a11y logic;
  more code and risk for identical UX.
- **C — native `<select>`**: cannot show the live current section when collapsed;
  clashes with the redesign visuals.

## Changes by file

| File | Change |
|---|---|
| `public/redesign.css` | Replace the kill rule with bar + panel styling; visible ≤1024px, hidden above. |
| `src/layouts/MainLayout.astro` | Hydration media query `(max-width: 72em)` → `(max-width: 1024px)` to match the CSS breakpoint. |
| `src/components/RightSidebar/TableOfContents.tsx` | Scroll-spy: bind to the *actual* scroller per regime; rebind on breakpoint change. |
| `src/components/RightSidebar/TableOfContents.css` | Retire/override conflicting legacy rules (old theme vars, `--cur-viewport-height`). |

No new components. `PageContent.astro`'s `.fixed-mobile-bar` wrapper and the
`before-article` slot stay as-is.

## Behavior details

### Sticky mechanics (two scroll regimes)

- **Phones (<768px):** the *document* scrolls (redesign choice for iOS toolbar
  retraction). The fixed header overlays the scroller, so the bar pins at
  `top: var(--theme-navbar-height)`.
- **Tablets (768–1024px):** `#or-main-scroll` is the scroller and already starts below
  the header, so the bar pins at `top: 0`.

### Scroll-spy fix (phone regime is currently broken)

`TableOfContents.tsx` always binds to `#or-main-scroll`. On phones that element exists
but is **not** the scroller, so the spy never updates and the bottom-of-page guard
(`scrollTop`-based) never fires. Fix:

- Detect the scroller with the same breakpoint redesign.css uses
  (`max-width: 767.98px` → window/document; otherwise `#or-main-scroll`).
- Use a viewport-anchored activation line in the window regime (the current
  `scroller.getBoundingClientRect().top + 120` drifts as the document scrolls).
- Re-run detection on resize / media-query change and rebind listeners.

## Visual design (redesign language)

- **Bar:** opaque `background: var(--page)` (content must not show through while
  pinned), `1px solid var(--or-border)`, `border-radius: 10px`, Figtree 13–14px.
  Label styled as the redesign eyebrow (`--text-3`, uppercase, tracked); current
  section in `--text-1`; chevron rotates 90° when open. Soft shadow so the pinned bar
  reads as floating.
- **Panel:** same card treatment as the desktop TOC (surface card, `--accent` active
  tick), `max-height: 60svh` with inner scroll.
- **`svh` only** for the panel cap: per the iOS 26 invariants documented in
  redesign.css (drawer comments), fixed/pinned UI must never size itself past the
  layout viewport — no vh/lvh/dvh.

## Edge cases

- **No h2/h3 headings:** ~~MainLayout already skips rendering the slot — no bar.~~
  **As built:** the original `headings && …` guard passed for an *empty array*, so
  MainLayout now checks `headings.some(h => h.depth > 1 && h.depth < 4)`; and because
  Astro emits the slot wrapper even when the expression is falsy, redesign.css also
  hides `.fixed-mobile-bar:not(:has(details.toc-mobile-container))`.
- **RTL (ar-ae):** wrapper carries `dir`; use logical properties throughout; chevron
  rotation is direction-neutral.
- **Long titles:** single line + `text-overflow: ellipsis` (existing behavior).
- **i18n:** `rightSidebar.onThisPage` exists in all 6 locales; layout-level change, so
  no MDX/mirror re-porting.
- **Anchor jumps under the pinned bar:** at ≤1024px, increase headings'
  `scroll-margin-top` by the bar height so targets aren't obscured. The bar height is
  declared once as a CSS custom property (e.g. `--or-mobile-toc-h`) and reused by both
  the bar and the `scroll-margin-top` rule, so they can't drift apart.
  **As built:** the anchor ids sit on the headings themselves (whose scroll-margin is
  0), not on `.heading-wrapper`, so *scroller padding* is the reliable lever instead:
  `#or-main-scroll { scroll-padding-top: calc(var(--or-mobile-toc-h) + 24px) }` for the
  tablet regime, and on phones the `html` scroll-padding is retuned to
  `calc(navbar + var(--or-mobile-toc-h) + 16px)` — snug under the bar and above the
  scroll-spy activation line, so the label is correct right after a jump.

## Verification plan

In the live preview (Browser pane), at 375px and 800px widths:

1. Bar renders under the hero, pins below the header on scroll.
2. Current-section label updates while scrolling **the document** (phone regime — the
   regression case) and the inner scroller (tablet regime).
3. Dropdown opens, link jumps to section (not obscured by the bar), closes on select
   and on outside tap.
4. RTL spot-check on an `/ar-ae/…` page; dark mode spot-check.
5. A page without h2/h3 headings renders no bar.
6. Console free of new errors; desktop (>1024px) unchanged.
