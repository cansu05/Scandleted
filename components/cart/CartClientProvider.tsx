"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setCartManually } from "@/redux/cart/cartSlice";
import type { Cart } from "@prisma/client";
import { CartItemWithProduct } from "@/utils/types";

const CartClientProvider = ({
  children,
  cart,
  cartItems,
}: {
  children: React.ReactNode;
  cart: Cart;
  cartItems: CartItemWithProduct[];
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCartManually({ cart, cartItems }));
  }, [cart, cartItems, dispatch]);

  return <>{children}</>;
};

export default CartClientProvider;
