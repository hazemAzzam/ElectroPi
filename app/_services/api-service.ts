import { getAuth } from "./cookie-service";

/**
 * Centralized API service.
 *
 * Wraps Next.js' extended `fetch` so every repository goes through a single
 * place for: base URL resolution, query-string building, JSON
 * (de)serialization, auth-token injection, caching/revalidation options, and
 * consistent error handling.
 */

const API_BASE_URL = process.env.API_BASE_URL;

export type QueryValue = string | number | boolean | null | undefined;

export interface RequestOptions {
  /** Query parameters appended to the URL. `null`/`undefined` are skipped. */
  query?: Record<string, QueryValue>;
  /** Extra headers merged on top of the defaults. */
  headers?: Record<string, string>;
  /** Send the auth token as a `Bearer` Authorization header. Defaults to `true`. */
  auth?: boolean;
  /** Forwarded to Next.js fetch caching. */
  cache?: RequestCache;
  /** Forwarded to Next.js fetch revalidation / tagging. */
  next?: { revalidate?: number | false; tags?: string[] };
  /** Abort signal (also opts the request out of fetch memoization). */
  signal?: AbortSignal;
}

interface MutationOptions extends RequestOptions {
  /** Request body. Plain objects are JSON-serialized automatically. */
  body?: unknown;
}

/** Thrown for any non-2xx response, carrying status and parsed payload. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly url: string,
    public readonly data: unknown,
  ) {
    super(`API ${status} ${statusText} for ${url}`);
    this.name = "ApiError";
  }
}

/**
 * Extracts a user-facing message from an unknown thrown value.
 *
 * For an {@link ApiError} it prefers the API payload's `message` field (the
 * shape DummyJSON and most JSON APIs return), falling back to `fallback` for
 * everything else.
 */
export function getErrorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  if (error instanceof ApiError) {
    const data = error.data;
    if (typeof data === "object" && data !== null && "message" in data) {
      return String((data as { message: unknown }).message);
    }
  }
  return fallback;
}

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL environment variable is not set.");
  }

  const url = new URL(
    path.replace(/^\//, ""),
    API_BASE_URL.endsWith("/") ? API_BASE_URL : `${API_BASE_URL}/`,
  );

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

async function buildHeaders(options: MutationOptions, hasBody: boolean): Promise<Headers> {
  const headers = new Headers(options.headers);

  if (hasBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (options.auth !== false) {
    const token = await getAuth();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  return headers;
}

async function parseBody(response: Response): Promise<unknown> {
  if (response.status === 204) return null;

  const contentType = response.headers.get("Content-Type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}

async function request<T>(
  method: string,
  path: string,
  options: MutationOptions = {},
): Promise<T> {
  const hasBody = options.body !== undefined && options.body !== null;
  const headers = await buildHeaders(options, hasBody);

  const url = buildUrl(path, options.query);
  const response = await fetch(url, {
    method,
    headers,
    body: hasBody
      ? typeof options.body === "string"
        ? options.body
        : JSON.stringify(options.body)
      : undefined,
    cache: options.cache,
    next: options.next,
    signal: options.signal,
  });

  const data = await parseBody(response);

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText, url, data);
  }

  return data as T;
}

export const apiService = {
  get<T>(path: string, options?: RequestOptions): Promise<T> {
    return request<T>("GET", path, options);
  },
  post<T>(path: string, options?: MutationOptions): Promise<T> {
    return request<T>("POST", path, options);
  },
  put<T>(path: string, options?: MutationOptions): Promise<T> {
    return request<T>("PUT", path, options);
  },
  patch<T>(path: string, options?: MutationOptions): Promise<T> {
    return request<T>("PATCH", path, options);
  },
  delete<T>(path: string, options?: MutationOptions): Promise<T> {
    return request<T>("DELETE", path, options);
  },
};
