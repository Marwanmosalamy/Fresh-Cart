import React from "react";
import Link from "next/link";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { ProductType } from "@/api/types/routemisr.type";
import { FaBoxOpen } from "react-icons/fa6";

export default async function ShopPage() {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products?limit=40",
  );
  const data = await res.json();
  const products: ProductType[] = data.data || [];

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <section className="w-full flex items-center  bg-[linear-gradient(135deg,#16A34A_0%,#22C55E_50%,#4ADE80_100%)] relative overflow-hidden py-12">
        <div className="container mx-auto px-4 lg:px-12 flex flex-col gap-3 z-10">
          <nav className="flex items-center gap-1.5 text-[13px] font-medium text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/60">/</span>
            <span className="text-white font-semibold">All Products</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <FaBoxOpen className="text-white text-4xl" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h1 className="text-white text-[28px] md:text-[32px] font-bold leading-tight">
                All Products
              </h1>
              <p className="text-white/80 text-[14px] font-normal">
                Explore our complete product collection
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full">
        <div className="container mx-auto px-4 lg:px-12 py-5">
          <div className="text-slate-500 text-sm font-semibold">
            Showing
            <span className="text-slate-900 font-bold px-2 pr-2 ps-2">
              {products.length}
            </span>
            products
          </div>
        </div>
      </div>
      <section className="container mx-auto px-4 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
