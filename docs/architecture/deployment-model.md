# Deployment Model

## Initial Deployment

- Public GitHub repository: `riz-razak/kunatu`.
- App deployment target: Vercel.
- Local app path: `app/`.

## Future Domain Model

- Current public product domain: `kunatu.yan.lk`.
- Current fallback domain: `app-jade-two-59.vercel.app`.
- `kunatu.lk` is not in the current horizon.
- Future API domain is deferred until an API layer exists.
- Shared DGTL/Yan services, if needed, remain under the relevant parent infrastructure.

## Deployment Rules

- Do not deploy from the defunct Google Drive folder.
- Do not commit `.env` files or generated build output.
- Keep provider secrets in Vercel environment variables or another approved secret store.
