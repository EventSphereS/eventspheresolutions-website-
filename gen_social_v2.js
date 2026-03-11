const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = '/Users/eventspheresolutions/Desktop/Social Media Week 1/';

const brand = {
  purple: '#6a256f',
  pink: '#EF4561',
  orange: '#F99F33',
  dark: '#1a0a1e',
  white: '#FFFFFF',
};

async function shot(page, html, file, w, h) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, file), type: 'png' });
  console.log('✓', file);
}

// ─── DAY 1 · LinkedIn Launch · 1200×628 ─────────────────────────────────────
function day1() {
  return `<!DOCTYPE html><html><head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:1200px; height:628px; overflow:hidden; font-family:'Inter',sans-serif; background:#fff; }
    .wrap {
      width:100%; height:100%; display:flex; position:relative; overflow:hidden;
      background: linear-gradient(135deg, #1a0a1e 0%, #6a256f 60%, #EF4561 100%);
    }
    /* Big decorative circle */
    .circle1 {
      position:absolute; width:700px; height:700px; border-radius:50%;
      background: radial-gradient(circle, rgba(249,159,51,0.35) 0%, transparent 70%);
      right:-150px; top:-150px;
    }
    .circle2 {
      position:absolute; width:400px; height:400px; border-radius:50%;
      background: radial-gradient(circle, rgba(239,69,97,0.3) 0%, transparent 70%);
      left:-100px; bottom:-100px;
    }
    /* Left content */
    .left {
      flex:1; padding:56px 52px; display:flex; flex-direction:column; justify-content:space-between;
      position:relative; z-index:2;
    }
    .badge {
      display:inline-flex; align-items:center; gap:8px;
      background:rgba(249,159,51,0.18); border:1.5px solid rgba(249,159,51,0.5);
      color:#F99F33; font-size:11px; font-weight:700; letter-spacing:0.12em;
      text-transform:uppercase; padding:7px 16px; border-radius:100px;
      width:fit-content;
    }
    .badge .dot { width:7px; height:7px; border-radius:50%; background:#F99F33; animation:pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    .headline { flex:1; display:flex; flex-direction:column; justify-content:center; }
    .headline h1 {
      font-family:'Playfair Display',serif; font-size:68px; line-height:1.05;
      color:#fff; font-weight:900; margin-bottom:16px;
    }
    .headline h1 span { color:#F99F33; }
    .sub { color:rgba(255,255,255,0.65); font-size:15px; font-weight:500; line-height:1.5; max-width:380px; }
    .cta {
      display:inline-flex; align-items:center; gap:10px;
      background: linear-gradient(90deg, #F99F33, #EF4561);
      color:#fff; font-size:15px; font-weight:700; padding:14px 28px;
      border-radius:100px; width:fit-content; letter-spacing:0.02em;
    }
    /* Right panel */
    .right {
      width:380px; padding:56px 40px 56px 0; display:flex; flex-direction:column;
      justify-content:center; position:relative; z-index:2;
    }
    .list-title {
      color:rgba(255,255,255,0.5); font-size:10px; font-weight:700;
      letter-spacing:0.18em; text-transform:uppercase; margin-bottom:20px;
    }
    .feat {
      display:flex; align-items:center; gap:12px;
      padding:11px 0; border-bottom:1px solid rgba(255,255,255,0.08);
    }
    .feat:last-child { border-bottom:none; }
    .feat .icon { color:#F99F33; font-size:16px; width:22px; flex-shrink:0; }
    .feat span { color:rgba(255,255,255,0.85); font-size:13.5px; font-weight:500; }
    .logo-area {
      position:absolute; top:28px; right:40px;
      color:rgba(255,255,255,0.35); font-size:10px; font-weight:700;
      letter-spacing:0.2em; text-transform:uppercase; z-index:3;
    }
  </style>
  </head><body>
  <div class="wrap">
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="logo-area">EVENT SPHERE SOLUTIONS</div>
    <div class="left">
      <div class="badge"><span class="dot"></span>We're Live — V1</div>
      <div class="headline">
        <h1>The private<br>event platform<br><span>Arizona needed.</span></h1>
        <p class="sub">18 years of hospitality. One platform to stop the revenue leak. Built for restaurants, bars, venues & hotels.</p>
      </div>
      <div class="cta">DM "V1" — First 20 get 3 months free →</div>
    </div>
    <div class="right">
      <div class="list-title">What's in V1</div>
      ${[
        ['📋','Lead capture & tracking'],
        ['✍️','Branded proposals + e-signatures'],
        ['📄','Auto-generated BEOs & invoices'],
        ['💬','Team communication hub'],
        ['📧','Email campaigns + promo codes'],
        ['🌐','360° virtual venue tours'],
        ['📅','Smart calendar — no double bookings'],
      ].map(([ic,tx]) => `<div class="feat"><span class="icon">${ic}</span><span>${tx}</span></div>`).join('')}
    </div>
  </div>
  </body></html>`;
}

