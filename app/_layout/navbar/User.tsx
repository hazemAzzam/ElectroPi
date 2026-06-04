"use client";

import { Button } from "@/app/_components/ui/button";
import { useSiteContext } from "@/app/_providers/SiteProvider";
import { LogIn, UserIcon } from "lucide-react";
import Link from "next/link";

export function User() {
  const { user } = useSiteContext();

  if (user) {
    return (
      <Button variant="ghost">
        <UserIcon />
        <span>{user.name || user.username}</span>
      </Button>
    );
  }

  return (
    <Link href="/login">
      <Button variant="outline">
        <LogIn />
        Login
      </Button>
    </Link>
  );
}
