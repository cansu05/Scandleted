import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const CartButton = () => {
  const numItemsInCart = 6;
  return (
    <Button asChild variant="link" size="icon" className="flex relative">
      <Link href="/cart">
        <Image src="/icons/bag.svg" alt="cart" width={20} height={20} />
        <span className="absolute -top-1 -right-1 bg-foreground rounded-full h-4 w-4 flex items-center justify-center text-xs text-white">
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  );
};
export default CartButton;
