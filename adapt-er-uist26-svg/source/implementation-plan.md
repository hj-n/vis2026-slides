# CODEX IMPLEMENTATION PLAN — Adapt-ER UIST 2026 (9-minute SVG talk)

## 0. Codex에 전달할 최상위 명령

당신은 연구 발표를 설계하는 시니어 정보디자이너이자 SVG 개발자다. 첨부된 `paper.pdf`를 **단일 사실 근거**로 삼아 UIST 2026 논문 *Democratizing Extensive Reading by Tailoring Web Content* (Adapt-ER)의 **9분 / 13장 / 16:9 발표용 SVG 슬라이드**를 구현한다. 발표 스토리와 슬라이드별 구성은 이 문서에 지정되어 있다. **제품 데모, 화면 녹화, 애니메이션 영상은 만들지 말 것.** 논문에 포함된 **Figure 1, Figure 2, Figure 3, Figure 4, Table 1, Table 2**를 시각적·정보적 원본으로 사용하되, 확대된 논문 그림을 붙여넣지 않고 핵심 관계를 **100% 편집 가능한 벡터 기반 SVG**로 다시 설계하라.

우선순위는 (1) 논문 충실성, (2) 이야기 전달력, (3) 원거리에서도 읽히는 시각적 명료성, (4) SVG 편집 가능성이다. 완성할 때까지 전체 13장을 구현하고 미리보기·검수를 수행한다. 미정인 소소한 디자인 결정은 합리적으로 직접 정하라.

### 핵심 메시지

- Working title: **The Best Language Lesson Is Not a Lesson.**
- Paper title/subtitle: **Democratizing Extensive Reading by Tailoring Web Content — Adapt-ER**
- Opening question: *What if we could learn a language while doing what we already want to do?*
- Closing question: *If AI can translate everything, why learn another language?*
- Last line: *“The future I hope for is not one where we never have to learn another language. It's one where learning a language no longer has to be a separate task.”*
- 스토리의 핵심: 발표자 개인의 비원어민 영어 학습 경험 → 별도의 학습시간을 요구하는 문제 → 관심 있는 웹 콘텐츠를 그 자리에서 개인화하는 Adapt-ER → 시스템 설계 및 사용자 평가 → LLM 시대에도 언어 학습이 가지는 문화적 가치.
- **슬라이드 12~13의 문화적 메시지는 발표자의 성찰/향후 비전이다. 본 논문에서 실험으로 검증한 결과처럼 제시하지 않는다.**

## 1. 입력과 산출물

### 필수 입력

- `paper.pdf`: 16쪽짜리 첨부 논문 원문 (원본 파일명 `3830398.3830676.pdf`). 없으면 코드 생성을 시작하지 말고 이 파일이 있는지 확인하라.
- 이 계획서: `CODEX_IMPLEMENTATION_PLAN.md` 또는 `adapt_er_codex_plan.md`.

### 필수 산출물

```
adapt-er-uist26-svg/
├── slides/
│   ├── 01-wish-i-were-in-detroit.svg
│   ├── 02-english-second-job.svg
│   ├── 03-same-activity.svg
│   ├── 04-web-not-right-level.svg
│   ├── 05-adapt-er-workflow.svg
│   ├── 06-five-percent-challenge.svg
│   ├── 07-llm-baseline-tradeoff.svg
│   ├── 08-hybrid-pipeline.svg
│   ├── 09-study-design.svg
│   ├── 10-study-results.svg
│   ├── 11-what-we-did-not-prove.svg
│   ├── 12-why-learn-languages.svg
│   └── 13-world-more-learnable.svg
├── preview/
│   ├── 01.png ... 13.png              # SVG로부터 렌더링
│   └── contact-sheet.png             # 모든 슬라이드를 한 장에서 검토
├── deck.html                          # 키보드 좌/우로 SVG 전환하는 로컬 뷰어
├── speaker-notes.md                   # 영어 발표 멘트; 슬라이드당 2~6문장
├── source-map.md                      # 각 슬라이드가 사용한 PDF 그림/표와 출처
├── qa-report.md                       # 수치, 레이아웃, SVG 유효성 최종 검수
└── README.md                          # 열기/편집/렌더/발표 방법
```

