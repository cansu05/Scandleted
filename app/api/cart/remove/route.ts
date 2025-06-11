import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/utils/db";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.redirect(new URL("/", req.url));

  try {
    const body = await req.json();
    const { cartItemId } = body;

    const cart = await db.cart.findFirst({
      where: { clerkId: userId },
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });

    const cartItems = await db.cartItem.findMany({
      where: { cartId: cart.id },
      include: { product: true },
    });

    let numItemsInCart = 0;
    let cartTotal = 0;

    for (const item of cartItems) {
      numItemsInCart += item.amount;
      cartTotal += item.amount * item.product.price;
    }

    const tax = cart.taxRate * cartTotal;
    const shipping = cartTotal ? cart.shipping : 0;
    const orderTotal = cartTotal + tax + shipping;

    const updatedCart = await db.cart.update({
      where: { id: cart.id },
      data: { numItemsInCart, cartTotal, tax, orderTotal },
      include: { cartItems: true },
    });

    return NextResponse.json({ message: "Item removed", cart: updatedCart });
  } catch (error) {
    console.error("Remove error:", error);
    return NextResponse.json({ error: "Remove failed" }, { status: 500 });
  }
}
