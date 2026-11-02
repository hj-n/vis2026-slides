<script setup>
import SlideRoot from '../../visualization-autocomplete/theme/components/SlideRoot.vue'
import DeckFrame from '../../visualization-autocomplete/theme/components/DeckFrame.vue'
</script>

<template>
  <SlideRoot layout-class="cover" class="brushing-cover" v-bind="$attrs">
    <DeckFrame />
    <main class="deck-content"><slot /></main>
  </SlideRoot>
</template>

<style scoped>
.brushing-cover :deep(.deck-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px 64px;
}
.brushing-cover :deep(h2) { margin: 0 0 18px; line-height: 1; }
.brushing-cover :deep(h1) {
  width: 100%;
  max-width: none;
  margin: 0 0 14px !important;
  font-size: 42px;
  line-height: 1.1;
  letter-spacing: -0.025em;
}
.brushing-cover :deep(h1 + p) {
  width: 100%;
  max-width: none;
  margin: 0 !important;
  font-size: 28px;
  line-height: 1.25;
  letter-spacing: -0.015em;
}
.brushing-cover :deep(.author-profiles[data-layout='row']) {
  display: grid;
  grid-template-columns: repeat(7, 88px);
  justify-content: space-between;
  gap: 0;
  width: 100%;
  margin-top: 36px;
}
.brushing-cover :deep(.author-profiles[data-layout='row'] .author-profile) { width: auto; min-width: 0; }
.brushing-cover :deep(.author-photo) { margin-inline: auto; }
.brushing-cover :deep(.author-meta) { width: 116px; margin-top: 15px; }
.brushing-cover :deep(.author-name) {
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  justify-content: center;
  min-height: 0;
  line-height: 1.2;
}
.brushing-cover :deep(.author-affiliation) { margin-top: 4px; line-height: 1.3; }
.brushing-cover :deep(.author-profile:nth-child(6) .author-meta) { width: 136px; }
.brushing-cover :deep(.author-profile:nth-child(6) .author-name) {
  white-space: nowrap;
  overflow-wrap: normal;
}
</style>
