<script setup>
import { useSlideContext } from "@slidev/client";
const { $clicks, $page } = useSlideContext();
const assetBase = import.meta.env.BASE_URL;
</script>

<template>
  <section
    data-autocomplete-quality-results=""
    data-osd-interactive=""
    style="
      position: relative;
      width: 100%;
      height: 100%;
      background: var(--osd-bg);
      color: #000;
      font-family: var(--osd-font-body);
    "
  >
    <h1
      style="
        position: absolute;
        left: 96px;
        top: 104px;
        margin: 0;
        font-size: 80px;
        line-height: 1.2;
        font-weight: 400;
      "
    >
      Results
    </h1>
    <img
      data-quality-stage="simple"
      :src="assetBase + 'source-assets/autocomplete-quality-simple.svg'"
      alt="Quality of simple charts, reproduced from quality.pptx"
      style="
        position: absolute;
        left: 485px;
        top: 230px;
        width: 950px;
        height: 719.92px;
        pointer-events: none;
      "
    />
    <div v-click="1" :data-osd-step="$clicks >= 1 ? 'revealed' : 'pending'">
      <img
        data-quality-stage="complex"
        :src="assetBase + 'source-assets/autocomplete-quality-all.svg'"
        alt="Quality of simple and complex charts, reproduced from quality.pptx"
        style="
          position: absolute;
          left: 485px;
          top: 230px;
          width: 950px;
          height: 719.92px;
          pointer-events: none;
        "
      />
    </div>
    <div v-click="2" :data-osd-step="$clicks >= 2 ? 'revealed' : 'pending'">
      <img
        data-quality-stage="emphasis"
        :src="assetBase + 'source-assets/autocomplete-quality-emphasis.svg'"
        alt="Complex charts: the original VisAuto–LLM comparison line is highlighted in red with a thicker stroke"
        style="
          position: absolute;
          left: 485px;
          top: 230px;
          width: 950px;
          height: 719.92px;
          pointer-events: none;
        "
      />
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
    >
  </section>
</template>
