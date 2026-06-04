"use server";

import { cookies } from "next/headers";
import { COOKIES } from "@/src/infrastructure/constants/cookies-config";
import { StoredUserDTO } from "@/src/infrastructure/dtos/auth-dto";

export async function getRegisteredUsers(): Promise<StoredUserDTO[]> {
  const raw = (await cookies()).get(COOKIES.USERS.name)?.value;
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredUserDTO[]) : [];
  } catch {
    return [];
  }
}

export async function setRegisteredUsers(users: StoredUserDTO[]) {
  const cookieStore = await cookies();
  await cookieStore.set(
    COOKIES.USERS.name,
    JSON.stringify(users),
    COOKIES.USERS.options,
  );
}

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
