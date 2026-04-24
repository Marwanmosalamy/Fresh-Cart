import { getAllCategories } from "@/api/services/routemisr.service";
import { CategoryType } from "@/api/types/routemisr.type";
import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { IoLayers } from "react-icons/io5";

export default async function CategoriesPage() {
  const allCategories = await getAllCategories();

  return (
    <>
      <section className="w-full flex items-center bg-[linear-gradient(135deg,#16A34A_0%,#22C55E_50%,#4ADE80_100%)] relative overflow-hidden py-12">
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
              <IoLayers className="text-white text-4xl" />
            </div>
            <div className="flex flex-col gap-0.5">
              <h1 className="text-white text-[28px] md:text-[32px] font-bold leading-tight">
                All Categories
              </h1>
              <p className="text-white/80 text-[14px] font-normal">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {allCategories?.map((category: CategoryType) => (
            <Link
              href={`/categories/${category._id}`}
              key={category._id}
              className="group flex flex-col items-center bg-white border border-slate-100 rounded-2xl p-5 hover:border-[#16A34A] hover:shadow-lg transition-all duration-300"
            >
              <div className="w-full aspect-square relative mb-4 overflow-hidden rounded-xl bg-white flex items-center justify-center p-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h2 className="text-[#00173A] font-bold text-[15px] text-center group-hover:text-[#16A34A] transition-colors">
                {category.name}
              </h2>

              <div className="h-0 overflow-hidden opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-3 transition-all duration-300">
                <span className="text-[#16A34A] text-[12px] font-semibold flex items-center gap-1">
                  View Subcategories <FiArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
