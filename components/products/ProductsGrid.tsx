import { formatCurrency } from "@/utils/format";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import AddToCartButtonContainer from "../button/AddToCartButtonContainer";

const ProductsGrid = ({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) => {
  return (
    <div
      className={`grid lg:max-w-full mx-auto space-y-8 lg:space-y-0 lg:gap-x-5  ${
        className ?? ""
      }`}
    >
      {products.map((product) => {
        const { id: productId, name, image, price, description } = product;
        const formatPrice = formatCurrency(price);
        return (
          <div
            key={productId}
            className="flex flex-col  w-full justify-between max-w-xl sm:px-p px-10 space-y-3  lg:px-0"
          >
            <Link href={`products/${productId}`}>
              <div className="w-full aspect-square relative ">
                <Image
                  src={image}
                  alt={name}
                  fill
                  priority
                  sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col mt-2 space-y-2 h-full">
                <div className="flex flex-row items-center justify-between gap-x-20">
                  <h5 className="text-xl font-semibold tracking-wide">
                    {name}
                  </h5>
                  <h6 className="  font-light tracking-wider">{formatPrice}</h6>
                </div>
                <div className="h-full">
                  <p className="text-base text-foreground tracking-wider text-start">
                    {description}
                  </p>
                </div>
              </div>
            </Link>
            <AddToCartButtonContainer productId={productId} amount={1} />
          </div>
        );
      })}
    </div>
  );
};
export default ProductsGrid;
