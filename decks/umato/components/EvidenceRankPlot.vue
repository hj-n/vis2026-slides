<script setup>
defineProps({ rows: { type: Array, required: true }, label: String, axisLabel: { type: String, default: 'Global-metric average rank (lower is better)' } })
const color = name => name==='UMATO' ? '#23448e' : '#aab1ba'
const rankX = r => 285 + (r-1)/13*505
</script>

<template>
    <svg viewBox="0 0 830 520" role="img" :aria-label="label">
      <g v-for="tick in [1,4,7,10,13]" :key="tick">
        <line :x1="rankX(tick)" :x2="rankX(tick)" y1="49" y2="460" stroke="#e6e8eb" />
        <text :x="rankX(tick)" y="490" text-anchor="middle" class="tick-label">{{ tick }}</text>
      </g>
      <g v-for="(row,i) in rows" :key="row.name" :transform="`translate(0,${62+i*32})`">
        <rect v-if="row.name==='UMATO'" x="0" y="-17" width="822" height="32" fill="#eef2fb" />
        <text x="256" y="8" text-anchor="end" class="rank-method" :style="{fill:row.name==='UMATO'?'#23448e':'#555',fontWeight:row.name==='UMATO'?700:400}">{{ row.name }}</text>
        <line :x1="rankX(row.low)" :x2="rankX(row.high)" y1="0" y2="0" :stroke="color(row.name)" :stroke-width="row.name==='UMATO'?5:3" />
        <circle :cx="rankX(row.mean)" cy="0" :r="row.name==='UMATO'?8:5" :fill="color(row.name)" />
      </g>
      <text x="550" y="520" text-anchor="middle" class="chart-note">{{ axisLabel }}</text>
    </svg>
</template>

<style scoped>
.chart-note { font: 27px Arial, sans-serif; fill: #555; }
.tick-label { font: 26px Arial, sans-serif; fill: #555; }
.rank-method { font: 25px Arial, sans-serif; }
</style>
