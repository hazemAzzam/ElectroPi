"use server";

import { container } from "../_application/di";
import { getErrorMessage } from "../_services/api-service";

export type RegisterResult = { ok: true } | { ok: false; error: string };

export async function register(input: { username: string; password: string; email: string; name: string }): Promise<RegisterResult> {
  try {
    await container.registerUseCase.execute({
      username: input.username.trim(),
      password: input.password,
      email: input.email.trim(),
      name: input.name.trim(),
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, error: getErrorMessage(error, "Registration failed. Please try again.") };
  }
}
