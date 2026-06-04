"use client";

import { useEffect } from "react";
import { useSiteContext } from "@/src/presentation/providers/SiteProvider";
import { getCurrentUser } from "@/src/presentation/actions/get-current-user";

export default function StorageSync() {
  const { handleLogin } = useSiteContext();

  useEffect(() => {
    let active = true;

    getCurrentUser().then((user) => {
      if (active && user) {
        handleLogin(user);
      }
    });

    return () => {
      active = false;
    };
  }, [handleLogin]);

  return null;
}
