<script setup>
import SlideRoot from '../../visualization-autocomplete/theme/components/SlideRoot.vue'
import DeckFrame from '../../visualization-autocomplete/theme/components/DeckFrame.vue'
</script>

<template>
  <SlideRoot layout-class="cover" class="misuse-cover" v-bind="$attrs">
    <DeckFrame />
    <main class="deck-content"><slot /></main>
  </SlideRoot>
</template>

<style scoped>
.misuse-cover :deep(.deck-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 48px 64px;
}
.misuse-cover :deep(h2) { margin: 0 0 18px; line-height: 1; }
.misuse-cover :deep(h1) {
  width: 100%;
  max-width: none;
  margin: 0 0 14px !important;
  font-size: 42px;
  line-height: 1.1;
  letter-spacing: -0.025em;
}
.misuse-cover :deep(h1 + p) {
  width: 100%;
  max-width: none;
  margin: 0 !important;
  font-size: 42px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.025em;
}
.misuse-cover :deep(.author-profiles[data-layout='row']) {
  display: grid;
  grid-template-columns: repeat(4, 120px);
  justify-content: start;
  gap: 35px;
  width: 100%;
  margin-top: 36px;
}
.misuse-cover :deep(.author-profiles[data-layout='row'] .author-profile) { width: auto; min-width: 0; }
.misuse-cover :deep(.author-photo) { margin-inline: auto; }
.misuse-cover :deep(.author-meta) { width: 145px; margin-top: 15px; }
.misuse-cover :deep(.author-name) {
  display: flex;
  flex-wrap: wrap;
  align-content: start;
  justify-content: center;
  min-height: 0;
  line-height: 1.2;
}
.misuse-cover :deep(.author-affiliation) { margin-top: 4px; line-height: 1.3; }
</style>
