import {
  cities,
  fetchWeather,
  formatDateTime,
  formatHour,
  weatherLabel,
} from "@/lib/weather";
import { getCopy } from "@/lib/copy";
import RainViewerMap from "@/components/weather/RainViewerMap";

export default async function Home({ searchParams }: { searchParams?: { city?: string } }) {
  const selectedCity = cities.find((city) => city.id === searchParams?.city) ?? cities[0];
  const snapshot = await fetchWeather(selectedCity);
  const firstTwelveHours = snapshot.hourly.slice(0, 12);
  const primaryGuidance = snapshot.guidance[0];
  const maxRainChance = Math.max(...firstTwelveHours.map((hour) => hour.precipitationProbability));

  return (
    <main className="app-shell">
      <section className="hero-panel" aria-labelledby="title">
        <div className="hero-copy">
          <p className="eyebrow">{getCopy("home.eyebrow")}</p>
          <h1 id="title">{snapshot.advisory.title} in {snapshot.city.name}</h1>
          <p className="region">{snapshot.city.region}</p>
          <p className="lede">{primaryGuidance?.message ?? getCopy("guidance.low.check_again")}</p>
          <p className="disclaimer">{getCopy("home.disclaimer.short")}</p>
        </div>

        <form className="city-picker" action="/">
          <label htmlFor="city">{getCopy("home.location.label")}</label>
          <select id="city" name="city" defaultValue={snapshot.city.id} aria-label="Choose forecast location">
            {cities.map((city) => (
              <option value={city.id} key={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          <button type="submit">{getCopy("home.location.update")}</button>
        </form>
      </section>

      <section className="weather-grid" aria-label="Current weather and advisory">
        <article className="card current-card">
          <div className="card-header">
            <span>{getCopy("weather.now")}</span>
            <strong>{weatherLabel(snapshot.current.weatherCode)}</strong>
          </div>
          <div className="temperature-row">
            <span className="temperature">{Math.round(snapshot.current.temperature)}°</span>
            <span className="feels">{getCopy("weather.feels")} {Math.round(snapshot.current.apparentTemperature)}°C</span>
          </div>
          <div className="metrics-grid">
            <Metric label={getCopy("weather.metric.rain_chance")} value={`${snapshot.current.precipitationProbability}%`} />
            <Metric label={getCopy("weather.metric.rain_now")} value={`${snapshot.current.precipitation.toFixed(1)} mm`} />
            <Metric label={getCopy("weather.metric.humidity")} value={`${snapshot.current.humidity}%`} />
            <Metric label={getCopy("weather.metric.wind")} value={`${Math.round(snapshot.current.windSpeed)} km/h`} />
          </div>
        </article>

        <article className={`card advisory-card ${snapshot.advisory.level}`}>
          <div className="card-header">
            <span>{getCopy("weather.advisory.signal")}</span>
            <strong>{snapshot.advisory.level}</strong>
          </div>
          <h2>{snapshot.advisory.title}</h2>
          <p>{snapshot.advisory.message}</p>
          <div className="signal-row" aria-label="Quick weather signal">
            <span>{maxRainChance}% peak rain chance</span>
            <span>{Math.round(snapshot.current.windGust)} km/h gusts</span>
          </div>
        </article>
      </section>

      <section className="guidance-card" aria-labelledby="guidance-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{getCopy("guidance.section.eyebrow")}</p>
            <h2 id="guidance-title">{getCopy("guidance.section.title")}</h2>
          </div>
        </div>

        <div className="guidance-grid">
          {snapshot.guidance.map((suggestion) => (
            <article className={`guidance-item ${suggestion.severity}`} key={suggestion.id}>
              <span>{suggestion.title}</span>
              <p>{suggestion.message}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="forecast-card" aria-labelledby="forecast-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{getCopy("forecast.section.eyebrow")}</p>
            <h2 id="forecast-title">{getCopy("forecast.next12.title")}</h2>
            <p>{getCopy("forecast.next12.subtitle")}</p>
          </div>
          <p className="source">
            {snapshot.source} · {getCopy("source.updated")} {formatDateTime(snapshot.fetchedAt)}
          </p>
        </div>

        <div className="hourly-strip">
          {firstTwelveHours.map((hour) => (
            <article className="hour-card" key={hour.time}>
              <span>{formatHour(hour.time)}</span>
              <strong>{Math.round(hour.temperature)}°</strong>
              <div className="rain-bar" aria-label={`${hour.precipitationProbability}% rain chance`}>
                <span style={{ width: `${hour.precipitationProbability}%` }} />
              </div>
              <small>{hour.precipitationProbability}% rain</small>
              <small>{Math.round(hour.windSpeed)} km/h</small>
            </article>
          ))}
        </div>
      </section>

      <section className="atmosphere-card" aria-labelledby="atmosphere-title">
        <RainViewerMap />
        <div>
          <p className="eyebrow">{getCopy("radar.eyebrow")}</p>
          <h2 id="atmosphere-title">{getCopy("radar.title")}</h2>
          <p>{getCopy("radar.disclaimer")}</p>
        </div>
      </section>

      <footer className="source-footer">
        <strong>{snapshot.source}</strong>
        <span>{getCopy("source.updated")} {formatDateTime(snapshot.fetchedAt)}</span>
        <span>{getCopy("home.disclaimer.short")}</span>
      </footer>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