- **SVG가 최종 산출물**이다. PNG는 검수용이며 SVG 내부에 raster PNG/JPEG를 삽입하면 안 된다.
- 표지·일러스트·브라우저 UI·도식·차트까지 `<path>`, `<rect>`, `<line>`, `<circle>`, `<text>`, `<tspan>` 등의 SVG 요소로 구현한다.
- 모든 핵심 문자는 실제 SVG `<text>`로 남길 것. 텍스트를 윤곽선 path로 변환하지 않는다.
- 외부 이미지/아이콘 URL, CDN, HTML `foreignObject`, canvas, 비디오, 런타임 네트워크 의존성 금지.
- 개발 코드(예: Python `svgwrite`, Node.js 코드 등)도 작업 디렉터리에 남겨 재생성할 수 있게 한다.
- `deck.html`은 로컬 브라우저에서 열 수 있는 가벼운 슬라이드 뷰어일 뿐, SVG를 대체하지 않는다.

## 2. 시각 디자인 시스템

- 캔버스: **1920×1080**, 모든 SVG에 `viewBox="0 0 1920 1080"`, 16:9.
- 배경: `#FFFFFF` 또는 아주 미묘한 `#FCFCFA`. 검은색에 가까운 메인 텍스트 `#17232D`, 보조 `#66717A`.
- 파이프라인 시각 언어는 원 논문 Figure 3의 역할 구분을 잇는다: **CODE = blue `#2771C9`**, **LLM = coral `#E46C59`**.
- 학습 어휘: **KEEP / meaningful challenge = green `#248765`**, **unknown / challenge = amber `#D9902F`**, **simplified = coral**. 색상만으로 의미를 표현하지 말고 명시적 라벨 추가.
- 폰트: Arial / Helvetica / Noto Sans 등 시스템 기본 산세리프. 폰트 파일 동봉 금지.
- 상단 제목: 약 68–78 px, 본문 34–42 px, 설명 27–32 px, 작은 출처 22–24 px. 멀리서 안 보이는 14–18px 글씨 금지.
- 권장 안전 영역: x=112–1808, y=95–985. 하단 footer와 출처의 위치 고정.
- 단일 슬라이드에 하나의 메시지. 복잡한 논문의 여러 패널을 통째로 복제하지 않는다.
- 전체 발표에 걸쳐 브라우저 창의 기본 구성(상단바, 기사 제목, 본문, 강조 단어) 및 카드/화살표 문법을 재사용한다.
- 장식적 stock photo·3D 렌더·AI 이미지 불필요. 그림을 직접 trace하여 지나치게 복잡하게 만드는 것보다 연구 아이디어만 남긴 강한 도식을 우선한다.
- 범례를 최대한 직접 라벨로 대체한다. 차트 눈금이 필요할 경우 원문과 다른 정밀도/단위를 암시하지 않게 한다.
- 모든 연구 결과 슬라이드의 하단 작은 글씨에 `Adapted from Kim et al., UIST '26, Fig. N / Table N` 형태의 출처 표기.

## 3. 9분 타이밍 및 슬라이드별 세부 제작 지시

총 **540초**, **13장**. 아래 제목은 실제 SVG 헤드라인으로 사용한다. 인용된 짧은 영어 문구는 발표 스크립트 후보이며 슬라이드 전체 문장으로 옮길 필요는 없다.

### ACT I — Personal motivation / 0:00–2:25

#### S01. `I Wish I Were in Detroit.` — 0:00–0:25 (25s)

- **비주얼**: 16:9 흰 화면에 `UIST 2026 · Detroit`를 한쪽, `Remote presentation`을 다른 쪽에 작은 벡터 표시(모니터·화면 프레임)로 연결. 절제되고 유머가 있는 톤. **실제 인터뷰 장소, 일정, 항공편 등을 임의로 만들지 말 것.**
- **텍스트**: `I Wish I Were in Detroit.` / 작은 부제 `Adapt-ER · UIST 2026`. 원 논문 제목과 저자 명단은 하단/미세한 secondary line으로만.
- **멘트 의도**: 본래 직접 발표할 계획이었으나 변경할 수 없는 faculty job interview 때문에 원격 발표. 아쉬움을 짧게 표현하고 자연스럽게 영어 학습 이야기로 연결.
- **근거**: 사용자 제공 발표 배경; 연구 결과를 나타내는 슬라이드 아님.

#### S02. `Learning English Was Almost a Second Job.` — 0:25–1:05 (40s)

