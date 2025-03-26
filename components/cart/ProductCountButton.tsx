import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const ProductCountButton = ({ className }: { className?: string }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "flex items-center justify-around rounded-3xl h-7 w-22 font-light cursor-pointer",
        className
      )}
    >
      <span className="text-xl text-center">-</span>
      <span className="text-sm">5</span>
      <span className="text-xl">+</span>
    </Button>
  );
};
export default ProductCountButton;
