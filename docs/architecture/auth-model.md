# Auth Model

Kunatu uses Yan identity. It must not create a separate identity silo.

## Current State

- Public weather pages do not require auth.
- Account/admin routes are auth-ready scaffolds.
- The local implementation uses the `auth.yan.lk` session shape but does not yet perform real login/callback exchange.

## Future Contract

| Item | Value |
|---|---|
| Product key | `kunatu` |
| Client ID | `kunatu` |
| Auth authority | `https://auth.yan.lk` |
| Callback | `https://kunatu.yan.lk/auth/callback` |
| Local session | `__Host-kunatu_session` |

## Product Rights

```text
kunatu.admin.access
kunatu.copy.edit
kunatu.guidance.edit
kunatu.locations.manage
kunatu.sources.manage
kunatu.profile.manage
kunatu.alerts.manage
kunatu.content.publish
```

## Handoff To auth.yan.lk

Kunatu needs these when the parallel auth project is ready:

1. Client registration for `client_id=kunatu`.
2. Redirect allowlist for `https://kunatu.yan.lk/auth/callback`.
3. Signed claims containing person, product membership, and rights.
4. Token/JWKS validation guidance.
5. Local session creation guidance for `__Host-kunatu_session`.
6. Smoke tests for login, callback, `/auth/me`, logout, and denied access.

Do not show Google/Apple login buttons in Kunatu until central auth explicitly enables them.
