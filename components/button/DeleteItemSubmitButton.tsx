"use client";

import { Button } from "../ui/button";
import { AiOutlineDelete, AiOutlineLoading3Quarters } from "react-icons/ai";

export default function DeleteItemSubmitButton({
  pending = false,
}: {
  pending?: boolean;
}) {
  return (
    <Button
      type="submit"
      variant="ghost"
      size="icon"
      disabled={pending}
      className="cursor-pointer"
    >
      {pending ? (
        <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin" />
      ) : (
        <AiOutlineDelete className="h-4 w-4" />
      )}
    </Button>
  );
}
