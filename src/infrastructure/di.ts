import { AuthRepository } from "@/src/infrastructure/repositories/auth-repository";
import { CookieAuthRepository } from "@/src/infrastructure/repositories/cookie-auth-repository";
import { LoginUseCase } from "@/src/application/use-cases/login-use-case";
import { RegisterUseCase } from "@/src/application/use-cases/register-use-case";
import { VerifyUseCase } from "@/src/application/use-cases/verify-use-case";

// --- Repositories ---
const authRepository = new AuthRepository();
const cookieAuthRepository = new CookieAuthRepository();

// Ordered auth sources: local cookie store first, remote API second.
const authSources = [cookieAuthRepository, authRepository];

// --- Use cases ---
const loginUseCase = new LoginUseCase(authSources);
const verifyUseCase = new VerifyUseCase(authSources);
const registerUseCase = new RegisterUseCase(cookieAuthRepository);

export const container = {
  authRepository,
  cookieAuthRepository,
  loginUseCase,
  verifyUseCase,
  registerUseCase,
};