- **비주얼**: 동일한 하루의 두 개의 분리된 레일 `What I need to do` / `English study`, 시간 블록을 벡터로 표현. 공부를 위해 별도 시간을 내야 하는 부담이 한눈에 보이게.
- **텍스트**: 최소한 `Research / Read / Work` 와 `Study English`만. 발표자가 영어 비원어민으로서 공부해 온 개인 경험을 전달.
- **금지**: 근거 없는 공부 시간, 시험 점수, 국적 관련 일반화.

#### S03. `What If These Were the Same Activity?` — 1:05–1:45 (40s)

- **비주얼**: S02의 별개 작업 블록 두 개를 겹쳐서 하나의 큰 블록 `Read things I care about → Learn English along the way`로 재구성. S13에서 이 구성을 다시 회수할 것.
- **핵심 질문**: `What if the things I already read could also help me learn?`
- **연출**: S02/S03의 좌표와 모양을 비슷하게 설계해 정적 SVG 2장 사이의 슬라이드 전환만으로 시각적 변화가 느껴지게.

#### S04. `The Web Has Everything. Except the Right Difficulty.` — 1:45–2:25 (40s)

- **원본 소스**: 논문 **Introduction/Design Requirements, PDF pp.2–4**, Fig. 2 (PDF p.5)의 실제 웹 기사 스크린샷 레이아웃.
- **재구성**: 좌측 뉴스 페이지의 본문에서 몇 단어를 amber로 강조 → `lookup` 작은 팝업 → 페이지로 돌아옴 → 다른 단어에서 다시 lookup. 복잡한 process chart 대신 2~3개의 연결 요소로 `read → stop → look up → resume` 반복을 표현.
- **요지**: Extensive Reading은 흥미로운 글을 지속해서 읽는 것이 중요하지만, 일반 웹 콘텐츠의 난이도는 독자 수준과 맞지 않아 reading flow를 끊는다.
- **미리 깔아둘 연결 문장**: `The problem isn't finding something interesting to read. It's being able to keep reading it.`

### ACT II — Paper / 2:25–7:35

#### S05. `The Article Stays. The Difficulty Changes.` — 2:25–3:30 (65s)

- **주요 원본**: **Fig. 1, PDF p.1**, 보조 **Fig. 2, PDF p.5**. Figure 1의 3-step 사용자/시스템 루프를 전체 토폴로지로 사용한다.
- **SVG 구성**: 수평 3패널: `0. Profile` (짧은 어휘 체크) → `1. Choose` (독자가 선택한 news article) → `2. Read & refine` (원문 안에서 known/unknown 단어 클릭). 아래에 얇은 되먹임 화살표 `Vocabulary profile → Adaptation → Updated profile`.
- **기존 그림의 핵심 동작 보존**: initial profiling, 페이지 안에서 바로 contextual rewriting, word-level `known / unknown` feedback이 이후 적응에 반영됨.
- **원본 스크린샷을 이미지로 박지 말 것**: Fig. 2의 브라우저 UI를 SVG 직사각형과 실제 텍스트로 *단순 재도해*. 컨트롤, highlight, popup 정도만 필요.
- **그대로 말할 메시지**: 별도 교재로 이동하는 것이 아니라 **이미 읽고 싶었던 페이지 자체를 적응**시킨다. 학습자가 관심사를 고를 수 있는 autonomy를 지킨다.

#### S06. `A Little Difficulty Is the Point.` — 3:30–4:10 (40s)

- **주요 원본**: **Fig. 1 p.1 / Fig. 3 p.7 / Section 4 p.4**.
- **SVG 구성**: 상단 `Not 0% unknown.` → 큰 비율 블록 `Target ~5% unfamiliar words` (95/5 segmented bar) → 하단 **기사 문구 전/후 비교**.
- **논문 속 단어 예시를 정확히 반영**: `convened → gathered`; `interdisciplinary → between different fields`; `milestone`처럼 의미상 중요해서 **preserve**하는 단어를 유지. 어느 단어가 keep/rewrite인지 실제 Fig.1/Fig.3를 시각 검수하라.
- **세 가지 명시적 라벨**: `Keep important new words`, `Simplify the rest`, `Preserve meaning`.
- **주의**: `5%`는 학습자별 난이도를 제어하기 위한 **operational baseline**이다. 학습에 최적인 정답, 유의미한 장기 학습 효과로 표현하지 않는다.

