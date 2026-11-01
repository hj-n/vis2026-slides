<script setup>
import SlideRoot from '../components/SlideRoot.vue'
</script>

<template>
  <SlideRoot layout-class="quote" v-bind="$attrs">
    <DeckFrame />
    <main class="deck-content">
      <slot />
    </main>
  </SlideRoot>
</template>
