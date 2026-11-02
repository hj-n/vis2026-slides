<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
</script>

<template>
  <section class="limited-dr-motivation">
    <h1><span class="reason-number">2.</span><span>Practitioners lack the motivation<br />to use DR properly</span></h1>
    <div class="quotes">
      <blockquote><em>P6: “I use UMAP because it may be immune to reviewer criticism.”</em></blockquote>
      <blockquote><em>P8: “My advisor recommended UMAP, and I used it without verification.”</em></blockquote>
    </div>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.limited-dr-motivation { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.limited-dr-motivation h1 { position: absolute; left: 96px; top: 104px; width: 1728px; margin: 0; display: flex; align-items: baseline; gap: 22px; font-size: 64px; line-height: 1.3; font-weight: 400; }
.reason-number { flex: none; }
.quotes { position: absolute; left: 171px; top: 400px; width: 1600px; display: flex; flex-direction: column; gap: 72px; }
.limited-dr-motivation blockquote { margin: 0; font-size: 48px; line-height: 1.5; font-weight: 400; }
.limited-dr-motivation em { font-style: italic; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
