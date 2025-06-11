"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/cart/cartSlice";
import { useState } from "react";

const AddToCartButton = ({
  className,
  productId,
  amount,
}: {
  className?: string;
  productId: string;
  amount: number;
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await dispatch(addToCart({ productId, amount })).unwrap();
    } catch (error) {
      console.error("cart error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className={cn(
        "items-center rounded-3xl w-full cursor-pointer",
        className
      )}
      onClick={handleAddToCart}
      disabled={loading}
    >
      {loading ? "Adding..." : "ADD TO CART"}
    </Button>
  );
};

export default AddToCartButton;
