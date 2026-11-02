<script setup>
import { useSlideContext } from '@slidev/client'
import evidence from '../data/evaluation-evidence.json'
const { $page } = useSlideContext()
</script>

<template>
  <section class="global-local-tradeoff">
    <h1>Global preservation comes at a local cost.</h1>
    <h2 class="local-heading">Lower local accuracy</h2>
    <h2 class="global-heading">Stronger global preservation</h2>
    <EvidenceRankPlot class="local-chart" :rows="evidence.local" axis-label="Local-metric average rank (lower is better)" label="Local-quality average ranks and published 95% confidence intervals across the same 20 datasets." />
    <EvidenceRankPlot class="global-chart" :rows="evidence.expanded" label="Global-quality average ranks and published 95% confidence intervals across 20 datasets." />
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.global-local-tradeoff { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.global-local-tradeoff h1 { position: absolute; left: 96px; top: 72px; margin: 0; font-size: 72px; line-height: 1.2; font-weight: 400; }
.global-local-tradeoff h2 { position: absolute; top: 263px; margin: 0; font-size: 48px; line-height: 1.25; font-weight: 700; }
.local-heading { left: 96px; color: #555; }
.global-heading { left: 994px; color: #23448e; }
.local-chart, .global-chart { position: absolute; top: 410px; width: 830px; height: 520px; }
.local-chart { left: 96px; }
.global-chart { left: 994px; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
