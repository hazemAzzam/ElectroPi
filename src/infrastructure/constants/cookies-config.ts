export const COOKIES = {
  AUTH_TOKEN: {
    name: "auth-token",
    options: { path: "/", maxAge: 60 * 60 * 24 * 7, httpOnly: true },
  },
  /** Locally registered users (username + password), used by the cookie auth source. */
  USERS: {
    name: "registered-users",
    options: { path: "/", maxAge: 60 * 60 * 24 * 30, httpOnly: true },
  },
} as const;
