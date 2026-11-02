#!/usr/bin/env python3
"""Build 13 fully editable SVGs, an offline viewer, notes, and Slidev integration.
No raster assets, remote fonts, foreignObject, canvas, or runtime network calls.
"""
from pathlib import Path
import argparse, html, json, math, shutil, textwrap, re
from xml.etree import ElementTree as ET
from PIL import ImageFont

ROOT=Path(__file__).resolve().parent
REPO=ROOT.parent
CONTENT=json.loads((ROOT/'content.json').read_text())
C={'ink':'#17232D','muted':'#66717A','line':'#CED5DA','pale':'#F4F6F7','blue':'#2771C9','bluep':'#EDF4FC','coral':'#E46C59','coralp':'#FDF0EC','green':'#248765','greenp':'#EAF5EF','amber':'#D9902F','amberp':'#FFF3DE','white':'#FFFFFF'}
NS='http://www.w3.org/2000/svg';ET.register_namespace('',NS)
FONT_ROOT=Path('/System/Library/Fonts/Supplemental')
FONTS={}
def width(text,size=36,bold=False):
 key=(size,bold)
 if key not in FONTS:
  path=FONT_ROOT/('Arial Bold.ttf' if bold else 'Arial.ttf')
  if not path.exists(): path=Path('/usr/share/fonts/truetype/liberation2')/('LiberationSans-Bold.ttf' if bold else 'LiberationSans-Regular.ttf')
  FONTS[key]=ImageFont.truetype(str(path),size)
 return FONTS[key].getlength(text)
def wrap(text,maxw,size=36,bold=False):
 lines=[];line=''
 for word in text.split():
  test=f'{line} {word}'.strip()
  if line and width(test,size,bold)>maxw:lines.append(line);line=word
  else:line=test
 if line:lines.append(line)
 return lines

