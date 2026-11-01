<script setup>
import { useSlideContext } from "@slidev/client";
const { $clicks, $page } = useSlideContext();
const assetBase = import.meta.env.BASE_URL;
</script>

<template>
  <section
    data-fast-generation-motivation=""
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
      We want <span style="font-weight: 700">real-time </span
      ><span style="font-weight: 400">recommendations and code generation</span
      ><strong><span style="font-weight: 400"></span></strong>
    </h1>
    <div style="position: absolute; left: 96px; top: 310px; width: 528px">
      <h2 style="margin: 0; font-size: 38px; line-height: 1.25">
        Generate candidate actions
      </h2>
      <svg
        width="528"
        height="210"
        viewBox="0 0 528 210"
        role="img"
        aria-label="Candidate actions, Encode y and Encode color, with chart previews and generated code"
        style="margin-top: 40px; font-family: Arial"
      >
        <text x="0" y="24" style="font-size: 27px;">Encode y</text>
        <text x="252" y="24" style="font-size: 27px;">Encode color</text>
        <g transform="translate(0 42)">
          <rect width="220" height="146" fill="#f6f7f9"></rect>
          <path
            d="M20 14 V96 H201"
            fill="none"
            stroke="#111"
            stroke-width="1.5"
          ></path>
          <g fill="#23448e">
            <rect x="35" y="62" width="25" height="34"></rect>
            <rect x="75" y="40" width="25" height="56"></rect>
            <rect x="115" y="51" width="25" height="45"></rect>
            <rect x="155" y="24" width="25" height="72"></rect>
          </g>
          <text x="16" y="130" fill="#23448e" style="font-size: 24px;">{ }</text>
          <path
            d="M61 118 H185 M61 129 H147"
            stroke="#a5afc2"
            stroke-width="3"
          ></path>
        </g>
        <g transform="translate(252 42)">
          <rect width="220" height="146" fill="#f6f7f9"></rect>
          <path
            d="M20 14 V96 H201"
            fill="none"
            stroke="#111"
            stroke-width="1.5"
          ></path>
          <g>
            <path
              d="M36 96 V68 H65 V96 M85 96 V57 H114 V96 M134 96 V43 H163 V96"
              fill="#23448e"
            ></path>
            <path
              d="M36 68 V45 H65 V68 M85 57 V28 H114 V57 M134 43 V15 H163 V43"
              fill="#d78a3f"
            ></path>
          </g>
          <text x="16" y="130" fill="#23448e" style="font-size: 24px;">{ }</text>
          <path
            d="M61 118 H185 M61 129 H147"
            stroke="#a5afc2"
            stroke-width="3"
          ></path>
        </g>
      </svg>
    </div>
    <div style="position: absolute; left: 800px; top: 310px; width: 408px">
      <h2 style="margin: 0; font-size: 38px; line-height: 1.25">
        Choose an action
      </h2>
      <p
        style="
          margin: 82px 0 0;
          padding: 45px 0;
          border-top: 2px solid #23448e;
          border-bottom: 2px solid #23448e;
          font-size: 40px;
          line-height: 1.3;
          color: #23448e;
        "
      >
        Encode color
      </p>
    </div>
    <div style="position: absolute; left: 1400px; top: 310px; width: 424px">
      <h2 style="margin: 0; font-size: 38px; line-height: 1.25">
        Compare and refine
      </h2>
      <svg
        width="240"
        height="150"
        viewBox="0 0 240 150"
        role="img"
        aria-label="Select a chart and continue refining the design"
        style="margin-top: 82px; font-family: Arial"
      >
        <rect
          x="1"
          y="1"
          width="236"
          height="146"
          fill="#fff"
          stroke="#23448e"
          stroke-width="2"
        ></rect>
        <path d="M25 24V125H218" fill="none" stroke="#111"></path>
        <path
          d="M44 125V77H72V125 M95 125V59H123V125 M146 125V40H174V125"
          fill="#23448e"
        ></path>
        <path
          d="M44 77V53H72V77 M95 59V32H123V59 M146 40V17H174V40"
          fill="#d78a3f"
        ></path>
      </svg>
    </div>
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      aria-hidden="true"
      style="position: absolute; inset: 0; pointer-events: none"
    >
      <path
        d="M668 514H756 M741 503L756 514L741 525 M1252 514H1356 M1341 503L1356 514L1341 525"
        fill="none"
        stroke="#23448e"
        stroke-width="3"
      ></path>
      <path
        d="M1520 660V732H332V660 M321 675L332 660L343 675"
        fill="none"
        stroke="#23448e"
        stroke-width="2.5"
      ></path>
      <text
        x="926"
        y="784"
        text-anchor="middle"
        font-family="Arial"

       style="font-size: 30px;">
        Repeat with the next design action
      </text>
    </svg>
    <p
      style="
        position: absolute;
        left: 96px;
        top: 850px;
        margin: 0;
        font-size: 54px;
        line-height: 1.3;
      "
    >
      Slow generation
      <strong style="color: #b33d47">interrupts iteration</strong>. Fast
      feedback keeps it moving.
    </p>
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
    >
  </section>
</template>
