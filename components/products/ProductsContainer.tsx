import { fetchAllProducts } from "@/utils/action";
import ProductsGrid from "./ProductsGrid";

const ProductsContainer = async ({ search }: { search: string }) => {
  const products = await fetchAllProducts({ search });
  return (
    <div className="mt-10 ">
      <div className="text-start mb-10 lg:px-0 px-10">
        <h4 className="text-3xl font-semibold tracking-wider">Candles</h4>
      </div>

      <ProductsGrid
        className="lg:grid-cols-3 sm:grid-cols-2 gap-y-10"
        products={products}
      />
    </div>
  );
};
export default ProductsContainer;
