# Neptune website repository guide

## Source of truth

- Product name: **Neptune**.
- Desktop release version comes from `D:/LTGK-PROJECT/MyGithub/QGIS_Tools/neptune.iss`.
- Current release: `1.3.7`.
- Desktop capabilities must be verified from code bindings before website copy is changed.
- Keep default HTML, Chinese/English i18n, JSON-LD, PDF docs, sitemap and README synchronized.

## Site architecture

- `index.html`: page structure, SEO, JSON-LD and default Chinese content.
- `css/style.css`: all visual styles and responsive breakpoints.
- `js/i18n.js`: bilingual text and weather-model table data.
- `js/main.js`: language switching, menu, scroll effects, weather table and PDF modal.
- `docs/Neptune_功能说明文档.pdf`: stable public document URL.

## Content constraints for 1.3.7

- 7 Ribbon modules plus one independent right-side AI area.
- 19 configured weather models, not “20+”.
- Mesh generation and center refinement are implemented.
- Coastline drawing, editing, selection, merge and resampling are implemented.
- Standalone bathymetry processing and desktop language switching are reserved, not implemented.
- AI uses DeepSeek through LangChain and exposes 16 allowlisted tools; 14 non-read-only actions require confirmation.
- Six desktop themes are implemented.
- License remains undecided.

## Release checks

- Validate both i18n dictionaries contain every `data-i18n` key.
- Validate local links and assets.
- Parse every JSON-LD block.
- Search for stale versions and obsolete status claims.
- Confirm the external download link points to the current installer before deployment.
