"use client";

import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import EmptyWishlist from "@/app/wishlist/EmptyWishlist";
import { toast } from "react-hot-toast";
import { ProductType } from "@/api/types/routemisr.type";
import WishlistTable from "./WishlistTable";
import {
  getLoggedUserWishlist,
  RemoveProductFromWishlist,
} from "./wishlist.actions";
import { PulseLoader } from "react-spinners";

export default function Cart() {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  async function getWishlist() {
    try {
      const res = await getLoggedUserWishlist();
      if (res.status === "success") {
        setProducts(res.data);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(id: string) {
    try {
      setActionLoading(true);
      const res = await RemoveProductFromWishlist(id);
      if (res.status === "success") {
        toast.success(res.message, { position: "top-right", duration: 2000 });
        await getWishlist();
      } else {
        toast.error(res.message, { position: "top-right", duration: 2000 });
      }
    } catch (error) {
      console.error("Failed to remove product:", error);
    } finally {
      setActionLoading(false);
    }
  }

  useEffect(() => {
    getWishlist();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PulseLoader color="#0aad0a" />
      </div>
    );

  return (
    <main className="bg-[#fcfcfc] py-12 ">
      <div className="container mx-auto px-4 lg:px-12">
        {products && products.length > 0 ? (
          <>
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-red-50 p-3 rounded-lg text-red-500 text-[30px] border border-red-100 shadow-sm">
                <FaHeart />
              </div>
              <div>
                <h1 className="text-[24px] font-bold text-[#111827]">
                  My Wishlist
                </h1>
                <p className="text-[14px] text-gray-500 font-medium">
                  <span>{products.length} items saved</span>
                </p>
              </div>
            </div>

            <WishlistTable
              products={products}
              onRemove={handleRemove}
              disabled={actionLoading}
            />
          </>
        ) : (
          <EmptyWishlist />
        )}
      </div>
    </main>
  );
}
