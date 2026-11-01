<script setup>
import { useSlideContext } from "@slidev/client";
const { $clicks, $page } = useSlideContext();
const assetBase = import.meta.env.BASE_URL;
</script>

<template>
  <section
    data-autocomplete-mechanism=""
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
      Simple and fast <strong>data-driven</strong> recommendations
    </h1>
    <svg
      viewBox="0 0 1920 1080"
      style="
        position: absolute;
        inset: 0;
        width: 1920px;
        height: 1080px;
        pointer-events: none;
        translate: 0px -40px;
      "
      aria-label="Corpus of existing visualization specifications"
    >
      <defs>
        <marker
          id="_source-49-R_0_"
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
      <text x="128" y="315" style="font-size: 32px;">1,981 chart specs</text>
      <rect
        x="182"
        y="365"
        width="224"
        height="248"
        fill="#fff"
        stroke="#d5d8dc"
        stroke-width="2"
      ></rect>
      <rect
        x="164"
        y="383"
        width="224"
        height="248"
        fill="#fff"
        stroke="#b8bec6"
        stroke-width="2"
      ></rect>
      <rect
        x="146"
        y="401"
        width="224"
        height="248"
        fill="#fff"
        stroke="#666"
        stroke-width="2"
      ></rect>
      <path
        d="M178 443 V601 H335"
        fill="none"
        stroke="#000"
        stroke-width="2"
      ></path>
      <rect
        x="201"
        y="543"
        width="28"
        height="58"
        fill="#23448e"
        fill-opacity="0.45"
      ></rect>
      <rect
        x="248"
        y="505"
        width="28"
        height="96"
        fill="#23448e"
        fill-opacity="0.65"
      ></rect>
      <rect x="295" y="470" width="28" height="131" fill="#23448e"></rect>
    </svg>
    <div v-click="1" :data-osd-step="$clicks >= 1 ? 'revealed' : 'pending'">
      <svg
        data-mechanism-stage="decompose"
        viewBox="0 0 1920 1080"
        style="
          position: absolute;
          inset: 0;
          width: 1920px;
          height: 1080px;
          pointer-events: none;
          translate: 0px -40px;
        "
      >
        <path
          d="M432 435 H527"
          fill="none"
          stroke="#111"
          stroke-width="2"
          marker-end="url(#_source-49-R_0_)"
        ></path>
        <text x="480" y="410" text-anchor="middle" fill="#666" style="font-size: 24px;">
          decompose
        </text>
        <text x="555" y="315" style="font-size: 32px;">Authoring actions</text>
        <g>
          <rect x="555" y="411" width="230" height="48" fill="#f2f4f7"></rect>
          <text
            x="670"
            y="436"
            dominant-baseline="middle"
            text-anchor="middle"

            fill="#000"
           style="font-size: 28px;">
            bar mark
          </text>
        </g>
        <g>
          <rect x="555" y="471" width="230" height="48" fill="#f2f4f7"></rect>
          <text
            x="670"
            y="496"
            dominant-baseline="middle"
            text-anchor="middle"

            fill="#000"
           style="font-size: 28px;">
            encode x
          </text>
        </g>
        <g>
          <rect x="555" y="531" width="230" height="48" fill="#f2f4f7"></rect>
          <text
            x="670"
            y="556"
            dominant-baseline="middle"
            text-anchor="middle"

            fill="#000"
           style="font-size: 28px;">
            encode y
          </text>
        </g>
      </svg>
    </div>
    <div v-click="2" :data-osd-step="$clicks >= 2 ? 'revealed' : 'pending'">
      <svg
        data-mechanism-stage="matrix"
        viewBox="0 0 1920 1080"
        style="
          position: absolute;
          inset: 0;
          width: 1920px;
          height: 1080px;
          pointer-events: none;
          translate: 0px -40px;
        "
      >
        <path
          d="M810 435 H907"
          fill="none"
          stroke="#111"
          stroke-width="2"
          marker-end="url(#_source-49-R_0_)"
        ></path>
        <text x="965" y="315" style="font-size: 32px;">Pairwise co-occurrence</text>
        <text x="1025" y="376" text-anchor="middle" style="font-size: 20px;">data</text>
        <text x="1075" y="376" text-anchor="middle" style="font-size: 20px;">mark</text>
        <text x="1125" y="376" text-anchor="middle" style="font-size: 20px;">x</text>
        <text x="1175" y="376" text-anchor="middle" style="font-size: 20px;">y</text>
        <text x="1225" y="376" text-anchor="middle" style="font-size: 20px;">c</text>
        <text x="1275" y="376" text-anchor="middle" style="font-size: 20px;">t</text>
        <text x="984" y="423" text-anchor="end" style="font-size: 23px;">data</text>
        <text x="984" y="473" text-anchor="end" style="font-size: 23px;">mark</text>
        <text x="984" y="523" text-anchor="end" style="font-size: 23px;">x</text>
        <text x="984" y="573" text-anchor="end" style="font-size: 23px;">y</text>
        <text x="984" y="623" text-anchor="end" style="font-size: 23px;">color</text>
        <text x="984" y="673" text-anchor="end" style="font-size: 23px;">title</text>
        <rect
          x="1002"
          y="395"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.144"
        ></rect>
        <rect
          x="1052"
          y="395"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.576"
        ></rect>
        <rect
          x="1102"
          y="395"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.6400000000000001"
        ></rect>
        <rect
          x="1152"
          y="395"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.6080000000000001"
        ></rect>
        <rect
          x="1202"
          y="395"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.336"
        ></rect>
        <rect
          x="1252"
          y="395"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.22400000000000003"
        ></rect>
        <rect
          x="1002"
          y="445"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.576"
        ></rect>
        <rect
          x="1052"
          y="445"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.144"
        ></rect>
        <rect
          x="1102"
          y="445"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.6080000000000001"
        ></rect>
        <rect
          x="1152"
          y="445"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.656"
        ></rect>
        <rect
          x="1202"
          y="445"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.384"
        ></rect>
        <rect
          x="1252"
          y="445"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.256"
        ></rect>
        <rect
          x="1002"
          y="495"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.6400000000000001"
        ></rect>
        <rect
          x="1052"
          y="495"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.6080000000000001"
        ></rect>
        <rect
          x="1102"
          y="495"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.144"
        ></rect>
        <rect
          x="1152"
          y="495"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.6880000000000001"
        ></rect>
        <rect
          x="1202"
          y="495"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.43200000000000005"
        ></rect>
        <rect
          x="1252"
          y="495"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.24"
        ></rect>
        <rect
          x="1002"
          y="545"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.6080000000000001"
        ></rect>
        <rect
          x="1052"
          y="545"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.656"
        ></rect>
        <rect
          x="1102"
          y="545"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.6880000000000001"
        ></rect>
        <rect
          x="1152"
          y="545"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.144"
        ></rect>
        <rect
          x="1202"
          y="545"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.512"
        ></rect>
        <rect
          x="1252"
          y="545"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.288"
        ></rect>
        <rect
          x="1002"
          y="595"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.336"
        ></rect>
        <rect
          x="1052"
          y="595"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.384"
        ></rect>
        <rect
          x="1102"
          y="595"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.43200000000000005"
        ></rect>
        <rect
          x="1152"
          y="595"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.512"
        ></rect>
        <rect
          x="1202"
          y="595"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.144"
        ></rect>
        <rect
          x="1252"
          y="595"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.35200000000000004"
        ></rect>
        <rect
          x="1002"
          y="645"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.22400000000000003"
        ></rect>
        <rect
          x="1052"
          y="645"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.256"
        ></rect>
        <rect
          x="1102"
          y="645"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.24"
        ></rect>
        <rect
          x="1152"
          y="645"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.288"
        ></rect>
        <rect
          x="1202"
          y="645"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.35200000000000004"
        ></rect>
        <rect
          x="1252"
          y="645"
          width="44"
          height="44"
          fill="#333"
          fill-opacity="0.144"
        ></rect>
      </svg>
    </div>
    <div v-click="3" :data-osd-step="$clicks >= 3 ? 'revealed' : 'pending'">
      <svg
        data-mechanism-stage="lookup"
        viewBox="0 0 1920 1080"
        style="
          position: absolute;
          inset: 0;
          width: 1920px;
          height: 1080px;
          pointer-events: none;
          translate: 0px -40px;
        "
      >
        <text x="128" y="748" fill="#23448e" font-weight="700" style="font-size: 32px;">
          Current design
        </text>
        <path
          d="M158 781 V956 H355"
          fill="none"
          stroke="#000"
          stroke-width="2"
        ></path>
        <rect x="184" y="908" width="36" height="48" fill="#23448e"></rect>
        <rect x="241" y="908" width="36" height="48" fill="#23448e"></rect>
        <rect x="298" y="908" width="36" height="48" fill="#23448e"></rect>
        <text x="259" y="988" text-anchor="middle" style="font-size: 25px;">year</text>
        <g>
          <rect x="428" y="775" width="230" height="48" fill="#f2f4f7"></rect>
          <text
            x="543"
            y="800"
            dominant-baseline="middle"
            text-anchor="middle"

            fill="#000"
           style="font-size: 28px;">
            data
          </text>
        </g>
        <g>
          <rect x="428" y="831" width="230" height="48" fill="#f2f4f7"></rect>
          <text
            x="543"
            y="856"
            dominant-baseline="middle"
            text-anchor="middle"

            fill="#000"
           style="font-size: 28px;">
            bar mark
          </text>
        </g>
        <g>
          <rect x="428" y="887" width="230" height="48" fill="#f2f4f7"></rect>
          <text
            x="543"
            y="912"
            dominant-baseline="middle"
            text-anchor="middle"

            fill="#000"
           style="font-size: 28px;">
            encode x
          </text>
        </g>
        <path
          d="M685 855 C875 855 1150 772 1150 705"
          fill="none"
          stroke="#111"
          stroke-width="2.5"
          stroke-dasharray="10 7"
          marker-end="url(#_source-49-R_0_)"
        ></path>
        <text
          x="906"
          y="805"

          fill="#666"
          style="font-size: 26px; translate: -9px -9px"
        >
          lookup
        </text>
        <rect x="1002" y="545" width="44" height="44" fill="#23448e"></rect>
        <rect x="1052" y="545" width="44" height="44" fill="#23448e"></rect>
        <rect x="1102" y="545" width="44" height="44" fill="#23448e"></rect>
      </svg>
    </div>
    <div v-click="4" :data-osd-step="$clicks >= 4 ? 'revealed' : 'pending'">
      <svg
        data-mechanism-stage="recommend"
        viewBox="0 0 1920 1080"
        style="
          position: absolute;
          inset: 0;
          width: 1920px;
          height: 1080px;
          pointer-events: none;
          translate: 0px -40px;
        "
      >
        <path
          d="M1327 435 H1385"
          fill="none"
          stroke="#111"
          stroke-width="2"
          marker-end="url(#_source-49-R_0_)"
        ></path>
        <text x="1408" y="315" fill="#23448e" font-weight="700" style="font-size: 32px;">
          Ranked next transitions
        </text>
        <g>
          <text x="1408" y="427" fill="#777" style="font-size: 28px;">1</text>
          <text
            x="1450"
            y="427"

            font-weight="700"
            fill="#23448e"
           style="font-size: 28px;">
            Configure y encoding
          </text>
          <rect x="1450" y="449" width="360" height="10" fill="#e7e9ed"></rect>
          <rect
            x="1450"
            y="449"
            width="327.27272727272725"
            height="10"
            fill="#23448e"
          ></rect>
        </g>
        <g>
          <text x="1408" y="534" fill="#777" style="font-size: 28px;">2</text>
          <text x="1450" y="534" font-weight="400" fill="#000" style="font-size: 28px;">
            Configure color encoding
          </text>
          <rect x="1450" y="556" width="360" height="10" fill="#e7e9ed"></rect>
          <rect
            x="1450"
            y="556"
            width="222.95454545454544"
            height="10"
            fill="#a3a7ae"
          ></rect>
        </g>
        <g>
          <text x="1408" y="641" fill="#777" style="font-size: 28px;">3</text>
          <text x="1450" y="641" font-weight="400" fill="#000" style="font-size: 28px;">
            Add regression transform
          </text>
          <rect x="1450" y="663" width="360" height="10" fill="#e7e9ed"></rect>
          <rect
            x="1450"
            y="663"
            width="141.13636363636363"
            height="10"
            fill="#a3a7ae"
          ></rect>
        </g>
      </svg>
    </div>
    <div v-click="5" :data-osd-step="$clicks >= 5 ? 'revealed' : 'pending'">
      <svg
        data-mechanism-stage="apply"
        viewBox="0 0 1920 1080"
        style="
          position: absolute;
          inset: 0;
          width: 1920px;
          height: 1080px;
          pointer-events: none;
          translate: 0px -40px;
        "
      >
        <rect x="180" y="790" width="160" height="165" fill="#fff"></rect>
        <rect x="184" y="895" width="36" height="61" fill="#23448e"></rect>
        <rect x="241" y="854" width="36" height="102" fill="#23448e"></rect>
        <rect x="298" y="821" width="36" height="135" fill="#23448e"></rect>
        <text
          x="129"
          y="867"
          text-anchor="middle"
          transform="rotate(-90 129 867)"

          fill="#23448e"
         style="font-size: 25px;">
          sales
        </text>
        <g>
          <rect x="428" y="943" width="230" height="48" fill="#e9eef8"></rect>
          <text
            x="543"
            y="968"
            dominant-baseline="middle"
            text-anchor="middle"

            fill="#23448e"
           style="font-size: 28px;">
            encode y
          </text>
        </g>
        <path
          d="M1590 704 C1350 860 983 985 685 967"
          fill="none"
          stroke="#111"
          stroke-width="2.5"
          stroke-dasharray="10 7"
          marker-end="url(#_source-49-R_0_)"
        ></path>
        <text x="1170" y="839" style="font-size: 26px; translate: 137px 33px">
          apply top transition
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
