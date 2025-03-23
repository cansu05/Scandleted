import ProductsContainer from "@/components/products/ProductsContainer";

const ProductsPage = ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  const search = searchParams?.search || "";
  return (
    <div>
      <ProductsContainer search={search} />
    </div>
  );
};
export default ProductsPage;
