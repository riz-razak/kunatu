export type RainViewerFrame = {
  path: string;
  time: number;
};

export type RainViewerResponse = {
  version: string;
  generated: number;
  host: string;
  radar?: {
    past?: RainViewerFrame[];
    nowcast?: RainViewerFrame[];
  };
  satellite?: {
    infrared?: RainViewerFrame[];
  };
};

export type RadarFrame = RainViewerFrame & {
  kind: "observed" | "projection";
  labelKey: "radar.observed.label" | "radar.projection.label";
};

export function getRadarFrames(data: RainViewerResponse): RadarFrame[] {
  const past = data.radar?.past ?? [];
  const nowcast = data.radar?.nowcast ?? [];

  return [
    ...past.map((frame) => ({ ...frame, kind: "observed" as const, labelKey: "radar.observed.label" as const })),
    ...nowcast.map((frame) => ({ ...frame, kind: "projection" as const, labelKey: "radar.projection.label" as const })),
  ];
}

export function getRadarTileUrl(host: string, frame: RainViewerFrame, tileSize: 256 | 512) {
  return `${host}${frame.path}/${tileSize}/{z}/{x}/{y}/2/1_1.png`;
}

export function formatRadarTime(timestamp: number) {
  return new Intl.DateTimeFormat("en-LK", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(timestamp * 1000));
}
