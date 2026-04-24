"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FiUser,
  FiMapPin,
  FiSettings,
  FiChevronRight,
  FiSave,
  FiLock,
  FiEye,
  FiEyeOff,
  FiPlus,
  FiX,
  FiTrash2,
  FiPhone,
  FiEdit2,
} from "react-icons/fi";
import { FaMapMarkerAlt, FaCity } from "react-icons/fa";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast";
import {
  ChangePasswordSchema,
  ChangePasswordType,
  UpdateProfileSchema,
  UpdateProfileType,
} from "@/schemas/auth.schemas";
import { changeMyPassword, updateMyProfile } from "@/actions/auth.action";
import {
  Address,
  addAddress,
  deleteAddress,
  getLoggedUserAddresses,
} from "@/actions/address.actions";
import * as zod from "zod";

const AddressFormSchema = zod.object({
  name: zod.string().nonempty("Label is required (e.g. Home, Work)"),
  details: zod.string().nonempty("Street address is required"),
  phone: zod
    .string()
    .nonempty("Phone is required")
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  city: zod.string().nonempty("City is required"),
});
type AddressFormType = zod.infer<typeof AddressFormSchema>;

type Tab = "addresses" | "settings";

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  const tabParam = searchParams.get("tab") as Tab | null;
  const [activeTab, setActiveTab] = useState<Tab>(
    tabParam === "settings" ? "settings" : "addresses",
  );

  useEffect(() => {
    if (tabParam === "settings" || tabParam === "addresses") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  function switchTab(tab: Tab) {
    setActiveTab(tab);
    router.replace(`/profile?tab=${tab}`, { scroll: false });
  }

  const userName = (session?.user?.name as string) ?? "";
  const userEmail = (session?.user?.email as string) ?? "";
  const userPhone = ((session as any)?.phone as string) ?? "";

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      <div className="bg-linear-to-r from-[#16A34A] to-[#15803D] py-8 px-4">
        <div className="max-w-[1000px] w-[95%] mx-auto">
          <nav className="flex items-center gap-2 text-[13px] text-green-100 mb-4 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-green-300">/</span>
            <span className="text-white font-semibold">My Account</span>
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <FiUser size={26} className="text-white" />
            </div>
            <div>
              <h1 className="text-[24px] md:text-[30px] font-bold text-white leading-tight">
                My Account
              </h1>
              <p className="text-green-100 text-[13px] mt-0.5">
                Manage your addresses and account settings
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] w-[95%] mx-auto py-8">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <aside className="w-full sm:w-44 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-gray-800 font-bold text-[14px]">
                  My Account
                </p>
              </div>
              <nav className="p-2 flex flex-col gap-1">
                <button
                  id="sidebar-addresses-btn"
                  onClick={() => switchTab("addresses")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                    activeTab === "addresses"
                      ? "bg-[#0aad0a] text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FiMapPin size={14} />
                    My Addresses
                  </div>
                  <FiChevronRight size={13} />
                </button>

                <button
                  id="sidebar-settings-btn"
                  onClick={() => switchTab("settings")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                    activeTab === "settings"
                      ? "bg-[#0aad0a] text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FiSettings size={14} />
                    Settings
                  </div>
                  <FiChevronRight size={13} />
                </button>
              </nav>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            {activeTab === "addresses" ? (
              <AddressesTab />
            ) : (
              <SettingsTab
                userName={userName}
                userEmail={userEmail}
                userPhone={userPhone}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<AddressFormType>({
    defaultValues: { name: "", details: "", phone: "", city: "" },
    resolver: zodResolver(AddressFormSchema),
  });

  const fetchAddresses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getLoggedUserAddresses();
      setAddresses(data);
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  function openAddModal() {
    setEditingAddress(null);
    reset({ name: "", details: "", phone: "", city: "" });
    setShowModal(true);
  }

  function openEditModal(addr: Address) {
    setEditingAddress(addr);
    reset({
      name: addr.name,
      details: addr.details,
      phone: addr.phone,
      city: addr.city,
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingAddress(null);
    reset({ name: "", details: "", phone: "", city: "" });
  }

  async function onSubmitAddress(data: AddressFormType) {
    try {
      if (editingAddress) {
        await deleteAddress(editingAddress._id);
      }
      const updated = await addAddress(data);
      setAddresses(updated);
      toast.success(
        editingAddress ? "Address updated!" : "Address added successfully!",
      );
      closeModal();
    } catch (err) {
      toast.error((err as Error).message || "Something went wrong");
    }
  }

  async function handleDelete(id: string) {
    try {
      setDeletingId(id);
      const updated = await deleteAddress(id);
      setAddresses(updated);
      toast.success("Address removed");
    } catch (err) {
      toast.error((err as Error).message || "Failed to delete address");
    } finally {
      setDeletingId(null);
    }
  }

  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0aad0a] focus:ring-2 focus:ring-[#0aad0a]/10 transition-all bg-white";

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-gray-800 font-bold text-[16px]">
              My Addresses
            </h2>
            <p className="text-gray-500 text-[12px] mt-0.5">
              Manage your saved delivery addresses
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 bg-[#0aad0a] hover:bg-[#089608] active:scale-95 text-white font-semibold text-[13px] px-4 py-2.5 rounded-xl transition-all shadow-sm"
          >
            <FiPlus size={14} />
            Add Address
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <PulseLoader color="#0aad0a" size={8} />
          </div>
        ) : addresses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <FaMapMarkerAlt size={24} className="text-gray-400" />
            </div>
            <h3 className="text-gray-700 font-bold text-[16px] mb-2">
              No Addresses Yet
            </h3>
            <p className="text-gray-500 text-[13px] mb-6 max-w-xs leading-relaxed">
              Add your first delivery address to make checkout{" "}
              <span className="text-[#0aad0a] font-medium">
                faster and easier
              </span>
              .
            </p>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-[#0aad0a] hover:bg-[#089608] active:scale-95 text-white font-bold text-[14px] px-6 py-3 rounded-xl transition-all shadow-sm"
            >
              <FiPlus size={14} />
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className="flex items-start gap-3 p-4 border border-gray-100 rounded-xl hover:border-[#0aad0a]/40 hover:bg-green-50/20 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                  <FaMapMarkerAlt size={14} className="text-[#0aad0a]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-bold text-[14px]">
                    {addr.name}
                  </p>
                  <p className="text-gray-500 text-[12px] mt-0.5 line-clamp-2">
                    {addr.details}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-gray-400 text-[11px]">
                      <FiPhone size={10} />
                      {addr.phone}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400 text-[11px]">
                      <FaCity size={10} />
                      {addr.city}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEditModal(addr)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-[#0aad0a] hover:bg-green-50 transition-all"
                    title="Edit address"
                  >
                    <FiEdit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(addr._id)}
                    disabled={deletingId === addr._id}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
                    title="Delete address"
                  >
                    {deletingId === addr._id ? (
                      <PulseLoader color="#ef4444" size={4} />
                    ) : (
                      <FiTrash2 size={13} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 pt-6 pb-1">
              <h3 className="text-gray-900 font-bold text-[18px]">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 transition-all"
              >
                <FiX size={15} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(onSubmitAddress)}
              noValidate
              className="px-6 pt-4 pb-6 flex flex-col gap-4"
            >
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <label className="block text-gray-600 font-semibold text-[13px] mb-1.5">
                      Address Name
                    </label>
                    <input
                      {...field}
                      type="text"
                      placeholder="e.g. Home, Office"
                      className={`${inputCls} ${fieldState.error ? "border-red-400" : ""}`}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-[11px] mt-1">
                        *{fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Controller
                name="details"
                control={control}
                render={({ field, fieldState }) => (
                  <div>
                    <label className="block text-gray-600 font-semibold text-[13px] mb-1.5">
                      Full Address
                    </label>
                    <textarea
                      {...field}
                      rows={3}
                      placeholder="Street, building, apartment..."
                      className={`${inputCls} resize-none ${fieldState.error ? "border-red-400" : ""}`}
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-[11px] mt-1">
                        *{fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <div className="grid grid-cols-2 gap-3">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <label className="block text-gray-600 font-semibold text-[13px] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        {...field}
                        type="tel"
                        placeholder="01xxxxxxxxx"
                        maxLength={11}
                        className={`${inputCls} ${fieldState.error ? "border-red-400" : ""}`}
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-[11px] mt-1">
                          *{fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="city"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <label className="block text-gray-600 font-semibold text-[13px] mb-1.5">
                        City
                      </label>
                      <input
                        {...field}
                        type="text"
                        placeholder="Cairo"
                        className={`${inputCls} ${fieldState.error ? "border-red-400" : ""}`}
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-[11px] mt-1">
                          *{fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-[14px] py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#0aad0a] hover:bg-[#089608] disabled:opacity-70 active:scale-95 text-white font-bold text-[14px] py-3 rounded-xl transition-all flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <PulseLoader color="#fff" size={5} />
                  ) : editingAddress ? (
                    "Save Changes"
                  ) : (
                    "Add Address"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function PasswordField({
  name,
  label,
  placeholder,
  hint,
  control,
}: {
  name: keyof ChangePasswordType;
  label: string;
  placeholder: string;
  hint?: string;
  control: ReturnType<typeof useForm<ChangePasswordType>>["control"];
}) {
  const [show, setShow] = useState(false);

  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0aad0a] focus:ring-2 focus:ring-[#0aad0a]/10 transition-all";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label className="block text-gray-700 font-semibold text-[13px] mb-1.5">
            {label}
          </label>
          <div className="relative">
            <input
              {...field}
              type={show ? "text" : "password"}
              placeholder={placeholder}
              className={`${inputCls} pr-11 ${
                fieldState.error
                  ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
                  : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {show ? <FiEyeOff size={15} /> : <FiEye size={15} />}
            </button>
          </div>
          {hint && !fieldState.error && (
            <p className="text-gray-400 text-[11px] mt-1">{hint}</p>
          )}
          {fieldState.error && (
            <p className="text-red-500 text-[11px] mt-1">
              *{fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}

function SettingsTab({
  userName,
  userEmail,
  userPhone,
}: {
  userName: string;
  userEmail: string;
  userPhone: string;
}) {
  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[14px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#0aad0a] focus:ring-2 focus:ring-[#0aad0a]/10 transition-all";

  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { isSubmitting: isSavingProfile },
  } = useForm<UpdateProfileType>({
    defaultValues: {
      name: userName,
      email: userEmail,
      phone: userPhone,
    },
    resolver: zodResolver(UpdateProfileSchema),
  });

  async function onSaveProfile(data: UpdateProfileType) {
    try {
      await updateMyProfile(data);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error((err as Error).message || "Failed to update profile");
    }
  }

  const {
    control: pwdControl,
    handleSubmit: handlePwdSubmit,
    reset: resetPwd,
    formState: { isSubmitting: isChangingPwd },
  } = useForm<ChangePasswordType>({
    defaultValues: { currentPassword: "", password: "", rePassword: "" },
    resolver: zodResolver(ChangePasswordSchema),
  });

  async function onChangePassword(data: ChangePasswordType) {
    try {
      await changeMyPassword(data);
      toast.success("Password changed successfully!");
      resetPwd();
    } catch (err) {
      toast.error((err as Error).message || "Failed to change password");
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
            <FiUser size={16} className="text-[#0aad0a]" />
          </div>
          <div>
            <h2 className="text-gray-800 font-bold text-[15px]">
              Profile Information
            </h2>
            <p className="text-gray-500 text-[12px]">
              Update your personal details
            </p>
          </div>
        </div>

        <form
          onSubmit={handleProfileSubmit(onSaveProfile)}
          className="p-5 flex flex-col gap-4"
          noValidate
        >
          <Controller
            name="name"
            control={profileControl}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-gray-700 font-semibold text-[13px] mb-1.5">
                  Full Name
                </label>
                <input
                  {...field}
                  type="text"
                  placeholder="Enter your full name"
                  className={`${inputCls} ${fieldState.error ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : ""}`}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-[11px] mt-1">
                    *{fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="email"
            control={profileControl}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-gray-700 font-semibold text-[13px] mb-1.5">
                  Email Address
                </label>
                <input
                  {...field}
                  type="email"
                  placeholder="Enter your email"
                  className={`${inputCls} ${fieldState.error ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : ""}`}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-[11px] mt-1">
                    *{fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="phone"
            control={profileControl}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-gray-700 font-semibold text-[13px] mb-1.5">
                  Phone Number
                </label>
                <input
                  {...field}
                  type="tel"
                  placeholder="01xxxxxxxxx"
                  className={`${inputCls} ${fieldState.error ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : ""}`}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-[11px] mt-1">
                    *{fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <button
            type="submit"
            disabled={isSavingProfile}
            className="self-start flex items-center gap-2 bg-[#0aad0a] hover:bg-[#089608] disabled:opacity-70 active:scale-95 text-white font-bold text-[14px] px-6 py-2.5 rounded-xl transition-all shadow-sm"
          >
            {isSavingProfile ? (
              <PulseLoader color="#fff" size={6} />
            ) : (
              <>
                <FiSave size={14} />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-gray-800 font-bold text-[15px] mb-4">
          Account Information
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-gray-500 text-[13px]">User ID</span>
            <span className="text-gray-700 text-[13px] font-medium">—</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-500 text-[13px]">Role</span>
            <span className="bg-green-50 text-[#0aad0a] text-[12px] font-semibold px-3 py-1 rounded-full border border-green-100">
              User
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
            <FiLock size={16} className="text-amber-500" />
          </div>
          <div>
            <h2 className="text-gray-800 font-bold text-[15px]">
              Change Password
            </h2>
            <p className="text-gray-500 text-[12px]">
              Update your account password
            </p>
          </div>
        </div>

        <form
          onSubmit={handlePwdSubmit(onChangePassword)}
          className="p-5 flex flex-col gap-4"
          noValidate
        >
          <PasswordField
            name="currentPassword"
            label="Current Password"
            placeholder="Enter your current password"
            control={pwdControl}
          />
          <PasswordField
            name="password"
            label="New Password"
            placeholder="Enter your new password"
            hint="Must be at least 6 characters"
            control={pwdControl}
          />
          <PasswordField
            name="rePassword"
            label="Confirm New Password"
            placeholder="Confirm your new password"
            control={pwdControl}
          />

          <button
            type="submit"
            disabled={isChangingPwd}
            className="self-start flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-70 active:scale-95 text-white font-bold text-[14px] px-6 py-2.5 rounded-xl transition-all shadow-sm"
          >
            {isChangingPwd ? (
              <PulseLoader color="#fff" size={6} />
            ) : (
              <>
                <FiLock size={14} />
                Change Password
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
