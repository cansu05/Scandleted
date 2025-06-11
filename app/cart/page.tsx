import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchOrCreateCart, updateCart } from "@/utils/action";
import CartContainer from "../../components/cart/CartContainer";

export default async function CartPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const previousCart = await fetchOrCreateCart({ userId });
  const cart = await updateCart(previousCart);

  return <CartContainer cart={cart.currentCart} cartItems={cart.cartItems} />;
}
