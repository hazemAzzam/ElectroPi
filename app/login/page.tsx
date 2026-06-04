"use client";

import { Button } from "../_components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../_components/ui/card";
import { Input } from "../_components/ui/input";
import { useLogin } from "../_hook/use-login";
import Container from "../_layout/Container";

export default function LoginPage() {
  const { handleSubmit, isPending, error } = useLogin();

  return (
    <Container className="max-w-md">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input name="username" type="text" placeholder="Your username..." required />
            <Input name="password" type="password" placeholder="Your password..." required />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Container>
  );
}
