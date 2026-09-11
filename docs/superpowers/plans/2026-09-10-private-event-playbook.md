# Private Event Lead Generation Playbook (Download) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a `/playbook` landing page that captures a visitor's name+email and, on submit, unlocks a branded, print-ready "Private Event Lead Generation Playbook" guide — a free lead magnet for the marketing site.

**Architecture:** Static print-styled HTML file (same pattern as the existing `founding-partner-one-pager.html`) served from `/public`, gated behind a short client-side form that POSTs to a new Resend-backed API route. No database — leads are captured via email notification only, matching `/api/contact`.

**Tech Stack:** Next.js 14 App Router, React client components, Resend (already a dependency, `RESEND_API_KEY` already configured in Vercel), Tailwind for the React page/form, plain CSS for the static guide file.

## Global Constraints

- No bracket placeholders in the guide content — it must read as a finished document, not a fill-in template (per spec).
- Match existing brand tokens exactly: `--purple: #6a256f`, `--purple-dark: #2d0a35`, `--orange: #E07B20`, `--red: #EF4561`, `--dark: #111827`, Inter + PT Serif fonts (see `public/founding-partner-one-pager.html`).
- Follow the `/api/contact` pattern for the API route: Resend, `from: 'Event Sphere Solutions <hello@eventspheresolutions.com>'`, JSON body validation, `Response.json({ error }, { status: 400/500 })` on failure.
- No automated test framework exists in this repo — verification is manual (visual check in browser + curl for the API route), matching how `founding-partner`/`contact` were built.

---

### Task 1: Static playbook guide (`public/private-event-lead-gen-playbook.html`)

**Files:**
- Create: `public/private-event-lead-gen-playbook.html`

**Interfaces:**
- Produces: a standalone static HTML file reachable at `/private-event-lead-gen-playbook.html`, opened via `window.open('/private-event-lead-gen-playbook.html', '_blank')` or a plain link from Task 3's form and Task 4's page. No JS exports — pure static asset.

