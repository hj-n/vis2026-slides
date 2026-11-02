<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
const assetBase = import.meta.env.BASE_URL
const examples = [
  { title: 'UMAP', image: 'umap-github.png', url: 'https://github.com/lmcinnes/umap', label: 'github.com/lmcinnes/umap' },
  { title: 't-SNE', image: 'sklearn-tsne.png', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.manifold.TSNE.html', label: 'scikit-learn.org · sklearn.manifold.TSNE' },
]
</script>

<template>
  <section class="libraries-promote-misuse">
    <h1><span class="reason-number">3.</span><span>Libraries are promoting the misuse<br />of t-SNE and UMAP.</span></h1>
    <div class="library-examples">
      <figure v-for="example in examples" :key="example.title">
        <figcaption>{{ example.title }}</figcaption>
        <img :src="`${assetBase}figs/references/${example.image}`" :alt="`Screenshot of ${example.title}`" width="820" height="590" />
        <a class="source-link" :href="example.url" target="_blank" rel="noopener noreferrer">{{ example.label }}</a>
      </figure>
    </div>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.libraries-promote-misuse { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.libraries-promote-misuse h1 { position: absolute; left: 96px; top: 104px; width: 1728px; margin: 0; display: flex; align-items: baseline; gap: 22px; font-size: 64px; line-height: 1.3; font-weight: 400; }
.reason-number { flex: none; }
.library-examples { position: absolute; left: 96px; top: 334px; width: 1728px; display: grid; grid-template-columns: repeat(2, 820px); column-gap: 88px; }
.library-examples figure { margin: 0; }
.library-examples figcaption { margin: 0 0 24px; font-size: 36px; line-height: 1.2; }
.library-examples img { display: block; width: 820px; height: 590px; object-fit: contain; object-position: left top; }
.libraries-promote-misuse .source-link { display: inline-block; margin-top: 16px; color: #555; font-size: 25px; line-height: 1.2; text-decoration: none; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
a:focus-visible { outline: 3px solid #23448e; outline-offset: 8px; }
</style>