#### S07. `We Asked an LLM to Do Everything. That Didn't Work.` — 4:10–4:50 (40s)

- **주요 원본**: **Table 1, PDF p.8**, Section 5.3 p.6.
- **SVG 구성**: large side-by-side two-column contrast. 왼쪽 GPT-5 / Full article: **5.84% unfamiliar**, **211.8 s**, 작은 라벨 `Accurate, but too slow`. 오른쪽 GPT-4.1 / Full article: **11.12% unfamiliar**, **3.4 s**, 작은 라벨 `Fast, but off target`. 상단 목표 `Target: ~5%`.
- **수치**: 위 네 숫자는 Table 1의 평균값이므로 그대로 사용. 표 전체나 기타 모델 비교는 넣지 말 것.
- **설명**: LLM에게 기사 전체와 단어 목록·목표 비율을 모두 맡기면 속도 또는 제어 정확도 중 하나가 희생된다.

#### S08. `Let Code Count. Let LLMs Understand.` — 4:50–5:35 (45s)

- **주요 원본**: **Fig. 3, PDF p.7**, **Table 1, PDF p.8**, Section 5.5.
- **SVG 구성**: 종이의 Fig.3 전체를 크게 집어넣는 대신, 네 단계로 다시 그림:
  1. `CODE`: Profile matching / word counting / 5% budget
  2. `LLM`: Rank unfamiliar words by contextual importance
  3. `CODE`: Construct Keep/Simplify lists; split into paragraphs
  4. `LLM + CODE`: Contextual paragraph rewriting / parallel requests / reassemble
- **한눈에 구별**: CODE 파란 테두리/배경, LLM coral; 도형 하단에 3개 큼직한 수치: `5.71% unfamiliar`, `4.8s/article`, `$0.02/article` (GPT-4.1 Iteration 3 기준).
- **상세 설명의 범위**: 모델 아키텍처가 아닌 **계산은 코드, 의미 판단은 모델**이라는 역할 분리만 설명.
- **정확성**: '5.71% exactly achieved'가 아니라 평균 5.71%, 5% 타깃 근처라는 점. 원문 BERTScore 0.9663/human score 4.67은 필요할 경우 footer에만.

#### S09. `But Does It Actually Help People Read?` — 5:35–6:05 (30s)

- **주요 원본**: **Section 6.1, PDF pp.8–9**, Fig. 2 p.5(브라우저 모양 재사용).
- **SVG 구성**: 왼쪽 `Ordinary web reading`/오른쪽 `With Adapt-ER` 브라우저 2개. 가운데 `12 Korean speakers learning English` `A2–B2` `20 min × 2 conditions` 배지(굵은 텍스트 라벨; 화려한 badge 장식 금지).
- **일치해야 할 내용**: both conditions had the same dictionary/translation tooltip support; participants self-selected news through Google News; within-subject; order counterbalanced.
- **핵심 평가 질문**: 영어 실력이 단기간 증가했는지보다 실제 읽기 흐름이 개선되었는지.

#### S10. `Less Decoding. More Reading.` — 6:05–7:05 (60s)

- **주요 원본**: **Fig. 4, PDF p.9**, **Table 2 / qualitative findings, PDF p.10**.
- **SVG 구성**: 논문 Fig.4의 두 결과를 **두 개의 큼직한 나란한 SVG 미니차트**로 재도해: `Reading speed ↑ (p=.00418)`와 `Tooltip use ↓ (p=.0178)`. 원본의 w/o vs w/ 비교, 지표 방향, p 값 보존. 아래에 짧은 qualitative takeaway `From decoding words → understanding meaning`.
- **중요**: 논문 본문은 각 지표의 정확한 평균 숫자를 표로 제공하지 않는다. 원본 Fig.4의 점 위치를 보고 **근거 없는 소수점 평균을 만들어 쓰면 안 된다.** 점 그림을 근사 재현한다면 차트 값이 원본 수치가 아님을 표시하거나, 더 안전하게 방향 화살표 + 정확한 p값만 이용한다.
- **참가자 반응**: `pleasure, confidence, relaxation, motivation`은 전반적으로 **descriptively higher**. 통계적 유의성, 언어 능력 향상, comprehension 증가를 주장하지 않는다.
- **P4 내용 요약**: 기존에는 시험 문제 해독 같았는데 적응 후 의미에 집중할 수 있었다. 직접 인용은 원문 p.10을 확인하고 짧게만.

