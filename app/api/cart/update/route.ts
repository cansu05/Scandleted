import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { updateCart } from "@/utils/action";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { cartItemId, amount } = body;

    if (!cartItemId || typeof amount !== "number") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const cart = await db.cart.findFirst({
      where: { clerkId: userId },
    });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });

    const { currentCart, cartItems } = await updateCart(cart);

    return NextResponse.json({ cart: currentCart, cartItems });
  } catch (error) {
    console.error("Update cart item error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
