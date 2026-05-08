import {
  cities,
  fetchWeather,
  formatDateTime,
  formatHour,
  weatherLabel,
} from "@/lib/weather";

export default async function Home({ searchParams }: { searchParams?: { city?: string } }) {
  const selectedCity = cities.find((city) => city.id === searchParams?.city) ?? cities[0];
  const snapshot = await fetchWeather(selectedCity);
  const firstTwelveHours = snapshot.hourly.slice(0, 12);

  return (
    <main className="app-shell">
      <section className="hero-panel" aria-labelledby="title">
        <div className="hero-copy">
          <p className="eyebrow">Kunatu · Yan public beta</p>
          <h1 id="title">{snapshot.city.name}</h1>
          <p className="region">{snapshot.city.region}</p>
          <p className="lede">
            Island weather guidance for Sri Lanka, tuned for rain, wind, and practical movement. This is not an official warning.
          </p>
        </div>

        <form className="city-picker" action="/">
          <label htmlFor="city">Location</label>
          <select id="city" name="city" defaultValue={snapshot.city.id} aria-label="Choose forecast location">
            {cities.map((city) => (
              <option value={city.id} key={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          <button type="submit">Update</button>
        </form>
      </section>

      <section className="weather-grid" aria-label="Current weather and advisory">
        <article className="card current-card">
          <div className="card-header">
            <span>Now</span>
            <strong>{weatherLabel(snapshot.current.weatherCode)}</strong>
          </div>
          <div className="temperature-row">
            <span className="temperature">{Math.round(snapshot.current.temperature)}°</span>
            <span className="feels">Feels {Math.round(snapshot.current.apparentTemperature)}°C</span>
          </div>
          <div className="metrics-grid">
            <Metric label="Rain chance" value={`${snapshot.current.precipitationProbability}%`} />
            <Metric label="Rain now" value={`${snapshot.current.precipitation.toFixed(1)} mm`} />
            <Metric label="Humidity" value={`${snapshot.current.humidity}%`} />
            <Metric label="Wind" value={`${Math.round(snapshot.current.windSpeed)} km/h`} />
          </div>
        </article>

        <article className={`card advisory-card ${snapshot.advisory.level}`}>
          <div className="card-header">
            <span>Advisory signal</span>
            <strong>{snapshot.advisory.level}</strong>
          </div>
          <h2>{snapshot.advisory.title}</h2>
          <p>{snapshot.advisory.message}</p>
        </article>
      </section>

      <section className="forecast-card" aria-labelledby="forecast-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Next 12 hours</p>
            <h2 id="forecast-title">Rain, wind, and temperature</h2>
          </div>
          <p className="source">
            {snapshot.source} · Updated {formatDateTime(snapshot.fetchedAt)}
          </p>
        </div>

        <div className="hourly-strip">
          {firstTwelveHours.map((hour) => (
            <article className="hour-card" key={hour.time}>
              <span>{formatHour(hour.time)}</span>
              <strong>{Math.round(hour.temperature)}°</strong>
              <small>{hour.precipitationProbability}% rain</small>
              <small>{Math.round(hour.windSpeed)} km/h</small>
            </article>
          ))}
        </div>
      </section>

      <section className="atmosphere-card" aria-labelledby="atmosphere-title">
        <div className="atmosphere-visual" aria-hidden="true">
          <span className="orb one" />
          <span className="orb two" />
          <span className="rain-line a" />
          <span className="rain-line b" />
          <span className="rain-line c" />
        </div>
        <div>
          <p className="eyebrow">Map track</p>
          <h2 id="atmosphere-title">Rain layer next</h2>
          <p>
            The next build round should turn this panel into a meaningful rain, wind, and uncertainty layer for the island.
          </p>
        </div>
      </section>
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
