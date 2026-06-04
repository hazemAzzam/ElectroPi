export interface LoginRequestDTO {
  username: string;
  password: string;
  /** DummyJSON access-token lifetime in minutes. Defaults to 60. */
  expiresInMins?: number;
}

export interface AuthResponseDTO {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
