<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
const assetBase = import.meta.env.BASE_URL
</script>

<template>
  <section class="automation-results">
    <div class="solution-content">
      <h1>Solution 1: Automation</h1>
      <p>Automating the selection of techniques and parameters<br />based on the analysis task</p>
    </div>
    <p class="results-description"><strong>Preliminary results:</strong><br />Predicting optimal hyperparameter settings from dataset characteristics</p>
    <img class="results-image" :src="`${assetBase}figs/automation/projections-early-interruption.svg`" alt="Comparison of projections without and with early interruption for Fashion-MNIST, Optical Recognition, Yeast, and Ecoli, including accuracy and running time." />
    <footer class="reference">
      <p><strong>Hyeon Jeon</strong>, Jeongin Park, Soohyun Lee, Dae Hyun Kim, Sungbok Shin, and Jinwook Seo.</p>
      <p><a href="https://www.hyeonjeon.com/assets/pdf/jeon25tvcg.pdf" target="_blank" rel="noopener noreferrer">“Dataset-Adaptive Dimensionality Reduction”</a>. <em>IEEE VIS 2025 &amp; TVCG.</em></p>
    </footer>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.automation-results { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.solution-content { position: absolute; left: 96px; top: 104px; }
.automation-results h1 { margin: 0 0 36px; font-size: 86px; line-height: 1.2; font-weight: 700; }
.solution-content p { margin: 0; font-size: 54px; line-height: 1.4; font-weight: 400; }
.results-description { position: absolute; left: 96px; top: 525px; width: 720px; margin: 0; font-size: 48px; line-height: 1.4; }
.results-description strong { font-weight: 700; }
.results-image { position: absolute; left: 904px; top: 402px; width: 920px; height: 556px; object-fit: contain; }
.reference { position: absolute; left: 96px; bottom: 48px; width: 1728px; color: #666; }
.reference p { margin: 0; font-size: 20.5px; line-height: 1.3; font-weight: 400; }
.reference a { color: inherit; text-decoration: none; }
.reference strong { font-weight: 700; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