class Slide:
 def __init__(self,n,source=None):
  self.n=n;self.root=ET.Element(f'{{{NS}}}svg',{'width':'1920','height':'1080','viewBox':'0 0 1920 1080','role':'img','aria-labelledby':f'title-{n} desc-{n}'})
  ET.SubElement(self.root,'title',{'id':f'title-{n}'}).text=CONTENT[n-1]['title']
  ET.SubElement(self.root,'desc',{'id':f'desc-{n}'}).text=CONTENT[n-1]['kind']+'. '+CONTENT[n-1]['source']
  defs=ET.SubElement(self.root,'defs')
  for name in ['ink','muted','blue','coral','green','amber']:
   marker=ET.SubElement(defs,'marker',{'id':f'arrow-{name}-{n}','viewBox':'0 0 12 12','refX':'10','refY':'6','markerWidth':'12','markerHeight':'12','orient':'auto','markerUnits':'userSpaceOnUse'})
   ET.SubElement(marker,'path',{'d':'M1 1 L10 6 L1 11','fill':'none','stroke':C[name],'stroke-width':'2'})
  self.rect(0,0,1920,1080,C['white'],stroke='none')
  self.footer(source)
 def el(self,tag,attrs,txt=None):
  e=ET.SubElement(self.root,tag,{k.replace('_','-'):str(v) for k,v in attrs.items() if v is not None})
  if txt is not None:e.text=txt
  return e
 def rect(self,x,y,w,h,fill='none',stroke=None,sw=1.6,rx=0,**kw):
  return self.el('rect',dict(x=x,y=y,width=w,height=h,fill=fill,stroke=stroke,stroke_width=sw,rx=rx,**kw))
 def line(self,x1,y1,x2,y2,color='line',sw=2,**kw):return self.el('line',dict(x1=x1,y1=y1,x2=x2,y2=y2,stroke=C.get(color,color),stroke_width=sw,**kw))
 def path(self,d,color='ink',sw=2,fill='none',**kw):return self.el('path',dict(d=d,stroke=C.get(color,color),stroke_width=sw,fill=fill,**kw))
 def circle(self,x,y,r,fill,stroke=None,sw=2):return self.el('circle',dict(cx=x,cy=y,r=r,fill=C.get(fill,fill),stroke=C.get(stroke,stroke),stroke_width=sw))
 def text(self,x,y,text,size=36,color='ink',bold=False,anchor='start',**kw):
  assert size>=22,(self.n,text,size)
  return self.el('text',dict(x=x,y=y,font_family='Arial, Helvetica, sans-serif',font_size=size,fill=C.get(color,color),font_weight=700 if bold else 400,text_anchor=anchor,**{'{http://www.w3.org/XML/1998/namespace}space':'preserve'},**kw),text)
 def lines(self,x,y,text,maxw,size=36,color='ink',bold=False,leading=None):
  lines=text if isinstance(text,list) else wrap(text,maxw,size,bold)
  for i,line in enumerate(lines):self.text(x,y+i*(leading or size*1.3),line,size,color,bold)
  return y+(len(lines)-1)*(leading or size*1.3)
 def heading(self,lines):self.lines(112,158,lines,1696,76,bold=False,leading=91)
 def arrow(self,x1,y1,x2,y2,color='muted',sw=3):return self.line(x1,y1,x2,y2,color,sw,marker_end=f'url(#arrow-{color}-{self.n})')
 def arrowpath(self,d,color='muted',sw=3):return self.path(d,color,sw,marker_end=f'url(#arrow-{color}-{self.n})')
 def footer(self,source):
  self.line(112,982,1808,982,'line',1)
  self.text(112,1025,'Adapt-ER · UIST 2026',22,'muted')
  self.text(1808,1025,f'{self.n:02} / 13',22,'muted',anchor='end')
 def rich(self,x,y,segments,size=34):
  pos=x
  for text,kind in segments:
   w=width(text,size,kind=='keep')
   if kind:
    bg={'unknown':'amberp','rewrite':'coralp','keep':'greenp'}[kind]
    self.rect(pos-3,y-size*.88,w+6,size*1.18,C[bg],rx=3)
   self.text(pos,y,text,size,{'unknown':'amber','rewrite':'coral','keep':'green'}.get(kind,'ink'),bold=kind=='keep')
   pos+=w
  return pos
 def browser(self,x,y,w,h,address='Article / Adapt-ER'):
  self.rect(x,y,w,h,C['white'],C['line'],1.4)
  self.rect(x+1,y+1,w-2,51,C['pale'],stroke='none')
  self.line(x,y+52,x+w,y+52,'line',1)
  for i,c in enumerate(['coral','amber','green']):self.circle(x+24+i*21,y+26,5,c)
  self.text(x+108,y+33,address,22,'muted')
 def stage(self,x,y,w,h,role,lines,color):
  if role=='LLM + CODE':
   self.text(x+24,y+43,'LLM',27,'coral',True);self.text(x+89,y+43,'+',27,'muted');self.text(x+119,y+43,'CODE',27,'blue',True)
  else:self.text(x+24,y+43,role,27,color,True)
  self.lines(x+24,y+108,lines,w-48,34,leading=46)
 def write(self,slug):
  ET.indent(self.root,space='  ')
  path=ROOT/'slides'/f'{slug}.svg'
  ET.ElementTree(self.root).write(path,encoding='utf-8',xml_declaration=True)

# Paper-driven core slides first, then supporting and narrative slides.
def s05():
 s=Slide(5,'Fig. 1 / Fig. 2');s.heading(['The Article Stays. The Difficulty Changes.'])
 xs=[112,710,1308];labels=['0. Profile','1. Choose','2. Read & refine']
 for x,label in zip(xs,labels):s.text(x,300,label,40,bold=True);s.browser(x,335,500,450)
 s.text(142,450,'A brief vocabulary check',30,bold=True)
 for y,word in [(520,'convened'),(593,'milestone'),(666,'interdisciplinary')]:
  s.rect(142,y-31,28,28,C['white'],C['line'],2,3);s.text(190,y,word,31)
 s.text(142,752,'Build a vocabulary profile',27,'muted')
 s.lines(740,450,['Choose an article','you want to read'],440,36,bold=True,leading=47)
 for y,title in [(590,'Science news'),(660,'Design and technology'),(730,'Culture and society')]:s.text(740,y,title,29,'blue')
 s.rich(1338,456,[('A ',None),('milestone','keep'),(' in',None)],32)
 s.rich(1338,505,[('collaboration ',None)],32)
 s.rich(1338,554,[('between different fields','rewrite')],30)
 s.text(1358,637,'Mark words as:',27,'muted')
 s.text(1358,683,'Known',30,'green',True);s.text(1515,683,'Unknown',30,'amber',True)
 s.text(1338,752,'Feedback stays on the page',27,'muted')
 s.arrow(635,550,685,550,'blue');s.arrow(1233,550,1283,550,'blue')
 s.arrowpath('M1558 808 V860 H362 V808','blue',2)
 s.text(960,922,'Vocabulary profile → adaptation → updated profile',32,'blue',anchor='middle')
 return s

