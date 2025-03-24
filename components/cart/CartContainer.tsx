"use client";

import { useAuth } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
export default function Cart() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return (
      <div className="flex justify-center items-center h-64">
        <SignInButton mode="modal">
          <Button variant="outline" className="rounded-xl">
            Please login to access your cart
          </Button>
        </SignInButton>
      </div>
    );
  }

  return <div>Protected Cart Content</div>;
}
