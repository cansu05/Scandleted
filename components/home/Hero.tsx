import Image from "next/image";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 sm:grid-rows-1 items-center mt-10 lg:mt-0">
      <div className="hidden lg:block relative overflow-hidden">
        <Image
          src="/images/hero-img-1.png"
          alt="hero"
          width={590}
          height={110}
        />
      </div>
      <div
        style={{ backgroundColor: "var(--bg-hero)" }}
        className="flex flex-col justify-center items-start px-20 gap-y-5 h-full"
      >
        <div>
          <p
            style={{ color: "var(--text)" }}
            className="text-sm mb-1 tracking-widest"
          >
            #SCANDLEXPERIENCE
          </p>
          <h1 className="text-4xl font-semibold tracking-wider">
            Always <span className="text-border"> cool and soothe</span> your
            feelings available in a variety of {""}
            <span className="text-border italic font-light">candle</span>
          </h1>
        </div>
        <Button
          variant="secondary"
          className="text-white rounded-3xl tracking-wider"
        >
          DISCOVER PRODUCTS
        </Button>
      </div>
    </div>
  );
};
export default Hero;
