"use client";

import { SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { SignOutButton, useAuth } from "@clerk/clerk-react";

const LoginButton = () => {
  const { isSignedIn } = useAuth();
  console.log(isSignedIn);
  return (
    <>
      {!isSignedIn ? (
        <SignUpButton mode="modal">
          <Button
            variant="outline"
            className=" hidden lg:flex border-foreground rounded-3xl font-normal text-sm"
          >
            LOG IN
          </Button>
        </SignUpButton>
      ) : (
        <SignOutButton>
          <Button
            variant="outline"
            className=" hidden lg:flex border-foreground rounded-3xl font-normal text-sm"
          >
            LOG OUT
          </Button>
        </SignOutButton>
      )}
    </>
  );
};
export default LoginButton;
