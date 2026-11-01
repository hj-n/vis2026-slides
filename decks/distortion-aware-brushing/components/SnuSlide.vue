<script setup>
import { onMounted, onBeforeUnmount, ref, watchEffect } from 'vue'
import { useIsSlideActive, useSlideContext } from '@slidev/client'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { sourcePages } from '../source/snu-slides'
import { SlideContext } from '../source/slidev-runtime'

const props = defineProps({ sourcePage: { type: Number, required: true } })
const { $clicks, $page, $slidev } = useSlideContext()
const active = useIsSlideActive()
const host = ref()
let root, stop
onMounted(() => {
  const shadow = host.value.attachShadow({ mode: 'open' })
  const style = document.createElement('style')
  style.textContent = `
    :host { display:block; width:1920px; height:1080px; font-family:Arial,sans-serif; font-size:38px; line-height:1.5; color:#172536; --osd-bg:#fff; --osd-text:#172536; --osd-font-body:Arial; --osd-font-display:Arial; --osd-size-body:38px; }
    *, *::before, *::after { box-sizing:border-box; }
    h1,h2,h3,p,ul,ol { margin:0; }
    h1,h2,h3 { font-size:inherit; font-weight:inherit; }
    ul,ol { list-style:none; padding:0; }
    img,svg,canvas { display:block; vertical-align:middle; }
    img { max-width:100%; height:auto; }
    button,input { font:inherit; }
    button { cursor:pointer; }
    a { color:inherit; text-decoration:inherit; }
    strong { font-weight:700; }
    @media(prefers-reduced-motion:reduce) { * { transition:none!important; } }
  `
  const mount = document.createElement('div')
  mount.style.cssText = 'width:1920px;height:1080px;position:relative;'
  shadow.append(style, mount)
  root = createRoot(mount)
  stop = watchEffect(() => {
    const value = { active: active.value, current: $page.value, total: $slidev.nav.total, clicks: $clicks.value }
    root.render(createElement(SlideContext.Provider, { value }, createElement(sourcePages[props.sourcePage])))
  })
})
onBeforeUnmount(() => { stop?.(); root?.unmount() })
</script>

<template><div ref="host" :data-source-page="sourcePage" /></template>
