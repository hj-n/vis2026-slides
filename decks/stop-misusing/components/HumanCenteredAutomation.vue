<script setup>
import { useSlideContext } from '@slidev/client'
import data from '../data/brushing-example.json'
const { $page } = useSlideContext()
const all = [...data.context, ...data.records.map(r => [r.income, r.value])]
const minX = Math.min(...all.map(p => p[0])), maxX = Math.max(...all.map(p => p[0]))
const minY = Math.min(...all.map(p => p[1])), maxY = Math.max(...all.map(p => p[1]))
const x = n => 16 + (n-minX)/(maxX-minX)*490
const y = n => 390 - (n-minY)/(maxY-minY)*374
const fields = ['income','value','age','rooms','occupancy','population']
const headers = ['Income','Value','Age','Rooms','People','Pop.']
const cell = (r,f) => f==='value' ? `$${Math.round(r[f]/1000)}k` : ['income','rooms','occupancy'].includes(f) ? r[f].toFixed(2) : String(r[f])
</script>

<template>
  <section class="human-centered-automation">
    <h1>Solution 2: Human-Centered Automation</h1>
    <p class="subtitle">Reducing the technical burden while preserving user agency</p>
    <svg class="brushing-diagram" viewBox="0 0 1728 620" role="img" aria-label="Distortion-aware brushing: continuously analyze multidimensional data and recommend the next points to brush, linking a visualization and its dataset.">
      <defs><marker id="human-centered-arrow" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="12" markerHeight="12" orient="auto" markerUnits="userSpaceOnUse"><path d="M1 1 L11 6 L1 11" fill="none" stroke="#23448e" stroke-width="2.4" /></marker></defs>
      <text x="864" y="72" text-anchor="middle" class="flow-label">(1) Continuously <tspan font-weight="700">analyze</tspan> multidimensional data</text>
      <text x="230" y="120" text-anchor="middle" class="view-label">Visualization</text>
      <g transform="translate(0,150)">
        <circle v-for="(p,i) in data.context" :key="i" :cx="x(p[0])" :cy="y(p[1])" r="3.5" fill="#000" fill-opacity="0.35" />
        <rect :x="x(4)-12" :y="y(280000)-12" :width="x(6)-x(4)+24" :height="y(190000)-y(280000)+24" fill="#23448e" fill-opacity="0.06" stroke="#23448e" stroke-width="2" />
        <circle v-for="r in data.records" :key="r.id" :cx="x(r.income)" :cy="y(r.value)" r="6" fill="#23448e" />
      </g>
      <path d="M550 200 C720 75 1020 75 1190 200" class="flow-path" />
      <path d="M1190 480 C1020 590 720 590 550 480" class="flow-path" />
      <text x="1482" y="120" text-anchor="middle" class="view-label">Dataset</text>
      <g transform="translate(1236,170)">
        <rect width="492" height="48" fill="#f0f3f8" />
        <text v-for="(label,j) in headers" :key="label" :x="j*82+41" y="31" text-anchor="middle" class="table-label">{{ label }}</text>
        <g v-for="(r,i) in data.records" :key="r.id" :transform="`translate(0,${48+i*44})`">
          <rect width="492" height="44" :fill="i%2 ? '#f8faff' : '#fff'" />
          <path d="M0 44 H492" stroke="#e4e8ef" />
          <text v-for="(f,j) in fields" :key="f" :x="j*82+41" y="29" text-anchor="middle" class="table-value">{{ cell(r,f) }}</text>
        </g>
      </g>
      <text x="864" y="614" text-anchor="middle" class="flow-label">(2) <tspan font-weight="700">Recommend</tspan> the next points to brush</text>
    </svg>
    <footer class="reference">
      <p><strong>Hyeon Jeon</strong>, Michaël Aupetit, Soohyun Lee, Kwon Ko, Youngtaek Kim, Ghulam Jilani Quadri, and Jinwook Seo.</p>
      <p><a href="https://www.hyeonjeon.com/assets/pdf/jeon25tvcg3.pdf" target="_blank" rel="noopener noreferrer">“Distortion-Aware Brushing for Reliable Cluster Analysis in Multidimensional Projections”</a>. <em>IEEE VIS 2026 &amp; TVCG.</em></p>
    </footer>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.human-centered-automation { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.human-centered-automation h1 { position: absolute; left: 96px; top: 104px; margin: 0; font-size: 86px; line-height: 1.2; font-weight: 700; }
.subtitle { position: absolute; left: 96px; top: 243px; margin: 0; font-size: 54px; line-height: 1.4; }
.brushing-diagram { position: absolute; left: 96px; top: 340px; width: 1728px; height: 620px; }
.flow-label { font: 40px Arial, sans-serif; fill: #111; }
.view-label { font: italic 34px Arial, sans-serif; fill: #111; }
.table-label { font: 22px Arial, sans-serif; fill: #111; }
.table-value { font: 22px Arial, sans-serif; fill: #23448e; }
.flow-path { fill: none; stroke: #23448e; stroke-width: 3; stroke-linecap: round; marker-end: url(#human-centered-arrow); }
.reference { position: absolute; left: 96px; bottom: 48px; width: 1728px; color: #666; }
.reference p { margin: 0; font-size: 20.5px; line-height: 1.3; font-weight: 400; }
.reference a { color: inherit; text-decoration: none; }
.reference strong { font-weight: 700; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
