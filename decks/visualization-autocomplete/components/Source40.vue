<script setup>
import { useSlideContext } from "@slidev/client";
const { $clicks, $page } = useSlideContext();
const assetBase = import.meta.env.BASE_URL;
</script>

<template>
  <section
    data-office-workers-authoring=""
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
      What office workers are doing
    </h1>
    <img
      data-office-workers-chart=""
      :src="assetBase + 'source-assets/office-workers-chart.png'"
      alt="Major Vis Researcher Positioning Map, reproduced from the original KVIS 2025 slide"
      style="
        position: absolute;
        left: 230px;
        top: 254px;
        width: 1460px;
        height: 680px;
        object-fit: contain;
      "
    />
    <div v-click="1" :data-osd-step="$clicks >= 1 ? 'revealed' : 'pending'">
      <img
        data-office-workers-editing=""
        :src="assetBase + 'source-assets/office-workers-editing.png'"
        alt="The same chart with individual PowerPoint selection handles, showing manual chart editing"
        style="
          position: absolute;
          left: 230px;
          top: 254px;
          width: 1460px;
          height: 680px;
          object-fit: contain;
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
          >Yumin Song, Seokhyeon Park, Soohyun Lee, Aeri Cho,
          <strong style="font-weight: 700">Hyeon Jeon</strong>, John Joon Young
          Chung, and Jinwook Seo.</span
        ><br /><span data-reference-work="" style="white-space: nowrap"
          ><a
            data-osd-interactive=""
            href="https://arxiv.org/abs/2607.25386"
            target="_blank"
            rel="noreferrer"
            style="color: inherit; text-decoration: none"
            >“TailVis: Expressive Chart Refinement Preserving Data-Binding
            Integrity”</a
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
