import { Button } from "../ui/button";

const CheckoutButton = () => {
  return (
    <Button
      variant="default"
      size="lg"
      className="flex items-center rounded-3xl text-xs text-white bg-foreground w-full sm:w-30 lg:w-30 font-light tracking-wider hover:bg-secondary cursor-pointer"
    >
      CHECKOUT
    </Button>
  );
};
export default CheckoutButton;
