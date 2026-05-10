import Link from "next/link";
import { getKunatuSession, hasRight } from "@/lib/auth";

const adminSections = [
  { href: "/admin/copy", title: "Copy and translations", right: "kunatu.copy.edit" as const },
  { href: "/admin/guidance", title: "Guidance rules", right: "kunatu.guidance.edit" as const },
  { href: "/admin/locations", title: "Locations", right: "kunatu.locations.manage" as const },
  { href: "/admin/sources", title: "Weather sources", right: "kunatu.sources.manage" as const },
];

export default async function AdminPage() {
  const session = await getKunatuSession();

  return (
    <main className="app-shell utility-shell">
      <section className="utility-panel">
        <p className="eyebrow">Admin</p>
        <h1>Kunatu control surface</h1>
        <p>Auth-ready scaffold for editors. Real access must be enforced by auth.yan.lk and a local HttpOnly session.</p>
        <div className="admin-list">
          {adminSections.map((section) => (
            <Link className="admin-row" href={section.href} key={section.href}>
              <span>{section.title}</span>
              <strong>{hasRight(session, section.right) ? "Ready" : "No right"}</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
