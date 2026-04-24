"use client";

import React, { useState } from "react";
import { addToCart, updateProductQuantity } from "@/actions/cart.actions";
import { useApp } from "@/context/AppContext";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AddBtn({
  id,
  classes,
  word,
  quantity = 1,
}: {
  id: string;
  classes?: string;
  word?: string | React.ReactNode;
  quantity?: number;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { refreshCart } = useApp();

  async function handleAddToCart() {
    setIsLoading(true);
    try {
      const res = await addToCart(id);

      if (res.status === "success") {
        if (quantity > 1) {
          await updateProductQuantity(id, quantity);
        }
        toast.success(res.message);
        await refreshCart();
      } else {
        toast.error(res.message || "Failed to add to cart");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      disabled={isLoading}
      onClick={(e) => {
        e.preventDefault();
        handleAddToCart();
      }}
      className={classes}
    >
      {isLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin text-xl mx-auto" />
      ) : (
        word
      )}
    </button>
  );
}
