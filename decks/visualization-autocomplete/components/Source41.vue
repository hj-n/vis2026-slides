<script setup>
import { useSlideContext } from "@slidev/client";
const { $clicks, $page } = useSlideContext();
const assetBase = import.meta.env.BASE_URL;
</script>

<template>
  <section
    data-office-workers-lessons=""
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
      Problem
    </h1>
    <div
      data-office-workers-lesson-text=""
      style="position: absolute; left: 96px; top: 350px; width: 830px"
    >
      <h2
        style="margin: 0; font-size: 48px; line-height: 1.25; font-weight: 400"
      >
        Office workers, i.e.,<br />novice chart designers,
      </h2>
      <ul
        style="
          margin: 56px 0 0;
          padding-left: 30px;
          font-size: 40px;
          line-height: 1.45;
        "
      >
        <li style="padding-left: 10px; translate: -37px 0px">
          - want to retain their
          <strong style="font-weight: 700">agency</strong>
        </li>
        <li style="margin-top: 36px; padding-left: 10px; translate: -37px 0px">
          - but flexible tools (like charting libraries)<br />are not
          <strong style="font-weight: 700">approachable</strong>
        </li>
      </ul>
    </div>
    <img
      data-office-workers-lesson-chart=""
      :src="assetBase + 'source-assets/office-workers-editing.png'"
      alt="Manual editing of the researcher positioning chart, from the original KVIS 2025 Lessons slide"
      style="
        position: absolute;
        left: 1024px;
        top: 356px;
        width: 911.05px;
        height: 453.25px;
        object-fit: contain;
        min-width: 0px;
        min-height: 0px;
        max-width: none;
        max-height: none;
        flex-shrink: 0;
        flex-grow: 0;
        flex-basis: auto;
        translate: -114.66px -39.62px;
      "
    />
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
