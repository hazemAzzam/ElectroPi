import { AuthCredentials, AuthSession } from "@/src/domain/auth";
import { AuthSource } from "@/src/application/interfaces/auth-source";

/**
 * Authenticates a user against an ordered list of auth sources.
 *
 * Locally registered users (cookie source) are tried first; if none recognizes
 * the credentials we fall back to the remote API. Sources are injected (see the
 * DI container) so the ordering / set of sources lives in one place.
 */
export class LoginUseCase {
  constructor(private readonly sources: AuthSource[]) {}

  async execute(credentials: AuthCredentials): Promise<AuthSession | null> {
    for (const source of this.sources) {
      const session = await source.login(credentials);
      if (session) return session;
    }
    return null;
  }
}
