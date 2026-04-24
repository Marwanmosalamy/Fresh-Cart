"use client";

import { ProductType } from "@/api/types/routemisr.type";
import AddBtn from "@/app/_components/AddBtn/AddBtn";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  FaRegStar,
  FaStar,
  FaShoppingCart,
  FaRegHeart,
  FaShareAlt,
  FaCheck,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";
import WishlistBtn from './../../../wishlist/WishlistBtn';

export default function ProductMainSection({
  myProduct,
}: {
  myProduct: ProductType;
}) {
  const [mainImage, setMainImage] = useState<string>(
    myProduct.imageCover || "",
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("reviews");

  const finalPrice = myProduct.priceAfterDiscount || myProduct.price;

  const getRatingDistribution = (avg: number, qty: number) => {
    if (!qty || qty === 0) {
      return [5, 4, 3, 2, 1].map((stars) => ({ stars, percentage: 0 }));
    }

    const distributions = [
      { min: 4.5, values: [75, 15, 5, 3, 2] },
      { min: 4.0, values: [50, 30, 10, 5, 5] },
      { min: 3.5, values: [30, 40, 15, 10, 5] },
      { min: 3.0, values: [15, 30, 35, 15, 5] },
      { min: 2.0, values: [5, 15, 30, 35, 15] },
      { min: 0, values: [0, 5, 15, 30, 50] },
    ];

    const match = distributions.find((d) => avg >= d.min)?.values || [
      0, 0, 0, 0, 0,
    ];

    return match.map((percentage, index) => ({
      stars: 5 - index,
      percentage,
    }));
  };

  const reviewStats = getRatingDistribution(
    myProduct.ratingsAverage || 0,
    myProduct.ratingsQuantity || 0,
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="bg-[#F8F9FA] rounded-2xl p-8 flex items-center justify-center aspect-square relative border border-slate-100">
            <img
              src={mainImage}
              alt={myProduct.title}
              className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[myProduct.imageCover, ...myProduct.images]
              .slice(0, 5)
              .map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-lg bg-[#F8F9FA] p-2 shrink-0 cursor-pointer border-2 transition-all ${mainImage === img ? "border-[#16A34A]" : "border-transparent hover:border-slate-300"}`}
                >
                  <img
                    src={img}
                    alt={`thumbnail ${idx}`}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex gap-2 mb-3">
            <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
              {myProduct.category?.name}
            </span>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">
              {myProduct.brand?.name}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#00173A] mb-3">
            {myProduct.title}
          </h1>

          <div className="rate flex items-center gap-1 mb-4">
            <div className="flex text-[#fcd53f] text-sm">
              {[1, 2, 3, 4, 5].map((star) =>
                star <= Math.floor(myProduct.ratingsAverage || 0) ? (
                  <FaStar key={star} />
                ) : (
                  <FaRegStar key={star} />
                ),
              )}
            </div>
            <span className="text-slate-500 text-sm ml-2 font-medium">
              {myProduct.ratingsAverage} ({myProduct.ratingsQuantity} reviews)
            </span>
          </div>

          <div className="text-3xl font-bold text-[#00173A] mb-4">
            {myProduct.priceAfterDiscount ? (
              <div className="flex items-center gap-3">
                <span>{myProduct.priceAfterDiscount} EGP</span>
                <span className="text-lg text-slate-400 line-through font-normal">
                  {myProduct.price} EGP
                </span>
              </div>
            ) : (
              <span>{myProduct.price} EGP</span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-500 text-sm font-medium">In Stock</span>
          </div>

          <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-2">
            {myProduct.description}
          </p>

          <div className="mb-6">
            <p className="text-xs text-slate-500 mb-2 font-medium">Quantity</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-11">
                <Button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="px-4  bg-white! text-slate-900 hover:bg-slate-200! h-full flex items-center justify-center transition-colors"
                >
                  <FaMinus size={12} />
                </Button>
                <span className="px-4 font-semibold text-slate-700 border-x border-slate-200 h-full flex items-center justify-center min-w-12">
                  {quantity}
                </span>
                <Button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 hover:bg-slate-200! bg-white! text-slate-900  h-full flex items-center justify-center transition-colors"
                >
                  <FaPlus size={12} />
                </Button>
              </div>
              <span className="text-sm text-slate-500">
                {myProduct.quantity} available
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg mb-6 border border-slate-100">
            <span className="text-slate-500 font-medium text-sm">
              Total Price:
            </span>
            <span className="text-[#16A34A] font-bold text-xl">
              {(finalPrice * quantity).toFixed(2)} EGP
            </span>
          </div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
  <AddBtn
    id={myProduct.id}
    quantity={quantity}
    classes="bg-[#16A34A] cursor-pointer hover:bg-green-600 text-white flex items-center justify-center gap-2 w-full h-14 rounded-lg text-[15px] font-semibold transition-all"
    word={
      <>
        <FaShoppingCart className="text-lg" /> Add to Cart
      </>
    }
  />
  
  <Button 
    className="bg-[#0f172a] cursor-pointer hover:bg-slate-800 text-white flex items-center justify-center gap-2 w-full h-14 rounded-lg text-[15px] font-semibold transition-all"
  >
    <FaBolt className="text-lg" /> Buy Now
  </Button>
</div>

<div className="flex gap-3 mb-8">
<WishlistBtn
  id={myProduct.id || myProduct._id}
  classes="flex-1 flex justify-center items-center gap-2 cursor-pointer py-3 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-all font-semibold"

/>
  
  <Button
    variant="outline"
    className="w-14 h-auto py-0 flex items-center justify-center rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
  >
    <FaShareAlt className="text-lg" />
  </Button>
</div>
        </div>
      </div>

      <div className="mt-16 lg:mt-20">
        <div className="flex gap-6 md:gap-10 border-b border-slate-200 overflow-x-auto scrollbar-hide cursor-pointer">
          <button
            onClick={() => setActiveTab("details")}
            className={`pb-3 px-1 flex gap-2 items-center whitespace-nowrap transition-all font-semibold ${activeTab === "details" ? "text-[#16A34A] border-b-2 border-[#16A34A]" : "text-slate-500 hover:text-slate-800"}`}
          >
            <FaCheck /> Product Details
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 px-1 flex gap-2 items-center whitespace-nowrap transition-all font-semibold ${activeTab === "reviews" ? "text-[#16A34A] border-b-2 border-[#16A34A]" : "text-slate-500 hover:text-slate-800"}`}
          >
            <FaStar /> Reviews ({myProduct.ratingsQuantity})
          </button>
          <button
            onClick={() => setActiveTab("shipping")}
            className={`pb-3 px-1 flex gap-2 items-center whitespace-nowrap transition-all font-semibold ${activeTab === "shipping" ? "text-[#16A34A] border-b-2 border-[#16A34A]" : "text-slate-500 hover:text-slate-800"}`}
          >
            <FaTruck /> Shipping & Returns
          </button>
        </div>

        <div className="border border-slate-100 shadow-sm rounded-xl p-6 lg:p-8 mt-6">
          {activeTab === "details" && (
            <>
              <h3 className="font-bold text-lg text-slate-800 mb-3">
                About this Product
              </h3>
              <p className="text-slate-600 text-[15px] mb-10 leading-relaxed max-w-4xl">
                {myProduct.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-5 text-[15px]">
                    Product Information
                  </h4>
                  <div className="space-y-4 text-[14px]">
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-500">Category</span>
                      <span className="font-medium text-slate-800">
                        {myProduct.category?.name}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-500">Brand</span>
                      <span className="font-medium text-slate-800">
                        {myProduct.brand?.name}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                      <span className="text-slate-500">Available Quantity</span>
                      <span className="font-medium text-slate-800">
                        {myProduct.quantity} Pieces
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-5 text-[15px]">
                    Key Features
                  </h4>
                  <ul className="space-y-4 text-[14px] text-slate-600">
                    <li className="flex gap-3 items-center">
                      <FaCheck className="text-[#16A34A] shrink-0" /> Premium
                      Quality Product
                    </li>
                    <li className="flex gap-3 items-center">
                      <FaCheck className="text-[#16A34A] shrink-0" /> 100%
                      Authentic Guarantee
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}

          {activeTab === "reviews" && (
            <div className="flex flex-col md:flex-row gap-10 py-4">
              <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
                <div className="text-7xl font-bold text-[#00173A] mb-3">
                  {myProduct.ratingsAverage}
                </div>
                <div className="flex text-[#fcd53f] mb-3 text-xl">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= Math.floor(myProduct.ratingsAverage || 0) ? (
                      <FaStar key={star} />
                    ) : (
                      <FaRegStar key={star} />
                    ),
                  )}
                </div>
                <div className="text-sm text-slate-500">
                  Based on {myProduct.ratingsQuantity} reviews
                </div>
              </div>
              <div className="w-full md:w-2/3 flex flex-col gap-4 justify-center border-l border-slate-100 pl-0 md:pl-8">
                {reviewStats.map((item) => (
                  <div key={item.stars} className="flex items-center gap-4">
                    <span className="w-12 text-sm text-slate-600 font-medium whitespace-nowrap">
                      {item.stars} star
                    </span>
                    <div className="flex-1 h-2.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#fcd53f] rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="w-10 text-sm text-slate-500 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="flex flex-col gap-6 py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#eefcf2] p-6 lg:p-8 rounded-xl border border-[#dcfce7]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-sm shrink-0">
                      <FaTruck size={20} />
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg">
                      Shipping Information
                    </h4>
                  </div>
                  <ul className="space-y-4 text-[15px] text-slate-700 font-medium">
                    <li className="flex gap-3 items-center">
                      <FaCheck className="text-[#16A34A] shrink-0" /> Free
                      shipping on orders over $50
                    </li>
                  </ul>
                </div>
                <div className="bg-[#eefcf2] p-6 lg:p-8 rounded-xl border border-[#dcfce7]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-sm shrink-0">
                      <FaUndo size={20} />
                    </div>
                    <h4 className="font-bold text-slate-800 text-lg">
                      Returns & Refunds
                    </h4>
                  </div>
                  <ul className="space-y-4 text-[15px] text-slate-700 font-medium">
                    <li className="flex gap-3 items-center">
                      <FaCheck className="text-[#16A34A] shrink-0" /> 30-day
                      hassle-free returns
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-[#f8f9fa] p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-5 mt-2 border border-slate-100">
                <div className="w-14 h-14 rounded-full bg-[#e2e8f0] text-[#64748b] flex items-center justify-center shrink-0">
                  <FaShieldAlt size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1">
                    Buyer Protection Guarantee
                  </h4>
                  <p className="text-[15px] text-slate-600">
                    Get a full refund if your order doesn't arrive or isn't as
                    described. We ensure your shopping experience is safe and
                    secure.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
