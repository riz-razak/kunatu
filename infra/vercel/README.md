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

Kunatu is currently incubating under Yan public infrastructure.

Current domains:

- Primary: `kunatu.yan.lk`.
- Fallback: `app-jade-two-59.vercel.app`.

`kunatu.lk` is not in the current horizon. A future API domain should be decided only after Kunatu has a real server-side API layer.

## DNS Setup

For `kunatu.yan.lk`, configure DNS in the `yan.lk` zone:

| Type | Name | Target | Proxy |
|---|---|---|---|
| CNAME | `kunatu` | `3a5d0f81cc2b2ea2.vercel-dns-017.com` | DNS only |

## Deployment Rules

- Deploy from `/Users/rizrazak/Code/Tools/Kunatu`, not the old Google Drive folder.
- Keep Vercel root directory set to `app`.
- Do not commit `.vercel/`, `.env`, `.env.local`, or generated build output.
- Do not add provider tokens until the integration that needs them exists.
