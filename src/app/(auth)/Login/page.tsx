"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { LoginSchema, LoginType } from "@/schemas/auth.schemas";
import { FcGoogle } from "react-icons/fc";
import {
  FaFacebook,
  FaStar,
  FaShieldAlt,
  FaUsers,
  FaTruck,
  FaHeadset,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import signinImg from "@/assets/images/Signin img.png";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const { handleSubmit, control } = form;

  async function mySubmit(data: LoginType) {
    const response = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
    });
    if (response?.ok) {
      toast.success("Login Successfull 👏");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      toast.error(response?.error || "Incorrect email or password");
    }
  }

  return (
    <>
      <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 py-12 px-4 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl w-full items-center">
          <div className="flex flex-col items-center text-center gap-5">
            <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-md overflow-hidden">
              <Image
                src={signinImg}
                alt="FreshCart grocery cart"
                className="w-full h-auto object-contain block"
                priority
              />
            </div>

            <h2 className="text-[22px] font-bold text-gray-900 leading-snug max-w-sm">
              FreshCart – Your One-Stop Shop for Fresh Products
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Join thousands of happy customers who trust FreshCart for their
              daily grocery needs
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-gray-800">
                <FaTruck className="text-[#0AAD0A] text-sm" />
                Free Delivery
              </span>
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-gray-800">
                <FaShieldAlt className="text-[#0AAD0A] text-sm" />
                Secure Payment
              </span>
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-gray-800">
                <FaHeadset className="text-[#0AAD0A] text-sm" />
                24/7 Support
              </span>
            </div>
          </div>

          <div className="w-full max-w-md justify-self-center bg-white border border-gray-200 rounded-2xl px-10 py-9 shadow-lg flex flex-col gap-5">
            <div className="text-center">
              <h1 className="text-[26px] font-bold text-gray-900 leading-none mb-2">
                <span className="text-[#0AAD0A]">Fresh</span>Cart
              </h1>
              <h2 className="text-xl font-bold text-gray-900 mb-1.5">
                Welcome Back!
              </h2>
              <p className="text-sm text-gray-500">
                Sign in to continue your fresh shopping experience
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 w-full py-[11px] px-4 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-800 cursor-pointer transition-colors duration-150 hover:bg-gray-50 hover:border-gray-400"
              >
                <FcGoogle size={20} />
                <span>Continue with Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2.5 w-full py-[11px] px-4 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-800 cursor-pointer transition-colors duration-150 hover:bg-gray-50 hover:border-gray-400"
              >
                <FaFacebook size={20} className="text-[#1877F2]" />
                <span>Continue with Facebook</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex-1 h-px bg-gray-200" />
              <span className="text-[11px] font-semibold text-gray-400 tracking-wider whitespace-nowrap">
                OR CONTINUE WITH EMAIL
              </span>
              <span className="flex-1 h-px bg-gray-200" />
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(mySubmit)}
              noValidate
            >
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="emailInput"
                      className="text-sm font-medium text-gray-800"
                    >
                      Email Address
                    </label>
                    <div
                      className={`flex items-center border-[1.5px] rounded-lg bg-white px-3 transition-all duration-200 focus-within:border-[#0AAD0A] focus-within:shadow-[0_0_0_3px_rgba(10,173,10,0.12)] ${
                        fieldState.invalid
                          ? "border-red-500 focus-within:shadow-[0_0_0_3px_rgba(220,53,69,0.12)]"
                          : "border-gray-300"
                      }`}
                    >
                      <FaEnvelope className="text-gray-400 text-sm shrink-0 mr-2.5" />
                      <input
                        {...field}
                        id="emailInput"
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 border-none outline-none py-[11px] text-sm text-gray-800 bg-transparent placeholder-gray-400"
                        aria-invalid={fieldState.invalid}
                        autoComplete="email"
                      />
                    </div>
                    {fieldState.invalid && fieldState.error?.message && (
                      <p className="text-xs text-red-500">
                        *{fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="passwordInput"
                        className="text-sm font-medium text-gray-800"
                      >
                        Password
                      </label>
                      <Link
                        href="/forget-password"
                        className="text-[13px] font-medium text-[#0AAD0A] no-underline hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <div
                      className={`flex items-center border-[1.5px] rounded-lg bg-white px-3 transition-all duration-200 focus-within:border-[#0AAD0A] focus-within:shadow-[0_0_0_3px_rgba(10,173,10,0.12)] ${
                        fieldState.invalid
                          ? "border-red-500 focus-within:shadow-[0_0_0_3px_rgba(220,53,69,0.12)]"
                          : "border-gray-300"
                      }`}
                    >
                      <FaLock className="text-gray-400 text-sm shrink-0 mr-2.5" />
                      <input
                        {...field}
                        id="passwordInput"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="flex-1 border-none outline-none py-[11px] text-sm text-gray-800 bg-transparent placeholder-gray-400"
                        aria-invalid={fieldState.invalid}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className="bg-transparent border-none cursor-pointer text-gray-500 p-1 flex items-center transition-colors duration-150 hover:text-gray-800"
                        onClick={() => setShowPassword((p) => !p)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <FaEyeSlash size={16} />
                        ) : (
                          <FaEye size={16} />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && fieldState.error?.message && (
                      <p className="text-xs text-red-500">
                        *{fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <label
                className="flex items-center gap-2 cursor-pointer"
                htmlFor="keepSignedIn"
              >
                <input
                  id="keepSignedIn"
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-[#0AAD0A] shrink-0"
                />
                <span className="text-sm text-gray-600">Keep me signed in</span>
              </label>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0AAD0A] text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-colors duration-200 mt-1 hover:bg-[#099009] active:bg-[#088008]"
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 m-0">
              New to FreshCart?
              <Link
                href="/Register"
                className="text-[#0AAD0A] font-semibold no-underline hover:underline"
              >
                Create an account
              </Link>
            </p>

            <div className="flex items-center justify-center gap-5 flex-wrap pt-1 border-t border-gray-100">
              <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <FaShieldAlt className="text-gray-400 text-[13px]" />
                SSL Secured
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <FaUsers className="text-gray-400 text-[13px]" />
                50K+ Users
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <FaStar className="text-yellow-400 text-[13px]" />
                4.9 Rating
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
