# Weather Model Stack

Kunatu should begin with public weather sources and progressively add interpretation. Heavy modelling should not be introduced until the data pipeline and validation path are clear.

## Initial Source Classes

| Class | Examples | Use |
|---|---|---|
| Forecast APIs | Open-Meteo-backed ECMWF, GFS, ICON outputs | Temperature, rainfall probability, wind, pressure, humidity. |
| Radar/satellite | RainViewer or similar public feeds | Observed/near-real-time precipitation visual context. |
| Geographic context | Sri Lanka administrative, terrain, coastal context | Localised interpretation and risk framing. |

## Internal Concepts

- `ObservedWeather`: measurements or near-real-time remote sensing.
- `ForecastWeather`: model output for a future horizon.
- `AdvisorySignal`: interpreted risk or practical guidance.
- `UncertaintyBand`: confidence, model spread, or caution level.
- `AtmosphericLayer`: visual layer used by map or particle systems.

## First Principle

Do not collapse model output into advice. Advice is a separate layer that must say what evidence it uses.
