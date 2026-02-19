import { fetchAllProducts } from "@/utils/action";
import ProductsGrid from "./ProductsGrid";

const ProductsContainer = async ({ search }: { search: string }) => {
  const products = await fetchAllProducts({ search });

  if (products.length === 0) {
    return (
      <div className="mt-10">
        <div className="text-start mb-10 lg:px-0 px-10">
          <h4 className="text-3xl font-semibold tracking-wider">Candles</h4>
        </div>
        <p className="lg:px-0 px-10 text-base tracking-wider text-muted-foreground">
          Urun bulunamadi.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="text-start mb-10 lg:px-0 px-10">
        <h4 className="text-3xl font-semibold tracking-wider">Candles</h4>
      </div>

      <ProductsGrid className="gap-y-10" products={products} />
    </div>
  );
};
export default ProductsContainer;
