import { Separator } from "@radix-ui/react-dropdown-menu";
import CheckoutButton from "./CheckoutButton";

const Payment = () => {
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
          <p className="font-bold text-sm">$20.00</p>
        </div>

        <div className="flex flex- justify-between ">
          <p
            style={{ color: "var(--text)" }}
            className="text-sm tracking-wider"
          >
            Shipping
          </p>
          <p className="font-bold text-sm">$5.00</p>
        </div>

        <div className="flex flex- justify-between ">
          <p
            style={{ color: "var(--text)" }}
            className="text-sm tracking-wider"
          >
            Taxes
          </p>
          <p className="font-bold text-sm">$10.00</p>
        </div>
      </div>

      <Separator className="border border-secondary w-full" />

      <div className="flex flex-row justify-between ">
        <p style={{ color: "var(--text)" }} className="text-lg tracking-wider">
          Total
        </p>
        <p className="font-bold text-lg">$20.00</p>
      </div>

      <Separator className="border border-secondary w-full" />

      <div className="flex justify-center sm:justify-end lg:justify-end">
        <CheckoutButton />
      </div>
    </div>
  );
};
export default Payment;
