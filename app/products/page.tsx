import ProductsContainer from "@/components/products/ProductsContainer";

interface ProductsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";

  return (
    <div>
      <ProductsContainer search={search} />
    </div>
  );
};

export default ProductsPage;
