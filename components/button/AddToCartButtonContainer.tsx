"use client";

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
  return (
    <AddToCartButton
      className={className}
      productId={productId}
      amount={amount}
    />
  );
};

export default AddToCartButtonContainer;
