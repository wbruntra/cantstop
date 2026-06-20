# Can't Stop Tool

A companion tool for the [Can't Stop](https://boardgamegeek.com/boardgame/41/cant-stop) board game, built with Preact and Vite.

## Tech Stack

- [Preact](https://preactjs.com/) — fast 3kB alternative to React
- [Vite](https://vite.dev/) — build tool and dev server
- [ESLint](https://eslint.org/) — linting with flat config
- [Bun](https://bun.sh/) — package manager (`bun.lock`)
- [gh-pages](https://github.com/tschaub/gh-pages) — deploy `dist/` to GitHub Pages

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server with HMR |
| `bun run build` | Production build to `dist/` |
| `bun run lint` | Run ESLint |
| `bun run preview` | Preview production build locally |
| `bun run deploy` | Deploy `dist/` to gh-pages |
