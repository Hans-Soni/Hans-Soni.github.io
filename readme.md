# Hans Soni — Portfolio

Personal portfolio for Hans Soni, a Computer Science undergraduate at Parul University (B.Tech CSE, expected 2027). I build security-first full-stack software, including secure real-time applications, defensive APIs, phishing-analysis tools, and accessibility projects. I have led a student development team, solved a CyLab CTF challenge, completed 150+ LeetCode problems, and ranked in the top 3 of the Google Skills Diamond League.

## Live site

- Portfolio: [hans-soni.github.io](https://hans-soni.github.io/)
- GitHub: [Hans-Soni](https://github.com/Hans-Soni)
- LinkedIn: [Hans Soni](https://www.linkedin.com/in/hans-soni-59b294352)
- Credly: [Hans Soni](https://www.credly.com/users/hans-soni/badges/credly)
- Google Skills: [Hans Soni](https://www.skills.google/public_profiles/e68808c6-c66b-4b9d-bb3f-3aa6d3e7564f)
- LeetCode: [hanssoni](https://leetcode.com/u/hanssoni/)
- Email: [hanssureshsoni@gmail.com](mailto:hanssureshsoni@gmail.com)

## Run locally

This is a static HTML, CSS, and JavaScript site. It has no package installation or build step.

1. Open `index.html` directly, or start a local server from the repository root:

   ```sh
   python -m http.server 8000
   ```

2. Visit `http://localhost:8000`.

Google Fonts requires an internet connection. The contact form validates the visitor's details and opens their configured email app with a prefilled draft addressed to Hans; the visitor reviews and sends it from that app.

## Website contents

The main page includes a terminal-inspired hero, animated code rain and scanlines, profile links, an About section with achievement cards, skills, projects, job simulations and certifications, and a contact form. The page is responsive and honors reduced-motion preferences.

## Repository map

### Root files

- `index.html` — Main portfolio markup, metadata, navigation, hero, About and Google Skills ranking cards, skills, projects, experience, certifications, contact form, and footer. Loads `styles.css`, `custom.css`, and `script.js`.
- `styles.css` — Generated Tailwind CSS stylesheet used by the main page. Contains the dark neon theme, utility classes, typography, responsive layout, and animation utilities.
- `custom.css` — Additional portfolio styles for reveal transitions, card tilt, the custom cursor, contact status, and reduced-motion behavior.
- `script.js` — Main-page interactions: animated code rain, name scramble, typewriter roles, reveal-on-scroll, scroll progress, cursor tracking, card tilt, and validated contact-form submission.
- `404.html` — Branded not-found page with the current dark neon theme, animated background, noindex metadata, and links back to the portfolio and contact section. It loads the shared root `styles.css`, `custom.css`, and `script.js`.
- `support.js` — Earlier custom declarative/React-compatible runtime retained in the repository. The current `index.html` does not load it.
- `robots.txt` — Search-crawler rules and the sitemap location; excludes the 404 page from indexing.
- `sitemap.xml` — XML sitemap containing the canonical portfolio URL and its indexing metadata.
- `.thumbnail` — WebP thumbnail/preview image stored at the repository root; it is not referenced by the main page.
- `readme.md` — This project overview, setup guide, and repository file map.

### `assets/`

Static image and document files used by the portfolio. See [`assets/README.md`](./assets/README.md) for per-file details.

### `ds/`

Design-system resources retained from the earlier Organic theme. The current portfolio and 404 page do not load this design system. See [`ds/README.md`](./ds/README.md) for details about each stylesheet, manifest, bundle, and lint configuration.

## Main page interactions

- Code rain responds to pointer proximity; scanlines remain fixed over the background.
- The hero role text and name animate on load.
- Sections and cards reveal as they enter the viewport.
- The top progress indicator follows page scrolling.
- Cards tilt on pointer devices; reduced-motion settings disable animations.
- The Samवाद card opens the live chat project; phones and tablets use the top-right menu to navigate sections.
- The contact form validates fields and opens a prefilled `mailto:` draft for the visitor to review and send.

## Portfolio content

- **Samवाद** — Secure real-time chat application: [open project](https://hans-soni.github.io/Let-s-Connect/).
- **SafeInBox AI** — Phishing and malicious URL analyzer.
- **Adaptive Reading Aid** — Accessibility extension for dyslexia, built with a student team.
- **Education** — B.Tech in Computer Science & Engineering at PIET, Parul University (expected 2027); Class XII (2023) and Class X (2021).
- **Experience simulations** — Mastercard, Goldman Sachs, and TCS.
- **Achievement** — Top 3 in the Google Skills Diamond League.
