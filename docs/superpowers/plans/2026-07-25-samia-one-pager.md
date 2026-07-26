# Samia One-Pager Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the standalone `/samia` personal-brand landing page for Samia Kohler, per the approved design spec at `docs/superpowers/specs/2026-07-25-samia-one-pager-design.md`.

**Architecture:** A single static Next.js App Router page (`app/samia/page.js`), no new components, no site `Navbar`/`Footer` — the page owns its own minimal in-page nav. Reuses the existing ESS brand system (Tailwind classes already defined in `tailwind.config.js` / `app/globals.css`: `brand.purple`/`brand.pink`/`brand.orange`, `font-display`, `.btn-primary`) and the existing `/images/founder.jpg` asset.

**Tech Stack:** Next.js 14 (App Router), React 18, Tailwind CSS. No test framework exists in this repo (no Jest/Vitest, no `*.test.*` files) — verification is `next build` (compile/type correctness) plus a manual Playwright screenshot pass (Playwright is already a devDependency) for visual QA, matching how the rest of this site is verified.

## Global Constraints

- Route must be `app/samia/page.js` (URL: `/samia`), per spec.
- No `Navbar`/`Footer` site components on this page — custom minimal nav only, per spec.
- Must reuse `/images/founder.jpg` — no new image asset, per spec.
- Brand colors only: `#6a256f` (purple), `#EF4561` (pink), `#F99F33` / `#E07B20` (orange), matching existing usage in `app/about/page.js`.
- Headings use `font-display` (Montserrat); body text uses default `font-sans` (Inter) — per `app/globals.css`.
- Do not modify `/about` or any other existing page. **Amended after Task 2 QA:** `app/layout.js` unconditionally renders the sitewide `Navbar`/`Footer` around every route, which was missed during planning and violates "no site Navbar/Footer on `/samia`." The user approved a route-group restructure (Task 3 below) to fix this: existing routes move under `app/(site)/` (file moves only, URLs and page content unchanged) so they keep `Navbar`/`Footer` via a new `app/(site)/layout.js`, while `/samia` stays outside that group and gets none. This supersedes the "do not modify other pages" constraint for the file-move mechanics only — no existing page's content/behavior changes.
- Do not present the "underestimated" line as a verbatim press quote — per spec, it's paraphrased from Samia's notes, not from the CanvasRebel article.

---

### Task 1: Build the `/samia` page

**Files:**
- Create: `app/samia/page.js`

**Interfaces:**
- Consumes: `next/image` (`Image`), `next/link` (`Link`), existing global classes `.btn-primary` from `app/globals.css`, existing asset `/images/founder.jpg` (already present in repo, already used in `app/about/page.js:183`).
- Produces: default-exported React component `SamiaPage`, plus an exported `metadata` object (Next.js App Router convention — see `app/about/page.js:5-19` for the existing pattern this follows).

- [ ] **Step 1: Create the page file with full content**

Create `app/samia/page.js`:

