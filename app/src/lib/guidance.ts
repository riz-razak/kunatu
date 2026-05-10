import { getCopy } from "./copy";
import type { CurrentWeather, HourlyForecast } from "./weather";

export type GuidanceCategory = "rain" | "heat" | "wind" | "roads" | "lifestyle" | "movement";

export type GuidanceSuggestion = {
  id: string;
  copyKey: string;
  category: GuidanceCategory;
  priority: number;
  severity: "low" | "watch" | "caution";
  title: string;
  message: string;
};

export function buildGuidance(current: CurrentWeather, hourly: HourlyForecast[]): GuidanceSuggestion[] {
  const nextThreeHours = hourly.slice(0, 3);
  const nextSixHours = hourly.slice(0, 6);
  const nextEightHours = hourly.slice(0, 8);
  const eveningHours = hourly.filter((hour) => {
    const hourOfDay = new Date(hour.time).getHours();
    return hourOfDay >= 17 && hourOfDay <= 22;
  });

  const maxRainThree = maxBy(nextThreeHours, (hour) => hour.precipitationProbability);
  const maxRainSix = Math.max(current.precipitationProbability, maxBy(nextSixHours, (hour) => hour.precipitationProbability));
  const maxRainEight = maxBy(nextEightHours, (hour) => hour.precipitationProbability);
  const rainAmountSix = nextSixHours.reduce((sum, hour) => sum + hour.precipitation, 0);
  const maxWind = Math.max(current.windSpeed, current.windGust, maxBy(nextSixHours, (hour) => hour.windSpeed));
  const humidHeat = current.apparentTemperature >= 31 && current.humidity >= 75;

  const suggestions: GuidanceSuggestion[] = [];

  if (maxRainSix >= 60 || rainAmountSix >= 1 || isRainCode(current.weatherCode)) {
    suggestions.push(makeSuggestion("umbrella-high", "guidance.umbrella.high", "rain", 90, "watch", "Umbrella"));
  } else if (maxRainSix >= 35) {
    suggestions.push(makeSuggestion("umbrella-light", "guidance.umbrella.light", "rain", 60, "low", "Maybe rain"));
  }

  if (current.precipitation >= 3 || maxRainSix >= 70 || rainAmountSix >= 5) {
    suggestions.push(makeSuggestion("roads-low-lying", "guidance.roads.low_lying", "roads", 95, "watch", "Roads"));
  }

  if (humidHeat || current.apparentTemperature >= 34) {
    suggestions.push(makeSuggestion("hydration", "guidance.hydration.hot_humid", "heat", 80, "caution", "Hydration"));
  }

  if (maxWind >= 35) {
    suggestions.push(makeSuggestion("wind-breezy", "guidance.wind.breezy", "wind", 75, "caution", "Wind"));
  }

  if (maxRainEight >= 40 || current.humidity >= 85 || isRainCode(current.weatherCode)) {
    suggestions.push(makeSuggestion("laundry-risk", "guidance.laundry.risky", "lifestyle", 45, "low", "Laundry"));
  }

  if (maxRainThree >= 60 || current.precipitation > 0) {
    suggestions.push(makeSuggestion("commute-rain", "guidance.commute.rain", "movement", 70, "watch", "Commute"));
  }

  const eveningLooksOkay = eveningHours.length > 0 && maxBy(eveningHours, (hour) => hour.precipitationProbability) < 40 && maxBy(eveningHours, (hour) => hour.windSpeed) < 30;
  if (eveningLooksOkay) {
    suggestions.push(makeSuggestion("evening-okay", "guidance.evening.okay", "movement", 35, "low", "Evening"));
  }

  if (suggestions.length === 0) {
    suggestions.push(makeSuggestion("check-again", "guidance.low.check_again", "movement", 10, "low", "Plan check"));
  }

  return suggestions.sort((a, b) => b.priority - a.priority).slice(0, 3);
}

function makeSuggestion(
  id: string,
  copyKey: string,
  category: GuidanceCategory,
  priority: number,
  severity: GuidanceSuggestion["severity"],
  title: string,
): GuidanceSuggestion {
  return {
    id,
    copyKey,
    category,
    priority,
    severity,
    title,
    message: getCopy(copyKey),
  };
}

function maxBy(items: HourlyForecast[], getValue: (hour: HourlyForecast) => number) {
  return items.length === 0 ? 0 : Math.max(...items.map(getValue));
}

function isRainCode(code: number) {
  return [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code);
}
