<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
</script>

<template>
  <section class="limited-dr-understanding">
    <h1><span class="reason-number">1.</span><span>Practitioners lack an understanding<br />of how to use DR properly</span></h1>
    <ul>
      <li>Hold mistaken beliefs about the faithfulness of t-SNE and UMAP</li>
      <li>Do not know how to choose appropriate DR techniques</li>
      <li>Do not know how to set hyperparameters appropriately</li>
    </ul>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.limited-dr-understanding { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.limited-dr-understanding h1 { position: absolute; left: 96px; top: 104px; width: 1728px; margin: 0; display: flex; align-items: baseline; gap: 22px; font-size: 64px; line-height: 1.3; font-weight: 400; }
.reason-number { flex: none; }
.limited-dr-understanding ul { position: absolute; left: 96px; top: 380px; width: 1680px; margin: 0; padding-left: 55px; display: flex; flex-direction: column; gap: 68px; list-style: disc; font-size: 48px; line-height: 1.4; }
.limited-dr-understanding li { padding-left: 10px; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