// ─── DAY 2 · Instagram Reel Thumbnail · 1080×1080 ───────────────────────────
function day2() {
  return `<!DOCTYPE html><html><head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:1080px; height:1080px; overflow:hidden; font-family:'Inter',sans-serif; }
    .wrap {
      width:100%; height:100%; display:flex; flex-direction:column;
      align-items:center; justify-content:center; position:relative; overflow:hidden;
      background: linear-gradient(160deg, #1a0a1e 0%, #6a256f 45%, #EF4561 80%, #F99F33 100%);
    }
    .bg-glow {
      position:absolute; width:900px; height:900px; border-radius:50%;
      background:radial-gradient(circle, rgba(249,159,51,0.2) 0%, transparent 65%);
      top:-200px; right:-200px;
    }
    .bg-glow2 {
      position:absolute; width:600px; height:600px; border-radius:50%;
      background:radial-gradient(circle, rgba(239,69,97,0.25) 0%, transparent 65%);
      bottom:-100px; left:-100px;
    }
    /* Diagonal stripe accent */
    .stripe {
      position:absolute; width:12px; height:100%; background:rgba(249,159,51,0.12);
      transform:rotate(15deg) translateX(320px); top:-50px;
    }
    .content { position:relative; z-index:2; text-align:center; padding:60px; }
    .label {
      display:inline-block; background:#F99F33; color:#fff;
      font-size:12px; font-weight:800; letter-spacing:0.15em; text-transform:uppercase;
      padding:8px 20px; border-radius:100px; margin-bottom:40px;
    }
    h1 {
      font-family:'Playfair Display',serif; font-weight:900;
      color:#fff; font-size:80px; line-height:1.05; margin-bottom:32px;
    }
    h1 .big { font-size:100px; color:#F99F33; display:block; }
    .sub {
      color:rgba(255,255,255,0.65); font-size:20px; font-weight:500;
      line-height:1.6; max-width:620px; margin:0 auto 50px;
    }
    .play {
      width:80px; height:80px; border-radius:50%;
      background:rgba(255,255,255,0.15); border:2px solid rgba(255,255,255,0.4);
      display:flex; align-items:center; justify-content:center; margin:0 auto 40px;
    }
    .play-arrow {
      width:0; height:0; border-top:18px solid transparent; border-bottom:18px solid transparent;
      border-left:30px solid #fff; margin-left:6px;
    }
    .tags { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; }
    .tag {
      background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.2);
      color:rgba(255,255,255,0.7); font-size:13px; font-weight:600;
      padding:8px 18px; border-radius:100px;
    }
    .logo {
      position:absolute; bottom:28px; left:0; right:0; text-align:center;
      color:rgba(255,255,255,0.3); font-size:11px; font-weight:700;
      letter-spacing:0.2em; text-transform:uppercase; z-index:3;
    }
  </style>
  </head><body>
  <div class="wrap">
    <div class="bg-glow"></div>
    <div class="bg-glow2"></div>
    <div class="stripe"></div>
    <div class="content">
      <div class="label">Platform Demo</div>
      <h1>Set up your<br>entire booking<br>pipeline in<br><span class="big">3 min.</span></h1>
      <p class="sub">Watch how Arizona venue owners are filling their calendars — fast.</p>
      <div class="play"><div class="play-arrow"></div></div>
      <div class="tags">
        <div class="tag">Free Trial</div>
        <div class="tag">No Credit Card</div>
        <div class="tag">Arizona</div>
      </div>
    </div>
    <div class="logo">Event Sphere Solutions · Arizona</div>
  </div>
  </body></html>`;
}

