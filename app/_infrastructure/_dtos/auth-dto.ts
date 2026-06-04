export interface LoginRequestDTO {
  username: string;
  password: string;
  expiresInMins?: number;
}

/** A locally registered user persisted in the cookie store. */
export interface StoredUserDTO {
  id: number;
  username: string;
  password: string;
  email: string;
  name: string;
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