def s06():
 s=Slide(6,'Fig. 1 / Fig. 3');s.heading(['A Little Difficulty Is the Point.'])
 s.text(112,270,'Not 0% unknown.',38,'muted')
 s.text(1808,270,'Target ~5% unfamiliar',54,'amber',True,anchor='end')
 for i in range(20):s.rect(112+i*84.8,320,80.8,95,C['greenp'] if i<19 else C['amber'],stroke='none',rx=3)
 s.text(112,463,'Familiar vocabulary',31,'green');s.text(1808,463,'Meaningful challenge',31,'amber',anchor='end')
 s.text(112,520,'An operational baseline, not a universal optimum for learning.',29,'muted')
 s.text(112,611,'Original wording',30,'muted');s.text(1020,611,'Adapted wording',30,'muted')
 s.rich(112,681,[('Researchers ',None),('convened','unknown')],36)
 s.rich(112,742,[('to mark a ',None),('milestone','keep')],36)
 s.rich(112,803,[('in ',None),('interdisciplinary','unknown'),(' collaboration.',None)],34)
 s.arrow(874,725,976,725,'muted')
 s.rich(1020,681,[('Researchers ',None),('gathered','rewrite')],36)
 s.rich(1020,742,[('to mark a ',None),('milestone','keep')],36)
 s.rich(1020,803,[('in collaboration ',None)],34)
 s.rich(1020,853,[('between different fields.','rewrite')],34)
 s.text(112,941,'KEEP important new words',31,'green',True)
 s.text(795,941,'SIMPLIFY the rest',31,'coral',True)
 s.text(1395,941,'PRESERVE meaning',31,bold=True)
 return s

def s07():
 s=Slide(7,'Table 1');s.heading(['We Asked an LLM to Do Everything.',"That Didn’t Work."])
 s.text(960,315,'Target: ~5% unfamiliar words',32,'muted',anchor='middle')
 s.line(960,365,960,906,'line',2)
 for x,model,ratio,secs,color,verdict in [(112,'GPT-5','5.84%','211.8 s','green','Accurate, but too slow'),(1040,'GPT-4.1','11.12%','3.4 s','amber','Fast, but off target')]:
  s.text(x,402,model,44,bold=True);s.text(x,450,'Full-article adaptation',31,'muted')
  s.text(x,585,ratio,106,color,True);s.text(x,636,'mean unfamiliar-word ratio',31,'muted')
  s.text(x,755,secs,83,'coral' if x==112 else 'blue',True)
  s.text(x,804,'mean completion time per article',30,'muted')
  s.text(x,904,verdict,39,bold=True)
 return s

def s08():
 s=Slide(8,'Fig. 3 / Table 1');s.heading(['Let Code Count. Let LLMs Understand.'])
 stages=[('CODE',['Match the profile','Count words','Set the 5% budget'],'blue'),('LLM',['Rank unfamiliar words','by their importance','in context'],'coral'),('CODE',['Build Keep / Simplify','lists and split text','into paragraphs'],'blue'),('LLM + CODE',['Rewrite paragraphs','in parallel, then','reassemble'],'coral')]
 for i,(role,body,color) in enumerate(stages):
  x=112+i*432;s.stage(x,305,400,355,role,body,color)
  if i<3:s.arrow(x+406,485,x+426,485,'muted',2)
 for x,value,label in [(112,'5.71%','mean unfamiliar words'),(730,'4.8 s','mean time per article'),(1350,'$0.02','cost per article')]:
  s.text(x,817,value,88,'blue',True);s.text(x,873,label,32,'muted')
 return s

def direction(s,x,y,up,color):
 if up:s.path(f'M{x} {y+200} V{y} M{x-38} {y+40} L{x} {y} L{x+38} {y+40}',color,9)
 else:s.path(f'M{x} {y} V{y+200} M{x-38} {y+160} L{x} {y+200} L{x+38} {y+160}',color,9)

def s10():
 s=Slide(10,'Fig. 4 / Table 2');s.heading(['Less Decoding. More Reading.'])
 s.text(112,315,'Reading speed',48,bold=True);s.text(1040,315,'Tooltip use',48,bold=True)
 direction(s,240,440,True,'green');direction(s,1168,440,False,'blue')
 s.text(348,564,'Faster',76,'green',True);s.lines(1276,537,['Fewer','lookups'],490,65,'blue',True,leading=78)
 s.text(112,870,'From decoding words → understanding meaning',46,bold=True)
 for el in list(s.root):
  if el.get('fill')==C['muted'] or el.get('stroke')==C['line']:s.root.remove(el)
 return s