- [ ] **Step 1: Create the file with full content and styling**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Private Event Lead Generation Playbook — Event Sphere Solutions</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=PT+Serif:wght@400;700&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --purple: #6a256f;
      --purple-dark: #2d0a35;
      --purple-mid: #4a1555;
      --orange: #E07B20;
      --orange-light: #F99F33;
      --red: #EF4561;
      --dark: #111827;
      --gray: #444;
      --light-gray: #f5f5f7;
    }

    body {
      font-family: 'Inter', sans-serif;
      color: var(--dark);
      background: #e8e8e8;
      font-size: 10pt;
      line-height: 1.5;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      margin: 0 auto 24px;
      background: white;
      padding: 16mm 18mm;
      position: relative;
    }
    .page:last-child { margin-bottom: 0; }

    @media print {
      body { margin: 0; background: white; }
      .page { width: 100%; min-height: 0; margin: 0; page-break-after: always; }
      .page:last-child { page-break-after: auto; }
      .no-print { display: none !important; }
    }

    /* ── Print Bar ── */
    .print-bar {
      background: #f0f0f0;
      padding: 11px 24px;
      text-align: center;
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      justify-content: center;
      gap: 12px;
    }
    .print-btn {
      background: var(--purple);
      color: white;
      border: none;
      padding: 9px 26px;
      border-radius: 24px;
      font-size: 9.5pt;
      font-weight: 700;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
    }
    .print-btn:hover { background: var(--purple-mid); }
    .back-btn {
      background: var(--dark);
      color: white;
      border: none;
      padding: 9px 22px;
      border-radius: 24px;
      font-size: 9.5pt;
      font-weight: 600;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      text-decoration: none;
      display: inline-block;
    }

    /* ── Cover ── */
    .cover { display: flex; flex-direction: column; height: 265mm; }
    .cover-badge {
      align-self: flex-start;
      background: var(--orange);
      color: white;
      font-size: 8pt;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 6px 16px;
      border-radius: 20px;
      margin-bottom: 24px;
    }
    .cover-eyebrow {
      font-size: 9pt;
      font-weight: 800;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--orange);
      margin-bottom: 14px;
    }
    .cover-title {
      font-family: 'PT Serif', serif;
      font-size: 40pt;
      font-weight: 700;
      color: var(--dark);
      line-height: 1.1;
      margin-bottom: 18px;
      max-width: 480px;
    }
    .cover-title span {
      background: linear-gradient(90deg, var(--purple), var(--red));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .cover-sub {
      font-size: 12pt;
      color: #555;
      max-width: 420px;
      line-height: 1.6;
      margin-bottom: auto;
    }
    .cover-pillars {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 10px;
      margin-top: 40px;
    }
    .cover-pillar {
      border: 1.5px solid #e8e8e8;
      border-radius: 10px;
      padding: 12px 10px;
      text-align: center;
    }
    .cover-pillar-num {
      font-family: 'PT Serif', serif;
      font-size: 14pt;
      font-weight: 700;
      color: var(--orange);
      display: block;
      margin-bottom: 4px;
    }
    .cover-pillar span.label { font-size: 7.5pt; font-weight: 700; color: var(--dark); display: block; line-height: 1.3; }
    .cover-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      padding-top: 18px;
      border-top: 1px solid #eee;
    }
    .cover-footer img { height: 32px; width: auto; }
    .cover-footer span { font-size: 8pt; color: #888; }

    /* ── Content pages ── */
    .page-eyebrow {
      font-size: 7.5pt;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--orange);
      margin-bottom: 6px;
    }
    h1.section-title {
      font-family: 'PT Serif', serif;
      font-size: 22pt;
      font-weight: 700;
      color: var(--dark);
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 3px solid var(--orange);
    }
    h2 {
      font-family: 'PT Serif', serif;
      font-size: 13.5pt;
      font-weight: 700;
      color: var(--dark);
      margin: 18px 0 8px;
    }
    h2:first-of-type { margin-top: 0; }
    h3 {
      font-family: 'PT Serif', serif;
      font-size: 11pt;
      font-weight: 700;
      color: var(--purple);
      margin: 12px 0 6px;
    }
    p { color: #444; font-size: 9.5pt; line-height: 1.65; margin-bottom: 8px; }
    p:last-child { margin-bottom: 0; }

    ul.check-list, ol.step-list { list-style: none; margin-bottom: 10px; }
    ul.check-list li {
      font-size: 9.5pt;
      color: #444;
      line-height: 1.55;
      padding: 3px 0;
      display: flex;
      gap: 8px;
      align-items: flex-start;
    }
    ul.check-list li::before {
      content: '✓';
      color: var(--purple);
      font-weight: 800;
      flex-shrink: 0;
    }
    ol.step-list { counter-reset: step; }
    ol.step-list li {
      counter-increment: step;
      font-size: 9.5pt;
      color: #444;
      line-height: 1.55;
      padding: 4px 0 4px 30px;
      position: relative;
    }
    ol.step-list li::before {
      content: counter(step);
      position: absolute;
      left: 0;
      top: 3px;
      width: 20px; height: 20px;
      border-radius: 50%;
      background: var(--orange);
      color: white;
      font-size: 8.5pt;
      font-weight: 700;
      display: flex; align-items: center; justify-content: center;
    }

    .callout {
      background: #faf7ff;
      border-left: 4px solid var(--purple);
      border-radius: 6px;
      padding: 10px 14px;
      margin: 10px 0;
      font-size: 8.5pt;
      color: #555;
    }
    .callout strong { color: var(--purple); }

    table.data-table { width: 100%; border-collapse: collapse; margin: 10px 0 14px; font-size: 8.5pt; }
    table.data-table th {
      background: var(--purple);
      color: white;
      text-align: left;
      padding: 8px 10px;
      font-size: 7.5pt;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    table.data-table td { padding: 8px 10px; border-bottom: 1px solid #eee; color: #444; vertical-align: top; }
    table.data-table tr:nth-child(even) td { background: #faf7ff; }

    .format-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 10px 0 14px; }
    .format-card { border: 1.5px solid #e8e8e8; border-radius: 10px; padding: 12px; }
    .format-card h3 { margin-top: 0; font-size: 10pt; }
    .format-card p { font-size: 8pt; }
    .format-card .cta-line { margin-top: 6px; font-size: 7.5pt; color: var(--orange); font-weight: 700; }

    .page-footer {
      position: absolute;
      bottom: 10mm;
      left: 18mm;
      right: 18mm;
      display: flex;
      justify-content: space-between;
      font-size: 7pt;
      color: #999;
      border-top: 1px solid #eee;
      padding-top: 8px;
    }

    .cta-box {
      background: linear-gradient(135deg, var(--purple-dark) 0%, var(--purple-mid) 50%, #3a0e4a 100%);
      border-radius: 12px;
      padding: 24px 28px;
      margin-top: 20px;
    }
    .cta-box h2 { color: white; margin-top: 0; }
    .cta-box p { color: rgba(255,255,255,0.7); }
    .cta-box a {
      display: inline-block;
      margin-top: 10px;
      background: var(--orange);
      color: white;
      font-weight: 700;
      font-size: 9pt;
      padding: 10px 22px;
      border-radius: 24px;
      text-decoration: none;
    }
  </style>
</head>
<body>

  <!-- Print Bar -->
  <div class="print-bar no-print">
    <a href="/playbook" class="back-btn">← Back to Website</a>
    <button class="print-btn" onclick="window.print()">⬇ Save as PDF / Print</button>
  </div>

  <!-- Page 1: Cover -->
  <div class="page cover">
    <div class="cover-badge">Free Guide</div>
    <div class="cover-eyebrow">Event Sphere Solutions</div>
    <h1 class="cover-title">The Private Event<br/>Lead Generation <span>Playbook</span></h1>
    <p class="cover-sub">A step-by-step system for restaurants, bars, breweries, boutique hotels, country clubs, and other hospitality venues to generate qualified private-event inquiries — every day.</p>
    <div class="cover-pillars">
      <div class="cover-pillar"><span class="cover-pillar-num">1</span><span class="label">PR &amp; Media</span></div>
      <div class="cover-pillar"><span class="cover-pillar-num">2</span><span class="label">Social + CTA System</span></div>
      <div class="cover-pillar"><span class="cover-pillar-num">3</span><span class="label">Email Marketing</span></div>
      <div class="cover-pillar"><span class="cover-pillar-num">4</span><span class="label">SEO</span></div>
      <div class="cover-pillar"><span class="cover-pillar-num">5</span><span class="label">Exposure Partners</span></div>
    </div>
    <div class="cover-footer">
      <img src="/images/logo-mark.png" alt="Event Sphere Solutions" />
      <span>eventspheresolutions.com</span>
    </div>
  </div>

  <!-- Page 2: How to Use / Objective / Pillars / Audience -->
  <div class="page">
    <div class="page-eyebrow">Getting Started</div>
    <h1 class="section-title">How to Use This Playbook</h1>

    <p>This playbook covers the same channel mix that works for any venue that books private events: PR, social content with a built-in call-to-action system, email, SEO, and exposure partners. The specific tactics shift by venue type — a brewery leans on taproom buyouts and beer flights, a hotel leans on banquet and meeting space, a bar leans on happy-hour buyouts and late-night private parties — but the underlying system is the same. Work through each section, adapt the notes marked <strong>by venue type</strong> to your own space, and route every channel through one tracked inquiry link so you can measure what's actually working.</p>

    <h2>Objective</h2>
    <p>Set a real target: a specific number of qualified private-event inquiries per day, routed through one tracked inquiry link, so every channel below can be measured against it.</p>

    <h2>1. Content Pillars</h2>
    <ul class="check-list">
      <li><strong>Event setups</strong> — bare room to full build-out, timelapse-friendly</li>
      <li><strong>Food &amp; beverage</strong> — plating, pours, tasting moments, group gathering shots</li>
      <li><strong>Venue &amp; vibe</strong> — room, lighting, patio/outdoor space, ambience</li>
      <li><strong>Real events</strong> — host testimonials, guest reactions, group celebrations</li>
    </ul>

    <h2>2. Who You're Talking To</h2>
    <ul class="check-list">
      <li><strong>Celebrations</strong> — birthdays, engagements, showers, anniversaries. Mostly local hosts, often searching same-week to 6 weeks out.</li>
      <li><strong>Corporate</strong> — holiday parties, team offsites, client dinners. Planned 6–12 weeks out; decision-maker is typically an office manager or EA.</li>
      <li><strong>Weddings-adjacent</strong> — rehearsal dinners, welcome parties, bridal showers. Often found via listing platforms and Instagram, not search.</li>
    </ul>
    <div class="callout"><strong>By venue type:</strong> breweries and bars often add a "regulars &amp; groups" segment — birthday buyouts, trivia/league nights, watch parties.</div>

    <div class="page-footer"><span>Event Sphere Solutions</span><span>02</span></div>
  </div>

  <!-- Page 3: PR -->
  <div class="page">
    <div class="page-eyebrow">Section 3</div>
    <h1 class="section-title">Public Relations</h1>
    <p>Build third-party credibility and local visibility before you spend on ads, so paid traffic lands on a venue that already looks established.</p>

    <h2>Press &amp; Media</h2>
    <ul class="check-list">
      <li>Press release: new photography, new event packages, and whatever's distinct about your venue — private room capacity, patio, tap list or barrel room, banquet space.</li>
      <li>Media outreach to local and regional outlets — lifestyle magazines, newspapers, food and events blogs — pitched around your release cadence.</li>
      <li>Chamber and destination-marketing ties: your local Chamber of Commerce and destination-marketing organization or downtown partnership, for listings, member events, and co-promotion.</li>
    </ul>

    <h2>Influencer Partnerships</h2>
    <p>Host a private tasting or setup preview in exchange for a Reel + Story set. Prioritize local and regional food/lifestyle accounts likely to reach your actual audience — a handful of local food influencers, a couple of regional food/lifestyle accounts, and a local "things to do" or travel account go further than one big name with the wrong audience.</p>
    <div class="callout"><strong>Action:</strong> make sure every partner mentions group/private event booking, not just food and drink.</div>

    <div class="page-footer"><span>Event Sphere Solutions</span><span>03</span></div>
  </div>

  <!-- Page 4: Social -->
  <div class="page">
    <div class="page-eyebrow">Section 4</div>
    <h1 class="section-title">Social Media &amp; Content Design</h1>
    <p>Instagram is the primary channel for most venues (cross-post to Facebook, TikTok secondary). Every format below carries a specific call to action — nothing posts without one.</p>

    <h2>CTA Framework</h2>
    <table class="data-table">
      <tr><th>Intent</th><th>CTA</th><th>Destination</th></tr>
      <tr><td>High intent</td><td>"Book your event" / "Book a party" / "Reserve your date"</td><td>Link in bio / Book Now button to inquiry form</td></tr>
      <tr><td>Warm</td><td>"DM us your date"</td><td>Opens a chat; reply with the inquiry link</td></tr>
      <tr><td>Discovery</td><td>"See packages"</td><td>Link sticker / bio link to packages page</td></tr>
    </table>
    <div class="callout">Set your Instagram Business profile's action button to <strong>Book Now</strong>, pointed straight at your inquiry form — not your homepage. Tag every link with a UTM parameter so you know which format actually drives a submitted inquiry.</div>

    <h2>Content Formats</h2>
    <div class="format-grid">
      <div class="format-card">
        <h3>Feed Post</h3>
        <p>4:5 or 1:1, ~1×/week. Hero photography of past events; carousels for package comparisons; quote-card testimonials.</p>
        <div class="cta-line">CTA: caption's last line is always the ask — "Ready to book? Link in bio."</div>
      </div>
      <div class="format-card">
        <h3>Story</h3>
        <p>9:16, near-daily. Link sticker on every story, countdown stickers for limited dates, polls/quizzes for engagement.</p>
        <div class="cta-line">CTA: never post a story without a tap-through. Evergreen highlights: Packages · Real Events · FAQ · Reviews.</div>
      </div>
      <div class="format-card">
        <h3>Reel</h3>
        <p>9:16, 15–30 sec, ~2×/week. Hook in the first 2 seconds, timelapse build-out or plating close-up, trending audio.</p>
        <div class="cta-line">CTA: caption ends with a direct line + link-in-bio prompt, not just a hashtag.</div>
      </div>
    </div>

    <h2>Paid — Boosted Stories &amp; Posts</h2>
    <p>Split spend across IG/FB story and feed boosts plus local Google search. Set the ad objective to Messages or Website Conversions tied to your inquiry form — not reach or awareness. Retarget site visitors who viewed your events page but didn't submit. A simple weekly "Book your event" Story ad swiping through to your inquiry page is enough to start.</p>

    <div class="page-footer"><span>Event Sphere Solutions</span><span>04</span></div>
  </div>

  <!-- Page 5: Email + SEO -->
  <div class="page">
    <div class="page-eyebrow">Sections 5 &amp; 6</div>
    <h1 class="section-title">Email Marketing &amp; SEO</h1>

    <h2>Email Marketing</h2>
    <p>Send a monthly newsletter through your POS or CRM's email tool, featuring the venue, current packages, and a seasonal or limited-time offer. Set it up as an automated campaign on a fixed monthly send date so it runs without manual rebuilding every month.</p>

    <h2>SEO — Target Keywords</h2>
    <p>Work these into your events landing page, meta titles/descriptions, and image alt text — swap in your own city and venue type:</p>
    <ul class="check-list">
      <li>best party venue [your city]</li>
      <li>event space near me</li>
      <li>private dining [your city] <em>(or: taproom rental / bar buyout / banquet hall, depending on venue type)</em></li>
      <li>[your city] venue booking</li>
      <li>birthday venue [your city]</li>
      <li>corporate event space [your city]</li>
    </ul>

    <h2>Local SEO</h2>
    <ol class="step-list">
      <li>Google Business Profile: fresh photos monthly, correct categories, weekly posts, answer every Q&amp;A.</li>
      <li>Review generation: ask every host to leave a review within 48 hours of their event; respond to every review, good or bad.</li>
      <li>Dedicated /private-events landing page as the canonical link for every ad, bio, and listing.</li>
    </ol>

    <div class="page-footer"><span>Event Sphere Solutions</span><span>05</span></div>
  </div>

  <!-- Page 6: Partners + CTA -->
  <div class="page">
    <div class="page-eyebrow">Section 7</div>
    <h1 class="section-title">Partners for Exposure</h1>
    <table class="data-table">
      <tr><th>Platform</th><th>Why It Matters</th></tr>
      <tr><td>Your city's official destination/tourism site</td><td>Local credibility + backlink — the default first listing for any venue in the area.</td></tr>
      <tr><td>Your neighborhood or downtown district's visitor/merchant site</td><td>Puts you in front of the exact foot-traffic and event-shopping audience already nearby.</td></tr>
      <tr><td>Your state's office of tourism — city page</td><td>Reaches out-of-state visitors planning a trip who search "things to do in [your city]."</td></tr>
      <tr><td>Your state/regional restaurant or hospitality association</td><td>Industry directory + referral network — useful for corporate leads and cross-promotion with other members.</td></tr>
      <tr><td>Your city's Chamber of Commerce</td><td>Member directory doubles as its own listing/backlink, separate from any mixers in the PR plan.</td></tr>
    </table>

    <div class="cta-box">
      <h2>Want this system built and run for you?</h2>
      <p>Event Sphere Solutions built this playbook from real venue engagements — and we run this exact system for hospitality clients every day. If you'd rather have it implemented than DIY it, let's talk.</p>
      <a href="https://www.eventspheresolutions.com/contact">Book a Free Consultation →</a>
    </div>

    <div class="page-footer"><span>Event Sphere Solutions · eventspheresolutions.com</span><span>06</span></div>
  </div>

</body>
</html>
```

- [ ] **Step 2: Verify it renders correctly**

Run: `npm run dev` (if not already running), then open `http://localhost:3000/private-event-lead-gen-playbook.html` directly in a browser (it's a static file served from `/public`, no route needed).

Expected: 6 distinct page sections render top-to-bottom with a gray page-gap background, purple/orange branding, the CTA table and partners table render with borders, and clicking "⬇ Save as PDF / Print" opens the browser print dialog with each `.page` on its own printed sheet.

- [ ] **Step 3: Commit**

```bash
git add public/private-event-lead-gen-playbook.html
git commit -m "Add downloadable private-event lead generation playbook guide"
```

---

### Task 2: Lead-capture API route (`app/api/playbook/route.js`)

**Files:**
- Create: `app/api/playbook/route.js`

**Interfaces:**
- Consumes: `POST` body `{ name: string, email: string }` (JSON).
- Produces: `Response.json({ success: true })` on success (200), `Response.json({ error: string }, { status: 400 })` for missing fields, `Response.json({ error: string }, { status: 500 })` on send failure. Task 3's form calls this exact shape.

- [ ] **Step 1: Create the route**

```js
import { Resend } from 'resend'

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const body = await request.json()
    const { name, email } = body

    if (!name || !email) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const downloadUrl = 'https://www.eventspheresolutions.com/private-event-lead-gen-playbook.html'

    // Notify the Event Sphere team
    await resend.emails.send({
      from: 'Event Sphere Website <hello@eventspheresolutions.com>',
      to: 'hello@eventspheresolutions.com',
      replyTo: email,
      subject: `New Playbook Download — ${name}`,
      html: `
        <div style="font-family: Inter, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #222123; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #1a0f40 0%, #6a256f 60%, #1a0f40 100%); padding: 28px 40px; border-radius: 12px 12px 0 0;">
            <span style="color: white; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.7;">New Lead</span>
            <h1 style="color: white; margin: 6px 0 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">Playbook Download</h1>
            <p style="color: #E07B20; margin: 4px 0 0; font-size: 14px; font-weight: 600;">Event Sphere Solutions</p>
          </div>
          <div style="height: 4px; background: linear-gradient(90deg, #6a256f, #EF4561, #E07B20);"></div>
          <div style="padding: 20px 40px 32px;">
            <table style="width: 100%; border-collapse: collapse; background: #faf7ff; border-radius: 12px; overflow: hidden;">
              <tr style="background: #faf7ff;">
                <td style="padding: 12px 16px; font-weight: 600; color: #6a256f; font-size: 13px; width: 35%; border-bottom: 1px solid #f0ebf8;">Name</td>
                <td style="padding: 12px 16px; font-size: 13px; color: #333; border-bottom: 1px solid #f0ebf8;">${name}</td>
              </tr>
              <tr style="background: #ffffff;">
                <td style="padding: 12px 16px; font-weight: 600; color: #6a256f; font-size: 13px; width: 35%;">Email</td>
                <td style="padding: 12px 16px; font-size: 13px; color: #333;"><a href="mailto:${email}" style="color: #E07B20; text-decoration: none;">${email}</a></td>
              </tr>
            </table>
          </div>
          <div style="padding: 20px 40px; background: #1a0f40; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">
              Sent from eventspheresolutions.com/playbook
            </p>
          </div>
        </div>
      `,
    })

    // Confirmation email to the lead with the download link
    await resend.emails.send({
      from: 'Event Sphere Solutions <hello@eventspheresolutions.com>',
      to: email,
      subject: `Your Private Event Playbook is ready, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family: Inter, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #222123; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #1a0f40 0%, #6a256f 60%, #1a0f40 100%); padding: 28px 40px; border-radius: 12px 12px 0 0; text-align: center;">
            <img src="https://www.eventspheresolutions.com/images/logo-main.png" alt="Event Sphere Solutions" style="height: 60px; width: auto;" />
          </div>
          <div style="height: 4px; background: linear-gradient(90deg, #6a256f, #EF4561, #E07B20);"></div>
          <div style="padding: 40px 40px 32px;">
            <h2 style="margin: 0 0 16px; font-size: 26px; font-weight: 800; color: #222123; letter-spacing: -0.5px;">Hi ${name.split(' ')[0]}, here's your playbook 🎉</h2>
            <p style="color: #555; line-height: 1.7; margin: 0 0 24px; font-size: 15px;">
              Thanks for downloading the Private Event Lead Generation Playbook. Click below to open it — you can read it in your browser or save it as a PDF.
            </p>
            <div style="text-align: center; margin-bottom: 28px;">
              <a href="${downloadUrl}" target="_blank"
                style="background: linear-gradient(135deg, #6a256f, #EF4561, #E07B20); color: white; padding: 14px 32px; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 14px; display: inline-block;">
                Open Your Playbook →
              </a>
            </div>
            <p style="color: #555; font-size: 14px; margin: 0;">Want us to build and run this system for your venue? Just reply to this email.<br/>
            <strong style="color: #222123;">The Event Sphere Solutions Team</strong></p>
          </div>
          <div style="padding: 20px 40px; background: #1a0f40; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">
              © ${new Date().getFullYear()} Event Sphere Solutions · <a href="https://eventspheresolutions.com" style="color: #E07B20; text-decoration: none;">eventspheresolutions.com</a>
            </p>
          </div>
        </div>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Playbook email error:', error)
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify with curl against the dev server**

Run: `npm run dev`, then in another terminal:
```bash
curl -s -X POST http://localhost:3000/api/playbook \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"hello@eventspheresolutions.com"}'
```
Expected: `{"success":true}` and two emails land (check the Resend dashboard/logs or the inbox for `hello@eventspheresolutions.com`, since both send to/from that address in this test).

Also verify the validation branch:
```bash
curl -s -X POST http://localhost:3000/api/playbook \
  -H "Content-Type: application/json" -d '{"name":""}'
```
Expected: `{"error":"Missing required fields"}`

- [ ] **Step 3: Commit**

```bash
git add app/api/playbook/route.js
git commit -m "Add playbook lead-capture API route"
```

---

### Task 3: Lead-capture form component (`components/PlaybookLeadForm.jsx`)

**Files:**
- Create: `components/PlaybookLeadForm.jsx`

**Interfaces:**
- Consumes: `POST /api/playbook` with `{ name, email }`, expects `{ success: true }` or `{ error }` (from Task 2).
- Produces: default-exported React client component `PlaybookLeadForm`, no props. Task 4 renders `<PlaybookLeadForm />` directly.

- [ ] **Step 1: Create the component**

```jsx
'use client'
import { useState } from 'react'

const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#E07B20] focus:ring-2 focus:ring-[#E07B20]/20 transition-all bg-white placeholder:text-gray-400"
const labelClass = "block text-sm font-semibold text-[#222123] mb-1.5"

export default function PlaybookLeadForm() {
  const [form, setForm] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/playbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      alert('Something went wrong. Please email us at hello@eventspheresolutions.com')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-gradient-to-br from-[#6a256f]/5 to-[#E07B20]/5 border border-[#E07B20]/20 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#6a256f] to-[#E07B20] rounded-full flex items-center justify-center text-white text-2xl mb-6">✓</div>
        <h3 className="text-2xl font-bold text-[#222123] mb-3">You're all set, {form.name.split(' ')[0]}!</h3>
        <p className="text-gray-500 leading-relaxed max-w-sm mb-6">
          We've also emailed you a copy of the link. Click below to open your playbook now.
        </p>
        <a
          href="/private-event-lead-gen-playbook.html"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm px-8 py-3.5 inline-block"
        >
          Download Your Playbook →
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-xl shadow-black/5">
      <div className="space-y-5">
        <div>
          <label className={labelClass}>Full Name <span className="text-[#EF4561]">*</span></label>
          <input type="text" name="name" value={form.name} onChange={handleChange}
            placeholder="Jane Smith" className={`${inputClass} ${errors.name ? 'border-[#EF4561]' : ''}`} />
          {errors.name && <p className="text-[#EF4561] text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className={labelClass}>Email Address <span className="text-[#EF4561]">*</span></label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            placeholder="jane@yourvenue.com" className={`${inputClass} ${errors.email ? 'border-[#EF4561]' : ''}`} />
          {errors.email && <p className="text-[#EF4561] text-xs mt-1">{errors.email}</p>}
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-gradient-to-r from-[#6a256f] via-[#EF4561] to-[#E07B20] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all text-sm disabled:opacity-70">
          {loading ? 'Sending...' : 'Get the Free Playbook →'}
        </button>
        <p className="text-xs text-gray-400 text-center">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </form>
  )
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build` (or rely on Task 4's dev-server check, since this component isn't rendered anywhere until then — if building standalone, a quick sanity check is `npx next lint components/PlaybookLeadForm.jsx` if lint is configured, otherwise skip to Task 4's browser check).

- [ ] **Step 3: Commit**

```bash
git add components/PlaybookLeadForm.jsx
git commit -m "Add playbook lead-capture form component"
```

---

### Task 4: Landing page (`app/playbook/page.js`)

**Files:**
- Create: `app/playbook/page.js`

**Interfaces:**
- Consumes: `PlaybookLeadForm` default export from `components/PlaybookLeadForm.jsx` (Task 3).
- Produces: page rendered at route `/playbook`.

- [ ] **Step 1: Check how an existing simple page composes Navbar/Footer**

Run: `sed -n '1,40p' app/founding-partner/page.js` — confirms the exact import names and wrapper markup (`<Navbar />` / `<Footer />` imports, any top padding class to clear the fixed navbar) to mirror.

- [ ] **Step 2: Create the page**

```jsx
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PlaybookLeadForm from '@/components/PlaybookLeadForm'

export const metadata = {
  title: 'Free Playbook: Private Event Lead Generation | Event Sphere Solutions',
  description: 'Download the free Private Event Lead Generation Playbook — a step-by-step system covering PR, social content, email, SEO, and exposure partners for restaurants, bars, breweries, and hospitality venues.',
}

const pillars = [
  { num: '1', title: 'PR & Media', desc: 'Press releases, local media outreach, and influencer partnerships that build credibility before you spend on ads.' },
  { num: '2', title: 'Social + CTA System', desc: 'A content framework where every post, story, and reel carries a specific call to action.' },
  { num: '3', title: 'Email Marketing', desc: 'An automated monthly campaign that runs itself.' },
  { num: '4', title: 'SEO', desc: 'The keywords and local-search tactics that get your venue found.' },
  { num: '5', title: 'Exposure Partners', desc: 'The tourism sites, associations, and directories worth a listing.' },
]

export default function PlaybookPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-white">
        <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-block bg-[#E07B20] text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
              Free Guide
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[#222123] leading-tight mb-6">
              The Private Event Lead Generation Playbook
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              A step-by-step system for restaurants, bars, breweries, boutique hotels, country clubs, and other hospitality venues to generate qualified private-event inquiries — every day.
            </p>
            <div className="space-y-4">
              {pillars.map((p) => (
                <div key={p.num} className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-[#6a256f]/10 text-[#6a256f] font-bold font-display flex items-center justify-center flex-shrink-0">
                    {p.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#222123] text-sm">{p.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:sticky md:top-28">
            <PlaybookLeadForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
```

Note: adjust the top padding class (`pt-28`) and any wrapper structure to match whatever `app/founding-partner/page.js` actually uses if Step 1 reveals a different convention (e.g. a different fixed-navbar offset class) — keep visual consistency with the rest of the site.

- [ ] **Step 3: Verify end-to-end in the browser**

Run: `npm run dev`, open `http://localhost:3000/playbook`.

Expected: page renders with hero copy + 5 pillars on the left, form on the right. Submit with a real name + your own email → success state appears with a "Download Your Playbook →" button → clicking it opens `/private-event-lead-gen-playbook.html` in a new tab showing the guide from Task 1. Confirm both emails from Task 2 arrive.

- [ ] **Step 4: Commit**

```bash
git add app/playbook/page.js
git commit -m "Add /playbook landing page with lead-gated download"
```

---

### Task 5: Site integration — footer link and sitemap

**Files:**
- Modify: `components/Footer.jsx`
- Modify: `app/sitemap.js`

**Interfaces:**
- None (leaf task — only adds a nav link and a sitemap entry, no new exports).

- [ ] **Step 1: Add the footer link**

In `components/Footer.jsx`, in the "Company" column `<ul>` (currently ending with the Founding Partner `<li>`), add a new `<li>` right after the Blog link:

```jsx
              <li><Link href="/blog" className="hover:text-[#E07B20] transition-colors text-sm text-white/70">Blog</Link></li>
              <li><Link href="/playbook" className="hover:text-[#E07B20] transition-colors text-sm text-white/70">Free Playbook</Link></li>
              <li><Link href="/founding-partner" className="text-[#E07B20] font-semibold transition-colors text-sm">🏆 Founding Partner</Link></li>
```

(Replaces the existing two-line Blog/Founding-Partner sequence with the three-line version above — insert the new `Free Playbook` line between them.)

- [ ] **Step 2: Add the sitemap entry**

In `app/sitemap.js`, add a new entry to `staticRoutes` right after the `founding-partner` entry:

```js
    { url: `${baseUrl}/founding-partner`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/playbook`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
```

- [ ] **Step 3: Verify**

Run: `npm run dev`, load the homepage, scroll to the footer, confirm "Free Playbook" appears in the Company column and links to `/playbook`. Then check `http://localhost:3000/sitemap.xml` includes a `<url>` entry for `/playbook`.

- [ ] **Step 4: Commit**

```bash
git add components/Footer.jsx app/sitemap.js
git commit -m "Link the playbook download from the footer and sitemap"
```

---

### Task 6: Deploy

- [ ] **Step 1: Push to main**

```bash
git push origin main
```

Expected: Vercel picks up the push and auto-deploys (per this repo's existing deployment setup — push to `main` goes live).

- [ ] **Step 2: Verify live**

Once the Vercel deployment finishes, open `https://www.eventspheresolutions.com/playbook` and repeat the Task 4 Step 3 end-to-end check against production (submit the form with a real email, confirm the download opens and both emails arrive from the live `RESEND_API_KEY`).
