import {
  AuthCredentials,
  AuthSession,
  AuthUser,
  RegisterRequest,
} from "@/src/domain/auth";

/**
 * Port for credential-based authentication sources. Implemented by both the
 * remote API ({@link AuthRepository}) and the local cookie store
 * ({@link CookieAuthRepository}) so use cases can depend on the abstraction.
 */
export interface AuthSource {
  /**
   * Authenticate the given credentials. Returns a session on success, or `null`
   * when this source does not recognize the credentials (so the caller can fall
   * back to another source).
   */
  login(credentials: AuthCredentials): Promise<AuthSession | null>;

  /**
   * Resolve the user for a previously issued access token, or `null` when this
   * source did not issue / no longer recognizes the token.
   */
  verify(accessToken: string): Promise<AuthUser | null>;
}

/**
 * Port for persisting newly registered users. Implemented by the cookie store
 * ({@link CookieAuthRepository}).
 */
export interface UserRegistrar {
  register(request: RegisterRequest): Promise<AuthUser>;
}
