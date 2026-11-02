<template>
  <div class="source-layout">
    <div class="source-canvas"><slot /></div>
  </div>
</template>

<style>
.source-layout {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
}
.source-canvas {
  position: absolute;
  inset: 0;
  width: 1920px;
  height: 1080px;
  transform: scale(0.5104166667);
  transform-origin: top left;
  font-family: Arial, sans-serif;
  font-size: 38px;
  line-height: 1.5;
  color: #172536;
  --osd-bg: #fff;
  --osd-text: #172536;
  --osd-font-body: Arial;
  --osd-font-display: Arial;
  --osd-size-body: 38px;
}
.source-canvas *,
.source-canvas *::before,
.source-canvas *::after {
  box-sizing: border-box;
}
.source-canvas h1,
.source-canvas h2,
.source-canvas h3,
.source-canvas p {
  margin: 0;
}
.source-canvas h1,
.source-canvas h2,
.source-canvas h3 {
  font-size: inherit;
  font-weight: inherit;
}
.source-canvas ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.source-canvas img {
  display: block;
  max-width: 100%;
  height: auto;
}
.source-canvas svg {
  display: block;
  vertical-align: middle;
}
.source-canvas a {
  color: inherit;
  text-decoration: inherit;
}
.source-canvas strong {
  font-weight: 700;
}
.source-canvas .slidev-vclick-hidden {
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
}
</style>
