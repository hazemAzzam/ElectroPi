"use server";

import { AuthRepository } from "../_infrastructure/_repositories/auth-repository";
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
    return await new AuthRepository().me();
  } catch {
    await clearAuth();
    return null;
  }
}
