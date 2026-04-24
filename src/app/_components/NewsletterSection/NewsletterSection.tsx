"use client";

import React from "react";
import { FiMail, FiArrowRight, FiSmartphone } from "react-icons/fi";
import { FaApple, FaGooglePlay, FaStar } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";
import { LuLeaf, LuTag } from "react-icons/lu";

export default function NewsletterSection() {
  return (
    <section className="w-[90%] max-w-7xl mx-auto my-16 lg:my-24">
      <div className="relative bg-white rounded-[32px] p-6 sm:p-10 lg:p-14 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#009966]/10 via-transparent to-slate-50/50 pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#00BC7D] to-[#00BBA7] rounded-2xl flex items-center justify-center text-white shadow-[0_10px_15px_-3px_rgba(0,188,125,0.3),0_4px_6px_-4px_rgba(0,188,125,0.3)] shrink-0">
                <FiMail size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-[#009966] text-[13px] font-bold tracking-wider uppercase">
                  Newsletter
                </span>
                <span className="text-slate-500 text-[13px] font-medium">
                  50,000+ subscribers
                </span>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#1e293b] leading-tight mb-4">
              Get the Freshest Updates{" "}
              <span className="text-[#009966]">Delivered Free</span>
            </h2>

            <p className="text-slate-500 text-[16px] md:text-[18px] mb-8 max-w-xl">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>

            <div className="flex flex-col md:flex-row flex-wrap gap-3 mb-10 items-start">
              <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-full px-5 py-2.5 text-[14px] font-medium text-slate-600 shadow-sm w-fit">
                <LuLeaf className="text-[#009966]" size={18} />
                Fresh Picks Weekly
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-full px-5 py-2.5 text-[14px] font-medium text-slate-600 shadow-sm w-fit">
                <MdLocalShipping className="text-[#009966]" size={18} />
                Free Delivery Codes
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-full px-5 py-2.5 text-[14px] font-medium text-slate-600 shadow-sm w-fit">
                <LuTag className="text-[#009966]" size={18} />
                Members-Only Deals
              </div>
            </div>

            <form
              className="flex flex-col md:flex-row gap-3 max-w-xl mb-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="you@example.com"
                required
                className="flex-1 w-full min-h-[56px] py-4 rounded-xl border border-slate-200 px-5 text-[15px] outline-none focus:border-[#009966] focus:ring-1 focus:ring-[#009966] shadow-sm"
              />
              <button
                type="submit"
                className="w-full md:w-auto min-h-[56px] py-4 bg-gradient-to-r from-[#009966] to-[#00BC7D] text-white px-8 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#009966]/20 hover:opacity-90 transition-all shrink-0"
              >
                Subscribe <FiArrowRight size={18} />
              </button>
            </form>

            <div className="flex items-center gap-1.5 text-[13px] text-slate-400 font-medium">
              <BsStars className="text-[#fcd53f]" size={14} />
              Unsubscribe anytime. No spam, ever.
            </div>
          </div>

          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-[#111827] rounded-[32px] p-8 sm:p-10 relative overflow-hidden text-white w-full max-w-md mx-auto shadow-2xl border border-slate-800">
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#009966] opacity-20 blur-[70px] rounded-full pointer-events-none"></div>

              <div className="inline-flex items-center gap-2 bg-[#009966]/10 text-[#00BC7D] text-[11px] font-bold px-3 py-1.5 rounded-full mb-6 border border-[#009966]/20 uppercase tracking-wider">
                <FiSmartphone size={14} /> Mobile App
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                Shop Faster on Our App
              </h3>
              <p className="text-slate-400 text-[15px] mb-8 leading-relaxed">
                Get app-exclusive deals & 15% off your first order.
              </p>

              <div className="flex flex-col gap-3 mb-8 relative z-10">
                <a
                  href="#"
                  className="flex items-center gap-4 bg-[#1f2937] hover:bg-[#374151] hover:scale-[1.03] transition-all duration-300 p-4 rounded-xl border border-slate-700/50"
                >
                  <FaApple size={28} className="text-white" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                      Download on
                    </span>
                    <span className="text-[16px] font-bold leading-none text-white">
                      App Store
                    </span>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-4 bg-[#1f2937] hover:bg-[#374151] hover:scale-[1.03] transition-all duration-300 p-4 rounded-xl border border-slate-700/50"
                >
                  <FaGooglePlay size={26} className="text-white ml-0.5" />
                  <div className="flex flex-col ml-0.5">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">
                      Get it on
                    </span>
                    <span className="text-[16px] font-bold leading-none text-white">
                      Google Play
                    </span>
                  </div>
                </a>
              </div>

              <div className="flex items-center gap-3 text-[13px] font-medium text-slate-300 relative z-10">
                <div className="flex text-[#fcd53f]">
                  <FaStar size={14} />
                  <FaStar size={14} />
                  <FaStar size={14} />
                  <FaStar size={14} />
                  <FaStar size={14} />
                </div>
                <span>4.9 • 100K+ downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}