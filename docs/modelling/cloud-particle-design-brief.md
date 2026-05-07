# Cloud And Particle Design Brief

Kunatu's weather visuals should feel atmospheric without becoming decorative noise. Cloud, rain, wind, and uncertainty visuals should map to weather meaning where possible.

## Visual Targets

- Cloud density fields for cover and storm build-up.
- Rain particles for intensity and direction.
- Wind vectors or streamlines for movement.
- Humidity/heat haze for discomfort and risk.
- Uncertainty texture for low-confidence forecast zones.

## Design Constraints

- Mobile-first performance.
- Clear distinction between observed and forecast layers.
- Low battery impact.
- Reduced-motion fallback.
- Works without expensive GPU assumptions.

## Physics-Inspired, Not Physics-Fake

The visual model can borrow from particle systems and fluid motion, but it must not pretend to be a scientific simulation unless it is backed by modelled data. The first production version should be honest: data-driven where possible, expressive where labelled as visualisation.
