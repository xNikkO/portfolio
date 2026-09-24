# Nikodem Mahlik — portfolio

This repository contains the current portfolio at its root. It uses Next.js 16, React 19 and Tailwind CSS 4, with home, projects and about pages. The previous static site is saved locally in the ignored `legacy/` folder.

## Run locally

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Checks and GitHub Pages

```bash
npm run lint
npm run typecheck
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

The [Pages workflow](.github/workflows/pages.yml) runs these checks on pull requests and deploys the static export in `out/` after a push to `main`. The `/portfolio` base path matches <https://xnikko.github.io/portfolio/>. Public assets use `lib/paths.ts` so they work locally and at that URL.

Before merging the migration PR, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The existing branch-based Pages setting cannot build Next.js source files.

The site is statically exported. Features requiring a Next.js server, such as Server Actions or request-dependent route handlers, need another host or a separate backend.
