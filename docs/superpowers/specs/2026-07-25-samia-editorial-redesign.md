# Samia One-Pager — Editorial Redesign

**Date:** 2026-07-25
**Status:** Approved
**Supersedes visual system of:** `2026-07-25-samia-one-pager-design.md` (content/section list carries forward; this doc replaces the palette, typography, and layout treatment)

## Purpose

Restyle the existing `/samia` page from the Sphere brand system (purple/pink/orange, Montserrat) to a standalone editorial visual identity, based on a reference screenshot the user supplied (an "editorial coach" Squarespace template — deep burgundy/cream palette, serif display type, polaroid-style photo collage, press-logo strip, script accents). This page is about Samia as a person/speaker, not the Sphere product, so it's approved to diverge from the company brand system.

**Explicit non-goal:** do not fabricate press credentials. The reference's "Featured In: Forbes, Bazaar, The Guardian, Vogue" row is template placeholder content. The only confirmed press is CanvasRebel Magazine — the Featured In strip shows only that.

## Visual System

**Palette (new CSS custom properties or literal Tailwind arbitrary values — implementer's choice, consistent with how the rest of this file already uses arbitrary hex values):**
- `--burgundy: #5A2320` (deep oxblood — primary dark background/accent)
- `--cream: #F4EFE1` (primary light background)
- `--ink: #2B221D` (near-black warm text color, used on cream backgrounds)
- `--tan: #CBB89A` (button fill / muted accent)

**Typography:**
- Add **Playfair Display** (Google Fonts, weights 400/500/600/700, plus italic 400/600) for all display headings on this page only — do not change the sitewide font config (`tailwind.config.js` / `app/globals.css`) which other pages depend on. Load it via a page-scoped `<link>` or Next.js `next/font/google` import inside `app/samia/page.js` (implementer's choice of mechanism — `next/font/google` is idiomatic Next.js and avoids a render-blocking external stylesheet link, so prefer it unless it conflicts with something discovered during implementation).
- Add **Caveat** (Google Fonts, weight 500/600) for the single script-accent line ("Let's talk today →") in the retro callout band.
- Body copy stays Inter (already loaded sitewide, no change).
- Nav links and eyebrow labels use small-caps-style treatment: `uppercase tracking-[0.15em] text-xs font-semibold`.

**Photo treatment:** Only `/images/founder.jpg` exists. Reuse it across all image slots (hero background, 3-photo collage, results-band background) with different crops/`object-position`/sizing/subtle treatments (e.g. slight rotation and border on collage photos to mimic a polaroid/photo-strip look) so the page doesn't look like a broken/placeholder build. No new image assets in this task — the user will supply more photos later and swap them in.

## Section-by-Section Content

Section order and content below. Sections 7-10 keep their existing informational content from the current `/samia` page (SPHERE, Speaking & Leadership, Press, Contact) — only their visual styling changes to match the new palette/type; do not alter their factual content, links, or the AZ Tech Week / CanvasRebel details already approved in the prior spec.

### 1. Nav
"SAMIA KOHLER" wordmark (Playfair Display), small-caps links: Story / Speaking / Press / Contact, tan pill CTA button "Book Me to Speak" linking to `#contact`.

### 2. Hero
Full-bleed `/images/founder.jpg` background with a dark burgundy overlay gradient. Serif headline (Playfair Display, italic on the emphasized word): "Build *the* Life & Career You Bet on Yourself For". Subtext: one line summarizing 18 years in hospitality → founder (reuse language from the approved Story section, condensed to 1-2 sentences). Tan pill CTA "Book Me to Speak" → `#contact`.

### 3. Retro Callout Band
Cream background. Two small decorative icons (simple inline SVG line icons — implementer's choice of subject matter fitting hospitality/speaking, e.g. a phone-handset icon and a microphone or record icon; do not attempt photorealistic icons, keep them simple line-art like the icons already used on `app/(site)/about/page.js`). Headline (Playfair Display): "18 Years in Hospitality. One Company Built on Her Own Terms." Short subtext (1-2 sentences, drawn from the approved "why I started ESS" story). Script accent line in Caveat: "Let's talk today →" linking to `#contact`.

### 4. Meet Samia
Burgundy background, white/cream text. Left or top: a 3-photo collage using `/images/founder.jpg` three times with distinct crops and slight rotation (polaroid/photo-strip effect via CSS transform + white border + shadow). Right or below: the condensed born-into-it / 18-years / breaking-point story (reuse the approved Story section's paragraphs from the current page, condensed if needed to fit the new layout — do not introduce new factual claims). Tan pill CTA "Meet Me" (can link to `#story` as a self-referential anchor, or omit if redundant in context — implementer's judgment).

### 5. Featured In
White background strip. Small eyebrow label "Featured In" (uppercase, tracking). Below it, only "CanvasRebel Magazine" styled as a masthead-style serif wordmark (Playfair Display, letter-spaced caps) — no other outlet names, no fabricated logos.

### 6. Results Band
Full-bleed `/images/founder.jpg` background (different crop from the hero) with a dark overlay. Small kicker text: "Venues I've worked with have seen". Large serif stat callout: "189%+ Increase in Private Event Bookings" (styled boldly, like the reference's testimonial quote treatment). This replaces the reference's fabricated client-testimonial slot with a real, already-approved stat — no 5-star rating graphic (that implied a client review; this isn't one).

### 7. What I Built (SPHERE)
Same content as the current page's SPHERE section (the $250K problem, what SPHERE does, the AI/human-connection line, the 189%+ stat repeated as a smaller supporting callout is fine since it's real). Restyle to cream/burgundy per this doc's palette instead of the old purple-block treatment.

### 8. Speaking & Leadership
Same content as current (Women in Tech & Leadership narrative, AZ Tech Week Panel credential card). Restyle to match new palette.

### 9. Press
Same content as current (CanvasRebel Magazine card with the "most difficult path" pull-quote, linking out). Restyle to match new palette.

### 10. Contact / Booking
Same content as current (email, LinkedIn, Instagram, link back to eventspheresolutions.com). Restyle to burgundy/tan instead of the old purple-pink-orange gradient.

## Non-Goals

- No changes to any other page or to sitewide config (`tailwind.config.js`, `app/globals.css`, `app/layout.js`, `app/(site)/layout.js`) — this is scoped entirely to `app/samia/page.js` (plus a possible `app/not-found.js` is explicitly untouched; that file already exists from prior work and is unrelated).
- No new image assets — placeholder reuse of `/images/founder.jpg` only, per the user's explicit choice to build now and swap photos in later.
- No fabricated press mentions, client testimonials, or star ratings.
- Anchor IDs (`#story`, `#speaking`, `#press`, `#contact`) and all external links (CanvasRebel, LinkedIn, Instagram, mailto) carry forward unchanged from the current implementation — only visual treatment changes.
- `<main>` landmark, `sizes` prop on hero image, and absolute page title (all fixed in the prior review round) must be preserved in the redesign, not regressed.
