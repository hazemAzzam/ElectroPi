"use server";

import { container } from "../_application/di";
import { AuthUser } from "../_domain/auth";
import { getErrorMessage } from "../_services/api-service";
import { setAuth } from "../_services/cookie-service";

export type LoginResult = { ok: true; user: AuthUser } | { ok: false; error: string };

export async function login(input: { username: string; password: string }): Promise<LoginResult> {
  try {
    const session = await container.loginUseCase.execute({
      username: input.username,
      password: input.password,
    });

    if (!session) {
      return { ok: false, error: "Invalid username or password." };
    }

    await setAuth(session.accessToken);

    return { ok: true, user: session.user };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, "Invalid username or password.") };
  }
}