#### S11. `We Didn't Prove Better English. We Made Reading More Workable.` — 7:05–7:35 (30s)

- **주요 원본**: **Introduction p.2, Discussion/Limitations PDF p.11, Conclusion p.11**.
- **SVG 구성**: 좌측 `What we observed` 아래 `faster reading`, `fewer lookups`, `higher reported engagement`; 우측 `What remains open` 아래 `long-term language gains`, `other languages`, `other genres/devices`.
- **취지**: 본 논문의 실증은 12명 한국어 화자의 영어 뉴스 읽기, 짧은 세션에 한정. 장기 학습 향상 및 언어 간 일반화는 후속 연구다.
- **연결**: 여기서 `Would a future AI remove the need to learn languages at all?` 질문으로 넘어간다.

### ACT III — Bigger reflection / 7:35–9:00

#### S12. `If AI Can Translate Everything, Why Learn Another Language?` — 7:35–8:15 (40s)

- **근거 위치**: 이 슬라이드는 **논문 외 저자의 철학적 성찰**. 데이터·결론으로 오인되지 않도록 `A broader question`을 작은 라벨로.
- **SVG 구성**: 동일한 지구/웹 페이지를 두 가지 방식으로 접근하는 2-column 메타포. `TRANSLATE FOR ME`는 원문과 사용자 사이에 번역 층이 있는 그림; `HELP ME LEARN`은 원문과 사용자 사이에 쉬운/적응형 읽기 경로가 있는 그림.
- **핵심**: 의미 전달 도구로서 번역의 효용을 부정하지 않음. 다만 언어는 문화, 역사, 사람을 이해하는 경험과 연결되어 있으므로 **언어를 직접 배우는 가치**가 남는다.
- **금지**: 번역이 문화 이해를 불가능하게 한다는 단정, 연구가 이를 증명했다는 표현.

#### S13. `Make the World More Learnable.` — 8:15–9:00 (45s)

- **비주얼**: S02의 분리된 `DO THINGS` / `STUDY LANGUAGE` 레일이 S03와 달리 완전히 겹쳐져 `READ WHAT YOU CARE ABOUT` = `LEARN ALONG THE WAY`가 되는 **시각적 콜백**. 배경에는 S05 브라우저창/어휘 강조 모티프를 아주 옅게 재사용할 수 있음.
- **텍스트**: 화면 중앙 `Make the World More Learnable.` 아래 최소한의 문장 `Not just AI that speaks for us — AI that helps us learn.`
- **마지막 메시지**: 현재 연구의 실험은 한국어 화자가 영어 기사를 읽는 상황에서 이뤄졌으나, **핵심 interaction design은 더 많은 언어로 확장할 가치가 있는 가설**이다. 검증된 범위를 넘는 일반화 주장 금지.
- **마지막 발표 멘트**: `The future I hope for is not one where we never have to learn another language. It's one where learning a language no longer has to be a separate task.`
- **마감**: 작은 글씨로 `Adapt-ER · Democratizing Extensive Reading by Tailoring Web Content · UIST 2026`와 `Thank you.`

### 타이밍 검산

| Slide | Time | Seconds | Primary source |
|---|---|---:|---|
| 01 | 0:00–0:25 | 25 | Presenter context |
| 02 | 0:25–1:05 | 40 | Presenter context |
| 03 | 1:05–1:45 | 40 | Design framing |
| 04 | 1:45–2:25 | 40 | §1, §3, Fig. 2 |
| 05 | 2:25–3:30 | 65 | Fig. 1, Fig. 2 |
| 06 | 3:30–4:10 | 40 | Fig. 1, Fig. 3, §4 |
| 07 | 4:10–4:50 | 40 | Table 1 |
| 08 | 4:50–5:35 | 45 | Fig. 3, Table 1 |
| 09 | 5:35–6:05 | 30 | §6.1 |
| 10 | 6:05–7:05 | 60 | Fig. 4, Table 2, §6.2–6.3 |
| 11 | 7:05–7:35 | 30 | §7.3, §8 |
| 12 | 7:35–8:15 | 40 | Speaker reflection; not a paper finding |
| 13 | 8:15–9:00 | 45 | Speaker vision; not a tested finding |
| **Total** | **0:00–9:00** | **540** | |

