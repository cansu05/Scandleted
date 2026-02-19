"use client";

import { addToCartAction } from "@/utils/action";
import AddToCartSubmitButton from "./AddToCartSubmitButton";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

const AddToCartButton = ({
  className,
  productId,
  amount,
}: {
  className?: string;
  productId: string;
  amount: number;
}) => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<{ productId: string; amount: number }>({
    defaultValues: { productId, amount },
  });
  const [pending, startTransition] = useTransition();

  const onSubmit = handleSubmit((values) => {
    startTransition(() => {
      void addToCartAction(values).then((result) => {
        if (result && typeof result === "object" && "ok" in result && result.ok === false) {
          return;
        }
        router.refresh();
      });
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" {...register("productId")} />
      <input type="hidden" {...register("amount", { valueAsNumber: true })} />
      <AddToCartSubmitButton className={className} pending={pending} />
    </form>
  );
};
export default AddToCartButton;
