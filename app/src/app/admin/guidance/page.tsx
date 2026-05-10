import { copyTokens } from "@/lib/copy";

export default function AdminGuidancePage() {
  const guidance = copyTokens.filter((token) => token.namespace === "guidance");

  return (
    <main className="app-shell utility-shell">
      <section className="utility-panel">
        <p className="eyebrow">Admin · Guidance</p>
        <h1>Practical weather suggestions</h1>
        <p>Rules are code-backed for now. CMS can edit message text later, not risk thresholds without review.</p>
        <div className="copy-table">
          {guidance.map((token) => (
            <article className="copy-row" key={token.key}>
              <span>{token.key}</span>
              <strong>{token.sourceEn}</strong>
              <small>{token.trigger ?? "fallback"}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
