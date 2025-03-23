import ProductsContainer from "@/components/products/ProductsContainer";

interface Props {
  searchParams?: { search?: string };
}

const ProductsPage = async ({ searchParams }: Props) => {
  const search = searchParams?.search || "";
  return <ProductsContainer search={search} />;
};

export default ProductsPage;