## 4. 논문 원본 Figure/Table 활용 매핑

| 논문 요소 | PDF 페이지 | 적용 슬라이드 | Codex 재구성 원칙 |
|---|---:|---|---|
| **Figure 1** Adapt-ER overview | 1 | 05, 06 | 0/1/2 유저 플로우·vocabulary profile loop; 장황한 원본 레이아웃은 축약 |
| **Figure 2** 3-step Chrome usage screenshot | 5 | 04, 05, 09 | 실제 Chrome 화면 대신 벡터 브라우저 프레임·하이라이트·팝업으로 재도해 |
| **Figure 3** hybrid code/LLM pipeline | 7 | 06, 08 | CODE/LLM 구분, Keep vs Simplify, 단락별 rewrite, 재조립을 4-stage로 재구성 |
| **Table 1** pipeline comparisons | 8 | 07, 08 | 정확히 필요한 2개 baseline과 최종 pipeline만 추출; 수치 검수 |
| **Figure 4** reading speed / tooltip use | 9 | 10 | 방향과 p값 중심으로 큰 비교 도해; 실제 없는 정밀한 평균/효과량 창작 금지 |
| **Table 2** engagement responses | 10 | 10 (보조) | pleasure/confidence/relaxation/motivation의 기술적 경향만 간결하게 정리 |
| **Discussion & limitations** | 10–11 | 11–13 | 학습 효과/확장 가능성 주장의 범위를 엄격히 구분 |

## 5. 논문 팩트 체크 기준 (중요)

아래는 구현 전에 확인해야 하는 숫자/문구. 인쇄물 원문과 비교한 후 SVG에 반영하라.

1. `Adapt-ER`는 **browser extension**이며, 사용자가 직접 선택한 영어 뉴스 웹페이지 텍스트를 **in place** 재작성한다. 별도 학습용 기사 라이브러리 아님.
2. 최초 vocabulary profile → 본문 선택/적응 → 읽으며 known/unknown 클릭 → 향후 adaptation으로 feedback이 이어진다.
3. `5% unfamiliar words`는 **operational baseline**이며 최적 학습 난이도를 보증하는 숫자가 아니다.
4. 논문 pipeline 실험: GPT-5 full-article **5.84% ± 1.32**, **211.8s ± 3.3**, **$0.16/article**; GPT-4.1 full-article **11.12% ± 6.92**, **3.4s ± 0.6**, **< $0.01/article**; 최종 GPT-4.1 paragraph-level **5.71% ± 1.73**, **4.8s ± 0.6**, **$0.02/article**; BERTScore **0.9663**; final human score **4.67/5**.
5. 사용자 연구: **n=12**, native Korean speakers, self-reported CEFR **A2–B2**, Google News에서 self-selected 기사. within-subject, **20분 × 2 조건**, 순서 counterbalance.
6. Reading speed increased: **p=0.00418** (본문에서는 rounded **p=.0042**). Tooltip-use decreased: **p=0.0178**. 어느 쪽 표기를 쓰든 일관되게.
7. Self-reported engagement는 긍정적 **기술 통계적 경향**이다. 척도 관련 정밀한 유의성 주장 불가.
8. 79.17% vs 95.83% reading verification은 **comprehension 시험으로 해석하지 않는다**. 발표에서는 생략하는 편이 좋다.
9. **Short-term/long-term language learning improvement was not demonstrated.** 직접적인 어휘 습득 효과가 검증되었다는 문구 금지.
10. **Korean-to-English only, desktop news only in evaluation.** 다언어 적용은 설계 수준의 가능성/미래 연구로만.
11. LLM rewriting에서 의미를 바꿔 버리는 문제는 남음(§5.7). `preserves meaning perfectly` 같은 절대 표현 금지.
12. 원본 논문은 **CC BY 4.0**. 재구성 사실과 출처를 source-map / README에 표시; 수치 및 개념의 원문 출처 명시.

## 6. 구현 순서 (Codex 실행 절차)

### Phase 1 — Source audit

