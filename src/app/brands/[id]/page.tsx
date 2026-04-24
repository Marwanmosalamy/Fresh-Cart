import React from "react";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { HiOutlineTag } from "react-icons/hi";
import { FaStar, FaRegStar, FaRegHeart, FaRegEye } from "react-icons/fa";
import { LuRefreshCw, LuPackageOpen } from "react-icons/lu";

import AddBtn from "@/app/_components/AddBtn/AddBtn";
import WishlistBtn from "@/app/wishlist/WishlistBtn";
import { Button } from "@base-ui/react";

export default async function BrandProducts(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const brandRes = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
  );
  const brandResponse = await brandRes.json();
  const brandData = brandResponse.data;

  const productsRes = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`,
  );
  const productsResponse = await productsRes.json();
  const brandProducts = productsResponse.data || [];
  const brandCount = brandProducts.length;

  if (!brandData)
    return (
      <div className="py-20 text-center text-red-500 font-bold">
        Brand not found!
      </div>
    );

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <section className="w-full h-56 flex items-center justify-center bg-[linear-gradient(135deg,#16A34A_0%,#22C55E_50%,#4ADE80_100%)] opacity-100 overflow-hidden">
        <div className="container mx-auto px-4  flex flex-col gap-6">
          <div className="flex items-center gap-2 text-[14px] font-medium text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/brands" className="hover:text-white transition-colors">
              Brands
            </Link>
            <span>/</span>
            <span className="text-white">{brandData.name}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-xl overflow-hidden p-2">
              <img
                src={brandData.image}
                alt={brandData.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-white text-[36px] font-bold leading-10 tracking-tight">
                {brandData.name}
              </h1>
              <p className="text-white/80 text-[16px] font-medium">
                Showing {brandData.name} products
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-5 ">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[#4A5565] font-bold text-sm">
              <HiOutlineAdjustmentsHorizontal size={20} />
              <span>Active Filters:</span>
            </div>

            <div className="flex items-center gap-3 bg-[#F3E8FF] text-[#7008E7] px-4 py-2 rounded-full border border-[#DDD6FF] shadow-sm transition-all hover:bg-[#E9D5FF]">
              <div className="flex items-center gap-2">
                <HiOutlineTag size={18} />
                <span className="text-sm font-extrabold tracking-wide uppercase">
                  {brandData.name}
                </span>
              </div>
              <Link
                href="/products"
                className="text-[#7008E7]/70 hover:bg-[#7008E7] hover:text-white rounded-full p-0.5 transition-all"
              >
                <IoCloseOutline size={18} />
              </Link>
            </div>

            <Link
              href="/products"
              className="text-[#4A5565] hover:text-gray-900 text-sm font-bold underline underline-offset-1 transition-colors"
            >
              Clear all
            </Link>
          </div>
          <div className="text-gray-400 text-sm font-medium mt-2">
            Showing
            <span className="text-gray-900 font-bold">{brandCount}</span>{" "}
            products
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-12">
        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {brandProducts.map((product: any) => (
              <div key={product._id} className="group h-full">
                <div className="border border-gray-100 bg-white rounded-xl p-3 relative h-full flex flex-col hover:shadow-lg transition-all duration-300">
                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <WishlistBtn
                      id={product._id}
                      classes="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-500 hover:text-red-500 transition cursor-pointer"
                    />
                    <Button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-500 hover:text-[#16A34A] transition cursor-pointer">
                      <LuRefreshCw className="text-xl" />
                    </Button>
                    <Link
                      href={`/productdetails/${product._id}`}
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm text-slate-500 hover:text-[#16A34A] transition cursor-pointer"
                    >
                      <FaRegEye className="text-xl" />
                    </Link>
                  </div>

                  <Link
                    href={`/productdetails/${product._id}`}
                    className="flex flex-col grow"
                  >
                    <div className="flex justify-center mb-2 h-48 overflow-hidden rounded-lg bg-[#f8f9fa] items-center">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-[85%] h-[85%] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <h3 className="text-sm text-slate-500 line-clamp-1 mb-1 mt-2">
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
                    {product.priceAfterDiscount ? (
                      <div className="flex flex-col">
                        <span className="text-[#00173A] font-bold text-lg">
                          {product.priceAfterDiscount} EGP
                        </span>
                        <span className="text-sm text-slate-500 line-through">
                          {product.price} EGP
                        </span>
                      </div>
                    ) : (
                      <span className="text-[#00173A] font-bold text-xl">
                        {product.price} EGP
                      </span>
                    )}

                    <AddBtn
                      id={product._id}
                      classes="w-10 h-10 rounded-full bg-[#16A34A] text-2xl cursor-pointer text-white flex justify-center items-center pb-1 shadow-sm hover:bg-[#089608] transition-colors"
                      word="+"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center bg-transparent py-10">
            <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-3 border border-gray-100">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                <LuPackageOpen size={40} strokeWidth={1.5} />
              </div>
            </div>

            <h2 className="text-[28px] font-bold text-[#212529] mb-2 tracking-tight">
              No products found
            </h2>

            <p className="text-[#6c757d] text-[16px] max-w-md mb-8 leading-relaxed">
              No products match your current filters.
            </p>

            <Link
              href="/products"
              className="group flex items-center gap-2 bg-[#198754] text-white px-8 py-3 rounded-lg font-bold text-[16px] hover:bg-[#157347] transition-all active:scale-95 shadow-sm"
            >
              View All Products
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
