import {
  AuthCredentials,
  AuthSession,
  AuthUser,
  RegisterRequest,
} from "@/src/domain/auth";
import {
  AuthSource,
  UserRegistrar,
} from "@/src/application/interfaces/auth-source";
import { StoredUserDTO } from "@/src/infrastructure/dtos/auth-dto";
import {
  getRegisteredUsers,
  setRegisteredUsers,
} from "@/src/infrastructure/services/cookie-service";
import {
  createLocalToken,
  readLocalToken,
} from "@/src/infrastructure/services/cookie-token-service";

/**
 * Local authentication source backed by an httpOnly cookie.
 *
 * Holds users created through the register flow (username + password) and mints
 * a local access token on a successful credential match. Used as the first auth
 * source so locally registered users work without hitting the remote API.
 */
export class CookieAuthRepository implements AuthSource, UserRegistrar {
  async register(request: RegisterRequest): Promise<AuthUser> {
    const users = await getRegisteredUsers();

    if (users.some((u) => u.username === request.username)) {
      throw new Error("That username is already registered.");
    }

    const stored: StoredUserDTO = {
      id: nextId(users),
      username: request.username,
      password: request.password,
      email: request.email,
      name: request.name,
    };

    await setRegisteredUsers([...users, stored]);
    return toAuthUser(stored);
  }

  async login(credentials: AuthCredentials): Promise<AuthSession | null> {
    const users = await getRegisteredUsers();
    const match = users.find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password,
    );
    if (!match) return null;

    const accessToken = createLocalToken(match.id);
    return {
      user: toAuthUser(match),
      accessToken,
      refreshToken: accessToken,
    };
  }

  async verify(accessToken: string): Promise<AuthUser | null> {
    const userId = readLocalToken(accessToken);
    if (userId === null) return null;

    const users = await getRegisteredUsers();
    const match = users.find((u) => u.id === userId);
    return match ? toAuthUser(match) : null;
  }
}

function toAuthUser(stored: StoredUserDTO): AuthUser {
  return {
    id: stored.id,
    username: stored.username,
    email: stored.email,
    name: stored.name,
    image: "",
  };
}

function nextId(users: StoredUserDTO[]): number {
  // Keep local ids clear of the remote API's id space.
  const LOCAL_ID_BASE = 1_000_000;
  return users.reduce((max, u) => Math.max(max, u.id), LOCAL_ID_BASE) + 1;
}
