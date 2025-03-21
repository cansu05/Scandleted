import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const Logo = () => {
  return (
    <Button variant="link" asChild>
      <Link href="/">
        <Image src="/images/Logo.png" alt="logo" width={119} height={20} />
      </Link>
    </Button>
  );
};
export default Logo;
