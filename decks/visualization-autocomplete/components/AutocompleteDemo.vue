<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
const demoUrl = 'https://vis.autocomplete.studio/'
const qrUrl = `${import.meta.env.BASE_URL}source-assets/vis-autocomplete-qr.svg`
</script>

<template>
  <section class="autocomplete-live-demo">
    <h1>Live Demo</h1>
    <div class="demo-invitation">
      <h2>Try it yourself</h2>
      <a class="demo-link" :href="demoUrl" target="_blank" rel="noopener noreferrer">vis.autocomplete.studio ↗</a>
    </div>
    <a class="demo-qr" :href="demoUrl" target="_blank" rel="noopener noreferrer" aria-label="Open Visualization Autocomplete">
      <img :src="qrUrl" alt="QR code linking to https://vis.autocomplete.studio/" width="620" height="620" />
    </a>
    <span class="demo-page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.autocomplete-live-demo { position: relative; width: 100%; height: 100%; background: #fff; color: #000; font-family: Arial, sans-serif; }
.autocomplete-live-demo h1 { position: absolute; left: 96px; top: 104px; margin: 0; font-size: 80px; line-height: 1.2; font-weight: 400; }
.demo-invitation { position: absolute; left: 96px; top: 352px; width: 1040px; }
.demo-invitation h2 { margin: 0 0 42px; font-size: 52px; line-height: 1.2; font-weight: 400; }
.autocomplete-live-demo .demo-link { display: inline-block; color: #23448e; font-size: 64px; font-weight: 700; line-height: 1.25; text-decoration: underline; text-underline-offset: 12px; text-decoration-thickness: 3px; }
.demo-qr { position: absolute; left: 1180px; top: 242px; width: 620px; text-align: center; }
.demo-qr img { display: block; width: 620px; height: 620px; }
.demo-page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
.demo-link:focus-visible, .demo-qr:focus-visible { outline: 4px solid #23448e; outline-offset: 12px; }
</style>
