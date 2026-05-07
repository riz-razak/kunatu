# Stack Decision

Recommended stack: Next.js + TypeScript + MapLibre-compatible maps + Canvas/WebGL-ready visual layer.

## Decision

Use Next.js for the app shell and deployment path, TypeScript for weather-data safety, and a MapLibre-compatible map layer to avoid tying the core architecture to a single commercial map provider.

## Why Not A Simpler Static App

A static Vite app would be fast, but Kunatu is likely to need API routes, server-side data shaping, cache controls, and public deployment previews. Next.js gives those paths without requiring a separate backend now.

## Why Not A Heavy Simulation Engine First

Three.js or Babylon.js may become useful for cloud and particle experiments, but they should not define the whole product architecture. The main app should stay usable and fast on mobile. Simulation belongs in a dedicated visual layer.

## Initial Dependencies

- Next.js
- React
- TypeScript

Map and visual dependencies should be added only when the first prototype requires them.
