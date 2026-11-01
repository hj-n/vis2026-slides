<script setup>
import { useSlideContext } from "@slidev/client";
const { $clicks, $page } = useSlideContext();
const assetBase = import.meta.env.BASE_URL;
</script>

<template>
  <section
    data-chart-authoring-tools=""
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
      We have...
    </h1>
    <div
      data-authoring-example="Excel"
      style="position: absolute; left: 96px; top: 280px; width: 402px"
    >
      <div
        style="
          position: relative;
          width: 402px;
          height: 350px;
          overflow: hidden;
        "
      >
        <img
          :src="assetBase + 'source-assets/authoring-excel.jpg'"
          alt="Actual Excel worksheet with the selected region-sales cells and a column chart created from them"
          style="
            position: absolute;
            left: 0;
            top: -196.98px;
            width: 1409.01px;
            height: 876.36px;
            max-width: none;
          "
        />
      </div>
      <h2
        style="
          margin: 32px 0 0;
          font-size: 44px;
          line-height: 1.2;
          font-weight: 400;
          text-align: center;
        "
      >
        Excel
      </h2>
    </div>
    <div
      data-authoring-example="Tableau"
      style="position: absolute; left: 538px; top: 280px; width: 402px"
    >
      <div
        style="
          position: relative;
          width: 402px;
          height: 350px;
          overflow: hidden;
        "
      >
        <img
          :src="assetBase + 'source-assets/authoring-tableau.png'"
          alt="Tableau Public chart authoring with Columns and Rows shelves and the Marks panel; screenshot by Fritz Kessler, Penn State, CC BY-NC-SA 4.0"
          style="
            display: block;
            width: 402px;
            height: 350px;
            object-fit: contain;
          "
        />
      </div>
      <h2
        style="
          margin: 32px 0 0;
          font-size: 44px;
          line-height: 1.2;
          font-weight: 400;
          text-align: center;
        "
      >
        Tableau
      </h2>
    </div>
    <div
      data-authoring-example="Charting Libraries"
      style="position: absolute; left: 980px; top: 280px; width: 402px"
    >
      <div
        style="
          position: relative;
          width: 402px;
          height: 350px;
          overflow: hidden;
        "
      >
        <img
          :src="assetBase + 'source-assets/authoring-matplotlib.png'"
          alt="Executed Python Matplotlib code with its generated monthly-sales line chart"
          style="
            display: block;
            width: 402px;
            height: 350px;
            object-fit: contain;
          "
        />
      </div>
      <h2
        style="
          margin: 32px 0 0;
          font-size: 44px;
          line-height: 1.2;
          font-weight: 400;
          text-align: center;
        "
      >
        Charting Libraries
      </h2>
    </div>
    <div
      data-authoring-example="ChatGPT"
      style="position: absolute; left: 1422px; top: 280px; width: 402px"
    >
      <div
        style="
          position: relative;
          width: 402px;
          height: 350px;
          overflow: hidden;
        "
      >
        <img
          :src="assetBase + 'source-assets/authoring-chatgpt.jpg'"
          alt="Actual ChatGPT temporary conversation requesting a pie chart, followed by the generated regional-sales shares"
          style="
            display: block;
            width: 402px;
            height: 350px;
            object-fit: contain;
          "
        />
      </div>
      <h2
        style="
          margin: 32px 0 0;
          font-size: 44px;
          line-height: 1.2;
          font-weight: 400;
          text-align: center;
        "
      >
        ChatGPT
      </h2>
    </div>
    <div v-click="1" :data-osd-step="$clicks >= 1 ? 'revealed' : 'pending'">
      <p
        data-authoring-question=""
        style="
          position: absolute;
          left: 96px;
          top: 842px;
          margin: 0;
          font-size: 64px;
          line-height: 1.2;
          font-weight: 400;
        "
      >
        Still, is it <span style="font-weight: 700">easy</span> for people to
        create visualizations?
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
