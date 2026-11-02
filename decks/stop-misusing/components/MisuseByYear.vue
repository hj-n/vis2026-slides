<script setup>
import { useSlideContext } from '@slidev/client'
import data from '../data/figure3b.json'
const { $page } = useSlideContext()
const x = year => 220 + (year - 2008) / 16 * 1000
const y = count => 840 - count / 30 * 580
const seriesPoints = series => series.values.flatMap((value, i) => value === null ? [] : [{ x: x(data.years[i]), y: y(value), year: data.years[i], value }])
const linePoints = series => seriesPoints(series).map(p => `${p.x},${p.y}`).join(' ')
const markerPoints = (marker, px, py, r = 10) => marker === 'triangle'
  ? `${px},${py-r-2} ${px-r-2},${py+r} ${px+r+2},${py+r}`
  : `${px},${py-r-2} ${px+r+2},${py} ${px},${py+r+2} ${px-r-2},${py}`
</script>

<template>
  <section class="misuse-trend">
    <h1>Cumulative misuses by year</h1>
    <svg viewBox="0 0 1920 1080" class="chart" role="img" aria-label="Figure 3(b): cumulative papers misusing t-SNE, UMAP, PCA, and MDS from 2008 to 2024. Final counts are 30, 13, 8, and 8 respectively.">
      <g v-for="tick in [0, 10, 20, 30]" :key="tick">
        <line v-if="tick" x1="190" :y1="y(tick)" x2="1250" :y2="y(tick)" stroke="#e4e7ec" stroke-width="2" />
        <line x1="177" :y1="y(tick)" x2="190" :y2="y(tick)" stroke="#111" stroke-width="3" />
        <text x="158" :y="y(tick)+11" text-anchor="end" class="tick">{{ tick }}</text>
      </g>
      <path d="M190 235 V870 H1250" fill="none" stroke="#111" stroke-width="4" />
      <g v-for="year in [2008, 2010, 2015, 2020, 2024]" :key="year">
        <line :x1="x(year)" y1="870" :x2="x(year)" y2="884" stroke="#111" stroke-width="3" />
        <text :x="x(year)" y="925" text-anchor="middle" class="tick">{{ year }}</text>
      </g>
      <text x="720" y="995" text-anchor="middle" class="axis-label">Year</text>
      <text x="80" y="550" transform="rotate(-90 80 550)" text-anchor="middle" class="axis-label">Cumulative number of misuses</text>
      <g v-for="series in [...data.series].reverse()" :key="series.name" :data-series="series.name">
        <polyline :points="linePoints(series)" fill="none" :stroke="series.color" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" />
        <template v-for="point in seriesPoints(series)" :key="point.year">
          <circle v-if="series.marker === 'circle'" :cx="point.x" :cy="point.y" r="10" :fill="series.color" />
          <rect v-else-if="series.marker === 'square'" :x="point.x-10" :y="point.y-10" width="20" height="20" :fill="series.color" />
          <polygon v-else :points="markerPoints(series.marker,point.x,point.y)" :fill="series.color" />
        </template>
      </g>
      <g v-for="(series, i) in data.series" :key="series.name" :transform="`translate(${1370 + (i%2)*255} ${880 + Math.floor(i/2)*76})`">
        <line x1="0" y1="0" x2="42" y2="0" :stroke="series.color" stroke-width="6" />
        <circle v-if="series.marker === 'circle'" cx="21" cy="0" r="10" :fill="series.color" />
        <rect v-else-if="series.marker === 'square'" x="11" y="-10" width="20" height="20" :fill="series.color" />
        <polygon v-else :points="markerPoints(series.marker,21,0)" :fill="series.color" />
        <text x="58" y="12" class="legend-label">{{ series.name }}</text>
      </g>
    </svg>
    <aside class="explanation">
      <h2>t-SNE and UMAP are<br />the most misused</h2>
      <p><strong>t-SNE has the most cumulative misuses.</strong> UMAP misuse has grown rapidly since 2018, making it the second most misused technique.</p>
    </aside>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.misuse-trend { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.misuse-trend h1 { position: absolute; left: 96px; top: 96px; margin: 0; font-size: 64px; line-height: 1.2; font-weight: 400; }
.chart { position: absolute; inset: 0; width: 1920px; height: 1080px; }
.tick { font: 34px Arial, sans-serif; fill: #555; }
.axis-label { font: 36px Arial, sans-serif; fill: #111; }
.legend-label { font: 36px Arial, sans-serif; fill: #111; }
.explanation { position: absolute; left: 1370px; top: 300px; width: 454px; }
.explanation h2 { margin: 0; font-size: 44px; line-height: 1.25; font-weight: 700; color: #d7352c; }
.explanation p { margin: 34px 0 0; font-size: 38px; line-height: 1.4; }
.explanation strong { font-weight: 700; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