// ─── DAY 3 · LinkedIn Carousel Slide 1 · 1200×628 ───────────────────────────
function day3_slide1() {
  return `<!DOCTYPE html><html><head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:1200px; height:628px; overflow:hidden; font-family:'Inter',sans-serif; }
    .wrap {
      width:100%; height:100%; display:flex; align-items:center;
      position:relative; overflow:hidden; background:#fff;
    }
    .left-panel {
      width:52%; height:100%;
      background: linear-gradient(145deg, #1a0a1e 0%, #6a256f 100%);
      display:flex; flex-direction:column; justify-content:center;
      padding:64px 56px; position:relative; overflow:hidden;
    }
    .left-panel::after {
      content:''; position:absolute; right:-40px; top:0; bottom:0;
      width:80px; background:#fff;
      clip-path: polygon(40px 0, 100% 0, 100% 100%, 40px 100%, 0 50%);
    }
    .glow {
      position:absolute; width:500px; height:500px; border-radius:50%;
      background:radial-gradient(circle, rgba(249,159,51,0.2) 0%, transparent 70%);
      right:-150px; top:-150px; pointer-events:none;
    }
    .eyebrow {
      color:#F99F33; font-size:11px; font-weight:700; letter-spacing:0.18em;
      text-transform:uppercase; margin-bottom:20px;
    }
    h1 {
      font-family:'Playfair Display',serif; font-size:58px; font-weight:900;
      color:#fff; line-height:1.08; margin-bottom:24px;
    }
    h1 em { color:#F99F33; font-style:normal; }
    .sub { color:rgba(255,255,255,0.6); font-size:15px; line-height:1.6; max-width:340px; }
    .swipe {
      margin-top:36px; display:flex; align-items:center; gap:8px;
      color:rgba(255,255,255,0.45); font-size:12px; font-weight:600;
    }
    .arrow { font-size:18px; color:#F99F33; }
    .right-panel {
      flex:1; padding:48px 52px; display:flex; flex-direction:column; justify-content:center;
    }
    .stat-row { display:flex; gap:28px; margin-bottom:40px; }
    .stat {
      flex:1; background:linear-gradient(135deg, #6a256f08, #EF456108);
      border:1.5px solid #EF456120; border-radius:16px; padding:24px 20px; text-align:center;
    }
    .stat .num {
      font-family:'Playfair Display',serif; font-size:44px; font-weight:900;
      color:#6a256f; line-height:1;
    }
    .stat .lbl { color:#888; font-size:11px; font-weight:600; margin-top:6px; text-transform:uppercase; letter-spacing:0.08em; }
    .problem-title { color:#1a0a1e; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:0.12em; margin-bottom:16px; }
    .problems { display:flex; flex-direction:column; gap:10px; }
    .prob {
      display:flex; align-items:center; gap:12px;
      background:#f9f5ff; border-left:3px solid #EF4561; border-radius:0 10px 10px 0;
      padding:12px 16px;
    }
    .prob span { color:#444; font-size:13.5px; font-weight:500; }
    .logo {
      position:absolute; top:24px; right:36px;
      color:#ccc; font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase;
    }
    .slide-num {
      position:absolute; bottom:24px; right:36px;
      color:#ddd; font-size:11px; font-weight:600;
    }
  </style>
  </head><body>
  <div class="wrap">
    <div class="logo">EVENT SPHERE SOLUTIONS</div>
    <div class="slide-num">1 / 6</div>
    <div class="left-panel">
      <div class="glow"></div>
      <div class="eyebrow">The Problem Nobody's Talking About</div>
      <h1>Arizona venues are<br>losing <em>thousands</em><br>every month.</h1>
      <p class="sub">Private dining rooms, hotel ballrooms, event spaces — sitting empty while revenue walks out the door.</p>
      <div class="swipe"><span class="arrow">→</span> Swipe to see what's really happening</div>
    </div>
    <div class="right-panel">
      <div class="stat-row">
        <div class="stat"><div class="num">$2.5K</div><div class="lbl">Avg. event value</div></div>
        <div class="stat"><div class="num">189%</div><div class="lbl">Avg. sales increase</div></div>
      </div>
      <div class="problem-title">Sound familiar?</div>
      <div class="problems">
        ${[
          'Private room sits empty most weekends',
          'Leads fall through the inbox cracks',
          'No system to follow up or close deals',
          'Proposals sent manually, one by one',
        ].map(t => `<div class="prob"><span>❌ ${t}</span></div>`).join('')}
      </div>
    </div>
  </div>
  </body></html>`;
}

