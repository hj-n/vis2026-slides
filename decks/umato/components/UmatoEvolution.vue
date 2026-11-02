<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
</script>

<template>
  <section class="umato-evolution">
    <div class="evolution-flow">
      <div class="stage prototype">
        <h1>UMATO 2022</h1>
        <p>Research prototype</p>
      </div>
      <svg viewBox="0 0 220 100" class="evolution-arrow" aria-label="Evolved into">
        <path d="M10 50 H205 M170 15 L205 50 L170 85" />
      </svg>
      <div class="stage practice">
        <h1>UMATO 2026</h1>
        <p>Ready for practice.<br />Used in practice.</p>
      </div>
    </div>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.umato-evolution { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.evolution-flow { position: absolute; left: 96px; top: 340px; width: 1728px; display: grid; grid-template-columns: 700px 160px 700px; column-gap: 84px; align-items: start; }
.umato-evolution h1 { margin: 0 0 54px; font-size: 112px; line-height: 1.15; font-weight: 700; white-space: nowrap; }
.umato-evolution p { margin: 0; font-size: 64px; line-height: 1.4; }
.prototype { color: #666; }
.practice { color: #23448e; }
.evolution-arrow { width: 160px; height: 100px; margin-top: 15px; fill: none; stroke: #23448e; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
