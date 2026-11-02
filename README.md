# VIS 2026 Presentations

## 1. Visualization Autocomplete

```sh
npm install
npm run dev
```

`npm run dev` starts all decks on one server:

- Visualization Autocomplete: http://localhost:3045/visauto/
- Distortion-aware Brushing: http://localhost:3045/dab/
- Stop Misusing t-SNE and UMAP: http://localhost:3045/misuse/
- UMATO: http://localhost:3045/umato/

Presenter mode: append `#/presenter/` to any deck URL. Changes to the slide sources update the browser automatically.

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

The static builds are written to `dist/visauto/`, `dist/dab/`, `dist/misuse/`, and `dist/umato/`. Serve the `dist/` directory to use the same URLs in production. PDF export requires Playwright Chromium.

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

## 3. Stop Misusing t-SNE and UMAP

Open http://localhost:3045/misuse/. The deck contains 19 slides covering misuse, its causes, four solution directions, and a shared closing slide with the first two talks crossed out.

Edit `decks/stop-misusing/slides.md`; slide 2 content is in `decks/stop-misusing/components/MisuseDefinition.vue`.
Build it with `npm run build:misuse`.

## 4. UMATO

Open http://localhost:3045/umato/. The deck contains 14 slides: title and authors, the VIS 2022 presentation, the expanded-work motivation, the 2022-to-2026 transition, algorithm motivation and pipeline, recorded UMAP/UMATO optimization on 3,000 Fashion-MNIST images, accuracy and local/global trade-offs, runtime evidence, hyperparameter guidelines, the GitHub link with QR code, a four-click Ph.D. reflection, and the shared closing slide with all four talks crossed out.

Edit `decks/umato/slides.md`; cover styles are in `decks/umato/layouts/umato-cover.vue`. Build with `npm run build:umato`.

The optimization animation uses genuine epoch snapshots recorded by `scripts/animation/record-optimization.py`. Binary traces and provenance are in `decks/umato/public/optimization/`. Playback is normalized progress, not elapsed computation time. Replay, pause, and scrubbing are available on the slide.

The closing slide is shared at `shared/components/VisClosing.vue`; each deck specifies how many completed talks to cross out.

## GitHub Pages

The `main` branch deploys automatically through `.github/workflows/pages.yml`.

- `/vis2026-slides/visauto/`: Visualization Autocomplete
- `/vis2026-slides/dab/`: Distortion-aware Brushing
- `/vis2026-slides/misuse/`: Stop Misusing t-SNE and UMAP
- `/vis2026-slides/umato/`: UMATO

For a local production build with the Pages prefix:

```sh
VIS_SLIDES_BASE=/vis2026-slides npm run build
```

`npm run dev` continues to use `/visauto/`, `/dab/`, `/misuse/`, and `/umato/` without the repository prefix.
