"use client";

import { useActionState } from "react";
import React from "react";
import { actionFunction } from "@/utils/types";

const initialState = {
  message: "",
};

function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, initialState);
  console.log(state);
  return <form action={formAction}>{children}</form>;
}
export default FormContainer;
