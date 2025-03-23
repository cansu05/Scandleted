import ProductsContainer from "@/components/products/ProductsContainer";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const search =
    typeof searchParams?.search === "string" ? searchParams.search : "";

  return (
    <div>
      <ProductsContainer search={search} />
    </div>
  );
};

export default ProductsPage;
