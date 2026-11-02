<script setup>
import { useSlideContext } from '@slidev/client'
import data from '../data/figure5.json'
const { $page } = useSlideContext()
const total = row => row.correct + row.partial + row.full
const statuses = [
  { key: 'correct', label: 'Correct', color: '#007aff' },
  { key: 'partial', label: 'Partial misuse', color: '#ff6961' },
  { key: 'full', label: 'Full misuse', color: '#ff3b30' },
]
const panels = [
  { x: 190, normalized: false, title: 'Number of papers', ticks: [0, 20, 40, 60] },
  { x: 1110, normalized: true, title: 'Percentage', ticks: [0, 25, 50, 75, 100] },
]
const y = (value, normalized) => 900 - value / (normalized ? 100 : 70) * 560
function segments(row, normalized) {
  let cumulative = 0
  return [...statuses].reverse().map(status => {
    const value = normalized ? row[status.key] / total(row) * 100 : row[status.key]
    cumulative += value
    return { ...status, value, y: y(cumulative, normalized), height: value / (normalized ? 100 : 70) * 560 }
  })
}
</script>

<template>
  <section class="technique-misuse">
    <h1>Use and misuse by DR technique</h1>
    <div class="legend">
      <span v-for="status in statuses" :key="status.key"><i :style="{ background: status.color }" />{{ status.label }}</span>
    </div>
    <svg class="chart" viewBox="0 0 1920 1080" role="img" aria-label="Number and percentage of correct use, partial misuse, and full misuse for t-SNE, UMAP, PCA, and MDS.">
      <g v-for="panel in panels" :key="panel.title" :transform="`translate(${panel.x} 0)`" :data-panel="panel.title">
        <text x="350" y="290" text-anchor="middle" class="panel-title">{{ panel.title }}</text>
        <g v-for="tick in panel.ticks" :key="tick">
          <line v-if="tick" x1="0" :y1="y(tick,panel.normalized)" x2="700" :y2="y(tick,panel.normalized)" stroke="#e4e7ec" stroke-width="2" />
          <line x1="-13" :y1="y(tick,panel.normalized)" x2="0" :y2="y(tick,panel.normalized)" stroke="#111" stroke-width="3" />
          <text x="-27" :y="y(tick,panel.normalized)+11" text-anchor="end" class="tick">{{ tick }}{{ panel.normalized ? '%' : '' }}</text>
        </g>
        <path d="M0 325 V900 H700" fill="none" stroke="#111" stroke-width="4" />
        <g v-for="(row,index) in data.categories" :key="row.name" :transform="`translate(${90 + index*170} 0)`" :data-technique="row.name">
          <rect v-for="segment in segments(row,panel.normalized)" :key="segment.key" x="-56" :y="segment.y" width="112" :height="segment.height" :fill="segment.color" :data-status="segment.key" />
          <text v-if="!panel.normalized" x="0" :y="y(total(row),false)-17" text-anchor="middle" class="total">{{ total(row) }}</text>
          <text x="0" y="962" text-anchor="middle" class="category">{{ row.name }}</text>
        </g>
      </g>
    </svg>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.technique-misuse { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.technique-misuse h1 { position: absolute; left: 96px; top: 96px; margin: 0; font-size: 64px; line-height: 1.2; font-weight: 400; }
.legend { position: absolute; left: 96px; right: 96px; top: 1000px; display: flex; justify-content: center; gap: 100px; font-size: 34px; line-height: 1.2; }
.legend span { display: flex; align-items: center; gap: 18px; white-space: nowrap; }
.legend i { display: inline-block; width: 30px; height: 30px; }
.chart { position: absolute; inset: 0; width: 1920px; height: 1080px; }
.panel-title { font: 38px Arial, sans-serif; fill: #111; }
.tick { font: 32px Arial, sans-serif; fill: #555; }
.category { font: 38px Arial, sans-serif; fill: #111; }
.total { font: 30px Arial, sans-serif; fill: #555; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
