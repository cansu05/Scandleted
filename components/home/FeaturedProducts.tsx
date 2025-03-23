import { fetchFeaturedProducts } from "@/utils/action";
import ProductsGrid from "../products/ProductsGrid";
import LoadingContainer from "../global/LoadingContainer";
import { Suspense } from "react";

const FeaturedProducts = async () => {
  const products = await fetchFeaturedProducts();
  if (products.length === 0) return null;
  return (
    <section className="mt-10">
      <div className="text-center mb-10">
        <p
          style={{ color: "var(--text)" }}
          className="text-lg mb-2 tracking-widest"
        >
          TRENDING
        </p>
        <h4 className="text-3xl font-semibold tracking-wider">
          Shop our popular candle products
        </h4>
      </div>
      <Suspense
        fallback={
          <LoadingContainer className="lg:grid-cols-4 sm:grid-cols-1" />
        }
      >
        <ProductsGrid
          className="lg:grid-cols-4 sm:grid-cols-1"
          products={products}
        />
      </Suspense>
    </section>
  );
};
export default FeaturedProducts;
