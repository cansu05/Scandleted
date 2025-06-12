"use client";

import { useState } from "react";
import ProductCountButton from "../button/ProductCountButton";
import AddToCartButtonContainer from "../button/AddToCartButtonContainer";

const ProductDetailButtonContainer = ({ productId }: { productId: string }) => {
  const [amount, setAmount] = useState(1);
  return (
    <div className="flex flex-row justify-between">
      <ProductCountButton
        quantity={amount}
        onAmountChange={setAmount}
        className="h-12"
      />
      <AddToCartButtonContainer
        productId={productId}
        amount={amount}
        className="bg-foreground border-none h-12 lg:max-w-105 max-w-70 text-white hover:bg-secondary"
      />
    </div>
  );
};
export default ProductDetailButtonContainer;
