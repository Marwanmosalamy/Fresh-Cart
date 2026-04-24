import React from "react";
import Link from "next/link";
import { HiOutlineTag } from "react-icons/hi";
import { BrandType } from "@/api/types/routemisr.type";


export default async function Brands() {
  async function getAllBrands(): Promise<BrandType[] | undefined> {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`, {
        next: { revalidate: 3600 },
      });
      const data = await res.json();
      return data.data;
    } catch (err) {
      console.error("Fetch error:", err);
      return undefined;
    }
  }

  const AllBrands = await getAllBrands();

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <div
        className="relative w-full h-60 opacity-100 flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #7F22FE 0%, #8E51FF 50%, #C27AFF 100%)",
        }}
      >
        <div className="container mx-auto max-w-368 relative z-10 flex flex-col gap-2">
          <div className="flex w-376 items-center gap-2 opacity-100 h-5">
            <Link
              href="/"
              className="w-9.75 h-5 gap-1 text-white/80 hover:text-white transition-colors text-[14px] font-medium"
            >
              Home
            </Link>
            <span className="text-white/80 hover:text-white text-[14px]">
              /
            </span>
            <span className="text-white text-[14px] font-medium">Brands</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white shadow-xl border border-white/10">
              <HiOutlineTag size={37} />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Top Brands
              </h1>
              <p className="text-white/70 text-[16px] font-medium">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-368 px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {AllBrands?.map((brand: BrandType) => (
            <Link href={`/brands/${brand._id}`} key={brand._id}>
              <div className="group relative bg-white border border-gray-100 rounded-2xl p-6 transition-all duration-500 hover:border-[#DDD6FF] hover:shadow-[0_20px_40px_-15px_#DDD6FF]  flex flex-col items-center justify-center gap-6 cursor-pointer min-h-55 overflow-hidden">
                <div className="w-full h-32 flex items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-110">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="max-w-[80%] max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                <div className="text-center z-10">
                  <h3 className="text-sm font-bold text-gray-400 group-hover:text-[#7F22FE] transition-colors uppercase tracking-[0.2em]">
                    {brand.name}
                  </h3>
                  <p className="text-[10px] font-black text-[#7F22FE] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 mt-2">
                    VIEW PRODUCTS →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
