<script setup>
import { useNav, useSlideContext } from '@slidev/client'
const { $page, $clicks } = useSlideContext()
const nav = useNav()
const assets = `${import.meta.env.BASE_URL}figs/perceptual-bias/`
const techniques = [
  { name: 't-SNE', sourceColumn: 0 },
  { name: 'Isomap', sourceColumn: 4 },
  { name: 'PCA', sourceColumn: 5 },
  { name: 'MDS', sourceColumn: 6 },
]
function reveal() { if ($clicks.value < 3) nav.next() }
</script>

<template>
  <section class="perceptual-bias" @click.stop="reveal">
    <h1><span class="reason-number">4.</span><span>Intrinsic bias of human perception is promoting the<br />misuse of t-SNE and UMAP.</span></h1>
    <svg class="projections" viewBox="0 0 812 640" role="img" aria-label="Three datasets projected using t-SNE, Isomap, PCA, and MDS. The t-SNE column is highlighted.">
      <rect x="0" y="0" width="203" height="580" rx="8" fill="#f6dffc" />
      <g v-for="(technique,i) in techniques" :key="technique.name">
        <svg :x="i*203" y="0" width="203" height="378" :viewBox="`${technique.sourceColumn*203.25} 0 203.25 378`" preserveAspectRatio="none">
          <image :href="`${assets}colored-projections.jpeg`" x="0" y="0" width="1626" height="378" />
        </svg>
        <svg :x="i*203" y="382" width="203" height="188" :viewBox="`${technique.sourceColumn*(1422/7)} 0 ${1422/7} 188`" preserveAspectRatio="none">
          <image :href="`${assets}monochrome-projections.jpeg`" x="0" y="0" width="1422" height="188" />
        </svg>
        <text :x="i*203+101.5" y="620" text-anchor="middle" class="technique-label">{{ technique.name }}</text>
      </g>
    </svg>
    <div class="dialogue">
      <div v-click="1" class="dialogue-row dog">
        <div class="bubble preference">I <strong>prefer</strong> to use t-SNE for my <strong>analysis!</strong></div>
        <img class="avatar" :src="`${assets}avatar-392.png`" alt="Dog" />
      </div>
      <div v-click="1" class="dialogue-row cat">
        <img class="avatar" :src="`${assets}avatar-391.png`" alt="Cat" />
        <div class="bubble">Why do you think so?</div>
      </div>
      <div v-click="2" class="dialogue-row dog">
        <div class="bubble interesting">Because it looks <strong>visually interesting!</strong></div>
        <img class="avatar" :src="`${assets}avatar-392.png`" alt="Dog" />
      </div>
      <div v-click="2" class="dialogue-row cat">
        <img class="avatar" :src="`${assets}avatar-391.png`" alt="Cat" />
        <div class="bubble faithful">Why don’t you use projections with high <strong>faithfulness?</strong></div>
      </div>
      <div v-click="3" class="dialogue-row dog">
        <div class="bubble response">That seems important…<br />but don’t the clusters in t-SNE <strong>look good?</strong></div>
        <img class="avatar" :src="`${assets}avatar-392.png`" alt="Dog" />
      </div>
    </div>
    <footer class="reference">
      <p>Understanding Bias in Perceiving Dimensionality Reduction Projections</p>
      <p class="authors">Seoyoung Doh, <strong>Hyeon Jeon</strong>, Sungbok Shin, Ghulam Jilani Quadri, Nam Wook Kim, and Jinwook Seo</p>
      <p class="venue">VIS 2025 Workshop on Visualization for Communication (VisComm)</p>
    </footer>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.perceptual-bias { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.perceptual-bias h1 { position: absolute; left: 96px; top: 104px; width: 1728px; margin: 0; display: flex; align-items: baseline; gap: 22px; font-size: 64px; line-height: 1.3; font-weight: 400; }
.reason-number { flex: none; }
.projections { position: absolute; left: 96px; top: 294px; width: 780px; height: 615px; }
.projections image { mix-blend-mode: multiply; }
.technique-label { font: 28px Arial, sans-serif; fill: #555; }
.dialogue { position: absolute; left: 940px; top: 294px; width: 884px; display: flex; flex-direction: column; gap: 22px; }
.dialogue-row { display: flex; align-items: center; gap: 16px; min-height: 84px; }
.dog { justify-content: flex-end; }
.cat { justify-content: flex-start; }
.avatar { width: 64px; height: 64px; flex: none; object-fit: contain; }
.bubble { max-width: 804px; padding: 18px 24px; border: 1.5px solid #777; border-radius: 18px; background: #fff; font-size: 32px; line-height: 1.3; }
.preference { background: #f3d0f7; }
.preference strong { color: #713497; }
.interesting { background: #ffd1d5; }
.interesting strong { color: #bc2228; }
.faithful { background: #d1e4fc; }
.faithful strong { color: #006fae; }
.response { background: #f4b6ec; }
.response strong { color: #bc2228; }
.reference { position: absolute; left: 96px; bottom: 48px; width: 1728px; color: #666; }
.reference p { margin: 0; font-size: 20.5px; line-height: 1.3; font-weight: 400; }
.reference .authors, .reference .venue { font-size: 20.5px; }
.reference strong { font-weight: 700; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
