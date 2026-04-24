import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function HomePromoBanners() {
  return (
    <div className="w-[90%] mx-auto mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

        <div
          className="relative overflow-hidden w-full rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between text-white min-h-[200px] sm:min-h-[240px] md:min-h-[300px]"
          style={{ background: "linear-gradient(135deg, #00BC7D 0%, #007A55 100%)" }}
        >
          <div
            className="absolute -top-10 -right-10 w-32 sm:w-40 h-32 sm:h-40 rounded-full"
            style={{ background: "rgba(255, 255, 255, 0.1)" }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-32 sm:w-40 h-32 sm:h-40 rounded-full"
            style={{ background: "rgba(255, 255, 255, 0.1)" }}
          />

          <div className="relative z-10 flex flex-col items-start gap-3 sm:gap-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-medium">
              <span>🔥</span> Deal of the Day
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-bold leading-tight">
                Fresh Organic Fruits
              </h3>
              <p className="text-[13px] sm:text-[15px] md:text-[16px] opacity-90">
                Get up to 40% off on selected organic fruits.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[24px] sm:text-[28px] md:text-[32px] font-black">40% OFF</span>
              <div className="text-[11px] sm:text-[12px] opacity-80 border-l border-white/30 pl-3">
                Use code: <span className="font-bold text-white">ORGANIC40</span>
              </div>
            </div>
          </div>

          <Link
            href="/shop"
            className="relative z-10 mt-4 bg-white text-[#007A55] px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-bold text-[13px] sm:text-[14px] w-fit flex items-center gap-2 hover:bg-gray-100 transition-all active:scale-95 shadow-lg"
          >
            Shop Now <FaArrowRight />
          </Link>
        </div>

        <div
          className="relative overflow-hidden w-full rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between text-white min-h-[200px] sm:min-h-[240px] md:min-h-[300px]"
          style={{ background: "linear-gradient(135deg, #FF8904 0%, #FF2056 100%)" }}
        >
          <div
            className="absolute -top-12 -right-12 w-32 sm:w-40 h-32 sm:h-40 rounded-full"
            style={{ background: "rgba(255, 255, 255, 0.1)" }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-32 sm:w-40 h-32 sm:h-40 rounded-full"
            style={{ background: "rgba(255, 255, 255, 0.1)" }}
          />

          <div className="relative z-10 flex flex-col items-start gap-3 sm:gap-4">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-medium uppercase tracking-wider">
              <span className="animate-pulse">✨</span> New Arrivals
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-bold leading-tight">
                Exotic Vegetables
              </h3>
              <p className="text-[13px] sm:text-[15px] md:text-[16px] opacity-90">
                Discover our latest collection of premium vegetables
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[24px] sm:text-[28px] md:text-[32px] font-black">25% OFF</span>
              <div className="text-[11px] sm:text-[12px] opacity-80 border-l border-white/30 pl-3">
                Use code: <span className="font-bold text-white">FRESH25</span>
              </div>
            </div>
          </div>

          <Link
            href="/shop"
            className="relative z-10 mt-4 bg-white text-[#FF2056] px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-bold text-[13px] sm:text-[14px] w-fit flex items-center gap-2 hover:bg-gray-100 transition-all active:scale-95 shadow-lg"
          >
            Explore Now <FaArrowRight />
          </Link>
        </div>

      </div>
    </div>
  );
}