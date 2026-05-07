# Yan-Kunatu.md - AI Assistant Instructions for Kunatu

Read this before changing the Kunatu repo.

## Project Overview

`/Users/rizrazak/Code/Tools/Kunatu` is the active repository for Kunatu, a Sri Lanka weather intelligence product.

Kunatu is not a generic weather display. It should combine forecast data, Sri Lankan weather context, uncertainty communication, and atmospheric visualisation into a public-facing tool.

## Source Of Truth

- This repo is the active source of truth.
- The old Google Drive Kunatu folder is defunct. Do not work in it.
- Do not copy old app files wholesale. If old material is needed later, review and port specific ideas deliberately.

## Current Build Strategy

Start model-first:

1. Define architecture and modelling assumptions.
2. Build a minimal app scaffold that proves the repo deploys.
3. Prototype the visual/weather interaction model.
4. Build the full app shell after the model and design language are stable.

## Planned Stack

- Next.js + TypeScript for the public app.
- MapLibre-compatible map layer for weather geography.
- Canvas/WebGL-ready visual layer for clouds, rain particles, wind vectors, and uncertainty.
- Vercel for early public deployment.
- Future custom API can live at `api.kunatu.lk`.

## Translation Policy

Never write Sinhala or Tamil public copy from LLM knowledge as a final source.

For Sinhala, use Google-backed translation as the baseline and preserve common tech/internet terms in English where natural. Human review is required before launch copy.

## Working Rules

- Prefer small, direct changes.
- Keep generated output, dependencies, and secrets out of git.
- Do not commit `.env`, API tokens, or generated build folders.
- Run `npm run lint` and `npm run build` after app changes when feasible.
- Do not commit unless explicitly asked.