// ─── DAY 3 · LinkedIn Carousel Slide 2 · 1200×628 ───────────────────────────
function day3_slide2() {
  return `<!DOCTYPE html><html><head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:1200px; height:628px; overflow:hidden; font-family:'Inter',sans-serif; }
    .wrap {
      width:100%; height:100%; position:relative; overflow:hidden;
      background: linear-gradient(135deg, #1a0a1e 0%, #6a256f 50%, #EF4561 100%);
      display:flex; flex-direction:column; align-items:center; justify-content:center;
    }
    .glow {
      position:absolute; width:800px; height:800px; border-radius:50%;
      background:radial-gradient(circle, rgba(249,159,51,0.15) 0%, transparent 65%);
      right:-200px; top:-300px;
    }
    .eyebrow {
      color:#F99F33; font-size:11px; font-weight:700; letter-spacing:0.18em;
      text-transform:uppercase; margin-bottom:18px; text-align:center; position:relative; z-index:2;
    }
    h1 {
      font-family:'Playfair Display',serif; font-size:64px; font-weight:900;
      color:#fff; text-align:center; line-height:1.08; margin-bottom:48px;
      position:relative; z-index:2;
    }
    h1 span { color:#F99F33; }
    .features {
      display:grid; grid-template-columns:repeat(4,1fr); gap:20px;
      width:1060px; position:relative; z-index:2;
    }
    .feat {
      background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15);
      border-radius:16px; padding:24px 20px; text-align:center;
      transition:all 0.2s;
    }
    .feat .ic { font-size:32px; margin-bottom:10px; }
    .feat .title { color:#fff; font-size:13px; font-weight:700; line-height:1.4; }
    .logo {
      position:absolute; top:24px; right:36px;
      color:rgba(255,255,255,0.3); font-size:10px; font-weight:700;
      letter-spacing:0.2em; text-transform:uppercase; z-index:3;
    }
    .slide-num {
      position:absolute; bottom:24px; right:36px;
      color:rgba(255,255,255,0.3); font-size:11px; font-weight:600; z-index:3;
    }
  </style>
  </head><body>
  <div class="wrap">
    <div class="glow"></div>
    <div class="logo">EVENT SPHERE SOLUTIONS</div>
    <div class="slide-num">2 / 6</div>
    <div class="eyebrow">How Event Sphere Solves It</div>
    <h1>One platform.<br><span>Every problem solved.</span></h1>
    <div class="features">
      ${[
        ['📋','Lead capture & auto-tracking'],
        ['✍️','Proposals + e-sign in one link'],
        ['📄','BEOs & invoices — one click'],
        ['📅','Smart calendar, no conflicts'],
        ['📧','Email campaigns built-in'],
        ['🌐','360° virtual venue tours'],
        ['💬','Team chat in one place'],
        ['🤖','AI assistant — coming V3'],
      ].map(([ic,t]) => `<div class="feat"><div class="ic">${ic}</div><div class="title">${t}</div></div>`).join('')}
    </div>
  </div>
  </body></html>`;
}

