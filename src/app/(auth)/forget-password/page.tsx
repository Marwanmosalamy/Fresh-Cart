"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  ForgetPasswordSchema,
  ForgetPasswordType,
} from "@/schemas/auth.schemas";
import {
  forgotPassword,
  verifyResetCode,
  resetPassword,
} from "@/actions/auth.action";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";
import { FiArrowLeft, FiCheck, FiEye, FiEyeOff } from "react-icons/fi";


const verifyCodeSchema = zod.object({
  resetCode: zod
    .string()
    .nonempty("Code is required")
    .length(6, "Code must be exactly 6 digits")
    .regex(/^\d{6}$/, "Code must be 6 digits"),
});
type VerifyCodeType = zod.infer<typeof verifyCodeSchema>;

const newPasswordSchema = zod
  .object({
    newPassword: zod
      .string()
      .nonempty("Password is required")
      .min(6, "At least 6 characters"),
    confirmPassword: zod.string().nonempty("Please confirm your password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type NewPasswordType = zod.infer<typeof newPasswordSchema>;


function LeftPanel() {
  return (
    <div className="hidden lg:flex flex-col items-center text-center gap-5">
      <div className="w-full max-w-sm bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] rounded-3xl p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-4 right-6 w-16 h-16 rounded-full bg-[#0aad0a]/10" />
        <div className="absolute bottom-6 left-4 w-24 h-24 rounded-full bg-[#0aad0a]/8" />
        <div className="absolute top-1/2 right-2 w-10 h-10 rounded-full bg-[#0aad0a]/12" />

        <div className="flex items-end justify-center gap-4 mb-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center">
            <FaEnvelope size={22} className="text-[#0aad0a]/70" />
          </div>
          <div className="w-[72px] h-[72px] rounded-2xl bg-white shadow-lg flex items-center justify-center -mb-2 scale-110">
            <FaLock size={26} className="text-[#0aad0a]" />
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center">
            <FaShieldAlt size={22} className="text-[#0aad0a]/70" />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-2 relative z-10">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0aad0a]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#0aad0a]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#0aad0a]" />
        </div>
      </div>

      <h2 className="text-[22px] font-bold text-gray-900 leading-snug max-w-sm">
        Reset Your Password
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
        Don't worry, it happens to the best of us. We'll help you get back into
        your account{" "}
        <span className="text-[#0aad0a] font-semibold">in no time</span>.
      </p>

      <div className="flex gap-5 flex-wrap justify-center">
        <span className="flex items-center gap-1.5 text-[13px] font-medium text-gray-700">
          <FaEnvelope className="text-[#0aad0a] text-sm" />
          Email Verification
        </span>
        <span className="flex items-center gap-1.5 text-[13px] font-medium text-gray-700">
          <FaShieldAlt className="text-[#0aad0a] text-sm" />
          Secure Reset
        </span>
        <span className="flex items-center gap-1.5 text-[13px] font-medium text-gray-700">
          <FaLock className="text-[#0aad0a] text-sm" />
          Encrypted
        </span>
      </div>
    </div>
  );
}


function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { icon: <FaEnvelope size={13} />, done: step > 1, active: step === 1 },
    { icon: <FaLock size={12} />, done: step > 2, active: step === 2 },
    { icon: <FaShieldAlt size={12} />, done: false, active: step === 3 },
  ];

  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              s.done
                ? "bg-[#0aad0a] text-white"
                : s.active
                  ? "bg-[#0aad0a] text-white"
                  : "bg-gray-100 text-gray-400"
            }`}
          >
            {s.done ? <FiCheck size={14} /> : s.icon}
          </div>
          {i < 2 && (
            <div
              className={`flex-1 h-0.5 max-w-[60px] transition-all ${
                step > i + 1 ? "bg-[#0aad0a]" : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}


export default function ForgetPasswordPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");

  const emailForm = useForm<ForgetPasswordType>({
    defaultValues: { email: "" },
    resolver: zodResolver(ForgetPasswordSchema),
  });

  async function onSendEmail(data: ForgetPasswordType) {
    try {
      await forgotPassword(data.email);
      setEmail(data.email);
      toast.success("Reset code sent! Check your inbox.");
      setStep(2);
    } catch (err) {
      toast.error((err as Error).message || "Something went wrong");
    }
  }

  const codeForm = useForm<VerifyCodeType>({
    defaultValues: { resetCode: "" },
    resolver: zodResolver(verifyCodeSchema),
  });

  const digitRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);

  function handleDigitChange(idx: number, val: string) {
    const cleaned = val.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[idx] = cleaned;
    setDigits(next);
    codeForm.setValue("resetCode", next.join(""), { shouldValidate: true });
    if (cleaned && idx < 5) {
      digitRefs.current[idx + 1]?.focus();
    }
  }

  function handleDigitKeyDown(
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      digitRefs.current[idx - 1]?.focus();
    }
  }

  async function onVerifyCode(data: VerifyCodeType) {
    try {
      await verifyResetCode(data.resetCode);
      toast.success("Code verified!");
      setStep(3);
    } catch (err) {
      toast.error((err as Error).message || "Invalid code");
    }
  }

  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const pwdForm = useForm<NewPasswordType>({
    defaultValues: { newPassword: "", confirmPassword: "" },
    resolver: zodResolver(newPasswordSchema),
  });

  async function onResetPassword(data: NewPasswordType) {
    try {
      await resetPassword(email, data.newPassword);
      toast.success("Password reset successfully! You can now sign in.");
      setTimeout(() => (window.location.href = "/Login"), 1500);
    } catch (err) {
      toast.error((err as Error).message || "Failed to reset password");
    }
  }

  const inputCls =
    "flex items-center border-[1.5px] rounded-lg bg-white px-3 transition-all duration-200 focus-within:border-[#0AAD0A] focus-within:shadow-[0_0_0_3px_rgba(10,173,10,0.12)] border-gray-300";

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 py-10 px-4 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl w-full items-center">
        <LeftPanel />

        {/* Right panel */}
        <div className="w-full max-w-md justify-self-center bg-white border border-gray-200 rounded-2xl px-8 sm:px-10 py-9 shadow-lg flex flex-col gap-6">
          {/* Brand */}
          <div className="text-center">
            <h1 className="text-[26px] font-bold text-gray-900 leading-none mb-3">
              <span className="text-[#0AAD0A]">Fresh</span>Cart
            </h1>

            {step === 1 && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-1.5">
                  Forgot Password?
                </h2>
                <p className="text-sm text-gray-500">
                  No worries, we'll send you a reset code
                </p>
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-1.5">
                  Check Your Email
                </h2>
                <p className="text-sm text-gray-500">
                  Enter the 6-digit code sent to{" "}
                  <span className="font-medium text-gray-700">{email}</span>
                </p>
              </>
            )}
            {step === 3 && (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-1.5">
                  Create New Password
                </h2>
                <p className="text-sm text-gray-500">
                  Your new password must be different from previous passwords
                </p>
              </>
            )}
          </div>

          <StepIndicator step={step} />

          {step === 1 && (
            <form
              className="flex flex-col gap-5"
              onSubmit={emailForm.handleSubmit(onSendEmail)}
              noValidate
            >
              <Controller
                name="email"
                control={emailForm.control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="forget-email"
                      className="text-sm font-medium text-gray-800"
                    >
                      Email Address
                    </label>
                    <div
                      className={`${inputCls} ${fieldState.invalid ? "border-red-500 focus-within:border-red-500 focus-within:shadow-[0_0_0_3px_rgba(220,53,69,0.12)]" : ""}`}
                    >
                      <FaEnvelope className="text-gray-400 text-sm shrink-0 mr-2.5" />
                      <input
                        {...field}
                        id="forget-email"
                        type="email"
                        placeholder="Enter your email address"
                        autoComplete="email"
                        className="flex-1 border-none outline-none py-[11px] text-sm text-gray-800 bg-transparent placeholder-gray-400"
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

              <button
                id="send-reset-code-btn"
                type="submit"
                disabled={emailForm.formState.isSubmitting}
                className="w-full py-3.5 bg-[#0AAD0A] text-white rounded-lg text-base font-semibold cursor-pointer transition-colors duration-200 hover:bg-[#099009] active:bg-[#088008] disabled:opacity-70"
              >
                {emailForm.formState.isSubmitting
                  ? "Sending..."
                  : "Send Reset Code"}
              </button>

              <Link
                href="/Login"
                className="flex items-center justify-center gap-1.5 text-[#0aad0a] font-medium text-[13px] hover:underline"
              >
                <FiArrowLeft size={13} />
                Back to Sign In
              </Link>
            </form>
          )}

          {step === 2 && (
            <form
              className="flex flex-col gap-5"
              onSubmit={codeForm.handleSubmit(onVerifyCode)}
              noValidate
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-800">
                  Verification Code
                </label>

                <div
                  className={`flex items-center border-[1.5px] rounded-lg bg-white px-3 gap-2 transition-all duration-200 focus-within:border-[#0AAD0A] focus-within:shadow-[0_0_0_3px_rgba(10,173,10,0.12)] ${
                    codeForm.formState.errors.resetCode
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <FaShieldAlt className="text-gray-400 text-sm shrink-0" />
                  <div className="flex flex-1 justify-between py-[6px]">
                    {digits.map((d, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          digitRefs.current[i] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={(e) => handleDigitChange(i, e.target.value)}
                        onKeyDown={(e) => handleDigitKeyDown(i, e)}
                        className="w-8 text-center border-none outline-none text-sm text-gray-800 bg-transparent font-semibold"
                        aria-label={`Digit ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {codeForm.formState.errors.resetCode && (
                  <p className="text-xs text-red-500">
                    *{codeForm.formState.errors.resetCode.message}
                  </p>
                )}

                <p className="text-[13px] text-gray-500 text-center">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await forgotPassword(email);
                        toast.success("Code resent!");
                        setDigits(["", "", "", "", "", ""]);
                        codeForm.reset();
                      } catch {
                        toast.error("Failed to resend code");
                      }
                    }}
                    className="text-[#0aad0a] font-semibold hover:underline"
                  >
                    Resend Code
                  </button>
                </p>
              </div>

              <button
                type="submit"
                disabled={codeForm.formState.isSubmitting}
                className="w-full py-3.5 bg-[#0AAD0A] text-white rounded-lg text-base font-semibold cursor-pointer transition-colors duration-200 hover:bg-[#099009] active:bg-[#088008] disabled:opacity-70"
              >
                {codeForm.formState.isSubmitting ? "Verifying..." : "Verify Code"}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center justify-center gap-1.5 text-[#0aad0a] font-medium text-[13px] hover:underline"
              >
                <FiArrowLeft size={13} />
                Change email address
              </button>
            </form>
          )}

          {step === 3 && (
            <form
              className="flex flex-col gap-5"
              onSubmit={pwdForm.handleSubmit(onResetPassword)}
              noValidate
            >
              <Controller
                name="newPassword"
                control={pwdForm.control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-800">
                      New Password
                    </label>
                    <div
                      className={`${inputCls} ${fieldState.invalid ? "border-red-500" : ""}`}
                    >
                      <FaLock className="text-gray-400 text-sm shrink-0 mr-2.5" />
                      <input
                        {...field}
                        type={showNew ? "text" : "password"}
                        placeholder="Enter new password"
                        className="flex-1 border-none outline-none py-[11px] text-sm text-gray-800 bg-transparent placeholder-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew((v) => !v)}
                        className="text-gray-400 hover:text-gray-600 ml-2"
                        aria-label={showNew ? "Hide password" : "Show password"}
                      >
                        {showNew ? <FiEyeOff size={16} /> : <FiEye size={16} />}
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

              <Controller
                name="confirmPassword"
                control={pwdForm.control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-800">
                      Confirm Password
                    </label>
                    <div
                      className={`${inputCls} ${fieldState.invalid ? "border-red-500" : ""}`}
                    >
                      <FaLock className="text-gray-400 text-sm shrink-0 mr-2.5" />
                      <input
                        {...field}
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm new password"
                        className="flex-1 border-none outline-none py-[11px] text-sm text-gray-800 bg-transparent placeholder-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="text-gray-400 hover:text-gray-600 ml-2"
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                      >
                        {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
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

              <button
                type="submit"
                disabled={pwdForm.formState.isSubmitting}
                className="w-full py-3.5 bg-[#0AAD0A] text-white rounded-lg text-base font-semibold cursor-pointer transition-colors duration-200 hover:bg-[#099009] active:bg-[#088008] disabled:opacity-70"
              >
                {pwdForm.formState.isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          <p className="text-center text-sm text-gray-500 border-t border-gray-100 pt-4 m-0">
            Remember your password?{" "}
            <Link
              href="/Login"
              className="text-[#0AAD0A] font-semibold no-underline hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