def s04():
 s=Slide(4,'Fig. 2 / §1 / §3');s.heading(['The Web Has Everything.','Except the Right Difficulty.'])
 s.browser(112,330,1045,585,'A news article I chose')
 s.text(148,442,'A milestone for collaboration',39,bold=True)
 s.rich(148,526,[('Researchers ',None),('convened','unknown'),(' to explore',None)],38)
 s.rich(148,589,[('new ideas and ',None),('interdisciplinary','unknown')],38)
 s.rich(148,652,[('collaboration.',None)],38)
 s.line(148,705,1060,705,'line',1);s.line(148,746,1010,746,'line',1);s.line(148,787,1040,787,'line',1)
 s.rect(696,624,407,206,C['white'],C['amber'],2,8)
 s.text(722,672,'interdisciplinary',31,'amber',True)
 s.lines(722,722,['between different','fields of study'],350,30,leading=42)
 s.text(722,807,'look up, then return',24,'muted')
 for i,label in enumerate(['Read','Stop','Look up','Resume']):
  y=409+i*135;s.text(1300,y,label,46,'amber' if i in [1,2] else 'ink',bold=i in [1,2])
  if i<3:s.arrow(1330,y+28,1330,y+85,'muted',2)
 s.arrowpath('M1575 814 H1740 V380 H1635','muted',2)
 s.text(1300,925,'Again and again.',30,'muted')
 return s

def s09():
 s=Slide(9,'Fig. 2 / §6.1');s.heading(['But Does It Actually Help People Read?'])
 s.text(960,278,'12 Korean speakers learning English',45,bold=True,anchor='middle')
 for x,title,adapt in [(112,'Ordinary web reading',False),(1048,'With Adapt-ER',True)]:
  s.text(x,428,title,38,bold=True);s.browser(x,465,760,380,'Self-selected news / Google News')
  s.text(x+30,573,'An article I want to read',32,bold=True)
  s.rich(x+30,637,[('Researchers ',None),('gathered' if adapt else 'convened','rewrite' if adapt else 'unknown')],33)
  s.rich(x+30,691,[('to mark a ',None),('milestone','keep' if adapt else 'unknown'),('.',None)],33)
  s.text(x+48,783,'Dictionary + translation tooltip',28,'muted')
 return s

def s11():
 s=Slide(11,'§7.3 / §8');s.heading(['We Didn’t Prove Better English.','We Made Reading More Workable.'])
 s.text(112,430,'What we observed',44,'green',True)
 s.text(1040,430,'Open questions',44,bold=True)
 for i,t in enumerate(['Faster reading','Fewer lookups','Higher reported engagement']):
  s.text(112,550+i*120,t,42)
 for i,t in enumerate(['Long-term language gains','Other languages','Other genres and devices']):
  s.text(1040,550+i*120,t,42)
 for el in list(s.root):
  if el.get('fill')==C['muted'] or el.get('stroke')==C['line']:s.root.remove(el)
 return s

def s01():
 s=Slide(1)
 s.text(112,176,'UIST 2026',58,'blue',True)
 s.text(112,335,'Adapt-ER',106,bold=True)
 s.lines(112,440,['Democratizing Extensive Reading','by Tailoring Web Content'],1696,67,bold=True,leading=84)
 s.text(112,681,'Yungun Kim¹, Min Hyeong Kim¹, Suyeon Hwang¹, Gahyun Kim²,',35)
 x=112
 for text,bold in [('Seokweon Jung¹, ',False),('Hyeon Jeon',True),('³, and Jinwook Seo¹',False)]:
  s.text(x,739,text,35,bold=bold);x+=width(text,35,bold)
 s.text(112,846,'¹ Seoul National University    ² Samsung Electronics',30,'muted')
 s.text(112,895,'³ Aarhus University',30,'muted')
 return s

