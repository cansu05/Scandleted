import ProductsContainer from "@/components/products/ProductsContainer";

interface PageProps {
  searchParams: { search?: string };
}

export default function ProductsPage({ searchParams }: PageProps) {
  const search = searchParams?.search || "";

  return (
    <div>
      <ProductsContainer search={search} />
    </div>
  );
}
