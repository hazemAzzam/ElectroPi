/**
 * Local access-token codec for the cookie auth source.
 *
 * The remote API issues real JWTs; for locally registered users we mint a
 * self-describing token that simply encodes the user id. It is prefixed so the
 * use cases can tell local tokens apart from remote ones, and base64url-encoded
 * so it is safe to store in a cookie.
 */
const LOCAL_TOKEN_PREFIX = "local.";

export function createLocalToken(userId: number): string {
  const payload = Buffer.from(JSON.stringify({ sub: userId })).toString(
    "base64url",
  );
  return `${LOCAL_TOKEN_PREFIX}${payload}`;
}

/** Returns the encoded user id, or `null` if this is not a valid local token. */
export function readLocalToken(token: string): number | null {
  if (!token.startsWith(LOCAL_TOKEN_PREFIX)) return null;

  try {
    const json = Buffer.from(
      token.slice(LOCAL_TOKEN_PREFIX.length),
      "base64url",
    ).toString("utf8");
    const { sub } = JSON.parse(json) as { sub?: unknown };
    return typeof sub === "number" ? sub : null;
  } catch {
    return null;
  }
}
