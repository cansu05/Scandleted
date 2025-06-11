import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/utils/db";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let cart = await db.cart.findFirst({
      where: { clerkId: userId },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: { clerkId: userId },
        include: {
          cartItems: {
            include: { product: true },
          },
        },
      });
    }

    let numItemsInCart = 0;
    let cartTotal = 0;

    for (const item of cart.cartItems) {
      numItemsInCart += item.amount;
      cartTotal += item.amount * item.product.price;
    }

    const tax = cart.taxRate * cartTotal;
    const shipping = cartTotal ? cart.shipping : 0;
    const orderTotal = cartTotal + tax + shipping;

    const updatedCart = await db.cart.update({
      where: { id: cart.id },
      data: {
        numItemsInCart,
        cartTotal,
        tax,
        orderTotal,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    const serializedCart = {
      ...updatedCart,
      createdAt: updatedCart.createdAt.toISOString(),
      updatedAt: updatedCart.updatedAt.toISOString(),
      cartItems: updatedCart.cartItems.map((item) => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      })),
    };

    return NextResponse.json({ cart: serializedCart });
  } catch (error) {
    console.error("Fetch cart error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
