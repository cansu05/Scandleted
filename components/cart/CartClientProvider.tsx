"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setCartManually } from "@/redux/cart/cartSlice";

const CartClientProvider = ({
  children,
  cart,
}: {
  children: React.ReactNode;
  cart: any;
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCartManually(cart));
    console.log(cart);
  }, [cart, dispatch]);

  return <>{children}</>;
};

export default CartClientProvider;
