import Link from "next/link";
import Container from "../Container";
import { User } from "./User";

export default function Navbar() {
  return (
    <header className="h-12 bg-background shadow">
      <Container className="flex justify-between items-center">
        <Link href="/" className="h-full flex items-center px-4 text-lg font-bold">
          ElectroPi
        </Link>

        <User />
      </Container>
    </header>
  );
}