def s02():
 s=Slide(2);s.heading(['Learning English Was','Almost a Second Job.'])
 s.text(112,385,'My primary work',32,'muted')
 for x,t in [(112,'Research'),(710,'Reading'),(1308,'Work')]:
  s.text(x,478,t,58,bold=True)
 s.line(112,560,1808,560,'line',1.5)
 s.text(112,683,'Studying English',58,'coral',True)
 s.text(112,762,'Essential, but still a secondary task.',42)
 s.text(112,880,'Something I had to make extra time for.',34,'muted')
 return s

def s03():
 s=Slide(3);s.heading(['What If These Were the Same Activity?'])
 s.text(112,470,'Reading',40,bold=True);s.text(112,710,'Learning',40,'green',True)
 s.text(540,470,'Read things I care about',58,bold=True)
 s.arrow(940,530,940,615,'blue',7)
 s.text(540,710,'Learn English along the way',58,'green',True)
 s.text(112,919,'What if the things I already read could also help me learn?',42)
 return s

def person(s,x,y):
 s.circle(x,y-35,24,'white','muted',2);s.path(f'M{x-42} {y+42} Q{x-42} {y} {x} {y} Q{x+42} {y} {x+42} {y+42}','muted',2)

def s12():
 s=Slide(12);s.heading(['If AI Can Translate Everything,','Why Learn Another Language?'])
 for x,label in [(112,'TRANSLATE FOR ME'),(1040,'HELP ME LEARN')]:s.text(x,425,label,36,bold=True)
 for x,mode in [(112,'translation'),(1040,'learning')]:
  s.lines(x,585,['Original','language'],240,36,leading=49)
  s.arrow(x+230,605,x+300,605,'muted',2)
  s.lines(x+340,585,['Translation','layer'] if mode=='translation' else ['Supported','reading'],240,36,leading=49)
  s.arrow(x+560,605,x+610,605,'muted',2);person(s,x+675,605)
 s.lines(112,812,'Understand a message',770,42,leading=54)
 s.lines(1040,812,'Build a relationship with a language',770,42,leading=54)
 s.text(112,935,'Language connects us with people, culture, and history.',35,'muted')
 return s

def s13():
 s=Slide(13)
 s.text(960,515,'LLMs will make the world',96,bold=True,anchor='middle')
 s.text(960,635,'more learnable',96,bold=True,anchor='middle')
 s.text(960,836,'Not just AI that translates for us — AI that helps us learn.',42,anchor='middle')
 s.text(112,933,'Thank you.',34,'muted')
 s.text(600,1025,'Democratizing Extensive Reading by Tailoring Web Content',22,'muted')
 return s

BUILDERS={1:s01,2:s02,3:s03,4:s04,5:s05,6:s06,7:s07,8:s08,9:s09,10:s10,11:s11,12:s12,13:s13}
def clock(s):return f'{s//60}:{s%60:02}'

