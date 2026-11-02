---
theme: ../visualization-autocomplete/theme
layout: misuse-cover
info: false
routerMode: hash
fonts:
  sans: Arial
  local: Arial
download: false
transition: none
title: Stop Misusing t-SNE and UMAP
colorSchema: light
aspectRatio: 16/9
canvasWidth: 980
lineNumbers: false
selectable: true
themeConfig:
  cover-header-size: 18px
  cover-title-size: 42px
  cover-subtitle-size: 28px
  authorProfiles:
    layout: row
    columns: 4
    imageSize: 120px
    cardWidth: 145px
    gap: 35px
    marginTop: 36px
    outerAlign: left
    innerAlign: center
    nameSize: 16px
    affiliationSize: 11px
---

## IEEE TVCG

# Stop Misusing t-SNE and UMAP

for Visual Analytics

<AuthorProfiles
  :authors="[
    { image: '/figs/authors/hj.png', name: '<b>Hyeon Jeon</b>', affiliation: 'Aarhus University' },
    { image: '/figs/authors/jeongin-park.png', name: 'Jeongin Park', affiliation: 'Seoul National University' },
    { image: '/figs/authors/sbshin.jpg', name: 'Sungbok Shin', affiliation: 'Sogang University' },
    { image: '/figs/authors/jinwook-seo.png', name: 'Jinwook Seo', affiliation: 'Seoul National University' },
  ]"
/>

<!--
Title and author order: https://www.ieeevis.org/year/2026/program/content/8f097b32-b19a-4015-852e-65c2b68adc89/
Hyeon Jeon's current affiliation is Aarhus University, as requested for these decks.
Portraits reused from the existing Autocomplete, DAB, and SNU job-talk assets.
-->

---
layout: source
title: Misuse of DR technique
clicks: 0
---

<MisuseDefinition />

<!--
Definition supplied by the user: used for analytical tasks that investigate the structure of data that the techniques do not aim to preserve
-->

---
layout: source
title: Example of DR misuse
clicks: 0
---

<MisuseExample />

<!--
Teaser (Figure 1) from Stop Misusing t-SNE and UMAP for Visual Analytics, page 1.
Source: https://www.hyeonjeon.com/assets/pdf/jeon26vis.pdf
Projection artwork cropped from the original PDF; explanatory paragraphs and the figure caption are omitted. Technique labels are editable slide text.
-->

---
layout: source
title: Cumulative misuses by year
clicks: 0
---

<MisuseByYear />

<!--
Only Figure 3(b), as cropped and supplied by the user; Figure 3(a) is not included.
Data checked against the original PDF vector paths on page 5: https://www.hyeonjeon.com/assets/pdf/jeon26vis.pdf
Integer values and provenance: data/figure3b.json.
The counts refer to papers in the surveyed literature, rather than all uses of dimensionality reduction in practice.
-->

---
layout: source
title: Use and misuse by DR technique
clicks: 0
---

<MisuseByTechnique />

<!--
Reconstructed from the user-supplied crop of Figure 5, containing the count and percentage panels.
Source: https://www.hyeonjeon.com/assets/pdf/jeon26vis.pdf (page 6, Figure 5).
Data and provenance: data/figure5.json. The percentage panel is normalized from exactly the same counts as the count panel.
These counts refer to technique uses in the reviewed papers; techniques can occur in multiple reviewed papers and papers can use more than one technique.
-->

---
layout: source
title: Will people stop misusing t-SNE and UMAP?
clicks: 1
---

<WillMisuseStop />

---
layout: source
title: Misuse is already a well-known problem
clicks: 0
---

<KnownMisuse />

<!--
Example: Martin Wattenberg, Fernanda Viégas, and Ian Johnson. How to Use t-SNE Effectively. Distill, 2016.
Official article and citation: https://distill.pub/2016/misread-tsne/
DOI: https://doi.org/10.23915/distill.00002
Screenshot supplied by the user. Article diagrams and text licensed CC BY 2.0, as stated by Distill.
-->

---
layout: source
title: Why does misuse occur?
clicks: 0
---

<WhyMisuseOccurs />

---
layout: source
title: Practitioners lack an understanding of how to use DR properly
clicks: 0
---

<LimitedDrUnderstanding />

---
layout: source
title: Practitioners lack the motivation to use DR properly
clicks: 0
---

<LimitedDrMotivation />

