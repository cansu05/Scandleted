"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { logoutAction } from "@/utils/action";
import { Button } from "../ui/button";

const LogoutSubmitButton = () => {
  const { handleSubmit } = useForm<Record<string, never>>();
  const [pending, startTransition] = useTransition();

  const onSubmit = handleSubmit(() => {
    startTransition(() => {
      void logoutAction({});
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Button
        type="submit"
        variant="outline"
        disabled={pending}
        className="lg:flex border-foreground rounded-3xl font-normal text-sm hover:bg-secondary hover:border-none w-24 cursor-pointer"
      >
        {pending ? "..." : "LOG OUT"}
      </Button>
    </form>
  );
};

export default LogoutSubmitButton;
