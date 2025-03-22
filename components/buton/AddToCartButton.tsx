import Image from "next/image";
import { Button } from "../ui/button";

const AddToCartButton = () => {
  return (
    <Button
      variant="outline"
      size="lg"
      className="items-center rounded-3xl w-full"
    >
      ADD TO CART
      <Image src="/icons/circle-plus.svg" alt="add" width={20} height={20} />
    </Button>
  );
};
export default AddToCartButton;
