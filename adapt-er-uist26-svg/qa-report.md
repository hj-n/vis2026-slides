# QA report · Adapt-ER · UIST 2026

Checked 2026-11-02 against the supplied paper and the user's subsequent revisions.

## Deliverables

- 13 editable SVG sources, each 1920×1080, with native SVG text and geometry.
- 13 PNG previews, contact sheet, presenter preview, offline HTML viewer, source map, and English notes.
- Planned duration: 540 seconds. English script: 1,124 words, approximately 125 words/minute across the allocated nine minutes. Actual spoken duration has not been rehearsed.
- Each slide has 2–6 sentences of English speaker notes. The cover's spoken opening retains the remote-presentation context while its artwork uses the revised conventional paper-cover format.

## Visual and structural verification

All 13 SVGs rendered in Chromium and the contact sheet was inspected. Text bounds passed the configured safe-area check with no issues; smallest slide text is 22px at 1920×1080. All visible elements are native SVG; there are no embedded images, foreignObject elements, external href resources, rasterized charts, canvas, or video in the slide artwork. No remote fonts or assets are needed by the standalone HTML viewer. Fonts remain editable text and use the local Arial/Helvetica/sans-serif stack.

Decorative cards and their fills/borders were removed following the user's revision. The remaining browser frames, checkboxes, word highlights, and 95/5 segments carry diagram or interface meaning. The title cover prominently identifies UIST 2026, the paper, authors, and affiliations. All “Adapted from Kim…” slide footer citations and displayed p values were removed; paper provenance and reported tests remain in notes/source documentation.

## Content verification

Figure 1–3 workflow and interaction concepts and Table 1 values were checked against the source PDF. Figure 4 results use directional arrows rather than invented mean values or effect sizes; arrow lengths are not quantitative. Table 2 engagement is described as descriptive, without an added significance claim. The 5% unfamiliar-word ratio is an operational baseline, not a demonstrated universal optimum. No long-term language gains, comprehension-test result, or cross-language generalization is claimed. Personal context and the closing vision remain separate from empirical results. Exact provenance and scope are documented in `source-map.md`.

## Interaction and build verification

- Offline viewer: Chromium with networking disabled; all 13 slides, keyboard navigation, Home, and speaker-note toggle passed. No external requests or JavaScript errors.
- Local Slidev: all 13 exact SVGs loaded on `/adapt-er/`; slide 10 presenter mode displayed the full English script and timing. The server proxy now forwards Slidev's note API using the deck referer. Existing UMATO route still loaded.
- Production build: `VIS_SLIDES_BASE=/vis2026-slides npm run build:adapt-er` passed. A local static server verified the repository prefix, cover, presenter notes, and byte-for-byte copies of all 13 SVG assets.
- Headless Chromium denied Wake Lock permission; this affects automatic screen-awake behavior only. The existing dev environment also logs a FloatingVue patch warning; slide rendering and note display passed despite it.

Publication uses the repository’s GitHub Pages workflow; the latest deployment is checked separately from local authoring QA.

## Speaker-note recovery and preservation

On 2026-11-02, visual regeneration was found to overwrite user edits in Slidev Markdown. User wording observed in local activity records was restored for slides 1, 4, 5, 6, 7, 8, 9, 11, 12, and 13, without copyediting. All ten restored notes were verified against the live Slidev note API. The generator now leaves existing `slides.md` untouched and reads its notes for derived exports. A full regeneration preserved the recovered Markdown byte-for-byte. `check_notes_preservation.py` additionally verified preservation with a modified note in an isolated repository copy and safe failure for unmappable notes. The dev server snapshots Markdown at startup and after changes in `.slidev/note-backups/`; its initial backup was verified against the recovered source. The earlier word count describes the initial script, before these user revisions.
