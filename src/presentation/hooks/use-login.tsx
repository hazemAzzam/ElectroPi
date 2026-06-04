"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/src/presentation/actions/login";
import { useSiteContext } from "@/src/presentation/providers/SiteProvider";

export const useLogin = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { handleLogin, loggedIn } = useSiteContext();

  useEffect(() => {
    if (loggedIn) {
      router.push("/");
    }
  }, [loggedIn, router]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    const username = String(form.get("username") ?? "");
    const password = String(form.get("password") ?? "");

    startTransition(async () => {
      const result = await login({ username, password });

      if (result.ok) {
        handleLogin(result.user);
        router.push("/");
      } else {
        setError(result.error);
      }
    });
  };

  return {
    isPending,
    error,
    handleSubmit,
  };
};
