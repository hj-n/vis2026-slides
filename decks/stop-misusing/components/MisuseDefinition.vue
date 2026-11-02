<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
</script>

<template>
  <section class="misuse-definition">
    <h1>Misuse of DR technique</h1>
    <p>used for analytical tasks that investigate<br />the structure of data that the techniques<br /><strong>do not aim to preserve</strong></p>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.misuse-definition { position: relative; width: 100%; height: 100%; background: #fff; color: #000; font-family: Arial, sans-serif; }
.misuse-definition h1 { position: absolute; left: 96px; top: 104px; margin: 0; font-size: 80px; line-height: 1.2; font-weight: 400; }
.misuse-definition p { position: absolute; left: 96px; top: 350px; width: 1728px; margin: 0; font-size: 64px; line-height: 1.45; }
.misuse-definition strong { color: #b33d47; font-weight: 700; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
