#!/usr/bin/env python3
import base64, subprocess, json, os, sys

OUT = '/Users/eventspheresolutions/Desktop/Social Media Week 1/'
IMGS = '/Users/eventspheresolutions/eventspheresolutions-website/public/images/'

def b64(path):
    with open(path, 'rb') as f:
        return base64.b64encode(f.read()).decode()

dinner_b64 = b64(IMGS + 'dinner-table.jpg')
celeb_b64  = b64(IMGS + 'hero-celebration.jpg')

def html_dinner():
    return f"""<!DOCTYPE html><html><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
body {{ width:1200px; height:628px; overflow:hidden; font-family:'Inter',sans-serif; }}
.wrap {{ width:100%; height:100%; position:relative; display:flex; overflow:hidden; }}
.bg {{
  position:absolute; inset:0;
  background: url('data:image/jpeg;base64,{dinner_b64}') center/cover no-repeat;
}}
.overlay {{
  position:absolute; inset:0;
  background: linear-gradient(90deg,
    rgba(10,3,14,0.93) 0%,
    rgba(10,3,14,0.88) 42%,
    rgba(10,3,14,0.55) 65%,
    rgba(10,3,14,0.1) 100%
  );
}}
.content {{
  position:relative; z-index:2;
  width:570px; padding:52px 56px;
  display:flex; flex-direction:column; justify-content:space-between;
}}
.badge {{
  display:inline-flex; align-items:center; gap:8px;
  background:rgba(249,159,51,0.18); border:1.5px solid rgba(249,159,51,0.5);
  color:#F99F33; font-size:11px; font-weight:700; letter-spacing:0.12em;
  text-transform:uppercase; padding:7px 16px; border-radius:100px; width:fit-content;
}}
.dot {{ width:7px; height:7px; border-radius:50%; background:#F99F33; }}
.headline {{ flex:1; display:flex; flex-direction:column; justify-content:center; }}
h1 {{
  font-family:'Playfair Display',serif; font-size:62px; line-height:1.05;
  color:#fff; font-weight:900; margin-bottom:14px;
}}
h1 span {{ color:#F99F33; }}
.sub {{ color:rgba(255,255,255,0.6); font-size:14px; font-weight:500; line-height:1.6; max-width:370px; }}
.cta {{
  display:inline-flex; align-items:center;
  background: linear-gradient(90deg, #F99F33, #EF4561);
  color:#fff; font-size:14px; font-weight:700; padding:14px 26px;
  border-radius:100px; width:fit-content;
}}
.pills {{
  position:absolute; right:44px; top:0; bottom:0;
  width:330px; display:flex; flex-direction:column;
  justify-content:center; gap:9px; z-index:3;
}}
.pill {{
  background:rgba(255,255,255,0.1); backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,0.18); border-radius:100px;
  padding:11px 18px; display:flex; align-items:center; gap:10px;
  color:#fff; font-size:13px; font-weight:600;
}}
.logo {{
  position:absolute; top:22px; right:36px;
  color:rgba(255,255,255,0.35); font-size:10px; font-weight:700;
  letter-spacing:0.2em; text-transform:uppercase; z-index:4;
}}
</style></head><body>
<div class="wrap">
  <div class="bg"></div>
  <div class="overlay"></div>
  <div class="logo">EVENT SPHERE SOLUTIONS</div>
  <div class="content">
    <div class="badge"><span class="dot"></span>We're Live — V1</div>
    <div class="headline">
      <h1>The private<br>event platform<br><span>Arizona needed.</span></h1>
      <p class="sub">18 years of hospitality. One platform to stop the revenue leak — built for restaurants, bars, venues & hotels.</p>
    </div>
    <div class="cta">DM "V1" — First 20 get 3 months free →</div>
  </div>
  <div class="pills">
    <div class="pill">📋 Lead capture &amp; tracking</div>
    <div class="pill">✍️ Proposals + e-signatures</div>
    <div class="pill">📄 Auto-generated BEOs</div>
    <div class="pill">📅 Smart calendar</div>
    <div class="pill">📧 Email campaigns</div>
    <div class="pill">🌐 360° virtual tours</div>
    <div class="pill">💬 Team chat hub</div>
  </div>
</div>
</body></html>"""

