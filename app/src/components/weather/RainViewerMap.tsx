"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { type Map as MapLibreMap } from "maplibre-gl";
import {
  formatRadarTime,
  getRadarFrames,
  getRadarTileUrl,
  type RadarFrame,
  type RainViewerResponse,
} from "@/lib/rainviewer";
import { getCopy } from "@/lib/copy";

type RadarState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; host: string; frames: RadarFrame[]; position: number };

const RADAR_OPACITY = 0.74;
const ANIMATION_DELAY = 650;

export default function RainViewerMap() {
  const mapNode = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadedPositions = useRef(new Set<number>());
  const currentLayerRef = useRef<string | null>(null);
  const stateRef = useRef<RadarState>({ status: "loading" });
  const [radar, setRadar] = useState<RadarState>({ status: "loading" });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    stateRef.current = radar;
  }, [radar]);

  useEffect(() => {
    let cancelled = false;

    async function loadRadar() {
      try {
        const response = await fetch("/api/rainviewer");
        if (!response.ok) throw new Error("Rain radar is temporarily unavailable.");

        const data = (await response.json()) as RainViewerResponse;
        const frames = getRadarFrames(data);

        if (!data.host || frames.length === 0) {
          throw new Error("Rain radar has no available frames right now.");
        }

        if (!cancelled) {
          const latestObserved = frames.reduce((latest, frame, index) => (frame.kind === "observed" ? index : latest), -1);
          setRadar({ status: "ready", host: data.host, frames, position: Math.max(latestObserved, 0) });
        }
      } catch (error) {
        if (!cancelled) {
          setRadar({ status: "error", message: error instanceof Error ? error.message : "Rain radar is temporarily unavailable." });
        }
      }
    }

    loadRadar();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!mapNode.current || mapRef.current) return;

    const loadedFramePositions = loadedPositions.current;

    const map = new maplibregl.Map({
      container: mapNode.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "© OpenStreetMap contributors",
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
            paint: { "raster-saturation": -0.28, "raster-contrast": -0.08, "raster-brightness-max": 0.92 },
          },
        ],
      },
      center: [80.7, 7.8],
      zoom: 6.55,
      minZoom: 5.6,
      maxZoom: 10,
      attributionControl: false,
    });

    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right");
    mapRef.current = map;

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      map.remove();
      mapRef.current = null;
      loadedFramePositions.clear();
      currentLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (radar.status !== "ready" || !mapRef.current) return;

    if (mapRef.current.loaded()) {
      showFrame(radar.position);
      return;
    }

    mapRef.current.once("load", () => showFrame(radar.position));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radar.status]);

  function stop() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsPlaying(false);
  }

  function scheduleNext() {
    timerRef.current = setTimeout(() => {
      const current = stateRef.current;
      if (current.status !== "ready") return;
      showFrame(current.position + 1, true);
    }, ANIMATION_DELAY);
  }

  function showFrame(rawPosition: number, keepPlaying = false) {
    const map = mapRef.current;
    const current = stateRef.current;
    if (!map || current.status !== "ready") return;

    const position = wrapPosition(rawPosition, current.frames.length);
    const frame = current.frames[position];
    const tileSize = window.devicePixelRatio >= 2 ? 512 : 256;
    const sourceId = `radar-${position}`;
    const layerId = `radar-layer-${position}`;
    const oldLayerId = currentLayerRef.current;

    if (!loadedPositions.current.has(position)) {
      map.addSource(sourceId, {
        type: "raster",
        tiles: [getRadarTileUrl(current.host, frame, tileSize)],
        tileSize: 256,
        maxzoom: 8,
      });

      map.addLayer({
        id: layerId,
        type: "raster",
        source: sourceId,
        paint: {
          "raster-opacity": 0,
          "raster-fade-duration": 0,
        },
      });

      loadedPositions.current.add(position);
    }

    if (oldLayerId && oldLayerId !== layerId && map.getLayer(oldLayerId)) {
      map.setPaintProperty(oldLayerId, "raster-opacity", 0);
    }
    if (map.getLayer(layerId)) {
      map.setPaintProperty(layerId, "raster-opacity", RADAR_OPACITY);
    }

    currentLayerRef.current = layerId;
    setRadar({ ...current, position });

    if (keepPlaying) scheduleNext();
  }

  function step(offset: number) {
    stop();
    const current = stateRef.current;
    if (current.status === "ready") showFrame(current.position + offset);
  }

  function togglePlayback() {
    const current = stateRef.current;
    if (current.status !== "ready") return;

    if (isPlaying) {
      stop();
      return;
    }

    setIsPlaying(true);
    showFrame(current.position + 1, true);
  }

  const activeFrame = radar.status === "ready" ? radar.frames[radar.position] : null;

  return (
    <div className="radar-shell">
      <div className="radar-map" ref={mapNode} aria-label="RainViewer radar map centered on Sri Lanka" />
      <div className="radar-toolbar">
        <div>
          <span>{activeFrame ? getCopy(activeFrame.labelKey) : getCopy("radar.eyebrow")}</span>
          <strong>{activeFrame ? formatRadarTime(activeFrame.time) : radar.status === "error" ? getCopy("radar.status.unavailable") : getCopy("radar.status.loading")}</strong>
        </div>
        <div className="radar-controls" aria-label="Rain radar timeline controls">
          <button type="button" onClick={() => step(-1)} disabled={radar.status !== "ready"}>
            {getCopy("radar.control.previous")}
          </button>
          <button type="button" onClick={togglePlayback} disabled={radar.status !== "ready"}>
            {isPlaying ? getCopy("radar.control.pause") : getCopy("radar.control.play")}
          </button>
          <button type="button" onClick={() => step(1)} disabled={radar.status !== "ready"}>
            {getCopy("radar.control.next")}
          </button>
        </div>
      </div>
      {radar.status === "error" ? <p className="radar-error">{radar.message}</p> : null}
    </div>
  );
}

function wrapPosition(position: number, frameCount: number) {
  if (frameCount === 0) return 0;
  if (position >= frameCount) return 0;
  if (position < 0) return frameCount - 1;
  return position;
}