// ─── DAY 4 · Instagram Story · 1080×1920 ────────────────────────────────────
function day4_story() {
  return `<!DOCTYPE html><html><head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:1080px; height:1920px; overflow:hidden; font-family:'Inter',sans-serif; }
    .wrap {
      width:100%; height:100%; position:relative; overflow:hidden;
      background: linear-gradient(170deg, #1a0a1e 0%, #6a256f 40%, #EF4561 75%, #F99F33 100%);
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      padding:80px 64px;
    }
    .glow1 {
      position:absolute; width:900px; height:900px; border-radius:50%;
      background:radial-gradient(circle, rgba(249,159,51,0.25) 0%, transparent 65%);
      top:-300px; right:-300px;
    }
    .glow2 {
      position:absolute; width:600px; height:600px; border-radius:50%;
      background:radial-gradient(circle, rgba(239,69,97,0.2) 0%, transparent 65%);
      bottom:-150px; left:-150px;
    }
    .badge {
      background:rgba(249,159,51,0.2); border:1.5px solid rgba(249,159,51,0.5);
      color:#F99F33; font-size:13px; font-weight:700; letter-spacing:0.15em;
      text-transform:uppercase; padding:10px 24px; border-radius:100px;
      margin-bottom:44px; position:relative; z-index:2;
    }
    h1 {
      font-family:'Playfair Display',serif; font-size:96px; font-weight:900;
      color:#fff; line-height:1.05; text-align:center; margin-bottom:28px;
      position:relative; z-index:2;
    }
    h1 span { color:#F99F33; }
    .sub {
      color:rgba(255,255,255,0.65); font-size:22px; font-weight:500;
      text-align:center; line-height:1.65; max-width:760px; margin-bottom:64px;
      position:relative; z-index:2;
    }
    .card {
      background:rgba(255,255,255,0.1); border:1.5px solid rgba(255,255,255,0.2);
      border-radius:24px; padding:36px 40px; width:100%; margin-bottom:24px;
      position:relative; z-index:2;
    }
    .card .ic { font-size:36px; margin-bottom:12px; }
    .card .feat-title { color:#fff; font-size:20px; font-weight:700; margin-bottom:8px; }
    .card .feat-desc { color:rgba(255,255,255,0.65); font-size:16px; line-height:1.55; }
    .cta-btn {
      background:linear-gradient(90deg, #F99F33, #EF4561);
      color:#fff; font-size:20px; font-weight:800; padding:22px 56px;
      border-radius:100px; margin-top:16px; position:relative; z-index:2;
      letter-spacing:0.02em;
    }
    .logo {
      position:absolute; bottom:36px; left:0; right:0; text-align:center;
      color:rgba(255,255,255,0.3); font-size:12px; font-weight:700;
      letter-spacing:0.2em; text-transform:uppercase; z-index:3;
    }
  </style>
  </head><body>
  <div class="wrap">
    <div class="glow1"></div>
    <div class="glow2"></div>
    <div class="badge">🎉 We're officially LIVE</div>
    <h1>Event Sphere<br>is open for<br><span>founding</span><br><span>partners.</span></h1>
    <p class="sub">Arizona hospitality businesses — your private event sales just got a whole lot smarter.</p>
    <div class="card">
      <div class="ic">📄</div>
      <div class="feat-title">Proposals + e-signature in one link</div>
      <div class="feat-desc">Send a branded proposal, collect the signature, and take the deposit — all without leaving the platform.</div>
    </div>
    <div class="card">
      <div class="ic">📅</div>
      <div class="feat-title">Smart calendar — no double bookings</div>
      <div class="feat-desc">Conflict prevention built in. Your calendar fills automatically, without the chaos.</div>
    </div>
    <div class="cta-btn">DM "FREE" to claim your spot →</div>
    <div class="logo">Event Sphere Solutions · Arizona</div>
  </div>
  </body></html>`;
}

