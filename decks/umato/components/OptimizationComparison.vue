<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useIsSlideActive, useSlideContext } from '@slidev/client'
const { $page } = useSlideContext()
const active = useIsSlideActive()
const metadata = ref(null)
const failed = ref('')
const umapCanvas = ref(null), umatoCanvas = ref(null)
const elapsed = ref(0), playing = ref(false)
const duration = ref(18000)
const referenceDuration = 18000
const localPlaybackSpeed = 2
const colors = ['#4e79a7','#f28e2b','#e15759','#76b7b2','#59a14f','#edc948','#b07aa1','#ff9da7','#9c755f','#797979']
const names = ['T-shirt/top','Trouser','Pullover','Dress','Coat','Sandal','Shirt','Sneaker','Bag','Ankle boot']
const progress = computed(() => Math.max(0,Math.min(1,elapsed.value / duration.value)))
let traces = {}, animation = 0, lastTime = 0, disposed = false, loading = false
const assetBase = `${import.meta.env.BASE_URL}optimization/`

function sampleAt(key) {
  const info = metadata.value?.[key]
  if (!info) return null
  let position=progress.value*(info.frames-1)
  let enteringLocal=false
  if (key==='umato') {
    const localStart=info.phases.findIndex(frame=>frame.phase==='local')
    const start=localStart-1, extra=4
    const total=info.frames-1+extra
    const frameMs=referenceDuration/total
    const localTime=(localStart+extra)*frameMs
    const timeline=elapsed.value<=localTime
      ? elapsed.value/frameMs
      : localStart+extra+(elapsed.value-localTime)/frameMs*localPlaybackSpeed
    if (localStart>0 && timeline>=start && timeline<localStart+extra) {
      position=start+(timeline-start)/(1+extra)
      enteringLocal=timeline>start
    } else if (localStart>0 && timeline>=localStart+extra) position=timeline-extra
    else position=timeline
  }
  position=Math.max(0,Math.min(info.frames-1,position))
  const a=Math.floor(position), b=Math.min(a+1,info.frames-1)
  return {a,b,mix:position-a,enteringLocal,phase:info.phases[a]}
}
function frameAt(key) { return sampleAt(key)?.phase }
function caption(key) {
  const frame = frameAt(key)
  if (!frame) return 'Loading optimization trace…'
  if (progress.value===1) return 'Optimization complete'
  if (sampleAt(key).enteringLocal) return 'Initializing local optimization'
  if (frame.phase==='global') return `Global optimization · ${metadata.value.hubIds.length} hubs · epoch ${frame.epoch}/${metadata.value.umatoParameters.global_n_epochs}`
  if (frame.phase==='local') return `Local optimization · epoch ${frame.epoch}/${metadata.value.umatoParameters.local_n_epochs}`
  if (frame.phase==='complete') return 'Arranging disconnected points'
  return `Optimization · epoch ${frame.epoch}/${metadata.value.umapParameters?.n_epochs ?? metadata.value.umap.phases.at(-1).epoch}`
}
function draw(key,canvas) {
  const info = metadata.value?.[key], data = traces[key]
  if (!canvas || !info || !data) return
  const ctx = canvas.getContext('2d')
  ctx.setTransform(2,0,0,2,0,0)
  ctx.clearRect(0,0,830,530)
  const sample=sampleAt(key), {a,b,mix}=sample
  const count=metadata.value.points, offsetA=a*count*2, offsetB=b*count*2
  const square=500, left=(830-square)/2, top=15
  const fade=mix*mix*(3-2*mix)
  const globalRadius=sample.enteringLocal?3.1+(2.2-3.1)*fade:sample.phase.phase==='global'?3.1:2.2
  // Fixed axes and genuine recorded positions throughout. New points fade in
  // at their actual initialization coordinates; no invented travel from hubs.
  for (let label=0;label<10;label++) {
    ctx.fillStyle=colors[label]
    for (const entering of [false,true]) {
      ctx.globalAlpha=.73*(entering?fade:1);ctx.beginPath()
      for (let i=0;i<count;i++) {
        if (metadata.value.labels[i]!==label) continue
        const ax=data[offsetA+i*2], ay=data[offsetA+i*2+1]
        const bx=data[offsetB+i*2], by=data[offsetB+i*2+1]
        const validA=ax!==65535 && ay!==65535, validB=bx!==65535 && by!==65535
        if (entering ? validA || !validB : !validA) continue
        const qx=entering?bx:validB?ax+(bx-ax)*mix:ax
        const qy=entering?by:validB?ay+(by-ay)*mix:ay
        const x=left+qx/65534*square, y=top+(1-qy/65534)*square
        const radius=key==='umato' && !entering?globalRadius:2.2
        ctx.moveTo(x+radius,y);ctx.arc(x,y,radius,0,Math.PI*2)
      }
      ctx.fill()
    }
  }
  ctx.globalAlpha=1
  canvas.dataset.frame=String(a)
  canvas.dataset.phase=sample.enteringLocal?'initializing':sample.phase.phase
  canvas.dataset.entryOpacity=String(fade)
}