def notes_and_sources():
 notes=['# Adapt-ER · UIST 2026\n','9-minute script · 13 slides · planned duration 540 seconds.\n']
 sources=['# Source map\n','Sole research source: Yungun Kim, Min Hyeong Kim, Suyeon Hwang, Gahyun Kim, Seokweon Jung, Hyeon Jeon, and Jinwook Seo. 2026. *Democratizing Extensive Reading by Tailoring Web Content*. UIST ’26. DOI: https://doi.org/10.1145/3830398.3830676. CC BY 4.0.\n','Audited PDF: `/Users/hj/Downloads/3830398.3830676.pdf` (16 pages). All page numbers below are PDF page numbers.\n','| Slide | Source | Treatment |\n|---|---|---|']
 treatments={1:'Conventional paper cover requested by the user; complete paper author order retained. Hyeon Jeon uses his current Aarhus University affiliation, following the existing decks. Other affiliations follow the paper. Remote-opening context remains in notes.',2:'Personal account; no invented hours or test scores.',3:'Design question; not an evaluated claim of language gains.',4:'Native vector browser/popup reconstruction; excerpt is illustrative, not an actual news quotation.',5:'Fig. 1 workflow topology, Fig. 2 in-page interaction; no raster screenshots.',6:'5% operational baseline; convened→gathered and interdisciplinary→between different fields follow Fig. 3; milestone is retained. Short example sentence is an adapted teaching snippet.',7:'Table 1 GPT-5 Iteration 1 vs GPT-4.1 Iteration 1. All displayed values are means.',8:'Fig. 3 four-stage roles; GPT-4.1 Iteration 3 values from Table 1: mean unknown ratio 5.71%, 4.8s, cost $0.02/article.',9:'12 Korean native speakers, self-reported A2–B2, within-subject, counterbalanced, 20 minutes/condition; same tooltip support, self-selected Google News.',10:'Fig. 4 directions only; p values removed from the slide following the user revision. Arrow length does not encode effect magnitude. Table 2 engagement is descriptive. P4 is paraphrased in notes, not quoted.',11:'Short-session scope, no demonstrated language gains, no tested cross-language/general-device transfer, possible meaning shifts.',12:'Explicit speaker reflection; does not imply translation prevents cultural understanding.',13:'Speaker vision; extension to other languages is an untested opportunity.'}
 for d in CONTENT:
  notes.extend([f'\n## {d["number"]:02}. {d["title"]}\n',f'**{clock(d["start"])}–{clock(d["end"])} · {d["duration"]} seconds**\n',d['notes']+'\n',f'*Source: {d["source"]}. {d["kind"]}.*\n'])
  sources.append(f'| {d["number"]:02} | {d["source"]} | {treatments[d["number"]]} |')
 sources.extend(['\n## Source audit details\n','- Table 1 selected values: GPT-5 Iteration 1, 5.84 ± 1.32% unfamiliar words; 211.8 ± 3.3s; $0.16/article. GPT-4.1 Iteration 1, 11.12 ± 6.92%; 3.4 ± 0.6s; <$0.01/article. GPT-4.1 Iteration 3, 5.71 ± 1.73%; 4.8 ± 0.6s; $0.02/article; BERTScore 0.9663; human score 4.67/5.','- Fig. 4 gives p=.00418 for reading speed (body rounds to .0042) and p=.0178 for tooltip use. We use the figure precision consistently. No mean reading-speed or tooltip count is inferred from point locations.','- Table 2 gives participant-level 5-point self-reports; the paper interprets them descriptively. We do not add a significance test.','- The 79.17% / 95.83% lightweight reading-verification result is omitted. It is not a comprehension-test result.','- Fig. 1 shows milestone preserved and interdisciplinary rewritten; Fig. 3 also explicitly shows convened→gathered. Their example text is illustrative (UIST 2084), not a claim about an actual conference.','- Personal remote-presentation/faculty-interview context comes only from the user-supplied plan. We do not invent an interview location or date.'])
 (ROOT/'speaker-notes.md').write_text('\n'.join(notes))
 (ROOT/'source-map.md').write_text('\n'.join(sources)+'\n')

def viewer():
 sections=[]
 for d in CONTENT:
  svg=(ROOT/'slides'/f'{d["slug"]}.svg').read_text().split('?>',1)[1]
  sections.append(f'<section class="slide" data-slide="{d["number"]}" aria-label="{html.escape(d["title"])}">{svg}</section>')
 data=json.dumps(CONTENT,ensure_ascii=False).replace('<','\\u003c')
 document='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The Best Language Lesson Is Not a Lesson — Adapt-ER</title><style>
