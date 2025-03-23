import ProductsContainer from "@/components/products/ProductsContainer";

interface PageProps {
  searchParams?: { search?: string };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const search = searchParams?.search || "";
  return <ProductsContainer search={search} />;
}
