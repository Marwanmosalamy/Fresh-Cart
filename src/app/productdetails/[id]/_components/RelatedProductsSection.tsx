"use client";

import React, { useRef } from "react";
import { ProductType } from "@/api/types/routemisr.type";
import ProductCard from "../../../_components/ProductCard/ProductCard"; 
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function RelatedProductsSection({ allProducts }: { allProducts: ProductType[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const limitedProducts = allProducts.slice(0, 10);

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-20 mb-10 overflow-hidden">
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <span className="w-1.5 h-7 bg-[#16A34A] rounded-full inline-block"></span>
          You May Also <span className="text-[#16A34A]">Like</span>
        </h2>
        <div className="flex gap-2">
          <Button 
            onClick={prevSlide}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#16A34A] hover:text-white transition-colors"
          >
            <FaChevronLeft size={12} />
          </Button>
          <Button 
            onClick={nextSlide}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#16A34A] hover:text-white transition-colors"
          >
            <FaChevronRight size={12} />
          </Button>
        </div>
      </div>
      
      <div  
         ref={sliderRef}
         className="flex gap-4 overflow-hidden scroll-smooth  snap-x snap-mandatory pb-4"
      >
        {limitedProducts.map((product) => (
          <div 
            key={product._id} 
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 shrink-0 snap-start"
          >
             <Link href={`/productdetails/${product.id}`} className="block h-full">
               <ProductCard product={product} />
             </Link>
          </div>
        ))}
      </div>
      
    </div>
  );
}