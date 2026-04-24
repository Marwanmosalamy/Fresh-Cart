"use client";

import React, { useState } from "react";
import { CategoryType, SubCategoryType, ProductType } from "@/api/types/routemisr.type";
import { getProductsBySubcategory } from "@/api/services/routemisr.service";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { FaFolder } from "react-icons/fa";
import { FiPackage, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { PulseLoader } from "react-spinners";

export default function CategoryClientView({
  category,
  subcategories,
  initialProducts,
  initialView
}: {
  category: CategoryType;
  subcategories: SubCategoryType[];
  initialProducts: ProductType[];
  initialView: 'folders' | 'products';
}) {
  const [currentView, setCurrentView] = useState<'folders' | 'category-products' | 'subcategory-products'>(
    initialView === 'products' ? 'category-products' : 'folders'
  );
  
  const [activeSubId, setActiveSubId] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  const handleSubcategoryClick = async (subId: string) => {
    setLoading(true);
    setActiveSubId(subId);
    const filtered = await getProductsBySubcategory(subId);
    setProducts(filtered || []);
    setCurrentView('subcategory-products');
    setLoading(false);
  };

  const clearSelection = () => {
    setActiveSubId(null);
    setCurrentView('folders');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10">

      {currentView === 'folders' && (
        <div className="mb-12 animate-in fade-in duration-500">
          <h2 className="text-xl font-bold text-[#00173A] mb-8 flex items-center gap-2">
            <span className="w-1.5 h-7 bg-[#16A34A] rounded-full inline-block"></span>
            {subcategories.length} Subcategories in {category.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subcategories.map((sub) => (
              <div
                key={sub._id}
                onClick={() => handleSubcategoryClick(sub._id)}
                className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-[#16A34A] hover:shadow-md hover:scale-[1.02] cursor-pointer flex flex-col items-start transition-all duration-300 group"
              >
                <div className="w-12 h-10 rounded-xl bg-[#eefcf2] flex items-center justify-center mb-5  transition-colors">
                  <FaFolder className="text-[#16A34A]  text-xl transition-colors" />
                </div>
                <h3 className="font-bold text-[#00173A] text-[15px]">{sub.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {(currentView === 'category-products' || currentView === 'subcategory-products') && (
        <div className="min-h-100">
          {loading ? (
            <div className="flex justify-center py-20"><PulseLoader color="#16A34A" /></div>
          ) : (
            <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">

              {currentView === 'subcategory-products' && activeSubId && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
                  <h2 className="text-2xl font-bold text-[#00173A] flex items-center gap-2">
                    <span className="w-1.5 h-7 bg-[#16A34A] rounded-full inline-block"></span>
                    {subcategories.find((s) => s._id === activeSubId)?.name}
                  </h2>
                  <button
                    onClick={clearSelection}
                    className="flex items-center gap-2 text-[#16A34A] font-semibold hover:bg-green-50 px-4 py-2 rounded-lg transition-colors border border-[#16A34A]/20"
                  >
                    <FiArrowLeft /> Back to Subcategories
                  </button>
                </div>
              )}

              {currentView === 'category-products' && (
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                  <span className="w-1.5 h-8 bg-[#16A34A] rounded-full inline-block"></span>
                  <h1 className="text-3xl font-bold text-[#00173A]">{category.name} Products</h1>
                </div>
              )}

              {products.length > 0 ? (
                <>
                  <p className="text-slate-500 mb-6 font-medium text-[15px]">
                    Showing {products.length} products
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {products.map((p) => (
                      <Link href={`/productdetails/${p.id}`} key={p._id} className="hover:-translate-y-1 transition-transform group block">
                        <div className="h-full group-hover:shadow-xl rounded-lg transition-shadow duration-300">
                          <ProductCard product={p} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 mt-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-5 shadow-sm">
                    <FiPackage className="text-slate-400 text-3xl" />
                  </div>
                  <h3 className="text-[20px] font-bold text-[#00173A] mb-2">No Products Found</h3>
                  <p className="text-slate-500 mb-8 text-[15px]">No products match your current filters.</p>
                  {currentView === 'subcategory-products' ? (
                    <button onClick={clearSelection} className="bg-[#16A34A] hover:bg-green-600 text-white px-8 py-2.5 rounded-lg font-semibold transition-colors shadow-sm">
                      Back to Subcategories
                    </button>
                  ) : (
                    <Link href="/">
                      <button className="bg-[#16A34A] hover:bg-green-600 text-white px-8 py-2.5 rounded-lg font-semibold transition-colors shadow-sm">
                        Back to Home Page
                      </button>
                    </Link>
                  )}
                </div>
              )}

            </div>
          )}
        </div>
      )}
    </div>
  );
}