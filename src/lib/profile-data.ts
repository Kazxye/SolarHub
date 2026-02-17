/* ─────────────────────────────────────────────────
   Profile Data — types, mocks, API stubs
   ───────────────────────────────────────────────── */

/* ── Types ── */

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  avatarUrl?: string;
}

/* ── API Stubs — swap for real fetch later ── */

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** GET /api/me */
export async function fetchProfile(): Promise<UserProfile> {
  await wait(500);
  return {
    id: "usr_001",
    name: "Jogador",
    email: "jogador@email.com",
    createdAt: "2024-08-15T00:00:00Z",
  };
}

/** PATCH /api/me */
export async function updateProfile(
    payload: { name: string; email: string }
): Promise<{ ok: boolean; error?: string }> {
  await wait(900);
  console.log("[api] updateProfile:", payload);
  return { ok: true };
}

/** POST /api/me/change-password */
export async function changePassword(
    payload: { currentPassword: string; newPassword: string }
): Promise<{ ok: boolean; error?: string }> {
  await wait(900);
  console.log("[api] changePassword");
  return { ok: true };
}