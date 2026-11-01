<script setup>
import { useSlideContext } from "@slidev/client";
const { $clicks, $page } = useSlideContext();
const assetBase = import.meta.env.BASE_URL;
</script>

<template>
  <section
    data-autocomplete-user-study=""
    style="
      width: 100%;
      height: 100%;
      position: relative;
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
      User Study
    </h1>
    <p
      style="
        position: absolute;
        left: 96px;
        top: 302px;
        margin: 0;
        font-size: 52px;
        line-height: 1.3;
      "
    >
      Compare the <strong>quality of charts</strong> made by
      <strong>novices</strong><br />using four different authoring tools
    </p>
    <ul
      style="
        position: absolute;
        left: 96px;
        top: 526px;
        width: 1650px;
        margin: 0;
        padding-left: 48px;
        list-style-type: disc;
        font-size: 44px;
        line-height: 1.45;
        display: flex;
        flex-direction: column;
        gap: 32px;
      "
    >
      <li>
        <strong style="color: #23448e"
          >Visualization Autocomplete (VisAuto)</strong
        >
      </li>
      <li>
        <strong style="color: #23448e">LLM</strong>
        <span style="color: #555">&nbsp;(ChatGPT with GPT 5.3)</span>
      </li>
      <li><strong style="color: #23448e">Microsoft Excel</strong></li>
      <li>
        <strong style="color: #23448e">TaskVis</strong>
        <span style="color: #555">&nbsp;(automated tool)</span>
      </li>
    </ul>
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
