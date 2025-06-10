import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import { addToCartAction } from "@/utils/action";

const AddToCartButton = ({
  className,
  productId,
  amount,
}: {
  className?: string;
  productId: string;
  amount: number;
}) => {
  console.log(productId);
  return (
    <FormContainer action={addToCartAction}>
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="amount" value={amount} />
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
    </FormContainer>
  );
};
export default AddToCartButton;
