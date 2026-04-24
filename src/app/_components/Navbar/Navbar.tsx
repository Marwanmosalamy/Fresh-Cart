"use client";

import * as React from "react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiHeart,
  FiUser,
  FiHeadphones,
  FiMenu,
  FiX,
  FiSettings,
  FiLogOut,
  FiShoppingBag,
  FiMapPin,
} from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/api/types/routemisr.type";
import { getAllCategories } from "@/api/services/routemisr.service";
import logo from "@/assets/images/freshcart-logo.49f1b44d.svg";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const { cartCount, wishlistCount } = useApp();
  const { data: mySessionData, status } = useSession();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<CategoryType[]>([]);

  React.useEffect(() => {
    async function fetchCategories() {
      const data = await getAllCategories();
      setCategories(data?.slice(0, 4) ?? []);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function mySignOut() {
    signOut({ redirect: true, callbackUrl: "/Login" });
  }

  const userName: string = (mySessionData?.user?.name as string) ?? "";

  const isLoggedIn = status === "authenticated";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-360 mx-auto px-4 md:px-6 lg:px-12 flex items-center justify-between h-16 lg:h-13">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src={logo}
            alt="FreshCart"
            width={160}
            height={40}
            className="h-6 lg:h-7 w-auto object-contain"
          />
        </Link>

        <div className="hidden lg:flex flex-1 max-w-125 mx-4 xl:mx-8 relative items-center">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="w-full border border-slate-300 rounded-full py-2.5 pl-5 pr-14 text-sm text-slate-700 outline-none focus:border-[#0aad0a] focus:ring-1 focus:ring-[#0aad0a] transition-all"
          />
          <Button
            size="icon"
            className="absolute right-1 top-1 bottom-1 bg-[#0aad0a] hover:bg-green-600 text-white rounded-full h-auto w-11 transition-colors shadow-none"
          >
            <FiSearch size={18} />
          </Button>
        </div>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <Link href="/">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-transparent hover:text-[#0aad0a] text-[15px] font-medium text-[#1e293b]",
                  )}
                >
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/shop">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-transparent hover:text-[#0aad0a] text-[15px] font-medium text-[#1e293b]",
                  )}
                >
                  Shop
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-[#0aad0a] text-[15px] font-medium text-[#1e293b]">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col w-52 p-2 bg-white shadow-lg rounded-xl border border-slate-100">
                  <li>
                    <Link href="/categories">
                      <NavigationMenuLink className="block px-4 py-2.5 text-[15px] font-medium text-[#334155] hover:text-[#16A34A] hover:bg-slate-50 rounded-md transition-colors mb-1 border-b border-slate-100 pb-3">
                        All Categories
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  {categories?.map((cat) => (
                    <li key={cat._id}>
                      <Link href={`/categories/${cat._id}?view=products`}>
                        <NavigationMenuLink className="block px-4 py-2.5 text-[15px] text-[#475569] hover:text-[#16A34A] hover:bg-slate-50 rounded-md transition-colors">
                          {cat.name}
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/brands">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-transparent hover:text-[#0aad0a] text-[15px] font-medium text-[#1e293b]",
                  )}
                >
                  Brands
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden xl:flex items-center gap-3 ml-2">
          <div className="w-10 h-10 rounded-full bg-[#f0fdf4] flex items-center justify-center text-[#0aad0a]">
            <FiHeadphones size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] text-slate-400 font-medium mb-1.5">
              Support
            </span>
            <span className="text-[14px] font-semibold text-[#1e293b]">
              24/7 Help
            </span>
          </div>
        </div>

        <div className="hidden xl:block h-8 w-px bg-slate-200 mx-4"></div>

        <div className="flex items-center gap-3 lg:gap-5 ml-auto lg:ml-0">
          <Link
            href="/wishlist"
            className="flex text-[#64748b] hover:text-[#0aad0a] transition-colors p-1 relative"
          >
            <FiHeart className="h-6 w-6" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            className="text-[#64748b] hover:text-[#0aad0a] transition-colors p-1 relative"
          >
            <FaShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#0aad0a] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          <Sheet>
            <SheetTrigger className="lg:hidden">
              <Button className="bg-[#0aad0a] hover:bg-[#059669] text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ml-2">
                <FiMenu size={20} />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85%] max-w-85 bg-white p-6 [&>button.absolute]:hidden flex flex-col h-full overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <Link href="/" className="flex items-center shrink-0">
                  <Image
                    src={logo}
                    alt="FreshCart"
                    width={160}
                    height={40}
                    className="h-6 lg:h-7 w-auto object-contain"
                  />
                </Link>
                <SheetClose className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
                  <FiX size={18} />
                </SheetClose>
              </div>

              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full border border-slate-200 rounded-lg py-2.5 pl-4 pr-12 text-[14px] text-slate-600 outline-none focus:border-[#0aad0a] placeholder:text-slate-400"
                />
                <Button className="absolute right-1 top-1 bottom-1 bg-[#0aad0a] text-white rounded-md w-9 flex items-center justify-center">
                  <FiSearch size={16} />
                </Button>
              </div>

              <div className="flex flex-col gap-5 text-[17px] text-[#334155] font-medium mb-6">
                {[
                  { href: "/", label: "Home" },
                  { href: "/shop", label: "Shop" },
                  { href: "/categories", label: "Categories" },
                  { href: "/brands", label: "Brands" },
                ].map(({ href, label }) => (
                  <SheetClose key={href}>
                    <Link href={href} className="block text-left hover:text-[#0aad0a] transition-colors">
                      {label}
                    </Link>
                  </SheetClose>
                ))}
              </div>

              <div className="h-px w-full bg-slate-100 mb-4" />

              <div className="flex flex-col gap-1">
                <SheetClose>
                  <Link href="/wishlist" className="flex items-center gap-4 py-3">
                    <div className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-red-400 shrink-0">
                      <FiHeart size={20} />
                    </div>
                    <span className="flex-1 text-[16px] text-[#1e293b] font-medium text-left">Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="min-w-6.5 h-6.5 bg-red-500 text-white text-[12px] font-bold rounded-full flex items-center justify-center px-1.5">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </SheetClose>

                <SheetClose>
                  <Link href="/cart" className="flex items-center gap-4 py-3">
                    <div className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-[#0aad0a] shrink-0">
                      <FaShoppingCart size={20} />
                    </div>
                    <span className="flex-1 text-[16px] text-[#1e293b] font-medium text-left">Cart</span>
                    {cartCount > 0 && (
                      <span className="min-w-6.5 h-6.5 bg-[#0aad0a] text-white text-[12px] font-bold rounded-full flex items-center justify-center px-1.5">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </SheetClose>
              </div>

              <div className="h-px w-full bg-slate-100 my-4" />

              {isLoggedIn ? (
                <div className="flex flex-col gap-1">
                  <SheetClose >
                    <Link href="/profile" className="flex items-center gap-4 py-3">
                      <div className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-[#0aad0a] shrink-0">
                        <FiUser size={20} />
                      </div>
                      <span className="text-[16px] text-[#1e293b] font-medium truncate">
                        {userName || "My Account"}
                      </span>
                    </Link>
                  </SheetClose>

                  <SheetClose>
                    <button
                      onClick={mySignOut}
                      className="flex items-center gap-4 py-3 w-full"
                    >
                      <div className="w-11 h-11 rounded-full border border-red-100 flex items-center justify-center text-red-400 shrink-0">
                        <FiLogOut size={20} />
                      </div>
                      <span className="text-[16px] text-red-500 font-medium">Sign Out</span>
                    </button>
                  </SheetClose>
                </div>
              ) : (
                <div className="flex gap-3">
                  <SheetClose>
                    <Link
                      href="/Login"
                      className="flex-1 bg-[#0aad0a] hover:bg-green-600 text-white py-3 px-8 rounded-lg text-center font-medium transition-colors block"
                    >
                      Sign In
                    </Link>
                  </SheetClose>
                  <SheetClose>
                    <Link
                      href="/Register"
                      className="flex-1 border-2 border-[#0aad0a] text-[#0aad0a] py-3 px-8 rounded-lg text-center font-medium hover:bg-green-50 transition-colors block"
                    >
                      Sign Up
                    </Link>
                  </SheetClose>
                </div>
              )}

              <div className="mt-auto pt-6">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#0aad0a] shrink-0">
                    <FiHeadphones size={20} />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[14px] text-[#1e293b] font-bold">Need Help?</span>
                    <span className="text-[13px] text-[#0aad0a] hover:underline cursor-pointer">
                      Contact Support
                    </span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {!isLoggedIn ? (
            <Button className="hidden lg:flex bg-[#0aad0a] hover:bg-green-600 text-white px-5 py-5 rounded-full shadow-sm ml-2 cursor-pointer">
              <Link
                href="/Login"
                className="flex items-center gap-2 font-medium text-[15px]"
              >
                <FiUser size={18} />
                <span>Sign In</span>
              </Link>
            </Button>
          ) : (
            <div ref={profileRef} className="relative hidden lg:block ml-2">
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="w-10 h-10 rounded-full  text-[#0aad0a] flex items-center justify-center shadow-sm"
                aria-label="Profile menu"
              >
                <FiUser size={18} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 mb-1">
                    <FiUser size={16} className="text-[#0aad0a] shrink-0" />
                    <span className="text-[14px] font-semibold text-gray-800 truncate">
                      {userName || "My Account"}
                    </span>
                  </div>

                  {[
                    {
                      href: "/profile",
                      icon: <FiUser size={15} />,
                      label: "My Profile",
                    },
                    {
                      href: "/allorders",
                      icon: <FiShoppingBag size={15} />,
                      label: "My Orders",
                    },
                    {
                      href: "/wishlist",
                      icon: <FiHeart size={15} />,
                      label: "My Wishlist",
                    },
                    {
                      href: "/profile?tab=addresses",
                      icon: <FiMapPin size={15} />,
                      label: "Addresses",
                    },
                    {
                      href: "/profile?tab=settings",
                      icon: <FiSettings size={15} />,
                      label: "Settings",
                    },
                  ].map(({ href, icon, label }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-gray-700 hover:bg-slate-50 hover:text-[#0aad0a] transition-colors"
                    >
                      <span className="text-gray-400">{icon}</span>
                      {label}
                    </Link>
                  ))}

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        mySignOut();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <FiLogOut size={15} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden absolute left-0 right-0 bg-white px-4 pb-4 border-b border-slate-200 transition-all duration-300 ease-in-out origin-top z-40",
          isSearchOpen
            ? "scale-y-100 opacity-100 top-16"
            : "scale-y-0 opacity-0 top-16 pointer-events-none",
        )}
      >
        <div className="relative items-center mt-2">
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="w-full border border-slate-300 rounded-md py-2.5 pl-4 pr-12 text-sm text-slate-700 outline-none focus:border-[#0aad0a] focus:ring-1 focus:ring-[#0aad0a]"
          />
          <Button className="absolute right-0 top-0 bottom-0 bg-[#16A34A] hover:bg-green-600 text-white rounded-r-md px-4 transition-colors flex items-center justify-center">
            <FiSearch size={18} />
          </Button>
        </div>
      </div>
    </nav>
  );
}
