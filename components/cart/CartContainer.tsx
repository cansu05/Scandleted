"use client";

import CartClientProvider from "./CartClientProvider";
import ShoppingCart from "./ShoppingCart";
import ContactInformation from "./ContactInformation";
import Payment from "./Payment";

const Cart = ({ cart }: { cart: any }) => {
  return (
    <CartClientProvider cart={cart}>
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
