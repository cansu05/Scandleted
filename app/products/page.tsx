import ProductsContainer from "@/components/products/ProductsContainer";

type Props = {
  searchParams?: { search?: string };
};

const ProductsPage = async ({ searchParams }: Props) => {
  const search = searchParams?.search || "";
  return <ProductsContainer search={search} />;
};

export default ProductsPage;
