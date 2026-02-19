import { Button } from "../ui/button";
import Link from "next/link";
import { getOptionalAuthUser } from "@/utils/auth";
import LogoutSubmitButton from "./LogoutSubmitButton";

const LoginButton = async () => {
  const user = await getOptionalAuthUser();

  return (
    <>
      {!user ? (
        <Button
          asChild
          variant="outline"
          className="lg:flex border-foreground rounded-3xl font-normal text-sm hover:bg-secondary hover:border-none w-24 cursor-pointer"
        >
          <Link href="/login">LOG IN</Link>
        </Button>
      ) : (
        <LogoutSubmitButton />
      )}
    </>
  );
};
export default LoginButton;
