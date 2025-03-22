import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import ProductFeatures from "@/components/home/ProductFeatures";
import PromoBanner from "@/components/home/PromoBanner";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <PromoBanner />
      <ProductFeatures />
    </div>
  );
}
