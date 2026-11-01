---
theme: ../visualization-autocomplete/theme
layout: brushing-cover
info: false
routerMode: hash
fonts:
  sans: Arial
  local: Arial
download: false
transition: none
title: Distortion-aware Brushing
colorSchema: light
aspectRatio: 16/9
canvasWidth: 980
lineNumbers: false
selectable: true
themeConfig:
  cover-header-size: 18px
  cover-header-gap: 3px
  cover-header-letter-spacing: -0.012em
  cover-title-size: 42px
  cover-subtitle-size: 28px
  cover-title-gap: -10px
  cover-author-size: 14px
  cover-author-gap: 18px
  authorProfiles:
    layout: row
    columns: 7
    imageSize: 88px
    cardWidth: 110px
    gap: 8px
    marginTop: 28px
    outerAlign: left
    innerAlign: center
    nameSize: 14px
    affiliationSize: 10px
---

## IEEE TVCG

# Distortion-aware Brushing

for Reliable Cluster Analysis in Multidimensional Projections

<AuthorProfiles
  :authors="[
    {
      image: '/figs/authors/hj.png',
      name: '<b>Hyeon Jeon</b>',
      affiliation: 'Aarhus University',
    },
    {
      image: '/figs/authors/dab-michael-aupetit.png',
      name: 'Michaël Aupetit',
      affiliation: 'EPITA',
    },
    {
      image: '/figs/authors/dab-soohyun-lee.png',
      name: 'Soohyun Lee',
      affiliation: 'Seoul National University',
    },
    {
      image: '/figs/authors/dab-kwon-ko.png',
      name: 'Kwon Ko',
      affiliation: 'Stanford University',
    },
    {
      image: '/figs/authors/dab-youngtaek-kim.png',
      name: 'Youngtaek Kim',
      affiliation: 'Samsung Electronics',
    },
    {
      image: '/figs/authors/dab-ghulam-quadri.png',
      name: 'Ghulam Jilani Quadri',
      affiliation: 'University of Oklahoma',
    },
    {
      image: '/figs/authors/dab-jinwook-seo.png',
      name: 'Jinwook Seo',
      affiliation: 'Seoul National University',
    },
  ]"
/>

<!--
Title, author order, and coauthor affiliations: https://www.hyeonjeon.com/assets/pdf/jeon25tvcg3.pdf (page 1).
Hyeon Jeon's affiliation updated to Aarhus University, as requested for these VIS presentations.
Portraits reused from the existing SNU job-talk source assets.
-->
---
layout: source
title: UnreliableAnalysisProblem
clicks: 1
sourceSlide: 17
---

<SnuSlide :source-page="17" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 17)

So, here, what we know is that, novice analysts, in many diverse disciplines, already use many machine learning and AI techniques: clustering, dimensionality reduction, regression, and so on.

My finding is that, these are powerful tools, but they can also lead to unreliable analysis: an analysis that doesn't accurately reflect the underlying data, and can lead to incorrect conclusions.

I wanted to understand how this happens in practice.
-->

---
layout: source
title: DimensionalityReductionUsagePatterns
clicks: 0
sourceSlide: 20
---

<SnuSlide :source-page="20" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 20)

The first was misuse of well-known techniques. You may have heard of t-SNE or UMAP. They're widely used, and they work well in many analytic situations. But that doesn't mean they work equally well for every dataset and every analytical goal.

Still, people often apply the method they're familiar with to whatever problem they encounter.

The second pattern was cherry-picking of hyperparameters. Rather than systematically searching for settings that preserve the data well, people might use the defaults, choose settings arbitrarily, or settle on an output that looks good.

So why were people doing this, and how can we address this problem?
-->

---
layout: source
title: WhyOverreliance
clicks: 0
sourceSlide: 21
---

<SnuSlide :source-page="21" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 21)

For the first problem, one reason was a lack of access to specialized techniques.

If you're a biologist or a chemist, the methods you're most likely to encounter are the famous, general-purpose ones. You may not know that another method would be more suitable for your particular analysis.

So part of my work has been to design and deploy specialized techniques that improve on those familiar methods.

UMATO is one example. It builds on UMAP to better preserve structures that can be difficult to capture with the original method.

The goal is to give analysts a better option for those cases.
-->

---
layout: source
title: WhyCherryPicking
clicks: 0
sourceSlide: 22
---

<SnuSlide :source-page="22" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 22)

For hyperparameters, the problem was a little different. People often knew that optimization mattered. They knew that it is important. But they couldn't wait for it to finish, as the process required substantial amount of time.

So I asked: can we make that process faster by looking at the dataset itself?

The intuition is simple. Some datasets are more complex than others, so they shouldn't all receive the same amount of computational effort.

We characterize the dataset and predict the quality a method is likely to achieve. Once the search reaches that predicted level, we stop it instead of continuing to try more settings.

[식의 흐름을 위에서 아래로 가리킨다. 기호는 읽지 않는다]

That avoids unnecessary search and reduces the time people have to wait.
-->

---
layout: source
title: InevitableInformationLoss
clicks: 0
sourceSlide: 23
---

<SnuSlide :source-page="23" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 23)

Okay, so, These approaches helped a lot. But they didn't solve the whole problem.

Even with a better technique and better settings, distortion can still remain. And novice analysts may not realize that.

Think about a globe. Even this three-dimensional surface can't be flattened into a map while preserving all of its geometry. Different maps make different compromises.

[지구본과 지도들을 차례로 가리킨다]

Now imagine a dataset with many more dimensions. We shouldn't expect everything to fit perfectly into two.

For reliable analysis, people need to account for that distortion. But what if they don't even know it's there,
-->

---
layout: source
title: IntelligentBrushingMitigatesLoss
clicks: 0
sourceSlide: 24
---

