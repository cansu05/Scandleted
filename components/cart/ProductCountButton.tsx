import { Button } from "../ui/button";

const ProductCountButton = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center justify-around rounded-3xl h-7 w-22 font-light cursor-pointer"
    >
      <span className="text-xl text-center">-</span>
      <span className="text-sm">5</span>
      <span className="text-xl">+</span>
    </Button>
  );
};
export default ProductCountButton;