// ─── DAY 5 · LinkedIn Photo · 1200×628 ──────────────────────────────────────
function day5() {
  return `<!DOCTYPE html><html><head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:1200px; height:628px; overflow:hidden; font-family:'Inter',sans-serif; }
    .wrap {
      width:100%; height:100%; display:grid; grid-template-columns:1fr 1fr;
      background:#fff; position:relative; overflow:hidden;
    }
    .left {
      background: linear-gradient(145deg, #1a0a1e, #6a256f);
      padding:56px 52px; display:flex; flex-direction:column; justify-content:center;
      position:relative; overflow:hidden;
    }
    .left .glow {
      position:absolute; width:500px; height:500px; border-radius:50%;
      background:radial-gradient(circle, rgba(249,159,51,0.2) 0%, transparent 70%);
      right:-150px; bottom:-150px;
    }
    .eyebrow {
      color:#F99F33; font-size:11px; font-weight:700; letter-spacing:0.18em;
      text-transform:uppercase; margin-bottom:20px; position:relative; z-index:2;
    }
    h1 {
      font-family:'Playfair Display',serif; font-size:52px; font-weight:900;
      color:#fff; line-height:1.1; margin-bottom:20px; position:relative; z-index:2;
    }
    .sub {
      color:rgba(255,255,255,0.6); font-size:14px; line-height:1.65;
      max-width:340px; position:relative; z-index:2;
    }
    .author {
      margin-top:28px; display:flex; align-items:center; gap:12px;
      position:relative; z-index:2;
    }
    .author-dot {
      width:36px; height:36px; border-radius:50%;
      background:linear-gradient(135deg, #F99F33, #EF4561);
      display:flex; align-items:center; justify-content:center;
      color:#fff; font-weight:800; font-size:14px;
    }
    .author-info .name { color:#fff; font-size:13px; font-weight:700; }
    .author-info .role { color:rgba(255,255,255,0.45); font-size:11px; }
    .right {
      padding:44px 48px; display:flex; flex-direction:column; justify-content:center; gap:14px;
    }
    .section-label {
      font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.15em; margin-bottom:4px;
    }
    .item {
      display:flex; align-items:center; gap:12px;
      padding:13px 16px; border-radius:12px; font-size:13px; font-weight:500;
    }
    .item.good { background:#f0fdf4; color:#166534; }
    .item.good .check { color:#22c55e; font-size:16px; }
    .item.building { background:#fef9f0; color:#92400e; }
    .item.building .arrow { color:#F99F33; font-size:16px; }
    .logo {
      position:absolute; top:24px; right:36px;
      color:#ccc; font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase;
    }
  </style>
  </head><body>
  <div class="wrap">
    <div class="logo">EVENT SPHERE SOLUTIONS</div>
    <div class="left">
      <div class="glow"></div>
      <div class="eyebrow">Honest Update — V1</div>
      <h1>What's working.<br>What's coming.</h1>
      <p class="sub">We went from idea to live product. Here's the real story — no spin.</p>
      <div class="author">
        <div class="author-dot">SK</div>
        <div class="author-info">
          <div class="name">Samia Kohler</div>
          <div class="role">Founder, Event Sphere Solutions</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="section-label" style="color:#166534;">✓ Working Great</div>
      ${[
        'Proposal + e-signature flow',
        'Auto-generated BEOs',
        'Lead pipeline dashboard',
        'Team chat hub',
      ].map(t => `<div class="item good"><span class="check">✓</span>${t}</div>`).join('')}
      <div class="section-label" style="color:#92400e; margin-top:8px;">→ Still Building</div>
      ${[
        'Mobile app — coming soon',
        'OpenTable integration',
        'AI booking assistant (V3)',
      ].map(t => `<div class="item building"><span class="arrow">→</span>${t}</div>`).join('')}
    </div>
  </div>
  </body></html>`;
}