```jsx
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Samia Kohler — Founder & CEO, Event Sphere Solutions',
  description: '18 years building private-events revenue for hospitality — now building the platform for it. Book Samia Kohler for your next podcast or panel.',
  openGraph: {
    title: 'Samia Kohler — Founder & CEO, Event Sphere Solutions',
    description: '18 years building private-events revenue for hospitality — now building the platform for it.',
    images: [{ url: '/images/founder.jpg', width: 1200, height: 630, alt: 'Samia Kohler' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samia Kohler — Founder & CEO, Event Sphere Solutions',
    description: '18 years building private-events revenue for hospitality — now building the platform for it.',
    images: ['/images/founder.jpg'],
  },
}

const navLinks = [
  { href: '#story', label: 'Story' },
  { href: '#speaking', label: 'Speaking' },
  { href: '#press', label: 'Press' },
  { href: '#contact', label: 'Contact' },
]

export default function SamiaPage() {
  return (
    <>
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-display font-extrabold text-[#6a256f] tracking-tight">
            Samia Kohler
          </a>
          <nav className="hidden sm:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-gray-600 hover:text-[#6a256f] transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn-primary !px-5 !py-2 text-sm">
            Book Me
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="py-16 md:py-24 bg-gray-50 scroll-mt-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[280px_1fr] gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-72 md:h-80 mx-auto w-72 md:w-full">
            <Image
              src="/images/founder.jpg"
              alt="Samia Kohler"
              fill
              className="object-cover"
              style={{ objectPosition: '50% 8%' }}
              priority
            />
          </div>
          <div>
            <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Founder &amp; CEO, Event Sphere Solutions · Phoenix, AZ
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-[#6a256f] mb-6 leading-tight">
              Samia Kohler
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
              18 years building private-events revenue for hospitality — now building the
              platform for it.
            </p>
            <a href="#contact" className="btn-primary">
              Book Me to Speak
            </a>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Story</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[#6a256f] mb-8">
            I didn&apos;t come into hospitality from the outside — I was born into it.
          </h2>
          <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
            <p>
              My grandmother was a cook. My mother owns a catering company and has produced
              festivals and large-scale events for years. I grew up around the pressure and
              choreography of live events before I even had words for what I was absorbing.
            </p>
            <p>
              That turned into a career: 18 years working inside venues across Europe,
              Shanghai, Hong Kong, and Phoenix. Everywhere I went, I saw the same thing —
              venues underperforming on private events revenue, not because of low demand, but
              because they lacked the systems and infrastructure to capture it. I&apos;d walk
              in, fix that gap, and move the business forward. I did that over and over, for
              other people&apos;s companies.
            </p>
            <p>
              Starting Event Sphere Solutions wasn&apos;t a calculated pivot. It came out of a
              breaking point. I was at a company whose values no longer matched mine, and I hit
              a wall — not just tired, genuinely depleted. In that moment I had the clearest
              thought of my career: I&apos;d spent nearly two decades solving this exact problem
              for other people while capping my own potential. I had the expertise, the track
              record, the instinct. Why was I lending it out instead of building with it?
            </p>
          </div>
          <blockquote className="mt-10 border-l-4 border-[#EF4561] pl-6 text-xl font-display font-semibold text-[#6a256f] leading-snug">
            &ldquo;Starting Event Sphere Solutions wasn&apos;t a calculated pivot. It was an act
            of finally trusting myself enough to stop giving my best to others.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* What I Built: SPHERE */}
      <section className="py-20 bg-[#6a256f] text-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[#F99F33] text-xs font-bold uppercase tracking-widest mb-3">
            What I Built
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight mb-10 max-w-2xl">
            SPHERE — the private events sales platform hospitality didn&apos;t have.
          </h2>
          <div className="grid md:grid-cols-[1fr_260px] gap-12 items-start">
            <div className="space-y-5 text-white/80 leading-relaxed text-lg">
              <p>
                Venues lose a minimum of $250,000 a year in private events revenue — not from
                lack of space or lack of interest, but from lack of sales infrastructure.
                Inquiries go unanswered. Follow-up doesn&apos;t happen. Proposals are an
                afterthought or arrive too late.
              </p>
              <p>
                SPHERE is our private events sales solution for restaurants, bars, hotels, and
                breweries — automated proposals, 360° virtual tours, BEO generation,
                e-signatures, and pipeline management, backed by a dedicated expert sales team
                who can close bookings on a venue&apos;s behalf.
              </p>
              <p className="font-semibold text-white">
                In hospitality, human connection isn&apos;t a nice extra — it&apos;s the actual
                product. AI stays in the background, quietly clearing away the administrative
                friction that eats up a team&apos;s time.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 text-center border border-white/15">
              <div className="text-5xl font-extrabold font-display text-[#F99F33] leading-none mb-3">
                189%+
              </div>
              <div className="text-white/70 text-sm font-semibold uppercase tracking-widest">
                Avg. increase in private event bookings
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking & Leadership */}
      <section id="speaking" className="py-20 bg-gray-50 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            Speaking &amp; Leadership
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[#6a256f] mb-6">
            Women in Tech &amp; Leadership
          </h2>
          <div className="space-y-5 text-gray-600 leading-relaxed text-lg mb-8">
            <p>
              I&apos;ve spent my career building in two male-dominated worlds at once —
              hospitality and tech. I&apos;ve walked into boardrooms, ownership meetings, and
              investor pitches where I was consistently the only woman, and often the only one
              who&apos;d actually worked the floor. That&apos;s never been a deterrent.
              It&apos;s been fuel.
            </p>
            <p>
              My resilience isn&apos;t tied to one story — it&apos;s constitutional, built daily
              across years of new countries, new cultures, and rooms where I had to prove I
              belonged. I&apos;ve rebuilt after professional betrayals, after burnout, after
              giving everything to something that didn&apos;t give it back — and come out
              stronger every time.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6a256f] via-[#EF4561] to-[#F99F33] flex-shrink-0" />
            <div>
              <div className="font-bold text-[#6a256f]">AZ Tech Week — Panel</div>
              <div className="text-gray-600 text-sm">Women in Tech and Leadership</div>
            </div>
          </div>
        </div>
      </section>

      {/* Press */}
      <section id="press" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#E07B20] text-xs font-bold uppercase tracking-[0.2em] mb-3">Press</p>
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-[#6a256f] mb-8">
            Featured
          </h2>
          <a
            href="https://canvasrebel.com/meet-samia-kohler/"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-all"
          >
            <div className="text-[#E07B20] text-xs font-bold uppercase tracking-widest mb-3">
              CanvasRebel Magazine · July 2026
            </div>
            <div className="text-xl font-bold text-[#6a256f] mb-4">Meet Samia Kohler</div>
            <p className="text-gray-600 italic leading-relaxed">
              &ldquo;I genuinely believe that the most difficult path is usually the one worth
              taking.&rdquo;
            </p>
            <span className="inline-block mt-4 text-sm font-semibold text-[#6a256f]">
              Read the feature →
            </span>
          </a>
        </div>
      </section>

      {/* Contact / Booking */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white text-center scroll-mt-16"
      >
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-6">
            Book Me for Your Podcast or Panel
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Speaking on women in tech and leadership, building a hospitality-tech company from
            the floor up, and what it takes to bet on yourself.
          </p>
          <a
            href="mailto:hello@eventspheresolutions.com"
            className="bg-white text-[#E07B20] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors inline-block shadow-lg mb-8"
          >
            hello@eventspheresolutions.com
          </a>
          <div className="flex items-center justify-center gap-6 text-sm font-semibold">
            <a
              href="https://linkedin.com/in/samia-kohler"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://instagram.com/eventspheresolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Instagram
            </a>
            <Link href="/" className="hover:underline">
              eventspheresolutions.com
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Verify the project builds cleanly**

Run: `npm run build`
Expected: Build completes with no errors and lists `/samia` in the route output (look for a line like `○ /samia` in the build summary).

- [ ] **Step 3: Commit**

```bash
git add app/samia/page.js
git commit -m "$(cat <<'EOF'
Add /samia personal one-pager for podcast/panel outreach

