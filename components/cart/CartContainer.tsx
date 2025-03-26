import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import ShoppingCart from "./ShoppingCart";
import ContactInformation from "./ContactInformation";
import Payment from "./Payment";

export default async function Cart() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex justify-center items-center h-64">
        <SignInButton mode="modal">
          <Button variant="outline" className="rounded-xl">
            Please login to access your cart
          </Button>
        </SignInButton>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-x-10 lg:p-0 p-5 space-y-5 lg:space-y-0">
      <div className="flex flex-col space-y-10">
        <ShoppingCart />
        <ContactInformation />
      </div>
      <div>
        <Payment />
      </div>
    </section>
  );
}
