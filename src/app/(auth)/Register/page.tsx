"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaStar, FaShieldAlt, FaUser } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { MdLocalShipping } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { myRegisterschema, RegisterSchemaType } from "@/schemas/auth.schemas";
import { UserRegister } from "@/actions/auth.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(myRegisterschema),
  });

  const { handleSubmit, control, setError } = form;

  async function mySubmit(data: RegisterSchemaType) {
    const isRegisterdSuccessfully = await UserRegister(data);

    if (isRegisterdSuccessfully) {
      toast.success("Account Created Successfully 👏");
      setTimeout(() => {
        router.push("/Login");
      }, 3000);
    } else {
      toast.error("Can't Create The Account Now 🚨");
      setError("email", {
        type: "manual",
        message: "This email is already registered",
      });
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="flex flex-col gap-10 pr-0 lg:pr-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-4 tracking-tight">
              Welcome to <span className="text-[#16A34A]">FreshCart</span>
            </h1>
            <p className="text-slate-600 text-[17px] leading-relaxed max-w-lg">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#16A34A] shrink-0 shadow-sm">
                <FaStar size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[#1e293b] text-[17px] mb-1">
                  Premium Quality
                </h3>
                <p className="text-slate-500 text-[15px]">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#16A34A] shrink-0 shadow-sm">
                <MdLocalShipping size={22} />
              </div>
              <div>
                <h3 className="font-bold text-[#1e293b] text-[17px] mb-1">
                  Fast Delivery
                </h3>
                <p className="text-slate-500 text-[15px]">
                  Same-day delivery available in most areas.
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#16A34A] shrink-0 shadow-sm">
                <FaShieldAlt size={18} />
              </div>
              <div>
                <h3 className="font-bold text-[#1e293b] text-[17px] mb-1">
                  Secure Shopping
                </h3>
                <p className="text-slate-500 text-[15px]">
                  Your data and payments are completely secure.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 border border-slate-100 p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] bg-white max-w-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center overflow-hidden shrink-0">
                <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <FaUser size={20} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-[#1e293b] text-sm">
                  Sarah Johnson
                </h4>
                <div className="flex text-[#fcd53f] text-[13px] mt-0.5">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            </div>
            <p className="text-slate-600 text-[14px] italic leading-relaxed">
              "FreshCart has transformed my shopping experience. The quality of
              the products is outstanding, and the delivery is always on time.
              Highly recommend!"
            </p>
          </div>
        </div>

        <div className="w-full max-w-lg mx-auto bg-white p-8 md:p-10 rounded-[24px] shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-slate-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-[28px] font-bold text-[#1e293b] mb-2">
              Create Your Account
            </h2>
            <p className="text-slate-500 text-[15px]">
              Start your fresh journey with us today
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button
              type="button"
              variant="outline"
              className="py-5 font-semibold text-slate-600 border-slate-200 hover:bg-slate-50 text-[14px]"
            >
              <FcGoogle className="mr-2" size={20} /> Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="py-5 font-semibold text-slate-600 border-slate-200 hover:bg-slate-50 text-[14px]"
            >
              <FaFacebook className="mr-2 text-[#1877F2]" size={20} /> Facebook
            </Button>
          </div>

          <div className="relative flex items-center py-2 mb-6">
            <div className="grow border-t border-slate-200"></div>
            <span className="shrink-0 px-4 text-slate-400 text-sm font-medium">
              or
            </span>
            <div className="grow border-t border-slate-200"></div>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(mySubmit)}
          >
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="nameInput"
                    className="text-slate-700 font-medium text-[14px]"
                  >
                    Name*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="nameInput"
                    type="text"
                    placeholder="Ali"
                    className="py-5"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="emailInput"
                    className="text-slate-700 font-medium text-[14px]"
                  >
                    Email*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="emailInput"
                    type="email"
                    placeholder="ali@example.com"
                    className="py-5"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col">
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="passwordInput"
                      className="text-slate-700 font-medium text-[14px]"
                    >
                      Password*
                    </FieldLabel>
                    <Input
                      {...field}
                      id="passwordInput"
                      type="password"
                      placeholder="create a strong password"
                      className="py-5"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                  <div className="mt-2">
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="w-1/4 bg-slate-300 h-full"></div>
                    </div>
                    <div className="flex justify-between items-start mt-1.5">
                      <span className="text-[11px] text-slate-400 leading-tight">
                        Must be at least 8 characters with numbers and symbols
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 ml-2">
                        Weak
                      </span>
                    </div>
                  </div>
                </div>
              )}
            />

            <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="rePassword"
                    className="text-slate-700 font-medium text-[14px]"
                  >
                    Confirm Password*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="rePassword"
                    type="password"
                    placeholder="confirm your password"
                    className="py-5"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="phoneInput"
                    className="text-slate-700 font-medium text-[14px]"
                  >
                    Phone Number*
                  </FieldLabel>
                  <Input
                    {...field}
                    id="phoneInput"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    className="py-5"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex items-start gap-3 mt-2 mb-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 rounded border-slate-300 text-[#16A34A] focus:ring-[#16A34A] cursor-pointer accent-[#16A34A]"
                required
              />
              <label
                htmlFor="terms"
                className="text-[13px] text-slate-600 cursor-pointer"
              >
                I agree to the
                <Link
                  href="/terms"
                  className="text-[#16A34A] font-medium hover:underline mx-1"
                >
                  Terms of Service
                </Link>
                and
                <Link
                  href="/privacy"
                  className="text-[#16A34A] font-medium hover:underline mx-1"
                >
                  Privacy Policy
                </Link>
                *
              </label>
            </div>

            <Button
              type="submit"
              className="w-full py-6 bg-[#16A34A] hover:bg-green-600 text-white rounded-lg font-semibold text-[15px] transition-all flex items-center justify-center gap-2 mt-2"
            >
              <FiUserPlus size={18} /> Create My Account
            </Button>

            <p className="text-center text-[14px] text-slate-500 mt-4">
              Already have an account?
              <Link
                href="/Login"
                className="text-[#16A34A] font-semibold hover:underline ml-1"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
