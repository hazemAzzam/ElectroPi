"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, IdCard, Lock, Mail, User } from "lucide-react";

import { Button } from "@/src/presentation/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/presentation/components/ui/card";
import { Input } from "@/src/presentation/components/ui/input";
import { useRegister } from "@/src/presentation/hooks/use-register";

export default function RegisterPage() {
  const { handleSubmit, isPending, error } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-6">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Create account</CardTitle>
              <CardDescription>Sign up to start shopping on ElectroPi</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium leading-none">
                  Full name
                </label>
                <div className="relative">
                  <IdCard className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="name" name="name" type="text" autoComplete="name" placeholder="Your name" className="pl-8" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" className="pl-8" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium leading-none">
                  Username
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="username" name="username" type="text" autoComplete="username" placeholder="Choose a username" className="pl-8" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Create a password" className="px-8" required />
                  <button type="button" onClick={() => setShowPassword((prev) => !prev)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground">
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Creating account…" : "Create account"}
              </Button>
            </CardFooter>
          </Card>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
