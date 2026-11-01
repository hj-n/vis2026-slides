<script setup>
import { useSlideContext } from "@slidev/client";
const { $clicks, $page } = useSlideContext();
const assetBase = import.meta.env.BASE_URL;
</script>

<template>
  <section
    data-distilled-code-generation=""
    data-osd-interactive=""
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
      Real-time code generation through knowledge <strong>distillation</strong>
    </h1>
    <svg
      viewBox="0 0 1920 1080"
      style="
        position: absolute;
        inset: 0;
        width: 1920px;
        height: 1080px;
        translate: 0px -24px;
      "
      role="img"
      aria-label="Offline LLM exploration across datasets and charts is distilled into one JavaScript code-generation function."
    >
      <defs>
        <marker
          id="_source-50-R_0_"
          viewBox="0 0 12 12"
          refX="10"
          refY="6"
          markerWidth="16"
          markerHeight="16"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M1 1 L10 6 L1 11"
            fill="none"
            stroke="#111"
            stroke-width="1.7"
          ></path>
        </marker>
      </defs>
      <text x="96" y="248" font-weight="700" fill="#23448e" style="font-size: 30px;">
        Offline
      </text>
      <text x="96" y="307" style="font-size: 30px;">
        LLM explores and generates diverse chart designs
      </text>
      <g transform="translate(96 338)">
        <rect
          width="252"
          height="100"
          fill="#fff"
          stroke="#d8dce2"
          stroke-width="1.5"
        ></rect>
        <rect width="252" height="34" fill="#f0f2f5"></rect>
        <text x="14" y="24" style="font-size: 22px;">Sales</text>
        <path
          d="M84 34 V100 M168 34 V100 M0 67 H252"
          stroke="#e0e3e8"
          fill="none"
        ></path>
        <text x="8" y="57" fill="#666" style="font-size: 16px;">Month</text>
        <text x="92" y="57" fill="#666" style="font-size: 16px;">Region</text>
        <text x="176" y="57" fill="#666" style="font-size: 16px;">Revenue</text>
        <text x="8" y="88" fill="#666" style="font-size: 16px;">Jan</text>
        <text x="92" y="88" fill="#666" style="font-size: 16px;">North</text>
        <text x="176" y="88" fill="#666" style="font-size: 16px;">42,000</text>
      </g>
      <g transform="translate(96 452)">
        <rect
          width="252"
          height="100"
          fill="#fff"
          stroke="#d8dce2"
          stroke-width="1.5"
        ></rect>
        <rect width="252" height="34" fill="#f0f2f5"></rect>
        <text x="14" y="24" style="font-size: 22px;">Weather</text>
        <path
          d="M84 34 V100 M168 34 V100 M0 67 H252"
          stroke="#e0e3e8"
          fill="none"
        ></path>
        <text x="8" y="57" fill="#666" style="font-size: 16px;">Date</text>
        <text x="92" y="57" fill="#666" style="font-size: 16px;">Temp.</text>
        <text x="176" y="57" fill="#666" style="font-size: 16px;">Rainfall</text>
        <text x="8" y="88" fill="#666" style="font-size: 16px;">Jun 01</text>
        <text x="92" y="88" fill="#666" style="font-size: 16px;">18.4</text>
        <text x="176" y="88" fill="#666" style="font-size: 16px;">2.1</text>
      </g>
      <g transform="translate(96 566)">
        <rect
          width="252"
          height="100"
          fill="#fff"
          stroke="#d8dce2"
          stroke-width="1.5"
        ></rect>
        <rect width="252" height="34" fill="#f0f2f5"></rect>
        <text x="14" y="24" style="font-size: 22px;">Housing</text>
        <path
          d="M84 34 V100 M168 34 V100 M0 67 H252"
          stroke="#e0e3e8"
          fill="none"
        ></path>
        <text x="8" y="57" fill="#666" style="font-size: 16px;">Income</text>
        <text x="92" y="57" fill="#666" style="font-size: 16px;">Rooms</text>
        <text x="176" y="57" fill="#666" style="font-size: 16px;">Value</text>
        <text x="8" y="88" fill="#666" style="font-size: 16px;">4.8</text>
        <text x="92" y="88" fill="#666" style="font-size: 16px;">5.2</text>
        <text x="176" y="88" fill="#666" style="font-size: 16px;">281,000</text>
      </g>
      <path
        d="M369 487 H428"
        fill="none"
        stroke="#111"
        stroke-width="2"
        marker-end="url(#_source-50-R_0_)"
      ></path>
      <g transform="translate(457 338)">
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
      <g transform="translate(695 338)">
        <rect width="220" height="146" fill="#f6f7f9"></rect>
        <path
          d="M20 14 V96 H201"
          fill="none"
          stroke="#111"
          stroke-width="1.5"
        ></path>
        <path
          d="M28 78 L59 50 L91 60 L123 31 L156 42 L191 20"
          fill="none"
          stroke="#4b8b82"
          stroke-width="4"
        ></path>
        <text x="16" y="130" fill="#23448e" style="font-size: 24px;">{ }</text>
        <path
          d="M61 118 H185 M61 129 H147"
          stroke="#a5afc2"
          stroke-width="3"
        ></path>
      </g>
      <g transform="translate(457 502)">
        <rect width="220" height="146" fill="#f6f7f9"></rect>
        <path
          d="M20 14 V96 H201"
          fill="none"
          stroke="#111"
          stroke-width="1.5"
        ></path>
        <g fill="#7056a4" fill-opacity="0.8">
          <circle cx="33" cy="77" r="5"></circle>
          <circle cx="44" cy="59" r="5"></circle>
          <circle cx="65" cy="74" r="5"></circle>
          <circle cx="78" cy="53" r="5"></circle>
          <circle cx="93" cy="60" r="5"></circle>
          <circle cx="107" cy="36" r="5"></circle>
          <circle cx="122" cy="49" r="5"></circle>
          <circle cx="136" cy="27" r="5"></circle>
          <circle cx="151" cy="46" r="5"></circle>
          <circle cx="168" cy="20" r="5"></circle>
          <circle cx="182" cy="34" r="5"></circle>
        </g>
        <text x="16" y="130" fill="#23448e" style="font-size: 24px;">{ }</text>
        <path
          d="M61 118 H185 M61 129 H147"
          stroke="#a5afc2"
          stroke-width="3"
        ></path>
      </g>
      <g transform="translate(695 502)">
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
      <path
        d="M950 364 L1303 455 V523 L950 614 Z"
        fill="#23448e"
        fill-opacity="0.09"
      ></path>
      <path
        d="M950 364 L1303 455 M950 614 L1303 523"
        fill="none"
        stroke="#23448e"
        stroke-width="2.5"
      ></path>
      <text
        x="1126"
        y="307"

        text-anchor="middle"
        fill="#23448e"
        font-weight="700"
       style="font-size: 52px;">
        Distill
      </text>
      <path
        d="M1317 489 H1412"
        fill="none"
        stroke="#111"
        stroke-width="2"
        marker-end="url(#_source-50-R_0_)"
      ></path>
      <g transform="translate(1440 413)">
        <rect width="380" height="152" fill="#23448e"></rect>
        <text x="24" y="43" fill="#fff" font-weight="700" style="font-size: 29px;">
          JavaScript function
        </text>
        <text x="24" y="99" fill="#fff" style="font-size: 28px;">
          generateCode(…) { }
        </text>
        <path
          d="M26 123 H169 M186 123 H313"
          stroke="#96addc"
          stroke-width="3"
        ></path>
      </g>
    </svg>
    <div v-click="1" :data-osd-step="$clicks >= 1 ? 'revealed' : 'pending'">
      <svg
        data-distillation-online=""
        viewBox="0 0 1920 1080"
        style="
          position: absolute;
          inset: 0;
          width: 1920px;
          height: 1080px;
          translate: 0px -24px;
        "
        role="img"
        aria-label="Online: reuse the distilled function to generate visualization code without an LLM call."
      >
        <path
          d="M1630 585 V714 H1040 V810"
          fill="none"
          stroke="#111"
          stroke-width="2"
          stroke-dasharray="9 7"
          marker-end="url(#_source-50-R_0_)"
        ></path>
        <text x="1260" y="698" fill="#555" style="font-size: 25px;">
          Reuse the function
        </text>
        <path d="M96 751 H1824" stroke="#d8dde5" stroke-width="1.5"></path>
        <text x="96" y="804" font-weight="700" fill="#23448e" style="font-size: 30px;">
          Online · during use
        </text>
        <text x="128" y="883" style="font-size: 32px;">
          Current design + selected action
        </text>
        <path
          d="M647 902 H818"
          fill="none"
          stroke="#111"
          stroke-width="2"
          marker-end="url(#_source-50-R_0_)"
        ></path>
        <g transform="translate(850 827)">
          <rect width="380" height="152" fill="#23448e"></rect>
          <text x="24" y="43" fill="#fff" font-weight="700" style="font-size: 27px;">
            Same function
          </text>
          <text x="24" y="99" fill="#fff" style="font-size: 28px;">
            generateCode(…) { }
          </text>
          <path
            d="M26 123 H169 M186 123 H313"
            stroke="#96addc"
            stroke-width="3"
          ></path>
        </g>
        <path
          d="M1258 902 H1380"
          fill="none"
          stroke="#111"
          stroke-width="2"
          marker-end="url(#_source-50-R_0_)"
        ></path>
        <text x="1410" y="851" style="font-size: 32px;">Visualization code</text>
        <text x="1410" y="900" fill="#23448e" style="font-size: 40px;">{ }</text>
        <path
          d="M1481 874 H1780 M1481 889 H1723 M1481 904 H1754"
          stroke="#9ba9c2"
          stroke-width="4"
        ></path>
        <text x="1380" y="970" font-weight="700" fill="#23448e" style="font-size: 40px;">
          No LLM call at runtime
        </text>
      </svg>
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
