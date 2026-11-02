<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
const assetBase = import.meta.env.BASE_URL
defineProps({ revisiting: { type: Boolean, default: false } })
</script>

<template>
  <section class="first-presentation">
    <h1>I first presented this work at VIS 2022 in Oklahoma.</h1>
    <p>{{ revisiting ? 'Why is this work being presented at IEEE VIS again, four years later?' : 'My first in-person conference presentation as a Ph.D. student' }}</p>
    <img :src="`${assetBase}figs/vis2022-presentation.png`" alt="Hyeon Jeon presenting Uniform Manifold Approximation with Two-Phase Optimization at VIS 2022." />
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.first-presentation { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.first-presentation h1 { position: absolute; left: 96px; top: 104px; width: 1728px; margin: 0; font-size: 64px; line-height: 1.3; font-weight: 400; }
.first-presentation p { position: absolute; left: 96px; top: 220px; width: 1728px; margin: 0; font-size: 46px; line-height: 1.4; }
.first-presentation img { position: absolute; left: 96px; top: 325px; width: 1480px; height: auto; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