*{box-sizing:border-box}body{margin:0;background:#e8ebed;font-family:Arial,Helvetica,sans-serif;color:#17232D}main{height:100vh;display:flex;align-items:center;justify-content:center;padding:12px}.slide{display:none;width:min(calc((100vh - 24px)*16/9),calc(100vw - 24px));aspect-ratio:16/9;background:white}.slide.active{display:block}.slide>svg{width:100%;height:100%;display:block}.notes{display:none;position:fixed;right:0;top:0;width:31vw;height:100vh;padding:30px;overflow:auto;background:#fff;border-left:1px solid #ced5da;font-size:19px;line-height:1.6}.presenter main{width:69vw}.presenter .slide{width:min(calc((100vh - 24px)*16/9),calc(69vw - 24px))}.presenter .notes{display:block}.notes h2{font-size:24px;line-height:1.3}.notes .timing{color:#66717a;font-size:17px}nav{position:fixed;bottom:12px;left:12px;display:flex;gap:8px;opacity:0;transition:opacity .15s}nav:hover,nav:focus-within{opacity:1}button{background:white;border:1px solid #ced5da;padding:8px 12px;border-radius:4px;font:15px Arial;cursor:pointer}#hint{position:fixed;left:16px;top:12px;font:14px Arial;color:#66717a;opacity:0}body:hover #hint{opacity:.8}@media print{main{height:auto;display:block;padding:0}.slide{display:block!important;width:100%;page-break-after:always}.notes,nav,#hint{display:none!important}@page{size:landscape;margin:0}}
</style></head><body><main>SECTIONS</main><aside class="notes" aria-label="Speaker notes"><p class="timing" id="timing"></p><h2 id="note-title"></h2><p id="note-body"></p><p class="timing" id="note-source"></p></aside><span id="hint">← → slides · P speaker notes · F fullscreen</span><nav aria-label="Slide navigation"><button id="previous">Previous</button><button id="next">Next</button><button id="presenter">Speaker notes</button></nav><script>
const content=DATA;let current=0;const sections=[...document.querySelectorAll('.slide')];
function clock(s){return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
function show(n){current=Math.max(0,Math.min(content.length-1,n));sections.forEach((s,i)=>s.classList.toggle('active',i===current));const d=content[current];document.querySelector('#timing').textContent=clock(d.start)+'–'+clock(d.end)+' · '+d.duration+' seconds';document.querySelector('#note-title').textContent=d.title;document.querySelector('#note-body').textContent=d.notes;document.querySelector('#note-source').textContent=d.source;history.replaceState(null,'','#/'+(current+1))}
function toggle(){document.body.classList.toggle('presenter')}
document.querySelector('#previous').onclick=()=>show(current-1);document.querySelector('#next').onclick=()=>show(current+1);document.querySelector('#presenter').onclick=toggle;
window.addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();show(current+1)}else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(current-1)}else if(e.key==='Home')show(0);else if(e.key==='End')show(12);else if(e.key.toLowerCase()==='p'||e.key.toLowerCase()==='n')toggle();else if(e.key.toLowerCase()==='f')document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()});
show(Number(location.hash.split('/')[1]||1)-1);
</script></body></html>'''.replace('SECTIONS','\n'.join(sections)).replace('DATA',data)
 (ROOT/'deck.html').write_text(document)

def sync_slidev():
 dest=REPO/'decks/adapt-er';(dest/'public/slides').mkdir(parents=True,exist_ok=True)
 for f in (ROOT/'slides').glob('*.svg'):shutil.copyfile(f,dest/'public/slides'/f.name)
 text='''---
theme: ../visualization-autocomplete/theme
layout: adapt-er
info: false
routerMode: hash
fonts:
  sans: Arial
  local: Arial
title: Adapt-ER — Democratizing Extensive Reading by Tailoring Web Content
colorSchema: light
aspectRatio: 16/9
canvasWidth: 980
transition: none
selectable: true
---
'''
 for i,d in enumerate(CONTENT):
  if i:text+='\n---\nlayout: adapt-er\ntitle: '+json.dumps(d['title'],ensure_ascii=False)+'\nclicks: 0\n---\n'
  text+=f'\n<AdaptErSlide src="{d["slug"]}.svg" title="{html.escape(d["title"],quote=True)}" />\n\n<!--\n'
  text+=f'{clock(d["start"])}–{clock(d["end"])} · {d["duration"]} seconds\n\n{d["notes"]}\n\nSource: {d["source"]}. {d["kind"]}.\n-->\n'
 # Existing Slidev markdown is user-owned: visual regeneration must never overwrite it.
 if not (dest/'slides.md').exists():(dest/'slides.md').write_text(text)

def load_current_notes():
 path=REPO/'decks/adapt-er/slides.md'
 if not path.exists():return
 raw=path.read_text()
 notes=re.findall(r'<AdaptErSlide\b[^>]+/>\s*<!--\n(.*?)\n-->',raw,re.S)
 if len(notes)!=len(CONTENT):
  raise RuntimeError('Cannot map current speaker notes safely; no files regenerated.')
 for d,note in zip(CONTENT,notes):
  # Only remove generated timing/provenance wrappers from derived HTML/Markdown notes.
  note=re.sub(r'^\d+:\d+–\d+:\d+ · \d+ seconds\n\n','',note)
  note=re.sub(r'\n\nSource: [^\n]*$','',note)
  d['notes']=note

def main():
 parser=argparse.ArgumentParser();parser.add_argument('--sync-only',action='store_true',help='Preserve hand-edited SVGs and refresh viewer / Slidev copies');args=parser.parse_args()
 load_current_notes()
 if not args.sync_only:
  for n in [5,6,7,8,10,4,9,11,1,2,3,12,13]:BUILDERS[n]().write(CONTENT[n-1]['slug'])
 notes_and_sources();viewer();sync_slidev()
 print('Built 13 SVGs, offline viewer, speaker notes, source map, and Slidev sources.')
if __name__=='__main__':main()
