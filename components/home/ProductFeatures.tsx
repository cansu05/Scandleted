import Image from "next/image";

const ProductFeatures = () => {
  return (
    <div className="bg-secondary mt-10 flex flex-col justify-center items-center p-10 space-y-5">
      <div className="flex flex-col gap-5">
        <Image
          src="/images/hero-img-3.png"
          alt="hero3"
          width={1200}
          height={500}
        />
        <p className="text-base tracking-wider w-80">
          We make products with quality materials so you get a very good product
        </p>
      </div>
      <div className="grid lg:grid-rows-2 ">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 sm:space-y-5 lg:gap-x-5">
          <div>
            <Image
              src="/images/img01.png"
              alt="hero3"
              width={800}
              height={500}
            />
          </div>
          <div className="flex flex-col space-y-3 lg:mt-0 mt-5 mb-5 lg:mb-0">
            <Image
              src="/images/img02.png"
              alt="hero3"
              width={800}
              height={500}
            />

            <h6 className="text-xl font-black tracking-wide">Durable</h6>
            <p className="text-base tracking-wider w-75">
              The life of the candle reaches 6 months since it is used and still
              feels the smell
            </p>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 sm:space-y-5 lg:gap-x-5">
          <div className="flex flex-col space-y-3">
            <Image
              src="/images/img03.png"
              alt="hero3"
              width={800}
              height={500}
            />
            <h6 className="text-xl font-black tracking-wide">Calm</h6>
            <p className="text-base tracking-wider w-80">
              The aroma emitted by the candles soothes the feeling and the room
              is of course very durable
            </p>
          </div>
          <div className="mt-5 lg:mt-0">
            <Image
              src="/images/img04.png"
              alt="hero3"
              width={800}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductFeatures;
