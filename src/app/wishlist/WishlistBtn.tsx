"use client";
import React, { useEffect, useState } from "react";
import {
  AddProductToWishlist,
  RemoveProductFromWishlist,
  getLoggedUserWishlist,
} from "./wishlist.actions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useApp } from "@/context/AppContext";
export default function WishlistBtn({
  id,
  classes,
}: {
  id: string;
  classes?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { refreshWishlist } = useApp();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await getLoggedUserWishlist();
        if (res.status === "success") {
          const isFound = res.data.some(
            (item: any) => (item._id || item.id) === id,
          );
          setIsInWishlist(isFound);
        }
      } catch (error) {
        console.error("Wishlist check failed", error);
      }
    }
    checkStatus();
  }, [id]);

async function toggleWishlist() {
    setIsLoading(true);
    try {
      if (isInWishlist) {
        const res = await RemoveProductFromWishlist(id);
        if (res.status === "success") {
          toast.success(res.message);
          setIsInWishlist(false);
          await refreshWishlist();
        } else {
          toast.error(res.message || "Please login first");
        }
      } else {
        const res = await AddProductToWishlist(id);
        if (res.status === "success") {
          toast.success(res.message);
          setIsInWishlist(true);
          await refreshWishlist();
        } else {
          toast.error(res.message || "Please login first");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      disabled={isLoading}
      onClick={(e) => {
        e.preventDefault();
        toggleWishlist();
      }}
      className={classes}
    >
      {isLoading ? (
        <AiOutlineLoading3Quarters className="animate-spin" size={20} />
      ) : isInWishlist ? (
        <FaHeart className="text-red-500 text-xl" />
      ) : (
        <FaRegHeart className="text-xl" />
      )}
    </button>
  );
}
