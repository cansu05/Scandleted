"use client";

import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { updateCartItemAction } from "@/utils/action";

type ProductCountButtonProps = {
  quantity: number;
  cartItemId?: string;
  onAmountChange: (newAmount: number) => void;
  className?: string;
};

const ProductCountButton = ({
  quantity,
  cartItemId,
  onAmountChange,
  className,
}: ProductCountButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleAmountChange = (newAmount: number) => {
    if (newAmount < 1) return;

    startTransition(() => {
      updateCartItemAction({
        amount: newAmount,
        cartItemId: cartItemId || "",
      })
        .then(() => {
          onAmountChange(newAmount);
        })
        .catch((err) => {
          console.error("Cart update error", err);
        });
    });
  };

  return (
    <div
      className={cn(
        "flex items-center justify-around rounded-3xl border h-7 w-22 font-light",
        className
      )}
    >
      <button
        type="button"
        className="text-xl w-5 disabled:opacity-50"
        disabled={isPending || quantity <= 1}
        onClick={() => handleAmountChange(quantity - 1)}
      >
        -
      </button>
      <span className="text-sm">{quantity}</span>
      <button
        type="button"
        className="text-xl w-5 disabled:opacity-50"
        disabled={isPending}
        onClick={() => handleAmountChange(quantity + 1)}
      >
        +
      </button>
    </div>
  );
};

export default ProductCountButton;
