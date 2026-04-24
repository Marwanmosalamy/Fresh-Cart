"use client";
import { ProductType } from "@/api/types/routemisr.type";
import React from "react";
import Link from "next/link";
import { FaRegStar, FaStar, FaRegEye } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";
import AddBtn from "../AddBtn/AddBtn";
import WishlistBtn from "@/app/wishlist/WishlistBtn";

export default function ProductCard({ product }: { product: ProductType }) {
  const productId = product._id || product.id;

  return (
    <div className="group relative border border-gray-100 rounded-xl p-3 bg-white transition-all hover:shadow-lg overflow-hidden h-full flex flex-col">
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 ">
        <WishlistBtn
          id={productId}
          classes="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-500 hover:text-red-500 transition cursor-pointer border border-gray-50"
        />
        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-500 hover:text-[#16A34A] transition cursor-pointer border border-gray-50">
          <LuRefreshCw className="text-xl" />
        </button>
        <Link
          href={`/productdetails/${productId}`}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-500 hover:text-[#16A34A] transition cursor-pointer border border-gray-50"
        >
          <FaRegEye className="text-xl" />
        </Link>
      </div>

      <Link
        href={`/productdetails/${productId}`}
        className="flex flex-col grow cursor-pointer"
      >
        <div className="flex justify-center mb-3 h-48 overflow-hidden rounded-lg bg-[#f8f9fa] items-center">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-[85%] h-[85%] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <h3 className="text-sm text-slate-400 font-medium line-clamp-1 mb-1">
          {product.category?.name}
        </h3>

        <h2 className="text-[#00173A] font-semibold text-lg line-clamp-1 mb-2 group-hover:text-[#16A34A] transition-colors">
          {product.title}
        </h2>

        <div className="rate flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) =>
            star <= (product.ratingsAverage || 0) ? (
              <FaStar
                key={star}
                style={{ color: "#fcd53f" }}
                className="text-sm"
              />
            ) : (
              <FaRegStar
                key={star}
                style={{ color: "#fcd53f" }}
                className="text-sm"
              />
            ),
          )}
          <span className="text-slate-600 text-sm ml-1">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>
      </Link>

      <div className="price flex justify-between items-center mt-auto pt-2 border-t border-slate-50">
        <div className="flex flex-col">
          {product.priceAfterDiscount ? (
            <>
              <span className="text-[#00173A] font-bold text-lg">
                {product.priceAfterDiscount} EGP
              </span>
              <span className="text-sm text-slate-500 line-through">
                {product.price} EGP
              </span>
            </>
          ) : (
            <span className="text-[#00173A] font-bold text-xl">
              {product.price} EGP
            </span>
          )}
        </div>

        <AddBtn
          id={productId}
          classes="w-10 h-10 rounded-full bg-[#16A34A] text-2xl cursor-pointer text-white flex justify-center items-center pb-1 hover:bg-[#089608] transition-colors shadow-sm"
          word="+"
        />
      </div>
    </div>
  );
}
