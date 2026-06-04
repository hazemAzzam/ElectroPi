export const COOKIES = {
  AUTH_TOKEN: {
    name: "auth-token",
    options: { path: "/", maxAge: 60 * 60 * 24 * 7, httpOnly: true },
  },
} as const;
