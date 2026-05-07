# Data Flow

Kunatu should move data through a clear chain before it reaches the interface.

```text
External sources
  -> source adapters
  -> normalised weather model
  -> interpretation layer
  -> visual/advisory layers
  -> public UI
```

## Source Adapter Duties

- Fetch data.
- Record source, timestamp, model, and forecast horizon.
- Preserve provider-specific fields when useful for audit.
- Map fields into internal schemas.

## Internal Model Duties

- Separate observed values from forecast values.
- Carry confidence or uncertainty fields where available.
- Keep units explicit.
- Preserve geographic precision.

## UI Duties

- Label the source and freshness of data.
- Avoid false precision.
- Show uncertainty where meaningful.
- Use advisory wording only when the source data supports it.
