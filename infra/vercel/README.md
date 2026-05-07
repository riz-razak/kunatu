# Vercel

Vercel is the first deployment target for Kunatu because the public app starts as a Next.js project and needs fast preview/deployment cycles.

## Project Settings

| Setting | Value |
|---|---|
| GitHub repo | `riz-razak/kunatu` |
| Framework preset | Next.js |
| Root directory | `app` |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | Next.js default |

## Environment Variables

No production secrets are required for the phase-1 placeholder app.

Future weather/map integrations should use Vercel environment variables rather than committed `.env` files. Public browser-exposed variables must use the `NEXT_PUBLIC_` prefix and should only contain values safe for public exposure.

## Domain Plan

Early deployment can use the Vercel preview/production URL.

Future public domain:

- `kunatu.lk` for the app.
- `api.kunatu.lk` for a future API layer if needed.

## Deployment Rules

- Deploy from `/Users/rizrazak/Code/Tools/Kunatu`, not the old Google Drive folder.
- Keep Vercel root directory set to `app`.
- Do not commit `.vercel/`, `.env`, `.env.local`, or generated build output.
- Do not add provider tokens until the integration that needs them exists.
