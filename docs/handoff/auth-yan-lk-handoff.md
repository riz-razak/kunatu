# auth.yan.lk Handoff For Kunatu

Date: 2026-05-11
Status: two-round handover note

Kunatu is currently a public weather intelligence product under `kunatu.yan.lk`. No login, account, member, profile, or admin auth layer is implemented in the Kunatu app today.

## Round 1: Current State And Do Not Break

Current Kunatu facts:

- Active workspace: `/Users/rizrazak/Code/Tools/Kunatu`.
- Public domain target: `https://kunatu.yan.lk`.
- Fallback deployment: Vercel preview/public URL documented in the Kunatu README.
- Vercel project: `kunatu`.
- GitHub repo: `riz-razak/kunatu`.
- Current app root: `app/`.
- Phase 1 has no production auth secrets.
- Do not commit `.env`, `.env.local`, `.vercel/`, `.next/`, or build output.

Current auth stance:

- Kunatu remains public/no-auth for now.
- Do not add a product-local account system just to unblock UI work.
- Do not introduce Google/Apple buttons directly in Kunatu.
- If account features become necessary, Kunatu should consume `auth.yan.lk` like other Yan products.

Relevant current docs:

- `README.md`
- `Yan-Kunatu.md`
- `docs/operations/domain-setup.md`
- `docs/architecture/deployment-model.md`
- `infra/vercel/README.md`

## Round 2: Integration Decision When Needed

When Kunatu needs accounts, decide these before code changes:

| Decision | Required answer |
| --- | --- |
| Auth need | Public only, saved preferences, admin/editor tools, alerts, or paid features. |
| Product key | Likely `kunatu`, to be added to Yan People only when needed. |
| Client id | `kunatu` or `yan-kunatu`, to be registered in `auth.yan.lk`. |
| Callback URL | `https://kunatu.yan.lk/auth/callback` if central auth is enabled. |
| Local session | `__Host-kunatu_session` with no `Domain` attribute. |
| Logout | Local logout plus optional global Yan logout. |
| Env vars | Vercel environment variables only, no committed secrets. |
| Admin rights | Product-prefixed rights such as `kunatu.admin.access` only if admin UI exists. |

Auth.yan update Kunatu was waiting on:

- Central direction is now locked: `auth.yan.lk` is the broker.
- Product sessions remain local per product/domain.
- Google/Apple providers remain hidden until central provider QA passes.
- Apple relay emails must not auto-map to invited accounts.
- Products should implement adapter routes only when they need accounts.

Kunatu recommendation:

- Continue public/no-auth while weather data, visualisation, and model clarity are being built.
- Add only a future auth placeholder in architecture docs if product needs require saved locations, alerts, admin publishing, or user preferences.
- Do not block Kunatu Phase 1 on central auth unless the next Kunatu task introduces private/admin state.
