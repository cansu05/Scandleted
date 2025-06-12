"use client";

import { SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { SignOutButton, useAuth } from "@clerk/clerk-react";

const LoginButton = () => {
  const { isSignedIn } = useAuth();

  return (
    <>
      {!isSignedIn ? (
        <SignUpButton mode="modal">
          <Button
            variant="outline"
            className="lg:flex border-foreground rounded-3xl font-normal text-sm hover:bg-secondary hover:border-none w-24 cursor-pointer"
          >
            LOG IN
          </Button>
        </SignUpButton>
      ) : (
        <SignOutButton>
          <Button
            variant="outline"
            className="lg:flex border-foreground rounded-3xl font-normal text-sm hover:bg-secondary hover:border-none w-24 cursor-pointer"
          >
            LOG OUT
          </Button>
        </SignOutButton>
      )}
    </>
  );
};
export default LoginButton;
