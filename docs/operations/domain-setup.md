# Domain Setup: kunatu.yan.lk

Kunatu's current public domain target is `kunatu.yan.lk`.

`kunatu.lk` is not in the current horizon.

## Current Hosting

| Field | Value |
|---|---|
| Vercel project | `kunatu` |
| GitHub repo | `riz-razak/kunatu` |
| App root | `app` |
| Current fallback URL | `https://app-jade-two-59.vercel.app` |
| Target domain | `https://kunatu.yan.lk` |

## Vercel Step

In Vercel project `kunatu`:

1. Open `Settings` -> `Domains`.
2. Add domain: `kunatu.yan.lk`.
3. Vercel should request a DNS record for the `yan.lk` zone.

Vercel is currently verified through this DNS record:

```text
CNAME kunatu.yan.lk 3a5d0f81cc2b2ea2.vercel-dns-017.com
```

Use the exact value Vercel shows if it differs in a future inspection.

## Cloudflare DNS Step

In the Cloudflare zone for `yan.lk`, add:

| Type | Name | Target | Proxy | TTL |
|---|---|---|---|---|
| CNAME | `kunatu` | `3a5d0f81cc2b2ea2.vercel-dns-017.com` | DNS only | 10 min |

Start with DNS-only to avoid certificate/proxy ambiguity while Vercel verifies the domain. Cloudflare proxying can be revisited later.

## Verification

After DNS propagates:

```bash
dig kunatu.yan.lk
curl -I https://kunatu.yan.lk
```

Success criteria:

- Vercel shows `kunatu.yan.lk` as valid.
- `curl -I https://kunatu.yan.lk` returns `200` or a normal redirect to the Vercel deployment.
- The page loads the Kunatu weather MVP.
