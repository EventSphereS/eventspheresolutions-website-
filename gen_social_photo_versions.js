const { chromium } = require('playwright');
const path = require('path');

const OUT = '/Users/eventspheresolutions/Desktop/Social Media Week 1/';
const IMGS = '/Users/eventspheresolutions/eventspheresolutions-website/public/images/';

async function shot(page, html, file, w, h) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, file), type: 'png' });
  console.log('✓', file);
}

// ─── VERSION A — Dinner Table background (moody/premium) ────────────────────
function versionDinnerTable() {
  const imgPath = `file://${IMGS}dinner-table.jpg`;
  return `<!DOCTYPE html><html><head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:1200px; height:628px; overflow:hidden; font-family:'Inter',sans-serif; }
    .wrap { width:100%; height:100%; position:relative; overflow:hidden; display:flex; }

    /* Full-bleed photo */
    .bg {
      position:absolute; inset:0;
      background: url('${imgPath}') center/cover no-repeat;
    }
    /* Gradient overlay — dark on left for text, fades right */
    .overlay {
      position:absolute; inset:0;
      background: linear-gradient(90deg,
        rgba(16,5,20,0.92) 0%,
        rgba(16,5,20,0.85) 40%,
        rgba(16,5,20,0.55) 65%,
        rgba(16,5,20,0.2) 100%
      );
    }

    /* Left content */
    .content {
      position:relative; z-index:2;
      width:580px; padding:52px 56px;
      display:flex; flex-direction:column; justify-content:space-between;
    }
    .badge {
      display:inline-flex; align-items:center; gap:8px;
      background:rgba(249,159,51,0.18); border:1.5px solid rgba(249,159,51,0.5);
      color:#F99F33; font-size:11px; font-weight:700; letter-spacing:0.12em;
      text-transform:uppercase; padding:7px 16px; border-radius:100px;
      width:fit-content;
    }
    .dot { width:7px; height:7px; border-radius:50%; background:#F99F33; }
    .headline { flex:1; display:flex; flex-direction:column; justify-content:center; padding:8px 0; }
    h1 {
      font-family:'Playfair Display',serif; font-size:62px; line-height:1.05;
      color:#fff; font-weight:900; margin-bottom:16px;
    }
    h1 span { color:#F99F33; }
    .sub { color:rgba(255,255,255,0.65); font-size:14.5px; font-weight:500; line-height:1.6; max-width:380px; }
    .cta {
      display:inline-flex; align-items:center; gap:10px;
      background: linear-gradient(90deg, #F99F33, #EF4561);
      color:#fff; font-size:14px; font-weight:700; padding:14px 26px;
      border-radius:100px; width:fit-content; letter-spacing:0.02em;
    }

    /* Right — floating feature pills */
    .right {
      position:absolute; right:48px; top:0; bottom:0;
      width:340px; display:flex; flex-direction:column;
      justify-content:center; gap:10px; z-index:3;
    }
    .pill {
      background:rgba(255,255,255,0.12); backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,0.2); border-radius:100px;
      padding:12px 20px; display:flex; align-items:center; gap:10px;
      color:#fff; font-size:13px; font-weight:600;
    }
    .pill .ic { font-size:16px; }

    .logo {
      position:absolute; top:22px; right:36px;
      color:rgba(255,255,255,0.4); font-size:10px; font-weight:700;
      letter-spacing:0.2em; text-transform:uppercase; z-index:4;
    }
  </style>
  </head><body>
  <div class="wrap">
    <div class="bg"></div>
    <div class="overlay"></div>
    <div class="logo">EVENT SPHERE SOLUTIONS</div>

    <div class="content">
      <div class="badge"><span class="dot"></span>We're Live — V1</div>
      <div class="headline">
        <h1>The private<br>event platform<br><span>Arizona needed.</span></h1>
        <p class="sub">18 years in hospitality. One platform to stop the revenue leak — built for restaurants, bars, venues & hotels.</p>
      </div>
      <div class="cta">DM "V1" — First 20 get 3 months free →</div>
    </div>

    <div class="right">
      ${[
        ['📋','Lead capture & tracking'],
        ['✍️','Proposals + e-signatures'],
        ['📄','Auto-generated BEOs'],
        ['📅','Smart calendar'],
        ['📧','Email campaigns'],
        ['🌐','360° virtual tours'],
        ['💬','Team chat hub'],
      ].map(([ic,tx]) => `<div class="pill"><span class="ic">${ic}</span>${tx}</div>`).join('')}
    </div>
  </div>
  </body></html>`;
}

