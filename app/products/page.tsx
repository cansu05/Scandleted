import ProductsContainer from "@/components/products/ProductsContainer";

interface Props {
  searchParams?: {
    search?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const search = searchParams?.search || "";
  return (
    <div>
      <ProductsContainer search={search} />
    </div>
  );
}
