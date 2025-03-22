import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const Logo = () => {
  return (
    <Button asChild className="mt-3">
      <Link href="/">
        <Image src="/images/Logo.svg" alt="logo" width={145} height={56} />
      </Link>
    </Button>
  );
};
export default Logo;
