import { copyTokens } from "@/lib/copy";

export default function AdminCopyPage() {
  return (
    <main className="app-shell utility-shell">
      <section className="utility-panel">
        <p className="eyebrow">Admin · CMS</p>
        <h1>Copy and translations</h1>
        <p>Copy keys are ready for LLM draft, Google NMT baseline, and team review in the future CMS.</p>
        <div className="copy-table">
          {copyTokens.map((token) => (
            <article className="copy-row" key={token.key}>
              <span>{token.key}</span>
              <strong>{token.sourceEn}</strong>
              <small>{token.status} · {token.namespace}</small>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
