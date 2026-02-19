"use client";

import { Input } from "@/components/ui/input";
import { ComponentProps } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type AuthInputFieldProps = ComponentProps<typeof Input> & {
  registration: UseFormRegisterReturn;
  error?: string;
};

export default function AuthInputField({
  registration,
  error,
  ...inputProps
}: AuthInputFieldProps) {
  return (
    <>
      <Input {...inputProps} {...registration} />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </>
  );
}
