import LoadingContainer from "@/components/global/LoadingContainer";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import ProductFeatures from "@/components/home/ProductFeatures";
import PromoBanner from "@/components/home/PromoBanner";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense
        fallback={
          <LoadingContainer className="lg:grid-cols-4 sm:grid-cols-1" />
        }
      >
        <FeaturedProducts />
      </Suspense>

      <PromoBanner />
      <ProductFeatures />
    </div>
  );
}
