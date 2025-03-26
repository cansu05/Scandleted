import Image from "next/image";
import ProductCountButton from "./ProductCountButton";

const ShoppingCart = () => {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-medium text-xl">Shopping Cart</h3>
      </div>
      <div className="flex flex-row items-center gap-x-6 ">
        <Image
          src={"/images/product-1.png"}
          alt="product"
          width={100}
          height={100}
          className="rounded-[1vw]"
        />
        <div className="space-y-2">
          <h2 className="font-medium text-2xl">Vanilla Relax Candle</h2>
          <div className="flex flex-row items-center gap-x-4">
            <ProductCountButton />
            <p className="tracking-wider font-light text-lg">$20</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCart;
