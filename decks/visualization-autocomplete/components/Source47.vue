<script setup>
import { useSlideContext, useIsSlideActive } from "@slidev/client";
import { computed, onUnmounted, ref, watch } from "vue";
const { $clicks, $page } = useSlideContext();
const assetBase = import.meta.env.BASE_URL;

const active = useIsSlideActive();
const elapsed = ref(16800);
const end = 16800;
const xs = [340, 710, 1080, 1450];
const ys = [298, 526, 754];
const rows = [1, 2, 0, 1];
const ease = (n) => {
  const t = Math.max(0, Math.min(1, n));
  return t * t * (3 - 2 * t);
};
const start = (phase) => 800 + phase * 4000;
const selection = (phase) => start(phase) + 2600;
const selected = (phase, row) =>
  elapsed.value >= selection(phase) && row === rows[phase];
let frame = 0;
function replay() {
  cancelAnimationFrame(frame);
  if (!active.value || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elapsed.value = end;
    return;
  }
  elapsed.value = 0;
  const began = performance.now();
  let previous = -100;
  function tick(now) {
    const time = Math.min(end, (now - began) * 2);
    if (time - previous >= 30 || time === end) {
      elapsed.value = time;
      previous = time;
    }
    if (time < end) frame = requestAnimationFrame(tick);
  }
  frame = requestAnimationFrame(tick);
}
watch(
  active,
  (value) => {
    if (value) replay();
    else {
      cancelAnimationFrame(frame);
      elapsed.value = end;
    }
  },
  { immediate: true },
);
onUnmounted(() => cancelAnimationFrame(frame));
function candidateStyle(phase, row) {
  const entrance = ease((elapsed.value - start(phase) - row * 90) / 420);
  const settled = ease((elapsed.value - selection(phase)) / 420);
  return {
    opacity: entrance * (row === rows[phase] ? 1 : 1 - settled * 0.52),
    visibility: elapsed.value >= start(phase) ? "visible" : "hidden",
    transform: `translateY(${(1 - entrance) * 9}px)`,
    border: selected(phase, row) ? "2px solid #23448e" : "1px solid #cbd1d9",
  };
}
const pathProgress = (phase) => ease((elapsed.value - selection(phase)) / 700);
const cursor = computed(() => {
  const targets = xs.map((x, i) => [x + 238, ys[rows[i]] + 134]);
  let point = [235, 720];
  for (let phase = 0; phase < 4; phase++) {
    const movement = ease((elapsed.value - start(phase) - 850) / 1450);
    if (movement > 0) {
      const from = phase === 0 ? [235, 720] : targets[phase - 1];
      point = [
        from[0] + (targets[phase][0] - from[0]) * movement,
        from[1] + (targets[phase][1] - from[1]) * movement,
      ];
    }
  }
  return { left: point[0] + "px", top: point[1] + "px" };
});
const pressing = computed(() =>
  rows.some(
    (_, phase) =>
      elapsed.value >= selection(phase) &&
      elapsed.value < selection(phase) + 280,
  ),
);
</script>

