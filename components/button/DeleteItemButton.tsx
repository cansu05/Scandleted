"use client";

import { removeCartItemAction } from "@/utils/action";
import DeleteItemSubmitButton from "./DeleteItemSubmitButton";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

const DeleteItemButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const { handleSubmit, register } = useForm<{ id: string }>({
    defaultValues: { id },
  });
  const [pending, startTransition] = useTransition();

  const onSubmit = handleSubmit((values) => {
    startTransition(() => {
      void removeCartItemAction(values).then((result) => {
        if (result && typeof result === "object" && "ok" in result && result.ok === false) {
          return;
        }
        router.refresh();
      });
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" {...register("id")} />
      <DeleteItemSubmitButton pending={pending} />
    </form>
  );
};
export default DeleteItemButton;
