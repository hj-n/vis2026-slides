<script setup>
import { useSlideContext } from "@slidev/client";
const { $clicks, $page } = useSlideContext();
const assetBase = import.meta.env.BASE_URL;
</script>

<template>
  <section
    data-authoring-goal=""
    style="
      position: relative;
      width: 100%;
      height: 100%;
      background: var(--osd-bg);
      color: #000;
      font-family: var(--osd-font-body);
    "
  >
    <svg
      data-authoring-tradeoff-axes=""
      viewBox="0 0 760 500"
      role="img"
      aria-label="Approachability increases to the right; agency increases upward"
      style="
        position: absolute;
        left: 412px;
        top: 96px;
        width: 1292px;
        height: 850px;
        overflow: visible;
      "
    >
      <defs>
        <marker
          id="_source-43-R_0_"
          viewBox="0 0 12 12"
          markerWidth="13"
          markerHeight="13"
          refX="11"
          refY="6"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M 1 1 L 11 6 L 1 11"
            fill="none"
            stroke="#000"
            stroke-width="1.8"
          ></path>
        </marker>
      </defs>
      <line
        x1="160"
        y1="445"
        x2="590"
        y2="445"
        stroke="#000"
        stroke-width="2"
        marker-end="url(#_source-43-R_0_)"
      ></line>
      <line
        x1="160"
        y1="445"
        x2="160"
        y2="15"
        stroke="#000"
        stroke-width="2"
        marker-end="url(#_source-43-R_0_)"
      ></line>
      <text
        x="375"
        y="479"
        text-anchor="middle"
        fill="#000"
        font-family="Arial"

       style="font-size: 26px;">
        Approachability
      </text>
      <text
        x="132"
        y="230"
        transform="rotate(-90 132 230)"
        text-anchor="middle"
        fill="#000"
        font-family="Arial"

       style="font-size: 26px;">
        Agency
      </text></svg
    ><svg
      data-authoring-tradeoff-point="Excel"
      viewBox="0 0 760 500"
      role="img"
      aria-label="Excel"
      style="
        position: absolute;
        left: 412px;
        top: 96px;
        width: 1292px;
        height: 850px;
        overflow: visible;
      "
    >
      <text
        x="526.5"
        y="409"
        text-anchor="end"
        fill="#000"
        font-family="Arial"

        font-weight="400"
       style="font-size: 22px;">
        <tspan x="526.5">Excel</tspan>
      </text>
      <circle cx="547" cy="402" r="10.5" fill="#000"></circle></svg
    ><svg
      data-authoring-tradeoff-point="Charting Libraries"
      viewBox="0 0 760 500"
      role="img"
      aria-label="Charting Libraries ((e.g., Vega-Lite))"
      style="
        position: absolute;
        left: 412px;
        top: 96px;
        width: 1292px;
        height: 850px;
        overflow: visible;
      "
    >
      <text
        x="224"
        y="65"
        text-anchor="start"
        fill="#000"
        font-family="Arial"

        font-weight="400"
       style="font-size: 22px;">
        <tspan x="224">Charting Libraries</tspan>
        <tspan x="224" dy="26">(e.g., Vega-Lite)</tspan>
      </text>
      <circle cx="203" cy="58" r="10.5" fill="#000"></circle></svg
    ><svg
      data-authoring-tradeoff-point="BI tools"
      viewBox="0 0 760 500"
      role="img"
      aria-label="BI tools ((e.g., Tableau))"
      style="
        position: absolute;
        left: 412px;
        top: 96px;
        width: 1292px;
        height: 850px;
        overflow: visible;
      "
    >
      <text
        x="411.8"
        y="294.3"
        text-anchor="end"
        fill="#000"
        font-family="Arial"

        font-weight="400"
       style="font-size: 22px;">
        <tspan x="411.8">BI tools</tspan>
        <tspan x="411.8" dy="26">(e.g., Tableau)</tspan>
      </text>
      <circle cx="432.3" cy="287.3" r="10.5" fill="#000"></circle></svg
    ><svg
      data-authoring-tradeoff-point="LLMs"
      viewBox="0 0 760 500"
      role="img"
      aria-label="LLMs"
      style="
        position: absolute;
        left: 412px;
        top: 96px;
        width: 1292px;
        height: 850px;
        overflow: visible;
      "
    >
      <text
        x="297.2"
        y="179.7"
        text-anchor="end"
        fill="#000"
        font-family="Arial"

        font-weight="700"
       style="font-size: 22px;">
        <tspan x="297.2">LLMs</tspan>
      </text>
      <circle cx="317.7" cy="172.7" r="10.5" fill="#000"></circle></svg
    ><svg
      data-authoring-goal-point=""
      viewBox="0 0 760 500"
      role="img"
      aria-label="Our goal: high agency and high approachability"
      style="
        position: absolute;
        left: 412px;
        top: 96px;
        width: 1292px;
        height: 850px;
        overflow: visible;
      "
    >
      <text
        x="526.5"
        y="65"
        text-anchor="end"
        fill="#23448e"
        font-family="Arial"

       style="font-size: 22px;">
        Our goal
      </text>
      <circle cx="547" cy="58" r="10.5" fill="#23448e"></circle></svg
    ><span
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
    >
  </section>
</template>
