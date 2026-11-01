<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
const projectUrl = 'https://distortion-aware-brushing.github.io/site/'
const qrUrl = `${import.meta.env.BASE_URL}source-assets/dab-project-qr.svg`
</script>

<template>
  <section class="dab-project">
    <h1>You can use Distortion-aware brushing<br />in your projects!</h1>
    <a class="project-link" :href="projectUrl" target="_blank" rel="noopener noreferrer">distortion-aware-brushing.github.io/site/ ↗</a>
    <a class="project-qr" :href="projectUrl" target="_blank" rel="noopener noreferrer" aria-label="Open the Distortion-aware Brushing project website">
      <img :src="qrUrl" alt="QR code linking to https://distortion-aware-brushing.github.io/site/" width="620" height="620" />
    </a>
    <span class="project-page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.dab-project { position: relative; width: 100%; height: 100%; background: #fff; color: #000; font-family: Arial, sans-serif; }
.dab-project h1 { position: absolute; left: 96px; top: 104px; width: 1728px; margin: 0; font-size: 64px; line-height: 1.25; font-weight: 400; }
.dab-project .project-link { position: absolute; left: 96px; top: 550px; width: 1040px; color: #23448e; font-size: 42px; font-weight: 700; line-height: 1.4; text-decoration: underline; text-underline-offset: 12px; text-decoration-thickness: 2px; }
.project-qr { position: absolute; left: 1180px; top: 310px; width: 620px; }
.project-qr img { display: block; width: 620px; height: 620px; }
.project-page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
.project-link:focus-visible, .project-qr:focus-visible { outline: 4px solid #23448e; outline-offset: 12px; }
</style>
