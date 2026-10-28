# Portfolio — refined Experience & transitions (October 27, 2026)

## What is fixed

- **The giant vertical timeline is removed from the HTML entirely.** Experience is now a modern responsive two-column card layout, with your current senior role featured across the full width. No line can pass through the section title.
- **All experience roles start collapsed at the HTML/CSS level**, including the current role. Click/tap or press Enter/Space to expand; Escape to close. Content animates smoothly when opened.
- Cleaner project hover reveals, subtle leadership-card elevation, healthcare-visual motion and scroll reveals using local JavaScript (no dependence on an animation CDN).
- Original palette, Bitmoji, portrait, skills artwork, project images, all résumé assets and the PDF viewer are unchanged.
- Added a version query string on the updated CSS/JS references to reduce stale caching on GitHub Pages.

## Updating your GitHub Pages repository

The full repository includes **all** original files. To update an existing copy from the previous build, only replace **three files at the repository root**: `index.html`, `polish.css`, and `portfolio-extras.js`.

1. Open `lonesomebronco/portfolio` and switch to `test`.
2. Upload those three files directly to the repository root.
3. Commit, create a pull request from `test` to `main`, and merge.
4. Open your website and hard refresh (Command + Shift + R).

`style.css`, `main.js`, `src/` and the original photos/PDF are preserved as supplied. Do not upload the ZIP itself to GitHub Pages.
