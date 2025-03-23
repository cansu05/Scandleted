import ProductsContainer from "@/components/products/ProductsContainer";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search = "" } = await searchParams;

  return (
    <div>
      <ProductsContainer search={search} />
    </div>
  );
}
