import Image from "next/image";
import Link from "next/link";
import Container from "../Container";
import { User } from "./User";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-12 border-b bg-background/80 backdrop-blur-sm">
      <Container className="flex justify-between items-center">
        <Link href="/" className="h-full flex items-center" aria-label="ElectroPi home">
          <Image src="/ElectroPi.png" alt="ElectroPi" width={791} height={207} priority className="h-7 w-auto" />
        </Link>

        <User />
      </Container>
    </header>
  );
}
