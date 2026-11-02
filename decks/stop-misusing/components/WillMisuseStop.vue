<script setup>
import { useNav, useSlideContext } from '@slidev/client'
const { $page, $clicks } = useSlideContext()
const nav = useNav()
function reveal() {
  if ($clicks.value === 0) nav.next()
}
</script>

<template>
  <section class="will-misuse-stop" @click.stop="reveal">
    <h1>Now that we’ve identified the problem,<br />will people stop misusing t-SNE and UMAP?</h1>
    <p v-click="1" class="answer">No.</p>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.will-misuse-stop { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.will-misuse-stop h1 { position: absolute; left: 96px; top: 130px; width: 1728px; margin: 0; font-size: 64px; line-height: 1.35; font-weight: 400; }
.answer { position: absolute; left: 96px; top: 380px; width: 1728px; margin: 0; text-align: center; color: #e32636; font-size: 360px; font-weight: 700; line-height: 1.1; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
