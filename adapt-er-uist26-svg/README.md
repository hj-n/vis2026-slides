# Adapt-ER · UIST 2026

13 slides with an English speaker script, planned for 9 minutes. The cover follows the user's revised direction: a conventional paper title, author list, affiliations, and prominent UIST 2026. Decorative card backgrounds and borders have been removed throughout; browser frames and vocabulary highlights remain where they explain the interface.

## Present

- In the repository: `npm run dev`, then http://localhost:3045/adapt-er/#/1
- Slidev presenter: http://localhost:3045/adapt-er/#/presenter/1
- Standalone offline presentation: open `deck.html` in a browser.
- Offline controls: Left/Right, PageUp/PageDown, Space; Home/End; P or N for speaker notes; F for fullscreen.
- Script, timing, and provenance: `speaker-notes.md` and `source-map.md`.

## Edit

`slides/*.svg` are the final editable 1920×1080 vector sources. All visible text remains SVG text. Open them in a vector editor or edit their XML. No embedded raster assets, external fonts, or network resources are used by these SVGs or the offline viewer.

After editing SVGs directly, run `python build.py --sync-only` to refresh the offline HTML and copy the SVGs and notes into the repository's Slidev deck without overwriting your artwork. The repository integration expects this folder beside `decks/`.

Speaker notes are owned by `decks/adapt-er/slides.md`: edit them there or in Slidev presenter mode. Existing Slidev Markdown is never overwritten by the generator. Both normal generation and `--sync-only` read those current notes into the offline viewer and exported note document. `content.json` supplies initial notes only when creating a new deck. The dev server saves local Markdown snapshots to `decks/adapt-er/.slidev/note-backups/` at startup and after each change.

For programmatic visual changes, edit `build.py` (geometry) and `content.json` (titles and timing), then run `python build.py`. This regenerates and replaces the SVGs while preserving existing Slidev Markdown byte-for-byte. Python requires Pillow for font measurement; Arial is used on macOS, with a Liberation Sans fallback for generation.

`python render_and_check.py` renders all slides and checks text bounds and vector constraints. It requires Pillow, Playwright, and its Chromium browser. Pre-rendered PNG previews and a contact sheet are already included; they are review artifacts, not slide source artwork.

From the repository root, `npm run build:adapt-er` builds the static Slidev deck. Use `VIS_SLIDES_BASE=/vis2026-slides npm run build:adapt-er` for the repository's Pages path. The repository deploys all decks to GitHub Pages on a push to `main`.

## Source and scope

Research claims were checked against the supplied paper, DOI 10.1145/3830398.3830676, licensed CC BY 4.0. The source PDF is not redistributed here. The original plan is retained at `source/implementation-plan.md`; the user's subsequent cover and box-removal instructions take precedence. Figure adaptations, illustrative wording, exact reported statistics, and limitations are documented in `source-map.md`.

Hyeon Jeon's cover affiliation is Aarhus University, consistent with the user's earlier correction across these decks; other affiliations follow the paper. The English script retains the personal remote-presentation opening. The broader language-learning vision is framed as speaker reflection, not a demonstrated learning outcome.
