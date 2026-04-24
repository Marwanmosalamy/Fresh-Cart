"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  getLoggedUserCart,
  updateProductQuantity,
  RemoveProductFromCart,
  ClearAllCartProducts,
} from "@/actions/cart.actions";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaChevronRight,
  FaShoppingCart,
  FaArrowLeft,
  FaLock,
  FaTruck,
  FaShieldAlt,
  FaTag,
  FaCheckCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { FaSpinner } from "react-icons/fa6";
import { CartType } from "@/api/types/cart.type";
import { FiLock } from "react-icons/fi";

export default function CartPage() {
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [cartId, setcartId] = useState("");
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  async function fetchCart() {
    setLoading(true);
    try {
      const res = await getLoggedUserCart();
      if (res?.status === "success") {
        setCart(res);
        setcartId(res.cartId);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  async function handleUpdateCount(id: string, count: number) {
    if (count < 1) return;
    setUpdatingId(id);
    try {
      const res = await updateProductQuantity(id, count);
      if (res?.status === "success") {
        setCart(res);
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleRemoveItem(id: string) {
    try {
      const res = await RemoveProductFromCart(id);
      if (res?.status === "success") {
        setCart(res);
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async function handleClearCart() {
    try {
      const res = await ClearAllCartProducts();
      if (res?.message === "success" || res?.status === "success") {
        setCart(null);
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <PulseLoader color="#0aad0a" />
      </div>
    );
  }

  if (!cart || cart.numOfCartItems === 0) {
    return (
      <main className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4">
        <div className="flex flex-col items-center text-center max-w-sm w-full py-16">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <FaShoppingCart size={36} className="text-gray-400" />
          </div>

          <h2 className="text-[22px] font-bold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 text-[14px] mb-8 leading-relaxed">
            Looks like you haven&apos;t added anything to your cart yet.
            <br />
            Start exploring our products!
          </p>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#00A63E] hover:bg-[#089608] active:scale-95 text-white font-bold text-[15px] px-8 py-3.5 rounded-xl transition-all shadow-sm"
          >
            Start Shopping
            <FaChevronRight size={13} />
          </Link>

          <div className="w-full border-t border-gray-200 my-8" />

          <p className="text-gray-400 text-[12px] font-medium mb-3">
            Popular Categories
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Electronics", "Fashion", "Home", "Beauty"].map((cat) => (
              <Link
                key={cat}
                href="/shop"
                className="text-gray-600 text-[13px] hover:text-[#0aad0a] transition-colors px-3 py-1 rounded-full border border-gray-200 hover:border-[#0aad0a]/40 bg-white"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <section className="py-8 bg-[#f8f9fa] min-h-screen">
      <div className="max-w-330 w-[95%] mx-auto">
        <nav className="flex items-center gap-2 text-[13px] text-gray-500 mb-5 font-medium">
          <Link href="/" className="hover:text-[#0aad0a] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800">Shopping Cart</span>
        </nav>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[linear-gradient(90deg,#16A34A_0%,#15803D_100%)] rounded-lg flex items-center justify-center shrink-0">
            <FaShoppingCart size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
              Shopping Cart
            </h1>
            <p className="text-gray-500 text-[13px] mt-0.5 ">
              You have
              <span className="text-[#0aad0a] px-1 font-semibold">
                {cart.numOfCartItems} items
              </span>
              in your cart
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:flex-1 min-w-0 flex flex-col gap-4">
            {cart.data.products.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-xl border border-gray-100 px-4 pt-4 pb-4 md:px-5 md:pt-5 md:pb-4"
              >
                <div className="flex gap-4">
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <div className="w-22.5 h-22.5 sm:w-25 sm:h-25 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="bg-[#0aad0a] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 whitespace-nowrap">
                      <FaCheckCircle size={7} />
                      In Stock
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-[14px] leading-snug line-clamp-2 mb-1.5">
                      {item.product.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mb-2">
                      {item.product.category?.name && (
                        <span className="bg-green-50 text-[#0aad0a] text-[11px] font-semibold px-2 py-0.5 rounded-full border border-green-100">
                          {item.product.category.name}
                        </span>
                      )}
                      <span className="text-gray-400 text-[11px]">
                        · SKU: {item.product.id?.slice(-6).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[#0aad0a] font-bold text-[15px]">
                      {item.price}{" "}
                      <span className="text-[12px] font-semibold">EGP</span>
                      <span className="text-gray-400 text-[12px] font-normal">
                        per unit
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pl-26.5 sm:pl-29">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handleUpdateCount(item.product.id, item.count - 1)
                      }
                      disabled={
                        updatingId === item.product.id || item.count <= 1
                      }
                      className="w-7 h-7 border border-gray-300 rounded-md flex items-center justify-center text-gray-600 hover:border-gray-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-white"
                    >
                      <FaMinus size={9} />
                    </button>
                    <span className="w-8 text-center text-[14px] font-semibold text-gray-800 select-none flex items-center justify-center">
                      {updatingId === item.product.id ? (
                        <span className="text-[#0aad0a] animate-spin ">
                          <FaSpinner />
                        </span>
                      ) : (
                        item.count
                      )}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateCount(item.product.id, item.count + 1)
                      }
                      disabled={updatingId === item.product.id}
                      className="w-7 h-7 rounded-md bg-[linear-gradient(90deg,#16A34A_0%,#15803D_100%)] flex items-center justify-center text-white hover:bg-green-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <FaPlus size={9} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="block text-[10px] text-gray-400 font-medium leading-none mb-0.5">
                        Total
                      </span>
                      <p className="text-gray-800 font-bold text-[15px] leading-tight">
                        {item.price * item.count}
                        <span className="text-[11px] font-medium ml-0.5 text-gray-500">
                          EGP
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="w-8 h-8 rounded-md bg-[linear-gradient(90deg,#16A34A_0%,#15803D_100%)] hover:bg-red-600 flex items-center justify-center text-white transition-all shrink-0"
                      title="Remove item"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-row justify-between items-center mt-1 px-1">
              <Link
                href="/shop"
                className="flex items-center gap-1.5 text-[#0aad0a] text-[13px] font-semibold hover:text-green-700 transition-colors"
              >
                <FaArrowLeft size={11} />
                Continue Shopping
              </Link>
              <button
                onClick={handleClearCart}
                className="flex items-center gap-1.5 text-gray-500 text-[13px] font-semibold hover:text-red-500 transition-colors"
              >
                <FaTrash size={11} />
                Clear all Items
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[320px] xl:w-87.5 shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              <div className=" bg-[linear-gradient(90deg,#16A34A_0%,#15803D_100%)] px-6 py-4">
                <div className="flex items-center gap-2 mb-0.5">
                  <FaShoppingCart size={16} className="text-white" />
                  <h2 className="text-white font-bold text-[17px]">
                    Order Summary
                  </h2>
                </div>
                <p className="text-green-100 text-[12px]">
                  {cart.numOfCartItems} items in your cart
                </p>
              </div>

              <div className="p-5">
                <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-[#0aad0a] rounded-full flex items-center justify-center shrink-0">
                    <FaTruck size={13} className="text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-bold text-[13px]">
                      Free Shipping!
                    </p>
                    <p className="text-gray-500 text-[11px]">
                      You qualify for free delivery
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-[13px]">Subtotal</span>
                    <span className="text-gray-800 font-semibold text-[13px]">
                      {cart.data.totalCartPrice} EGP
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-[13px]">Shipping</span>
                    <span className="text-[#0aad0a] font-bold text-[13px]">
                      FREE
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 my-4" />

                <div className="flex justify-between items-baseline mb-5">
                  <span className="text-gray-800 font-bold text-[15px]">
                    Total
                  </span>
                  <div>
                    <span className="text-gray-800 font-extrabold text-[22px]">
                      {cart.data.totalCartPrice}
                    </span>
                    <span className="text-gray-500 text-[13px] font-medium ml-1">
                      EGP
                    </span>
                  </div>
                </div>

                <button className="w-full border border-gray-200 rounded-lg py-2.5 px-4 flex items-center justify-center gap-2 text-gray-600 text-[13px] font-medium hover:border-[#0aad0a] hover:text-[#0aad0a] transition-all mb-3 bg-white">
                  <FaTag size={12} />
                  Apply Promo Code
                </button>

                {isLoggedIn ? (
                  <Link
                    href={`/checkout/${cartId}`}
                    className="w-full bg-[linear-gradient(90deg,#16A34A_0%,#15803D_100%)] hover:bg-[#089608] text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                  >
                    <FiLock /> Secure Checkout
                  </Link>
                ) : (
                  <button
                    onClick={() =>
                      toast.error("Please login first to proceed to checkout 🔐")
                    }
                    className="w-full bg-gray-400 hover:bg-gray-500 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    <FiLock /> Login to Checkout
                  </button>
                )}

                <div className="flex items-center justify-center gap-6 mt-4">
                  <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                    <FaShieldAlt size={11} className="text-[#0aad0a]" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                    <FaTruck size={11} className="text-blue-500" />
                    <span>Fast Delivery</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 mt-4 pt-4">
                  <Link
                    href="/shop"
                    className="flex items-center justify-center gap-1.5 text-[#0aad0a] text-[13px] font-semibold hover:text-green-700 transition-colors"
                  >
                    <FaArrowLeft size={11} />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
