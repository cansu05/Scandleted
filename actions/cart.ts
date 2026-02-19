"use server";

import db from "@/utils/db";
import { revalidatePath } from "next/cache";
import { getOptionalAuthUser, getRequiredAuthUser } from "@/utils/auth";
import {
  fetchOrCreateCart,
  fetchProduct,
  updateCart,
  updateOrCreateCartItem,
} from "@/services/cart";
import { ContactFormValues } from "@/schemas/contact";

export const fetchCartItems = async () => {
  const user = await getOptionalAuthUser();
  if (!user) return 0;

  const cart = await db.cart.findFirst({
    where: {
      userId: user.id,
    },
    select: {
      numItemsInCart: true,
    },
  });

  return cart?.numItemsInCart || 0;
};

export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: string;
}) => {
  const user = await getRequiredAuthUser();
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });

    await updateCart(cart);
    revalidatePath("/cart");
    return { ok: true, message: "Cart updated." };
  } catch {
    return { ok: false, message: "An error occurred, please try again." };
  }
};

export const removeCartItemAction = async (values: { id?: string }) => {
  const user = await getRequiredAuthUser();
  try {
    const cartItemId = values.id;
    if (!cartItemId) {
      return { ok: false, message: "Cart item id is required." };
    }

    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });

    await updateCart(cart);
    revalidatePath("/cart");
    return { ok: true, message: "Item removed from cart." };
  } catch {
    return { ok: false, message: "An error occurred, please try again." };
  }
};

export const addToCartAction = async (values: {
  productId?: string;
  amount?: string | number;
}) => {
  const user = await getRequiredAuthUser();
  try {
    const productId = values.productId;
    const amount = Number(values.amount);

    if (!productId || Number.isNaN(amount) || amount <= 0) {
      return { ok: false, message: "Invalid product payload." };
    }

    await fetchProduct(productId);
    const cart = await fetchOrCreateCart({ userId: user.id });
    await updateOrCreateCartItem({ productId, cartId: cart.id, amount });
    await updateCart(cart);

    revalidatePath("/", "layout");
    revalidatePath("/cart");
    return {
      ok: true,
      message: "The product has been added to the cart successfully.",
    };
  } catch {
    return { ok: false, message: "An error occurred, please try again." };
  }
};

export const updateContactInformationAction = async (
  values: ContactFormValues
) => {
  const user = await getRequiredAuthUser();
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    await db.$executeRaw`
      UPDATE "Cart"
      SET
        "contactFullName" = ${values.fullName},
        "contactAddress" = ${values.address},
        "contactCity" = ${values.city},
        "contactPostalCode" = ${values.postalCode},
        "contactPhone" = ${values.phone},
        "updatedAt" = CURRENT_TIMESTAMP
      WHERE "id" = ${cart.id}
    `;

    revalidatePath("/cart");
    return { ok: true, message: "Contact information saved." };
  } catch {
    return { ok: false, message: "Failed to save contact information." };
  }
};

export { fetchOrCreateCart, updateCart };
