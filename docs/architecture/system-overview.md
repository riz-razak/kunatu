# System Overview

Kunatu is a weather intelligence product for Sri Lanka. The system should keep weather data, interpretation, and visualisation distinct so that users can tell the difference between what is observed, what is forecast, what is inferred, and what is advisory.

## Product Layers

| Layer | Purpose | Initial State |
|---|---|---|
| Data ingestion | Fetch public forecast, radar, satellite, and observation data. | Public APIs first. |
| Normalisation | Convert source-specific fields into stable internal shapes. | TypeScript schemas. |
| Interpretation | Convert model output into user-facing weather intelligence. | Rule-based first. |
| Visual model | Show cloud, rain, wind, and uncertainty as atmospheric layers. | Canvas/WebGL-ready plan. |
| Advisory | Explain practical risk and confidence in accessible language. | English first, Sinhala/Tamil after reviewed translation workflow. |

## Boundaries

- The public UI must not imply more certainty than the data supports.
- Forecast, observed, and advisory layers should be labelled separately.
- Visual particles must map to meaningful variables or be clearly decorative.
- API tokens and provider keys must not be committed.
