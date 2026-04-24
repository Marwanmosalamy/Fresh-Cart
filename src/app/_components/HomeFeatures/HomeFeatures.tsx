import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { FiRefreshCcw, FiShield, FiHeadphones } from "react-icons/fi";

export default function HomeFeatures() {
  return (
    <section className="w-full py-6 md:py-10 bg-slate-50">
      <div className="max-w-360 w-[95%] mx-auto px-2 md:px-4 lg:px-8 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <div className="flex items-center gap-3 md:gap-4 bg-white  border-2 border-slate-100  rounded-[14px] p-4 md:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0">
              <MdLocalShipping size={20} className="text-[#3b82f6]" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[#1e293b] text-[14px] md:text-[15px] mb-0.5">
                Free Shipping
              </h3>
              <p className="text-slate-500 text-[12px] md:text-[13px]">
                On orders over 500 EGP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 bg-white  border-2 border-slate-100  rounded-[14px] p-4 md:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#ecfdf5] flex items-center justify-center shrink-0">
              <FiShield size={18} className="text-[#10b981]" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[#1e293b] text-[14px] md:text-[15px] mb-0.5">
                Secure Payment
              </h3>
              <p className="text-slate-500 text-[12px] md:text-[13px]">
                100% secure transactions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 bg-white border-2 border-slate-100  rounded-[14px] p-4 md:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#fff7ed] flex items-center justify-center shrink-0">
              <FiRefreshCcw size={18} className="text-[#f97316]" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[#1e293b] text-[14px] md:text-[15px] mb-0.5">
                Easy Returns
              </h3>
              <p className="text-slate-500 text-[12px] md:text-[13px]">
                14-day return policy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 bg-white border-2 border-slate-100 rounded-[14px] p-4 md:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_5px_15px_rgba(0,0,0,0.05)] transition-all">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#faf5ff] flex items-center justify-center shrink-0">
              <FiHeadphones size={18} className="text-[#a855f7]" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[#1e293b] text-[14px] md:text-[15px] mb-0.5">
                24/7 Support
              </h3>
              <p className="text-slate-500 text-[12px] md:text-[13px]">
                Dedicated support team
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
