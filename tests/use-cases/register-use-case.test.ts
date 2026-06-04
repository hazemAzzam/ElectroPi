import { describe, expect, it, vi } from "vitest";
import { RegisterUseCase } from "@/src/application/use-cases/register-use-case";
import { AuthUser, RegisterRequest } from "@/src/domain/auth";
import { UserRegistrar } from "@/src/application/interfaces/auth-source";

const request: RegisterRequest = {
  username: "newuser",
  password: "pw",
  email: "new@x.com",
  name: "New User",
};

const created: AuthUser = {
  id: 99,
  username: "newuser",
  email: "new@x.com",
  name: "New User",
  image: "",
};

describe("RegisterUseCase", () => {
  it("delegates registration to the injected registrar", async () => {
    const registrar: UserRegistrar = {
      register: vi.fn().mockResolvedValue(created),
    };
    const useCase = new RegisterUseCase(registrar);

    await expect(useCase.execute(request)).resolves.toEqual(created);
    expect(registrar.register).toHaveBeenCalledWith(request);
  });
});
