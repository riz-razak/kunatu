# Deployment Model

## Initial Deployment

- Public GitHub repository: `riz-razak/kunatu`.
- App deployment target: Vercel.
- Local app path: `app/`.

## Future Domain Model

- Public product: `kunatu.lk`.
- Future API: `api.kunatu.lk`.
- Shared DGTL services, if needed, remain under `dgtl.lk`.

## Deployment Rules

- Do not deploy from the defunct Google Drive folder.
- Do not commit `.env` files or generated build output.
- Keep provider secrets in Vercel environment variables or another approved secret store.
