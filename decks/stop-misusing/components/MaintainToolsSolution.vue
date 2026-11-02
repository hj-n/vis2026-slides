<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
const assetBase = import.meta.env.BASE_URL
</script>

<template>
  <section class="maintain-tools-solution">
    <h1>Solution 4: Advertise and Maintain Tools</h1>
    <img class="zadu-screenshot" :src="`${assetBase}figs/references/zadu-github.jpg`" alt="ZADU GitHub repository showing its code, documentation, tests, and description as a Python library for evaluating dimensionality reduction reliability." />
    <footer class="reference">
      <p><strong>Hyeon Jeon</strong>, Aeri Cho, Jinhwa Jang, Soohyun Lee, Jake Hyun, Hyung-Kwon Ko, Jaemin Jo, and Jinwook Seo.</p>
      <p><a href="https://www.hyeonjeon.com/assets/pdf/jeon23vis.pdf" target="_blank" rel="noopener noreferrer">“ZADU: A Python Library for Evaluating the Reliability of Dimensionality Reduction Embeddings”</a>. <em>IEEE VIS 2023 Short Paper.</em></p>
    </footer>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.maintain-tools-solution { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.maintain-tools-solution h1 { position: absolute; left: 96px; top: 104px; margin: 0; font-size: 86px; line-height: 1.2; font-weight: 700; }
.zadu-screenshot { position: absolute; left: 96px; top: 270px; width: 1500px; height: auto; border: 1px solid #e2e7ef; }
.reference { position: absolute; left: 96px; bottom: 48px; width: 1728px; color: #666; }
.reference p { margin: 0; font-size: 20.5px; line-height: 1.3; font-weight: 400; }
.reference a { color: inherit; text-decoration: none; }
.reference strong { font-weight: 700; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
