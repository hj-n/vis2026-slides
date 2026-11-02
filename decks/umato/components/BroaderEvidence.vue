<script setup>
import { useSlideContext } from '@slidev/client'
import evidence from '../data/evaluation-evidence.json'
const { $page } = useSlideContext()
const color = name => name==='UMATO' ? '#23448e' : '#aab1ba'
</script>

<template>
  <section class="broader-evidence">
    <h1>From examples to broader evidence</h1>
    <div class="column-heading early"><div class="year">2022</div><h2>UMATO works on<br />these examples.</h2></div>
    <div class="column-heading expanded"><div class="year">2026</div><h2>The evidence generalizes<br />across datasets.</h2></div>
    <svg class="evidence-arrow" viewBox="0 0 120 60" aria-hidden="true"><path d="M5 30 H110 M85 5 L110 30 L85 55" /></svg>
    <svg class="early-chart" viewBox="0 0 760 520" role="img" aria-label="2022 results: KL divergence at sigma 0.1, lower is better. UMATO 0.1434 versus UMAP 0.5383 and t-SNE 0.5399 for Spheres; UMATO 0.0342 versus UMAP 0.0641 and t-SNE 0.0663 for Fashion-MNIST.">
      <g v-for="(dataset,i) in evidence.early" :key="dataset.dataset" :transform="`translate(0,${65+i*220})`">
        <text x="0" y="27" class="dataset-label">{{ dataset.dataset }}</text>
        <g v-for="(score,j) in dataset.scores" :key="score.name" :transform="`translate(0,${55+j*43})`">
          <text x="100" y="23" text-anchor="end" class="method-label" :style="{fill:score.name==='UMATO'?'#23448e':'#555'}">{{ score.name }}</text>
          <rect x="120" y="0" :width="score.value/(i===0?.6:.08)*430" height="28" :fill="color(score.name)" />
          <text :x="132+score.value/(i===0?.6:.08)*430" y="23" class="value-label">{{ score.value.toFixed(4) }}</text>
        </g>
      </g>
      <text x="0" y="508" class="chart-note">2 representative examples · 4 datasets evaluated</text>
    </svg>
    <EvidenceRankPlot class="expanded-chart" :rows="evidence.expanded" label="Global-quality average ranks and published 95% confidence intervals across 20 datasets." />
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.broader-evidence { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.broader-evidence h1 { position: absolute; left: 96px; top: 72px; margin: 0; font-size: 72px; line-height: 1.2; font-weight: 400; }
.column-heading { position: absolute; top: 208px; }
.early { left: 96px; width: 760px; }
.expanded { left: 994px; width: 830px; }
.year { font-size: 34px; line-height: 1.2; margin-bottom: 14px; color: #666; }
.expanded .year { color: #23448e; }
.broader-evidence h2 { margin: 0; font-size: 48px; line-height: 1.25; font-weight: 700; }
.expanded h2 { color: #23448e; }
.evidence-arrow { position: absolute; left: 840px; top: 298px; width: 100px; height: 50px; fill: none; stroke: #23448e; stroke-width: 4; }
.early-chart { position: absolute; left: 96px; top: 410px; width: 760px; height: 520px; }
.expanded-chart { position: absolute; left: 994px; top: 410px; width: 830px; height: 520px; }
.chart-note { font: 27px Arial, sans-serif; fill: #555; }
.dataset-label { font: 32px Arial, sans-serif; fill: #111; }
.method-label, .value-label, .tick-label { font: 26px Arial, sans-serif; fill: #555; }
.rank-method { font: 25px Arial, sans-serif; }
.reference { position: absolute; left: 96px; bottom: 48px; width: 1728px; color: #666; }
.reference p { margin: 0; font-size: 19px; line-height: 1.35; }
.reference a { color: inherit; text-decoration: none; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
