import { apiService } from "@/app/_services/api-service";
import { AuthResponseDTO, LoginRequestDTO } from "../_dtos/auth-dto";
import { AuthResponseMapper } from "../_mappers/auth-response-mapper";
import { AuthSession, AuthUser } from "@/app/_domain/auth";

export class AuthRepository {
  private mapper = new AuthResponseMapper();

  async login(credentials: LoginRequestDTO): Promise<AuthSession> {
    const dto = await apiService.post<AuthResponseDTO>("/auth/login", {
      body: credentials,
      auth: false,
      cache: "no-store",
    });
    return this.mapper.toDomain(dto);
  }

  async me(): Promise<AuthUser> {
    const dto = await apiService.get<AuthResponseDTO>("/auth/me", {
      cache: "no-store",
    });
    return this.mapper.toDomain(dto).user;
  }
}
