"use server";

import { cookies } from "next/headers";
import { COOKIES } from "../_constants/cookies-config";

export async function getAuth() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIES.AUTH_TOKEN.name)?.value;
}

export async function setAuth(token: string) {
  const cookieStore = await cookies();
  await cookieStore.set(COOKIES.AUTH_TOKEN.name, token, COOKIES.AUTH_TOKEN.options);
}

export async function clearAuth() {
  (await cookies()).delete(COOKIES.AUTH_TOKEN.name);
}
