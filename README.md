# Kunatu

Kunatu is a Sri Lanka weather intelligence project. It is being rebuilt as a fresh public repository with a model-first architecture before the product UI is expanded.

The goal is not to ship a generic weather app. Kunatu should help people understand observed weather, forecast uncertainty, rainfall risk, wind, heat, and storm behaviour in a Sri Lankan context.

## Current Phase

Phase 1 is architecture/model first:

- Establish the repository structure.
- Define the weather intelligence stack.
- Define the cloud, rain, wind, and particle visual model.
- Keep the app scaffold minimal until the modelling assumptions are clear.

## Active Workspace

Canonical local path:

`/Users/rizrazak/Code/Tools/Kunatu`

The old Google Drive Kunatu folder is defunct and is not a working directory or source of truth.

## Planned Stack

- Next.js
- TypeScript
- React
- MapLibre-compatible map layer
- Canvas/WebGL-ready atmospheric visual layer
- Vercel for early public deployment

## Deployment

Kunatu will deploy from the `app/` directory on Vercel.

Initial Vercel settings:

- Framework preset: Next.js
- Root directory: `app`
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: Next.js default

See `infra/vercel/README.md` for deployment notes.

## Repository Layout

```text
Kunatu/
  Yan-Kunatu.md
  README.md
  app/
  docs/
  models/
  data/
  infra/
  scripts/
  artifacts/
```
