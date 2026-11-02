<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
const assetBase = import.meta.env.BASE_URL
const projectUrl = 'https://github.com/hyungkwonko/umato'
</script>

<template>
  <section class="umato-project">
    <h1>Now UMATO is available for your projects</h1>
    <img class="github-screenshot" :src="`${assetBase}figs/project/umato-github.png`" alt="UMATO GitHub repository, including source code, documentation, tests, and releases." />
    <a class="project-link" :href="projectUrl" target="_blank" rel="noopener noreferrer">github.com/hyungkwonko/umato ↗</a>
    <a class="project-qr" :href="projectUrl" target="_blank" rel="noopener noreferrer" aria-label="Open UMATO on GitHub">
      <img :src="`${assetBase}source-assets/umato-github-qr.svg`" alt="QR code linking to https://github.com/hyungkwonko/umato" />
    </a>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.umato-project { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.umato-project h1 { position: absolute; left: 96px; top: 104px; width: 1728px; margin: 0; font-size: 72px; line-height: 1.25; font-weight: 400; }
.github-screenshot { position: absolute; left: 96px; top: 310px; width: 1120px; height: auto; border: 1px solid #e2e7ef; }
.project-link { position: absolute; left: 96px; top: 925px; color: #23448e; font-size: 44px; font-weight: 700; line-height: 1.3; text-decoration: underline; text-underline-offset: 10px; text-decoration-thickness: 2px; }
.project-qr { position: absolute; left: 1300px; top: 360px; width: 500px; height: 500px; }
.project-qr img { display: block; width: 100%; height: 100%; }
.project-link:focus-visible, .project-qr:focus-visible { outline: 4px solid #23448e; outline-offset: 12px; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