// ─── VERSION B — Celebration/Toast background (energetic) ───────────────────
function versionCelebration() {
  const imgPath = `file://${IMGS}hero-celebration.jpg`;
  return `<!DOCTYPE html><html><head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:1200px; height:628px; overflow:hidden; font-family:'Inter',sans-serif; }
    .wrap { width:100%; height:100%; position:relative; overflow:hidden; }

    .bg {
      position:absolute; inset:0;
      background: url('${imgPath}') center 30%/cover no-repeat;
    }
    /* Strong overlay — left panel solid, right fades */
    .overlay {
      position:absolute; inset:0;
      background: linear-gradient(90deg,
        rgba(16,5,20,0.95) 0%,
        rgba(16,5,20,0.88) 38%,
        rgba(16,5,20,0.5) 60%,
        rgba(16,5,20,0.15) 100%
      );
    }
    /* Purple tint on top */
    .tint {
      position:absolute; inset:0;
      background: linear-gradient(135deg, rgba(106,37,111,0.4) 0%, transparent 60%);
    }

    .content {
      position:relative; z-index:2;
      width:560px; height:100%; padding:52px 56px;
      display:flex; flex-direction:column; justify-content:space-between;
    }
    .badge {
      display:inline-flex; align-items:center; gap:8px;
      background:rgba(249,159,51,0.2); border:1.5px solid rgba(249,159,51,0.6);
      color:#F99F33; font-size:11px; font-weight:700; letter-spacing:0.12em;
      text-transform:uppercase; padding:7px 16px; border-radius:100px;
      width:fit-content;
    }
    .dot { width:7px; height:7px; border-radius:50%; background:#F99F33; animation:p 2s infinite; }
    @keyframes p { 0%,100%{opacity:1}50%{opacity:0.3} }

    .headline { flex:1; display:flex; flex-direction:column; justify-content:center; }
    h1 {
      font-family:'Playfair Display',serif; font-size:64px; font-weight:900;
      color:#fff; line-height:1.05; margin-bottom:14px;
    }
    h1 .highlight { color:#F99F33; }
    .sub {
      color:rgba(255,255,255,0.6); font-size:14.5px; font-weight:500;
      line-height:1.6; max-width:380px; margin-bottom:0;
    }

    .bottom { display:flex; flex-direction:column; gap:14px; }
    .stats { display:flex; gap:20px; }
    .stat {
      background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15);
      border-radius:12px; padding:12px 18px; text-align:center;
    }
    .stat .num { font-family:'Playfair Display',serif; font-size:28px; font-weight:900; color:#F99F33; }
    .stat .lbl { color:rgba(255,255,255,0.55); font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; margin-top:2px; }
    .cta {
      display:inline-flex; align-items:center; gap:10px;
      background: linear-gradient(90deg, #F99F33, #EF4561);
      color:#fff; font-size:14px; font-weight:700; padding:14px 26px;
      border-radius:100px; width:fit-content;
    }

    .logo {
      position:absolute; top:22px; right:36px;
      color:rgba(255,255,255,0.4); font-size:10px; font-weight:700;
      letter-spacing:0.2em; text-transform:uppercase; z-index:4;
    }
  </style>
  </head><body>
  <div class="wrap">
    <div class="bg"></div>
    <div class="overlay"></div>
    <div class="tint"></div>
    <div class="logo">EVENT SPHERE SOLUTIONS</div>

    <div class="content">
      <div class="badge"><span class="dot"></span>It's Live — V1</div>
      <div class="headline">
        <h1>Every empty<br>date is revenue<br><span class="highlight">walking out.</span></h1>
        <p class="sub">We built the platform to stop it. Lead capture, proposals, BEOs, email campaigns & 360° tours — all in one place.</p>
      </div>
      <div class="bottom">
        <div class="stats">
          <div class="stat"><div class="num">189%</div><div class="lbl">Avg. sales increase</div></div>
          <div class="stat"><div class="num">120</div><div class="lbl">Days to results</div></div>
          <div class="stat"><div class="num">3 mo</div><div class="lbl">Free for founders</div></div>
        </div>
        <div class="cta">DM "V1" — First 20 get 3 months free →</div>
      </div>
    </div>
  </div>
  </body></html>`;
}

(async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await shot(page, versionDinnerTable(), 'Day1_Version_DinnerTable.png', 1200, 628);
  await shot(page, versionCelebration(), 'Day1_Version_Celebration.png', 1200, 628);

  await browser.close();
  console.log('\n✅ Both photo versions saved to Desktop/Social Media Week 1/');
})();
