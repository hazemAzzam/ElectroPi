"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { register } from "../_actions/register";

export const useRegister = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const username = String(form.get("username") ?? "");
    const password = String(form.get("password") ?? "");

    startTransition(async () => {
      const result = await register({ name, email, username, password });

      if (result.ok) {
        router.push("/login");
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