<SnuSlide :source-page="24" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 24)

Can we help people analyze reliably multidimensional data?

My approach here was to make a familiar interaction, which is brushing, intelligent. Let me first show you what happens with an ordinary brush.
-->

---
layout: source
title: SemanticBrushingQuestion
clicks: 0
sourceSlide: 25
---

<SnuSlide :source-page="25" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 25)

Here we have housing data from California. The map shows location, while the other views show multidimensional attributes such as income, house value, and house age.

Suppose I want to find a group of places with similar characteristics across these attributes, and see how these groups are distributed across the map.

With an ordinary brush, I can select points that are close together on the map. But being geographically close doesn't necessarily mean being similar in income, house value, or the other attributes.

And places with very similar characteristics might be far apart on the map.

So I can select what looks like a group in two dimensions, without finding the group I actually wanted in the multidimensional data.
-->

---
layout: source
title: IntelligentBrushingSolution
clicks: 0
sourceSlide: 26
---

<SnuSlide :source-page="26" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 26)

What if the brush could look at that multidimensional data instead of me?

That's the idea of Distortion-aware Brushing.

As the user brushes, the system continuously analyzes the underlying attributes and recommends which points to select next.

[클릭으로 분석과 추천의 왕복을 보여준다]

The user chooses the recommendations that match their intent. And Here's how it works.
-->

---
layout: source
title: BrushingInspectProjection
clicks: 0
sourceSlide: 27
---

<SnuSlide :source-page="27" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 27)

First, the user looks at the visualization and identifies a region they want to investigate.

They just need a place to start.
-->

---
layout: source
title: BrushingFindStart
clicks: 0
sourceSlide: 28
---

<SnuSlide :source-page="28" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 28)

They move the brush to that region.

Some nearby points may only look similar because of their position on the screen. Other points that really are similar in the underlying attributes may be farther away.
-->

---
layout: source
title: BrushingConstructLens
clicks: 0
sourceSlide: 29
---

<SnuSlide :source-page="29" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 29)

The system now constructs a lens around the starting points.

You can think of this as a small window into the multidimensional relationships that the original view isn't showing clearly.
-->

---
layout: source
title: BrushingRelocatePoints
clicks: 0
sourceSlide: 30
---

<SnuSlide :source-page="30" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 30)

Inside that lens, the system adjusts the displayed positions.

Points that look close but are dissimilar in the underlying multidimensional data move away. Points that are similar but were separated in the view move closer.

That makes relevant points easier to reach. We're changing their displayed positions, not the original data.
-->

---
layout: source
title: BrushingStartSelection
clicks: 0
sourceSlide: 31
---

<SnuSlide :source-page="31" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 31)

The user can now press the mouse button and start brushing the points they want.

The lens helps them select points with similar attributes.
-->

---
layout: source
title: BrushingUpdateLens
clicks: 0
sourceSlide: 32
---

<SnuSlide :source-page="32" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 32)

As the selection changes, the system updates the lens using the points that have been brushed.
-->

---
layout: source
title: BrushingContinueSelection
clicks: 0
sourceSlide: 33
---

<SnuSlide :source-page="33" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 33)

The user continues brushing, and the system continues updating the lens.

They build up a group that's similar in the multidimensional data, even if it wasn't obvious in the original view.
-->

---
layout: source
title: BrushingConfirmCluster
clicks: 0
sourceSlide: 34
---

<SnuSlide :source-page="34" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 34)

Finally, they release the mouse button to confirm the selection.

That's the whole interaction, and let me show you what it looks like with the California housing data, which we had just seen before.
-->

---
layout: source
title: CaliforniaDabDemo
clicks: 0
sourceSlide: 35
---

<SnuSlide :source-page="35" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 35)

[슬라이드 전체 70초. 아래 발화와 조작을 함께 진행한다. 두 집단까지만 보여준다]

Let's start around San Francisco and San Jose. Suppose I'm interested in places with urban housing characteristics.

[첫 위치에 hover]

When I move the brush here, notice that some points from around Los Angeles come closer. They're far away geographically, but similar across the attributes we're using.

[첫 집단을 선택]

I can include those points in the same group.

Now let's start another brush in a more rural area.

[New brush 후 두 번째 집단을 짧게 선택]

We get a different group. We can compare the distributions: for example, the income and house values in the first group are higher than in this second group.

[Original positions로 원래 위치를 보여준다]

So we're identifying and comparing groups across multiple attributes, rather than just drawing a boundary around neighboring places on the map.
-->

---
layout: source
title: MnistUserStudy
clicks: 0
sourceSlide: 36
---

<SnuSlide :source-page="36" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 36)

We then evaluated whether this interaction actually helps people select groups more accurately.

In our user studies, we compared it with existing brushing techniques,

[과제 시연을 잠깐 보여준다]

Where, participants selected groups under different amounts of distortion.
-->

---
layout: source
title: DistortionBrushingResults
clicks: 1
sourceSlide: 37
---

<SnuSlide :source-page="37" />

<!--
Source: https://hyeonword.com/job-talk-2026/s/snu-job-talk/ (slide 37)

When distortion was low, which means that the information loss is small, all the techniques performed similarly.

[클릭으로 high distortion 결과 공개]

But when distortion was high, the other techniques lost accuracy, while Distortion-aware Brushing remained more accurate.

Okay, so the conclusion is that,

I enable novice analysts to analyze data and gain insights in a more reliable manner.

Now, suppose they've anyway found something interesting.

[다음 38]
-->


---
layout: source
title: Use Distortion-aware Brushing in your projects
clicks: 0
---

<DabProject />

<!--
Project website: https://distortion-aware-brushing.github.io/site/
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
