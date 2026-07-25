# Samia Kohler Personal One-Pager — Design

**Date:** 2026-07-25
**Status:** Approved

## Purpose

A standalone personal-brand landing page for Samia Kohler (Founder & CEO, Event Sphere
Solutions) modeled loosely on jetsetjade.com. Used as a leave-behind / link to send to
podcast bookers, panel organizers, and media — promoting Samia as a speaker and thought
leader, not the ESS product.

## Route & Page Chrome

- Route: `/samia` (new Next.js app route: `app/samia/page.js`)
- No site `Navbar`/`Footer` components — this page has its own minimal in-page nav
  (anchor links: Story / Speaking / Press / Contact) so it reads as a personal page,
  not a page nested inside the company site.
- Still uses the existing ESS brand system for visual consistency:
  - Colors: `brand.purple #6a256f`, `brand.pink #EF4561`, `brand.orange #F99F33`, `brand.dark #222123`
  - Fonts: Montserrat (`font-display`, headings), Inter (body)
  - Reuse existing utility classes where they fit: `.btn-primary`, `.btn-outline`, `.section-title`, `.section-subtitle`
- Image asset: `/images/founder.jpg` (already exists in repo, already used on `/about`)

## Sections (in order)

### 1. Minimal Nav
Fixed/sticky top bar: "Samia Kohler" wordmark on the left, anchor links (Story,
Speaking, Press, Contact) on the right. Simple, no dropdowns.

### 2. Hero
- Photo: `/images/founder.jpg`
- Name: **Samia Kohler**
- Title line: "Founder & CEO, Event Sphere Solutions · Phoenix, AZ"
- One-line positioning: "18 years building private-events revenue for hospitality —
  now building the platform for it."
- CTA button (`.btn-primary`) → scrolls to/links Contact section: "Book Me to Speak"

### 3. Story
Narrative drawn directly from Samia's background notes, condensed into 3–4 short
paragraphs:
- Born into hospitality (grandmother a cook, mother runs a catering company and
  produces festivals/large-scale events)
- 18 years working inside venues across Europe, Shanghai, Hong Kong, and Phoenix;
  the recurring pattern she kept seeing — venues underperforming on private events
  revenue not from lack of demand but lack of systems
- The breaking point that led to starting ESS — nearly two decades solving this for
  other people while capping her own potential
- Pull-quote (from CanvasRebel feature): *"Starting Event Sphere Solutions wasn't a
  calculated pivot. It was an act of finally trusting myself enough to stop giving my
  best to others."*

### 4. What I Built (SPHERE)
- The problem: venues lose a minimum of $250,000/year in private events revenue —
  not from lack of space or interest, but lack of sales infrastructure
- What SPHERE is: private events sales platform for restaurants, bars, hotels,
  breweries — automated proposals, 360° virtual tours, BEO generation, e-signatures,
  pipeline management — plus an optional dedicated sales team who close bookings on
  the venue's behalf
- AI philosophy line: *"In hospitality, human connection isn't a nice extra — it's
  the actual product."* AI stays in the background clearing administrative friction.
- Stat callout: **189%+** average increase in private event bookings for venues
  Samia has worked with

### 5. Speaking & Leadership
- Core topic: **Women in Tech & Leadership**
- Featured credential: **AZ Tech Week — Panel: Women in Tech and Leadership**
- Supporting narrative (condensed from Samia's "On Resilience" notes): building in
  two male-dominated industries at once (hospitality and tech), consistently the only
  woman — and often the only one who'd worked the floor — in boardrooms and investor
  pitches; resilience framed as constitutional, built daily, not a single story
- Pull-quote: *"Being underestimated teaches you to be sharper, more prepared, and
  more certain of your own expertise."* (paraphrased from her notes if no exact
  press quote fits better)

### 6. Press
- Feature card: **CanvasRebel Magazine** — "Meet Samia Kohler" (July 2026)
- Pull-quote: *"I genuinely believe that the most difficult path is usually the one
  worth taking."*
- Link out to https://canvasrebel.com/meet-samia-kohler/

### 7. Contact / Booking
- Heading: "Book Me for Your Podcast or Panel"
- Email: hello@eventspheresolutions.com
- LinkedIn: linkedin.com/in/samia-kohler
- Instagram: @eventspheresolutions
- Website: eventspheresolutions.com (link back to main site)

## Non-Goals

- Not replacing or modifying the existing `/about` page or its "Meet the Founder"
  section.
- No CMS/dynamic content — plain static JSX page, matching how other pages in
  `app/` are built (e.g. `app/about/page.js`).
- No new photo asset — reuses `/images/founder.jpg`.
- No blog/press-list infrastructure — the Press section is a single static card, not
  a general-purpose press list.

## Open Items for Implementation Plan

- Exact Tailwind layout/spacing per section (implementation plan will follow the
  visual patterns already established in `app/about/page.js`).
- Whether "Speaking & Leadership" pull-quote uses a paraphrase or is cut if it
  doesn't read as a genuine quote — implementer should flag rather than fabricate
  a quote attributed as verbatim press.
