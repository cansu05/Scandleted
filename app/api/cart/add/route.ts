import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/utils/db";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.redirect(new URL("/", req.url));

  try {
    const body = await req.json();
    const { productId, amount } = body;

    const product = await db.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let cart = await db.cart.findFirst({
      where: { clerkId: userId },
      include: { cartItems: true },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: { clerkId: userId },
        include: { cartItems: true },
      });
    }

    let cartItem = await db.cartItem.findFirst({
      where: { productId, cartId: cart.id },
    });

    if (cartItem) {
      cartItem = await db.cartItem.update({
        where: { id: cartItem.id },
        data: { amount: cartItem.amount + amount },
      });
    } else {
      await db.cartItem.create({
        data: {
          productId,
          cartId: cart.id,
          amount,
          price: product.price,
          image: product.image,
          productName: product.name,
        },
      });
    }

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

    return NextResponse.json({
      message: "Product added",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Cart Add Error:", error);
    return NextResponse.json({ error: "An error occurred." }, { status: 500 });
  }
}
