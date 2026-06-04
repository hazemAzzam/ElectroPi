import { AuthSession } from "@/src/domain/auth";
import { AuthResponseDTO } from "@/src/infrastructure/dtos/auth-dto";

export class AuthResponseMapper {
  toDomain(dto: AuthResponseDTO): AuthSession {
    return {
      user: {
        id: dto.id,
        username: dto.username,
        email: dto.email,
        name: `${dto.firstName} ${dto.lastName}`.trim(),
        image: dto.image,
      },
      accessToken: dto.accessToken,
      refreshToken: dto.refreshToken,
    };
  }
}
