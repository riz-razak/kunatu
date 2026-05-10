import { NextResponse } from "next/server";
import type { RainViewerResponse } from "@/lib/rainviewer";

const RAINVIEWER_URL = "https://api.rainviewer.com/public/weather-maps.json";

export const revalidate = 300;
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(RAINVIEWER_URL, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Rain radar metadata is unavailable." }, { status: 502 });
    }

    const data = (await response.json()) as RainViewerResponse;

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300",
      },
    });
  } catch {
    return NextResponse.json({ error: "Rain radar metadata is unavailable." }, { status: 502 });
  }
}
