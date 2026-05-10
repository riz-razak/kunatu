import Link from "next/link";
import { getKunatuSession, kunatuAuthConfig } from "@/lib/auth";

export default async function AccountPage() {
  const session = await getKunatuSession();

  return (
    <main className="app-shell utility-shell">
      <section className="utility-panel">
        <p className="eyebrow">Kunatu account</p>
        <h1>Account shell</h1>
        <p>
          Kunatu is wired for the Yan auth contract. This page is ready for the local session handoff, but it does not add a separate identity silo.
        </p>
        <div className="admin-list">
          <Info label="Product key" value={kunatuAuthConfig.productKey} />
          <Info label="Client ID" value={kunatuAuthConfig.clientId} />
          <Info label="Callback" value={kunatuAuthConfig.callbackUrl} />
          <Info label="Local session" value={session.localSessionCookie} />
        </div>
        <Link className="text-link" href="/profile">View profile shell</Link>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="admin-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
