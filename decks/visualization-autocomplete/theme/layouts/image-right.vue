<script setup>
import SlideRoot from '../components/SlideRoot.vue'
</script>

<template>
  <SlideRoot layout-class="image-right" v-bind="$attrs">
    <DeckFrame />
    <main class="deck-content">
      <section class="image-right-copy">
        <slot />
      </section>
      <section class="image-right-media">
        <slot name="image" />
      </section>
    </main>
  </SlideRoot>
</template>
