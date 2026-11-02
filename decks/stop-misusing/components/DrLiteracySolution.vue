<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
const image = `${import.meta.env.BASE_URL}figs/dr-literacy/tutorial-and-speakers.png`
</script>

<template>
  <section class="dr-literacy-solution">
    <h1>Solution 3: Facilitating Discourse</h1>
    <p class="subtitle">Helping people develop the skills to use DR appropriately</p>
    <svg class="literacy-visual" viewBox="0 0 1728 640" role="img" aria-label="A dimensionality reduction tutorial in progress, EuroVis 2025 and DASFAA 2026 logos, and three speaker portraits.">
      <text x="530" y="80" class="tutorial-title">Reliable Visual Analytics with Dimensionality Reduction:</text>
      <text x="530" y="136" class="tutorial-title">Quality Evaluation and Interpretation of Projections</text>
      <svg x="0" y="50" width="430" height="572" viewBox="0 0 585 778" preserveAspectRatio="xMidYMid meet">
        <image :href="image" width="1526" height="778" />
      </svg>
      <svg x="530" y="190" width="290.5" height="140" viewBox="655 54 249 120" preserveAspectRatio="none">
        <image :href="image" width="1526" height="778" />
      </svg>
      <svg x="920" y="190" width="327.08" height="140" viewBox="946 70 264 113" preserveAspectRatio="none">
        <image :href="image" width="1526" height="778" />
      </svg>
      <svg x="530" y="350" width="190" height="190" viewBox="649 365 225 225" preserveAspectRatio="xMidYMid meet">
        <image :href="image" width="1526" height="778" />
      </svg>
      <svg x="920" y="350" width="190" height="190" viewBox="924 365 225 225" preserveAspectRatio="xMidYMid meet">
        <image :href="image" width="1526" height="778" />
      </svg>
      <svg x="1310" y="350" width="190" height="190" viewBox="1199 365 225 225" preserveAspectRatio="xMidYMid meet">
        <image :href="image" width="1526" height="778" />
      </svg>
      <text x="530" y="585" class="speaker-name">Hyeon Jeon</text>
      <text x="530" y="625" class="speaker-affiliation">Aarhus University</text>
      <text x="920" y="585" class="speaker-name">Takanori Fujiwara</text>
      <text x="920" y="625" class="speaker-affiliation">University of Arizona</text>
      <text x="1310" y="585" class="speaker-name">Rafael M. Martins</text>
      <text x="1310" y="625" class="speaker-affiliation">Linnaeus University</text>
    </svg>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.dr-literacy-solution { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.dr-literacy-solution h1 { position: absolute; left: 96px; top: 104px; margin: 0; font-size: 86px; line-height: 1.2; font-weight: 700; }
.subtitle { position: absolute; left: 96px; top: 243px; margin: 0; font-size: 54px; line-height: 1.4; font-weight: 400; }
.literacy-visual { position: absolute; left: 96px; top: 335px; width: 1728px; height: 640px; }
.tutorial-title { font: 40px Arial, sans-serif; fill: #111; }
.speaker-name { font: 34px Arial, sans-serif; fill: #111; }
.speaker-affiliation { font: 28px Arial, sans-serif; fill: #555; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