function render() { draw('umap',umapCanvas.value);draw('umato',umatoCanvas.value) }
function stop() { cancelAnimationFrame(animation);animation=0;playing.value=false }
function tick(now) {
  if (!active.value || disposed) { stop();return }
  elapsed.value=Math.min(duration.value,elapsed.value+Math.max(0,now-lastTime));lastTime=now
  render()
  if (elapsed.value<duration.value) animation=requestAnimationFrame(tick)
  else stop()
}
function play() {
  if (!metadata.value || !active.value) return
  if (elapsed.value>=duration.value) elapsed.value=0
  stop();playing.value=true;lastTime=performance.now();animation=requestAnimationFrame(tick)
}
function replay() { stop();elapsed.value=0;render();play() }
function toggle() { playing.value?stop():play() }
function seek(event) { stop();elapsed.value=Number(event.target.value)*duration.value;render() }
watch(active,value => { if (value) { metadata.value ? replay() : load() } else stop() })
async function load() {
  if (loading || disposed || metadata.value) return
  loading=true;failed.value=''
  try {
    const response=await fetch(`${assetBase}metadata.json`)
    if (!response.ok) throw new Error('Unable to load optimization metadata')
    const meta=await response.json()
    const buffers=await Promise.all(['umap','umato'].map(async key => {
      const response=await fetch(`${assetBase}${meta[key].file}`)
      if (!response.ok) throw new Error(`Unable to load ${key} trace`)
      const buffer=await response.arrayBuffer()
      if (buffer.byteLength!==meta[key].frames*meta.points*2*2) throw new Error('Invalid trace length')
      return new Uint16Array(buffer)
    }))
    if (disposed) return
    traces={umap:buffers[0],umato:buffers[1]}
    const localStart=meta.umato.phases.findIndex(frame=>frame.phase==='local')
    const total=meta.umato.frames-1+4, localTime=localStart+4
    duration.value=referenceDuration/total*(localTime+(total-localTime)/localPlaybackSpeed)
    metadata.value=meta
    await nextTick();render()
    if (active.value) replay()
  } catch (error) { failed.value=error.message }
  finally { loading=false }
}
onMounted(() => { if (active.value) load() })
onUnmounted(() => { disposed=true;stop() })
</script>

<template>
  <section class="optimization-comparison">
    <h1>UMAP and UMATO: optimization in action</h1>
    <p class="subtitle">Fashion-MNIST</p>
    <div class="method umap-method">
      <h2>UMAP</h2><p class="stage">{{ caption('umap') }}</p>
      <canvas ref="umapCanvas" width="1660" height="1060" aria-label="Recorded UMAP optimization of 3,000 Fashion-MNIST images" />
    </div>
    <div class="method umato-method">
      <h2>UMATO</h2><p class="stage">{{ caption('umato') }}</p>
      <canvas ref="umatoCanvas" width="1660" height="1060" aria-label="Recorded UMATO global and local optimization of the same Fashion-MNIST images" />
    </div>
    <div class="class-legend"><div v-for="(name,i) in names" :key="name"><span :style="{background:colors[i]}" />{{ name }}</div></div>
    <div v-if="metadata" class="playback" @click.stop @pointerdown.stop @keydown.stop>
      <button type="button" @click="replay">Replay</button>
      <button type="button" @click="toggle">{{ playing?'Pause':'Play' }}</button>
      <input type="range" min="0" max="1" step="0.001" :value="progress" aria-label="Optimization progress" @input="seek" />
      <span>{{ Math.round(progress*100) }}%</span>
    </div>
    <p v-if="failed" class="load-error">{{ failed }}</p>
    <span class="page-number">{{ $page }} / <SlidesTotal /></span>
  </section>
</template>

<style scoped>
.optimization-comparison { position: relative; width: 100%; height: 100%; background: #fff; color: #111; font-family: Arial, sans-serif; }
.optimization-comparison h1 { position: absolute; left: 96px; top: 80px; margin: 0; font-size: 72px; line-height: 1.2; font-weight: 400; }
.subtitle { position: absolute; left: 96px; top: 190px; margin: 0; font-size: 34px; line-height: 1.3; color: #555; }
.method { position: absolute; top: 260px; width: 830px; }
.umap-method { left: 96px; }
.umato-method { left: 994px; }
.optimization-comparison h2 { margin: 0 0 12px; font-size: 44px; line-height: 1.2; font-weight: 700; text-align: center; }
.stage { margin: 0; height: 44px; font-size: 27px; line-height: 1.3; color: #555; text-align: center; }
.method canvas { display: block; width: 830px; height: 530px; }
.class-legend { position: absolute; left: 96px; top: 900px; width: 1728px; display: flex; justify-content: space-between; gap: 18px; font-size: 23px; line-height: 1.3; }
.class-legend div { display: flex; align-items: center; gap: 9px; white-space: nowrap; }
.class-legend span { display: inline-block; width: 15px; height: 15px; border-radius: 50%; flex: none; }
.playback { position: absolute; left: 96px; top: 955px; width: 1728px; display: flex; align-items: center; gap: 25px; font-size: 25px; line-height: 1.2; }
.playback button { padding: 8px 18px; border: 1px solid #aeb7c7; border-radius: 5px; background: #fff; color: #23448e; font: inherit; cursor: pointer; }
.playback input { flex: 1; accent-color: #23448e; cursor: pointer; }
.playback > span { min-width: 70px; text-align: right; font-variant-numeric: tabular-nums; }
.load-error { position: absolute; left: 96px; top: 955px; margin: 0; font-size: 28px; color: #b33d47; }
.page-number { position: absolute; right: 40px; bottom: 24px; font-size: 24px; line-height: 1; color: #555; }
</style>
