# Private Event Lead Generation Playbook (Download) — Design Spec

**Date:** 2026-09-10
**Status:** Approved

## Purpose

Event Sphere Solutions has an internal SE playbook (Google Doc) written as a fill-in-the-blank template for onboarding a specific client venue ("[Venue Name]", "[CITY]", etc.). We're repurposing its content as a public marketing asset: a free, general-audience "Private Event Lead Generation Playbook" that any restaurant/bar/brewery/hotel can download from the website. It doubles as a lead magnet — email capture before download.

## Content

Rewrite the source doc into a finished guide, not a template:
- No `[bracket]` placeholders — speaks directly to "your venue," "your city."
- Keep the venue-type adaptation notes (breweries → taproom buyouts/flights, hotels → banquet space, bars → happy-hour buyouts/late-night parties) as inline callouts — genuinely useful, not template scaffolding.
- Keep the structure: Content Pillars, Audience Segments, PR, Social/CTA Framework, Email, SEO, Exposure Partners.
- Title: "The Private Event Lead Generation Playbook" with an Event Sphere Solutions byline/footer (replacing "Prepared for [Venue Name]").
- Drop items that only make sense for an internal client engagement (e.g. "confirm current membership status" notes, the Toast-specific CRM aside) or generalize them.

## Architecture

Follows the existing site pattern for downloadable one-pagers (`founding-partner-one-pager.html` linked from `app/founding-partner/page.js`): the "PDF" is a static, print-styled HTML file people save via the browser's print dialog — not a generated binary PDF. New pieces:

- `public/private-event-lead-gen-playbook.html` — the guide itself. Same visual system as `founding-partner-one-pager.html`: A4 `.page` div, Inter font, purple/orange Event Sphere palette (`--purple: #6a256f`, `--orange: #E07B20`, etc.), sticky print bar with a "Save as PDF / Print" button.
- `app/playbook/page.js` — landing page (hero explaining the 5 pillars + who it's for) rendering `PlaybookLeadForm`. Same layout conventions as `app/founding-partner/page.js` (Navbar/Footer wrapper, `btn-primary` styling, stats-row treatment optional/skip if it doesn't fit).
- `components/PlaybookLeadForm.jsx` — client component, single-step form (name + email only — kept short since this is a lead magnet, not a full contact form). On submit: POST to `/api/playbook`. Success state replaces the form with a "Download Your Playbook →" button/link that opens `/private-event-lead-gen-playbook.html` in a new tab, mirroring `founding-partner`'s download link.
- `app/api/playbook/route.js` — POST handler using Resend (same pattern as `app/api/contact/route.js`):
  - Validates `name` + `email` are present.
  - Sends a lead-notification email to `hello@eventspheresolutions.com` ("New Playbook Download — {name}").
  - Sends a confirmation email to the visitor with a direct link to `/private-event-lead-gen-playbook.html`.
  - Returns `{ success: true }` / error JSON, same shape as `/api/contact`.

## Site integration

- `components/Footer.jsx` — add a "Free Playbook" link to the "Company" column pointing to `/playbook`.
- `app/sitemap.js` — add `{ url: baseUrl/playbook, changeFrequency: 'monthly', priority: 0.7 }`.
- Main nav (`Navbar.jsx`) is left untouched — not adding a nav item (already dense); reachable via footer + direct link.

## Known trade-off

Like the existing one-pager files, `private-event-lead-gen-playbook.html` is a static public file: someone who guesses/shares the direct URL bypasses the email-capture form. This matches how `founding-partner-one-pager.html` already works on this site (soft gate, not real access control) — acceptable for a marketing asset, not treated as a bug.

## Testing

No automated tests exist for the analogous `founding-partner` flow; follow suit. Manual verification: form validation (empty fields), successful submit → both emails send (check Resend dashboard / logs), download link opens the styled guide, guide prints cleanly to PDF via the browser.
