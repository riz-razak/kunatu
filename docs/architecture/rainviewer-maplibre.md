# RainViewer + MapLibre

Kunatu now includes a first real rain radar layer using MapLibre and RainViewer metadata.

## Implementation

| Piece | File |
|---|---|
| RainViewer API proxy | `app/src/app/api/rainviewer/route.ts` |
| RainViewer types/helpers | `app/src/lib/rainviewer.ts` |
| MapLibre client component | `app/src/components/weather/RainViewerMap.tsx` |
| Homepage section | `app/src/app/page.tsx` |

## Data Contract

The app fetches RainViewer metadata from:

```text
https://api.rainviewer.com/public/weather-maps.json
```

The client loads raster tiles using the `host` and `path` values returned by RainViewer.

## Labels

RainViewer frames are labelled carefully:

| Frame type | UI label |
|---|---|
| `radar.past` | Observed radar |
| `radar.nowcast` | Short-term projection |

Do not call the radar layer an official warning or long-range forecast.

## Guardrails

- No Mapbox token is used.
- No unsupported wind/cloud/storm layers are shown.
- The map is client-only and should not block the server-rendered weather page.
- If RainViewer fails, Kunatu should keep public forecast guidance visible.
- The map should stay visually calm and aligned with Bawa Earth.
