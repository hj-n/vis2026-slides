from pathlib import Path
import json, importlib.util
from playwright.sync_api import sync_playwright
root=Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('builder',root/'build.py');builder=importlib.util.module_from_spec(spec);spec.loader.exec_module(builder);builder.load_current_notes()
content=builder.CONTENT;results={}
with sync_playwright() as p:
 b=p.chromium.launch()
 context=b.new_context(viewport={'width':1440,'height':810},offline=True)
 page=context.new_page();requests=[];errors=[]
 page.on('request',lambda r:requests.append(r.url));page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto((root/'deck.html').as_uri());assert page.locator('.slide').count()==13
 for n in range(1,14):
  current=page.locator('.slide.active');assert current.get_attribute('data-slide')==str(n)
  if n<13:page.keyboard.press('ArrowRight')
 page.keyboard.press('p');assert page.locator('.notes').is_visible();assert content[-1]['notes'] in page.locator('#note-body').inner_text()
 page.keyboard.press('Home');assert page.locator('.slide.active').get_attribute('data-slide')=='1'
 assert not errors,errors;assert not [r for r in requests if not r.startswith('file:')],requests
 results['offlineViewer']='13 slides, keyboard navigation and presenter notes passed with network disabled'
 context.close()
 page=b.new_page(viewport={'width':1440,'height':810});errors=[];http=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.on('response',lambda r:http.append((r.status,r.url)) if r.status>=400 else None)
 for n in range(1,14):
  page.goto(f'http://localhost:3045/adapt-er/#/{n}',wait_until='networkidle')
  img=page.locator('img.adapt-er-artwork[src$="'+content[n-1]['slug']+'.svg"]:visible');img.wait_for()
  img.evaluate('(e)=>e.decode()')
  assert img.get_attribute('alt')==content[n-1]['title'],(n,img.get_attribute('alt'),content[n-1]['title'])
 page.goto('http://localhost:3045/adapt-er/#/presenter/10',wait_until='networkidle');page.get_by_text('Participants read faster with Adapt-ER',exact=False).wait_for()
 body=page.locator('body').inner_text()
 assert 'Participants read faster with Adapt-ER' in body,body[-2000:]
 assert '60 seconds' in body
 page.screenshot(path=str(root/'preview/presenter.png'))
 assert not http,http;assert not [e for e in errors if 'Wake Lock' not in e],errors
 results['slidev']='13 SVG slides and slide 10 presenter script passed'
 page.goto('http://localhost:3045/umato/#/1',wait_until='networkidle');page.locator('.umato-cover:visible').wait_for()
 results['existingDeck']='UMATO still loads on its existing route'
 b.close()
(root/'preview/browser-check.json').write_text(json.dumps(results,indent=2)+'\n');print(json.dumps(results,indent=2))
