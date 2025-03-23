import ProductsContainer from "@/components/products/ProductsContainer";

const ProductsPage = ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  const search = searchParams.search || "";
  return <ProductsContainer search={search} />;
};
export default ProductsPage;
