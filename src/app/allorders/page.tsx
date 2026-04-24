"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getUserOrders } from "@/actions/orders.actions";
import { PulseLoader } from "react-spinners";
import {
  FaShoppingBag,
  FaMapMarkerAlt,
  FaPhone,
  FaCity,
  FaTruck,
  FaBox,
  FaCalendarAlt,
  FaHashtag,
  FaChevronDown,
  FaChevronUp,
  FaArrowRight,
  FaReceipt,
} from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { MdStore } from "react-icons/md";

interface OrderProduct {
  count: number;
  price: number;
  _id: string;
  product: {
    _id: string;
    id: string;
    title: string;
    imageCover: string;
    category?: { name: string };
  };
}

interface Order {
  id: number;
  _id: string;
  cartItems: OrderProduct[];
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  status?: string;
  createdAt: string;
  shippingAddress?: {
    details?: string;
    phone?: string;
    city?: string;
  };
  taxPrice?: number;
  shippingPrice?: number;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function deriveStatus(order: Order) {
  if (order.isDelivered) return "Delivered";
  if (order.isPaid) return "On the way";
  return "Processing";
}

type StatusStyle = {
  bg: string;
  dot: string;
  text: string;
  label: string;
};

function statusStyle(status: string): StatusStyle {
  switch (status) {
    case "Delivered":
      return {
        bg: "bg-green-50 border border-green-200",
        dot: "bg-green-500",
        text: "text-green-700",
        label: "Delivered",
      };
    case "On the way":
      return {
        bg: "bg-blue-50 border border-blue-200",
        dot: "bg-blue-500",
        text: "text-blue-700",
        label: "On the way",
      };
    default:
      return {
        bg: "bg-orange-50 border border-orange-200",
        dot: "bg-orange-500",
        text: "text-orange-700",
        label: "Processing",
      };
  }
}

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);




  
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getUserOrders();
        if (Array.isArray(data)) {
          setOrders(data);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <PulseLoader color="#0aad0a" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="min-h-screen bg-[#f8f9fa] flex items-center justify-center px-4">
        <div className="flex flex-col items-center text-center max-w-sm w-full py-16">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <FiPackage size={36} className="text-gray-400" />
          </div>
          <h2 className="text-[22px] font-bold text-gray-800 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500 text-[14px] mb-8 leading-relaxed">
            You haven&apos;t placed any orders yet.
            <br />
            Start shopping to see your orders here!
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#0aad0a] hover:bg-[#089608] active:scale-95 text-white font-bold text-[15px] px-8 py-3.5 rounded-xl transition-all shadow-sm"
          >
            Start Shopping
            <FaArrowRight size={13} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-[860px] w-[95%] mx-auto py-6 md:py-8">
        <nav className="flex items-center gap-2 text-[13px] text-gray-500 mb-5 font-medium">
          <Link href="/" className="hover:text-[#0aad0a] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800 font-semibold">My Orders</span>
        </nav>

        <div className="flex items-start justify-between mb-7">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0aad0a] rounded-lg flex items-center justify-center shrink-0">
              <FaShoppingBag size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-[22px] md:text-[28px] font-bold text-gray-800 leading-tight">
                My Orders
              </h1>
              <p className="text-gray-500 text-[13px] mt-0.5">
                Track and manage your {orders.length} orders
              </p>
            </div>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-[#0aad0a] text-[13px] font-semibold hover:text-green-700 transition-colors mt-1.5"
          >
            <MdStore size={15} />
            Continue Shopping
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const status = deriveStatus(order);
            const style = statusStyle(status);
            const isExpanded = expandedId === order._id;
            const firstImg = order.cartItems?.[0]?.product?.imageCover;
            const extraCount = (order.cartItems?.length ?? 0) - 1;
            const city = order.shippingAddress?.city ?? "—";
            const itemCount = order.cartItems?.length ?? 0;

            return (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
              >
                <div className="px-4 sm:px-5 pt-4 pb-3">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden">
                        {firstImg ? (
                          <img
                            src={firstImg}
                            alt="order"
                            className="max-w-full max-h-full object-contain mix-blend-multiply"
                          />
                        ) : (
                          <FaBox className="text-gray-300" size={22} />
                        )}
                      </div>
                      {extraCount > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#0aad0a] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                          +{extraCount}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${style.bg} ${style.text}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${style.dot}`}
                          />
                          {style.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-gray-700 font-bold text-[15px] mb-1">
                        <FaHashtag size={11} className="text-gray-400" />
                        {order.id}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="flex items-center gap-1.5 text-gray-500 text-[12px]">
                          <FaCalendarAlt size={10} className="text-gray-400" />
                          {formatDate(order.createdAt)}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500 text-[12px]">
                          <FaBox size={9} className="text-gray-400" />
                          {itemCount} {itemCount === 1 ? "item" : "items"}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500 text-[12px]">
                          <FaMapMarkerAlt size={9} className="text-gray-400" />
                          {city}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0 text-right hidden sm:block">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          order.paymentMethodType === "card"
                            ? "bg-blue-50 text-blue-500"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {order.paymentMethodType === "card" ? (
                          <FaReceipt size={14} />
                        ) : (
                          <FaTruck size={13} />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <div>
                      <span className="text-gray-800 font-extrabold text-[20px]">
                        {order.totalOrderPrice.toLocaleString()}
                      </span>
                      <span className="text-gray-500 text-[12px] font-medium ml-1">
                        EGP
                      </span>
                    </div>
                    <button
                      onClick={() => toggleExpand(order._id)}
                      className={`flex items-center gap-1.5 text-[13px] font-semibold px-4 py-1.5 rounded-lg border transition-all ${
                        isExpanded
                          ? "bg-[#0aad0a] text-white border-[#0aad0a]"
                          : "border-gray-200 text-gray-600 hover:border-[#0aad0a] hover:text-[#0aad0a] bg-white"
                      }`}
                    >
                      {isExpanded ? (
                        <>
                          Hide <FaChevronUp size={10} />
                        </>
                      ) : (
                        <>
                          Details <FaChevronDown size={10} />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50/50">
                    <div className="px-4 sm:px-5 pt-4 pb-3">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-2.5 h-2.5 bg-[#0aad0a] rounded-sm shrink-0" />
                        <h3 className="text-gray-800 font-bold text-[13px]">
                          Order Items
                        </h3>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        {order.cartItems?.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-3 py-2.5"
                          >
                            <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                              <img
                                src={item.product?.imageCover}
                                alt={item.product?.title}
                                className="max-w-full max-h-full object-contain mix-blend-multiply"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-800 text-[13px] font-semibold line-clamp-1">
                                {item.product?.title}
                              </p>
                              <p className="text-gray-400 text-[11px]">
                                {item.count} ×{" "}
                                {item.price.toLocaleString()} EGP
                              </p>
                            </div>
                            <span className="text-gray-800 font-bold text-[13px] shrink-0">
                              {(item.price * item.count).toLocaleString()}
                              <span className="text-gray-400 font-normal text-[11px] ml-0.5">
                                EGP
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 px-4 sm:px-5 pb-4">
                      {order.shippingAddress && (
                        <div className="flex-1 bg-white rounded-xl border border-gray-100 p-4">
                          <div className="flex items-center gap-2 mb-2.5">
                            <FaMapMarkerAlt
                              size={12}
                              className="text-[#0aad0a]"
                            />
                            <h4 className="text-gray-700 font-bold text-[12px]">
                              Delivery Address
                            </h4>
                          </div>
                          <p className="text-gray-700 text-[13px] font-semibold leading-snug">
                            {order.shippingAddress.city}
                          </p>
                          {order.shippingAddress.details && (
                            <p className="text-gray-500 text-[12px] mt-0.5">
                              {order.shippingAddress.details}
                            </p>
                          )}
                          {order.shippingAddress.phone && (
                            <div className="flex items-center gap-1.5 mt-2 text-gray-500 text-[12px]">
                              <FaPhone size={9} className="text-gray-400" />
                              {order.shippingAddress.phone}
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex-1 bg-amber-50 border border-amber-100 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2.5">
                          <FiPackage size={13} className="text-amber-600" />
                          <h4 className="text-gray-700 font-bold text-[12px]">
                            Order Summary
                          </h4>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-[12px]">
                              Subtotal
                            </span>
                            <span className="text-gray-700 font-semibold text-[12px]">
                              {order.totalOrderPrice.toLocaleString()} EGP
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-[12px]">
                              Shipping
                            </span>
                            <span className="text-[#0aad0a] font-bold text-[12px]">
                              Free
                            </span>
                          </div>
                          <div className="border-t border-amber-200 mt-1 pt-2 flex items-center justify-between">
                            <span className="text-gray-800 font-bold text-[13px]">
                              Total
                            </span>
                            <span className="text-gray-800 font-extrabold text-[14px]">
                              {order.totalOrderPrice.toLocaleString()} EGP
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

         <div className="mt-6 sm:hidden flex justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[#0aad0a] text-[13px] font-semibold"
          >
            <MdStore size={15} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
