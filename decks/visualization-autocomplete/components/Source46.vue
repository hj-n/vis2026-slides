<script setup>
import { useSlideContext } from "@slidev/client";
const { $clicks, $page } = useSlideContext();
const assetBase = import.meta.env.BASE_URL;
</script>

<template>
  <section
    data-autocompletion-model=""
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
      New model: Visualization Autocompletion
    </h1>
    <p
      style="
        position: absolute;
        left: 96px;
        top: 290px;
        margin: 0;
        font-size: 36px;
        line-height: 1.2;
      "
    >
      Input: <strong>Current visualization design</strong>
    </p>
    <p
      style="
        position: absolute;
        left: 1214px;
        top: 290px;
        margin: 0;
        font-size: 36px;
        line-height: 1.2;
      "
    >
      Output: <strong>Next plausible design</strong>
    </p>
    <svg
      data-autocompletion-chart="current"
      viewBox="0 0 650 420"
      role="img"
      aria-label="Current design: monthly sales as a single-color bar chart."
      style="
        position: absolute;
        left: 96px;
        top: 350px;
        width: 610px;
        height: 394.15px;
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
      </text></svg
    ><svg
      data-autocompletion-chart="recommended"
      viewBox="0 0 650 420"
      role="img"
      aria-label="Recommended design: monthly sales split into Online and In-store categories using color. The monthly totals remain unchanged."
      style="
        position: absolute;
        left: 1214px;
        top: 350px;
        width: 610px;
        height: 394.15px;
        overflow: visible;
        font-family: Arial;
      "
    >
      <g fill="#000" style="font-size: 24px;">
        <rect x="100" y="0" width="18" height="18" fill="#23448e"></rect>
        <text x="130" y="18">Online</text>
        <rect x="264" y="0" width="18" height="18" fill="#4b8b82"></rect>
        <text x="294" y="18">In-store</text>
      </g>
      <g stroke="#e4e4e4" stroke-width="1">
        <line x1="72" y1="50" x2="606" y2="50"></line>
        <line x1="72" y1="150" x2="606" y2="150"></line>
        <line x1="72" y1="250" x2="606" y2="250"></line>
      </g>
      <g fill="#23448e">
        <rect x="100" y="254" width="48" height="96"></rect>
        <rect x="180" y="230" width="48" height="120"></rect>
        <rect x="260" y="278" width="48" height="72"></rect>
        <rect x="340" y="198" width="48" height="152"></rect>
        <rect x="420" y="214" width="48" height="136"></rect>
        <rect x="500" y="178" width="48" height="172"></rect>
      </g>
      <g fill="#4b8b82">
        <rect x="100" y="182" width="48" height="72"></rect>
        <rect x="180" y="118" width="48" height="112"></rect>
        <rect x="260" y="210" width="48" height="68"></rect>
        <rect x="340" y="82" width="48" height="116"></rect>
        <rect x="420" y="106" width="48" height="108"></rect>
        <rect x="500" y="54" width="48" height="124"></rect>
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
    <div
      data-autocompletion-inference=""
      style="
        position: absolute;
        left: 782px;
        top: 422px;
        width: 348px;
        padding: 22px 24px;
        box-sizing: border-box;
        background: #edf1f8;
      "
    >
      <p
        style="
          margin: 0 0 12px;
          font-size: 26px;
          line-height: 1.2;
          color: #23448e;
        "
      >
        The system infers
      </p>
      <p style="margin: 0; font-size: 30px; line-height: 1.35">
        &quot;Users may want to compare sales across categories.&quot;
      </p>
      <p
        style="
          margin: 18px 0 0;
          font-size: 26px;
          line-height: 1.3;
          color: #23448e;
        "
      >
        Next action: Add color
      </p>
    </div>
    <svg
      aria-label="Infer a plausible next action from the current design, then recommend the resulting design"
      viewBox="0 0 1920 1080"
      style="
        position: absolute;
        inset: 0;
        width: 1920px;
        height: 1080px;
        pointer-events: none;
      "
    >
      <defs>
        <marker
          id="_source-46-R_0_"
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
        x1="710"
        y1="530"
        x2="766"
        y2="530"
        stroke="#23448e"
        stroke-width="3"
        marker-end="url(#_source-46-R_0_)"
      ></line>
      <line
        x1="1146"
        y1="530"
        x2="1200"
        y2="530"
        stroke="#23448e"
        stroke-width="3"
        marker-end="url(#_source-46-R_0_)"
      ></line>
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
        translate: 0px -27.97px;
      "
    >
      <span style="white-space: nowrap"
        >The system can <strong>infer user intent</strong></span
      ><br /><span style="white-space: nowrap"
        >and recommend a <strong>plausible next authoring action.</strong></span
      >
    </p>
    <div v-click="1" :data-osd-step="$clicks >= 1 ? 'revealed' : 'pending'">
      <p
        data-autocompletion-selection=""
        style="
          position: absolute;
          left: 96px;
          top: 946px;
          margin: 0;
          font-size: 46px;
          line-height: 1.25;
          white-space: nowrap;
          translate: 0px -40.39px;
        "
      >
        Users only need to
        <span style="font-weight: 700">select recommendations </span>that match
        their intent.
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
