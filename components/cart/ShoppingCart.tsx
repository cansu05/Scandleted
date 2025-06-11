"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCart, updateCartItem } from "@/redux/cart/cartSlice";
import ProductCountButton from "../button/ProductCountButton";
import DeleteItemButton from "../button/DeleteItemButton";

const ShoppingCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    setQuantities(
      Object.fromEntries(cartItems.map((item) => [item.id, item.amount]))
    );
  }, [cartItems]);

  const updateAmount = (id: string, newAmount: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: newAmount,
    }));
    dispatch(updateCartItem({ cartItemId: id, amount: newAmount }));
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-medium text-xl">Shopping Cart</h3>
      </div>

      {cartItems.map((item) => {
        const { id, image, price, productName } = item;
        const amount = quantities[id] ?? item.amount;

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
                  ${(price * amount).toFixed(2)}
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
