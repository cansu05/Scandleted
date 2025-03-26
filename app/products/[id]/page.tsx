import ProductDetail from "@/components/products/ProductDetail";

const SingleProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const { id } = await searchParams;

  return (
    <section>
      <ProductDetail productId={id} />
    </section>
  );
};

export default SingleProductPage;
