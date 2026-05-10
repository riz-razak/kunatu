# Copy Map

Kunatu copy must be addressable by stable keys before it moves into CMS. English source copy ships first. Sinhala and Tamil fields stay empty until the translation workflow runs.

## Workflow

1. Add English source copy with a stable key in `app/src/lib/copy.ts`.
2. Record context, trigger logic, CMS editability, and status.
3. Run LLM draft pass only for candidate phrasing.
4. Generate Sinhala/Tamil baseline through Google NMT.
5. Let the team edit and publish through CMS.
6. Fall back to English if a translation is missing or unpublished.

## Status Values

| Status | Meaning |
|---|---|
| `draft` | English source exists; translation not ready. |
| `machine_translated` | Google NMT baseline exists; human review pending. |
| `reviewed` | Team reviewed translation/copy. |
| `published` | CMS-approved for production display. |

## Current Namespaces

| Namespace | Purpose |
|---|---|
| `home` | Public landing and disclaimers. |
| `weather` | Weather labels and values. |
| `guidance` | Practical weather suggestions. |
| `forecast` | Forecast strip headings and labels. |
| `source` | Data source and trust copy. |

RainViewer/MapLibre radar labels also live under `source` until a dedicated `radar` namespace is added to the CMS schema.

## Guardrails

- Do not write final Sinhala/Tamil from LLM memory.
- Keep public guidance calm: use `may`, `likely`, `chance`, `watch`, and `check again`.
- Do not use official warning language unless Kunatu is quoting an official source.
- Guidance thresholds are code-reviewed. CMS edits message text, not risk thresholds, until admin permissions and audit are live.
