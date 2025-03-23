import ProductsContainer from "@/components/products/ProductsContainer";

interface ProductsPageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const search =
    typeof searchParams?.search === "string" ? searchParams.search : "";

  return (
    <main className="px-4 lg:px-0">
      <ProductsContainer search={search} />
    </main>
  );
}
