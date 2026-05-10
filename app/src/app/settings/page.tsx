export default function SettingsPage() {
  return (
    <main className="app-shell utility-shell">
      <section className="utility-panel">
        <p className="eyebrow">Settings</p>
        <h1>Weather preferences</h1>
        <p>Prepared for saved locations, language, and unit preferences once the Yan session adapter is live.</p>
        <div className="guidance-grid">
          <Preference title="Language" value="English now · Sinhala/Tamil mapped for CMS" />
          <Preference title="Temperature" value="Celsius" />
          <Preference title="Wind" value="km/h" />
        </div>
      </section>
    </main>
  );
}

function Preference({ title, value }: { title: string; value: string }) {
  return (
    <article className="guidance-item">
      <span>{title}</span>
      <p>{value}</p>
    </article>
  );
}
