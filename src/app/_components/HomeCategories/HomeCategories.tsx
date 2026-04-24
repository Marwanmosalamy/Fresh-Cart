import { getAllCategories } from "@/api/services/routemisr.service";
import { CategoryType } from "@/api/types/routemisr.type";
import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

export default async function HomeCategories() {
  const allCategories = await getAllCategories();

  return (
    <section className="w-[90%] mx-auto  my-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-[#00173A]">
          <span className="w-1.5 h-7 md:h-8 bg-[#16A34A] rounded-full inline-block"></span>
          Shop By <span className="text-[#16A34A]">Category</span>
        </h1>
        <Link
          href="/categories"
          className="flex self-end sm:self-auto items-center gap-1.5 text-[#16A34A] hover:text-green-700 font-medium shrink-0"
        >
          View All Categories{" "}
          <span className="text-xl leading-none font-bold">
            <FiArrowRight />
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
        {allCategories?.map((category: CategoryType) => (
          <Link
            href={`/categories/${category._id}`}
            key={category._id}
            className=" border border-slate-100 rounded-xl p-5 md:p-6 flex flex-col items-center justify-center gap-4 shadow-xs hover:shadow-md transition-shadow duration-300"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-slate-50 shrink-0">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-[#334155] font-medium text-sm md:text-base text-center">
              {category.name}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
