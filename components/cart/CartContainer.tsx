"use client";

import CartClientProvider from "./CartClientProvider";
import ShoppingCart from "./ShoppingCart";
import ContactInformation from "./ContactInformation";
import Payment from "./Payment";
import type { Cart } from "@prisma/client";
import { CartItemWithProduct } from "@/utils/types";

const Cart = ({
  cart,
  cartItems,
}: {
  cart: Cart;
  cartItems: CartItemWithProduct[];
}) => {
  return (
    <CartClientProvider cart={cart} cartItems={cartItems}>
      <section className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-x-10 lg:p-0 p-5 space-y-5 lg:space-y-0">
        <div className="flex flex-col space-y-10">
          <ShoppingCart />
          <ContactInformation />
        </div>
        <div>
          <Payment />
        </div>
      </section>
    </CartClientProvider>
  );
};

export default Cart;
