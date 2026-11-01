<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  layoutClass: {
    type: String,
    required: true,
  },
  margin: {
    type: [Number, String],
  },
  marginX: {
    type: [Number, String],
  },
  marginY: {
    type: [Number, String],
  },
  marginTop: {
    type: [Number, String],
  },
  marginRight: {
    type: [Number, String],
  },
  marginBottom: {
    type: [Number, String],
  },
  marginLeft: {
    type: [Number, String],
  },
})

const attrs = useAttrs()

const asCssUnit = value => {
  if (value === undefined || value === null || value === '')
    return undefined

  return typeof value === 'number' ? `${value}px` : String(value)
}

const marginStyle = computed(() => {
  const values = {
    '--slide-page-margin': asCssUnit(props.margin),
    '--slide-page-margin-x': asCssUnit(props.marginX),
    '--slide-page-margin-y': asCssUnit(props.marginY),
    '--slide-page-margin-top': asCssUnit(props.marginTop),
    '--slide-page-margin-right': asCssUnit(props.marginRight),
    '--slide-page-margin-bottom': asCssUnit(props.marginBottom),
    '--slide-page-margin-left': asCssUnit(props.marginLeft),
  }

  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined),
  )
})
</script>

<template>
  <div
    v-bind="attrs"
    class="slidev-layout"
    :class="layoutClass"
    :style="marginStyle"
  >
    <slot />
  </div>
</template>
