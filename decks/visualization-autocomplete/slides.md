---
theme: ./theme
layout: cover
info: false
routerMode: hash
fonts:
  sans: Arial
  local: Arial
download: false
transition: none
title: Visualization Autocomplete
colorSchema: light
aspectRatio: 16/9
canvasWidth: 980
lineNumbers: false
selectable: true

# 표지 디자인 — 여기 숫자만 바꾸면 됩니다.
themeConfig:
  h2-size: 30px
  h3-size: 18px
  h3-weight: 400
  quote-size: 27px
  slide-padding-x: 50px
  slide-padding-top: 20px
  slide-padding-bottom: 44px
  list-indent: 0.5em
  list-marker-gap: 0.15em
  cover-header-size: 18px
  cover-header-gap: 3px
  cover-header-letter-spacing: -0.012em
  cover-title-size: 50px
  cover-subtitle-size: 24px
  cover-title-gap: -10px
  cover-author-size: 14px
  cover-author-gap: 18px

  # AuthorProfiles 기본값 — 컴포넌트에서 개별 지정하면 그 값이 우선합니다.
  authorProfiles:
    layout: row
    columns: 3
    imageSize: 120px
    cardWidth: 135px
    gap: 20px
    marginTop: 20px
    outerAlign: left
    innerAlign: center
    nameSize: 16px
    affiliationSize: 11px
---

<!--
저자 프로필 예시:

<AuthorProfiles
  :authors="[
    { image: '/authors/name.jpg', name: 'Name', affiliation: 'Affiliation' },
  ]"
/>
-->

<!--
페이지별 마진: 해당 슬라이드 frontmatter에 아래처럼 필요한 값만 추가하세요.
marginX: 70px
marginTop: 30px
marginBottom: 50px

지원 값: margin, marginX, marginY, marginTop, marginRight, marginBottom, marginLeft
숫자는 px로 처리되며, 4rem 같은 CSS 단위 문자열도 사용할 수 있습니다.
-->

## IEEE TVCG (Proc. VIS 2026)

# Visualization Autocomplete

Visualization Authoring via Stepwise Design Recommendations

<AuthorProfiles
  :authors="[
    {
      image: '/figs/authors/hj.png',
      name: '<b>Hyeon Jeon</b>',
      affiliation: 'Aarhus University',
    },
    {
      image: '/figs/authors/sbshin.jpg',
      name: 'Sungbok Shin',
      affiliation: 'Sogang University',
    },
		{
		  image: '/figs/authors/elm.jpg',
			name: 'Niklas Elmqvist',
			affiliation: 'Aarhus University'
		}
  ]"
/>

---
layout: source
title: ChartAuthoringTools
clicks: 1
sourceSlide: 39
---

<Source39 />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 39)

And we already have plenty of tools for making charts: Excel, Tableau, charting libraries, and now ChatGPT.

So, with all these tools available, is it actually easy for people to create the visualization they want?

Let me show you what I found when looking at how office workers make charts.
-->

---
layout: source
title: OfficeWorkersChartAuthoring
clicks: 1
sourceSlide: 40
---

<Source40 />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 40)

This chart was actually made by my wife. I anonymized the information because it’s from her company. So anyway, It looks pretty good, right?

[완성된 차트를 잠깐 보여준 뒤 클릭으로 편집 핸들 공개]

But here's how it was made. These elements were positioned by hand in PowerPoint. Click, drag, move something a little, and adjust it again. Etc.

And that's a lot of work to make one chart.

But my wife could make the chart look the way they wanted. And that tells us something about what people need.
-->

---
layout: source
title: OfficeWorkersLessons
clicks: 0
sourceSlide: 41
---

<Source41 />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 41)

They want to keep control over the design. They don't just want any chart; they want a chart that expresses what they have in mind.

That's what I mean by agency here.

But tools that give them a lot of flexibility, like charting libraries, can be difficult to approach. You first have to learn how to use them.
-->

---
layout: source
title: AuthoringAgencyApproachability
clicks: 4
sourceSlide: 42
---

<Source42 />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 42)

Let's look at these tools along those two dimensions: approachability and agency.

[클릭 1 Excel]

Excel is easy to get started with. You select your data and get a chart. But customizing it can become difficult.

[클릭 2 Charting libraries]

Charting libraries let you customize almost anything, but you need to learn their syntax and semantics.

[클릭 3 BI tools]

Tableau, and other BI tools, offers more interactive options, but also more features to learn.

[클릭 4 LLMs]

Language models let you ask for changes in your own words.

But there's a catch: you can customize only what you can describe. And describing exactly what you want is often the difficult part.
-->

---
layout: source
title: AuthoringAgencyGoal
clicks: 0
sourceSlide: 43
---

<Source43 />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 43)

My goal is to get both: an interface that's easy to approach, but still lets people make the chart they want.

Without having to program it or describe every detail in a prompt.
-->

---
layout: source
title: IntentTranslationAuthoring
clicks: 1
sourceSlide: 45
---

<Source45 />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 45)

Let's first look at the familiar workflow with a language model.

You say, “I want a chart like this, with these variables, arranged in this way.” The model takes that intent and translates it into a visualization.

[클릭으로 intent 설명의 어려움 공개]

But even if you have something in mind, putting it into words can be difficult. You might know what you want the result to look like without knowing how to explain it to ChatGPT.

