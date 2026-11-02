<script setup>
import { useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
</script>

<template>
  <section class="automation-solution">
    <div class="solution-content">
      <h1>Solution 1: Automation</h1>
      <p>Automating the selection of techniques and parameters<br />based on the analysis task</p>
    </div>
    <div class="automation-flow" role="img" aria-label="A task and dataset are inputs to a black-box model, which recommends t-SNE with perplexity x as the most appropriate choice.">
      <div class="inputs">
        <div class="input-box">Task</div>
        <div class="input-box">Dataset</div>
      </div>
      <svg class="flow-arrow" viewBox="0 0 130 300" aria-hidden="true">
        <path d="M 10 69 H 43 V 150 H 112 M 10 231 H 43 V 150" />
        <path d="M 97 135 L 112 150 L 97 165" />
      </svg>
      <div class="black-box">Black-box<br />model</div>
      <svg class="flow-arrow" viewBox="0 0 130 300" aria-hidden="true">
        <path d="M 14 150 H 112 M 97 135 L 112 150 L 97 165" />
      </svg>
      <div class="recommendation">
        <div class="recommendation-label">Recommended choice</div>
        <div class="recommendation-value">Use <strong>t-SNE</strong> with<br /><strong>perplexity = x</strong></div>
        <div class="recommendation-note">Best suited to your task and dataset</div>
      </div>
    </div>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.automation-solution { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.solution-content { position: absolute; left: 96px; top: 104px; }
.automation-solution h1 { margin: 0 0 36px; font-size: 86px; line-height: 1.2; font-weight: 700; }
.automation-solution p { margin: 0; font-size: 54px; line-height: 1.4; font-weight: 400; }
.automation-flow { position: absolute; left: 96px; top: 520px; width: 1728px; display: grid; grid-template-columns: 340px 130px 440px 130px 688px; align-items: center; }
.inputs { height: 300px; display: flex; flex-direction: column; justify-content: space-between; }
.input-box { height: 138px; display: flex; align-items: center; justify-content: center; border: 2px solid #777; border-radius: 10px; font-size: 48px; }
.flow-arrow { width: 130px; height: 300px; fill: none; stroke: #555; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.black-box { height: 260px; display: flex; align-items: center; justify-content: center; background: #171717; border-radius: 10px; color: #fff; font-size: 54px; line-height: 1.3; text-align: center; }
.recommendation { padding: 30px 34px; border: 2px solid #23448e; border-radius: 10px; }
.recommendation-label { margin-bottom: 16px; font-size: 30px; color: #555; }
.recommendation-value { font-size: 50px; line-height: 1.35; }
.recommendation-value strong { font-weight: 700; color: #23448e; }
.recommendation-note { margin-top: 20px; font-size: 30px; line-height: 1.3; color: #555; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
