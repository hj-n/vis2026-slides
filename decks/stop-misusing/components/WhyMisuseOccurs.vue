<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
</script>

<template>
  <section class="why-misuse-occurs">
    <h1>Rather than simply pointing out the problem,<br />we investigate <strong>why it occurs.</strong></h1>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.why-misuse-occurs { position: relative; width: 100%; height: 100%; display: flex; align-items: center; background: #fff; color: #111; font-family: Arial, sans-serif; }
.why-misuse-occurs h1 { margin: 0 96px; font-size: 76px; line-height: 1.4; font-weight: 400; }
.why-misuse-occurs strong { font-weight: 700; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