// ─── DAY 6 · Instagram Carousel · 1080×1080 ─────────────────────────────────
function day6() {
  return `<!DOCTYPE html><html><head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:1080px; height:1080px; overflow:hidden; font-family:'Inter',sans-serif; }
    .wrap {
      width:100%; height:100%; position:relative; overflow:hidden;
      background: #fff;
      display:flex; flex-direction:column;
    }
    .top-band {
      background: linear-gradient(90deg, #1a0a1e, #6a256f, #EF4561);
      padding:48px 64px 44px;
      position:relative; overflow:hidden;
    }
    .top-band .glow {
      position:absolute; width:600px; height:600px; border-radius:50%;
      background:radial-gradient(circle, rgba(249,159,51,0.2) 0%, transparent 70%);
      right:-150px; top:-200px;
    }
    .eyebrow {
      color:#F99F33; font-size:12px; font-weight:700; letter-spacing:0.15em;
      text-transform:uppercase; margin-bottom:16px; position:relative; z-index:2;
    }
    h1 {
      font-family:'Playfair Display',serif; font-size:60px; font-weight:900;
      color:#fff; line-height:1.05; position:relative; z-index:2;
    }
    .lessons {
      flex:1; padding:40px 64px; display:grid; grid-template-columns:1fr 1fr; gap:20px;
      align-content:center;
    }
    .lesson {
      border-radius:16px; padding:24px 22px;
      border-left:4px solid #6a256f; background:linear-gradient(135deg, #f9f5ff, #fff0f3);
    }
    .lesson-num {
      color:#EF4561; font-size:11px; font-weight:800; letter-spacing:0.15em;
      text-transform:uppercase; margin-bottom:8px;
    }
    .lesson-title { color:#1a0a1e; font-size:18px; font-weight:800; margin-bottom:8px; line-height:1.3; }
    .lesson-text { color:#666; font-size:13px; line-height:1.6; }
    .logo {
      position:absolute; bottom:24px; right:40px;
      color:#ccc; font-size:10px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase;
    }
  </style>
  </head><body>
  <div class="wrap">
    <div class="top-band">
      <div class="glow"></div>
      <div class="eyebrow">18 years hospitality · 1 year SaaS</div>
      <h1>4 lessons nobody<br>warns you about.</h1>
    </div>
    <div class="lessons">
      ${[
        ['Lesson 1','Your first customers > any research','We changed 3 core features in month 1 because real venues told us what actually matters.'],
        ['Lesson 2','Speed beats perfection','V1 is not perfect. It\'s live. A live imperfect product beats a perfect one that doesn\'t exist.'],
        ['Lesson 3','The problem shifts','We thought venues needed better forms. They needed an entire sales system.'],
        ['Lesson 4','Say no ruthlessly','In a startup AND in hospitality, everything feels urgent. Prioritization is survival.'],
      ].map(([num,title,text]) => `
        <div class="lesson">
          <div class="lesson-num">${num}</div>
          <div class="lesson-title">${title}</div>
          <div class="lesson-text">${text}</div>
        </div>`).join('')}
    </div>
    <div class="logo">Event Sphere Solutions · Arizona</div>
  </div>
  </body></html>`;
}

