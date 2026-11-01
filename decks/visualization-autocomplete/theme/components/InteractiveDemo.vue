<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: 'Interactive demo',
  },
  scale: {
    type: Number,
    default: 1,
  },
})

const frame = ref(null)
const keyboardAnchor = ref(null)

const frameStyle = computed(() => {
  const scale = Math.min(1, Math.max(0.1, props.scale))

  return {
    width: `${100 / scale}%`,
    height: `${100 / scale}%`,
    transform: `scale(${scale})`,
  }
})

const restoreSlideFocus = () => {
  window.setTimeout(() => {
    if (document.activeElement !== frame.value)
      return

    frame.value?.blur()
    window.focus()
    keyboardAnchor.value?.focus({ preventScroll: true })
  }, 0)
}

onMounted(async () => {
  await nextTick()
  window.addEventListener('blur', restoreSlideFocus, true)
  frame.value?.addEventListener('focus', restoreSlideFocus)
  keyboardAnchor.value?.focus({ preventScroll: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('blur', restoreSlideFocus, true)
  frame.value?.removeEventListener('focus', restoreSlideFocus)
})
</script>

<template>
  <div ref="keyboardAnchor" class="interactive-demo" tabindex="-1">
    <iframe
      ref="frame"
      :src="src"
      :title="title"
      :style="frameStyle"
      tabindex="-1"
      allow="clipboard-read; clipboard-write; fullscreen"
    />
  </div>
</template>

<style scoped>
.interactive-demo {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #ffffff;
  outline: none;
}

.interactive-demo iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: #ffffff;
  transform-origin: top left;
}
</style>
