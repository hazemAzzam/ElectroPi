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
