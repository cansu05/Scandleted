import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("lg:max-w-6xl mx-auto sm:max-w-3xl", className)}>
      {children}
    </div>
  );
};
export default Container;