def html_celebration():
    return f"""<!DOCTYPE html><html><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
* {{ margin:0; padding:0; box-sizing:border-box; }}
body {{ width:1200px; height:628px; overflow:hidden; font-family:'Inter',sans-serif; }}
.wrap {{ width:100%; height:100%; position:relative; overflow:hidden; }}
.bg {{
  position:absolute; inset:0;
  background: url('data:image/jpeg;base64,{celeb_b64}') center 30%/cover no-repeat;
}}
.overlay {{
  position:absolute; inset:0;
  background: linear-gradient(90deg,
    rgba(10,3,14,0.94) 0%,
    rgba(10,3,14,0.90) 40%,
    rgba(10,3,14,0.55) 62%,
    rgba(10,3,14,0.12) 100%
  );
}}
.tint {{
  position:absolute; inset:0;
  background: linear-gradient(135deg, rgba(106,37,111,0.35) 0%, transparent 55%);
}}
.content {{
  position:relative; z-index:2;
  width:570px; height:100%; padding:52px 56px;
  display:flex; flex-direction:column; justify-content:space-between;
}}
.badge {{
  display:inline-flex; align-items:center; gap:8px;
  background:rgba(249,159,51,0.2); border:1.5px solid rgba(249,159,51,0.6);
  color:#F99F33; font-size:11px; font-weight:700; letter-spacing:0.12em;
  text-transform:uppercase; padding:7px 16px; border-radius:100px; width:fit-content;
}}
.dot {{ width:7px; height:7px; border-radius:50%; background:#F99F33; }}
.headline {{ flex:1; display:flex; flex-direction:column; justify-content:center; }}
h1 {{
  font-family:'Playfair Display',serif; font-size:64px; font-weight:900;
  color:#fff; line-height:1.05; margin-bottom:14px;
}}
h1 .hl {{ color:#F99F33; }}
.sub {{ color:rgba(255,255,255,0.6); font-size:14px; font-weight:500; line-height:1.6; max-width:380px; }}
.bottom {{ display:flex; flex-direction:column; gap:14px; }}
.stats {{ display:flex; gap:16px; }}
.stat {{
  background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15);
  border-radius:12px; padding:12px 18px; text-align:center; flex:1;
}}
.num {{ font-family:'Playfair Display',serif; font-size:28px; font-weight:900; color:#F99F33; }}
.lbl {{ color:rgba(255,255,255,0.5); font-size:9.5px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em; margin-top:3px; }}
.cta {{
  display:inline-flex; align-items:center;
  background: linear-gradient(90deg, #F99F33, #EF4561);
  color:#fff; font-size:14px; font-weight:700; padding:14px 26px;
  border-radius:100px; width:fit-content;
}}
.logo {{
  position:absolute; top:22px; right:36px;
  color:rgba(255,255,255,0.35); font-size:10px; font-weight:700;
  letter-spacing:0.2em; text-transform:uppercase; z-index:4;
}}
</style></head><body>
<div class="wrap">
  <div class="bg"></div>
  <div class="overlay"></div>
  <div class="tint"></div>
  <div class="logo">EVENT SPHERE SOLUTIONS</div>
  <div class="content">
    <div class="badge"><span class="dot"></span>It's Live — V1</div>
    <div class="headline">
      <h1>Every empty<br>date is revenue<br><span class="hl">walking out.</span></h1>
      <p class="sub">We built the platform to stop it. Lead capture, proposals, BEOs, email campaigns &amp; 360° tours — all in one.</p>
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
</body></html>"""

# Write HTML files, then screenshot with Playwright
with open('/tmp/dinner.html','w') as f:
    f.write(html_dinner())
with open('/tmp/celeb.html','w') as f:
    f.write(html_celebration())

js = f"""
const {{ chromium }} = require('playwright');
const fs = require('fs');
(async () => {{
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({{ width: 1200, height: 628 }});
  await page.setContent(fs.readFileSync('/tmp/dinner.html','utf8'), {{ waitUntil: 'networkidle' }});
  await page.waitForTimeout(500);
  await page.screenshot({{ path: '{OUT}Day1_Version_DinnerTable.png' }});
  console.log('✓ Dinner Table');

  await page.setViewportSize({{ width: 1200, height: 628 }});
  await page.setContent(fs.readFileSync('/tmp/celeb.html','utf8'), {{ waitUntil: 'networkidle' }});
  await page.waitForTimeout(500);
  await page.screenshot({{ path: '{OUT}Day1_Version_Celebration.png' }});
  console.log('✓ Celebration');

  await browser.close();
}})();
"""

with open('/tmp/shot.js','w') as f:
    f.write(js)

os.chdir('/Users/eventspheresolutions/eventspheresolutions-website')
result = subprocess.run(['node', '/tmp/shot.js'], capture_output=True, text=True)
print(result.stdout)
if result.stderr:
    print('ERR:', result.stderr[:500])
