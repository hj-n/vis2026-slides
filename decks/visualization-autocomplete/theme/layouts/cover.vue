<script setup>
import SlideRoot from '../components/SlideRoot.vue'
</script>

<template>
  <SlideRoot layout-class="cover" class="autocomplete-cover" v-bind="$attrs">
    <DeckFrame />
    <main class="deck-content">
      <slot />
    </main>
  </SlideRoot>
</template>

<style scoped>
.autocomplete-cover :deep(h1) { margin-left: 0; }
.autocomplete-cover :deep(.author-profiles[data-layout='row']) {
  display: grid;
  grid-template-columns: repeat(3, var(--author-image-size));
  justify-content: start;
  gap: 35px;
}
.autocomplete-cover :deep(.author-profiles[data-layout='row'] .author-profile) {
  width: var(--author-image-size);
  min-width: 0;
}
.autocomplete-cover :deep(.author-meta) {
  width: var(--author-card-width);
}
</style>
