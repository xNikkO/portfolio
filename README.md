# Nikodem Mahlik — portfolio

The current portfolio lives in [`portfolio/`](portfolio/). It uses Next.js 16, React 19 and Tailwind CSS 4. The previous static site has been moved into the locally ignored `legacy/` folder.

## Run locally

```bash
cd portfolio
npm ci
npm run dev
```

Open <http://localhost:3000>.

## GitHub Pages

The [Pages workflow](.github/workflows/pages.yml) builds the app as a static export and publishes `portfolio/out` at <https://xnikko.github.io/portfolio/>. Pull requests run lint, type checking and the same production build. Deployment runs after a push to `main`.

Before merging this change, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The repository currently publishes files from the root of `main`; that setting cannot build Next.js source files by itself.

The production build sets `NEXT_PUBLIC_BASE_PATH=/portfolio` so links, images and metadata use the project URL. For a local production preview, run `NEXT_PUBLIC_BASE_PATH=/portfolio npm run build` from `portfolio/` and serve `portfolio/out` under `/portfolio/`.
