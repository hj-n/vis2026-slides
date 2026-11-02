---
theme: ../visualization-autocomplete/theme
layout: umato-cover
info: false
routerMode: hash
fonts:
  sans: Arial
  local: Arial
download: false
transition: none
title: UMATO
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
    columns: 8
    imageSize: 80px
    cardWidth: 110px
    gap: 8px
    marginTop: 28px
    outerAlign: left
    innerAlign: center
    nameSize: 14px
    affiliationSize: 10px
---

## IEEE TVCG

# UMATO

Bridging Local and Global Structures for Reliable Visual Analytics with Dimensionality Reduction

<AuthorProfiles
  :authors='[
    {
        "image": "/figs/authors/hj.png",
        "name": "<b>Hyeon Jeon</b>",
        "affiliation": ["Aarhus", "University"]
    },
    {
        "image": "/figs/authors/kwon-ko.png",
        "name": "Kwon Ko",
        "affiliation": ["Stanford", "University"]
    },
    {
        "image": "/figs/authors/soohyun-lee.png",
        "name": "Soohyun Lee",
        "affiliation": ["Seoul National", "University"]
    },
    {
        "image": "/figs/authors/jake-hyun.png",
        "name": "Jake Hyun",
        "affiliation": ["Cornell", "University"]
    },
    {
        "image": "/figs/authors/taehyun-yang.png",
        "name": "Taehyun Yang",
        "affiliation": ["University of", "Maryland,", "College Park"]
    },
    {
        "image": "/figs/authors/gyehun-go.png",
        "name": "Gyehun Go",
        "affiliation": "KAIST"
    },
    {
        "image": "/figs/authors/jaemin-jo.png",
        "name": "Jaemin Jo",
        "affiliation": ["Sungkyunkwan", "University"]
    },
    {
        "image": "/figs/authors/jinwook-seo.png",
        "name": "Jinwook Seo",
        "affiliation": ["Seoul National", "University"]
    }
]'
/>

<!--
Title, author order, and author portraits: https://www.hyeonjeon.com/assets/pdf/jeon25tvcg2.pdf
Hyeon Jeon: Aarhus University, as requested for these decks.
Current affiliations: Jake Hyun — Cornell University (https://jakehyun.com/); Taehyun Yang — University of Maryland (paper biography); Gyehun Go — KAIST (https://hunrotation.github.io/).
-->

---
layout: source
title: My first in-person conference presentation
clicks: 0
---

<FirstPresentation />

<!--
User-supplied VIS 2022 presentation screenshot. The relative phrase “three years ago” is replaced by the explicit year shown in the image.
-->

---
layout: source
title: Why present this work again four years later?
clicks: 0
---

<FirstPresentation revisiting />

---
layout: source
title: UMATO — From research prototype to practice
clicks: 0
---

<UmatoEvolution />

---
layout: source
title: Why UMATO?
clicks: 0
---

<WhyUmato />

---
layout: source
title: Why UMATO? — Pipeline comparison
clicks: 0
---

<WhyUmato diagram />

<!--
UMATO and UMAP pipeline comparison image supplied by the user.
-->

---
layout: source
title: From examples to broader evidence
clicks: 0
---

<BroaderEvidence />

<!--
Left: exact KL divergence (sigma 0.1) values from the 2022 paper, Table 1. Two of four evaluated datasets shown; separate bar scales per dataset.
Right: published average global-quality metric ranks and 95% confidence intervals across 20 datasets, approximately digitized from the TVCG paper Figure 2(b). This is a rank/CI plot, not a raw observation distribution. The original MDS point has no visible interval.
Data and provenance: data/evaluation-evidence.json.
The extended paper was published in 2025 and is presented at IEEE VIS 2026.
-->

---
layout: source
title: From slower than UMAP to faster than UMAP
clicks: 0
---

<FasterUmato />

<!--
2022: https://www.hyeonjeon.com/assets/pdf/jeon22vis_appendix.pdf Appendix G, Table 4, MNIST, 10 runs. UMATO 73.32s / UMAP 26.10s = 2.81x slower.
2026: https://www.hyeonjeon.com/assets/pdf/jeon25tvcg2.pdf Figure 4 / Section 4.2.1. 20 datasets, 5 runs per technique per dataset. Published mean runtimes and 95% CIs digitized from vector paths. Paper reports about 4x faster than UMAP.
These are distinct benchmarks and settings, not a direct old-versus-new runtime speedup experiment. Isomap >3 hours is omitted on the left; LAMP and MDS are omitted on the right, as in the original Figure 4.
Data/provenance: data/runtime-evidence.json.
-->

---
layout: source
title: Practical guidelines for setting hyperparameters
clicks: 0
---

<HyperparameterGuidelines />

<!--
Guidelines from the UMATO TVCG paper, Section 7, Figures 13–14 (pages 14–15): https://www.hyeonjeon.com/assets/pdf/jeon25tvcg2.pdf
Smaller n_neighbors emphasizes finer local detail. Low min_dist is recommended; around 0.1 worked reliably overall.
For hub_num, the paper recommends greater than 200 for local tasks and greater than 350 for global tasks, based on 20 datasets. More hubs increase runtime (Section 8.1).
-->

---
layout: source
title: Now UMATO is available for your projects
clicks: 0
---

<UmatoProject />

<!--
GitHub repository screenshot captured November 2, 2026: https://github.com/hyungkwonko/umato
Both the clickable URL and QR code point to this repository.
-->
