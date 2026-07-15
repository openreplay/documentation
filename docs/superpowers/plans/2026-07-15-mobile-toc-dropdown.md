# Mobile Sticky "On This Page" Dropdown Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** At ≤1024px, revive the hidden mobile TOC as a redesign-styled sticky dropdown bar ("On this page ▸ ‹current section›") that pins below the header on scroll.

**Architecture:** Reuse the existing `<details>`-based mobile mode of `TableOfContents.tsx` (approach A from the spec, `docs/superpowers/specs/2026-07-15-mobile-toc-dropdown-design.md`). Fix its scroll-spy for the phone document-scroll regime, replace redesign.css's kill rule with new bar/panel styling, and align the hydration breakpoint. No new components; no markup changes.

**Tech Stack:** Astro 2 + Preact islands, plain CSS in `public/redesign.css` (loads after `index.css`; component CSS wins by specificity, not order).

**Verification:** No JS test infra exists in this repo (no vitest/jest). Each task verifies via the running dev server (`http://localhost:4399`, tab `seed` in the Browser pane) + dev-server logs. Final task is a full behavioral sweep.

**Facts you need (verified):**
- `--theme-navbar-height: 56px` (public/theme.css:296), header is `position: fixed`.
- Phones (<768px): the **document** scrolls (redesign.css:61–64). Tablets/desktop: `#or-main-scroll` scrolls.
- Redesign tokens: `--page`, `--or-border`, `--text`, `--text-2`, `--text-3`, `--accent`, `--fb` (font). There is **no** `--text-1`.
- `.or-toc-list` / `.or-toclink` / `.tick` styles (redesign.css:289–323) are unscoped → the mobile panel inherits the desktop TOC list look for free.
- `html { scroll-padding-top: calc(1.5rem + navbar + 4rem) }` (index.css:975) already reserves mobile-bar space on the document scroller; heading wrappers carry `scroll-margin-top: 80px` (redesign.css:373,390). Phone jumps clear ≥144px, tablet jumps clear 80px > bar (44px + 8px offset + 6px gap). **No scroll-margin changes needed** — Task 5 verifies this empirically; a contingency rule is included there.
- i18n label `rightSidebar.onThisPage` exists for all locales (src/i18n/*/ui.ts).
- iOS 26 invariant (redesign.css drawer comments): pinned/fixed UI must never size past the layout viewport → panel max-height uses **svh only**.

---

### Task 0: Commit the pending blockquote-icon fix (unrelated working-tree change)

The working tree has an uncommitted one-property fix in `public/redesign.css` (`padding: 0` on `.content blockquote::before` + comment). Commit it FIRST so feature commits stay clean.

**Files:**
- Modify: none (already edited)

- [ ] **Step 0.1: Verify the diff is only the blockquote fix**

Run: `git diff --stat`
Expected: only `public/redesign.css` (≈5 insertions), plus untracked plan file.

- [ ] **Step 0.2: Commit**

```bash
git add public/redesign.css
git commit -m "fix(theme): stop note-callout icon bleeding into the Note: label

The blockquote ::before inherited padding:0.1rem 1rem from index.css,
inflating its box to 50px; mask:center/contain then re-centred the icon
into the label text. Reset padding on the redesign rule.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

Also commit this plan file:

```bash
git add docs/superpowers/plans/2026-07-15-mobile-toc-dropdown.md
git commit -m "docs: add implementation plan for mobile TOC dropdown

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 1: Fix scroll-spy for the phone (document-scroll) regime

**Files:**
- Modify: `src/components/RightSidebar/TableOfContents.tsx:47-88` (the first `useEffect`)

Today the spy always binds `#or-main-scroll`. On phones that element exists but is not the scroller, so the spy never fires and the bottom-of-page guard reads a `scrollTop` that is always 0. Bind both potential scrollers (only the real one emits events), resolve the regime per update via the same media query redesign.css uses, and use `document.scrollingElement` for the bottom guard in the document regime.

- [ ] **Step 1.1: Replace the effect body**

Replace the entire first `useEffect(() => { ... }, [headings.map((h) => h.slug).join('|')]);` (lines 47–88) with:

```tsx
	useEffect(() => {
		// Position-based scroll-spy. Two scroll regimes (see redesign.css "APP SHELL"):
		// phones (<768px) scroll the DOCUMENT; wider screens scroll #or-main-scroll.
		// Bind both — only the real scroller emits scroll events — and resolve the
		// active regime on every update so resizing across the breakpoint just works.
		// An IntersectionObserver top-zone can never activate the LAST heading
		// (nothing below it pushes it into the zone), so we pick the last heading
		// above an activation line and add an explicit "scrolled to bottom" guard.
		const phoneMQ = window.matchMedia('(max-width: 767.98px)');
		const innerScroller = document.getElementById('or-main-scroll');
		const headingEls = () =>
			headings
				.map(({ slug }) => document.getElementById(slug))
				.filter((el): el is HTMLElement => !!el);

		const update = () => {
			const els = headingEls();
			if (!els.length) return;
			const scroller = phoneMQ.matches ? null : innerScroller;
			// Document regime: the line is viewport-anchored (top = 0). Inner regime:
			// anchored to the scroller's top edge, as before.
			const top = scroller ? scroller.getBoundingClientRect().top : 0;
			const line = top + 120; // activation line ~120px below the scroll area's top
			let cur = els[0].id;
			for (const el of els) {
				if (el.getBoundingClientRect().top <= line) cur = el.id;
			}
			// At (or near) the bottom, the last section is the active one.
			const sc = scroller ?? (document.scrollingElement as HTMLElement | null);
			if (sc && sc.scrollHeight - sc.scrollTop - sc.clientHeight < 8) {
				cur = els[els.length - 1].id;
			}
			setCurrentID(cur);
		};

		window.addEventListener('scroll', update, { passive: true });
		innerScroller?.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		update();

		return () => {
			window.removeEventListener('scroll', update);
			innerScroller?.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	}, [headings.map((h) => h.slug).join('|')]);
```

- [ ] **Step 1.2: Verify the dev server recompiles cleanly**

Check dev-server output (Browser-pane `preview_logs`, level `error`).
Expected: no TypeScript/compile errors mentioning `TableOfContents`.

- [ ] **Step 1.3: Verify desktop TOC still spies correctly (regression check)**

Browser pane at ≥1280px width on `/en/deployment/deploy-aws`: scroll the article; the right-sidebar TOC active item must follow the sections (this instance uses the inner-scroller regime — unchanged behavior).

- [ ] **Step 1.4: Commit**

```bash
git add src/components/RightSidebar/TableOfContents.tsx
git commit -m "fix(toc): make scroll-spy work in the phone document-scroll regime

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Style the sticky bar + dropdown panel in redesign.css

**Files:**
- Modify: `public/redesign.css:174-175` (the kill rule)

- [ ] **Step 2.1: Replace the kill rule with the mobile-bar block**

Replace:

```css
/* hide the legacy mobile TOC bar — design hides TOC on small screens */
.fixed-mobile-bar { display: none !important; }
```

with:

```css
/* ===================== MOBILE "ON THIS PAGE" BAR ===================== */
/* Shown wherever the right-hand TOC is hidden (≤1024px, next block). In-flow at the
   top of the article, pins on scroll (position:sticky). Phones pin below the fixed
   header (the DOCUMENT scrolls there); tablets pin at the top of the inner
   #or-main-scroll scroller (which already starts below the header).
   Bar height lives in --or-mobile-toc-h so any future offset rules share one source.
   The dropdown panel's max-height uses svh ONLY — never vh/lvh/dvh — per the iOS 26
   layout-viewport clipping notes on .or-drawer above.
   Selectors are ≥(0,2,0) on purpose: the component's legacy TableOfContents.css is
   bundled into <style> tags whose order vs this file is not guaranteed, so we win on
   specificity, not order. */
:root { --or-mobile-toc-h: 44px; }

.fixed-mobile-bar { display: none; }

@media (max-width: 1024px) {
	.fixed-mobile-bar {
		display: block;
		position: sticky;
		top: 8px; /* tablet: #or-main-scroll's top edge is already below the header */
		z-index: 10;
		margin-bottom: 18px;
	}
	.fixed-mobile-bar .toc-mobile-container {
		display: block;
		position: relative; /* anchors the absolute dropdown panel */
	}
	.fixed-mobile-bar .toc-mobile-header {
		display: flex;
		align-items: center;
		height: var(--or-mobile-toc-h);
		padding: 0 12px;
		background: var(--page); /* opaque: content scrolls underneath while pinned */
		border: 1px solid var(--or-border);
		border-radius: 10px;
		box-shadow: 0 6px 20px rgb(0 0 0 / 0.07);
		cursor: pointer;
	}
	.fixed-mobile-bar .toc-mobile-header-content,
	.fixed-mobile-bar .toc-toggle {
		display: flex;
		align-items: center;
		min-width: 0;
		width: 100%;
		border: 0;
		padding: 0;
	}
	/* legacy [open] rule paints --theme-bg-offset at (0,2,1); out-specific it */
	.fixed-mobile-bar .toc-mobile-container[open] .toc-toggle { background: transparent; }
	.fixed-mobile-bar .toc-mobile-header h2 {
		flex: none;
		margin: 0;
		font-family: var(--fb);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: var(--text-3);
	}
	.fixed-mobile-bar .toc-mobile-header svg {
		flex: none;
		fill: var(--text-3);
		margin-inline: 2px 6px;
	}
	.fixed-mobile-bar .toc-current-heading {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 13px;
		font-weight: 600;
		color: var(--text);
	}
	.fixed-mobile-bar .or-toc-list {
		position: absolute;
		inset-inline: 0;
		top: calc(var(--or-mobile-toc-h) + 6px);
		max-height: 60svh; /* svh only — see iOS 26 note above */
		overflow-y: auto;
		overscroll-behavior: contain;
		margin: 0;
		padding: 10px 12px;
		background: var(--page);
		border: 1px solid var(--or-border);
		border-radius: 12px;
		box-shadow: 0 18px 44px rgb(0 0 0 / 0.14);
		transform: none; /* cancel legacy translateY */
	}
}
/* Phones: the document scrolls under the fixed header — pin below it. */
@media (max-width: 767.98px) {
	.fixed-mobile-bar { top: calc(var(--theme-navbar-height) + 8px); }
}
```

- [ ] **Step 2.2: Visual smoke-check (bar hidden — hydration breakpoint not yet aligned)**

Browser pane at 800px width, reload `/en/deployment/deploy-aws`.
Expected: bar VISIBLE at 800px (72em hydration already covers ≤1152px). At 1280px: NO bar (display:none >1024px), right TOC unchanged.

- [ ] **Step 2.3: Commit**

```bash
git add public/redesign.css
git commit -m "feat(mobile): sticky 'On this page' dropdown bar styling (≤1024px)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Align the hydration breakpoint

**Files:**
- Modify: `src/layouts/MainLayout.astro:32`

`client:media="(max-width: 72em)"` hydrates up to 1152px while CSS shows the bar only ≤1024px — harmless but wasteful, and the numbers should tell one story.

- [ ] **Step 3.1: Change the media query**

```diff
-							client:media="(max-width: 72em)"
+							client:media="(max-width: 1024px)"
```

- [ ] **Step 3.2: Verify hydration still happens at 800px**

Reload at 800px; tap the bar → dropdown must open (proves the island hydrated with the new query).

- [ ] **Step 3.3: Commit**

```bash
git add src/layouts/MainLayout.astro
git commit -m "chore(mobile-toc): align island hydration breakpoint with CSS (1024px)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Neutralize conflicting legacy rules that specificity doesn't already beat

**Files:**
- Modify: `src/components/RightSidebar/TableOfContents.css`

Most legacy rules lose to the (0,2,0)+ selectors from Task 2. Two don't matter (`transform` calc with `unset` is invalid-at-computed-value → no-op) but are landmines; and the `ul` max-height (`--cur-viewport-height`, a vh-based var) violates the svh-only invariant if it ever wins. Delete them rather than override.

- [ ] **Step 4.1: Delete the stale panel-geometry declarations**

In `.toc-mobile-container ul` (lines 111–120), delete these three declarations only (keep the rule for its other pages/uses):

```diff
 .toc-mobile-container ul {
-	max-height: calc( var(--cur-viewport-height) - var(--theme-navbar-height) - var(--theme-mobile-toc-height) - 1rem );
 	overflow-y: auto;
 	border: var(--theme-border);
 	border-radius: var(--theme-border-radius);
 	padding: 0.5rem 0;
 	font-size: var(--theme-text-sm);
 	background: var(--content-bg);
-	transform: translateY(calc(-0.5rem - 0.5 * var(--header-bottom-padding)));
 }
```

(Two deletions; the diff context above shows the survivors.)

- [ ] **Step 4.2: Verify no visual change at 800px and 375px**

Reload; the dropdown panel must look identical to Task 2/3 checks (redesign rules already governed these properties).

- [ ] **Step 4.3: Commit**

```bash
git add src/components/RightSidebar/TableOfContents.css
git commit -m "chore(mobile-toc): drop stale vh-based panel geometry from legacy CSS

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 5: Full behavioral verification sweep (Browser pane)

**Files:** none (verification only)

All checks on the running dev server. Test page: `/en/deployment/deploy-aws` (many h2/h3).

- [ ] **Step 5.1: Phone regime (375×812)**
  - Bar renders under the hero, in-flow; scrolling pins it 8px below the 56px header.
  - Current-section label updates while scrolling the DOCUMENT (the regression this plan fixes). Scroll to the very bottom: label = last section ("Have questions?").
  - Tap bar → panel opens (≤60svh, inner-scrollable). Tap "Deploy OpenReplay" → jumps, heading NOT hidden under the pinned bar, panel closes.
  - Tap outside the open panel → closes.

- [ ] **Step 5.2: Tablet regime (800×1024)**
  - Same checks; bar pins at the top of the inner scroller; spy follows inner scroll.

- [ ] **Step 5.3: Jump-clearance contingency**

If (and only if) a jumped-to heading hides under the pinned bar, add to the `@media (max-width: 1024px)` block from Task 2:

```css
	.content .heading-wrapper { scroll-margin-top: calc(80px + var(--or-mobile-toc-h)); }
```

- [ ] **Step 5.4: RTL + dark + edge cases**
  - `/ar-ae/deployment/deploy-aws`: bar right-aligned correctly (dir=rtl), chevron/label order mirrored, panel anchored full-width.
  - Toggle dark theme: bar/panel use dark tokens, borders visible, no white flash.
  - A page with no h2/h3 (e.g. `/en/co-browsing` — confirm, else find one): no bar rendered, no empty sticky gap.
  - 1280px: no bar; right TOC + its spy unchanged.

- [ ] **Step 5.5: Console + logs clean**

`read_console_messages(onlyErrors)` → only the known OpenReplay localhost SSL warning. `preview_logs(level:error)` → nothing new.

- [ ] **Step 5.6: Final commit (if contingency or fixes were applied)**

```bash
git add -A && git commit -m "fix(mobile-toc): verification-sweep adjustments

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```
