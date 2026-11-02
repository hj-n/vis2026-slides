<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
const assetBase = import.meta.env.BASE_URL
</script>

<template>
  <section class="misuse-example">
    <p class="example-text">e.g., t-SNE and UMAP are useful for counting clusters,<br />but not for assessing their <strong>global arrangement</strong> or <strong>densities</strong>.</p>
    <figure>
      <div class="technique-labels"><span>Original data</span><span>t-SNE</span><span>UMAP</span><span>densMAP</span><span>UMATO</span></div>
      <img :src="`${assetBase}figs/teaser/projection-comparison.png`" alt="Original data compared with t-SNE, UMAP, densMAP, and UMATO projections, showing differences in cluster arrangement and density." />
    </figure>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.misuse-example { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.example-text { position: absolute; left: 96px; top: 120px; width: 1728px; margin: 0; font-size: 58px; line-height: 1.4; }
figure { position: absolute; left: 96px; top: 420px; width: 1728px; margin: 0; }
.technique-labels { display: grid; grid-template-columns: repeat(5, 1fr); margin-bottom: 26px; font-size: 38px; line-height: 1.2; text-align: center; }
figure img { display: block; width: 1728px; height: auto; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
