import Image from "next/image";
import Container from "../Container";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-4">
      <Container className="flex justify-between items-center">
        <Link href="/" className="h-full flex items-center px-4" aria-label="ElectroPi home">
          <Image src="/ElectroPi.png" alt="ElectroPi" width={791} height={207} priority className="h-7 w-auto" />
        </Link>
      </Container>
    </footer>
  );
}
