"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, checkoutSchemaType } from "@/schemas/checkout.schema";
import {
  getLoggedUserCart,
  createCashOrder,
  onlinePayment,
} from "@/actions/cart.actions";
import { Address, getLoggedUserAddresses } from "@/actions/address.actions";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RiCashFill } from "react-icons/ri";
import { PulseLoader } from "react-spinners";
import {
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaCity,
  FaTruck,
  FaShieldAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaBox,
  FaWallet,
} from "react-icons/fa";
import { FiInfo, FiPlus } from "react-icons/fi";
import { MdOutlinePayment } from "react-icons/md";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { FaReceipt } from "react-icons/fa6";

interface CartProduct {
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

interface Cart {
  numOfCartItems: number;
  data: {
    products: CartProduct[];
    totalCartPrice: number;
    _id: string;
  };
}

type PaymentMethod = "cash" | "online";

export default function CheckoutPage() {
  const { id }: { id: string } = useParams();
  const router = useRouter();

  const [cart, setCart] = useState<Cart | null>(null);
  const [cartLoading, setCartLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [submitting, setSubmitting] = useState(false);

  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
  });

  const { handleSubmit, control, setValue } = form;

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await getLoggedUserCart();
        if (res?.status === "success") {
          setCart(res);
        }
      } catch {
      } finally {
        setCartLoading(false);
      }
    }

    async function fetchAddresses() {
      try {
        const addrs = await getLoggedUserAddresses();
        setSavedAddresses(addrs);
      } catch {
      }
    }

    fetchCart();
    fetchAddresses();
  }, []);

  function handleSelectAddress(addr: Address) {
    setSelectedAddressId(addr._id);
    setValue("city", addr.city, { shouldValidate: true });
    setValue("details", addr.details, { shouldValidate: true });
    setValue("phone", addr.phone, { shouldValidate: true });
  }

  function handleUseDifferentAddress() {
    setSelectedAddressId(null);
    setValue("city", "");
    setValue("details", "");
    setValue("phone", "");
  }

  async function mySubmit(data: checkoutSchemaType) {
    setSubmitting(true);
    try {
      if (paymentMethod === "cash") {
        const res = await createCashOrder(id, {
          details: data.details,
          phone: data.phone,
          city: data.city,
        });
        if (res?.status === "success") {
          toast.success("Order placed successfully! 🎉");
          router.push("/allorders");
        } else {
          toast.error(res?.message ?? "Something went wrong. Please try again.");
        }
      } else {
        const res = await onlinePayment(id, "", data);
        if (res?.status === "success") {
          window.location.href = res.session.url;
        } else {
          toast.error(res?.message ?? "Something went wrong. Please try again.");
        }
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Network error. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  const total = cart?.data?.totalCartPrice ?? 0;
  const itemCount = cart?.numOfCartItems ?? 0;
  const products = cart?.data?.products ?? [];


  return (

    <main className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-[1320px] w-[95%] mx-auto py-6 md:py-8">
        <nav className="flex items-center gap-2 text-[13px] text-gray-500 mb-5 font-medium">
          <Link href="/" className="hover:text-[#0aad0a] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/cart" className="hover:text-[#0aad0a] transition-colors">
            Cart
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-800 font-semibold">Checkout</span>
        </nav>

        <div className="flex items-start justify-between mb-7">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[linear-gradient(90deg,#16A34A_0%,#15803D_100%)]  rounded-lg flex items-center justify-center shrink-0">
              <FaReceipt size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-[22px] md:text-[28px] font-bold text-gray-800 leading-tight">
                Complete Your Order
              </h1>
              <p className="text-gray-500 text-[13px] mt-0.5">
                Review your items and complete your purchase
              </p>
            </div>
          </div>
          <Link
            href="/cart"
            className="hidden sm:flex items-center gap-1.5 text-gray-600 text-[13px] font-medium hover:text-[#0aad0a] transition-colors mt-1.5"
          >
            <FaArrowLeft size={11} />
            Back to Cart
          </Link>
        </div>

        <form onSubmit={handleSubmit(mySubmit)} noValidate>
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="w-full lg:flex-1 min-w-0 flex flex-col gap-5">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-[linear-gradient(90deg,#16A34A_0%,#15803D_100%)]  px-5 py-4">
                  <div className="flex items-center gap-2">
                    <FaHome size={15} className="text-white" />
                    <h2 className="text-white font-bold text-[16px]">
                      Shipping Address
                    </h2>
                  </div>
                  <p className="text-green-100 text-[12px] mt-0.5">
                    Where should we deliver your order?
                  </p>
                </div>

                <div className="p-5">
                  {/* ── Saved Addresses ── */}
                  {savedAddresses.length > 0 && (
                    <div className="mb-5">
                      <p className="text-gray-700 font-bold text-[13px] mb-1">
                        📍 Saved Addresses
                      </p>
                      <p className="text-gray-400 text-[11px] mb-3">
                        Select a saved address or enter a new one below
                      </p>
                      <div className="flex flex-col gap-2">
                        {savedAddresses.map((addr) => {
                          const isSelected = selectedAddressId === addr._id;
                          return (
                            <button
                              key={addr._id}
                              type="button"
                              onClick={() => handleSelectAddress(addr)}
                              className={`w-full flex items-start gap-3 p-3.5 border-2 rounded-xl text-left transition-all ${
                                isSelected
                                  ? "border-[#0aad0a] bg-green-50/50 shadow-sm"
                                  : "border-gray-200 hover:border-[#0aad0a]/40 hover:bg-green-50/20"
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                isSelected ? "bg-[#0aad0a]" : "bg-gray-100"
                              }`}>
                                <FaMapMarkerAlt size={12} className={isSelected ? "text-white" : "text-gray-500"} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-800 text-[13px]">{addr.name}</p>
                                <p className="text-gray-500 text-[11px] truncate mt-0.5">{addr.details}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="flex items-center gap-1 text-gray-400 text-[10px]">
                                    <FaPhone size={8} /> {addr.phone}
                                  </span>
                                  <span className="flex items-center gap-1 text-gray-400 text-[10px]">
                                    <FaCity size={8} /> {addr.city}
                                  </span>
                                </div>
                              </div>
                              <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-all ${
                                isSelected ? "border-[#0aad0a] bg-[#0aad0a]" : "border-gray-300"
                              }`}>
                                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                            </button>
                          );
                        })}

                        {/* Use a different address */}
                        <button
                          type="button"
                          onClick={handleUseDifferentAddress}
                          className={`w-full flex items-center gap-3 p-3.5 border-2 rounded-xl text-left transition-all ${
                            selectedAddressId === null
                              ? "border-[#0aad0a] bg-green-50/50 border-dashed"
                              : "border-dashed border-gray-300 hover:border-[#0aad0a]/50 hover:bg-green-50/10"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            selectedAddressId === null ? "bg-[#0aad0a]" : "bg-gray-100"
                          }`}>
                            <FiPlus size={14} className={selectedAddressId === null ? "text-white" : "text-gray-500"} />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-[13px]">Use a different address</p>
                            <p className="text-gray-400 text-[11px]">Enter a new shipping address manually</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="bg-[#F0FDF4] border border-green-100 rounded-xl px-4 py-3 flex items-start gap-3 mb-5">
                    <FiInfo
                      size={15}
                      className="text-[#193CB8] mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="text-[#193CB8] font-semibold text-[13px]">
                        Delivery Information
                      </p>
                      <p className="text-[#193CB8]/70 text-[12px]">
                        Please ensure your address is accurate for smooth
                        delivery
                      </p>
                    </div>
                  </div>

                  <FieldGroup className="gap-4">
                    <Controller
                      name="city"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid || undefined}>
                          <FieldLabel
                            htmlFor="city"
                            className="text-gray-700 font-semibold text-[13px]"
                          >
                            City <span className="text-red-500">*</span>
                          </FieldLabel>
                          <div className="relative">
                            <FaCity
                              size={13}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
                            />
                            <Input
                              {...field}
                              id="city"
                              type="text"
                              placeholder="e.g. Cairo, Alexandria, Giza"
                              aria-invalid={fieldState.invalid}
                              className="pl-9 pr-4 py-2.5 h-auto text-[13px] text-gray-700 placeholder:text-gray-400 border-gray-200 focus-visible:border-[#0aad0a] focus-visible:ring-[#0aad0a]/20"
                            />
                          </div>
                          {fieldState.invalid && fieldState.error?.message && (
                            <FieldError className="text-[12px] flex items-center gap-1">
                              <span>⚠</span> {fieldState.error.message}
                            </FieldError>
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="details"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid || undefined}>
                          <FieldLabel
                            htmlFor="details"
                            className="text-gray-700 font-semibold text-[13px]"
                          >
                            Street Address{" "}
                            <span className="text-red-500">*</span>
                          </FieldLabel>
                          <div className="relative">
                            <FaMapMarkerAlt
                              size={13}
                              className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none z-10"
                            />
                            <textarea
                              {...field}
                              id="details"
                              rows={3}
                              placeholder="Street name, building number, floor, apartment..."
                              aria-invalid={fieldState.invalid}
                              className={`w-full border rounded-lg text-[13px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all resize-none pl-9 pr-4 py-2.5 ${
                                fieldState.invalid
                                  ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                                  : "border-gray-200 focus:border-[#0aad0a] focus:ring-[#0aad0a]/10"
                              }`}
                            />
                          </div>
                          {fieldState.invalid && fieldState.error?.message && (
                            <FieldError className="text-[12px] flex items-center gap-1">
                              <span>⚠</span> {fieldState.error.message}
                            </FieldError>
                          )}
                        </Field>
                      )}
                    />

                    
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid || undefined}>
                          <FieldLabel
                            htmlFor="phone"
                            className="text-gray-700 font-semibold text-[13px]"
                          >
                            Phone Number{" "}
                            <span className="text-red-500">*</span>
                          </FieldLabel>
                          <div className="relative">
                            <FaPhone
                              size={13}
                              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
                            />
                            <Input
                              {...field}
                              id="phone"
                              type="tel"
                              placeholder="01xxxxxxxxx"
                              maxLength={11}
                              aria-invalid={fieldState.invalid}
                              className="pl-9 sm:pr-36 pr-4 py-2.5 h-auto text-[13px] text-gray-700 placeholder:text-gray-400 border-gray-200 focus-visible:border-[#0aad0a] focus-visible:ring-[#0aad0a]/20"
                            />
                            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[11px] hidden sm:block pointer-events-none">
                              Egyptian numbers only
                            </span>
                          </div>
                          {fieldState.invalid && fieldState.error?.message ? (
                            <FieldError className="text-[12px] flex items-center gap-1">
                              <span>⚠</span> {fieldState.error.message}
                            </FieldError>
                          ) : (
                            <p className="text-gray-400 text-[11px] sm:hidden">
                              Egyptian numbers only
                            </p>
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </div>
              </div>

              
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-[linear-gradient(90deg,#16A34A_0%,#15803D_100%)] px-5 py-4">
                  <div className="flex items-center gap-2">
                    <FaWallet size={15} className="text-white" />
                    <h2 className="text-white font-bold text-[16px]">
                      Payment Method
                    </h2>
                  </div>
                  <p className="text-green-100 text-[12px] mt-0.5">
                    Choose how you&apos;d like to pay
                  </p>
                </div>

                <div className="p-5 flex flex-col gap-3">
                  <label
                    className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === "cash"
                        ? "border-[#0aad0a] bg-green-50/40 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          paymentMethod === "cash"
                            ? "bg-[linear-gradient(90deg,#16A34A_0%,#15803D_100%)]"
                            : "bg-gray-100"
                        }`}
                      >
                        <RiCashFill
                          size={16}
                          className={
                            paymentMethod === "cash"
                              ? "text-white"
                              : "text-gray-500"
                          }
                        />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-[14px]">
                          Cash on Delivery
                        </p>
                        <p className="text-gray-500 text-[12px]">
                          Pay when your order arrives at your doorstep
                        </p>
                      </div>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "cash"}
                        onChange={() => setPaymentMethod("cash")}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          paymentMethod === "cash"
                            ? "border-[#0aad0a] bg-[#0aad0a]"
                            : "border-gray-300"
                        }`}
                      >
                        {paymentMethod === "cash" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  </label>

                
                  <label
                    className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === "online"
                        ? "border-[#0aad0a] bg-green-50/40 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          paymentMethod === "online"
                            ? "bg-[linear-gradient(90deg,#16A34A_0%,#15803D_100%)]"
                            : "bg-gray-100"
                        }`}
                      >
                        <MdOutlinePayment
                          size={18}
                          className={
                            paymentMethod === "online"
                              ? "text-white"
                              : "text-gray-500"
                          }
                        />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-[14px]">
                          Pay Online
                        </p>
                        <p className="text-gray-500 text-[12px]">
                          Secure payment with Credit/Debit Card via Stripe
                        </p>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className="bg-[#1A1F71] text-white text-[9px] font-bold px-2 py-0.5 rounded">
                            VISA
                          </span>
                          <span className="bg-[#EB001B] text-white text-[9px] font-bold px-2 py-0.5 rounded">
                            MC
                          </span>
                          <span className="bg-[#2557D6] text-white text-[9px] font-bold px-2 py-0.5 rounded">
                            AMEX
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "online"}
                        onChange={() => setPaymentMethod("online")}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          paymentMethod === "online"
                            ? "border-[#0aad0a] bg-[#0aad0a]"
                            : "border-gray-300"
                        }`}
                      >
                        {paymentMethod === "online" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        )}
                      </div>
                    </div>
                  </label>

                  
                  <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 flex items-center gap-3">
                    <FaShieldAlt
                      size={15}
                      className="text-[#0aad0a] shrink-0"
                    />
                    <div>
                      <p className="text-[#0aad0a] font-semibold text-[13px]">
                        Secure &amp; Encrypted
                      </p>
                      <p className="text-[#0aad0a]/70 text-[12px]">
                        Your payment info is protected with 256-bit SSL
                        encryption
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              
              <Link
                href="/cart"
                className="sm:hidden flex items-center gap-1.5 text-[linear-gradient(90deg,#16A34A_0%,#15803D_100%)] text-[13px] font-semibold"
              >
                <FaArrowLeft size={11} />
                Back to Cart
              </Link>
            </div>

            
            <div className="w-full lg:w-[310px] xl:w-[330px] shrink-0 lg:sticky lg:top-24">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                
                <div className="bg-[linear-gradient(90deg,#16A34A_0%,#15803D_100%)] px-5 py-4">
                  <div className="flex items-center gap-2">
                    <FaBox size={15} className="text-white" />
                    <h2 className="text-white font-bold text-[16px]">
                      Order Summary
                    </h2>
                  </div>
                  <p className="text-green-100 text-[12px] mt-0.5">
                    {cartLoading ? "Loading..." : `${itemCount} items`}
                  </p>
                </div>

                <div className="p-5">
                  
                  <div className="flex flex-col gap-3.5 mb-5 max-h-[260px] overflow-y-auto pr-1">
                    {cartLoading ? (
                      <div className="flex justify-center py-6">
                        <PulseLoader color="#0aad0a" size={8} />
                      </div>
                    ) : products.length === 0 ? (
                      <p className="text-gray-400 text-[13px] text-center py-4">
                        Your cart is empty
                      </p>
                    ) : (
                      products.map((item) => (
                        <div key={item._id} className="flex items-center gap-3">
                          <div className="w-14 h-14 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="max-w-full max-h-full object-contain mix-blend-multiply"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-800 text-[13px] font-semibold line-clamp-1">
                              {item.product.title}
                            </p>
                            <p className="text-gray-400 text-[12px]">
                              {item.count} × {item.price} EGP
                            </p>
                          </div>
                          <span className="text-gray-800 font-bold text-[13px] shrink-0">
                            {item.price * item.count}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                
                  <div className="flex flex-col gap-2.5 border-t border-gray-100 pt-4 mb-1">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-[13px]">
                        Subtotal
                      </span>
                      <span className="text-gray-800 font-semibold text-[13px]">
                        {total} EGP
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-gray-600 text-[13px]">
                        <FaTruck size={11} className="text-gray-400" />
                        Shipping
                      </span>
                      <span className="text-[#00A63E] font-bold text-[13px]">
                        FREE
                      </span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between border-t border-gray-100 pt-4 mt-2 mb-5">
                    <span className="text-gray-800 font-bold text-[16px]">
                      Total
                    </span>
                    <div>
                      <span className="text-gray-800 font-extrabold text-[22px]">
                        {total}
                      </span>
                      <span className="text-gray-500 text-[13px] font-medium ml-1">
                        EGP
                      </span>
                    </div>
                  </div>

                  
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[linear-gradient(90deg,#16A34A_0%,#15803D_100%)] hover:bg-[#089608] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-[15px] flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    {submitting ? (
                      <PulseLoader color="#fff" size={8} />
                    ) : (
                      <>
                        <FaBox size={14} />
                        {paymentMethod === "cash"
                          ? "Place Order"
                          : "Pay Now"}
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="flex items-center gap-1 text-gray-500 text-[11px]">
                      <FaShieldAlt size={10} className="text-[#0aad0a]" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-[11px]">
                      <FaTruck size={10} className="text-blue-500" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-[11px]">
                      <FaCheckCircle size={10} className="text-orange-400" />
                      <span>Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
