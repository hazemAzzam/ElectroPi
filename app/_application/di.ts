import { AuthRepository } from "@/app/_infrastructure/_repositories/auth-repository";
import { CookieAuthRepository } from "@/app/_infrastructure/_repositories/cookie-auth-repository";
import { LoginUseCase } from "./_use-cases/login-use-case";
import { RegisterUseCase } from "./_use-cases/register-use-case";
import { VerifyUseCase } from "./_use-cases/verify-use-case";

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