// ─── DAY 7 · Instagram Quote · 1080×1080 ────────────────────────────────────
function day7() {
  return `<!DOCTYPE html><html><head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:1080px; height:1080px; overflow:hidden; font-family:'Inter',sans-serif; }
    .wrap {
      width:100%; height:100%; position:relative; overflow:hidden;
      background: linear-gradient(145deg, #1a0a1e 0%, #6a256f 55%, #EF4561 90%);
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      padding:80px;
    }
    .glow1 {
      position:absolute; width:700px; height:700px; border-radius:50%;
      background:radial-gradient(circle, rgba(249,159,51,0.2) 0%, transparent 65%);
      top:-200px; right:-200px;
    }
    .glow2 {
      position:absolute; width:500px; height:500px; border-radius:50%;
      background:radial-gradient(circle, rgba(239,69,97,0.2) 0%, transparent 65%);
      bottom:-100px; left:-100px;
    }
    /* Orange line accent */
    .line { width:64px; height:4px; background:#F99F33; border-radius:2px; margin-bottom:44px; position:relative; z-index:2; }
    .quote-mark {
      font-family:'Playfair Display',serif; font-size:200px; color:rgba(249,159,51,0.15);
      line-height:0.8; position:absolute; top:60px; left:60px;
    }
    blockquote {
      font-family:'Playfair Display',serif; font-style:italic;
      font-size:52px; font-weight:700; color:#fff;
      text-align:center; line-height:1.2; margin-bottom:48px;
      position:relative; z-index:2; max-width:840px;
    }
    blockquote em { color:#F99F33; font-style:italic; }
    .attribution {
      display:flex; align-items:center; gap:16px; position:relative; z-index:2;
    }
    .attr-line { width:40px; height:2px; background:#F99F33; }
    .attr-text .name { color:#fff; font-size:15px; font-weight:700; }
    .attr-text .role { color:rgba(255,255,255,0.5); font-size:12px; margin-top:3px; }
    .logo {
      position:absolute; bottom:32px; left:0; right:0; text-align:center;
      color:rgba(255,255,255,0.25); font-size:11px; font-weight:700;
      letter-spacing:0.2em; text-transform:uppercase; z-index:3;
    }
    /* Corner dots */
    .corner { position:absolute; width:6px; height:6px; border-radius:50%; background:rgba(249,159,51,0.4); }
    .tl { top:40px; left:40px; } .tr { top:40px; right:40px; }
    .bl { bottom:70px; left:40px; } .br { bottom:70px; right:40px; }
  </style>
  </head><body>
  <div class="wrap">
    <div class="glow1"></div>
    <div class="glow2"></div>
    <div class="corner tl"></div>
    <div class="corner tr"></div>
    <div class="corner bl"></div>
    <div class="corner br"></div>
    <div class="quote-mark">"</div>
    <div class="line"></div>
    <blockquote>
      "Building something<br>from scratch is<br><em>uncomfortable</em><br>by design.<br>That's how you know<br>it's working."
    </blockquote>
    <div class="attribution">
      <div class="attr-line"></div>
      <div class="attr-text">
        <div class="name">Samia Kohler</div>
        <div class="role">Founder, Event Sphere Solutions</div>
      </div>
    </div>
    <div class="logo">EVENT SPHERE SOLUTIONS · ARIZONA</div>
  </div>
  </body></html>`;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Load Google Fonts
  await page.route('**/*', route => route.continue());

  await shot(page, day1(), 'Day1_LinkedIn_Launch.png', 1200, 628);
  await shot(page, day2(), 'Day2_Instagram_Reel_Thumbnail.png', 1080, 1080);
  await shot(page, day3_slide1(), 'Day3_LinkedIn_Carousel_Slide1.png', 1200, 628);
  await shot(page, day3_slide2(), 'Day3_LinkedIn_Carousel_Slide2.png', 1200, 628);
  await shot(page, day4_story(), 'Day4_Instagram_Story_Frame1.png', 1080, 1920);
  await shot(page, day5(), 'Day5_LinkedIn_Photo.png', 1200, 628);
  await shot(page, day6(), 'Day6_Instagram_Carousel_Slide1.png', 1080, 1080);
  await shot(page, day7(), 'Day7_Instagram_Quote.png', 1080, 1080);

  await browser.close();
  console.log('\n✅ All 8 visuals generated in Desktop/Social Media Week 1/');
})();
