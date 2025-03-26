import { fetchSingleProduct } from "@/utils/action";
import BreadCrumbs from "./BreadCrumbs";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import Accordions from "./Accordions";
import AddToCartButton from "../button/AddToCartButton";
import ProductCountButton from "../cart/ProductCountButton";

const ProductDetail = async ({ productId }: { productId: string }) => {
  const product = await fetchSingleProduct(productId);
  const { name, image, price, description } = product;
  const formatPrice = formatCurrency(price);
  return (
    <section className="mt-10 lg:px-0 px-5 items-center">
      <BreadCrumbs name={product.name} />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-15 mt-10">
        <div className="grid grid-cols-2 gap-4 lg:gap-6 w-full">
          <Image src={image} alt={name} width={400} height={110} />
          <Image src={image} alt={name} width={400} height={110} />
          <Image src={image} alt={name} width={400} height={110} />
          <Image src={image} alt={name} width={400} height={110} />
        </div>
        <div className="flex flex-col space-y-4 lg:mt-0 mt-5">
          <div className="flex flex-row items-center justify-between gap-x-20">
            <h1 className="text-3xl font-semibold tracking-wide">{name}</h1>
            <h6 className="text-xl  font-light tracking-wider">
              {formatPrice}
            </h6>
          </div>
          <div>
            <p className="text-base text-foreground tracking-wider text-start">
              {description}
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <ProductCountButton className="h-12" />
            <AddToCartButton className="bg-foreground border-none h-12 lg:max-w-105 max-w-70 text-white hover:bg-secondary" />
          </div>
          <Accordions />
        </div>
      </div>
    </section>
  );
};
export default ProductDetail;