<template>
  <section
    data-autocompletion-sequence=""
    :data-sequence-time="Math.round(elapsed)"
    style="
      width: 100%;
      height: 100%;
      position: relative;
      background: #fff;
      color: #000;
      font-family: Arial;
    "
  >
    <h1
      style="
        position: absolute;
        left: 96px;
        top: 100px;
        margin: 0;
        font-size: 64px;
        line-height: 1.2;
        font-weight: 400;
      "
    >
      <span style="font-weight: 400">Rationale: </span
      ><span style="font-weight: 700"
        >Hard to design, easy to see and evaluate</span
      >
    </h1>
    <div
      data-osd-interactive=""
      role="button"
      tabindex="0"
      aria-label="Replay the visualization autocompletion sequence"
      @click.stop="replay"
      @keydown.enter.stop.prevent="replay"
      @keydown.space.stop.prevent="replay"
      style="
        position: absolute;
        inset: 220px 80px 120px 80px;
        cursor: pointer;
        outline-offset: 8px;
      "
    ></div>
    <svg
      viewBox="0 0 1920 1080"
      aria-label="Selected design path"
      style="
        position: absolute;
        inset: 0;
        width: 1920px;
        height: 1080px;
        pointer-events: none;
      "
    >
      <path
        data-auto-path="0"
        d="M280 628 C310 628 310 628 340 628"
        pathLength="1"
        fill="none"
        stroke="#23448e"
        stroke-width="3"
        stroke-dasharray="1"
        :stroke-dashoffset="1 - pathProgress(0)"
        :opacity="pathProgress(0) > 0 ? 1 : 0"
      ></path>
      <path
        data-auto-path="1"
        d="M656 628 C683 628 683 856 710 856"
        pathLength="1"
        fill="none"
        stroke="#23448e"
        stroke-width="3"
        stroke-dasharray="1"
        :stroke-dashoffset="1 - pathProgress(1)"
        :opacity="pathProgress(1) > 0 ? 1 : 0"
      ></path>
      <path
        data-auto-path="2"
        d="M1026 856 C1053 856 1053 400 1080 400"
        pathLength="1"
        fill="none"
        stroke="#23448e"
        stroke-width="3"
        stroke-dasharray="1"
        :stroke-dashoffset="1 - pathProgress(2)"
        :opacity="pathProgress(2) > 0 ? 1 : 0"
      ></path>
      <path
        data-auto-path="3"
        d="M1396 400 C1423 400 1423 628 1450 628"
        pathLength="1"
        fill="none"
        stroke="#23448e"
        stroke-width="3"
        stroke-dasharray="1"
        :stroke-dashoffset="1 - pathProgress(3)"
        :opacity="pathProgress(3) > 0 ? 1 : 0"
      ></path>
    </svg>
    <div
      style="
        position: absolute;
        left: 96px;
        top: 526px;
        width: 184px;
        height: 204px;
        box-sizing: border-box;
        border: 1px solid #cbd1d9;
        background: #fff;
        pointer-events: none;
      "
    >
      <p style="margin: 13px 0 0; text-align: center; font-size: 26px">
        Empty spec
      </p>
      <p
        style="
          margin: 31px 0 0;
          text-align: center;
          font-size: 54px;
          color: #a8b0bb;
          letter-spacing: 9px;
        "
      >
        { }
      </p>
    </div>
    <div style="pointer-events: none">
      <p
        style="
          position: absolute;
          left: 340px;
          top: 237px;
          width: 316px;
          margin: 0;
          font-size: 30px;
          line-height: 1.2;
          color: #000;
          opacity: 1;
        "
        :style="{ opacity: ease((elapsed - start(0)) / 350) }"
      >
        Suggestions
      </p>
      <p
        style="
          position: absolute;
          left: 710px;
          top: 237px;
          width: 316px;
          margin: 0;
          font-size: 30px;
          line-height: 1.2;
          color: #000;
          opacity: 1;
        "
        :style="{ opacity: ease((elapsed - start(1)) / 350) }"
      >
        Suggestions
      </p>
      <p
        style="
          position: absolute;
          left: 1080px;
          top: 237px;
          width: 316px;
          margin: 0;
          font-size: 30px;
          line-height: 1.2;
          color: #000;
          opacity: 1;
        "
        :style="{ opacity: ease((elapsed - start(2)) / 350) }"
      >
        Suggestions
      </p>
      <p
        style="
          position: absolute;
          left: 1450px;
          top: 237px;
          width: 316px;
          margin: 0;
          font-size: 30px;
          line-height: 1.2;
          color: #000;
          opacity: 1;
        "
        :style="{ opacity: ease((elapsed - start(3)) / 350) }"
      >
        Suggestions
      </p>
      <div
        data-auto-candidate="0-0"
        :data-selected="selected(0, 0)"
        :style="candidateStyle(0, 0)"
        style="
          position: absolute;
          left: 340px;
          top: 298px;
          width: 316px;
          height: 204px;
          box-sizing: border-box;
          background: #fff;
        "
      >
        <p
          style="
            position: absolute;
            left: 13px;
            top: 10px;
            margin: 0;
            font-size: 23px;
            line-height: 1.2;
            color: #000;
          "
        >
          Encode y
        </p>
        <svg
          data-auto-preview="0-encode-y"
          data-auto-action="encode-y"
          viewBox="0 0 292 152"
          role="img"
          aria-label="Preview after encode y"
          style="
            position: absolute;
            left: 12px;
            top: 42px;
            width: 292px;
            height: 152px;
            overflow: visible;
            font-family: Arial;
          "
        >
          <text x="26" y="72" text-anchor="end" fill="#000" style="font-size: 12px;">
            200
          </text>
          <text x="26" y="16" text-anchor="end" fill="#000" style="font-size: 12px;">
            400
          </text>
          <g>
            <rect
              x="143"
              y="29.64"
              width="34"
              height="94.36"
              fill="#23448e"
              fill-opacity="1"
            ></rect>
          </g>
          <path
            data-auto-chart-axis=""
            d="M32 12V124H281"
            fill="none"
            stroke="#000"
            stroke-width="1"
          ></path>
          <text x="26" y="128" text-anchor="end" fill="#000" style="font-size: 12px;">
            0
          </text>
        </svg>
      </div>
      <div
        data-auto-candidate="0-1"
        :data-selected="selected(0, 1)"
        :style="candidateStyle(0, 1)"
        style="
          position: absolute;
          left: 340px;
          top: 526px;
          width: 316px;
          height: 204px;
          box-sizing: border-box;
          background: #fff;
        "
      >
        <p
          style="
            position: absolute;
            left: 13px;
            top: 10px;
            margin: 0;
            font-size: 23px;
            line-height: 1.2;
            color: #000;
          "
        >
          Encode x
        </p>
        <svg
          data-auto-preview="0-encode-x"
          data-auto-action="encode-x"
          viewBox="0 0 292 152"
          role="img"
          aria-label="Preview after encode x"
          style="
            position: absolute;
            left: 12px;
            top: 42px;
            width: 292px;
            height: 152px;
            overflow: visible;
            font-family: Arial;
          "
        >
          <g>
            <rect
              x="39"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="52.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jan
            </text>
          </g>
          <g>
            <rect
              x="79.33333333333334"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="92.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Feb
            </text>
          </g>
          <g>
            <rect
              x="119.66666666666667"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="133.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Mar
            </text>
          </g>
          <g>
            <rect
              x="160"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="173.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Apr
            </text>
          </g>
          <g>
            <rect
              x="200.33333333333334"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="213.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              May
            </text>
          </g>
          <g>
            <rect
              x="240.66666666666669"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="254.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jun
            </text>
          </g>
          <path
            data-auto-chart-axis=""
            d="M32 124H281"
            fill="none"
            stroke="#000"
            stroke-width="1"
          ></path></svg
        ><svg
          viewBox="0 0 22 22"
          aria-label="Selected"
          v-show="elapsed >= selection(0)"
          style="
            position: absolute;
            right: 10px;
            top: 8px;
            width: 22px;
            height: 22px;
          "
        >
          <rect width="22" height="22" fill="#23448e"></rect>
          <path
            d="M5 11 L9 15 L17 7"
            fill="none"
            stroke="#fff"
            stroke-width="2"
          ></path>
        </svg>
      </div>
      <div
        data-auto-candidate="0-2"
        :data-selected="selected(0, 2)"
        :style="candidateStyle(0, 2)"
        style="
          position: absolute;
          left: 340px;
          top: 754px;
          width: 316px;
          height: 204px;
          box-sizing: border-box;
          background: #fff;
        "
      >
        <p
          style="
            position: absolute;
            left: 13px;
            top: 10px;
            margin: 0;
            font-size: 23px;
            line-height: 1.2;
            color: #000;
          "
        >
          Add title
        </p>
        <svg
          data-auto-preview="0-add-title"
          data-auto-action="add-title"
          viewBox="0 0 292 152"
          role="img"
          aria-label="Preview after add title"
          style="
            position: absolute;
            left: 12px;
            top: 42px;
            width: 292px;
            height: 152px;
            overflow: visible;
            font-family: Arial;
          "
        >
          <text x="32" y="15" fill="#000" style="font-size: 15px;">Monthly sales</text>
        </svg>
      </div>
      <div
        data-auto-candidate="1-0"
        :data-selected="selected(1, 0)"
        :style="candidateStyle(1, 0)"
        style="
          position: absolute;
          left: 710px;
          top: 298px;
          width: 316px;
          height: 204px;
          box-sizing: border-box;
          background: #fff;
        "
      >
        <p
          style="
            position: absolute;
            left: 13px;
            top: 10px;
            margin: 0;
            font-size: 23px;
            line-height: 1.2;
            color: #000;
          "
        >
          Rotate axis labels
        </p>
        <svg
          data-auto-preview="1-rotate-labels"
          data-auto-action="rotate-labels"
          viewBox="0 0 292 152"
          role="img"
          aria-label="Preview after rotate labels"
          style="
            position: absolute;
            left: 12px;
            top: 42px;
            width: 292px;
            height: 152px;
            overflow: visible;
            font-family: Arial;
          "
        >
          <g>
            <rect
              x="39"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="52.5"
              y="137"
              text-anchor="end"
              transform="rotate(-40 52.5 137)"
              fill="#000"

             style="font-size: 12.5px;">
              Jan
            </text>
          </g>
          <g>
            <rect
              x="79.33333333333334"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="92.83333333333334"
              y="137"
              text-anchor="end"
              transform="rotate(-40 92.83333333333334 137)"
              fill="#000"

             style="font-size: 12.5px;">
              Feb
            </text>
          </g>
          <g>
            <rect
              x="119.66666666666667"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="133.16666666666669"
              y="137"
              text-anchor="end"
              transform="rotate(-40 133.16666666666669 137)"
              fill="#000"

             style="font-size: 12.5px;">
              Mar
            </text>
          </g>
          <g>
            <rect
              x="160"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="173.5"
              y="137"
              text-anchor="end"
              transform="rotate(-40 173.5 137)"
              fill="#000"

             style="font-size: 12.5px;">
              Apr
            </text>
          </g>
          <g>
            <rect
              x="200.33333333333334"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="213.83333333333334"
              y="137"
              text-anchor="end"
              transform="rotate(-40 213.83333333333334 137)"
              fill="#000"

             style="font-size: 12.5px;">
              May
            </text>
          </g>
          <g>
            <rect
              x="240.66666666666669"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="254.16666666666669"
              y="137"
              text-anchor="end"
              transform="rotate(-40 254.16666666666669 137)"
              fill="#000"

             style="font-size: 12.5px;">
              Jun
            </text>
          </g>
          <path
            data-auto-chart-axis=""
            d="M32 124H281"
            fill="none"
            stroke="#000"
            stroke-width="1"
          ></path>
        </svg>
      </div>
      <div
        data-auto-candidate="1-1"
        :data-selected="selected(1, 1)"
        :style="candidateStyle(1, 1)"
        style="
          position: absolute;
          left: 710px;
          top: 526px;
          width: 316px;
          height: 204px;
          box-sizing: border-box;
          background: #fff;
        "
      >
        <p
          style="
            position: absolute;
            left: 13px;
            top: 10px;
            margin: 0;
            font-size: 23px;
            line-height: 1.2;
            color: #000;
          "
        >
          Change axis width
        </p>
        <svg
          data-auto-preview="1-axis-width"
          data-auto-action="axis-width"
          viewBox="0 0 292 152"
          role="img"
          aria-label="Preview after axis width"
          style="
            position: absolute;
            left: 12px;
            top: 42px;
            width: 292px;
            height: 152px;
            overflow: visible;
            font-family: Arial;
          "
        >
          <g>
            <rect
              x="39"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="52.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jan
            </text>
          </g>
          <g>
            <rect
              x="79.33333333333334"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="92.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Feb
            </text>
          </g>
          <g>
            <rect
              x="119.66666666666667"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="133.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Mar
            </text>
          </g>
          <g>
            <rect
              x="160"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="173.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Apr
            </text>
          </g>
          <g>
            <rect
              x="200.33333333333334"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="213.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              May
            </text>
          </g>
          <g>
            <rect
              x="240.66666666666669"
              y="105.8"
              width="27"
              height="18.200000000000003"
              fill="#23448e"
              fill-opacity="0.48"
            ></rect>
            <text
              x="254.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jun
            </text>
          </g>
          <path
            data-auto-chart-axis=""
            d="M32 124H281"
            fill="none"
            stroke="#000"
            stroke-width="3.5"
          ></path>
        </svg>
      </div>
      <div
        data-auto-candidate="1-2"
        :data-selected="selected(1, 2)"
        :style="candidateStyle(1, 2)"
        style="
          position: absolute;
          left: 710px;
          top: 754px;
          width: 316px;
          height: 204px;
          box-sizing: border-box;
          background: #fff;
        "
      >
        <p
          style="
            position: absolute;
            left: 13px;
            top: 10px;
            margin: 0;
            font-size: 23px;
            line-height: 1.2;
            color: #000;
          "
        >
          Encode y
        </p>
        <svg
          data-auto-preview="1-encode-y"
          data-auto-action="encode-y"
          viewBox="0 0 292 152"
          role="img"
          aria-label="Preview after encode y"
          style="
            position: absolute;
            left: 12px;
            top: 42px;
            width: 292px;
            height: 152px;
            overflow: visible;
            font-family: Arial;
          "
        >
          <text x="26" y="72" text-anchor="end" fill="#000" style="font-size: 12px;">
            40
          </text>
          <text x="26" y="16" text-anchor="end" fill="#000" style="font-size: 12px;">
            80
          </text>
          <g>
            <rect
              x="39"
              y="65.19999999999999"
              width="27"
              height="58.80000000000001"
              fill="#23448e"
              fill-opacity="1"
            ></rect>
            <text
              x="52.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jan
            </text>
          </g>
          <g>
            <rect
              x="79.33333333333334"
              y="42.8"
              width="27"
              height="81.2"
              fill="#23448e"
              fill-opacity="1"
            ></rect>
            <text
              x="92.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Feb
            </text>
          </g>
          <g>
            <rect
              x="119.66666666666667"
              y="75"
              width="27"
              height="49"
              fill="#23448e"
              fill-opacity="1"
            ></rect>
            <text
              x="133.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Mar
            </text>
          </g>
          <g>
            <rect
              x="160"
              y="30.200000000000003"
              width="27"
              height="93.8"
              fill="#23448e"
              fill-opacity="1"
            ></rect>
            <text
              x="173.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Apr
            </text>
          </g>
          <g>
            <rect
              x="200.33333333333334"
              y="38.60000000000001"
              width="27"
              height="85.39999999999999"
              fill="#23448e"
              fill-opacity="1"
            ></rect>
            <text
              x="213.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              May
            </text>
          </g>
          <g>
            <rect
              x="240.66666666666669"
              y="20.39999999999999"
              width="27"
              height="103.60000000000001"
              fill="#23448e"
              fill-opacity="1"
            ></rect>
            <text
              x="254.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jun
            </text>
          </g>
          <path
            data-auto-chart-axis=""
            d="M32 12V124H281"
            fill="none"
            stroke="#000"
            stroke-width="1"
          ></path>
          <text x="26" y="128" text-anchor="end" fill="#000" style="font-size: 12px;">
            0
          </text></svg
        ><svg
          viewBox="0 0 22 22"
          aria-label="Selected"
          v-show="elapsed >= selection(1)"
          style="
            position: absolute;
            right: 10px;
            top: 8px;
            width: 22px;
            height: 22px;
          "
        >
          <rect width="22" height="22" fill="#23448e"></rect>
          <path
            d="M5 11 L9 15 L17 7"
            fill="none"
            stroke="#fff"
            stroke-width="2"
          ></path>
        </svg>
      </div>
      <div
        data-auto-candidate="2-0"
        :data-selected="selected(2, 0)"
        :style="candidateStyle(2, 0)"
        style="
          position: absolute;
          left: 1080px;
          top: 298px;
          width: 316px;
          height: 204px;
          box-sizing: border-box;
          background: #fff;
        "
      >
        <p
          style="
            position: absolute;
            left: 13px;
            top: 10px;
            margin: 0;
            font-size: 23px;
            line-height: 1.2;
            color: #000;
          "
        >
          Encode color
        </p>
        <svg
          data-auto-preview="2-encode-color"
          data-auto-action="encode-color"
          viewBox="0 0 292 152"
          role="img"
          aria-label="Preview after encode color"
          style="
            position: absolute;
            left: 12px;
            top: 42px;
            width: 292px;
            height: 152px;
            overflow: visible;
            font-family: Arial;
          "
        >
          <g fill="#000" transform="translate(0 0)" style="font-size: 11.5px;">
            <rect x="104" y="1" width="9" height="9" fill="#23448e"></rect>
            <text x="118" y="10">Online</text>
            <rect x="176" y="1" width="9" height="9" fill="#4b8b82"></rect>
            <text x="190" y="10">In-store</text>
          </g>
          <text x="26" y="80" text-anchor="end" fill="#000" style="font-size: 12px;">
            40
          </text>
          <text x="26" y="32" text-anchor="end" fill="#000" style="font-size: 12px;">
            80
          </text>
          <g>
            <rect
              x="39"
              y="95.2"
              width="27"
              height="28.799999999999997"
              fill="#23448e"
            ></rect>
            <rect
              x="39"
              y="73.6"
              width="27"
              height="21.60000000000001"
              fill="#4b8b82"
            ></rect>
            <text
              x="52.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jan
            </text>
          </g>
          <g>
            <rect
              x="79.33333333333334"
              y="88"
              width="27"
              height="36"
              fill="#23448e"
            ></rect>
            <rect
              x="79.33333333333334"
              y="54.400000000000006"
              width="27"
              height="33.599999999999994"
              fill="#4b8b82"
            ></rect>
            <text
              x="92.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Feb
            </text>
          </g>
          <g>
            <rect
              x="119.66666666666667"
              y="102.4"
              width="27"
              height="21.599999999999994"
              fill="#23448e"
            ></rect>
            <rect
              x="119.66666666666667"
              y="82"
              width="27"
              height="20.400000000000006"
              fill="#4b8b82"
            ></rect>
            <text
              x="133.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Mar
            </text>
          </g>
          <g>
            <rect
              x="160"
              y="78.4"
              width="27"
              height="45.599999999999994"
              fill="#23448e"
            ></rect>
            <rect
              x="160"
              y="43.599999999999994"
              width="27"
              height="34.80000000000001"
              fill="#4b8b82"
            ></rect>
            <text
              x="173.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Apr
            </text>
          </g>
          <g>
            <rect
              x="200.33333333333334"
              y="83.2"
              width="27"
              height="40.8"
              fill="#23448e"
            ></rect>
            <rect
              x="200.33333333333334"
              y="50.80000000000001"
              width="27"
              height="32.39999999999999"
              fill="#4b8b82"
            ></rect>
            <text
              x="213.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              May
            </text>
          </g>
          <g>
            <rect
              x="240.66666666666669"
              y="72.4"
              width="27"
              height="51.599999999999994"
              fill="#23448e"
            ></rect>
            <rect
              x="240.66666666666669"
              y="35.19999999999999"
              width="27"
              height="37.20000000000002"
              fill="#4b8b82"
            ></rect>
            <text
              x="254.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jun
            </text>
          </g>
          <path
            data-auto-chart-axis=""
            d="M32 28V124H281"
            fill="none"
            stroke="#000"
            stroke-width="1"
          ></path>
          <text x="26" y="128" text-anchor="end" fill="#000" style="font-size: 12px;">
            0
          </text></svg
        ><svg
          viewBox="0 0 22 22"
          aria-label="Selected"
          v-show="elapsed >= selection(2)"
          style="
            position: absolute;
            right: 10px;
            top: 8px;
            width: 22px;
            height: 22px;
          "
        >
          <rect width="22" height="22" fill="#23448e"></rect>
          <path
            d="M5 11 L9 15 L17 7"
            fill="none"
            stroke="#fff"
            stroke-width="2"
          ></path>
        </svg>
      </div>
      <div
        data-auto-candidate="2-1"
        :data-selected="selected(2, 1)"
        :style="candidateStyle(2, 1)"
        style="
          position: absolute;
          left: 1080px;
          top: 526px;
          width: 316px;
          height: 204px;
          box-sizing: border-box;
          background: #fff;
        "
      >
        <p
          style="
            position: absolute;
            left: 13px;
            top: 10px;
            margin: 0;
            font-size: 23px;
            line-height: 1.2;
            color: #000;
          "
        >
          Swap x and y
        </p>
        <svg
          data-auto-preview="2-flip-axes"
          data-auto-action="flip-axes"
          viewBox="0 0 292 152"
          role="img"
          aria-label="Preview after swapping x and y: horizontal monthly sales bars"
          style="
            position: absolute;
            left: 12px;
            top: 42px;
            width: 292px;
            height: 152px;
            overflow: visible;
            font-family: Arial;
          "
        >
          <g>
            <text x="40" y="20" text-anchor="end" fill="#000" style="font-size: 12.5px;">
              Jan
            </text>
            <rect
              x="48"
              y="9"
              width="121.80000000000001"
              height="13"
              fill="#23448e"
            ></rect>
          </g>
          <g>
            <text x="40" y="39" text-anchor="end" fill="#000" style="font-size: 12.5px;">
              Feb
            </text>
            <rect x="48" y="28" width="168.2" height="13" fill="#23448e"></rect>
          </g>
          <g>
            <text x="40" y="58" text-anchor="end" fill="#000" style="font-size: 12.5px;">
              Mar
            </text>
            <rect x="48" y="47" width="101.5" height="13" fill="#23448e"></rect>
          </g>
          <g>
            <text x="40" y="77" text-anchor="end" fill="#000" style="font-size: 12.5px;">
              Apr
            </text>
            <rect x="48" y="66" width="194.3" height="13" fill="#23448e"></rect>
          </g>
          <g>
            <text x="40" y="96" text-anchor="end" fill="#000" style="font-size: 12.5px;">
              May
            </text>
            <rect
              x="48"
              y="85"
              width="176.89999999999998"
              height="13"
              fill="#23448e"
            ></rect>
          </g>
          <g>
            <text x="40" y="115" text-anchor="end" fill="#000" style="font-size: 12.5px;">
              Jun
            </text>
            <rect
              x="48"
              y="104"
              width="214.60000000000002"
              height="13"
              fill="#23448e"
            ></rect>
          </g>
          <path
            d="M48 4V124H280"
            fill="none"
            stroke="#000"
            stroke-width="1"
          ></path>
          <g fill="#000" text-anchor="middle" style="font-size: 12px;">
            <text x="48" y="143">0</text>
            <text x="164" y="143">40</text>
            <text x="280" y="143">80</text>
          </g>
        </svg>
      </div>
      <div
        data-auto-candidate="2-2"
        :data-selected="selected(2, 2)"
        :style="candidateStyle(2, 2)"
        style="
          position: absolute;
          left: 1080px;
          top: 754px;
          width: 316px;
          height: 204px;
          box-sizing: border-box;
          background: #fff;
        "
      >
        <p
          style="
            position: absolute;
            left: 13px;
            top: 10px;
            margin: 0;
            font-size: 23px;
            line-height: 1.2;
            color: #000;
          "
        >
          Add gridlines
        </p>
        <svg
          data-auto-preview="2-add-grid"
          data-auto-action="add-grid"
          viewBox="0 0 292 152"
          role="img"
          aria-label="Preview after add grid"
          style="
            position: absolute;
            left: 12px;
            top: 42px;
            width: 292px;
            height: 152px;
            overflow: visible;
            font-family: Arial;
          "
        >
          <line
            x1="32"
            y1="110"
            x2="281"
            y2="110"
            stroke="#8995a5"
            stroke-width="0.9"
          ></line>
          <line
            x1="32"
            y1="96"
            x2="281"
            y2="96"
            stroke="#8995a5"
            stroke-width="0.9"
          ></line>
          <line
            x1="32"
            y1="82"
            x2="281"
            y2="82"
            stroke="#8995a5"
            stroke-width="0.9"
          ></line>
          <line
            x1="32"
            y1="68"
            x2="281"
            y2="68"
            stroke="#8995a5"
            stroke-width="0.9"
          ></line>
          <line
            x1="32"
            y1="54"
            x2="281"
            y2="54"
            stroke="#8995a5"
            stroke-width="0.9"
          ></line>
          <line
            x1="32"
            y1="40"
            x2="281"
            y2="40"
            stroke="#8995a5"
            stroke-width="0.9"
          ></line>
          <line
            x1="32"
            y1="26"
            x2="281"
            y2="26"
            stroke="#8995a5"
            stroke-width="0.9"
          ></line>
          <line
            x1="32"
            y1="12"
            x2="281"
            y2="12"
            stroke="#8995a5"
            stroke-width="0.9"
          ></line>
          <text x="26" y="72" text-anchor="end" fill="#000" style="font-size: 12px;">
            40
          </text>
          <text x="26" y="16" text-anchor="end" fill="#000" style="font-size: 12px;">
            80
          </text>
          <g>
            <rect
              x="39"
              y="65.19999999999999"
              width="27"
              height="58.80000000000001"
              fill="#23448e"
              fill-opacity="1"
            ></rect>
            <text
              x="52.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jan
            </text>
          </g>
          <g>
            <rect
              x="79.33333333333334"
              y="42.8"
              width="27"
              height="81.2"
              fill="#23448e"
              fill-opacity="1"
            ></rect>
            <text
              x="92.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Feb
            </text>
          </g>
          <g>
            <rect
              x="119.66666666666667"
              y="75"
              width="27"
              height="49"
              fill="#23448e"
              fill-opacity="1"
            ></rect>
            <text
              x="133.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Mar
            </text>
          </g>
          <g>
            <rect
              x="160"
              y="30.200000000000003"
              width="27"
              height="93.8"
              fill="#23448e"
              fill-opacity="1"
            ></rect>
            <text
              x="173.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Apr
            </text>
          </g>
          <g>
            <rect
              x="200.33333333333334"
              y="38.60000000000001"
              width="27"
              height="85.39999999999999"
              fill="#23448e"
              fill-opacity="1"
            ></rect>
            <text
              x="213.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              May
            </text>
          </g>
          <g>
            <rect
              x="240.66666666666669"
              y="20.39999999999999"
              width="27"
              height="103.60000000000001"
              fill="#23448e"
              fill-opacity="1"
            ></rect>
            <text
              x="254.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jun
            </text>
          </g>
          <path
            data-auto-chart-axis=""
            d="M32 12V124H281"
            fill="none"
            stroke="#000"
            stroke-width="1"
          ></path>
          <text x="26" y="128" text-anchor="end" fill="#000" style="font-size: 12px;">
            0
          </text>
        </svg>
      </div>
      <div
        data-auto-candidate="3-0"
        :data-selected="selected(3, 0)"
        :style="candidateStyle(3, 0)"
        style="
          position: absolute;
          left: 1450px;
          top: 298px;
          width: 316px;
          height: 204px;
          box-sizing: border-box;
          background: #fff;
        "
      >
        <p
          style="
            position: absolute;
            left: 13px;
            top: 10px;
            margin: 0;
            font-size: 23px;
            line-height: 1.2;
            color: #000;
          "
        >
          Change color palette
        </p>
        <svg
          data-auto-preview="3-change-palette"
          data-auto-action="change-palette"
          viewBox="0 0 292 152"
          role="img"
          aria-label="Preview after change palette"
          style="
            position: absolute;
            left: 12px;
            top: 42px;
            width: 292px;
            height: 152px;
            overflow: visible;
            font-family: Arial;
          "
        >
          <g fill="#000" transform="translate(0 0)" style="font-size: 11.5px;">
            <rect x="104" y="1" width="9" height="9" fill="#7056a4"></rect>
            <text x="118" y="10">Online</text>
            <rect x="176" y="1" width="9" height="9" fill="#d78a3f"></rect>
            <text x="190" y="10">In-store</text>
          </g>
          <text x="26" y="80" text-anchor="end" fill="#000" style="font-size: 12px;">
            40
          </text>
          <text x="26" y="32" text-anchor="end" fill="#000" style="font-size: 12px;">
            80
          </text>
          <g>
            <rect
              x="39"
              y="95.2"
              width="27"
              height="28.799999999999997"
              fill="#7056a4"
            ></rect>
            <rect
              x="39"
              y="73.6"
              width="27"
              height="21.60000000000001"
              fill="#d78a3f"
            ></rect>
            <text
              x="52.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jan
            </text>
          </g>
          <g>
            <rect
              x="79.33333333333334"
              y="88"
              width="27"
              height="36"
              fill="#7056a4"
            ></rect>
            <rect
              x="79.33333333333334"
              y="54.400000000000006"
              width="27"
              height="33.599999999999994"
              fill="#d78a3f"
            ></rect>
            <text
              x="92.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Feb
            </text>
          </g>
          <g>
            <rect
              x="119.66666666666667"
              y="102.4"
              width="27"
              height="21.599999999999994"
              fill="#7056a4"
            ></rect>
            <rect
              x="119.66666666666667"
              y="82"
              width="27"
              height="20.400000000000006"
              fill="#d78a3f"
            ></rect>
            <text
              x="133.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Mar
            </text>
          </g>
          <g>
            <rect
              x="160"
              y="78.4"
              width="27"
              height="45.599999999999994"
              fill="#7056a4"
            ></rect>
            <rect
              x="160"
              y="43.599999999999994"
              width="27"
              height="34.80000000000001"
              fill="#d78a3f"
            ></rect>
            <text
              x="173.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Apr
            </text>
          </g>
          <g>
            <rect
              x="200.33333333333334"
              y="83.2"
              width="27"
              height="40.8"
              fill="#7056a4"
            ></rect>
            <rect
              x="200.33333333333334"
              y="50.80000000000001"
              width="27"
              height="32.39999999999999"
              fill="#d78a3f"
            ></rect>
            <text
              x="213.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              May
            </text>
          </g>
          <g>
            <rect
              x="240.66666666666669"
              y="72.4"
              width="27"
              height="51.599999999999994"
              fill="#7056a4"
            ></rect>
            <rect
              x="240.66666666666669"
              y="35.19999999999999"
              width="27"
              height="37.20000000000002"
              fill="#d78a3f"
            ></rect>
            <text
              x="254.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jun
            </text>
          </g>
          <path
            data-auto-chart-axis=""
            d="M32 28V124H281"
            fill="none"
            stroke="#000"
            stroke-width="1"
          ></path>
          <text x="26" y="128" text-anchor="end" fill="#000" style="font-size: 12px;">
            0
          </text>
        </svg>
      </div>
      <div
        data-auto-candidate="3-1"
        :data-selected="selected(3, 1)"
        :style="candidateStyle(3, 1)"
        style="
          position: absolute;
          left: 1450px;
          top: 526px;
          width: 316px;
          height: 204px;
          box-sizing: border-box;
          background: #fff;
        "
      >
        <p
          style="
            position: absolute;
            left: 13px;
            top: 10px;
            margin: 0;
            font-size: 23px;
            line-height: 1.2;
            color: #000;
          "
        >
          Add title
        </p>
        <svg
          data-auto-preview="3-add-title"
          data-auto-action="add-title"
          viewBox="0 0 292 152"
          role="img"
          aria-label="Preview after add title"
          style="
            position: absolute;
            left: 12px;
            top: 42px;
            width: 292px;
            height: 152px;
            overflow: visible;
            font-family: Arial;
          "
        >
          <text x="32" y="15" fill="#000" style="font-size: 15px;">
            Monthly sales by channel
          </text>
          <g fill="#000" transform="translate(0 19)" style="font-size: 11.5px;">
            <rect x="104" y="1" width="9" height="9" fill="#23448e"></rect>
            <text x="118" y="10">Online</text>
            <rect x="176" y="1" width="9" height="9" fill="#4b8b82"></rect>
            <text x="190" y="10">In-store</text>
          </g>
          <text x="26" y="85" text-anchor="end" fill="#000" style="font-size: 12px;">
            40
          </text>
          <text x="26" y="42" text-anchor="end" fill="#000" style="font-size: 12px;">
            80
          </text>
          <g>
            <rect
              x="39"
              y="98.2"
              width="27"
              height="25.799999999999997"
              fill="#23448e"
            ></rect>
            <rect
              x="39"
              y="78.85"
              width="27"
              height="19.35000000000001"
              fill="#4b8b82"
            ></rect>
            <text
              x="52.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jan
            </text>
          </g>
          <g>
            <rect
              x="79.33333333333334"
              y="91.75"
              width="27"
              height="32.25"
              fill="#23448e"
            ></rect>
            <rect
              x="79.33333333333334"
              y="61.65"
              width="27"
              height="30.1"
              fill="#4b8b82"
            ></rect>
            <text
              x="92.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Feb
            </text>
          </g>
          <g>
            <rect
              x="119.66666666666667"
              y="104.65"
              width="27"
              height="19.349999999999994"
              fill="#23448e"
            ></rect>
            <rect
              x="119.66666666666667"
              y="86.375"
              width="27"
              height="18.275000000000006"
              fill="#4b8b82"
            ></rect>
            <text
              x="133.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Mar
            </text>
          </g>
          <g>
            <rect
              x="160"
              y="83.15"
              width="27"
              height="40.849999999999994"
              fill="#23448e"
            ></rect>
            <rect
              x="160"
              y="51.974999999999994"
              width="27"
              height="31.17500000000001"
              fill="#4b8b82"
            ></rect>
            <text
              x="173.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Apr
            </text>
          </g>
          <g>
            <rect
              x="200.33333333333334"
              y="87.45"
              width="27"
              height="36.55"
              fill="#23448e"
            ></rect>
            <rect
              x="200.33333333333334"
              y="58.425"
              width="27"
              height="29.025000000000006"
              fill="#4b8b82"
            ></rect>
            <text
              x="213.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              May
            </text>
          </g>
          <g>
            <rect
              x="240.66666666666669"
              y="77.775"
              width="27"
              height="46.224999999999994"
              fill="#23448e"
            ></rect>
            <rect
              x="240.66666666666669"
              y="44.45"
              width="27"
              height="33.325"
              fill="#4b8b82"
            ></rect>
            <text
              x="254.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jun
            </text>
          </g>
          <path
            data-auto-chart-axis=""
            d="M32 38V124H281"
            fill="none"
            stroke="#000"
            stroke-width="1"
          ></path>
          <text x="26" y="128" text-anchor="end" fill="#000" style="font-size: 12px;">
            0
          </text></svg
        ><svg
          viewBox="0 0 22 22"
          aria-label="Selected"
          v-show="elapsed >= selection(3)"
          style="
            position: absolute;
            right: 10px;
            top: 8px;
            width: 22px;
            height: 22px;
          "
        >
          <rect width="22" height="22" fill="#23448e"></rect>
          <path
            d="M5 11 L9 15 L17 7"
            fill="none"
            stroke="#fff"
            stroke-width="2"
          ></path>
        </svg>
      </div>
      <div
        data-auto-candidate="3-2"
        :data-selected="selected(3, 2)"
        :style="candidateStyle(3, 2)"
        style="
          position: absolute;
          left: 1450px;
          top: 754px;
          width: 316px;
          height: 204px;
          box-sizing: border-box;
          background: #fff;
        "
      >
        <p
          style="
            position: absolute;
            left: 13px;
            top: 10px;
            margin: 0;
            font-size: 23px;
            line-height: 1.2;
            color: #000;
          "
        >
          Group bars side by side
        </p>
        <svg
          data-auto-preview="3-group-bars"
          data-auto-action="group-bars"
          viewBox="0 0 292 152"
          role="img"
          aria-label="Preview after group bars"
          style="
            position: absolute;
            left: 12px;
            top: 42px;
            width: 292px;
            height: 152px;
            overflow: visible;
            font-family: Arial;
          "
        >
          <g fill="#000" transform="translate(0 0)" style="font-size: 11.5px;">
            <rect x="104" y="1" width="9" height="9" fill="#23448e"></rect>
            <text x="118" y="10">Online</text>
            <rect x="176" y="1" width="9" height="9" fill="#4b8b82"></rect>
            <text x="190" y="10">In-store</text>
          </g>
          <text x="26" y="80" text-anchor="end" fill="#000" style="font-size: 12px;">
            40
          </text>
          <text x="26" y="32" text-anchor="end" fill="#000" style="font-size: 12px;">
            80
          </text>
          <g>
            <rect
              x="39"
              y="95.2"
              width="12"
              height="28.799999999999997"
              fill="#23448e"
            ></rect>
            <rect
              x="54"
              y="102.4"
              width="12"
              height="21.599999999999994"
              fill="#4b8b82"
            ></rect>
            <text
              x="52.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jan
            </text>
          </g>
          <g>
            <rect
              x="79.33333333333334"
              y="88"
              width="12"
              height="36"
              fill="#23448e"
            ></rect>
            <rect
              x="94.33333333333334"
              y="90.4"
              width="12"
              height="33.599999999999994"
              fill="#4b8b82"
            ></rect>
            <text
              x="92.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Feb
            </text>
          </g>
          <g>
            <rect
              x="119.66666666666667"
              y="102.4"
              width="12"
              height="21.599999999999994"
              fill="#23448e"
            ></rect>
            <rect
              x="134.66666666666669"
              y="103.6"
              width="12"
              height="20.400000000000006"
              fill="#4b8b82"
            ></rect>
            <text
              x="133.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Mar
            </text>
          </g>
          <g>
            <rect
              x="160"
              y="78.4"
              width="12"
              height="45.599999999999994"
              fill="#23448e"
            ></rect>
            <rect
              x="175"
              y="89.2"
              width="12"
              height="34.8"
              fill="#4b8b82"
            ></rect>
            <text
              x="173.5"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Apr
            </text>
          </g>
          <g>
            <rect
              x="200.33333333333334"
              y="83.2"
              width="12"
              height="40.8"
              fill="#23448e"
            ></rect>
            <rect
              x="215.33333333333334"
              y="91.6"
              width="12"
              height="32.400000000000006"
              fill="#4b8b82"
            ></rect>
            <text
              x="213.83333333333334"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              May
            </text>
          </g>
          <g>
            <rect
              x="240.66666666666669"
              y="72.4"
              width="12"
              height="51.599999999999994"
              fill="#23448e"
            ></rect>
            <rect
              x="255.66666666666669"
              y="86.8"
              width="12"
              height="37.2"
              fill="#4b8b82"
            ></rect>
            <text
              x="254.16666666666669"
              y="143"
              text-anchor="middle"
              fill="#000"

             style="font-size: 12.5px;">
              Jun
            </text>
          </g>
          <path
            data-auto-chart-axis=""
            d="M32 28V124H281"
            fill="none"
            stroke="#000"
            stroke-width="1"
          ></path>
          <text x="26" y="128" text-anchor="end" fill="#000" style="font-size: 12px;">
            0
          </text>
        </svg>
      </div>
    </div>
    <div
      data-paper-references=""
      style="
        position: absolute;
        left: 96px;
        bottom: 48px;
        width: max-content;
        max-width: 1728px;
      "
    >
      <p
        data-paper-reference=""
        style="
          margin: 0;
          font-family: Arial;
          font-size: 20.5px;
          line-height: 1.3;
          font-weight: 400;
          text-align: left;
          color: #333;
        "
      >
        <span data-reference-authors=""
          ><strong style="font-weight: 700">Hyeon Jeon</strong>, Sungbok Shin,
          and Niklas Elmqvist.</span
        ><br /><span data-reference-work="" style="white-space: nowrap"
          ><a
            data-osd-interactive=""
            href="https://www.hyeonjeon.com/assets/pdf/jeon26vis2.pdf"
            target="_blank"
            rel="noreferrer"
            style="color: inherit; text-decoration: none"
            >“Visualization Autocomplete: Visualization Authoring via Stepwise
            Design Recommendations”</a
          >. <em data-reference-venue="">IEEE VIS 2026 &amp; TVCG.</em></span
        >
      </p>
    </div>
    <span
      data-slide-page-counter=""
      style="
        position: absolute;
        right: 40px;
        bottom: 24px;
        font-family: Arial;
        font-size: 24px;
        line-height: 1;
        font-weight: 400;
        color: #555;
        pointer-events: none;
        z-index: 20;
      "
      >{{ $page }} / <SlidesTotal /></span
    ><svg
      v-if="active &amp;&amp; elapsed &lt; end - 400"
      data-auto-cursor=""
      viewBox="0 0 44 52"
      :style="cursor"
      style="
        position: absolute;
        width: 44px;
        height: 52px;
        overflow: visible;
        pointer-events: none;
      "
    >
      <circle
        v-if="pressing"
        cx="0"
        cy="0"
        r="20"
        fill="#23448e"
        fill-opacity=".14"
        stroke="#23448e"
        stroke-width="1.5"
      />
      <path
        d="M0 0 L0 34 L9 25 L17 43 L24 40 L16 22 L29 22 Z"
        fill="#111"
        stroke="#fff"
        stroke-width="2"
      />
    </svg>
  </section>
</template>
