"use client";

import { Button } from "../ui/button";
import { SignUpButton, useAuth } from "@clerk/nextjs";
import AddToCartButton from "./AddToCartButton";

const AddToCartButtonContainer = ({
  className,
  productId,
  amount,
}: {
  className?: string;
  productId: string;
  amount: number;
}) => {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return (
      <SignUpButton mode="modal">
        <Button
          variant="outline"
          size="lg"
          className="items-center rounded-3xl w-full cursor-pointer"
        >
          ADD TO CART
        </Button>
      </SignUpButton>
    );
  }

  return (
    <AddToCartButton
      className={className}
      productId={productId}
      amount={amount}
    />
  );
};

export default AddToCartButtonContainer;
