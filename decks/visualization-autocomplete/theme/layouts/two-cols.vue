<script setup>
import SlideRoot from '../components/SlideRoot.vue'
</script>

<template>
  <SlideRoot layout-class="two-cols" v-bind="$attrs">
    <DeckFrame />
    <main class="deck-content">
      <slot />
      <div class="two-cols-grid">
        <section class="two-cols-panel">
          <slot name="left" />
        </section>
        <section class="two-cols-panel">
          <slot name="right" />
        </section>
      </div>
    </main>
  </SlideRoot>
</template>
