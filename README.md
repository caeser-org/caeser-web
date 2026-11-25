# caeser-web

The official website for [Caeser](https://github.com/caeser-org/ceaser) — an
evidence-driven investigation engine for Go CI failures.

The repository contains three things that ship together:

| Area | Where | What it is |
| --- | --- | --- |
| **Landing page** | `src/pages/index.astro` | The marketing page: hero, the investigation flow, the architecture diagram, and the product demo. |
| **Documentation** | `src/content/docs/` | The docs served at `/docs`, built with [Starlight](https://starlight.astro.build). |
| **LLM index** | `src/pages/llms.txt.ts`, `src/pages/llms-full.txt.ts` | Machine-readable docs index at `/llms.txt` and `/llms-full.txt`. |

## Stack

- [Astro](https://astro.build) with the Starlight docs theme
- Tailwind CSS v4
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling
- TypeScript

## Requirements

- Node.js **>= 22.12**

## Getting started

```sh
npm install
npm run dev       # start the dev server
npm run build     # production build into dist/
npm run preview   # preview a production build
```

## Project layout

```
src/
  components/         # landing-page sections and UI
    DemoVideo.astro   # product demo section (video + poster)
    DeeperInvestigation.astro
    InvestigationFlow.astro
  content/docs/       # Starlight documentation source
  layouts/
  pages/              # routes (index, docs via Starlight, llms.txt, blog, ...)
  styles/
scripts/
  sync-docs.mjs       # pull docs from the engine repo
  docs-links.mjs      # rewrite doc links for the website
public/
  demo/               # demo video (webm + mp4) and poster
```

## Contributing

Thanks for helping improve the Caeser website. Keep changes focused, run
`npm run build` before opening a pull request, and match the existing style of
the surrounding code.

### Documentation

The Markdown under `src/content/docs/docs/` is **synced from the engine
repository** (`caeser-org/ceaser`, `docs/` directory) — it is not hand-edited
here, so edits made only in this repo will be overwritten.

1. Make the change in the engine repo's `docs/` directory.
2. Sync it into this site:

   ```sh
   # defaults to ~/hades/docs; point HADES_DOCS at a checkout if elsewhere
   HADES_DOCS=/path/to/ceaser/docs npm run docs:sync
   ```

3. Run `npm run build` and check `/docs` before opening a pull request.

For documentation that is specific to the website (navigation, sidebar,
Starlight config), edit `astro.config.mjs` and `src/content/docs/` directly.

### Site and components

Landing-page sections live in `src/components/` and are composed in
`src/pages/index.astro`. Page styles are scoped inside each `.astro` component.
Changes to layout, typography, or motion should keep the existing design system
(Inter type, the serif/grotesque scale, monospace metadata) intact and should
respect `prefers-reduced-motion`.

### Demo video

The demo recording and poster live in `public/demo/` (`ceaser-demo.webm`,
`ceaser-demo.mp4`, `ceaser-demo-poster.webp`) and are wired into
`src/components/DemoVideo.astro`. Prefer the WebM source; the MP4 is a fallback.

### Reporting issues

Open an issue at
[caeser-org/caeser-web/issues](https://github.com/caeser-org/caeser-web/issues)
with the page URL, what you expected, and what happened.

## License

Licensed under the **Apache License, Version 2.0**. See [LICENSE](./LICENSE).

Copyright 2026 Caeser contributors.
