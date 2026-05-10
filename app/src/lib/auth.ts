export type KunatuRight =
  | "kunatu.admin.access"
  | "kunatu.copy.edit"
  | "kunatu.guidance.edit"
  | "kunatu.locations.manage"
  | "kunatu.sources.manage"
  | "kunatu.profile.manage"
  | "kunatu.alerts.manage"
  | "kunatu.content.publish";

export type KunatuSession = {
  authenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  product: "kunatu";
  membership: {
    status: "active" | "invited" | "paused" | "revoked";
    memberKind: "owner" | "admin" | "editor" | "viewer";
  } | null;
  rights: KunatuRight[];
  authBaseUrl: string;
  localSessionCookie: "__Host-kunatu_session";
};

export const kunatuAuthConfig = {
  productKey: "kunatu",
  clientId: "kunatu",
  callbackUrl: "https://kunatu.yan.lk/auth/callback",
  authBaseUrl: "https://auth.yan.lk",
  localSessionCookie: "__Host-kunatu_session",
  initialRights: [
    "kunatu.admin.access",
    "kunatu.copy.edit",
    "kunatu.guidance.edit",
    "kunatu.locations.manage",
    "kunatu.sources.manage",
    "kunatu.profile.manage",
  ] satisfies KunatuRight[],
};

export async function getKunatuSession(): Promise<KunatuSession> {
  return {
    authenticated: true,
    user: {
      id: "person_pending_auth_yan",
      email: "riz@dgtl.lk",
      name: "Riz Razak",
    },
    product: "kunatu",
    membership: {
      status: "active",
      memberKind: "admin",
    },
    rights: kunatuAuthConfig.initialRights,
    authBaseUrl: kunatuAuthConfig.authBaseUrl,
    localSessionCookie: "__Host-kunatu_session",
  };
}

export function hasRight(session: KunatuSession, right: KunatuRight) {
  return session.authenticated && session.membership?.status === "active" && session.rights.includes(right);
}
