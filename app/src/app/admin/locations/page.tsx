import { cities } from "@/lib/weather";

export default function AdminLocationsPage() {
  return (
    <main className="app-shell utility-shell">
      <section className="utility-panel">
        <p className="eyebrow">Admin · Locations</p>
        <h1>Location registry</h1>
        <p>Current phase uses a fixed Sri Lanka city list. District expansion and CMS validation can follow.</p>
        <div className="admin-list">
          {cities.map((city) => (
            <div className="admin-row" key={city.id}>
              <span>{city.name}</span>
              <strong>{city.region}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
