"use client";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function AddToCartSubmitButton({
  className,
  pending = false,
}: {
  className?: string;
  pending?: boolean;
}) {
  return (
    <Button
      type="submit"
      variant="outline"
      size="lg"
      disabled={pending}
      className={cn(
        "items-center rounded-3xl w-full cursor-pointer",
        pending && "opacity-70 cursor-not-allowed",
        className
      )}
    >
      {pending ? "ADDING..." : "ADD TO CART"}
    </Button>
  );
}
