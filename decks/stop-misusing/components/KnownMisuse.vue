<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
const imageUrl = `${import.meta.env.BASE_URL}figs/references/distill-how-to-use-tsne.png`
const articleUrl = 'https://distill.pub/2016/misread-tsne/'
</script>

<template>
  <section class="known-misuse">
    <h1>In fact, the misuse of t-SNE and UMAP<br />is already a well-known problem.</h1>
    <a class="article-image" :href="articleUrl" target="_blank" rel="noopener noreferrer" aria-label="Read How to Use t-SNE Effectively">
      <img :src="imageUrl" alt="Screenshot of How to Use t-SNE Effectively, showing the interactive t-SNE example and its controls." />
    </a>
    <div class="citation">
      <p>Wattenberg et al.</p>
      <p>How to Use t-SNE Effectively</p>
      <p>Distill, 2016</p>
    </div>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.known-misuse { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.known-misuse h1 { position: absolute; left: 96px; top: 80px; width: 1728px; margin: 0; font-size: 64px; line-height: 1.3; font-weight: 400; }
.article-image { position: absolute; left: 96px; top: 300px; width: 980px; height: 706px; }
.article-image img { display: block; width: 980px; height: 706px; object-fit: contain; }
.citation { position: absolute; left: 1180px; top: 440px; width: 644px; }
.citation p { margin: 0 0 14px; color: #000; font-family: Arial, sans-serif; font-size: 38px; line-height: 1.35; font-weight: 400; font-style: normal; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
a:focus-visible { outline: 3px solid #23448e; outline-offset: 8px; }
</style>
