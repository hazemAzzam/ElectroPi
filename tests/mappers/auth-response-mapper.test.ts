import { describe, expect, it } from "vitest";
import { AuthResponseMapper } from "@/src/infrastructure/mappers/auth-response-mapper";
import { AuthResponseDTO } from "@/src/infrastructure/dtos/auth-dto";

const dto: AuthResponseDTO = {
  id: 1,
  username: "emilys",
  email: "emily@x.com",
  firstName: "Emily",
  lastName: "Stone",
  gender: "female",
  image: "https://example.com/avatar.png",
  accessToken: "access-123",
  refreshToken: "refresh-456",
};

describe("AuthResponseMapper", () => {
  const mapper = new AuthResponseMapper();

  it("maps a DTO to an auth session", () => {
    const session = mapper.toDomain(dto);
    expect(session).toEqual({
      user: {
        id: 1,
        username: "emilys",
        email: "emily@x.com",
        name: "Emily Stone",
        image: "https://example.com/avatar.png",
      },
      accessToken: "access-123",
      refreshToken: "refresh-456",
    });
  });

  it("composes the display name from first and last name", () => {
    expect(mapper.toDomain(dto).user.name).toBe("Emily Stone");
  });

  it("trims when a name part is missing", () => {
    expect(mapper.toDomain({ ...dto, lastName: "" }).user.name).toBe("Emily");
  });
});
