# Uncertainty Model

Weather confidence should be visible. A clean interface that hides uncertainty is less useful than a slightly more complex interface that explains forecast limits.

## Initial Uncertainty Signals

- Forecast horizon: confidence generally drops further out.
- Model agreement: future layer if multiple models are available.
- Rain probability versus rain amount.
- Radar-observed rain versus forecast rain.
- Location precision.

## User-Facing Labels

- High confidence: current or near-term pattern supported by recent data.
- Medium confidence: plausible forecast but monitor updates.
- Low confidence: conditions may change or source data is weak.

These labels need validation before public use as formal warnings.
