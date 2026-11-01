<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  split: {
    type: Number,
    default: 52,
  },
  width: {
    type: String,
    default: '580px',
  },
  aspectRatio: {
    type: String,
    default: '1966 / 1520',
  },
  leftAlt: {
    type: String,
    default: 'Left results panels',
  },
  rightAlt: {
    type: String,
    default: 'Right results panels',
  },
  leftTitle: {
    type: String,
    default: '',
  },
  rightTitle: {
    type: String,
    default: '',
  },
  rightCaption: {
    type: String,
    default: '',
  },
})

const rightSplit = computed(() => 100 - props.split)
const containerStyle = computed(() => ({
  width: `min(${props.width}, 100%)`,
  aspectRatio: props.aspectRatio,
}))
const leftStyle = computed(() => ({ width: `${props.split}%` }))
const rightStyle = computed(() => ({ width: `${rightSplit.value}%` }))
const rightCaptionStyle = computed(() => ({
  left: `${props.split}%`,
  width: `${rightSplit.value}%`,
}))
const leftImageStyle = computed(() => ({ width: `${10000 / props.split}%` }))
const rightImageStyle = computed(() => ({ width: `${10000 / rightSplit.value}%` }))
const resolvedSrc = computed(() => props.src.startsWith('/')
  ? `${import.meta.env.BASE_URL}${props.src.slice(1)}`
  : props.src)
</script>

<template>
  <div
    class="results-comparison"
    :class="{ 'has-caption': rightCaption }"
    :style="containerStyle"
  >
    <div class="results-half results-left" :style="leftStyle">
      <img :src="resolvedSrc" :alt="leftAlt" :style="leftImageStyle" />
      <div v-if="leftTitle" class="results-title">{{ leftTitle }}</div>
    </div>
    <div v-click="1" class="results-half results-right" :style="rightStyle">
      <img :src="resolvedSrc" :alt="rightAlt" :style="rightImageStyle" />
      <div v-if="rightTitle" class="results-title">{{ rightTitle }}</div>
    </div>
    <div
      v-if="rightCaption"
      v-click="1"
      class="results-caption"
      :style="rightCaptionStyle"
    >
      {{ rightCaption }}
    </div>
  </div>
</template>

<style scoped>
.results-comparison {
  position: relative;
  display: flex;
  margin: 4px auto 0;
}

.results-comparison.has-caption {
  margin-bottom: 38px;
}

.results-half {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.results-half img {
  position: absolute;
  top: 0;
  max-width: none;
  height: 100%;
  object-fit: fill;
}

.results-left img {
  left: 0;
}

.results-right img {
  right: 0;
}

.results-title {
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  height: 58px;
  padding: 1px 0 0;
  background: #fff;
  color: #111;
  font-size: 22px;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.results-caption {
  position: absolute;
  z-index: 2;
  top: calc(100% + 4px);
  box-sizing: border-box;
  padding: 0;
  color: #666;
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  line-height: 1.25;
}
</style>
