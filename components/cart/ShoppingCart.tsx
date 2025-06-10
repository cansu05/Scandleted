"use client";

import Image from "next/image";
import ProductCountButton from "../button/ProductCountButton";
import { useState } from "react";
import { CartItem } from "@prisma/client";
import DeleteItemButton from "../button/DeleteItemButton";
const ShoppingCart = ({ cartItems }: { cartItems: CartItem[] }) => {
  const [quantities, setQuantities] = useState(
    Object.fromEntries(cartItems.map((item) => [item.id, item.amount]))
  );

  const updateAmount = (id: string, newAmount: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: newAmount,
    }));
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-medium text-xl">Shopping Cart</h3>
      </div>

      {cartItems.map((item) => {
        const { id, image, price, productName } = item;
        const amount = quantities[id];

        return (
          <div key={id} className="flex flex-row items-center gap-x-6">
            <Image
              src={image}
              alt={productName}
              width={100}
              height={100}
              priority
              className="rounded-[1vw]"
            />
            <div className="space-y-2">
              <h2 className="font-medium text-2xl">{productName}</h2>
              <div className="flex flex-row items-center gap-x-9">
                <ProductCountButton
                  quantity={amount}
                  cartItemId={id}
                  onAmountChange={(newAmount) => updateAmount(id, newAmount)}
                />
                <p className="tracking-wider font-light text-lg">
                  ${price * amount}
                </p>
                <DeleteItemButton id={id} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShoppingCart;
