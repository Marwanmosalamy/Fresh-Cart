"use client"
import React from "react";
import Link from "next/link";
import { MdLocalShipping, MdPhone } from "react-icons/md";
import { FaGift } from "react-icons/fa6";
import { FaRegEnvelope, FaRegUser } from "react-icons/fa";
import { FiUserPlus, FiUser } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";


export default function FirstNav() {
  const { data: mySessionData, status } = useSession();
  function mySignOut() {
    signOut({ redirect: true, callbackUrl: "/Login" });
  }
  return (
    <div className="bg-white border-b border-slate-200 hidden lg:block">
      <div className="max-w-360 mx-auto px-6 lg:px-12 flex justify-between items-center py-2.5 text-[13px] text-slate-600 font-medium">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <MdLocalShipping className="text-[#16A34A] text-lg" />
            <span>Free Shipping on Orders 500 EGP</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGift className="text-[#16A34A] text-base" />
            <span>New Arrivals Daily</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#16A34A]">
              <MdPhone className="text-slate-500 text-base" />
              <span>+1 (800) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-[#16A34A]">
              <FaRegEnvelope className="text-slate-500 text-sm" />
              <span>support@freshcart.com</span>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-300"></div>

          {status === "unauthenticated" ? (
            <div className="flex items-center gap-5">
              <Link
                href="/Login"
                className="flex items-center gap-1.5 hover:text-[#16A34A] transition-colors"
              >
                <FaRegUser className="text-slate-500 text-sm" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/Register"
                className="flex items-center gap-1.5 hover:text-[#16A34A] transition-colors"
              >
                <FiUserPlus className="text-slate-500 text-sm" />
                <span>Sign Up</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5 text-slate-600">
                <FiUser className="text-slate-500 text-sm" />
                <span>{mySessionData?.user?.name}</span>
              </div>
              <button
                onClick={mySignOut}
                className="flex items-center gap-1.5 hover:text-[#16A34A] transition-colors"
              >
                <FaSignOutAlt className="text-slate-500 text-sm" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
