const PromoBanner = () => {
  return (
    <div className="px-10 bg-[url('/images/hero-img-2.png')] bg-cover bg-center bg-no-repeat h-[300px] flex flex-col items-start justify-center gap-y-2 text-white mt-10">
      <h1 className="text-5xl font-semibold tracking-wider flex items-center gap-2">
        <span className="flex items-center justify-center bg-foreground text-white px-4 py-2 rounded-md text-5xl h-[60px] w-[100px] leading-none">
          35%
        </span>
        <span className="text-5xl leading-none flex items-center">OFF</span>
      </h1>

      <p className="text-lg tracking-wider w-50">
        Make the most of your #scandlexperience
      </p>
    </div>
  );
};
export default PromoBanner;