Standalone landing page for Samia Kohler modeled on jetsetjade.com,
per docs/superpowers/specs/2026-07-25-samia-one-pager-design.md.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Visual QA pass

**Files:**
- Modify (if issues found): `app/samia/page.js`

**Interfaces:**
- Consumes: the running dev server started by `npm run dev` (default `http://localhost:3000`), the `/samia` route produced by Task 1.
- Produces: no new files — this task only validates and, if needed, patches Task 1's output.

- [ ] **Step 1: Start the dev server**

Run: `npm run dev` (leave running in the background)
Expected: Server starts and logs `Local: http://localhost:3000`

- [ ] **Step 2: Screenshot desktop viewport with Playwright**

```bash
npx playwright screenshot --viewport-size=1440,1200 --full-page http://localhost:3000/samia /tmp/samia-desktop.png
```

Expected: PNG saved with no errors; open it and confirm — nav bar renders, hero photo loads (`/images/founder.jpg` not broken), all 7 sections present in order (Nav, Hero, Story, SPHERE, Speaking, Press, Contact), gradient/purple/orange brand colors render correctly, no layout overlap.

- [ ] **Step 3: Screenshot mobile viewport with Playwright**

```bash
npx playwright screenshot --viewport-size=390,844 --full-page http://localhost:3000/samia /tmp/samia-mobile.png
```

