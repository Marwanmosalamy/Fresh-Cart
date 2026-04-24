import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { FiRefreshCcw, FiShield, FiHeadphones } from "react-icons/fi";

export default function FeaturesSection() {
  return (
    <section className="w-full bg-[#f4fbf6] py-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#dcfce7] flex items-center justify-center text-[#16A34A] shrink-0">
              <MdLocalShipping size={26} />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[#00173A] text-[16px] mb-0.5">
                Free Shipping
              </h3>
              <p className="text-slate-500 text-[14px]">
                On orders over 500 EGP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#dcfce7] flex items-center justify-center text-[#16A34A] shrink-0">
              <FiRefreshCcw size={22} />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[#00173A] text-[16px] mb-0.5">
                Easy Returns
              </h3>
              <p className="text-slate-500 text-[14px]">
                14-day return policy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#dcfce7] flex items-center justify-center text-[#16A34A] shrink-0">
              <FiShield size={22} />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[#00173A] text-[16px] mb-0.5">
                Secure Payment
              </h3>
              <p className="text-slate-500 text-[14px]">
                100% secure checkout
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#dcfce7] flex items-center justify-center text-[#16A34A] shrink-0">
              <FiHeadphones size={22} />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-[#00173A] text-[16px] mb-0.5">
                24/7 Support
              </h3>
              <p className="text-slate-500 text-[14px]">
                Contact us anytime
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}