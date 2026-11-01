<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
const props = defineProps({ completedCount: { type: Number, default: 1 } })
const assetBase = import.meta.env.BASE_URL
const papers = [
  {
    title: 'Distortion-aware Brushing',
    subtitle: 'for Reliable Cluster Analysis in Multidimensional Projections',
    date: 'Tue, Nov 10', time: '11:00–11:12', room: 'America center',
    url: 'https://www.ieeevis.org/year/2026/program/content/55468113-2b87-4aee-b5e5-15176242d1b3/',
  },
  {
    title: 'Stop Misusing t-SNE and UMAP', subtitle: 'for Visual Analytics',
    date: 'Tue, Nov 10', time: '16:00–16:12', room: 'Essex center',
    url: 'https://www.ieeevis.org/year/2026/program/content/8f097b32-b19a-4015-852e-65c2b68adc89/',
  },
  {
    title: 'Visualization Autocomplete',
    subtitle: 'Visualization Authoring via Stepwise Design Recommendations',
    date: 'Thu, Nov 12', time: '08:00–08:12', room: 'America center',
    url: 'https://www.ieeevis.org/year/2026/program/content/729acd33-e386-47c3-96f9-ed8efe84c8e7/',
  },
  {
    title: 'UMATO',
    subtitle: 'for Reliable Visual Analytics with Dimensionality Reduction',
    date: 'Thu, Nov 12', time: '11:00–11:12', room: 'Essex north',
    url: 'https://www.ieeevis.org/year/2026/program/content/e3c6e201-9387-4b45-9046-e4d6834316b6/',
  },
]
</script>

<template>
  <section class="vis-closing">
    <h1>My talks at VIS 2026</h1>
    <div class="talks">
      <article v-for="(paper, index) in papers" :key="paper.title" class="talk" :class="{ 'talk-completed': index < props.completedCount }">
        <a :href="paper.url" target="_blank" rel="noopener noreferrer" class="paper-title">
          <h2>{{ paper.title }}</h2>
        </a>
        <p class="talk-date">{{ paper.date }}</p>
        <p class="talk-time"><strong>{{ paper.time }}</strong></p>
        <p class="room">{{ paper.room }}</p>
      </article>
    </div>
    <div class="profile">
      <img class="portrait" :src="`${assetBase}figs/authors/hj.png`" alt="Hyeon Jeon" width="180" height="180" />
      <div class="identity">
        <h2>Hyeon Jeon</h2>
        <p>Postdoctoral Researcher, Aarhus University</p>
      </div>
      <p class="job-search"><strong>Seeking a tenure-track faculty position worldwide</strong></p>
      <a class="homepage" href="https://hyeonjeon.com/" target="_blank" rel="noopener noreferrer">hyeonjeon.com ↗</a>
      <a class="homepage-qr" href="https://hyeonjeon.com/" target="_blank" rel="noopener noreferrer" aria-label="Open Hyeon Jeon's homepage">
        <img :src="`${assetBase}source-assets/hyeonjeon-qr.svg`" alt="QR code linking to https://hyeonjeon.com/" width="300" height="300" />
      </a>
    </div>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.vis-closing { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.vis-closing h1 { position: absolute; left: 96px; top: 50px; margin: 0; font-size: 56px; line-height: 1.2; font-weight: 400; }
.talks { position: absolute; left: 96px; top: 150px; width: 1728px; }
.talk { display: grid; grid-template-columns: minmax(0, 978px) 238px 230px 210px; column-gap: 24px; height: 132px; align-items: baseline; }
.talk-completed { position: relative; }
.talk-completed::after { content: ''; position: absolute; left: 0; right: 0; top: 29px; height: 1px; background: #555; pointer-events: none; }
.paper-title { display: block; color: inherit; text-decoration: none; }
.paper-title h2 { margin: 0; font-size: 44px; line-height: 1.2; font-weight: 700; }
.talk-date, .talk-time, .room { margin: 0; font-size: 30px; line-height: 1.2; white-space: nowrap; }
.talk-time { font-variant-numeric: tabular-nums; }
.talk-time strong { color: #23448e; font-weight: 700; }
.room { font-size: 27px; color: #666; }
.profile { position: absolute; left: 96px; top: 704px; width: 1728px; height: 336px; border-top: 1px solid #d9dde2; }
.portrait { position: absolute; left: 0; top: 38px; width: 180px; height: 180px; object-fit: cover; border-radius: 50%; }
.identity { position: absolute; left: 222px; top: 50px; }
.identity h2 { margin: 0; font-size: 48px; line-height: 1.2; font-weight: 700; }
.identity p { margin: 12px 0 0; font-size: 34px; line-height: 1.2; }
.job-search { position: absolute; left: 222px; top: 174px; width: 1160px; margin: 0; font-size: 34px; line-height: 1.3; }
.job-search strong { font-weight: 700; color: #b33d47; }
.vis-closing .homepage { position: absolute; left: 222px; top: 250px; color: #23448e; font-size: 36px; line-height: 1.2; text-decoration: underline; text-underline-offset: 7px; }
.homepage-qr { position: absolute; right: 0; top: 22px; width: 300px; }
.homepage-qr img { display: block; width: 300px; height: 300px; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
a:focus-visible { outline: 3px solid #23448e; outline-offset: 8px; }
</style>
