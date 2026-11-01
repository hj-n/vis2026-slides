# VIS 2026 Presentations

## 1. Visualization Autocomplete

```sh
npm install
npm run dev
```

`npm run dev` starts both decks on one server:

- Visualization Autocomplete: http://localhost:3045/visauto/
- Distortion-aware Brushing: http://localhost:3045/dab/

Presenter mode: append `#/presenter/` to either URL. Changes to the slide sources update the browser automatically.

16 slides in this order:

| Deck | Source |
| --- | --- |
| 1 | [KVIS 2025, slide 1](https://hyeonword.com/slides/kvis2025/#/1) |
| 2–6 | [SNU job talk, slides 39–43](https://hyeonword.com/job-talk-2026/s/snu-job-talk/?p=39) |
| 7–14 | [SNU job talk, slides 45–52](https://hyeonword.com/job-talk-2026/s/snu-job-talk/?p=45) |
| 15 | Live demo link and QR code: https://vis.autocomplete.studio/ |
| 16 | VIS talk schedule and profile; first three talks crossed out |

- Order, click counts, and speaker notes: `decks/visualization-autocomplete/slides.md`.
- Editable slide contents: `decks/visualization-autocomplete/components/Source<number>.vue`. Numbers refer to the original SNU deck.
- Cover styles and author profiles: `decks/visualization-autocomplete/theme/`.
- Source images: `decks/visualization-autocomplete/public/source-assets/`.
- Number mapping: `decks/visualization-autocomplete/source-map.json`.

Use the arrow keys or Space for the next reveal/slide. The sequence on slide 9 starts automatically; click its diagram to replay.

```sh
npm run build
npm run export:autocomplete
```

The static builds are written to `dist/visauto/` and `dist/dab/`. Serve the `dist/` directory to use the same URLs in production. PDF export requires Playwright Chromium.

## 2. Distortion-aware Brushing

```sh
npm run dev
npm run build:dab
```

Open http://localhost:3045/dab/. The deck contains 22 slides: the title slide, then SNU job-talk slides 17, 20, 21, and 22–37, followed by the project link and QR code, and a closing slide with all four VIS talks and Hyeon Jeon’s profile.
Order, click counts, and notes: `decks/distortion-aware-brushing/slides.md`.
Editable slide contents: `decks/distortion-aware-brushing/source/snu-slides.tsx`.
`components/SnuSlide.vue` connects the original React interactions to Slidev navigation, click reveals, and page numbering. The deck reuses the Autocomplete cover theme and keeps its own images and content.

Paper: https://www.hyeonjeon.com/assets/pdf/jeon25tvcg3.pdf

Decks 3–4 can be added as separate directories under `decks/` when their sources are selected.

The closing slide is shared at `shared/components/VisClosing.vue`; each deck specifies how many completed talks to cross out.

## GitHub Pages

The `main` branch deploys automatically through `.github/workflows/pages.yml`.

- `/vis2026-slides/visauto/`: Visualization Autocomplete
- `/vis2026-slides/dab/`: Distortion-aware Brushing

For a local production build with the Pages prefix:

```sh
VIS_SLIDES_BASE=/vis2026-slides npm run build
```

`npm run dev` continues to use `/visauto/` and `/dab/` without the repository prefix.