The difficulty comes before the model even starts translating your request.
-->

---
layout: source
title: VisualizationAutocompletionModel
clicks: 1
sourceSlide: 46
---

<Source46 />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 46)

With Visualization Autocomplete, we change the role of the intelligence.

Instead of waiting for the user to describe everything, the system looks at the current chart and predicts what they might want to do next.

It's like saying, “Given what you've made so far, maybe you want to compare these categories using color?”

[클릭으로 사용자의 선택 문장 공개]

The system recommends possible next actions and shows their results. The user only needs to choose a recommendation that matches their intent.
-->

---
layout: source
title: AutocompletionSequence
clicks: 0
sourceSlide: 47
---

<Source47 />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 47)

The rationale is simple: it's hard to design something from scratch, but much easier to look at a design and evaluate it.

[화면의 단계별 애니메이션과 함께 설명한다]

Here, the user starts with an empty chart. The system suggests a few possible actions. They choose one, see the result, and then get a new set of suggestions.

At each step, they a just ask, “Does this look like what I wanted?” And they keep going until they're happy with the chart.
-->

---
layout: source
title: FastGenerationMotivation
clicks: 0
sourceSlide: 48
---

<Source48 />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 48)

But for this to work, the recommendations have to appear in real time.

When we make something, we iterate, right? We try one thing, look at it, and try another.

Now imagine having to wait a minute every time you want to see the next option. That really interrupts the process.

So we needed to make two things fast: choosing which actions to recommend, and generating the visualization code for those actions.

We didn't ask a language model to do all of that at every step.
-->

---
layout: source
title: AutocompleteRecommendationMechanism
clicks: 5
sourceSlide: 49
---

<Source49 />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 49)

For recommendation, we used a simple, data-driven method.

We took about two thousand chart specifications and decomposed them into primitive authoring actions, such as adding bar marks or changing title.

[클릭 1 primitives, 클릭 2 co occurrence]

We then measured how often pairs of these actions appear together. For example, if a chart has a bar mark, it's likely to have x and y encodings as well.

[클릭 3 current design]

During use, we look at the list of action already present in the chart the person is making.

[클릭 4 ranked transitions]

We use those co-occurrences to rank plausible next actions.

[클릭 5 apply]

Then we generate those options for the user, where users only have to select one of it. These patterns in existing charts let us make recommendations quickly.
-->

---
layout: source
title: DistilledCodeGeneration
clicks: 1
sourceSlide: 50
---

<Source50 />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 50)

Here, even though we can select actions fast, the problem remains. The second problem is turning a recommended action into actual visualization code.

Here, we did use a language model, but offline, before the user starts interacting with system

Usually, when we talk about knowledge distillation, we think of transferring knowledge from a large model to a smaller model, but Here, we distilled it into a rule-based JavaScript function.

[function을 말한 뒤 잠깐 쉰다]

We used the model to explore different chart designs and code changes, and generated test cases from them. We then built a reusable function to handle those changes.

[클릭으로 online 경로 공개]

During normal use, the function turns the current design and selected action into code. We don't need a new language-model call for every preview. That's how we keep the interaction fast.
-->

---
layout: source
title: AutocompleteUserStudy
clicks: 0
sourceSlide: 51
---

<Source51 />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 51)

Okay, so we evaluated this with eighteen office workers who created charts but had no formal visualization training.

They used authoring tools including Visualization Autocomplete, ChatGPT, and Excel. Visualization experts evaluated the quality of the charts: how well did they communicate the intended message?

We tested both simple and more complex charts. And the result was interesting.
-->

---
layout: source
title: AutocompleteQualityResults
clicks: 2
sourceSlide: 52
---

<Source52 />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 52)

For simple charts, which means that the charts had two variables, Visualization Autocomplete and the language-model condition performed similarly.

[클릭 1 complex 결과 공개]

But for more complex charts, with four variables, the difference became clearer.

[클릭 2 VisAuto와 LLM 차이 강조]

The charts people made with Visualization Autocomplete received higher ratings.

Our interviews suggested one reason: waiting for language-model responses discouraged people from iterating.

With Autocomplete, they could quickly see an option, try it, and move on to another change.

So keeping that iteration moving was important.
-->


---
layout: source
title: Live Demo
clicks: 0
---

<AutocompleteDemo />

<!--
Live demo: https://vis.autocomplete.studio/
-->

---
layout: source
title: My talks at VIS 2026
clicks: 0
---

<VisClosing />

<!--
Presentation dates, individual talk times, and rooms verified against the official IEEE VIS 2026 program on November 1, 2026. All times are Boston / US Eastern.
Distortion-aware Brushing: https://www.ieeevis.org/year/2026/program/content/55468113-2b87-4aee-b5e5-15176242d1b3/
Stop Misusing t-SNE and UMAP: https://www.ieeevis.org/year/2026/program/content/8f097b32-b19a-4015-852e-65c2b68adc89/
Visualization Autocomplete: https://www.ieeevis.org/year/2026/program/content/729acd33-e386-47c3-96f9-ed8efe84c8e7/
UMATO: https://www.ieeevis.org/year/2026/program/content/e3c6e201-9387-4b45-9046-e4d6834316b6/
Profile affiliation and faculty-position statement supplied by Hyeon Jeon.
-->
