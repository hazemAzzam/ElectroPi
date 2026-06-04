import { describe, expect, it, vi } from "vitest";
import { LoginUseCase } from "@/src/application/use-cases/login-use-case";
import { AuthSession } from "@/src/domain/auth";
import { AuthSource } from "@/src/application/interfaces/auth-source";

const credentials = { username: "emilys", password: "secret" };

const session: AuthSession = {
  user: { id: 1, username: "emilys", email: "e@x.com", name: "Emily", image: "" },
  accessToken: "a",
  refreshToken: "r",
};

/** Build a mock auth source whose login resolves to the given session (or null). */
function source(loginResult: AuthSession | null): AuthSource {
  return {
    login: vi.fn().mockResolvedValue(loginResult),
    verify: vi.fn().mockResolvedValue(null),
  };
}

describe("LoginUseCase", () => {
  it("returns the session from the first source that recognizes the credentials", async () => {
    const first = source(session);
    const second = source(null);
    const useCase = new LoginUseCase([first, second]);

    await expect(useCase.execute(credentials)).resolves.toEqual(session);
    // Second source should never be consulted once the first succeeds.
    expect(second.login).not.toHaveBeenCalled();
  });

  it("falls back to the next source when the first returns null", async () => {
    const first = source(null);
    const second = source(session);
    const useCase = new LoginUseCase([first, second]);

    await expect(useCase.execute(credentials)).resolves.toEqual(session);
    expect(first.login).toHaveBeenCalledWith(credentials);
    expect(second.login).toHaveBeenCalledWith(credentials);
  });

  it("returns null when no source recognizes the credentials", async () => {
    const useCase = new LoginUseCase([source(null), source(null)]);
    await expect(useCase.execute(credentials)).resolves.toBeNull();
  });

  it("returns null with no sources configured", async () => {
    const useCase = new LoginUseCase([]);
    await expect(useCase.execute(credentials)).resolves.toBeNull();
  });
});
