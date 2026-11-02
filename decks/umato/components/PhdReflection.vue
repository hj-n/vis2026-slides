<script setup>
import { useNav, useSlideContext } from '@slidev/client'
const { $page, $clicks } = useSlideContext()
const nav = useNav()
const assetBase = import.meta.env.BASE_URL
function advance() { if ($clicks.value < 4) nav.next() }
</script>

<template>
  <section class="phd-reflection" @click.stop="advance">
    <h1>I first presented this work at VIS 2022 in Oklahoma.</h1>
    <p class="subtitle">Now I’m presenting it again—as the final talk of my Ph.D. research.</p>
    <img v-if="$clicks === 0" class="presentation-photo" :src="`${assetBase}figs/vis2022-presentation.png`" alt="Hyeon Jeon presenting UMATO at VIS 2022 in Oklahoma." />
    <div v-show="$clicks > 0" class="reflections">
      <p v-click="1">It wasn’t originally my idea; <strong>Kwon Ko</strong> initiated it.</p>
      <p v-click="2">It wasn’t even included in my dissertation.</p>
      <p v-click="3">Still, this paper grew alongside my Ph.D. journey—<br />through <strong class="rejections">six rejections.</strong></p>
      <p v-click="4" class="applause">I’d like to give this work<br /><strong>a big round of applause.</strong></p>
    </div>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.phd-reflection { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.phd-reflection h1 { position: absolute; left: 96px; top: 104px; width: 1728px; margin: 0; font-size: 64px; line-height: 1.3; font-weight: 400; }
.subtitle { position: absolute; left: 96px; top: 220px; width: 1728px; margin: 0; font-size: 46px; line-height: 1.4; }
.presentation-photo { position: absolute; left: 96px; top: 325px; width: 1480px; height: auto; }
.reflections { position: absolute; left: 96px; top: 370px; width: 1728px; display: flex; flex-direction: column; gap: 36px; }
.reflections p { margin: 0; font-size: 48px; line-height: 1.35; }
.reflections strong { font-weight: 700; }
.reflections .rejections { color: #b33d47; }
.reflections .applause { font-size: 52px; color: #23448e; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
