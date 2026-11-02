<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
const assetBase = import.meta.env.BASE_URL
defineProps({ diagram: { type: Boolean, default: false } })
</script>

<template>
  <section class="why-umato">
    <h1>Why UMATO?</h1>
    <img v-if="diagram" class="pipeline" :src="`${assetBase}figs/pipeline/umato-umap-comparison.png`" alt="Comparison of UMATO and UMAP pipelines. UMATO classifies points, optimizes global and local structure in separate phases, and arranges disconnected points." />
    <ul v-else>
      <li>Not an “improvement” on UMAP</li>
      <li>Offers an alternative perspective on analyzing high-dimensional data</li>
      <li>Aims to preserve both global and local structure</li>
    </ul>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.why-umato { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.why-umato h1 { position: absolute; left: 96px; top: 104px; margin: 0; font-size: 80px; line-height: 1.2; font-weight: 400; }
.why-umato ul { position: absolute; left: 96px; top: 350px; width: 1650px; margin: 0; padding-left: 58px; display: flex; flex-direction: column; gap: 68px; list-style: disc; font-size: 58px; line-height: 1.4; }
.why-umato li { padding-left: 10px; }
.pipeline { position: absolute; left: 96px; top: 230px; width: 1728px; height: 800px; object-fit: contain; object-position: left top; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
