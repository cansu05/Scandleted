import { Separator } from "@radix-ui/react-dropdown-menu";
import CheckoutButton from "./CheckoutButton";
import { Cart } from "@prisma/client";

const Payment = ({ cart }: { cart: Cart }) => {
  const { shipping, tax, cartTotal, orderTotal } = cart;
  console.log(cart);
  return (
    <div
      style={{ backgroundColor: "var(--bg-hero)" }}
      className="flex flex-col space-y-4 border border-secondary rounded-[1vw] p-4"
    >
      <div className="flex flex-col space-y-5 w-full">
        <h3 className=" font-medium text-xl">Detail shop</h3>
        <div className="flex flex-row justify-between ">
          <p
            style={{ color: "var(--text)" }}
            className="text-sm tracking-wider"
          >
            Subtotal
          </p>
          <p className="font-bold text-sm">${cartTotal}</p>
        </div>

        <div className="flex flex- justify-between ">
          <p
            style={{ color: "var(--text)" }}
            className="text-sm tracking-wider"
          >
            Shipping
          </p>
          <p className="font-bold text-sm">${shipping}</p>
        </div>

        <div className="flex flex- justify-between ">
          <p
            style={{ color: "var(--text)" }}
            className="text-sm tracking-wider"
          >
            Taxes
          </p>
          <p className="font-bold text-sm">{tax}</p>
        </div>
      </div>

      <Separator className="border border-secondary w-full" />

      <div className="flex flex-row justify-between ">
        <p style={{ color: "var(--text)" }} className="text-lg tracking-wider">
          Total
        </p>
        <p className="font-bold text-lg">${orderTotal}</p>
      </div>

      <Separator className="border border-secondary w-full" />

      <div className="flex justify-center sm:justify-end lg:justify-end">
        <CheckoutButton />
      </div>
    </div>
  );
};
export default Payment;
