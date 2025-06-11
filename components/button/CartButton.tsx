"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

const CartButton = () => {
  const numItemsInCart = useAppSelector((state) => state.cart.numItemsInCart);

  return (
    <Button asChild variant="link" size="icon" className="flex relative">
      <Link href="/cart">
        <Image src="/icons/bag.svg" alt="cart" width={26} height={26} />
        {numItemsInCart > 0 && (
          <span className="absolute -top-1 -right-1 bg-foreground rounded-full h-4 w-4 flex items-center justify-center text-xs text-white">
            {numItemsInCart}
          </span>
        )}
      </Link>
    </Button>
  );
};

export default CartButton;
