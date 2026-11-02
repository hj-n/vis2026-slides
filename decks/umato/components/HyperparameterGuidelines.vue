<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
const assetBase = import.meta.env.BASE_URL
</script>

<template>
  <section class="hyperparameter-guidelines">
    <h1>Practical guidelines for setting hyperparameters</h1>
    <p class="subtitle">Choose settings that match your analysis task.</p>
    <img class="hub-chart" :src="`${assetBase}figs/hyperparameters/hub-num-quality.png`" alt="Normalized local T&C and global KL-divergence quality scores across hub_num settings. Local quality converges around 200 hubs, while global quality converges around 350 hubs." />
    <div class="hub-options">
      <div><span>Local structure</span><strong>hub_num &gt; 200</strong></div>
      <div><span>Global structure</span><strong>hub_num &gt; 350</strong></div>
    </div>
    <div class="other-guidelines">
      <div class="guideline"><div class="parameter">n_neighbors</div><p>Smaller values emphasize finer local detail.</p></div>
      <div class="guideline"><div class="parameter">min_dist</div><p>Keep it small:<br /><strong>around 0.1.</strong></p></div>
    </div>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.hyperparameter-guidelines { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.hyperparameter-guidelines h1 { position: absolute; left: 96px; top: 104px; margin: 0; font-size: 72px; line-height: 1.2; font-weight: 400; }
.subtitle { position: absolute; left: 96px; top: 235px; margin: 0; font-size: 46px; line-height: 1.4; }
.hub-chart { position: absolute; left: 96px; top: 340px; width: 1150px; height: auto; }
.hub-options { position: absolute; left: 180px; top: 915px; width: 1066px; display: grid; grid-template-columns: 1fr 1fr; column-gap: 55px; }
.hub-options span { display: block; margin-bottom: 10px; font-size: 34px; line-height: 1.3; }
.hub-options strong { font-size: 44px; line-height: 1.2; font-weight: 700; color: #23448e; }
.other-guidelines { position: absolute; left: 1320px; top: 405px; width: 504px; }
.guideline + .guideline { margin-top: 70px; }
.parameter { font-size: 36px; line-height: 1.3; color: #666; margin-bottom: 18px; }
.guideline p { margin: 0; font-size: 40px; line-height: 1.4; }
.guideline strong { font-weight: 700; color: #23448e; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
