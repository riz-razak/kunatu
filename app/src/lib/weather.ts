export type City = {
  id: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
};

export type CurrentWeather = {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitationProbability: number;
  precipitation: number;
  windSpeed: number;
  windGust: number;
  weatherCode: number;
  observedAt: string;
};

export type HourlyForecast = {
  time: string;
  temperature: number;
  precipitationProbability: number;
  precipitation: number;
  windSpeed: number;
  weatherCode: number;
};

export type AdvisorySignal = {
  level: "low" | "watch" | "caution";
  title: string;
  message: string;
};

export type WeatherSnapshot = {
  city: City;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  advisory: AdvisorySignal;
  source: string;
  fetchedAt: string;
};

type OpenMeteoResponse = {
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_gusts_10m: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation_probability: number[];
    precipitation: number[];
    weather_code: number[];
    wind_speed_10m: number[];
  };
};

export const cities: City[] = [
  { id: "colombo", name: "Colombo", region: "Western coast", latitude: 6.9271, longitude: 79.8612 },
  { id: "kandy", name: "Kandy", region: "Central hills", latitude: 7.2906, longitude: 80.6337 },
  { id: "galle", name: "Galle", region: "Southern coast", latitude: 6.0535, longitude: 80.221 },
  { id: "jaffna", name: "Jaffna", region: "Northern peninsula", latitude: 9.6615, longitude: 80.0255 },
  { id: "batticaloa", name: "Batticaloa", region: "Eastern coast", latitude: 7.7102, longitude: 81.6924 },
  { id: "anuradhapura", name: "Anuradhapura", region: "North Central dry zone", latitude: 8.3114, longitude: 80.4037 },
  { id: "nuwara-eliya", name: "Nuwara Eliya", region: "Highlands", latitude: 6.9497, longitude: 80.7891 },
];

export function weatherLabel(code: number) {
  if (code === 0) return "Clear";
  if ([1, 2, 3].includes(code)) return "Cloudy intervals";
  if ([45, 48].includes(code)) return "Mist or fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rain";
  if ([95, 96, 99].includes(code)) return "Thunderstorm risk";
  return "Changing conditions";
}

export function buildAdvisory(current: CurrentWeather, hourly: HourlyForecast[]): AdvisorySignal {
  const nextSixHours = hourly.slice(0, 6);
  const maxRainChance = Math.max(current.precipitationProbability, ...nextSixHours.map((hour) => hour.precipitationProbability));
  const maxWind = Math.max(current.windSpeed, current.windGust, ...nextSixHours.map((hour) => hour.windSpeed));
  const feelsHot = current.apparentTemperature >= 34 || (current.apparentTemperature >= 31 && current.humidity >= 75);

  if (maxRainChance >= 70 || current.precipitation >= 3) {
    return {
      level: "watch",
      title: "Rain watch",
      message: "Rain is likely in the next few hours. Keep plans flexible and watch low-lying roads if showers intensify.",
    };
  }

  if (maxWind >= 35) {
    return {
      level: "caution",
      title: "Wind caution",
      message: "Winds may feel strong or gusty. Check exposed coastal, hill, or open-road conditions before travel.",
    };
  }

  if (feelsHot) {
    return {
      level: "caution",
      title: "Heat and humidity caution",
      message: "It may feel hotter than the air temperature. Hydrate and avoid long exposure during the warmest hours.",
    };
  }

  return {
    level: "low",
    title: "No strong signal",
    message: "No major rain, wind, or heat signal is visible in this quick forecast window. Recheck before outdoor plans.",
  };
}

export async function fetchWeather(city: City): Promise<WeatherSnapshot> {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    timezone: "Asia/Colombo",
    forecast_days: "2",
    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
      "wind_gusts_10m",
    ].join(","),
    hourly: [
      "temperature_2m",
      "precipitation_probability",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
    ].join(","),
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, {
    next: { revalidate: 900 },
  });

  if (!response.ok) {
    throw new Error("Weather data is temporarily unavailable.");
  }

  const data = (await response.json()) as OpenMeteoResponse;
  const now = new Date(data.current.time).getTime();
  const upcomingIndexes = data.hourly.time
    .map((time, index) => ({ time: new Date(time).getTime(), index }))
    .filter((entry) => entry.time >= now)
    .slice(0, 24)
    .map((entry) => entry.index);

  const current: CurrentWeather = {
    temperature: data.current.temperature_2m,
    apparentTemperature: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    precipitationProbability: data.hourly.precipitation_probability[upcomingIndexes[0]] ?? 0,
    precipitation: data.current.precipitation,
    windSpeed: data.current.wind_speed_10m,
    windGust: data.current.wind_gusts_10m,
    weatherCode: data.current.weather_code,
    observedAt: data.current.time,
  };

  const hourly = upcomingIndexes.map((index) => ({
    time: data.hourly.time[index],
    temperature: data.hourly.temperature_2m[index],
    precipitationProbability: data.hourly.precipitation_probability[index],
    precipitation: data.hourly.precipitation[index],
    windSpeed: data.hourly.wind_speed_10m[index],
    weatherCode: data.hourly.weather_code[index],
  }));

  return {
    city,
    current,
    hourly,
    advisory: buildAdvisory(current, hourly),
    source: "Open-Meteo forecast API",
    fetchedAt: new Date().toISOString(),
  };
}

export function formatHour(value: string) {
  return new Intl.DateTimeFormat("en-LK", { hour: "numeric", hour12: true }).format(new Date(value));
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-LK", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}
