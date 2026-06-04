"use server";

import { container } from "../_application/di";
import { AuthUser } from "../_domain/auth";
import { getAuth, clearAuth } from "../_services/cookie-service";

/**
 * Resolves the logged-in user from the stored access token, or `null` if there
 * is no valid session. Clears a stale/invalid token as a side effect.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = await getAuth();
  if (!token) return null;

  try {
    const user = await container.verifyUseCase.execute(token);
    if (!user) {
      await clearAuth();
      return null;
    }
    return user;
  } catch {
    return null;
  }
}
