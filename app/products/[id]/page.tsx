import ProductDetail from "@/components/products/ProductDetail";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <section>
      <ProductDetail productId={id} />
    </section>
  );
};
export default page;
