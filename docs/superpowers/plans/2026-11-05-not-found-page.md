# 404 (Not Found) Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Next's default white error page with an on-brand static 404 page that routes visitors back into the site.

**Architecture:** Single server component `not-found.tsx` rendered inside the existing root layout, styled with the existing CSS-variable design system. No new dependencies, no client JS, no animations.

**Tech Stack:** Next.js (App Router, static export) — file convention `src/app/not-found.tsx`.

**Spec:** Approved short design (conversation, 2026-11-05): eyebrow `ERROR — 404 · PAGE NOT FOUND`; giant heading with Georgia-serif `<em>` accent; one line of copy; `Back home` button (`.button .button-dark`) + `View selected work ↗` text-link; footer line ©/Sfax; static, no JS.

## Global Constraints

- Match existing design system: `--black`, `--white`, `--muted`, `--line`, `--soft` variables; Georgia-serif `em` accent; uppercase eyebrow.
- No new dependencies; no client JS; no animations.
- NAV links: `Back home` → `/`; `View selected work` → `/#work` (single-page site anchor).

## Review Focus

- Deep-link audience: page must be readable at any viewport width with no scrollbar issues (test: build output contains the copy paths).
- Anchors: `/#work` must resolve to the main page's `#work` section, which exists in `page.tsx`.

---

### Task 1: Not-found page + styles

**Files:**
- Create: `src/app/not-found.tsx`
- Modify: `src/app/globals.css` (append `.nf*` rules)

**Interfaces:**
- Consumes: `.button .button-dark`, `.text-link`, `.eyebrow`, `.monogram`, `.footer` CSS rules (existing).
- Produces: `NotFound` default export (Next.js file convention).

- [ ] **Step 1: Implement `src/app/not-found.tsx`** — static server component: minimal topbar (`.monogram` link to `/`), main with eyebrow `ERROR — 404 · PAGE NOT FOUND`, h1 `Wrong turn, <em>no page here.</em>`, copy line "The address you're looking for doesn't exist on this site. Try one of these instead —", CTAs (`.button .button-dark` → `/`; `.text-link` → `/#work`), footer (© year Rami Maalej / Sfax, Tunisia). Uses `lucide-react` `ArrowUpRight` for the text-link, consistent with `page.tsx`.

- [ ] **Step 2: Append `.nf-*` CSS** to `globals.css`: full-height flex column layout, centered main, heading sized like `.split-section h2` style values, copy color `#b9b9b3`.

- [ ] **Step 3: Verify build** — `npm run build`; expected: `out/404.html` generated.

- [ ] **Step 4: Commit** — only if the user asks for commits. Skip otherwise.
