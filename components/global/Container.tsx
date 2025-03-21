import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("mx-auto lg:max-w-6xl px-5 sm:max-w-3xl", className)}>
      {children}
    </div>
  );
};
export default Container;
