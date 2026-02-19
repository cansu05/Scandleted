import ShoppingCart from "./ShoppingCart";
import ContactInformation from "./ContactInformation";
import Payment from "./Payment";
import { fetchOrCreateCart, updateCart } from "@/utils/action";
import { getRequiredAuthUser } from "@/utils/auth";

export default async function Cart() {
  const user = await getRequiredAuthUser();
  const previousCart = await fetchOrCreateCart({ userId: user.id });
  const cart = await updateCart(previousCart);
  const currentCart = cart.currentCart as typeof cart.currentCart & {
    contactFullName?: string | null;
    contactAddress?: string | null;
    contactCity?: string | null;
    contactPostalCode?: string | null;
    contactPhone?: string | null;
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-x-10 lg:p-0 p-5 space-y-5 lg:space-y-0">
      <div className="flex flex-col space-y-10">
        <ShoppingCart cartItems={cart.cartItems} />
        <ContactInformation
          initialContact={{
            fullName: currentCart.contactFullName ?? "",
            address: currentCart.contactAddress ?? "",
            city: currentCart.contactCity ?? "",
            postalCode: currentCart.contactPostalCode ?? "",
            phone: currentCart.contactPhone ?? "",
          }}
        />
      </div>
      <div>
        <Payment cart={cart.currentCart} />
      </div>
    </section>
  );
}
