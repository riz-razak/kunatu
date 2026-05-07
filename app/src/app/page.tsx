const layers = [
  "Observed conditions",
  "Forecast uncertainty",
  "Cloud and rain particle field",
  "Wind vectors",
  "Sri Lanka advisory context",
];

export default function Home() {
  return (
    <main className="shell">
      <section className="hero" aria-labelledby="title">
        <p className="eyebrow">Kunatu rebuild phase 1</p>
        <h1 id="title">Sri Lanka weather intelligence, model first.</h1>
        <p className="lede">
          This scaffold is intentionally minimal while the weather model, data flow,
          and atmospheric visual language are defined.
        </p>
      </section>

      <section className="panel" aria-labelledby="layers">
        <h2 id="layers">Planned Intelligence Layers</h2>
        <ul>
          {layers.map((layer) => (
            <li key={layer}>{layer}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