1. `paper.pdf`가 열리는지 확인.
2. PDF p.1,5,7,8,9,10,11을 직접 이미지로 렌더하여 Fig.1–4, Table1–2를 눈으로 검토.
3. `source-map.md`에 정확한 그림번호/페이지/각 슬라이드 정보 대응표 작성.
4. 연구 내용과 발표자의 개인적 성찰을 구분해서 적는다.

### Phase 2 — Design system & reusable components

1. `1920×1080` SVG 생성 파이프라인 구축.
2. 반복 가능한 SVG 컴포넌트: `SlideFrame`, `BigTitle`, `BrowserFrame`, `ArticleParagraph`, `WordHighlight`, `FeedbackBubble`, `Arrow`, `StageCard`, `ComparePanel`, `MiniChart`, `FooterCitation`.
3. font-size / colors / safe margins를 config로 통일.
4. 아주 작은 글씨 없이 Figure 1/2/3/4 리디자인부터 제작하고 그 주변에 메시지를 배치.

### Phase 3 — Build SVGs

1. 05/06/07/08/10 — 논문 핵심 그림 중심 장을 **먼저 구현**.
2. 04/09/11 — 근거와 흐름을 보강하는 장.
3. 01/02/03/12/13 — 시작과 끝을 같은 시각 언어로 묶는 장.
4. 각 장의 source-map/notes/메시지와 실제 시각적 핵심이 일치하는지 점검.

### Phase 4 — Render & QA

1. 모든 SVG가 XML로 정상 파싱되고 viewBox가 1920×1080인지 자동 검사.
2. 모든 SVG를 PNG로 렌더하고 **contact-sheet.png** 생성.
3. 글자가 영역 밖으로 벗어나거나 화살표/카드와 겹치는지, 16:9 슬라이드 크기에서 3초 내 메시지가 읽히는지 육안 검토.
4. 수치와 figure content를 원 PDF의 캡션/표와 대조.
5. SVG 내부에 이미지가 `data:image` 또는 `<image>`로 포함되어 있지 않은지 검사; `<text>` 요소 존재 확인.
6. 링크/네트워크 없이 `deck.html`에서 13장을 탐색할 수 있는지 점검.
7. 발표 멘트 영어 문법과 slide timing 총 540초를 검산.
8. 최종 `qa-report.md`에 pass/fail 및 남아 있는 불확실성을 기재. 모든 문제 수정 후 최종 완료.

## 7. 성공 기준 (Definition of Done)

- 13개 SVG가 정확히 지정된 파일명으로 존재한다.
- 원본 **Fig.1–4 + Table1–2**가 필요한 곳에서 정확하게 재설계되어 있다.
- 확대된 논문 스크린샷/이미지가 아니라, 의미 있는 모든 선·도형·차트·글자가 편집 가능한 SVG이다.
- 발표 전체가 9분이며 **opening personal story → research → reflection**의 흐름이 살아 있다.
- 데모, 인터랙티브 시스템 접속, 동영상, 애니메이션 의존성이 전혀 없다.
- 5% baseline의 의미, n=12 study, 실제 통계 결과, 장기학습 미검증 및 다언어 미검증 제한을 정확히 표현한다.
- 최종 contact sheet를 봤을 때 각 장이 서로 다른 역할을 하는 동시에 일관된 스타일을 유지한다.
- 핵심 메시지는 **“Not a new place to study, but a new way to learn from the things we already read.”**이다.

## 8. Codex가 임의 변경하면 안 되는 결정

- 논문 중심 주제가 **외국어 학습을 일상 속 관심 있는 웹 읽기에 통합하는 것**이라는 점.
- 발표자의 opening personal story와 closing reflection (AI 번역이 외국어 학습의 가치를 완전히 없애는 것은 아니라는 메시지).
- 슬라이드 05는 Fig.1/2 기반, 슬라이드 08은 Fig.3 기반, 슬라이드 10은 Fig.4 기반으로 구현.
- 유저 연구 결과를 **어학 능력 향상으로 과장하지 말 것**.
- 13장, 540초, SVG 중심 결과물, 노데모 방침.

---

**참고 논문**: Yungun Kim, Min Hyeong Kim, Suyeon Hwang, Gahyun Kim, Seokweon Jung, Hyeon Jeon, and Jinwook Seo. 2026. *Democratizing Extensive Reading by Tailoring Web Content*. UIST '26. DOI: https://doi.org/10.1145/3830398.3830676 . License: CC BY 4.0.
