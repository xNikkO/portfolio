# Nikodem Mahlik portfolio

The portfolio is built with Next.js 16, React 19 and Tailwind CSS 4. It includes the home, projects and about pages, plus static assets and metadata.

## Development

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>. The local development server does not need a path prefix.

## Checks

```bash
npm run lint
npm run typecheck
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

The build uses Next.js static export and writes deployable files to `out/`. The `/portfolio` base path matches the GitHub Pages project URL. GitHub Actions runs these checks for pull requests and deploys `out/` after changes reach `main`.

The project is static: features that require a Next.js server, such as Server Actions or request dependent route handlers, need another host or a separate backend. Images use static files, and paths to those files go through `lib/paths.ts` so they work both locally and on GitHub Pages.
