# CMS Model

Kunatu CMS starts as a copy and guidance registry. It should not become an identity silo.

## Future Tables

### `copy_tokens`

| Field | Purpose |
|---|---|
| `key` | Stable app key, unique. |
| `namespace` | Area of product copy. |
| `source_en` | English source copy. |
| `si` | Sinhala reviewed copy. |
| `ta` | Tamil reviewed copy. |
| `status` | `draft`, `machine_translated`, `reviewed`, `published`. |
| `cms_editable` | Whether editors can change it. |
| `context` | Where/how copy appears. |
| `trigger` | Weather rule or display condition. |
| `updated_by` | Yan person ID. |
| `updated_at` | Audit timestamp. |

### `guidance_rules`

| Field | Purpose |
|---|---|
| `id` | Stable rule ID. |
| `copy_key` | Message shown when triggered. |
| `category` | Rain, heat, wind, roads, lifestyle, movement. |
| `priority` | Display priority. |
| `severity` | Low, watch, caution. |
| `trigger_description` | Human-readable threshold. |
| `enabled` | Whether the rule can show. |

## Auth Requirement

CMS and admin edits require `auth.yan.lk`, a local `__Host-kunatu_session`, and product rights. Initial rights:

```text
kunatu.admin.access
kunatu.copy.edit
kunatu.guidance.edit
kunatu.locations.manage
kunatu.sources.manage
kunatu.profile.manage
```

No local browser token, PAT, or standalone Kunatu identity store should be used.