Expected: PNG saved; open it and confirm — nav links collapse correctly (only wordmark + "Book Me" visible per the `hidden sm:flex` class), hero image/text stack vertically, no horizontal overflow, all sections readable.

- [ ] **Step 4: Verify all links resolve**

Manually check in the screenshots or by clicking in a browser at `http://localhost:3000/samia`:
- `#story`, `#speaking`, `#press`, `#contact` anchors scroll to the correct section
- CanvasRebel press link opens `https://canvasrebel.com/meet-samia-kohler/`
- `mailto:hello@eventspheresolutions.com` link is present and correctly formatted
- LinkedIn (`https://linkedin.com/in/samia-kohler`) and Instagram (`https://instagram.com/eventspheresolutions`) links are present
- Footer `eventspheresolutions.com` link routes to `/`

Expected: All links present with correct hrefs (already true from Task 1's code — this step confirms nothing was mistyped).

- [ ] **Step 5: Fix any visual issues found**

If Steps 2-4 surfaced problems (broken image, overlapping text, broken link), edit `app/samia/page.js` to fix them, then re-run Steps 2-4 until clean.

- [ ] **Step 6: Commit any fixes**

Only if Step 5 made changes:

```bash
git add app/samia/page.js
git commit -m "$(cat <<'EOF'
Fix visual issues on /samia one-pager found in QA pass

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

If no changes were needed in Step 5, skip this step — nothing to commit.

---

### Task 3: Isolate site chrome to a `(site)` route group

**Why:** Task 2's QA pass found that `app/layout.js` unconditionally renders `Navbar`/`Footer` around every route via `{children}`, so they bleed onto `/samia` even though `app/samia/page.js` never imports them. Fix approved by the user: move `Navbar`/`Footer` into a new `app/(site)/layout.js` that wraps only the existing site pages; `app/samia/page.js` stays outside that route group and gets no site chrome. Next.js route groups (`(name)`) do not affect URLs — every existing route keeps its exact current path.

**Files:**
- Modify: `app/layout.js` — remove `Navbar`/`Footer` usage, keep everything else (metadata, JSON-LD schema, Apollo scripts) unchanged.
- Create: `app/(site)/layout.js` — new nested layout rendering `Navbar` + `main` + `Footer` around `{children}`.
- Move (via `git mv`, content unchanged): `app/page.js`, `app/about/`, `app/blog/`, `app/contact/`, `app/founding-partner/`, `app/platform/`, `app/pricing/`, `app/services/` → same paths under `app/(site)/`.
- Do not move: `app/api/` (route handlers, not pages — unaffected by layout), `app/sitemap.js` (metadata route, doesn't consume `RootLayout`), `app/samia/` (must stay outside the group — that's the whole point), `app/globals.css`.

**Interfaces:**
- Consumes: existing `components/Navbar.jsx`, `components/Footer.jsx` (unchanged — only their call site moves).
- Produces: `app/(site)/layout.js` exports a default `SiteLayout({ children })` component. No other task depends on this export's name (nothing imports it directly — Next.js wires it in by file convention).

- [ ] **Step 1: Move existing routes into the `(site)` route group**

```bash
mkdir -p "app/(site)"
git mv app/page.js "app/(site)/page.js"
git mv app/about "app/(site)/about"
git mv app/blog "app/(site)/blog"
git mv app/contact "app/(site)/contact"
git mv app/founding-partner "app/(site)/founding-partner"
git mv app/platform "app/(site)/platform"
git mv app/pricing "app/(site)/pricing"
git mv app/services "app/(site)/services"
```

Expected: `git status` shows each as a rename (`R`), not a delete+add — confirms content is untouched, only the path changed. Verify no relative (`../`) imports exist that would break from the new depth (this repo already uses only `@/*` absolute imports per `jsconfig.json`, so none should):

```bash
grep -rn "from '\.\./" "app/(site)"
```

Expected: no output.

- [ ] **Step 2: Create the new site-group layout**

Create `app/(site)/layout.js`:

```jsx
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Strip `Navbar`/`Footer` out of the root layout**

Modify `app/layout.js` — remove the `Navbar`/`Footer` imports and their usage, and render `{children}` directly instead of wrapping it in `<main>`. The full resulting file:

```jsx
import './globals.css'
import Script from 'next/script'

export const metadata = {
  metadataBase: new URL('https://eventspheresolutions.com'),
  title: {
    default: 'Sphere | Private Event Sales Platform for Hospitality',
    template: '%s | Sphere by Event Sphere Solutions',
  },
  description: 'Sphere helps restaurants, bars, and venues protect and grow their private event sales — instant proposals, digital BEOs, and AI that responds 24/7. Built for hospitality. Not adapted for it.',
  keywords: 'private event sales platform, restaurant event booking software, venue event management, private dining booking system, hospitality event software, BEO software, event sales automation, private event CRM',
  openGraph: {
    title: 'Sphere | Private Event Sales Platform for Hospitality',
    description: 'Sphere helps restaurants, bars, and venues protect and grow their private event sales — instant proposals, digital BEOs, and AI that responds 24/7. Built for hospitality. Not adapted for it.',
    url: 'https://eventspheresolutions.com',
    siteName: 'Sphere by Event Sphere Solutions',
    type: 'website',
    images: [
      {
        url: '/feature-image.png',
        width: 1200,
        height: 630,
        alt: 'Sphere — Private Event Sales Platform for Hospitality',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sphere | Private Event Sales Platform for Hospitality',
    description: 'Sphere helps restaurants, bars, and venues protect and grow their private event sales. Built for hospitality. Not adapted for it.',
    images: ['/feature-image.png'],
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Event Sphere Solutions',
  url: 'https://eventspheresolutions.com',
  logo: 'https://eventspheresolutions.com/images/logo-main.png',
  description: 'Sphere is the private event sales platform built for restaurants, bars, and venues. Not adapted for it. Built for it.',
  foundingDate: '2024',
  founder: {
    '@type': 'Person',
    name: 'Samia Kohler',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Phoenix',
    addressRegion: 'AZ',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.linkedin.com/company/event-sphere-solutions',
    'https://www.instagram.com/eventspheresolutions',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
        <Script id="apollo-form-enrichment" strategy="beforeInteractive">
          {`(function initApolloInbound(){var TIMEOUT_MS=15000;var timeoutId;var style=document.createElement('style');style.id='apollo-form-prehide-css';style.textContent='form:has(input[type="email" i]),form:has(input[name="email" i]),.hs-form-iframe{position:relative!important}form:has(input[type="email" i])::before,form:has(input[name="email" i])::before,.hs-form-iframe::before{content:"";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;width:50px;height:50px;margin:auto;border:2.5px solid #e1e1e1;border-top:2.5px solid #9ea3a6;border-radius:50%;animation:spin 1s linear infinite;background-color:transparent;pointer-events:auto;z-index:999999;opacity:1}form:has(input[type="email" i]) *,form:has(input[name="email" i]) *,.hs-form-iframe *{opacity:0!important;user-select:none!important;pointer-events:none!important}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}';(document.head || document.documentElement).appendChild(style);function cleanup(){var styleEl=document.getElementById('apollo-form-prehide-css');if(styleEl)styleEl.remove();if(timeoutId)clearTimeout(timeoutId);}timeoutId=setTimeout(function(){console.warn('[Apollo] Form enrichment timeout after 5s - revealing forms. Check network and console for errors.');cleanup();},TIMEOUT_MS);var nocache=Math.random().toString(36).substring(7);var script=document.createElement('script');script.src='https://assets.apollo.io/js/apollo-inbound.js?nocache=' + nocache;script.defer=true;script.onerror=function(){console.error('[Apollo] Failed to load form enrichment script');cleanup();};script.onload=function(){try{window.ApolloInbound.formEnrichment.init({appId: '6a28e16fc77cc3000cb78b76',onReady: function(){cleanup();},onError: function(err){console.error('[Apollo] Form enrichment init error:',err);cleanup();}});}catch(err){console.error('[Apollo] Error initializing form enrichment:',err);cleanup();}};document.head.appendChild(script);})();`}
        </Script>
        <Script id="apollo-tracker" strategy="afterInteractive">
          {`function initApollo(){var n=Math.random().toString(36).substring(7),o=document.createElement("script");
o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
o.onload=function(){window.trackingFunctions.onLoad({appId:"6a27294c9521fc0018ce08b6"})},
document.head.appendChild(o)}initApollo();`}
        </Script>
      </body>
    </html>
  )
}
```

This is character-for-character the existing file with only the `Navbar`/`Footer` import lines and JSX removed, and `<main>{children}</main>` replaced with bare `{children}` — every other line (metadata, schema, both Script blocks) is unchanged.

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: Build completes with no errors. Route output lists the same URLs as before (`/`, `/about`, `/blog`, `/blog/[slug]`, `/contact`, `/founding-partner`, `/platform`, `/pricing`, `/services`, `/samia`, `/sitemap.xml`, `/api/contact`, `/api/founding-partner`) — route groups don't add path segments, so no URL changes.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Isolate site Navbar/Footer to a (site) route group

/samia needs no sitewide chrome. Moves existing routes under
app/(site)/ (URLs unchanged) with their own layout carrying
Navbar/Footer; root layout now renders children directly.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Re-verify visual QA on `/samia` and unaffected routes

**Why:** Task 2's original QA pass was blocked by the chrome-bleed issue Task 3 just fixed. This re-runs that verification now that `/samia` has no site chrome, plus a quick spot-check that Task 3's restructure didn't break any existing route.

**Files:** None expected — verification only. Modify `app/samia/page.js` only if this pass finds a real remaining issue.

- [ ] **Step 1: Start the dev server**

Run: `npm run dev` (leave running in the background)

- [ ] **Step 2: Screenshot `/samia` desktop and mobile**

```bash
npx playwright screenshot --viewport-size=1440,1200 --full-page http://localhost:3000/samia /tmp/samia-desktop.png
npx playwright screenshot --viewport-size=390,844 --full-page http://localhost:3000/samia /tmp/samia-mobile.png
```

Expected: Open both PNGs and confirm — **no sitewide Navbar or Footer visible**, only the page's own minimal nav at the top and its own contact section at the bottom. All 7 sections present, brand colors correct, no layout overlap, mobile nav collapses correctly.

- [ ] **Step 3: Verify all `/samia` links resolve**

Same checklist as original Task 2 Step 4: `#story`/`#speaking`/`#press`/`#contact` anchors, CanvasRebel link, `mailto:` link, LinkedIn, Instagram, footer link to `/`.

- [ ] **Step 4: Spot-check one moved route still renders its chrome correctly**

```bash
npx playwright screenshot --viewport-size=1440,1200 --full-page http://localhost:3000/about /tmp/about-check.png
```

Expected: `/about` still shows the sitewide `Navbar` at top and `Footer` at bottom (proving `app/(site)/layout.js` is wired correctly for the moved routes).

- [ ] **Step 5: Fix any issues found, otherwise report clean**

If Steps 2-4 surface problems, fix them (in `app/samia/page.js`, `app/(site)/layout.js`, or `app/layout.js` as appropriate), re-verify, then commit:

```bash
git add -A
git commit -m "$(cat <<'EOF'
Fix issues found in post-restructure QA pass

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

If nothing needed fixing, skip the commit — nothing to commit.

---

## Deployment Note

Per project convention (push to `main` → Vercel auto-deploy), the page goes live at `eventspheresolutions.com/samia` once these commits are pushed to `main`. This plan does not include a push step — confirm with the user before pushing, per standing git safety practice.
