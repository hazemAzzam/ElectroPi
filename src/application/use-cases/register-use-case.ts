import { AuthUser, RegisterRequest } from "@/src/domain/auth";
import { UserRegistrar } from "@/src/application/interfaces/auth-source";

/**
 * Registers a new user. Registration is local-only: the user is persisted via
 * the injected registrar (the cookie store) so they can subsequently
 * authenticate through the cookie source.
 */
export class RegisterUseCase {
  constructor(private readonly registrar: UserRegistrar) {}

  execute(request: RegisterRequest): Promise<AuthUser> {
    return this.registrar.register(request);
  }
}
