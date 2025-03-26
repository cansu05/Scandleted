import ProductDetail from "@/components/products/ProductDetail";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  console.log(id);

  return (
    <section>
      <ProductDetail productId={id} />
    </section>
  );
};

export default SingleProductPage;
