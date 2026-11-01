<script setup>
import { useSlideContext } from "@slidev/client";
const { $clicks, $page } = useSlideContext();
const assetBase = import.meta.env.BASE_URL;
</script>

<template>
  <section
    data-intent-translation=""
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
      Current paradigm of visualization authoring
    </h1>
    <p
      style="
        position: absolute;
        left: 96px;
        top: 190px;
        margin: 0;
        font-size: 36px;
        line-height: 1.2;
      "
    >
      (e.g., LLMs like ChatGPT)
    </p>
    <p
      style="
        position: absolute;
        left: 96px;
        top: 310px;
        margin: 0;
        font-size: 38px;
        line-height: 1.2;
      "
    >
      Input: <strong>User intent</strong>
    </p>
    <div
      data-intent-example=""
      style="
        position: absolute;
        left: 96px;
        top: 390px;
        width: 660px;
        padding: 28px 32px;
        box-sizing: border-box;
        background: #f2f4f7;
      "
    >
      <p style="margin: 0; font-size: 38px; line-height: 1.4">
        “I want to make a bar chart explaining how our monthly sales changed
        from January to June.”
      </p>
    </div>
    <svg
      aria-label="Translate user intent into a visualization"
      viewBox="0 0 240 80"
      style="
        position: absolute;
        left: 816px;
        top: 476px;
        width: 240px;
        height: 80px;
      "
    >
      <defs>
        <marker
          id="_source-45-R_0_"
          viewBox="0 0 12 12"
          markerWidth="12"
          markerHeight="12"
          refX="10"
          refY="6"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M1 1 L10 6 L1 11"
            fill="none"
            stroke="#23448e"
            stroke-width="2"
          ></path>
        </marker>
      </defs>
      <line
        x1="10"
        y1="40"
        x2="228"
        y2="40"
        stroke="#23448e"
        stroke-width="3"
        marker-end="url(#_source-45-R_0_)"
      ></line>
    </svg>
    <p
      style="
        position: absolute;
        left: 1130px;
        top: 310px;
        margin: 0;
        font-size: 38px;
        line-height: 1.2;
      "
    >
      Output: <strong>Visualization</strong>
    </p>
    <svg
      data-intent-output-chart=""
      viewBox="0 0 650 420"
      role="img"
      aria-label="Monthly sales bar chart: January42, February58, March35, April67, May61, June74 thousand dollars. Illustrative example."
      style="
        position: absolute;
        left: 1130px;
        top: 350px;
        width: 650px;
        height: 420px;
        overflow: visible;
        font-family: Arial;
      "
    >
      <g stroke="#e4e4e4" stroke-width="1">
        <line x1="72" y1="50" x2="606" y2="50"></line>
        <line x1="72" y1="150" x2="606" y2="150"></line>
        <line x1="72" y1="250" x2="606" y2="250"></line>
      </g>
      <g fill="#23448e">
        <rect x="100" y="182" width="48" height="168"></rect>
        <rect x="180" y="118" width="48" height="232"></rect>
        <rect x="260" y="210" width="48" height="140"></rect>
        <rect x="340" y="82" width="48" height="268"></rect>
        <rect x="420" y="106" width="48" height="244"></rect>
        <rect x="500" y="54" width="48" height="296"></rect>
      </g>
      <g stroke="#000" stroke-width="1.5">
        <line x1="72" y1="30" x2="72" y2="350"></line>
        <line x1="72" y1="350" x2="606" y2="350"></line>
      </g>
      <g fill="#000" text-anchor="end" style="font-size: 24px;">
        <text x="58" y="358">0</text>
        <text x="58" y="258">25</text>
        <text x="58" y="158">50</text>
        <text x="58" y="58">75</text>
      </g>
      <g fill="#000" text-anchor="middle" style="font-size: 24px;">
        <text x="124" y="386">Jan</text>
        <text x="204" y="386">Feb</text>
        <text x="284" y="386">Mar</text>
        <text x="364" y="386">Apr</text>
        <text x="444" y="386">May</text>
        <text x="524" y="386">Jun</text>
      </g>
      <text
        x="18"
        y="190"
        transform="rotate(-90 18 190)"
        text-anchor="middle"
        fill="#000"

       style="font-size: 24px;">
        Sales ($k)
      </text>
    </svg>
    <p
      style="
        position: absolute;
        left: 96px;
        top: 790px;
        width: 1728px;
        margin: 0;
        font-size: 44px;
        line-height: 1.3;
        white-space: nowrap;
      "
    >
      These interfaces have the intelligence to <strong>translate</strong> user
      intent into visualizations.
    </p>
    <div v-click="1" :data-osd-step="$clicks >= 1 ? 'revealed' : 'pending'">
      <p
        data-intent-description-barrier=""
        style="
          position: absolute;
          left: 96px;
          top: 906px;
          margin: 0;
          font-size: 48px;
          line-height: 1.25;
          white-space: nowrap;
          translate: 0px -5.54px;
        "
      >
        However, users <strong>often struggle to describe their intent.</strong>
      </p>
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
