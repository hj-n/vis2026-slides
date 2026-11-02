<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
</script>

<template>
  <section class="act-immediately">
    <div class="message">
      <h1>We should <strong>act immediately.</strong></h1>
      <p>P2: “The misuse may already have passed<br /><strong>the point of no return.</strong>”</p>
    </div>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.act-immediately { position: relative; width: 100%; height: 100%; display: flex; align-items: center; background: #fff; color: #111; font-family: Arial, sans-serif; }
.message { margin: 0 96px; font-style: italic; }
.act-immediately h1 { margin: 0 0 80px; font-size: 104px; line-height: 1.3; font-weight: 400; }
.act-immediately p { margin: 0; font-size: 80px; line-height: 1.45; }
.act-immediately strong { font-weight: 700; color: #b33d47; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
