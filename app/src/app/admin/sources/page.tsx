export default function AdminSourcesPage() {
  return (
    <main className="app-shell utility-shell">
      <section className="utility-panel">
        <p className="eyebrow">Admin · Sources</p>
        <h1>Weather source registry</h1>
        <p>Source transparency for public trust. New sources should not appear in UI until wired and labelled.</p>
        <div className="admin-list">
          <div className="admin-row">
            <span>Open-Meteo forecast API</span>
            <strong>Active · public forecast</strong>
          </div>
          <div className="admin-row">
            <span>RainViewer</span>
            <strong>Planned · radar layer</strong>
          </div>
          <div className="admin-row">
            <span>Official warning feed</span>
            <strong>Not connected</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
