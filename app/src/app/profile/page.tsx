import Link from "next/link";
import { getKunatuSession } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await getKunatuSession();

  return (
    <main className="app-shell utility-shell">
      <section className="utility-panel">
        <p className="eyebrow">Profile</p>
        <h1>{session.user?.name ?? "Signed-out user"}</h1>
        <p>{session.user?.email ?? "auth.yan.lk session pending"}</p>
        <div className="admin-list">
          <Info label="Membership" value={session.membership?.status ?? "none"} />
          <Info label="Kind" value={session.membership?.memberKind ?? "none"} />
          <Info label="Rights" value={`${session.rights.length} configured`} />
        </div>
        <Link className="text-link" href="/settings">Manage weather preferences</Link>
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
