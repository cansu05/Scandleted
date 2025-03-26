import ProductDetail from "@/components/products/ProductDetail";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return (
    <section>
      <ProductDetail productId={id} />
    </section>
  );
};

export default Page;
