# Design-system resources

This folder contains the Organic design-system files retained from an earlier version of the portfolio. Its styling is separate from the current dark neon theme in the repository-root `styles.css`.

Neither the current `index.html` nor `404.html` loads this design system. The 404 page now shares the root portfolio theme.

## Files

- `styles.css` — Design tokens and reusable component styles. Defines the warm neutral palette, accent color ramps, Caprasimo and Figtree typography, spacing, radii, shadows, buttons, forms, cards, tags, and navigation styles. Imports its fonts from Google Fonts.
- `manifest.json` — Design-system inventory metadata: token definitions, brand fonts, component and foundation entries, and template metadata.
- `_ds_manifest.json` — Underscore-prefixed copy of `manifest.json`, retained for consumers that expect the generated design-system filename.
- `bundle.js` — Generated JavaScript namespace bootstrap for `Organic_organi`. The current bundle has no exported components.
- `_ds_bundle.js` — Underscore-prefixed copy of `bundle.js`, retained for design-system tooling compatibility.
- `adherence.oxlintrc.json` — OXC/Oxlint configuration for design-system code. Includes React/import plugins and rules that warn on raw hex colors, hard-coded pixel values, and unsupported font families.
- `_adherence.oxlintrc.json` — Underscore-prefixed copy of the adherence configuration for tooling that expects the generated filename.
- `README.md` — This folder guide.

The underscore-prefixed manifests, bundle, and adherence configuration are byte-identical copies of their unprefixed counterparts.

## Relationship to the website

The Organic design system is not used by the current portfolio or its 404 page. To update their appearance, edit the root `styles.css` and `custom.css`. Changes to `ds/styles.css` only affect another page if that page explicitly imports it.
