<script setup>
import { useSlideContext } from '@slidev/client'
import evidence from '../data/runtime-evidence.json'
const { $page } = useSlideContext()
const xOld = t => 138 + t/400*470
const xNew = t => 250 + t/27*535
const color = name => name==='UMATO' ? '#23448e' : '#aab1ba'
</script>

<template>
  <section class="faster-umato">
    <h1>From slower than UMAP to faster than UMAP</h1>
    <div class="column-heading early"><div class="year">2022</div><h2>About 3× slower<br />than UMAP.</h2></div>
    <div class="column-heading expanded"><div class="year">2026</div><h2>About 4× faster<br />than UMAP.</h2></div>
    <svg class="evidence-arrow" viewBox="0 0 120 60" aria-hidden="true"><path d="M5 30 H110 M85 5 L110 30 L85 55" /></svg>
    <svg class="early-chart" viewBox="0 0 760 520" role="img" aria-label="2022 MNIST benchmark: t-SNE 374.85 seconds, UMATO 73.32 seconds, UMAP 26.10 seconds, averaged over ten runs.">
      <g v-for="tick in [0,100,200,300,400]" :key="tick">
        <line :x1="xOld(tick)" :x2="xOld(tick)" y1="65" y2="395" stroke="#e6e8eb" />
        <text :x="xOld(tick)" y="435" text-anchor="middle" class="tick-label">{{ tick }}</text>
      </g>
      <g v-for="(row,i) in evidence.early" :key="row.name" :transform="`translate(0,${100+i*115})`">
        <text x="115" y="30" text-anchor="end" class="method-label" :style="{fill:row.name==='UMATO'?'#23448e':'#555'}">{{ row.name }}</text>
        <rect x="138" y="0" :width="xOld(row.mean)-138" height="40" :fill="color(row.name)" />
        <text :x="xOld(row.mean)+14" y="30" class="value-label">{{ row.mean.toFixed(2) }} s</text>
      </g>
      <text x="375" y="476" text-anchor="middle" class="chart-note">Runtime (seconds) ↓</text>
      <text x="0" y="508" class="chart-note">MNIST · Mean of 10 runs</text>
    </svg>
    <svg class="expanded-chart" viewBox="0 0 830 520" role="img" aria-label="2026 evaluation across 20 datasets. Average runtimes and 95 percent confidence intervals from the extended paper Figure 4. UMATO is about four times faster than UMAP.">
      <g v-for="tick in [0,5,10,15,20,25]" :key="tick">
        <line :x1="xNew(tick)" :x2="xNew(tick)" y1="40" y2="440" stroke="#e6e8eb" />
        <text :x="xNew(tick)" y="475" text-anchor="middle" class="tick-label">{{ tick }}</text>
      </g>
      <g v-for="(row,i) in evidence.expanded" :key="row.name" :transform="`translate(0,${57+i*40})`">
        <rect v-if="row.name==='UMATO'" x="0" y="-18" width="822" height="36" fill="#eef2fb" />
        <text x="225" y="9" text-anchor="end" class="method-label" :style="{fill:row.name==='UMATO'?'#23448e':'#555',fontWeight:row.name==='UMATO'?700:400}">{{ row.name }}</text>
        <line :x1="xNew(row.low)" :x2="xNew(row.high)" y1="0" y2="0" :stroke="color(row.name)" :stroke-width="row.name==='UMATO'?5:3" />
        <circle :cx="xNew(row.mean)" cy="0" :r="row.name==='UMATO'?8:5" :fill="color(row.name)" />
      </g>
      <text x="520" y="508" text-anchor="middle" class="chart-note">Mean runtime (seconds) ↓</text>
    </svg>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.faster-umato { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.faster-umato h1 { position: absolute; left: 96px; top: 72px; margin: 0; font-size: 72px; line-height: 1.2; font-weight: 400; }
.column-heading { position: absolute; top: 208px; }
.early { left: 96px; width: 760px; }
.expanded { left: 994px; width: 830px; }
.year { font-size: 34px; line-height: 1.2; margin-bottom: 14px; color: #666; }
.expanded .year { color: #23448e; }
.faster-umato h2 { margin: 0; font-size: 48px; line-height: 1.25; font-weight: 700; }
.expanded h2 { color: #23448e; }
.evidence-arrow { position: absolute; left: 840px; top: 298px; width: 100px; height: 50px; fill: none; stroke: #23448e; stroke-width: 4; }
.early-chart { position: absolute; left: 96px; top: 410px; width: 760px; height: 520px; }
.expanded-chart { position: absolute; left: 994px; top: 410px; width: 830px; height: 520px; }
.chart-note { font: 27px Arial, sans-serif; fill: #555; }
.method-label { font: 30px Arial, sans-serif; fill: #555; }
.value-label, .tick-label { font: 26px Arial, sans-serif; fill: #555; }
.benchmark-note { position: absolute; left: 96px; bottom: 48px; margin: 0; font-size: 22px; line-height: 1.3; color: #666; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
