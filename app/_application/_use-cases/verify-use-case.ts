import { AuthUser } from "@/app/_domain/auth";
import { AuthSource } from "../_interfaces/auth-source";

/**
 * Resolves the user for an access token by asking each auth source in turn.
 *
 * The cookie source recognizes locally-issued tokens; the remote API verifies
 * its own JWTs. The first source to recognize the token wins. Sources are
 * injected (see the DI container).
 */
export class VerifyUseCase {
  constructor(private readonly sources: AuthSource[]) {}

  async execute(accessToken: string): Promise<AuthUser | null> {
    for (const source of this.sources) {
      const user = await source.verify(accessToken);
      if (user) return user;
    }
    return null;
  }
}
