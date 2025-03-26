import { Skeleton } from "@/components/ui/skeleton";

const LoadingContainer = ({ products }: { products?: number }) => {
  return (
    <div className="grid space-y-8 lg:space-y-0 gap-x-5 lg:grid-cols-3 sm:grid-cols-2 gap-y-10">
      {[...Array(products ?? 6)].map((_, i) => (
        <LoadingProduct key={i} />
      ))}
    </div>
  );
};
export default LoadingContainer;

const LoadingProduct = () => {
  return (
    <div className="flex flex-col space-y-3 px-5 py-3 ">
      <div className="w-full aspect-square relative">
        <Skeleton className="w-full h-full absolute bg-secondary" />
      </div>

      <div className="space-y-3 px-0">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-[150px] bg-secondary" />
          <Skeleton className="h-4 w-[50px] bg-secondary" />
        </div>

        <Skeleton className="h-4 w-[200px] bg-secondary" />
        <Skeleton className="h-4 w-[180px] bg-secondary" />

        <Skeleton className="h-10 w-full bg-secondary rounded-full" />
      </div>
    </div>
  );
};
