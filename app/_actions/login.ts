"use server";

import { AuthRepository } from "../_infrastructure/_repositories/auth-repository";
import { AuthUser } from "../_domain/auth";
import { getErrorMessage } from "../_services/api-service";
import { setAuth } from "../_services/cookie-service";

export type LoginResult = { ok: true; user: AuthUser } | { ok: false; error: string };

export async function login(input: { username: string; password: string }): Promise<LoginResult> {
  const repository = new AuthRepository();

  try {
    const session = await repository.login({
      username: input.username,
      password: input.password,
    });

    await setAuth(session.accessToken);

    return { ok: true, user: session.user };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, "Invalid username or password.") };
  }
}
