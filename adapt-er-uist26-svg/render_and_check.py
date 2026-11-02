#!/usr/bin/env python3
"""Render SVGs with Chromium, check editable content, and produce QA artifacts."""
from pathlib import Path
import json,math,re
from xml.etree import ElementTree as ET
from PIL import Image,ImageDraw,ImageFont
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parent
slides=json.loads((ROOT/'content.json').read_text());ns={'svg':'http://www.w3.org/2000/svg'}
issues=[];metrics=[]
assert len(list((ROOT/'slides').glob('*.svg')))==13
assert sum(s['duration'] for s in slides)==540
with sync_playwright() as p:
 browser=p.chromium.launch();page=browser.new_page(viewport={'width':1920,'height':1080},device_scale_factor=1)
 for s in slides:
  path=ROOT/'slides'/f'{s["slug"]}.svg';root=ET.parse(path).getroot()
  assert root.attrib['viewBox']=='0 0 1920 1080'
  assert not root.findall('.//svg:image',ns) and not root.findall('.//svg:foreignObject',ns)
  assert len(root.findall('.//svg:text',ns))>0
  for el in root.iter():
   for key,val in el.attrib.items():
    assert not (key.endswith('href') and (val.startswith('http') or val.startswith('data:'))),(path,key)
  page.goto(path.as_uri(),wait_until='load');page.evaluate('document.fonts.ready')
  items=page.locator('svg text').evaluate_all('''els=>els.map(e=>{const b=e.getBBox();return {text:e.textContent,x:b.x,y:b.y,w:b.width,h:b.height,size:parseFloat(getComputedStyle(e).fontSize)}})''')
  for item in items:
   if item['x']<90 or item['x']+item['w']>1830 or item['y']<60 or item['y']+item['h']>1044:issues.append({'slide':s['number'],**item})
  metrics.append({'slide':s['number'],'textElements':len(items),'minFont':min(e['size'] for e in items),'notesWords':len(s['notes'].split()),'plannedSeconds':s['duration']})
  page.screenshot(path=str(ROOT/'preview'/f'{s["number"]:02}.png'))
 browser.close()
thumbw=480;thumbh=270;labelh=32;gap=16;cols=4;rows=math.ceil(13/cols)
sheet=Image.new('RGB',(gap+(thumbw+gap)*cols,gap+(thumbh+labelh+gap)*rows),'#e8ebed');draw=ImageDraw.Draw(sheet)
font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',17)
for i,s in enumerate(slides):
 image=Image.open(ROOT/'preview'/f'{s["number"]:02}.png').convert('RGB').resize((thumbw,thumbh),Image.Resampling.LANCZOS)
 x=gap+(i%cols)*(thumbw+gap);y=gap+(i//cols)*(thumbh+labelh+gap);sheet.paste(image,(x,y));draw.text((x,y+thumbh+6),f'{s["number"]:02} · {s["duration"]}s',font=font,fill='#17232d')
sheet.save(ROOT/'preview/contact-sheet.png')
(ROOT/'preview/layout-check.json').write_text(json.dumps({'issues':issues,'slides':metrics},indent=2))
print(json.dumps({'slides':13,'plannedSeconds':540,'notesWords':sum(m['notesWords'] for m in metrics),'layoutIssues':issues},indent=2))
