import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const AddToCartButton = ({ className }: { className?: string }) => {
  return (
    <Button
      variant="outline"
      size="lg"
      className={cn(
        "items-center rounded-3xl w-full cursor-pointer",
        className
      )}
    >
      ADD TO CART
    </Button>
  );
};
export default AddToCartButton;
