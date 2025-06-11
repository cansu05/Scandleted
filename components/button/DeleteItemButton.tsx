"use client";

import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { removeCartItem } from "@/redux/cart/cartSlice";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteItemButton = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await dispatch(removeCartItem({ cartItemId: id })).unwrap();
      toast.success("Product deleted from cart");
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("An error occurred while deleting the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer"
      onClick={handleDelete}
      disabled={loading}
    >
      <AiOutlineDelete className="h-4 w-4" />
    </Button>
  );
};

export default DeleteItemButton;
