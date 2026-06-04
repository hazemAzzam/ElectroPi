export interface AuthUser {
  id: number;
  username: string;
  email: string;
  name: string;
  image: string;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  name: string;
}
