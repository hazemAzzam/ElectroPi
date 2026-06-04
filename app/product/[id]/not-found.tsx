import { Button } from "@/src/presentation/components/ui/button";
import Container from "@/src/presentation/layout/Container";
import { PackageX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <PackageX className="size-10 text-muted-foreground" />
      <h1 className="font-heading text-2xl font-bold tracking-tight">Product not found</h1>
      <p className="max-w-md text-sm text-muted-foreground">The product doesn't exist.</p>
      <Link href="/">
        <Button>Browse products</Button>
      </Link>
    </Container>
  );
}
