# Latest revision: cleaner narrative flow (October 27, 2026)

**Reading order:** Home → Purpose (healthcare motivation) → About Me → Skills → Work Experience → Leadership → Projects → Contact.

**Fixed:** The work timeline is contained inside the experience card list and no longer crosses the heading. The current role starts **collapsed**, alongside all other roles; tap/click to expand. Desktop and mobile navigation now include Purpose. The fixed navigation background is opaque enough to prevent content bleeding through it.

This update keeps the original colors, photo assets, Bitmoji, resume viewer, and other features unchanged.

**Upload only three changed files** into the root of your GitHub `test` branch: `index.html`, `polish.css`, and `portfolio-extras.js`. Your existing `style.css`, `main.js` and `src/` assets are unchanged from the last release. Merge `test` into `main` after previewing the diff.

---

# Vaibhav Sharma — Portfolio (original design, polished)

Your original GitHub Pages site, enhanced for October 2026 with leadership and healthcare purpose. **No build tool or package install required.** The black/purple/blue/pink palette, personal portrait, Bitmoji, illustrations, six project images, project links, and original `main.js` are preserved.

## What's new

- **In-page résumé viewer**: `Preview my résumé` inside About Me opens a modal **without navigating away**. It has an × close button, Escape-key support, backdrop-close behavior, a Download control, and a link to open the PDF directly if a browser doesn't support inline PDFs. The viewer uses the existing repo file: `src/pdf/Vaibhav_Sharma_Resume.pdf`.
- **Improved Experience**: editorial introduction, animated details, and a highlighted current **Systems Analyst / Programmer — Senior** role at Rochester Regional Health. The current role opens by default; all cards expand or collapse on click or Enter/Space.
- **Browsable Projects**: filter among All projects, Data & AI, and Cloud & systems. Existing six project GitHub links and images remain. Alternating editorial composition and restrained motion.
- **Leadership in practice**: six substantiated areas—security initiatives, application rationalization, Agile and Ivanti prioritization, mentoring co-ops, cross-team work, and team culture. Focused on demonstrated informal leadership, without suggesting a manager title or direct reports.
- **Healthcare motivation**: a purpose-led section with a lightweight CSS/SVG heartbeat illustration, accessibility and reduced-motion support.
- **About me**: refreshed healthcare motivation and added Formula 1 to personal interests.
- **Polish**: original hero keeps its layout but gets a small focus-area signature; quieter transitions, scroll-progress bar, hover glows, mobile styles, and reduced-motion support.

## Files modified or added

- `index.html` — content, résumé modal, filter controls, new class hooks.
- `polish.css` — **new** CSS appended to (not replacing) the original visual system.
- `portfolio-extras.js` — **new** interaction logic for the modal, filters, Experience accordion, and visual details.
- `README.md` — deployment instructions.

`main.js` and all files under `src/` remain unchanged compared with the preceding refined ZIP. `style.css` retains the previous visual polish; include it when updating your live earlier version.

## Upload to GitHub Pages

Existing site: `https://github.com/lonesomebronco/portfolio`

**To update your existing `lonesomebronco/portfolio` repository**:

1. On GitHub select your `test` branch (or create a feature branch from `main`).
2. At the repository **root**, upload **these four files**: `index.html`, `style.css`, `polish.css`, and `portfolio-extras.js`. This includes compatibility with the currently live earlier version of the site. Do not create a nested `portfolio-main` folder.
3. Commit, open a pull request from the branch to `main`, and merge after reviewing.
4. Check **Actions** for the GitHub Pages deployment, then refresh `https://lonesomebronco.github.io/portfolio/` using Cmd+Shift+R.

**If starting from a new repository**, deploy the **entire content** of this folder to the publishing root; not the ZIP itself.

### Résumé note — review before publishing

The embedded `src/pdf/Vaibhav_Sharma_Resume.pdf` is **the existing file from your original repo** (PDF metadata date: July 15, 2024). This update deliberately does not rewrite or change it. To update your résumé, replace that PDF *using exactly the same filename* under `src/pdf/`. The viewer will automatically display the new content after GitHub Pages deploys. The viewer doesn't need Google Drive.

On some mobile browsers (notably certain versions of iOS Safari), embedded PDF rendering is limited. The direct-open/download controls remain available.

## Customization / technical notes

- Source HTML: `index.html`.
- Original styles: `style.css` (unchanged).
- Additional effects: `polish.css`.
- Interactions: `portfolio-extras.js` (new) and original `main.js` (unchanged).
- PDF: `src/pdf/Vaibhav_Sharma_Resume.pdf` (unchanged).
- The original site's fonts and AOS scroll-reveal animations load from external CDNs and need network access.
- Before making the site public, check that the email, links, and résumé content are current and that workplace descriptions contain no confidential information.

## October 27 leadership and healthcare update

- **Leadership in practice** now covers leading team-security workstreams; helping application rationalization; facilitating Scrum, Agile priorities and urgent Ivanti work; guiding co-ops through coding and architecture; coordinating security, IAM, infrastructure, cloud and business groups; and team collaboration/culture. These are described as informal technical and cross-functional leadership, **not** formal line management.
- **Healthcare motivation** section adds a purpose-led statement and lightweight, reduced-motion-friendly heartbeat SVG animation, without extra external dependencies.
- Formula 1 joins the other interests, and a small *current focus* row shows C#/.NET, React, Azure, security and enterprise architecture while keeping all original skills icons.
- Responsive checks included 280–2560px widths; no horizontal document overflow in the tested browser.
- No claims of improved patient outcomes, direct reports, or specific operational metrics are made. Public-facing references to workplace efforts are intentionally high-level. Review with your organization before posting confidential information.
