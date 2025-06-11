"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setCartManually } from "@/redux/cart/cartSlice";
import { Cart } from "@prisma/client";

const CartClientProvider = ({
  children,
  cart,
}: {
  children: React.ReactNode;
  cart: Cart;
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCartManually(cart));
  }, [cart, dispatch]);

  return <>{children}</>;
};

export default CartClientProvider;