<!--
P6 quotation supplied by the user; spelling corrected from "critisim" to "criticism".
-->

---
layout: source
title: Libraries are promoting the misuse of t-SNE and UMAP
clicks: 0
---

<LibrariesPromoteMisuse />

<!--
Finding from the expert interviews: Stop Misusing t-SNE and UMAP for Visual Analytics, section 6.2, Finding 2 (page 8).
https://www.hyeonjeon.com/assets/pdf/jeon26vis.pdf
The screenshots illustrate the readily available, polished implementations discussed by the experts; they are not presented as evidence that the documentation explicitly instructs misuse.
UMAP GitHub README: https://github.com/lmcinnes/umap
scikit-learn TSNE API documentation: https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html
Screenshots captured November 1, 2026.
-->

---
layout: source
title: Intrinsic bias of human perception is promoting the misuse of t-SNE and UMAP
clicks: 3
---

<PerceptualBias />

<!--
Reconstructed from the user-supplied screenshot of Figure 1. Explanation text beneath the dialogue bubbles is omitted as requested.
Source: https://www.hyeonjeon.com/assets/pdf/doh25arxiv.pdf
The projection panels and speaker icons are original embedded images extracted from page 1 of that paper; the dialogue is editable text and appears two bubbles per click, with the final fifth bubble on the third click.
Reference supplied by the user: Seoyoung Doh, Hyeon Jeon, Sungbok Shin, Ghulam Jilani Quadri, Nam Wook Kim, and Jinwook Seo. Understanding Bias in Perceiving Dimensionality Reduction Projections. VIS 2025 Workshop on Visualization for Communication (VisComm).
-->

---
layout: source
title: "Solution 1: Automation"
clicks: 0
---

<AutomationSolution />

---
layout: source
title: "Solution 1: Automation — Preliminary Results"
clicks: 0
---

<AutomationResults />

<!--
Comparison image reused from DAB slide 5 (source slide 22), preserving the original accuracy and timing labels.
Reference supplied by the user: Hyeon Jeon, Jeongin Park, Soohyun Lee, Dae Hyun Kim, Sungbok Shin, and Jinwook Seo. Dataset-Adaptive Dimensionality Reduction. IEEE VIS 2025 & TVCG.
https://www.hyeonjeon.com/assets/pdf/jeon25tvcg.pdf
-->

---
layout: source
title: "Solution 2: Human-Centered Automation"
clicks: 0
---

<HumanCenteredAutomation />

<!--
Diagram adapted from DAB slide 9 (source slide 26), using the same California housing records, brushed selection, table, and analysis/recommendation cycle.
Reference: Hyeon Jeon, Michaël Aupetit, Soohyun Lee, Kwon Ko, Youngtaek Kim, Ghulam Jilani Quadri, and Jinwook Seo. Distortion-Aware Brushing for Reliable Cluster Analysis in Multidimensional Projections. IEEE VIS 2026 & TVCG.
https://www.hyeonjeon.com/assets/pdf/jeon25tvcg3.pdf
-->

---
layout: source
title: "Solution 3: Facilitating Discourse"
clicks: 0
---

<DrLiteracySolution />

<!--
User-supplied tutorial photograph, conference logos, and speaker portraits recomposed from the original transparent image. Tutorial title and speaker affiliations verified against https://dasfaa2026.github.io/program/tutorials.html . Hyeon Jeon’s affiliation updated to Aarhus University as requested for these decks.
-->

---
layout: source
title: "Solution 4: Advertise and Maintain Tools"
clicks: 0
---

<MaintainToolsSolution />

<!--
ZADU GitHub screenshot reused from the SNU job-talk source asset (zadu-github-screenshot.jpg).
Repository: https://github.com/hj-n/zadu
Short-paper title, author order, and venue verified against https://virtual.ieeevis.org/year/2023/paper_v-short-1036.html
Paper: https://www.hyeonjeon.com/assets/pdf/jeon23vis.pdf
-->

---
layout: source
title: We should act immediately
clicks: 0
---

<ActImmediately />

<!--
P2 quotation supplied by the user: “the misuse may already have passed the point of no return”.
-->

---
layout: source
title: My talks at VIS 2026
clicks: 0
---

<VisClosing />

<!--
Shared closing slide from the other decks. The first two talks are marked complete: Distortion-aware Brushing and Stop Misusing t-SNE and UMAP.
-->
