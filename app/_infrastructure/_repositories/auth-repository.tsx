import { apiService, ApiError } from "@/app/_services/api-service";
import { AuthResponseDTO, LoginRequestDTO } from "../_dtos/auth-dto";
import { AuthResponseMapper } from "../_mappers/auth-response-mapper";
import { AuthCredentials, AuthSession, AuthUser } from "@/app/_domain/auth";
import { AuthSource } from "@/app/_application/_interfaces/auth-source";

/**
 * Remote authentication source backed by the DummyJSON `/auth` API.
 */
export class AuthRepository implements AuthSource {
  private mapper = new AuthResponseMapper();

  async login(credentials: AuthCredentials): Promise<AuthSession | null> {
    try {
      const dto = await apiService.post<AuthResponseDTO>("/auth/login", {
        body: credentials satisfies LoginRequestDTO,
        auth: false,
        cache: "no-store",
      });
      return this.mapper.toDomain(dto);
    } catch (error) {
      // 400/401 → unrecognized credentials; let the caller fall back.
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        return null;
      }
      throw error;
    }
  }

  async verify(accessToken: string): Promise<AuthUser | null> {
    try {
      const dto = await apiService.get<AuthResponseDTO>("/auth/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
        auth: false,
        cache: "no-store",
      });
      return this.mapper.toDomain(dto).user;
    } catch (error) {
      if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        return null;
      }
      throw error;
    }
  }
}
