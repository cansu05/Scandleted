import { formatCurrency } from "@/utils/format";
import { Product } from "@prisma/client";
import Image from "next/image";
import AddToCartButton from "../buton/AddToCartButton";

const ProductsGrid = ({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) => {
  return (
    <div className={`grid space-y-8 lg:space-y-0 gap-x-5 ${className ?? ""}`}>
      {products.map((product) => {
        const { id: productID, name, image, price, description } = product;
        const formatPrice = formatCurrency(price);
        return (
          <div
            key={productID}
            className="flex flex-col space-y-3 px-10 lg:px-0"
          >
            <div className="w-full aspect-square relative">
              <Image src={image} alt={name} width={590} height={110} />
            </div>
            <div className="flex flex-col   space-y-2 h-full">
              <div className="flex flex-row items-center justify-between gap-x-20">
                <h5 className="text-xl font-semibold tracking-wide">{name}</h5>
                <h6 className="  font-light tracking-wider">{formatPrice}</h6>
              </div>
              <div className="h-full">
                <p className="text-base text-foreground tracking-wider text-start">
                  {description}
                </p>
              </div>

              <AddToCartButton />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ProductsGrid;
